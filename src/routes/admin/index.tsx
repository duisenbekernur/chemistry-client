import {
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AddCourseTemplate from "../../components/admin/AddCourseTemplate";
import AddUserTemplate from "../../components/admin/AddUserTemplate";
import AllCourses from "../../components/admin/AllCourses";
import AllUsers from "../../components/admin/AllUsers";
import AllVideos from "../../components/admin/AllVideos";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import AddVideoTemplate from "../../components/admin/AddVideoTemplate";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { decodeToken } from "react-jwt";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    async function isAdmin() {
      //@ts-ignore
      const decodedToken = decodeToken(localStorage.getItem("token"));
      //@ts-ignore
      if (!decodedToken.isAdmin) {
        navigate("/");
        return;
      }
    }

    isAdmin();
  }, []);

  return (
    <Flex flexDirection="column"  w="100%">
      <Navbar />

      <Tabs>
        <TabList>
          <Tab>Пользователи</Tab>
          <Tab>Курсы</Tab>
          <Tab>Все видео</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <AllUsers />
            <AddUserTemplate />
          </TabPanel>
          <TabPanel>
            <AllCourses />
            <AddCourseTemplate />
          </TabPanel>
          <TabPanel>
            <AllVideos />
            <AddVideoTemplate />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default Admin;
