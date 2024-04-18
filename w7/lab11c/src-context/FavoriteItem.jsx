
import { Box, Flex, Button, ButtonGroup, Image, Badge, Text, useDisclosure } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { FaTrash,FaImage } from 'react-icons/fa';


const FavoriteItem = (props)  => {

    const { isOpen, onOpen, onClose } = useDisclosure();

   const item = props.item;
   if (! item) return null;
   const p = item.paintingObject;

   const item = props.item;
   if (! item) return null;

   const fullimageUrl = `https://res.cloudinary.com/funwebdev/image/upload/c_scale,w_300/v1590276836/art/paintings/${p.imageFileName}`;

   const imageUrl = `https://res.cloudinary.com/funwebdev/image/upload/ar_1:1,c_fill,g_auto,w_75/v1590276836/art/paintings/${item.filename}`;
   // if the above image URLs doesn't work, use this one instead
   // const imageUrl = `https://www.randyconnolly.com/funwebdev/3rd/images/art/paintings/square/${item.filename}`;


   const removeFav = () => {
      // to do
   }

   return (
      <Flex border="1px" borderRadius="md" borderColor="gray.200" m={1} p={1} align="center" justify="center" direction="column" >
         <Image src={imageUrl} alt={item.title} py="2" />
         <ButtonGroup spacing={4}>
            <Button size="sm" variantColor="blue" ><Box as={< FaImage />} /></Button>
            <Button size="sm" variantColor="blue" variant="outline" onClick={removeFav}><Box as={FaTrash} /></Button>
         </ButtonGroup>

         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>{p.title}</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Box maxW="xl" borderWidth="1px" rounded="lg" overflow="hidden">
                  <Image src={fullimageUrl} alt={p.title} p="4" />
                  <Box p="4">
                     <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                     <Text fontSize='1.5em' >{p.title}</Text>
                     </Box>
            
                     <Box>By {p.artist.firstName} {p.artist.lastName} </Box>
                     <Box d="flex" alignItems="baseline">
                        <Badge rounded="full" px="2" colorScheme="blue">
                        {p.yearOfWork}
                        </Badge>
                        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2" >
                        {p.gallery.name} ({p.gallery.city})
                        </Box>
                     </Box>             
                  </Box>
                  </Box>
               </ModalBody>

               <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>		 
		 
      </Flex>

   );
}

export default FavoriteItem;