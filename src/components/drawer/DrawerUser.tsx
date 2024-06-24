import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ModalConfirm from "../modal/ModalConfirm";
import { useState } from "react";

const drawerWidth = 350;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

const DrawerUser = ({ isOpen, onClose, onSubmit }: Props) => {
  const [user, setUser] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  });

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleSubmit = () => {};

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
            <Typography fontWeight="bold">Tambah Admin</Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2, pl: 2, pr: 2 }}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Nama"
                variant="outlined"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="outlined"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Role"
                variant="outlined"
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Status"
                variant="outlined"
                value={user.status}
                onChange={(e) => setUser({ ...user, status: e.target.value })}
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
        onClose={() => setIsOpenModal(false)}
        onSubmit={handleSubmit}
        title="Tambah Admin"
        description="Anda yakin ingin menambahkan admin?"
      />
    </Box>
  );
};

export default DrawerUser;
