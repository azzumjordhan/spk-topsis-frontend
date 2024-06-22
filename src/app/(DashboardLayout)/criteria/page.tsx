"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import CustomTable from "@/components/custom-table/CustomTable";
import DrawerCriteria from "@/components/drawer/DrawerCriteria";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCriteria,
  fetchCriteria,
  removeAllCriteria,
  removeCriteria,
} from "@/redux/action";
import { AppDispatch } from "@/redux/store";
import ModalFeedback from "@/components/modal/ModalFeedback";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { IconTrash } from "@tabler/icons-react";
import Paginations from "@/components/custom-table/Pagination";

const Criteria = () => {
  const headCells = [
    {
      id: "criteriaName",
      numeric: false,
      disablePadding: false,
      label: "Nama Kriteria",
    },
    {
      id: "weight",
      numeric: false,
      disablePadding: false,
      label: "Bobot",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState("");

  const { listCriteria, postCriteria, deleteCriteria, deleteAllCriteria } =
    useSelector((state: any) => state.criteriaReducer);
  const { isLoading } = useSelector((state: any) => state.globalReducer);

  const [data, setData] = useState([]);
  const [itemIdToDelete, setItemIdToDelete] = useState("");
  const [keyword, setKeyword] = useState("");

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchCriteria({ page: 1, limit: 10 }));
    }
  }, []);

  useEffect(() => {
    if (listCriteria) {
      setData(listCriteria?.items);
      setTotalPage(listCriteria?.meta?.totalPages);
    }
  }, [listCriteria]);

  const handleKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPage(1);
      dispatch(fetchCriteria({ page: 1, limit: 10, keyword: keyword }));
    }
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
    dispatch(fetchCriteria({ page: newPage, limit: 10 }));
  };

  const closeDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleAddCriteria = (payload: any) => {
    dispatch(addCriteria(payload)).then((response) => {
      if (response.statusCode == 201 && response.data != null) {
        setIsOpenDrawer(false);
        setIsOpenModal("alert");
      } else {
        setIsOpenDrawer(false);
        setIsOpenModal("alert");
      }
    });
  };

  const addCriteriaSuccess = () => {
    setIsOpenModal("");
    setPage(1);
    dispatch(fetchCriteria({ page: 1, limit: 10 }));
  };

  const handleDeleteCriteria = (id: string) => {
    setItemIdToDelete(id);
    setIsOpenModal("delete");
  };

  const confirmDeleteCriteria = () => {
    dispatch(removeCriteria(itemIdToDelete)).then((response) => {
      if (response?.data === "DELETE SUCCESS") {
        setIsOpenModal("");
        setIsOpenModal("alert-delete");
      } else {
        setIsOpenModal("");
        setIsOpenModal("alert-delete");
      }
    });
  };

  const confirmResetCriteria = () => {
    dispatch(removeAllCriteria()).then((response) => {
      if (response?.data === "RESET SUCCESS") {
        setIsOpenModal("");
        setIsOpenModal("alert-reset");
      } else {
        setIsOpenModal("");
        setIsOpenModal("alert-reset");
      }
    });
  };

  const removeCriteriaSuccess = () => {
    setIsOpenModal("");
    setPage(1);
    dispatch(fetchCriteria({ page: 1, limit: 10 }));
  };

  return (
    <PageContainer title="Criteria" description="Halaman Criteria">
      <DashboardCard title="Criteria">
        <Box component="div">
          <Grid container>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Cari Criteria"
                variant="outlined"
                onChange={(event) => setKeyword(event.target.value)}
                onKeyDown={handleKeyword}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ justifyContent: "flex-end", pr: 4 }}
              display="flex"
            >
              <Box>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ mr: 2 }}
                  color="error"
                  onClick={() => setIsOpenModal("reset")}
                >
                  <IconTrash />
                  <Typography>Reset</Typography>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => setIsOpenDrawer(true)}
                >
                  Tambah Baru
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
            <CustomTable
              headCell={headCells}
              rows={data}
              includeDetail={false}
              onDelete={handleDeleteCriteria}
            />
            {data?.length >= 1 && (
              <Paginations
                count={totalPage}
                page={page}
                handleChange={handleChangePage}
              />
            )}
          </Box>
          <DrawerCriteria
            isOpen={isOpenDrawer}
            onClose={closeDrawer}
            onSubmit={handleAddCriteria}
          />
          {postCriteria?.statusCode === 201 ? (
            <ModalFeedback
              title={"Criteria Added Successfully"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"success"}
              onClose={addCriteriaSuccess}
              onClick={addCriteriaSuccess}
            >
              Success !! Criteria is created.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title="Failure Criteria Added"
              isOpen={isOpenModal === "alert"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              errorCode={postCriteria?.httpStatusCode}
              errorMessage={postCriteria?.message}
            >
              Failure !! Criteria are not added.
            </ModalFeedback>
          )}
          <ModalConfirm
            isOpen={isOpenModal === "delete"}
            onClose={() => setIsOpenModal("")}
            onSubmit={confirmDeleteCriteria}
            title="Delete Criteria"
            description={`Are you sure to delete criteria? You can’t undo this action afterwards`}
          />
          {deleteCriteria?.statusCode === 200 ? (
            <ModalFeedback
              isOpen={isOpenModal === "alert-delete"}
              typeFeedback={"success"}
              onClose={removeCriteriaSuccess}
              onClick={removeCriteriaSuccess}
              title={"Criteria Deleted Successfully"}
            >
              Delete Criteria is Successfully.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              isOpen={isOpenModal === "alert-delete"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              title={"Failure Delete Criteria"}
              errorCode={deleteCriteria?.httpStatusCode}
              errorMessage={deleteCriteria?.message}
            >
              Delete Criteria is Failed.
            </ModalFeedback>
          )}
          <ModalConfirm
            isOpen={isOpenModal === "reset"}
            onClose={() => setIsOpenModal("")}
            onSubmit={confirmResetCriteria}
            title="Reset Data Criteria"
            description={`Apakah anda yakin mereset data Criteria? Semua data akan terhapus.`}
          />
          {deleteAllCriteria?.statusCode === 201 ? (
            <ModalFeedback
              title={"Reset Data Criteria"}
              isOpen={isOpenModal === "alert-reset"}
              typeFeedback={"success"}
              onClose={removeCriteriaSuccess}
              onClick={removeCriteriaSuccess}
            >
              Data Criteria telah terhapus seluruhnya.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Reset Data Criteria"}
              isOpen={isOpenModal === "alert-reset"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              errorCode={deleteAllCriteria?.httpStatusCode}
              errorMessage={deleteAllCriteria?.message}
            >
              Reset Data Criteria gagal.
            </ModalFeedback>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Criteria;
