import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

const ModalUsersOfCourse = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis illo
          qui est numquam aut dignissimos ratione expedita neque aspernatur
          labore accusantium nostrum voluptatum officia earum modi voluptas
          eveniet, sequi eius.
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalUsersOfCourse;
