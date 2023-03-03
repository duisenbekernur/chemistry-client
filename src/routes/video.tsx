import { AspectRatio, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Questions from "../components/Questions";
import Layout from "../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import { IQuestion, IVideo } from "../types";
import ReactPlayer from "react-player";

const Video = () => {
  const [video, setVideo] = useState<IVideo | null>(null);
  const [questions, setQuestions] = useState<IQuestion[] | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchVideo = async () => {
    const { data } = await axios.get(`/admin/getVideo/${id}`);
    setVideo(data.video);
  };

  const handleGetQuestionsOfVideo = async () => {
    const { data } = await axios.get(`/admin/questions/${id}`);
    setQuestions(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    fetchVideo();
    handleGetQuestionsOfVideo();
  }, []);

  return (
    <>
      <Navbar />
      <Layout>
        <Flex flexDirection="column">
          <Flex w="100%" justifyContent="center" position="relative">
            <Button position="absolute" left="0" onClick={() => navigate(-1)}>
              <FaArrowLeft />
            </Button>
            <Text textAlign="left" mt="45px" fontSize="3xl" marginBottom="15px">
              {video?.name}
            </Text>
          </Flex>
          <Flex justifyContent={"center"}>
            <ReactPlayer controls url={video?.link} />
          </Flex>

          <Questions questions={questions} />
        </Flex>
      </Layout>
    </>
  );
};

export default Video;
