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
          src="./src/assets/chemistry-1.jpg"
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
