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
  Stack,
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

  const [users, setUsers] = useState<IUser[] | null>(null);
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  const [addUserId, setAddUserId] = useState<string | null>(null);

  const getVideosOfCourse = async () => {
    const { data } = await axios.get(`/admin/getVideosOfCourse/${id}`);
    console.log(data);
  };

  const getUsersOfCourse = async () => {
    const { data } = await axios.get(`/admin/getUsersByCourse/${id}`);
    setUsers(data);
  };

  const handleAddUserFromCourse = async (userId: string) => {
    const { data } = await axios.post("/admin/addUserToCourse", {
      userId,
      courseId: id,
    });

    toast({
      title:
        data.message === "Succesfully added"
          ? "Успешно добавлено"
          : "Такой пользователь не существует",
      status: data.message === "Succesfully added" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });

    console.log(data);
  };

  const handleDeleteUserFromCourse = async (userId: number) => {
    const { data } = await axios.post("/admin/deleteUserFromCourse", {
      userId,
      courseId: id,
    });

    toast({
      title: "Пользователь успешно удалено с курса",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleDeleteCourse = async () => {
    const { data } = await axios.delete(`/course/delete/${id}`);
    toast({
      title: "Курс успешно удалено",
      status: "success",
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
            src="./../src/assets/chemistry-1.jpg"
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
                onOpen();
              }}
            >
              Видосы курса
            </Button>
            <Button
              variant="solid"
              colorScheme="red"
              onClick={handleDeleteCourse}
            >
              Удалить курс
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
                      Удалить пользователя
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
                    onClick={() => handleAddUserFromCourse(addUserId)}
                  >
                    Добавить пользователя
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
