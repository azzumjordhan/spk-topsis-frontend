"use client";
import { Box, TextField, Typography } from "@mui/material";
import DashboardCard from "../components/shared/DashboardCard";
import PageContainer from "../components/container/PageContainer";
import { localStorageMixins } from "@/mixins/localStorage.mixin";
import { useEffect } from "react";

interface UserData {
  name: string;
  email: string;
  role: string;
  status: string;
}
const Profile = () => {
  const profile = localStorageMixins.get("profile");
  const user: UserData = profile
    ? JSON.parse(profile)
    : { name: "", email: "", role: "", status: "" };

  return (
    <PageContainer>
      <DashboardCard>
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            User Profile
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={user.name}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={user.email}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Role"
              value={user.role.replace("_", " ")}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Status"
              value={user.status}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Profile;
