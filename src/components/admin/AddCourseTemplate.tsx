import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { useState } from "react";

const AddCourseTemplate = () => {
  const [name, setName] = useState("");

  const toast = useToast();

  const handleCreateCourse = async () => {
    const { data } = await axios.post("/course/create", {
      name: name,
    });

    toast({
      title: data.message,
      status:
        data.message === "Такой курс уже существует" ? "error" : "success",
      duration: 4000,
      isClosable: true,
    });

    console.log(data);
  };

  return (
    <Card w="400px">
      <CardHeader w="400px">
        <Heading mb="15px" size="lg">
          Новый курс
        </Heading>
        <Heading mb="15px" size="md">
          Название курса:{" "}
          <Input
            onChange={(e) => setName(e.target.value)}
            placeholder="название курса"
          />
        </Heading>
      </CardHeader>
      <CardFooter>
        <Button colorScheme="green" onClick={handleCreateCourse}>
          Создать курс
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddCourseTemplate;
