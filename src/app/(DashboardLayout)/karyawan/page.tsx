"use client";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import DrawerKaryawan from "@/components/drawer/DrawerKaryawan";
import { useDispatch, useSelector } from "react-redux";
import CustomTable from "@/components/custom-table/CustomTable";
import { AppDispatch } from "@/redux/store";
import {
  addKaryawan,
  fetchListKaryawan,
  removeAllKaryawan,
  removeKaryawan,
} from "@/redux/action";
import ModalFeedback from "@/components/modal/ModalFeedback";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { IconTrash } from "@tabler/icons-react";

const Karyawan = () => {
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
      id: "phone",
      numeric: false,
      disablePadding: false,
      label: "Telepon",
    },
    {
      id: "position",
      numeric: false,
      disablePadding: false,
      label: "Posisi",
    },
    {
      id: "department",
      numeric: false,
      disablePadding: false,
      label: "Departemen",
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

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { listKaryawan, postKaryawan, deleteKaryawan, deleteAllKaryawan } =
    useSelector((state: any) => state.karyawanReducer);

  const [data, setData] = useState([]);
  const [itemIdToDelete, setItemIdToDelete] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchListKaryawan({ page: 1, limit: 10 }));
    }
  }, []);

  useEffect(() => {
    if (listKaryawan) {
      setData(listKaryawan?.items);
    }
  }, [listKaryawan]);

  const closeDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleKeyword = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(fetchListKaryawan({ keyword: keyword, page: 1, limit: 10 }));
    }
  };

  const handleAddKaryawan = (payload: any) => {
    dispatch(addKaryawan(payload)).then((response) => {
      if (response.statusCode === 201 && response.data != null) {
        setIsOpenDrawer(false);
        setIsOpenModal("alert");
      } else {
        setIsOpenDrawer(false);
        setIsOpenModal("alert");
      }
    });
  };

  const addKaryawanSukses = () => {
    setIsOpenModal("");
    dispatch(fetchListKaryawan({ page: 1, limit: 10 }));
  };

  const handleDeleteKaryawan = (id: string) => {
    setItemIdToDelete(id);
    setIsOpenModal("delete");
  };

  const confirmDeleteKaryawan = () => {
    dispatch(removeKaryawan(itemIdToDelete)).then((response) => {
      if (response?.data === "DELETE SUCCESS") {
        setIsOpenModal("");
        setIsOpenModal("alert-delete");
      } else {
        setIsOpenModal("");
        setIsOpenModal("alert-delete");
      }
    });
  };

  const confirmResetKaryawan = () => {
    dispatch(removeAllKaryawan()).then((response) => {
      if (response?.data === "RESET SUCCESS") {
        setIsOpenModal("");
        setIsOpenModal("alert-reset");
      } else {
        setIsOpenModal("");
        setIsOpenModal("alert-reset");
      }
    });
  };

  const removeKaryawanSukses = () => {
    setIsOpenModal("");
    dispatch(fetchListKaryawan({ page: 1, limit: 10 }));
  };

  return (
    <PageContainer title="Karyawan" description="HALAMAN KARYAWAN">
      <DashboardCard title="Karyawan">
        <Box component="div">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                label="Cari Karyawan"
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
              onDelete={handleDeleteKaryawan}
            />
          </Box>
          <DrawerKaryawan
            isOpen={isOpenDrawer}
            onClose={closeDrawer}
            onSubmit={handleAddKaryawan}
          />
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
          )}
          <ModalConfirm
            isOpen={isOpenModal === "delete"}
            onClose={() => setIsOpenModal("")}
            onSubmit={confirmDeleteKaryawan}
            title="Delete Karyawan"
            description={`Are you sure to delete data Karyawan? You can’t undo this action afterwards`}
          />
          {deleteKaryawan?.statusCode === 200 ? (
            <ModalFeedback
              title={"Data Karyawan Deleted Successfully"}
              isOpen={isOpenModal === "alert-delete"}
              typeFeedback={"success"}
              onClose={removeKaryawanSukses}
              onClick={removeKaryawanSukses}
            >
              Delete Data Karyawan is Successfully.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Failure Deleted Data Karyawan"}
              isOpen={isOpenModal === "alert-delete"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              errorCode={deleteKaryawan?.httpStatusCode}
              errorMessage={deleteKaryawan?.message}
            >
              Delete Data Karyawan is Failed.
            </ModalFeedback>
          )}
          <ModalConfirm
            isOpen={isOpenModal === "reset"}
            onClose={() => setIsOpenModal("")}
            onSubmit={confirmResetKaryawan}
            title="Reset Data Karyawan"
            description={`Apakah anda yakin mereset data Karyawan? Semua data akan terhapus.`}
          />
          {deleteAllKaryawan?.statusCode === 201 ? (
            <ModalFeedback
              title={"Reset Data Karyawan"}
              isOpen={isOpenModal === "alert-reset"}
              typeFeedback={"success"}
              onClose={removeKaryawanSukses}
              onClick={removeKaryawanSukses}
            >
              Data Karyawan telah terhapus seluruhnya.
            </ModalFeedback>
          ) : (
            <ModalFeedback
              title={"Reset Data Karyawan"}
              isOpen={isOpenModal === "alert-reset"}
              typeFeedback={"failed"}
              onClose={() => setIsOpenModal("")}
              onClick={() => setIsOpenModal("")}
              errorCode={deleteAllKaryawan?.httpStatusCode}
              errorMessage={deleteAllKaryawan?.message}
            >
              Reset Data Karyawan gagal.
            </ModalFeedback>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Karyawan;
