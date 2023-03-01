import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import jwt from "jsonwebtoken";
import axios from "../axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [userDatas, setUserDatas] = useState<any>();

  const navigate = useNavigate();

  const getUser = async () => {
    const user = await JSON.parse(localStorage.getItem("userDatas") || "");
    setUserDatas(user);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    getUser();
  }, []);

  return (
    <Flex w={"100%"} flexDirection="column">
      <Navbar />
      <Layout>
        <Text fontSize="3xl">Профиль</Text>
      </Layout>
    </Flex>
  );
};

export default Account;
