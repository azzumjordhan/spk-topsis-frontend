import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ModalConfirm from "../modal/ModalConfirm";

const drawerWidth = 350;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
}

const DrawerCriteria = ({ isOpen, onClose, onSubmit }: Props) => {
  const [nama, setNama] = useState("");
  const [bobot, setBobot] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    const payload = {
      criteriaName: nama,
      weight: Number(bobot),
    };
    onSubmit(payload);
    setNama("");
    setBobot("");
    handleCloseModal();
  };

  return (
    <Box component="div">
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: drawerWidth },
        }}
      >
        <Box component="div" sx={{ padding: 2, position: "relative" }}>
          <Button
            sx={{
              position: "absolute",
              top: 2,
              left: 2,
              mt: 1,
            }}
            onClick={onClose}
            color="error"
          >
            <CloseOutlined />
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography fontWeight="bold">Tambah Criteria</Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2, pl: 2, pr: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Nama Criteria"
                variant="outlined"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Weight"
                placeholder="Range between 0 to 1"
                variant="outlined"
                value={bobot}
                onChange={(e) => setBobot(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ marginLeft: "auto", marginTop: "auto" }}
                variant="contained"
                color="primary"
                onClick={() => setIsOpenModal(true)}
              >
                Simpan
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
      <ModalConfirm
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title="Create Criteria"
        description="Are you sure to add criteria?"
      />
    </Box>
  );
};

export default DrawerCriteria;
