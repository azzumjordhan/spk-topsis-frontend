import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ModalConfirm from "../modal/ModalConfirm";
import { useEffect, useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchDetailUser } from "@/redux/action";
import { localStorageMixins } from "@/mixins/localStorage.mixin";

const drawerWidth = 350;

interface Props {
  isOpen: boolean;
  type: string;
  onClose: () => void;
  onSubmit: (payload: any) => void;
  selectedData?: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

const DrawerUser = ({
  isOpen,
  type,
  onClose,
  onSubmit,
  selectedData,
}: Props) => {
  const dispatch: AppDispatch = useDispatch();

  const defaultUserState: UserData = {
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  };

  const [user, setUser] = useState<UserData>(defaultUserState);

  const userData = localStorageMixins.get("profile");
  const userLoggedIn: UserData = userData
    ? JSON.parse(userData)
    : { defaultUserState };

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {
    if (!isOpen) {
      setUser(defaultUserState);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && selectedData && type !== "add") {
      dispatch(fetchDetailUser(selectedData)).then((response) => {
        setUser({
          name: response?.name,
          email: response?.email,
          password: "",
          role: response?.role,
          status: response?.status,
        });
      });
    }
  }, [selectedData, isOpen]);

  const handleSubmit = () => {
    onSubmit(user);
    setIsOpenModal(false);
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
            <Typography fontWeight="bold">
              {type === "add" ? "Tambah" : "Edit"} Admin
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 2, pl: 2, pr: 2 }}>
            {type === "add" && (
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
            )}
            {type === "add" && (
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
            )}
            {type === "add" && (
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleShowPassword}>
                          {showPassword ? <IconEye /> : <IconEyeOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-select-role">Role</InputLabel>
                <Select
                  labelId="dropdown-select-role"
                  id="select-role"
                  label="Role"
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"super_admin"}>Super Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-select-status">Status</InputLabel>
                <Select
                  labelId="dropdown-select-status"
                  id="select-status"
                  label="Status"
                  value={user.status}
                  onChange={(e) => setUser({ ...user, status: e.target.value })}
                >
                  <MenuItem value={"aktif"}>Aktif</MenuItem>
                  <MenuItem value={"tidak_aktif"}>Tidak Aktif</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ marginLeft: "auto", marginTop: "auto" }}
                variant="contained"
                color="primary"
                onClick={() => setIsOpenModal(true)}
                disabled={
                  type !== "add" && userLoggedIn?.role !== "super_admin"
                    ? true
                    : false
                }
              >
                Simpan
              </Button>
            </Grid>
            {type !== "add" && userLoggedIn?.role !== "super_admin" && (
              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <Typography sx={{ color: "red", fontSize: "12px" }}>
                  *note : Your role is not super admin, so you cant edit
                </Typography>
              </Grid>
            )}
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
