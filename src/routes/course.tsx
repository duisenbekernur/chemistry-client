import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../components/Layout";
import Sceletons from "../components/Sceletons";

const Course = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchVideos = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/admin/getVideosOfCourse/${id}`);
    setIsLoading(false);
    console.log(data);
    setVideos(data.videos);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    fetchVideos();
  }, []);

  return (
    <Flex w="100%" flexDirection="column" alignItems="center">
      <Navbar />
      <Layout>
        <Flex width="100%" justifyContent="center" position="relative">
          <Button position="absolute" left="0" onClick={() => navigate("/")}>
            <FaArrowLeft />
          </Button>
          <Text fontSize="3xl" marginBottom="15px">
            Все видео курса
          </Text>
        </Flex>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
          {!isLoading ? (
            videos?.map((video: any, index: number) => (
              <VideoCard
                id={video.id}
                imageUrl={video.name}
                createdAt={video.createdAt}
                updatedAt={video.updatedAt}
                name={video.name}
                key={index}
              />
            ))
          ) : (
            <>
              <Sceletons />
            </>
          )}
        </SimpleGrid>
      </Layout>
    </Flex>
  );
};

export default Course;
