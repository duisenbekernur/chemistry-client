import { AspectRatio, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Questions from "../components/Questions";
import Layout from "../components/Layout";
import { FaArrowLeft } from "react-icons/fa";

interface IVideo {
  id: number;
  link: string;
  name: string;
  size: number;
  createdAt: string;
  updatedAt: string;
}

const Video = () => {
  const [video, setVideo] = useState<IVideo | null>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchVideo = async () => {
    const { data } = await axios.get(`/admin//getVideo/${id}`);
    setVideo(data.video);
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <Navbar />
      <Layout>
        <Flex w="100%" justifyContent="center" position="relative">
          <Button position="absolute" left="0" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </Button>
          <Text fontSize="3xl" marginBottom="15px">
            Видео: {video?.name}
          </Text>
        </Flex>
        <Flex>
          <AspectRatio>
            <video src="https://storage.googleapis.com/nimbl/652333414.mp4" />
          </AspectRatio>
        </Flex>

        <Questions />
      </Layout>
    </>
  );
};

export default Video;
