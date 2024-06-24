import React from "react";
import { Avatar, Box, IconButton } from "@mui/material";

import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/profile");
  };

  return (
    <Box>
      <IconButton size="large" color="inherit" onClick={handleClick} >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
    </Box>
  );
};

export default Profile;
