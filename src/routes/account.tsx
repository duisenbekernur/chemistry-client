import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import ProfileQuestionsList from "../components/ProfileQuestionsList";
import { IPassedQuestion } from "../types";

const Account = () => {
  const [userDatas, setUserDatas] = useState<any>();
  const [passedQuestions, setPassedQuestions] = useState<
    IPassedQuestion[] | null
  >(null);

  const navigate = useNavigate();

  const getUser = async () => {
    const user = await JSON.parse(localStorage.getItem("userDatas") || "");
    setUserDatas(user);
  };

  const getQuestions = async () => {
    const { data } = await axios.get(`/user/passedQuestions/${userDatas.id}`);
    setPassedQuestions(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    if (userDatas) {
      getQuestions();
    }
  }, [userDatas]);

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    localStorage.removeItem("finishedTest");
    localStorage.removeItem("userTest");
    getUser();
  }, []);

  return (
    <Flex w={"100%"} flexDirection="column">
      <Navbar />
      <Layout>
        <Text fontSize="3xl">Профиль: {userDatas?.name}</Text>
        <hr />

        <Text fontSize="3xl" fontWeight="medium">
          История тестов
        </Text>

        {passedQuestions?.length === 0 && <Text fontSize="xl">Пусто</Text>}

        <Accordion defaultIndex={[0]} allowMultiple>
          {passedQuestions?.map(
            (passedQuestion: IPassedQuestion, index: number) => (
              <AccordionItem key={index}>
                <AccordionButton>
                  <Box as="span" fontSize="xl" flex="1" textAlign="left">
                    Тест с видео{" "}
                    <span style={{ fontWeight: 700 }}>
                      {passedQuestion.videoName}
                    </span>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <ProfileQuestionsList
                    passedQuestion={passedQuestion}
                    key={index}
                  />
                </AccordionPanel>
              </AccordionItem>
            )
          )}
        </Accordion>
      </Layout>
    </Flex>
  );
};

export default Account;
