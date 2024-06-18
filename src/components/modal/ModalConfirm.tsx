import { Box, Button, Modal, Typography } from "@mui/material";
import React, { FormEvent } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  description: string;
}

const ModalConfirm = (props: modalProps) => {
  const { isOpen, onClose, onSubmit, title, description } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-confirm-title"
      aria-describedby="modal-confirm-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-confirm-title"
          variant="h6"
          component="h2"
          fontSize={"18px"}
          fontWeight={600}
        >
          {title}
        </Typography>
        <Typography
          id="modal-confirm-description"
          sx={{ mt: 2 }}
          fontSize={"18px"}
        >
          {description}
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            sx={{ mr: 2 }}
          >
            Batalkan
          </Button>
          <Button onClick={onSubmit} variant="contained" color="primary">
            Konfirmasi
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalConfirm;
