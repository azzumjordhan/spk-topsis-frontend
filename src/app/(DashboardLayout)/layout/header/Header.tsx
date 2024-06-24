"use client";
import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
// components
import Profile from "./Profile";
import { IconLogout, IconMenu } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const router = useRouter();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("profile");
    localStorage.clear();
    router.push("/authentication/login");
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
          <Button
            variant="outlined"
            disableElevation
            sx={{ color: "white" }}
            onClick={handleLogout}
          >
            <IconLogout color="black" />
            <Typography sx={{ ml: "5px", color: "black", fontWeight: 700 }}>
              Logout
            </Typography>
          </Button>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
