import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { postLogin } from "@/redux/action";
import { AppDispatch } from "@/redux/store";
import { localStorageMixins } from "@/mixins/localStorage.mixin";
import { LoadingButton } from "@mui/lab";
import ModalFeedback from "@/components/modal/ModalFeedback";

interface loginType {
  title?: string;
  subtext?: JSX.Element | JSX.Element[];
}

interface LoginData {
  email: string;
  password: string;
}

const AuthLogin = ({ title, subtext }: loginType) => {
  const dispatch: AppDispatch = useDispatch();

  const [modal, setModal] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataLogin, setDataLogin] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { login } = useSelector((state: any) => state.authReducer);

  const userData = localStorageMixins.get("profile");

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = () => {
    dispatch(postLogin(dataLogin));
  };

  useEffect(() => {
    if (userData) location.href = "/";
    if (login?.message === "Invalid Credentials") {
      setModal("invalid");
    } else if (login?.message === "Unauthorized") {
      setModal("unauthorized");
    } else if (login) {
      login?.profile ? localStorageMixins.set("profile", login.profile) : null;
      login?.access_token
        ? localStorageMixins.set("access_token", login.access_token)
        : null;

      if (localStorage.getItem("access_token")) location.href = "/";
    }
  }, [login, userData]);

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Stack>
        <Box sx={{ mt: "25px", mb: "25px" }}>
          <TextField
            id="email"
            label="Email"
            autoComplete="off"
            fullWidth
            value={dataLogin.email}
            onChange={(event) =>
              setDataLogin({ ...dataLogin, email: event.target.value })
            }
          />
        </Box>
        <Box mt="25px" mb="50px">
          <TextField
            id="password"
            label="Password"
            autoComplete="off"
            fullWidth
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
            value={dataLogin.password}
            onChange={(event) =>
              setDataLogin({ ...dataLogin, password: event.target.value })
            }
          />
        </Box>
      </Stack>
      <Box>
        <LoadingButton
          loading={isLoading}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Sign In
        </LoadingButton>
      </Box>
      <ModalFeedback
        title="Failed to Login"
        isOpen={modal !== ""}
        typeFeedback="failed"
        onClick={function (): void {
          setModal("");
        }}
        onClose={function (): void {
          setModal("");
        }}
        errorCode={login?.status}
        errorMessage={login?.error_code}
      >
        Login Failed due to {login?.message}
      </ModalFeedback>
    </>
  );
};

export default AuthLogin;
