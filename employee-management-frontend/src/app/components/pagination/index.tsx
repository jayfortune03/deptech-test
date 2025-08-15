"use client";
import { TablePagination } from "@mui/material";
import { PaginationProps } from "./types";

export default function Pagination({
  count,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: PaginationProps) {
  console.log(
    `🥶🥶🥶🥶 ~ フ ク ロ ウ Pagination ~ フ ク ロ ウ rowsPerPage:`,
    rowsPerPage
  );
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
