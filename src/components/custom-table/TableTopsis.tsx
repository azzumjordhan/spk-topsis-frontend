import Loading from "@/app/loading";
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useSelector } from "react-redux";

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
  width?: any;
  cell?: (_args: any) => ReactElement<any>;
}

interface TableProps {
  headCell: any[];
  rows?: any[];
}

const TableTopsis = (props: TableProps) => {
  const { headCell, rows } = props;

  const { isLoading } = useSelector((state: any) => state.globalReducer);

  const headCells: HeadCell[] = headCell;

  return (
    <Box>
      <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "normal"}
                >
                  <Typography variant="subtitle2" fontWeight={600}>
                    {headCell.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice().map((row: any, index: any) => {
              return (
                <TableRow key={index}>
                  {headCells?.map((e) => {
                    if (e.id === "status" || e.id === "isPassedScore") {
                      return (
                        <TableCell key={e.id}>
                          <Chip
                            size="small"
                            sx={{
                              backgroundColor:
                                row[e.id] === "PASSED" ? "#00FF00" : "#DC143C",
                              color: "white",
                              borderRadius: "15px",
                              fontWeight: "medium",
                              fontSize: "12px",
                              textTransform: "capitalize",
                            }}
                            label={row[e.id]}
                          />
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={e.id}>
                        <Typography fontSize={"15px"} fontWeight={600}>
                          {e.cell ? <>{e?.cell?.(row)}</> : <>{row[e.id]}</>}
                        </Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading ? <Loading /> : null}
    </Box>
  );
};

export default TableTopsis;
