import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const backgroundColor = useColorModeValue("teal.500", "teal.700");

  return (
    <Flex
      h={"60px"}
      alignItems="center"
      justifyContent={"center"}
      bg={backgroundColor}
    >
      <Text fontSize="2xl" color="white">
        © 2023, All rights reserved
      </Text>
    </Flex>
  );
};

export default Footer;
