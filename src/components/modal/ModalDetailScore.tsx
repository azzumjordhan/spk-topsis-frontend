import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, TextField, Grid } from "@mui/material";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetailScore } from "@/redux/action";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface DetailScoreProps {
  isOpen: boolean;
  onClose: () => void;
  selectedData: string;
  onEdit: (id: string) => void;
}

interface Score {
  criteriaId: string;
  criteriaName: string;
  score: number;
}

interface EmployeeData {
  employeeId: string;
  employeeName: string;
  scores: Score[];
}

const ModalDetailScore = ({
  isOpen,
  onClose,
  onEdit,
  selectedData,
}: DetailScoreProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { detailScore } = useSelector((state: any) => state.scoreReducer);

  const initialData: EmployeeData = {
    employeeId: "",
    employeeName: "",
    scores: [],
  };

  const [data, setData] = useState<EmployeeData>(initialData);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getEmployeeDetailScore(selectedData));
    }
  }, []);

  useEffect(() => {
    if (detailScore) {
      setData(detailScore);
    }
  }, [detailScore]);

  const handleClose = () => {
    setData(initialData);
    onClose();
  };

  return (
    <Box component="div">
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Box alignItems="center" sx={{ mb: "5px" }}>
            <Typography>Detail Score</Typography>
          </Box>
          <form>
            <Grid
              container
              spacing={2}
              alignItems={"center"}
              sx={{ marginBottom: "10px" }}
            >
              <Grid item xs={4}>
                <Typography fontWeight={600}>Nama Karyawan : </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{data?.employeeName}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={4}>
                <Typography fontWeight={600}>Kriteria</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontWeight={600}>Skor</Typography>
              </Grid>
            </Grid>
            {data?.scores?.map(({ criteriaId, criteriaName }) => (
              <Grid container spacing={2} alignItems="center" key={criteriaId}>
                <Grid item xs={4}>
                  <Typography>{criteriaName} :</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    margin="normal"
                    size="small"
                    autoComplete="off"
                    value={
                      data.scores.find(
                        (score: any) => score.criteriaId === criteriaId
                      )?.score || 0
                    }
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 2, mr: 2 }}
              onClick={() => onEdit(data.employeeId)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={handleClose}
            >
              Close
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalDetailScore;
