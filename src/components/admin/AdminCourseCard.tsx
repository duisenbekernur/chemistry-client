import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { FC, useState, useEffect } from "react";
import { ICourse, IUser, IVideo } from "../../types";

const AdminCourseCard: FC<ICourse> = ({ id, name, createdAt }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadingDeleteCourse, setIsLoadingDeleteCourse] = useState(false);
  const [isLoadingDeleteUser, setIsLoadingDeleteUser] = useState(false);
  const [isLoadingAddUser, setIsLoadingAddUser] = useState(false);
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  const [isLoadingDeletevideo, setIsLoadingDeletevideo] = useState(false);
  const [isLoadingAddVideo, setIsLoadingAddVideo] = useState(false);

  const [users, setUsers] = useState<IUser[] | null>(null);
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  const [addUserId, setAddUserId] = useState<string | null>(null);
  const [addVideoId, setAddVideoId] = useState<string | null>(null);

  const getVideosOfCourse = async () => {
    const { data } = await axios.get(`/admin/getVideosOfCourse/${id}`);
    setVideos(data.videos);
  };

  const handlleAddVideoToCourse = async (videoId: number) => {
    setIsLoadingAddVideo(true);
    const { data } = await axios.post("/admin/addVideoToCourse", {
      videoId,
      courseId: id,
    });
    setIsLoadingAddVideo(false);
    toast({
      title: data.message,
      status: data.message === "Успешно добавлено" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
    //@ts-ignore
    if (data.video) setVideos([...videos, data.video]);
  };

  const handleDeleteVideoFromCourse = async (videoId: number) => {
    setIsLoadingDeletevideo(true);
    const { data } = await axios.delete(
      `/admin/deleteVideoFromCourse/${videoId}`
    );
    setIsLoadingDeletevideo(false);
    toast({
      title: data.message,
      status:
        data.message === "Видео успешно удалено с курса!" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
    if (videos) setVideos(videos?.filter((v) => v.id !== videoId));
  };

  const getUsersOfCourse = async () => {
    setIsLoadingDeleteUser(true);
    const { data } = await axios.get(`/admin/getUsersByCourse/${id}`);
    setIsLoadingDeleteUser(false);
    setUsers(data);
  };

  const handleAddUserToCourse = async (userId: string) => {
    setIsLoadingAddUser(true);
    const { data } = await axios.post("/admin/addUserToCourse", {
      userId,
      courseId: id,
    });
    setIsLoadingAddUser(false);
    //@ts-ignore
    if (data.user) setUsers([...users, data.user]);
    toast({
      title: data.message,
      status: data.message === "Успешно добавлено" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleDeleteUserFromCourse = async (userId: number) => {
    const { data } = await axios.post("/admin/deleteUserFromCourse", {
      userId,
      courseId: id,
    });

    toast({
      title: data.message,
      status:
        data.message === "Пользователь успешно удалено с курса"
          ? "success"
          : "error",
      duration: 4000,
      isClosable: true,
    });

    //@ts-ignore
    setUsers(users?.filter((user) => user.id !== userId));
  };

  const handleDeleteCourse = async () => {
    setIsLoadingDeleteCourse(true);
    const { data } = await axios.delete(`/course/delete/${id}`);
    setIsLoadingDeleteCourse(false);
    toast({
      title: data.message,
      status: data.message === "Курс успешно удалено" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Card maxW="sm">
        <CardBody>
          <Image
            src="https://media.discordapp.net/attachments/1008571102328541215/1081119169069727865/Ernur_chemistry_course_image_poster_ea3d3fcc-7f0b-46be-8a87-026871fd7691.png?width=671&height=671"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Heading mt={15} size="md">
            ID: {id}
          </Heading>
          <Heading mt={15} size="md">
            {name}
          </Heading>
          <Text mt={15} fontSize="xl">
            Создано в <br /> {new Date(createdAt).toLocaleDateString()}
            {" / "}
            {new Date(createdAt).toLocaleTimeString()}
          </Text>
        </CardBody>
        <CardFooter>
          <ButtonGroup
            spacing="2"
            display="flex"
            flexDirection="column"
            gap="2"
          >
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => {
                getUsersOfCourse();
                onOpen();
              }}
            >
              Пользователи курса
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={() => {
                getVideosOfCourse();
                setIsOpenVideoModal(true);
              }}
            >
              Видосы курса
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={handleDeleteCourse}
            >
              {isLoadingDeleteCourse ? (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="lg"
                />
              ) : (
                "Удалить курс"
              )}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>

      {/* Users of course modal */}
      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Курс: {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={5}>
              {users?.map((user: IUser, index: number) => (
                <Card border="1px solid black" key={index}>
                  <CardHeader>
                    <Heading size="md">ID: {user.id}</Heading>
                    <Heading size="md">Логин: {user.name}</Heading>
                    <Heading size="md">Пароль: {user.password}</Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteUserFromCourse(user.id)}
                    >
                      {isLoadingDeleteUser ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="lg"
                        />
                      ) : (
                        "Удалить пользователя"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card border="1px solid black">
                <CardHeader>
                  <Heading size="md">
                    ID:{" "}
                    <Input
                      onChange={(e) => setAddUserId(e.target.value)}
                      placeholder="id"
                    />
                  </Heading>
                </CardHeader>
                <CardFooter>
                  <Button
                    colorScheme="green"
                    //@ts-ignore
                    onClick={() => handleAddUserToCourse(addUserId)}
                  >
                    {isLoadingAddUser ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                      />
                    ) : (
                      "Добавить пользователя"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Videos modal */}
      <Modal
        onClose={() => setIsOpenVideoModal(false)}
        size="full"
        isOpen={isOpenVideoModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Курс: {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} spacing={5}>
              {videos?.map((video: IVideo, index: number) => (
                <Card border="1px solid black" key={index}>
                  <CardHeader>
                    <Heading mb={3} size="md">
                      ID: {video.id}
                    </Heading>
                    <hr />
                    <Heading mb={3} mt={3} size="md">
                      Название: {video.name}
                    </Heading>
                    <hr />
                    <Heading mb={3} size="md">
                      Ссылка: {video.link}
                    </Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDeleteVideoFromCourse(video.id)}
                    >
                      {isLoadingDeletevideo ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                          size="lg"
                        />
                      ) : (
                        "Удалить видео"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              <Card border="1px solid black">
                <CardHeader>
                  <Heading size="md">
                    ID:{" "}
                    <Input
                      value={addVideoId ? addVideoId : ""}
                      onChange={(e) => setAddVideoId(e.target.value)}
                      placeholder="id"
                    />
                  </Heading>
                </CardHeader>
                <CardFooter>
                  <Button
                    colorScheme="green"
                    //@ts-ignore
                    onClick={() => handlleAddVideoToCourse(addVideoId)}
                  >
                    {isLoadingAddVideo ? (
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="lg"
                      />
                    ) : (
                      "Добавить видео"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminCourseCard;
