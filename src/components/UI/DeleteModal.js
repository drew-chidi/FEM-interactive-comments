import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";

const DeleteModal = ({ onShow, onHide, onDelete }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteHandler = () => {
    onDelete();
  };
  return (
    <div>
      <Modal isOpen={onShow} onClose={onHide}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete comment</ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </ModalBody>

          <ModalFooter
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button colorScheme='gray' mr={3} onClick={onHide}>
              NO, CANCEL
            </Button>
            <Button colorScheme='red' onClick={onDelete}>
              YES, DELETE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default DeleteModal;
