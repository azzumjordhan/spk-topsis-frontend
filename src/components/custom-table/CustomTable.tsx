import Loading from "@/app/loading";
import {
  Box,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { ReactElement } from "react";
import { useSelector } from "react-redux";
import TableBlank from "./TableBlank";
import TableBlankImage from "@/images/table/empty-folder.png";

interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
  width?: any;
  cell?: (_args: any) => ReactElement<any>;
}

interface TableProps {
  selectedData?: (id: string) => void;
  includeDelete?: boolean;
  includeDetail?: boolean;
  headCell: any[];
  rows?: any[];
  modelButton?: boolean;
  onDelete?: (id: string) => void;
}

const CustomTable = (props: TableProps) => {
  const {
    headCell,
    rows,
    includeDelete,
    includeDetail,
    modelButton,
    onDelete,
    selectedData,
  } = props;

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
                    if (e.id == "action" && includeDetail) {
                      return (
                        <TableCell key={e.id}>
                          <>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => {
                                if (onDelete) {
                                  onDelete(row.employeeId);
                                }
                              }}
                            >
                              <IconTrash />
                            </IconButton>
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => {
                                if (selectedData) {
                                  selectedData(row.employeeId);
                                }
                              }}
                            >
                              <IconEye />
                            </IconButton>
                          </>
                        </TableCell>
                      );
                    } else if (e.id == "action" && !includeDetail) {
                      return (
                        <TableCell key={e.id}>
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                              if (onDelete) {
                                onDelete(row.id);
                              }
                            }}
                          >
                            <IconTrash />
                          </IconButton>
                        </TableCell>
                      );
                    } else if (e.id === "status") {
                      return (
                        <TableCell key={e.id}>
                          <Chip
                            size="small"
                            sx={{
                              backgroundColor:
                                row[e.id] === "aktif" ? "#00FF00" : "#DC143C",
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
                        <Typography fontSize={"15px"} fontWeight={500}>
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
      {isLoading ? (
        <Loading />
      ) : rows?.length === 0 ? (
        // <Typography variant="h1">BELUM ADA DATA</Typography>
        <TableBlank text="Belum ada data..." icon={TableBlankImage} />
      ) : null}
    </Box>
  );
};

export default CustomTable;
