import { Flex } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      direction="column"
      gap="25"
      maxW={1400}
      w="100%"
      margin="auto"
      justifyContent="center"
    >
      {children}
    </Flex>
  );
};

export default Layout;
