import CourseCard from "./components/CourseCard";
import { Flex, SimpleGrid, Skeleton, Stack, Text } from "@chakra-ui/react";
import axios from "./axios";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Sceletons from "./components/Sceletons";
import { useNavigate } from "react-router-dom";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    setIsLoading(true);
    const { data } = await axios.get("/user/courses");
    setIsLoading(false);
    setCourses(data.userCourses);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
    fetchCourses();
  }, []);

  return (
    <Flex w="100%" flexDirection="column" alignItems="center">
      <Navbar />
      <Layout>
        <Text fontSize="3xl" marginBottom="15px">
          Доступные курсы
        </Text>
        {!isLoading ? (
          courses.map((course: any, index: number) => (
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
              <CourseCard
                id={course.id}
                createdAt={course.createdAt}
                updatedAt={course.updatedAt}
                name={course.name}
                key={index}
              />
            </SimpleGrid>
          ))
        ) : (
          <SimpleGrid w="100%" columns={[1, 2, 3, 4]} spacing={5}>
            <Sceletons />
          </SimpleGrid>
        )}
      </Layout>
    </Flex>
  );
}

export default Home;
