import {
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { FormEventHandler, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "../components/Navbar";

const Login = () => {
  const [inputData, setInputData] = useState({ name: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const backgroundColor = useColorModeValue("gray.200", "gray.700");

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data } = await axios.post("/user/login", inputData);
    if (!data.token) {
      alert("Ошибка данных");
      return;
    }
    setIsLoading(false);
    window.localStorage.setItem("token", data.token);
    window.localStorage.setItem("isLogged", "true");
    window.localStorage.setItem("activeMenu", "1");

    const decodedToken = decodeToken(data.token);
    localStorage.setItem("userDatas", JSON.stringify(decodedToken));
    navigate("/");
  };

  useEffect(() => {
    if (
      window.location.pathname.includes("/login") &&
      window.localStorage.getItem("isLogged")
    ) {
      navigate("/");
    }
  }, []);

  return (
    <Flex w={"100%"} flexDirection="column">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            background={backgroundColor}
            p={12}
            rounded="6"
          >
            <Heading mb={5}>Войти</Heading>
            <Input
              onChange={({ target }) =>
                setInputData({ ...inputData, name: target.value })
              }
              value={inputData.name}
              placeholder="email"
              variant="filled"
              mb={3}
              type="text"
            />
            <Input
              onChange={({ target }) =>
                setInputData({ ...inputData, password: target.value })
              }
              value={inputData.password}
              placeholder="*****"
              variant="filled"
              mb={6}
              type="password"
            />
            <Button type="submit" mb={6} colorScheme="teal">
              {isLoading ? <Spinner color="red.500" /> : "Войти"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
