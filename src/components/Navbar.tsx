import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("teal.100", "teal.700");

  const navRef = useRef<HTMLDivElement | null>(null);

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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    checkAdmin();
  }, [window.innerWidth]);

  return (
    <>
      <Flex
        p="0 15px"
        ref={navRef}
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
          {!isMobile ? (
            <>
              <Flex gap={25} alignItems="center">
                {typeof window !== "undefined" &&
                  window.localStorage.getItem("isLogged") &&
                  [username, "Мои курсы", "Чат"].map(
                    (name: string, index: number) => (
                      <Button
                        colorScheme={
                          activeMenu !== null && index === +activeMenu
                            ? "whatsapp"
                            : "gray"
                        }
                        key={index}
                        onClick={() => {
                          if (activeMenu) {
                            if (+activeMenu !== index)
                              navigate(
                                +activeMenu === 0
                                  ? index === 1
                                    ? "/"
                                    : "/chat"
                                  : +activeMenu === 1
                                  ? index === 0
                                    ? username === "admin"
                                      ? "/client/admin"
                                      : "/account"
                                    : "/chat"
                                  : index === 0
                                  ? username === "admin"
                                    ? "/client/admin"
                                    : "/account"
                                  : "/"
                              );
                          }
                          window.localStorage.setItem(
                            "activeMenu",
                            index.toString()
                          );
                        }}
                      >
                        {index === 0 && (
                          <BiUser style={{ marginRight: "5px" }} />
                        )}
                        {name}
                      </Button>
                    )
                  )}
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
            </>
          ) : (
            <Button>
              <RxHamburgerMenu onClick={() => onOpen()} />
            </Button>
          )}{" "}
        </Flex>
      </Flex>

      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl">Химия</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Flex gap={25} flexDirection="column">
              {typeof window !== "undefined" &&
                window.localStorage.getItem("isLogged") &&
                [username, "Мои курсы", "Чат"].map(
                  (name: string, index: number) => (
                    <Button
                      colorScheme={
                        activeMenu !== null && index === +activeMenu
                          ? "whatsapp"
                          : "gray"
                      }
                      key={index}
                      onClick={() => {
                        window.localStorage.setItem(
                          "activeMenu",
                          index.toString()
                        );
                        if (activeMenu)
                          if (+activeMenu !== index) {
                            navigate(
                              +activeMenu === 0
                                ? index === 1
                                  ? "/"
                                  : "/chat"
                                : +activeMenu === 1
                                ? index === 0
                                  ? username === "admin"
                                    ? "/client/admin"
                                    : "/account"
                                  : "/chat"
                                : index === 0
                                ? username === "admin"
                                  ? "/client/admin"
                                  : "/account"
                                : "/"
                            );
                          } else {
                            onClose();
                          }
                      }}
                    >
                      {index === 0 && <BiUser style={{ marginRight: "5px" }} />}
                      {name}
                    </Button>
                  )
                )}
            </Flex>

            <Flex gap={25} flexDirection="column">
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
