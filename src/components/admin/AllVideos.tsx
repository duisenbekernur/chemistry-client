import { SimpleGrid } from "@chakra-ui/react";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { ICourse, IVideo } from "../../types";
import Sceletons from "../Sceletons";
import AdminCourseCard from "./AdminCourseCard";
import VideoCard from "../VideoCard";
import AdminVideoCard from "./AdminVideoCard";

const AllVideos = () => {
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get("/admin/videos");
      setIsLoading(false);
      setVideos(data);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4, 5, 6]} spacing={5} mb={15}>
        {!isLoading ? (
          videos?.map((video: IVideo, index: number) => (
            <AdminVideoCard
              id={video.id}
              name={video.name}
              key={index}
              createdAt={video.createdAt}
              updatedAt={video.updatedAt}
              link={video.link}
              size={video.size}
              courseId={video.courseId}
            />
          ))
        ) : (
          <Sceletons />
        )}
      </SimpleGrid>
    </>
  );
};

export default AllVideos;
