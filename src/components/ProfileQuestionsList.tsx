import React, { useState, FC, useEffect } from "react";
import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { IPassedQuestion, IQuestion } from "../types";
import axios from "../axios";

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

interface IProfileQuestionsListProps {
  passedQuestion: IPassedQuestion;
}

const ProfileQuestionsList: FC<IProfileQuestionsListProps> = ({
  passedQuestion,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [renderr, setRenderr] = useState(0);
  const [finished, setFinished] = useState(true);
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);

  const handleNextQuestion = () => {
    localStorage.setItem(
      "userTest",
      JSON.stringify(passedQuestion.userAnswers)
    );
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handlePrevQuestion = () => {
    localStorage.setItem(
      "userTest",
      JSON.stringify(passedQuestion.userAnswers)
    );
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const getQuestions = async () => {
    const { data } = await axios.get(
      `/admin/questions/${passedQuestion.videoId}`
    );
    setQuestions(data);
  };

  useEffect(() => {
    if (questions) setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex, renderr, questions]);

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Container w="100%" centerContent>
      {passedQuestion && (
        <Stack w="100%" spacing={8} py={8}>
          <Heading as="h1" size="2xl">
            {currentQuestion?.question}
          </Heading>
          {currentQuestion?.answers.map((answer: string, index: number) => (
            <Button
              w="100%"
              bg={
                //@ts-ignore
                questions[currentQuestionIndex].answerIds[0] === index
                  ? "green" //@ts-ignore
                  : passedQuestion.userAnswers[currentQuestionIndex]
                      .chosenOptions === index
                  ? "red"
                  : "none"
              }
              variant="unstyled"
              border="1px solid gray"
              key={index}
            >
              <Text w="100%" key={answer}>
                {`${alphabet[index]}) `}
                {answer}
              </Text>
            </Button>
          ))}
          <Flex alignItems="center" justifyContent="space-between">
            {currentQuestionIndex !== 0 ? (
              <Button
                bg="gray"
                colorScheme="green"
                onClick={handlePrevQuestion}
              >
                <HiArrowLeft />
              </Button>
            ) : (
              <Flex></Flex>
            )}
            <Text fontSize="xl">
              {currentQuestionIndex + 1}/{passedQuestion.userAnswers.length}
            </Text>
            {passedQuestion !== null &&
            currentQuestionIndex !== passedQuestion.userAnswers.length - 1 ? (
              <Button
                bg="gray"
                colorScheme="green"
                onClick={handleNextQuestion}
              >
                <HiArrowRight />
              </Button>
            ) : (
              <Flex></Flex>
            )}
          </Flex>
        </Stack>
      )}
    </Container>
  );
};

export default ProfileQuestionsList;
