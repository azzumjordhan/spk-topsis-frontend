"use client";
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";

import EmployeeImage from "../../../public/images/backgrounds/division.png";
import Image from "next/image";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box
        minHeight={"70vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={{ xs: "column", lg: "row" }}
      >
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item>
            <Typography
              variant={"h1"}
              display={"flex"}
              flexDirection={{ xs: "column", lg: "row" }}
              textAlign={"center"}
              sx={{ fontSize: { xs: "36px", lg: "4rem" } }}
              marginTop={{ xs: "32px", lg: "0px" }}
            >
              Sistem Pendukung Keputusan
            </Typography>
          </Grid>
          <Grid item sx={{ marginTop: "20px" }}>
            <Image alt="" src={EmployeeImage} width={250} height={250} priority />
          </Grid>
          <Grid item>
            <Typography
              variant={"h1"}
              display={"flex"}
              flexDirection={{ xs: "column", lg: "row" }}
              textAlign={"center"}
              sx={{ fontSize: { xs: "36px", lg: "3rem" }, fontWeight: 400 }}
              marginTop={{ xs: "32px", lg: "0px" }}
            >
              Evaluasi Karyawan dengan Metode Topsis
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
