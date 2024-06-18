"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import DashboardCard from "../components/shared/DashboardCard";
import { PictureAsPdf } from "@mui/icons-material";
import TableBlank from "@/components/custom-table/TableBlank";
import OnClickImage from "@/images/table/click-image.png";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { fetchTopsisResult } from "@/redux/action";
import TableTopsis from "@/components/custom-table/TableTopsis";
import HasilTopsisPDF from "@/components/exportPDF/HasilTopsisPDF";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { generateNamePDF } from "@/utils/generateNamePDF";

const Evaluasi = () => {
  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Nama Karyawan",
      cell: (value: any) => value.employee.name,
    },
    {
      id: "preferenceScore",
      numeric: false,
      disablePadding: false,
      label: "Nilai Preferensi",
    },
    {
      id: "isPassedScore",
      numeric: false,
      disablePadding: false,
      label: "Nilai Kelulusan",
    },
    {
      id: "status",
      numeric: false,
      disablePadding: false,
      label: "Status",
    },
  ];

  const dispatch: AppDispatch = useDispatch();

  const [data, setData] = useState<any>([]);

  const handleGetResultTopsis = () => {
    dispatch(fetchTopsisResult()).then((response) => {
      if (response?.statusCode === 200 && response?.data?.length !== 0) {
        setData(response.data);
      }
    });
  };

  const downloadDataAsPDF = async () => {
    const generatedName = generateNamePDF();
    const doc = <HasilTopsisPDF data={data} />;
    const asBlob = await pdf(doc).toBlob();
    saveAs(asBlob, `Hasil-Topsis-${generatedName}.pdf`);
  };

  return (
    <PageContainer title="Hasil Evaluasi" description="Hasil Evaluasi Karyawan">
      <DashboardCard title="Hasil Evaluasi TOPSIS">
        <Box component="div">
          <Grid container sx={{ paddingBottom: "20px" }}>
            <Grid
              item
              xs={6}
              sx={{ justifyContent: "flex-start", pr: 4 }}
              display="flex"
            >
              <Button
                size="small"
                variant="contained"
                onClick={handleGetResultTopsis}
              >
                Proses Nilai
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ justifyContent: "flex-end", pr: 4 }}
              display="flex"
            >
              {data.length === 0 ? (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled
                >
                  <PictureAsPdf sx={{ mr: "5px" }} />
                  <Typography>Cetak</Typography>
                </Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={downloadDataAsPDF}
                >
                  <PictureAsPdf sx={{ mr: "5px" }} />
                  <Typography>Cetak</Typography>
                </Button>
              )}
            </Grid>
          </Grid>
          {data.length == 0 ? (
            <TableBlank
              text={"Tekan tombol Proses Nilai untuk menampilkan data."}
              icon={OnClickImage}
            />
          ) : (
            <TableTopsis headCell={headCells} rows={data} />
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Evaluasi;
