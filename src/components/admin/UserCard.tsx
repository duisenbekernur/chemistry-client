import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Heading,
  useToast,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { FC } from "react";
import { IUser } from "../../types";

const UserCard: FC<IUser> = (user) => {
  const toast = useToast();

  const handleDeleteUser = async (id: number) => {
    const { data } = await axios.delete(`/admin/users/${id}`);
    toast({
      title: data,
      status: "success",
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
          Удалить пользователя
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
