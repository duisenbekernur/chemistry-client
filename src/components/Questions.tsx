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
import { IQuestion } from "../types";

interface QuestionsProps {
  questions: IQuestion[] | null;
}

interface IChosenAnswers {
  chosenOptions: number[];
}

const Questions: FC<QuestionsProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [chosenOptionsOfAllQuestions, setChosenOptionsOfAllQuestions] =
    useState<IChosenAnswers[] | null>(null);

  const handleNextQuestion = () => {
    localStorage.setItem(
      "userTest",
      JSON.stringify(chosenOptionsOfAllQuestions)
    );
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };
  const handlePrevQuestion = () => {
    localStorage.setItem(
      "userTest",
      JSON.stringify(chosenOptionsOfAllQuestions)
    );
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleClickOption = (index: number) => {
    localStorage.setItem(
      "userTest",
      JSON.stringify(chosenOptionsOfAllQuestions)
    );
    if (chosenOptionsOfAllQuestions) {
      const newArr = chosenOptionsOfAllQuestions;
      if (
        chosenOptionsOfAllQuestions[
          currentQuestionIndex
        ].chosenOptions.includes(index)
      ) {
        newArr[currentQuestionIndex].chosenOptions = newArr[
          currentQuestionIndex
        ].chosenOptions.filter((e: number) => e !== index);
      } else {
        newArr[currentQuestionIndex].chosenOptions.push(index);
      }
      //@ts-ignore
      const pastArr = JSON.parse(localStorage.getItem("userTest"));
      pastArr[currentQuestionIndex].chosenOptions =
        newArr[currentQuestionIndex].chosenOptions;
      console.log("past", pastArr);
      setChosenOptionsOfAllQuestions(pastArr);
    }
  };

  const handleFinishTest = async () => {
    localStorage.removeItem("userTest");
  };

  useEffect(() => {
    if (questions) setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      if (!localStorage.getItem("userTest")) {
        const arr: IChosenAnswers[] = [];
        for (let i = 0; i < questions.length; i++) {
          arr.push({ chosenOptions: [] });
        }
        setChosenOptionsOfAllQuestions(arr);
      } else
        setChosenOptionsOfAllQuestions(
          //@ts-ignore
          JSON.parse(localStorage.getItem("userTest"))
        );
      console.log("here", chosenOptionsOfAllQuestions);
    }

    console.log(questions);
  }, [questions]);

  return (
    <Container centerContent>
      <Stack spacing={8} py={8}>
        <Heading as="h1" size="2xl">
          {currentQuestion?.question}
        </Heading>
        {currentQuestion?.answers.map((answer: string, index: number) => (
          <Button
            bg={
              //@ts-ignore
              chosenOptionsOfAllQuestions[
                currentQuestionIndex
              ].chosenOptions.includes(index)
                ? "blue.600"
                : "none"
            }
            border="revert"
            onClick={() => handleClickOption(index)}
            key={index}
          >
            <Text key={answer}>{answer}</Text>
          </Button>
        ))}
        <Flex alignItems="center" justifyContent="space-between">
          {currentQuestionIndex !== 0 ? (
            <Button bg="gray" colorScheme="green" onClick={handlePrevQuestion}>
              <HiArrowLeft />
            </Button>
          ) : (
            <Flex></Flex>
          )}
          <Text fontSize="xl">
            {currentQuestionIndex + 1}/{questions?.length}
          </Text>
          {questions !== null &&
          currentQuestionIndex !== questions.length - 1 ? (
            <Button bg="gray" colorScheme="green" onClick={handleNextQuestion}>
              <HiArrowRight />
            </Button>
          ) : (
            <Flex></Flex>
          )}
        </Flex>
        {questions !== null &&
          currentQuestionIndex === questions?.length - 1 && (
            <Button bg="green" onClick={handleFinishTest}>
              Ответьте на все вопросы прежде чем закончить тест / Завершить
            </Button>
          )}
      </Stack>
    </Container>
  );
};

export default Questions;
