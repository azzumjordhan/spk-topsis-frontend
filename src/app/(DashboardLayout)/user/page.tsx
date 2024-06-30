"use client";

import { Box, Button, Grid, TextField } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { createUser, editStatusUser, fetchListUser } from "@/redux/action";
import CustomTable from "@/components/custom-table/CustomTable";
import Paginations from "@/components/custom-table/Pagination";
import DrawerUser from "@/components/drawer/DrawerUser";
import ModalFeedback from "@/components/modal/ModalFeedback";

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
    {
      id: "action_admin",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selectedData, setSelectedData] = useState("");

  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { listUser, postUser, putStatusUser } = useSelector(
    (state: any) => state.userReducer
  );

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [typeDrawer, setTypeDrawer] = useState("");
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
    dispatch(createUser(payload)).then((response) => {
      if (response.statusCode === 201 && response.data != null) {
        setIsOpenDrawer(false);
        setIsOpenModal("alert");
      } else {
        setIsOpenModal("alert");
      }
    });
  };

  const addAdminSukses = () => {
    setIsOpenModal("");
    setPage(1);
    dispatch(fetchListUser({ page: 1, limit: 10 }));
  };

  const handleOpenEdit = (id: string) => {
    setSelectedData(id);
    setIsOpenDrawer(true);
    setTypeDrawer("edit");
  };

  const handleSubmitEditAdmin = (payload: any) => {
    const value = {
      role: payload.role,
      status: payload.status,
    };
    dispatch(editStatusUser(selectedData, value)).then((response) => {
      if (response?.statusCode === 200) {
        setIsOpenDrawer(false);
        setIsOpenModal("alert-edit");
      } else {
        setIsOpenDrawer(false);
        setIsOpenModal("alert-edit");
      }
    });
  };

  const updateAdminSukses = () => {
    setIsOpenModal("");
    setPage(1);
    dispatch(fetchListUser({ page: 1, limit: 10 }));
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
                  onClick={() => {
                    setIsOpenDrawer(true);
                    setTypeDrawer("add");
                  }}
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
              selectedData={handleOpenEdit}
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
            type={typeDrawer}
            onClose={() => setIsOpenDrawer(false)}
            selectedData={selectedData}
            onSubmit={(data) => {
              if (typeDrawer === "add") {
                handleAddUser(data);
              } else {
                handleSubmitEditAdmin(data);
              }
            }}
          />
          {postUser?.statusCode === 201 ? (
            <ModalFeedback
              title={"Admin Added Successfully"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"success"}
              onClose={addAdminSukses}
              onClick={addAdminSukses}
            >
              Success !! Admin is added.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Failure Admin Added"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"failed"}
              onClick={() => setIsOpenModal("")}
              onClose={() => setIsOpenModal("")}
              errorCode={postUser?.httpStatusCode}
              errorMessage={postUser?.message}
            >
              Failure !! Admin are not added.
            </ModalFeedback>
          )}
          {putStatusUser?.statusCode === 200 ? (
            <ModalFeedback
              title={"Update Admin Successfully"}
              isOpen={isOpenModal === "alert-edit"}
              typeFeedback={"success"}
              onClose={updateAdminSukses}
              onClick={updateAdminSukses}
            >
              Success !! Admin is updated.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Failure Update Admin"}
              isOpen={isOpenModal === "alert-edit"}
              typeFeedback={"failed"}
              onClick={() => setIsOpenModal("")}
              onClose={() => setIsOpenModal("")}
              errorCode={putStatusUser?.httpStatusCode}
              errorMessage={putStatusUser?.message}
            >
              Failure !! Admin are not updated.
            </ModalFeedback>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default User;
