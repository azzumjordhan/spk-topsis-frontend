import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface modalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onClick: () => void;
  errorCode?: string;
  errorMessage?: string;
  children: any;
  typeFeedback: "success" | "failed";
}
const ModalFeedback = ({
  isOpen,
  title,
  onClose,
  onClick,
  errorCode,
  errorMessage,
  children,
  typeFeedback,
}: modalProps) => {
  return (
    <Dialog
      maxWidth="xs"
      open={isOpen}
      sx={{ textAlign: "center" }}
      onClose={onClose}
    >
      <Box sx={{ justifyContent: "center", display: "flex", padding: "20px" }}>
        {typeFeedback === "success" && (
          <CheckCircleOutline
            sx={{ my: "auto", color: "green", width: "52px", height: "52px" }}
          />
        )}
        {typeFeedback === "failed" && (
          <CancelOutlined
            sx={{ my: "auto", color: "red", width: "52px", height: "52px" }}
          />
        )}
      </Box>
      <DialogTitle
        sx={{ paddingY: "0px", lineHeight: "30px", fontSize: "20px" }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          paddingY: "8px",
          paddingX: "24px",
          lineHeight: "30px",
          marginTop: "8px",
        }}
      >
        {children}
        {errorCode && (
          <Typography color="error">
            Error Code {errorCode} - {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          paddingX: "24px",
          paddingBottom: "24px",
        }}
      >
        <Button variant="contained" fullWidth onClick={onClick}>
          {typeFeedback === "success" && <>Terima Kasih</>}
          {typeFeedback === "failed" && <>Kembali</>}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalFeedback;
