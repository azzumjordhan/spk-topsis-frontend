"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchListUser } from "@/redux/action";
import CustomTable from "@/components/custom-table/CustomTable";
import Paginations from "@/components/custom-table/Pagination";
import DrawerUser from "@/components/drawer/DrawerUser";

const User = () => {
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nama",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "Email",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: false,
      label: "Role",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { listUser } = useSelector((state: any) => state.userReducer);

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState("");

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchListUser({ page: 1, limit: 10 }));
    }
  }, []);

  useEffect(() => {
    if (listUser) {
      setData(listUser?.items);
      setTotalPage(listUser?.meta?.totalPages);
    }
  }, [listUser]);

  const handleKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPage(1);
      dispatch(fetchListUser({ keyword: keyword, page: 1, limit: 10 }));
    }
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    dispatch(fetchListUser({ page: newPage, limit: 10 }));
  };

  const handleAddUser = (payload: any) => {
    console.log(payload);
  };

  return (
    <PageContainer title="Admin" description="HALAMAN ADMIN">
      <DashboardCard title="Daftar Admin">
        <Box component="div">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Cari Admin"
                variant="outlined"
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyword}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                justifyContent: { xs: "flex-end", sm: "flex-start" },
                pr: { sm: 4 },
              }}
              display="flex"
            >
              <Box
                display="flex"
                justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                width="100%"
              >
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setIsOpenDrawer(true)}
                >
                  Tambah Admin
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <CustomTable
              headCell={headCells}
              rows={data}
              includeDetail={false}
            />
            {data?.length >= 1 && (
              <Paginations
                count={totalPage}
                page={page}
                handleChange={handleChangePage}
              />
            )}
          </Box>
          <DrawerUser
            isOpen={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
            onSubmit={handleAddUser}
          />
          {/*
          {postKaryawan?.statusCode === 201 ? (
            <ModalFeedback
              title={"Karyawan Added Successfully"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"success"}
              onClose={addKaryawanSukses}
              onClick={addKaryawanSukses}
            >
              Success !! Karyawan is added.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Failure Karyawan Added"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"success"}
              onClick={() => setIsOpenModal("")}
              onClose={() => setIsOpenModal("")}
              errorCode={postKaryawan?.httpStatusCode}
              errorMessage={postKaryawan?.message}
            >
              Failure !! Karyawan are not added.
            </ModalFeedback>
          )} */}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default User;
