import { Box, Button, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface IVideoCard {
  id: number;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const VideoCard: FC<IVideoCard> = ({
  id,
  name,
  imageUrl,
  createdAt,
  updatedAt,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Image
        src="https://media.discordapp.net/attachments/1008571102328541215/1081119680686723122/Ernur_chemistry_video_poster_with_fun_equations_166792b8-f845-4a04-9dfd-bebfe073154e.png?width=671&height=671"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />

      <Box p="6" display="flex" alignItems="flex-start" flexDirection="column">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {name}
        </Text>

        <Link to={`/video/${id}`}>
          <Button colorScheme="blue" p={5} size="sm" fontSize="xl">
            Посмотреть видео
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default VideoCard;
