import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddVideoTemplate = () => {
  const [fileList, setFileList] = useState<Object | null>(null);
  const [isLoaing, setIsLoading] = useState(false);
  const [videoLink, setVideoLink] = useState<string | null>(null);

  const toast = useToast();

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileList(e.target.files[0]);
  };

  const handleCreateVideo = async () => {
    if (!videoLink || videoLink === "") {
      toast({
        title: "Введите правильную ссылку",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const { data } = await axios.post("/admin/uploadVideo", {
      link: videoLink,
    });
    setIsLoading(false);
    toast({
      title: data.message,
      status: data.message === "Видео успешно загружено" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });

    console.log(data);
  };

  console.log(videoLink);

  return (
    <Card w="400px">
      <CardHeader w="400px">
        <Heading mb={5} size="lg">
          Новое видео
        </Heading>
        <Heading size="md">
          Вставьте ссылку на видео:{" "}
          <Input
            onChange={(e) => setVideoLink(e.target.value)}
            value={videoLink ? videoLink : ""}
            type="text"
          />
        </Heading>
      </CardHeader>
      <CardFooter display="flex" flexDirection="column" gap="2">
        <Button colorScheme="green" onClick={handleCreateVideo}>
          {!isLoaing ? (
            "Добавить видео"
          ) : (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="md"
            />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddVideoTemplate;
