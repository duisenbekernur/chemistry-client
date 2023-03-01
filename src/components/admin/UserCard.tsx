import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { FC, useState } from "react";
import { IUser } from "../../types";

const UserCard: FC<IUser> = (user) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleDeleteUser = async (id: number) => {
    setIsLoading(true);
    const { data } = await axios.delete(`/admin/users/${id}`);
    setIsLoading(false);
    toast({
      title: data.message,
      status: data.message === "Успешно удалено!" ? "success" : "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">ID: {user.id}</Heading>
        <Heading size="md">Логин: {user.name}</Heading>
        <Heading size="md">Пароль: {user.password}</Heading>
      </CardHeader>
      <CardFooter>
        <Button colorScheme="red" onClick={() => handleDeleteUser(user.id)}>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="lg"
            />
          ) : (
            "Удалить пользователя"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
