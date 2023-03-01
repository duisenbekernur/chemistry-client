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
import React, { useState } from "react";

const AddUserTemplate = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleCreateUser = async () => {
    setIsLoading(true);
    const { data } = await axios.post("/admin/users", {
      name: login,
      password,
    });
    setIsLoading(false);
    const addToCloudRes = await axios.post("/admin/addUserToCloud", {
      name: login,
    });

    toast({
      title: data.message,
      status:
        data.message === "Пользватель уже существует" ? "error" : "success",
      duration: 4000,
      isClosable: true,
    });

    console.log(data);
  };

  return (
    <Card w="400px">
      <CardHeader w="400px">
        <Heading mb="15px" size="lg">
          Новый пользователь
        </Heading>
        <Heading mb="15px" size="md">
          Логин:{" "}
          <Input
            onChange={(e) => setLogin(e.target.value)}
            placeholder="логин"
          />
        </Heading>
        <Heading mb="15px" size="md">
          Пароль:{" "}
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="пароль"
          />
        </Heading>
      </CardHeader>
      <CardFooter>
        <Button colorScheme="green" onClick={handleCreateUser}>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          ) : (
            "Добавить пользователя"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddUserTemplate;
