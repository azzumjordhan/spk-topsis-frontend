"use client";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { useEffect, useState } from "react";
import CustomTable from "@/components/custom-table/CustomTable";
import ModalScoresForm from "@/components/modal/ModalScoreForm";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addScore,
  fetchCriteria,
  fetchListKaryawan,
  fetchListScore,
  removeAllScore,
  removeScore,
} from "@/redux/action";
import ModalFeedback from "@/components/modal/ModalFeedback";
import ModalDetailScore from "@/components/modal/ModalDetailScore";
import ModalEditScore from "@/components/modal/ModalEditScore";
import { IconTrash } from "@tabler/icons-react";
import ModalConfirm from "@/components/modal/ModalConfirm";

const Scores = () => {
  const headCells = [
    {
      id: "employeeName",
      numeric: false,
      disablePadding: false,
      label: "Nama Karyawan",
    },
    {
      id: "totalScores",
      numeric: false,
      disablePadding: false,
      label: "Total Skor",
    },
    {
      id: "action",
      numeric: false,
      disablePadding: false,
      label: "Action",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { listKaryawan } = useSelector((state: any) => state.karyawanReducer);
  const { listCriteria } = useSelector((state: any) => state.criteriaReducer);
  const { listScore, postScore, deleteScore, deleteAllScore } = useSelector(
    (state: any) => state.scoreReducer
  );

  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [listEmployees, setListEmployees] = useState([]);
  const [listCriterion, setListCriterion] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchListScore({ page: 1, limit: 20 }));
    }
  }, []);

  useEffect(() => {
    if (listScore) {
      setData(listScore?.items);
    }
  }, [listScore]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchListKaryawan({ limit: 20 }));
      dispatch(fetchCriteria({ limit: 10 }));
    }
  }, []);

  useEffect(() => {
    if (listKaryawan) {
      setListEmployees(listKaryawan?.items);
    }
  }, [listKaryawan]);

  useEffect(() => {
    if (listCriteria) {
      setListCriterion(listCriteria?.items);
    }
  }, [listCriteria]);

  const [selectedData, setSelectedData] = useState("");

  const [isOpenModal, setIsOpenModal] = useState("");
  const [typeModal, setTypeModal] = useState("");

  const handleKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(keyword);
    }
  };

  const closeModal = () => {
    setIsOpenModal("");
    setTypeModal("");
    dispatch(fetchListScore({ page: 1, limit: 20 }));
  };

  const closeEditModal = (id: string) => {
    setSelectedData(id);
    setIsOpenModal("open");
    setTypeModal("detail");
  };

  const handleSelectedData = (id: string) => {
    setSelectedData(id);
    setIsOpenModal("open");
    setTypeModal("detail");
  };

  const handleAddScore = (payload: any) => {
    dispatch(addScore(payload)).then((response) => {
      if (response.statusCode === 201) {
        setIsOpenModal("alert");
      } else {
        setIsOpenModal("alert");
      }
    });
  };

  const addScoreSukses = () => {
    setIsOpenModal("");
    dispatch(fetchListScore({ page: 1, limit: 20 }));
  };

  const handleEdit = (id: string) => {
    setSelectedData(id);
    closeModal();
    setIsOpenModal("open");
    setTypeModal("edit");
  };

  const handleDeleteScore = (id: string) => {
    setSelectedData(id);
    setIsOpenModal("delete");
  };

  const confirmDeleteScore = () => {
    dispatch(removeScore(selectedData)).then((response) => {
      if (response?.data?.message === "DELETE SUCCESS") {
        setIsOpenModal("");
        setIsOpenModal("alert-delete");
      } else {
        setIsOpenModal("");
        setIsOpenModal("alert-delete");
      }
    });
  };

  const confirmResetScore = () => {
    dispatch(removeAllScore()).then((response) => {
      if (response?.data === "RESET SUCCESS") {
        setIsOpenModal("");
        setIsOpenModal("alert-reset");
      } else {
        setIsOpenModal("");
        setIsOpenModal("alert-reset");
      }
    });
  };

  const removeScoreSuccess = () => {
    setIsOpenModal("");
    dispatch(fetchListScore({ page: 1, limit: 10 }));
  };

  return (
    <PageContainer title="Scores" description="Halaman Scores">
      <DashboardCard title="Scores">
        <Box component="div">
          <Grid container>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Cari"
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
                  disabled={data.length === 0 ? true : false}
                >
                  <IconTrash />
                  <Typography>Reset</Typography>
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
                    setIsOpenModal("open");
                    setTypeModal("create");
                  }}
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
              includeDetail={true}
              onDelete={handleDeleteScore}
              selectedData={handleSelectedData}
            />
          </Box>
          {isOpenModal === "open" &&
            (typeModal === "detail" ? (
              <ModalDetailScore
                isOpen={isOpenModal === "open"}
                onClose={closeModal}
                onEdit={handleEdit}
                selectedData={selectedData}
              />
            ) : typeModal === "create" ? (
              <ModalScoresForm
                isOpen={isOpenModal === "open"}
                onClose={closeModal}
                onSubmit={handleAddScore}
                employees={listEmployees}
                criteria={listCriterion}
              />
            ) : typeModal === "edit" ? (
              <ModalEditScore
                isOpen={isOpenModal === "open"}
                onClose={closeEditModal}
                employee={{ id: selectedData }}
              />
            ) : null)}
          {postScore?.statusCode === 201 ? (
            <ModalFeedback
              title={"Input Score Berhasil"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"success"}
              onClose={addScoreSukses}
              onClick={addScoreSukses}
            >
              Score berhasil diinput.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Input Score Gagal"}
              isOpen={isOpenModal === "alert"}
              typeFeedback={"failed"}
              onClose={closeModal}
              onClick={closeModal}
              errorCode={postScore?.httpStatusCode}
              errorMessage={postScore?.message}
            >
              Score gagal diinput.
            </ModalFeedback>
          )}
          <ModalConfirm
            isOpen={isOpenModal === "delete"}
            onClose={() => setIsOpenModal("")}
            onSubmit={confirmDeleteScore}
            title={"Delete Score"}
            description={`Are you sure to delete data score Karyawan? You can’t undo this action afterwards`}
          />
          {deleteScore?.statusCode === 200 ? (
            <ModalFeedback
              title={"Delete Score Karyawan"}
              isOpen={isOpenModal === "alert-delete"}
              typeFeedback={"success"}
              onClose={removeScoreSuccess}
              onClick={removeScoreSuccess}
            >
              Delete Data Score Karyawan Sukses.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Delete Score Karyawan"}
              isOpen={isOpenModal === "alert-delete"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              errorCode={deleteScore?.httpStatusCode}
              errorMessage={deleteScore?.message}
            >
              Delete Data Score Karyawan Gagal.
            </ModalFeedback>
          )}
          <ModalConfirm
            isOpen={isOpenModal === "reset"}
            onClose={() => setIsOpenModal("")}
            onSubmit={confirmResetScore}
            title="Reset Data Score Karyawan"
            description={`Apakah anda yakin mereset data score Karyawan? Semua data akan terhapus.`}
          />
          {deleteAllScore?.statusCode === 201 ? (
            <ModalFeedback
              title={"Reset Data Score Karyawan"}
              isOpen={isOpenModal === "alert-reset"}
              typeFeedback={"success"}
              onClose={removeScoreSuccess}
              onClick={removeScoreSuccess}
            >
              Data Score Karyawan telah terhapus seluruhnya.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Reset Data Score Karyawan"}
              isOpen={isOpenModal === "alert-reset"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              errorCode={deleteAllScore?.httpStatusCode}
              errorMessage={deleteAllScore?.message}
            >
              Reset Data Score Karyawan gagal.
            </ModalFeedback>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};
export default Scores;
