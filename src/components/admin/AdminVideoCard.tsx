import {
    Button,
    Card,
    CardFooter,
    CardHeader,
    Heading,
    useToast,
  } from "@chakra-ui/react";
  import axios from "../../axios";
  import React, { FC } from "react";
  import { IUser, IVideo } from "../../types";
  
  const AdminVideoCard: FC<IVideo> = (video) => {
    const toast = useToast();
  
    const handleDeleteVideo = async (id: number) => {
      const { data } = await axios.delete(`/admin/users/${id}`);
      toast({
        title: data,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    };
  
    return (
      <Card>
        <CardHeader>
          <Heading size="md">ID: {video.id}</Heading>
          <Heading size="md">Название: {video.name}</Heading>
        </CardHeader>
        <CardFooter>
          <Button colorScheme="red" onClick={() => handleDeleteVideo(video.id)}>
            Удалить видео
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default AdminVideoCard;
  