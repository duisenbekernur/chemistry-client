import {
  Button,
  Flex,
  Switch,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "../axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");

  const { toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("teal.100", "teal.700");

  const activeMenu = window.localStorage.getItem("activeMenu");

  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/login");
  };

  const checkAdmin = async () => {
    if (!window.location.pathname.includes("/login")) {
      //@ts-ignore
      const decodedToken = decodeToken(localStorage.getItem("token"));
      //@ts-ignore
      setUsername(decodedToken.name);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <Flex
      justifyContent="space-between"
      w={"100%"}
      mb="15"
      background={backgroundColor}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        h="60px"
        w="1400px"
        margin="0 auto"
      >
        <Flex gap={25} alignItems="center">
          {typeof window !== "undefined" &&
            window.localStorage.getItem("isLogged") &&
            [username, "Мои курсы"].map((name: string, index: number) => (
              <Button
                colorScheme={
                  activeMenu !== null && index === +activeMenu
                    ? "whatsapp"
                    : "gray"
                }
                key={index}
                onClick={() => {
                  window.localStorage.setItem("activeMenu", index.toString());
                  if (activeMenu)
                    navigate(
                      +activeMenu === 1
                        ? username === "admin"
                          ? "/client/admin"
                          : "/account"
                        : "/"
                    );
                }}
              >
                {index === 0 && <BiUser style={{ marginRight: "5px" }} />}
                {name}
              </Button>
            ))}
        </Flex>
        <Flex gap={25} alignItems="center">
          {typeof window !== "undefined" &&
          window.localStorage.getItem("isLogged") ? (
            <Button colorScheme="red" onClick={handleLogout}>
              Выйти
            </Button>
          ) : (
            <Link to="/login">
              <Button colorScheme="whatsapp">Войти</Button>
            </Link>
          )}
          <Button colorScheme="teal" onClick={() => toggleColorMode()}>
            <FaRegLightbulb />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;