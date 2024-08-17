import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React from "react";

const Paginationjob = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        variant="outlined"
        color="primary"
        page={page}
        onChange={onChange}
      />
    </Stack>
  );
};

export default Paginationjob;
