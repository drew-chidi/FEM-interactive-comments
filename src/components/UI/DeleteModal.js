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
  return (
    <div>
      <Modal isOpen={onShow} onClose={onHide}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete comment</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </ModalBody>

          <ModalFooter
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              sx={{ background: "hsl(211, 10%, 45%)", color: "white" }}
              mr={3}
              onClick={onHide}
            >
              NO, CANCEL
            </Button>
            <Button
              sx={{ background: "hsl(358, 79%, 66%)", color: "white" }}
              onClick={onDelete}
            >
              YES, DELETE
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default DeleteModal;
