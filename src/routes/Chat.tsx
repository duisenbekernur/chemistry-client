import { Button, Flex, Skeleton, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

import { useState } from "react";
import { Input, Textarea, Box, Avatar, IconButton } from "@chakra-ui/react";
import axios from "../axios";
import { AiOutlineSend as SendIcon } from "react-icons/ai";

type ChatMessage = {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const setMyMessage = () => {
    const newMyMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "Вы",
      message: inputValue,
      timestamp: new Date().toLocaleString(),
    };
    setChatMessages((prev) => [...chatMessages, newMyMessage]);
    console.log(chatMessages);

    setInputValue("");
    localStorage.setItem("chat", JSON.stringify(chatMessages));
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    const { data } = await axios.post("/user/chat", { prompt: inputValue });
    setLoading(false);

    const newChatMessage: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "Химик",
      message: data,
      timestamp: new Date().toLocaleString(),
    };
    setChatMessages((prev) => [...prev, newChatMessage]);
    console.log(chatMessages);
    localStorage.setItem("chat", JSON.stringify(chatMessages));
  };

  useEffect(() => {
    if (localStorage.getItem("chat"))
      //@ts-ignore
      setChatMessages(JSON.parse(localStorage.getItem("chat")));
  }, []);

  return (
    <Flex w="100%" flexDirection="column" alignItems="center">
      <Navbar />
      <Layout>
        <Box h="100%">
          <Box overflowY="scroll" height="85vh">
            {chatMessages.map((message) => (
              <Flex
                key={Math.floor(Math.random() * 1000000)}
                alignItems="flex-start"
                mb={4}
              >
                <Avatar size="sm" name={message.sender} mr={2} />
                <Box>
                  <Box fontWeight="bold">{message.sender}</Box>
                  <Box fontSize="sm" color="gray.500" mb={1}>
                    {message.timestamp}
                  </Box>
                  <Box width={["250px", "md", "xl"]}>{message.message}</Box>
                </Box>
              </Flex>
            ))}
          </Box>
          {chatMessages.length === 0 && (
            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              fontSize="25px"
              border="gray.100"
            >
              Введите интересующие вас вопросы...
            </Box>
          )}
          <Box mt={4}>
            {loading && <Spinner />}
            <Flex>
              <Input
                placeholder="Type a message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                mr={2}
              />
              <IconButton
                onClick={() => {
                  setMyMessage();
                }}
                aria-label="Send message"
                icon={<SendIcon />}
                colorScheme="blue"
              />
            </Flex>
          </Box>
        </Box>
      </Layout>
    </Flex>
  );
};

export default Chat;
