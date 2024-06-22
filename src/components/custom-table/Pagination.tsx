import { Pagination, Stack } from "@mui/material";

interface Props {
  count: number;
  page: number;
  handleChange: (event: any, newNumber: number) => void;
}
const Paginations = ({ count, page, handleChange }: Props) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={2}
      mt={2}
      mr={2}
      mb={2}
      padding={2}
    >
      <Pagination
        count={count}
        page={page}
        variant="outlined"
        color="primary"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Paginations;
