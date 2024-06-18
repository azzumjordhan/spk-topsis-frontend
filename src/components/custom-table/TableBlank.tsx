import {
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";

interface TableBlankProps {
  text: string;
  icon: any;
}

const TableBlank = ({ text, icon }: TableBlankProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Box>
        <Avatar
          src={icon?.src}
          variant="square"
          sx={{
            width: "60px",
            height: "60px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
      </Box>
      <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default TableBlank;
