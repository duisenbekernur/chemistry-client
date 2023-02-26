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
import React, { ChangeEvent, useState } from "react";

const AddVideoTemplate = () => {
  const [fileList, setFileList] = useState<Object | null>(null);
  const [isLoaing, setIsLoading] = useState(false);

  const toast = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileList(e.target.files[0]);
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
      <CardFooter>
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
