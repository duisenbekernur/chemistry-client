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
import { redirect, useNavigate } from "react-router-dom";

const AddVideoTemplate = () => {
  const [fileList, setFileList] = useState<Object | null>(null);
  const [isLoaing, setIsLoading] = useState(false);
  const [googleToken, setGoogleToken] = useState<string | null>(null);

  const toast = useToast();

  const navigate = useNavigate();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileList(e.target.files[0]);
  };

  const loginGoogle = async () => {
    const { data } = await axios.get("/admin/authorizeGoogle");

    window.open(data.authUrl);
  };

  const handleCreateVideo = async (uploadedFile: any) => {
    if (!fileList) {
      toast({
        title: "Видео не прикреплен",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData();
    //@ts-ignore
    if (fileList) formData.append("video", fileList);
    setIsLoading(true);
    const { data } = await axios.post("/admin/uploadVideo", formData);
    setIsLoading(false);
    toast({
      title: data.message,
      status: data.message === "Видео успешно загружено" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });

    console.log(data);
  };

  useEffect(() => {
    setGoogleToken(localStorage.getItem("token2"));
    if (googleToken) {
    }
  }, []);

  return (
    <Card w="400px">
      <CardHeader w="400px">
        <Heading mb="15px" size="lg">
          Новое видео
        </Heading>
        <Heading mb="15px" size="md">
          Выберите файл:{" "}
          <Input onChange={handleFileChange} multiple type="file" />
        </Heading>
      </CardHeader>
      <CardFooter display="flex" flexDirection="column" gap="2">
        {!googleToken && (
          <Button onClick={loginGoogle}>Войдите в гугл акк</Button>
        )}
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
