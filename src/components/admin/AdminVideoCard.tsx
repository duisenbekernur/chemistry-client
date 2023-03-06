import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { FC, useState } from "react";
import { IQuestion, IVideo } from "../../types";
import AddQuestionTemplate from "./AddQuestionTemplate";

const AdminVideoCard: FC<IVideo> = (video) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

  const toast = useToast();

  const handleGetQuestions = async () => {
    setIsLoadingQuestions(true);
    const { data } = await axios.get(`/admin/questions/${video.id}`);
    setIsLoadingQuestions(false);

    setQuestions(data);
  };

  const handleDeleteQuestion = async (id: number) => {
    const { data } = await axios.delete(`/admin/deleteQuestion/${id}`);
    if (data.message === "Успешно удалено" && questions !== null) {
      setQuestions(questions.filter((q) => q.id !== data.question.id));
    }
    toast({
      title: data.message,
      status: data.message === "Успешно удалено" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleDeleteVideo = async () => {
    setIsLoading(true);
    const { data } = await axios.delete(`/admin/deleteVideo/${video.id}`);
    setIsLoading(false);
    toast({
      title: data.message,
      status:
        data.message === "Такое видео не существует" ? "error" : "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>
      <Card position="relative" minHeight="250">
        <CardHeader>
          <Heading size="md">ID: {video.id}</Heading>
          <Heading size="md">Название: {video.name}</Heading>
        </CardHeader>
        <CardFooter
          position={"absolute"}
          bottom="0"
          display="flex"
          flexDirection="column"
        >
          <Button
            colorScheme="green"
            marginBottom={2}
            onClick={() => {
              onOpen();
              if(!questions) handleGetQuestions();
            }}
          >
            Вопросы видео
          </Button>
          <Button colorScheme="red" onClick={handleDeleteVideo}>
            {isLoading ? (
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

      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Все вопросы видео:{" "}
            <Text color="chocolate" fontSize="4xl">
              {video.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" gap={3}>
            {isLoadingQuestions && (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            )}
            {questions?.map((question: IQuestion, index: number) => (
              <Card w={"min-content"} position="relative">
                <CardHeader display="flex" flexDirection="column" gap={3}>
                  <Heading size="md">ID: {question.id}</Heading>
                  <Heading size="md">{question.question}</Heading>

                  {question.answers.map(
                    (answer: string, answerIndex: number) => (
                      <>
                        <Text
                          color={
                            question.answerIds?.includes(answerIndex)
                              ? "green"
                              : "red"
                          }
                        >
                          {answer}{" "}
                        </Text>
                        <hr />
                      </>
                    )
                  )}
                </CardHeader>
                <CardFooter display="flex" flexDirection="column">
                  <Button
                    m="0"
                    colorScheme="red"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Удалить вопрос
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ModalBody>
          <AddQuestionTemplate videoId={video.id} />
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminVideoCard;
