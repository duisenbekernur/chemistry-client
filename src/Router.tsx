import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import Account from "./routes/account";
import Admin from "./routes/admin";
import Course from "./routes/course";
import Login from "./routes/login";
import Video from "./routes/video";

const Router = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);

  return (
    <Flex minH="100vh" alignItems="flex-start" flexDirection="column">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/account" element={<Account />} />
        <Route path="/video/:id" element={<Video />} />
        <Route path="/client/admin/" element={<Admin />} />
      </Routes>
    </Flex>
  );
};

export default Router;
