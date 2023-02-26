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
        src="../src/assets/chemistry-1.jpg"
        alt="Green double couch with wooden legs"
        borderRadius="lg"
      />

      <Box p="6" display="flex" alignItems="center" flexDirection="column">
        <Text fontWeight="bold" fontSize="xl" mb="2">
          {name}
        </Text>

        <Link to={`/video/${id}`}>
          <Button colorScheme="blue" size="sm" fontSize="xl">
            Show
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default VideoCard;
