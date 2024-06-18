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

const DrawerKaryawan = ({ isOpen, onClose, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleSubmit = () => {
    const payload = {
      name: name,
      email: email,
      phone: phone,
      position: position,
      department: department,
    };
    onSubmit(payload);
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setDepartment("");
    closeModal();
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
            <Typography fontWeight="bold">Tambah Karyawan</Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2, pl: 2, pr: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Nama"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Telepon"
                variant="outlined"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Posisi"
                variant="outlined"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Departmen"
                variant="outlined"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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
        onClose={closeModal}
        onSubmit={handleSubmit}
        title="Add Karyawan"
        description="Are you sure to add Karyawan?"
      />
    </Box>
  );
};

export default DrawerKaryawan;
