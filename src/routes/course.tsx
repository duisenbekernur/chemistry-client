import { Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../components/Layout";
import Sceletons from "../components/Sceletons";
import { BiSad } from "react-icons/bi";

const Course = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { courseId } = useParams();
  const navigate = useNavigate();

  const fetchVideos = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/admin/getVideosOfCourse/${courseId}`);
    setIsLoading(false);
    setVideos(data.videos);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    localStorage.removeItem("finishedTest");
    localStorage.removeItem("userTest");
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
          <Text textAlign="left" mt="45px" fontSize="3xl" marginBottom="15px">
            Все видео курса
          </Text>
        </Flex>

        <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
          {!isLoading ? (
            <>
              {videos?.map((video: any, index: number) => (
                <VideoCard
                  id={video.id}
                  imageUrl={video.name}
                  createdAt={video.createdAt}
                  updatedAt={video.updatedAt}
                  name={video.name}
                  key={index}
                />
              ))}
            </>
          ) : (
            <>
              <Sceletons />
            </>
          )}
        </SimpleGrid>
        {!isLoading && videos?.length === 0 && (
          <Text
            fontSize="3xl"
            display="flex"
            w="100%"
            alignItems="center"
            gap="15px"
          >
            В этот курс еще не добавлео видео <BiSad />
          </Text>
        )}
      </Layout>
    </Flex>
  );
};

export default Course;
