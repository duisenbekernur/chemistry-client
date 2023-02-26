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

const Admin = () => {
  useEffect(() => {}, []);

  return (
    <Flex flexDirection="column">
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
