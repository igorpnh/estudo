import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "./api/api";

function ModalCharacter({ id, open, setOpen }) {
  const { isOpen, onClose } = useDisclosure({
    isOpen: open,
    onClose() {
      setOpen(!open);
    },
  });
  const [character, setCharacter] = useState([]);

  const handleGetUnique = () => {
    api
      .get(`/characters/${id}`)
      .then((response) => {
        console.log(response.data.data.results[0]);
        setCharacter(response.data.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      handleGetUnique();
    }
  }, [id]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{character.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default function Home() {
  const [character, setCharacter] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

  const handleGetData = () => {
    setLoading(true);
    api
      .get("/characters")
      .then((response) => {
        setLoading(false);
        setCharacter(response.data.data.results);
        console.log(response.data.data.results);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleOpenModal = (characterId) => {
    setOpenModal(!openModal);
    setId(characterId);
  };

  useEffect(() => {
    handleGetData();
  }, [page]);

  return (
    <>
      <Container maxW={"container.xl"} bg="blue.100">
        <ModalCharacter open={openModal} setOpen={setOpenModal} id={id} />
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            character.map((item) => {
              return (
                <Box bg="white">
                  <Flex direction={"column"} align={"center"} gap={4} p={4}>
                    <Image
                      onClick={() => handleOpenModal(item.id)}
                      maxW="100px"
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    />
                    <Text>{item.name}</Text>
                  </Flex>
                </Box>
              );
            })
          )}
        </SimpleGrid>
        <Button onClick={() => setPage(page + 1)}>Prox página</Button>
      </Container>
    </>
  );
}
