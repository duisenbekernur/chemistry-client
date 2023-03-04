import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { GoChevronLeft } from "react-icons/go";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    localStorage.removeItem("finishedTest");
    localStorage.removeItem("userTest");
  }, []);

  return (
    <>
      <Navbar />
      <Flex
        minH="100vh"
        align="center"
        w="100%"
        justify="center"
        direction="column"
      >
        <Text fontSize="6xl" fontWeight="bold" color="gray.600" mb={8}>
          404
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="gray.600" mb={8}>
          Страница не найдена
        </Text>
        <Link to="/">
          <Button colorScheme="teal" cursor="pointer">
            <GoChevronLeft size="25px" /> Вернуться в главную страницу
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default NotFound;
