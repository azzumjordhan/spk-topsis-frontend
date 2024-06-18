import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography, TextField, Grid } from "@mui/material";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { editEmployeeScore, getEmployeeDetailScore } from "@/redux/action";
import ModalConfirm from "./ModalConfirm";
import ModalFeedback from "./ModalFeedback";

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

interface EditScoreProps {
  isOpen: boolean;
  onClose: (id: string) => void;
  employee: { id: string };
}

interface PayloadScore {
  criteriaId: string;
  score: number;
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

const ModalEditScore = ({ isOpen, onClose, employee }: EditScoreProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { isLoading } = useSelector((state: any) => state.globalReducer);
  const { detailScore, editScore } = useSelector(
    (state: any) => state.scoreReducer
  );

  const [data, setData] = useState<EmployeeData>({
    employeeId: "",
    employeeName: "",
    scores: [],
  });

  const [payload, setPayload] = useState<PayloadScore[]>([]);

  const [isOpenModal, setIsOpenModal] = useState("");

  useEffect(() => {
    if (!isLoading) {
      dispatch(getEmployeeDetailScore(employee?.id));
    }
  }, []);

  useEffect(() => {
    if (detailScore && employee?.id === detailScore.employeeId) {
      setData(detailScore);
      setPayload(
        detailScore.scores.map((score: Score) => ({
          criteriaId: score.criteriaId,
          score: score.score,
        }))
      );
    }
  }, [detailScore, employee]);

  const handleScoreInputChange =
    (criteriaId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const numericValue = Number(value);
      setPayload((prevScores) =>
        prevScores.map((score) =>
          score.criteriaId === criteriaId
            ? { ...score, score: numericValue }
            : score
        )
      );
      setData((prevData) => ({
        ...prevData,
        scores: prevData.scores.map((score) =>
          score.criteriaId === criteriaId
            ? { ...score, score: numericValue }
            : score
        ),
      }));
    };

  const handleSubmit = () => {
    // event.preventDefault();
    setIsOpenModal("submit");
  };

  const confirmSubmit = () => {
    const employeeId = data.employeeId;
    const updatePayload = payload;
    dispatch(editEmployeeScore(employeeId, { score: updatePayload })).then(
      (response) => {
        if (response.statusCode === 200) {
          setIsOpenModal("alert-edit");
        } else {
          setIsOpenModal("alert-edit");
        }
      }
    );
  };

  const handleClose = () => {
    onClose(data.employeeId);
  };

  return (
    <Box component="div">
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Box alignItems="center" sx={{ mb: "5px" }}>
            <Typography>Formulir Edit Score</Typography>
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
                      payload.find((score) => score.criteriaId === criteriaId)
                        ?.score || 0
                    }
                    onChange={handleScoreInputChange(criteriaId)}
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
      <ModalConfirm
        isOpen={isOpenModal === "submit"}
        onClose={() => setIsOpenModal("")}
        onSubmit={confirmSubmit}
        title={"Edit Score Karyawan"}
        description={"Are you sure to submit the changes?"}
      />
      {editScore?.statusCode === 200 ? (
        <ModalFeedback
          title={"Edit Score Karyawan"}
          isOpen={isOpenModal === "alert-edit"}
          typeFeedback={"success"}
          onClose={handleClose}
          onClick={handleClose}
        >
          Edit Score Sukses.
        </ModalFeedback>
      ) : (
        <ModalFeedback
          title={"Edit Score Karyawan"}
          isOpen={isOpenModal === "alert-edit"}
          typeFeedback={"failed"}
          onClose={handleClose}
          onClick={handleClose}
          errorCode={editScore?.httpStatusCode}
          errorMessage={editScore?.message}
        >
          Edit Score Karyawan Gagal.
        </ModalFeedback>
      )}
    </Box>
  );
};

export default ModalEditScore;
