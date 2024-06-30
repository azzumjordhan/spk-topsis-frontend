"use client";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import DashboardCard from "../components/shared/DashboardCard";
import PageContainer from "../components/container/PageContainer";
import { localStorageMixins } from "@/mixins/localStorage.mixin";
import { useEffect, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { editUser, fetchDetailUser } from "@/redux/action";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import ModalFeedback from "@/components/modal/ModalFeedback";

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();

  const defaultProfileState: UserData = {
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    status: "",
  };

  const profile = localStorageMixins.get("profile");
  const user: UserData = profile ? JSON.parse(profile) : { id: "" };

  const [data, setData] = useState<UserData>(defaultProfileState);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const [isOpenModal, setIsOpenModal] = useState("");

  const { putUser } = useSelector((state: any) => state.userReducer);

  useState(() => {
    if (user.id !== "") {
      dispatch(fetchDetailUser(user.id)).then((response) => {
        setData({
          id: response.id,
          name: response.name,
          email: response.email,
          password: "",
          role: response.role,
          status: response.status,
        });
      });
    }
  });

  const handleSubmit = () => {
    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(editUser(data.id, payload)).then((response) => {
      if (response?.statusCode === 200) {
        setIsOpenModal("alert-edit");
      } else {
        setIsOpenModal("alert-edit");
      }
    });
  };

  const updateSuccess = () => {
    setIsOpenModal("");
    dispatch(fetchDetailUser(data.id));
  };

  return (
    <PageContainer>
      <DashboardCard>
        <Box component="div">
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              User Profile
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ mt: "20px" }}
            >
              <Typography sx={{ fontWeight: 700, ml: "5px" }}>Name</Typography>
              <TextField
                id="name"
                fullWidth
                margin="normal"
                value={data ? data.name : ""}
                onChange={(event) =>
                  setData({ ...data, name: event.target.value })
                }
                size="small"
              />
              <Typography sx={{ fontWeight: 700, ml: "5px" }}>Email</Typography>
              <TextField
                id="email"
                fullWidth
                margin="normal"
                value={data ? data.email : ""}
                onChange={(event) =>
                  setData({ ...data, email: event.target.value })
                }
                size="small"
              />
              <Typography sx={{ fontWeight: 700, ml: "5px" }}>
                Password
              </Typography>
              <TextField
                id="password"
                fullWidth
                margin="normal"
                placeholder="Add new password"
                value={data.password}
                onChange={(event) =>
                  setData({ ...data, password: event.target.value })
                }
                size="small"
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
              <Typography sx={{ fontWeight: 700, ml: "5px" }}>Role</Typography>
              <TextField
                id="role"
                fullWidth
                margin="normal"
                value={data ? data.role.replace("_", " ") : ""}
                disabled={true}
                size="small"
              />
              <Typography sx={{ fontWeight: 700, ml: "5px" }}>
                Status
              </Typography>
              <TextField
                id="status"
                fullWidth
                margin="normal"
                value={data ? data.status : ""}
                disabled={true}
                size="small"
              />
              <Box sx={{ mt: "15px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Simpan
                </Button>
              </Box>
            </Box>
            {putUser?.statusCode === 200 ? (
              <ModalFeedback
                title={"Update Admin Successfully"}
                isOpen={isOpenModal === "alert-edit"}
                typeFeedback={"success"}
                onClose={updateSuccess}
                onClick={updateSuccess}
              >
                Update Success
              </ModalFeedback>
            ) : (
              <ModalFeedback
                title={"Failure Update Admin"}
                isOpen={isOpenModal === "alert-edit"}
                typeFeedback={"failed"}
                onClick={() => setIsOpenModal("")}
                onClose={() => setIsOpenModal("")}
                errorCode={putUser?.httpStatusCode}
                errorMessage={putUser?.message}
              >
                Update Failed
              </ModalFeedback>
            )}
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Profile;
