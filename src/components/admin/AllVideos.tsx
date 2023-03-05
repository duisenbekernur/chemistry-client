import { Input, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { ICourse, IVideo } from "../../types";
import Sceletons from "../Sceletons";
import AdminVideoCard from "./AdminVideoCard";

const AllVideos = () => {
  const [videos, setVideos] = useState<IVideo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get("/admin/videos");
      setIsLoading(false);
      setVideos(data.videos);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по названию видео"
        marginBottom={3}
      />
      <SimpleGrid w="100%" columns={[1, 2, 3, 4, 5, 6]} spacing={5} mb={15}>
        {!isLoading ? (
          videos
            ?.filter((elem: IVideo) =>
              elem.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((video: IVideo, index: number) => (
              <AdminVideoCard
                id={video.id}
                name={video.name}
                key={index}
                createdAt={video.createdAt}
                updatedAt={video.updatedAt}
                link={video.link}
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
