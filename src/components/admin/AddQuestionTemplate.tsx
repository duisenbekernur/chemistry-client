import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { useState, FC } from "react";
import { BsCheckSquare } from "react-icons/bs";

interface AddQuestionTemplateProps {
  videoId: number;
}

const AddQuestionTemplate: FC<AddQuestionTemplateProps> = ({ videoId }) => {
  const [question, setQuestion] = useState("");
  const [countAnswers, setCountAnswers] = useState<string[]>(["1"]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [trueAnswers, setTrueAnswers] = useState<number[]>([]);

  const toast = useToast();

  console.log("true", trueAnswers);

  const handleCreateQuestion = async () => {
    const { data } = await axios.post("/admin/createQuestion", {
      question,
      answers,
      videoId,
      answerIds: trueAnswers,
    });

    toast({
      title: data.message,
      status: data.message === "Вопрос добавлен" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });

    console.log(data);
  };

  return (
    <Card w="400px">
      <CardHeader w="400px">
        <Heading mb="15px" size="lg">
          Новый вопрос
        </Heading>
        <Heading mb="15px" size="md">
          Вопрос:{" "}
          <Input
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="вопрос"
            marginBottom={2}
          />
          {countAnswers.map((_: any, index: number) => (
            <Flex key={index} gap={2}>
              <Input
                value={answers[index]}
                onChange={(e) => {
                  const curArr = [...answers];
                  curArr[index] = e.target.value;
                  setAnswers(curArr);
                  console.log(answers);
                }}
                placeholder="вариант ответа"
                marginBottom={2}
              />
              <Button
                onClick={() => {
                  const newArray = answers.slice(0, index);
                  const remainingElements = answers.slice(index + 1);
                  const finalArray = newArray.concat(remainingElements);
                  setAnswers(finalArray);
                  setCountAnswers(finalArray);
                }}
              >
                -
              </Button>
              <Button
                p="0"
                onClick={() => {
                  if (trueAnswers.includes(index)) {
                    setTrueAnswers(trueAnswers.filter((e) => e !== index));
                  } else {
                    setTrueAnswers([...trueAnswers, index]);
                  }
                }}
              >
                <BsCheckSquare
                  color={trueAnswers.includes(index) ? "green" : "red"}
                  width="25px"
                />
              </Button>
            </Flex>
          ))}
          <Button
            onClick={() => {
              setCountAnswers((prev) => [...prev, "1"]);
              setAnswers((prev) => [...prev, " "]);
            }}
          >
            +
          </Button>
        </Heading>
      </CardHeader>
      <CardFooter>
        <Button colorScheme="green" onClick={handleCreateQuestion}>
          Добавить вопрос
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddQuestionTemplate;
