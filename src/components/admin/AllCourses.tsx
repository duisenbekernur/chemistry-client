import { SimpleGrid } from "@chakra-ui/react";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { ICourse } from "../../types";
import Sceletons from "../Sceletons";
import AdminCourseCard from "./AdminCourseCard";

const AllCourses = () => {
  const [courses, setCourses] = useState<ICourse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get("/course");
      setIsLoading(false);
      setCourses(data);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4, 5, 6]} spacing={5} mb={15}>
        {!isLoading ? (
          courses?.map((course: ICourse, index: number) => (
            <AdminCourseCard
              id={course.id}
              name={course.name}
              key={index}
              createdAt={course.createdAt}
              updatedAt={course.updatedAt}
            />
          ))
        ) : (
          <Sceletons />
        )}
      </SimpleGrid>
    </>
  );
};

export default AllCourses;
