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
import { IQuestion, IVideo } from "../types";
import axios from "../axios";
import { useParams } from "react-router-dom";

interface QuestionsProps {
  questions: IQuestion[] | null;
  video: IVideo | null;
}

interface IChosenAnswers {
  chosenOptions: number | null;
}

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];

const Questions: FC<QuestionsProps> = ({ questions, video }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(
    null
  );
  const [chosenOptionsOfAllQuestions, setChosenOptionsOfAllQuestions] =
    useState<IChosenAnswers[] | null>(null);
  const [renderr, setRenderr] = useState(0);
  const [finished, setFinished] = useState(false);

  const { videoId } = useParams();

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
    if (localStorage.getItem("finishedTest")) return;
    localStorage.setItem(
      "userTest",
      JSON.stringify(chosenOptionsOfAllQuestions)
    );
    if (chosenOptionsOfAllQuestions) {
      let newArr = chosenOptionsOfAllQuestions;
      newArr[currentQuestionIndex].chosenOptions = index;
      setChosenOptionsOfAllQuestions(newArr);
    }
    setRenderr(renderr + 1);
  };

  const handleFinishTest = async () => {
    setRenderr(renderr + 1);
    setCurrentQuestionIndex(0);

    setFinished(true);
    localStorage.setItem("finishedTest", "true");

    const { data } = await axios.post("/user/addPassedQuestion", {
      //@ts-ignore
      userId: JSON.parse(localStorage.getItem("userDatas")).id,
      videoId: videoId,
      userAnswers: chosenOptionsOfAllQuestions,
      answerIds: questions?.map((elem: IQuestion, index: number) => {
        return elem.answerIds;
      }),
      videoName: video?.name,
    });
  };

  useEffect(() => {
    if (questions) setCurrentQuestion(questions[currentQuestionIndex]);
  }, [chosenOptionsOfAllQuestions, currentQuestionIndex, renderr]);

  useEffect(() => {
    if (questions) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      if (!localStorage.getItem("userTest")) {
        const arr: IChosenAnswers[] = [];
        for (let i = 0; i < questions.length; i++) {
          arr.push({ chosenOptions: null });
        }
        setChosenOptionsOfAllQuestions(arr);
      } else
        setChosenOptionsOfAllQuestions(
          //@ts-ignore
          JSON.parse(localStorage.getItem("userTest"))
        );
    }
  }, [questions]);
  

  return (
    <Container w="100%" centerContent>
      {questions && questions?.length > 0 && (
        <Stack w="100%" spacing={8} py={8}>
          <Heading as="h1" size="2xl">
            {currentQuestion?.question}
          </Heading>
          {currentQuestion?.answers.map((answer: string, index: number) => (
            <Button
              w="100%"
              bg={
                localStorage.getItem("finishedTest") === "true" //@ts-ignore
                  ? questions[currentQuestionIndex].answerIds[0] === index
                    ? "green" //@ts-ignore
                    : chosenOptionsOfAllQuestions[currentQuestionIndex]
                        .chosenOptions === index
                    ? "red"
                    : "none"
                  : //@ts-ignore
                  chosenOptionsOfAllQuestions[currentQuestionIndex]
                      .chosenOptions === index
                  ? "blue.200"
                  : "none"
              }
              variant="unstyled"
              border="1px solid gray"
              onClick={() => handleClickOption(index)}
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
              {currentQuestionIndex + 1}/{questions?.length}
            </Text>
            {questions !== null &&
            currentQuestionIndex !== questions.length - 1 ? (
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
          {questions !== null &&
            currentQuestionIndex === questions?.length - 1 && (
              <Button bg="green" onClick={handleFinishTest}>
                Завершить
              </Button>
            )}
        </Stack>
      )}
    </Container>
  );
};

export default Questions;

// const handleClickOption = (index: number) => {
//   localStorage.setItem(
//     "userTest",
//     JSON.stringify(chosenOptionsOfAllQuestions)
//   );
//   if (chosenOptionsOfAllQuestions) {
//     const newArr = chosenOptionsOfAllQuestions;
//     if (
//       chosenOptionsOfAllQuestions[
//         currentQuestionIndex
//       ].chosenOptions.includes(index)
//     ) {
//       newArr[currentQuestionIndex].chosenOptions = newArr[
//         currentQuestionIndex
//       ].chosenOptions.filter((e: number) => e !== index);
//     } else {
//       newArr[currentQuestionIndex].chosenOptions.push(index);
//     }
//     //@ts-ignore
//     const pastArr = JSON.parse(localStorage.getItem("userTest"));
//     pastArr[currentQuestionIndex].chosenOptions =
//       newArr[currentQuestionIndex].chosenOptions;
//     console.log("past", pastArr);
//     setChosenOptionsOfAllQuestions(pastArr);
//   }
// };
