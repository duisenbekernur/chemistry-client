import { Flex } from "@chakra-ui/react";
import axios from "./axios";
import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import App from "./App";
import Account from "./routes/account";
import Admin from "./routes/admin";
import Course from "./routes/course";
import Login from "./routes/login";
import NotFound from "./routes/NotFound";
import Video from "./routes/video";
import { IVideo } from "./types";

const Router = () => {
  const navigate = useNavigate();

  const { courseId, videoId } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    const isCorrectCoursePage = async () => {
      const { data } = await axios.get("/user/courses");
      let can = false;
      data.userCourses.forEach((element: any) => {
        if ("/course/" + element.id === window.location.pathname) {
          can = true;
        }
      });

      if (!can) {
        navigate("/errorPage");
        return;
      }
    };

    // const isCorrectVideoPage = async () => {
    //   const { data } = await axios.get(`/admin/getVideosOfCourse/${courseId}`);
    //   let can = false;

    //   data.videos.forEach((element: IVideo) => {
    //     if (
    //       `/course/${courseId}/video/` + element.id ===
    //       window.location.pathname
    //     ) {
    //       can = true;
    //     }
    //   });

    //   if (!can) {
    //     navigate("/errorPage");
    //     return;
    //   }
    // };

    // if (window.location.pathname.includes(`/course/${courseId}/video/`)) {
    //   console.log(123);

    //   isCorrectVideoPage();
    // }

    if (
      window.location.pathname.includes("/course/") &&
      window.location.pathname.length < 12
    ) {
      isCorrectCoursePage();
    }
  }, [courseId, videoId]);

  return (
    <Flex minH="100vh" alignItems="flex-start" flexDirection="column">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course/:courseId" element={<Course />} />
        <Route path="/account" element={<Account />} />
        <Route path="/course/:courseId/video/:videoId" element={<Video />} />
        <Route path="/client/admin/" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Flex>
  );
};

export default Router;
