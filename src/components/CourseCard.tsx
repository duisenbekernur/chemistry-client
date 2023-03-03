import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ICourse } from "../types";

const CourseCard: FC<ICourse> = ({ id, name }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="https://media.discordapp.net/attachments/1008571102328541215/1081119169069727865/Ernur_chemistry_course_image_poster_ea3d3fcc-7f0b-46be-8a87-026871fd7691.png?width=671&height=671"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Heading mt={15} size="md">
          {name}
        </Heading>
      </CardBody>
      <CardFooter>
        <ButtonGroup spacing="2">
          <Link to={`/course/${id}`}>
            <Button variant="solid" colorScheme="blue">
              Курсқа өту
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
