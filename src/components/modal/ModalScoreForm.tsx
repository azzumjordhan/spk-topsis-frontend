import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

interface ScoresFormProps {
  isOpen: boolean;
  onClose: () => void;
  employees?: { id: string; name: string }[];
  criteria: { id: string; criteriaName: string }[];
  onSubmit: (payload: { employeeId: string; scores: Score[] }) => void;
}

interface Score {
  criteriaId: string;
  score: number;
}

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

const ModalScoresForm = ({
  isOpen,
  onClose,
  employees,
  criteria,
  onSubmit,
}: ScoresFormProps) => {
  const [selectEmployee, setSelectEmployee] = useState<string>("");
  const [scores, setScores] = useState<Score[]>(
    criteria.map((criterion) => ({ criteriaId: criterion.id, score: 0 }))
  );

  useEffect(() => {
    setScores(
      criteria.map((criterion) => ({ criteriaId: criterion.id, score: 0 }))
    );
  }, [criteria]);

  const handleScoreInputChange =
    (criteriaId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const numericValue = Number(value);
      setScores((prevScores) =>
        prevScores.map((score) =>
          score.criteriaId === criteriaId
            ? { ...score, score: numericValue }
            : score
        )
      );
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload = {
      employeeId: selectEmployee,
      scores: scores,
    };
    onSubmit(payload);
    setSelectEmployee("");
    setScores(
      criteria.map((criterion) => ({ criteriaId: criterion.id, score: 0 }))
    );
    onClose();
  };

  return (
    <Box component="div">
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Box alignItems="center">
            <Typography>Formulir Score</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" size="small" sx={{ mb: 2 }}>
              <InputLabel id="select-karyawan">Karyawan</InputLabel>
              <Select
                labelId="select-karyawan"
                label="Karyawan"
                value={selectEmployee}
                onChange={(e) => setSelectEmployee(e.target.value as string)}
              >
                {employees?.map((employee) => (
                  <MenuItem
                    key={employee.id}
                    value={employee.id}
                    sx={{ backgroundColor: "white" }}
                  >
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid container spacing={2} alignItems={"center"}>
              <Grid item xs={4}>
                <Typography fontWeight={600}>Kriteria</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography fontWeight={600}>Skor</Typography>
              </Grid>
            </Grid>
            {criteria?.map(({ id, criteriaName }) => (
              <Grid container spacing={2} alignItems="center" key={id}>
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
                      scores.find((score) => score.criteriaId === id)?.score ||
                      0
                    }
                    onChange={handleScoreInputChange(id)}
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, mr: 2 }}
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ModalScoresForm;
