"use client";

import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AdminTableBody from "./components/admin-table-body";
import { AdminTableProps } from "./types";
import { employeeTableHeader } from "./config";

export default function AdminTable({
  admins,
  loading,
  error,
  page,
  rowsPerPage,
  totalAdmins,
  handleChangePage,
  handleChangeRowsPerPage,
}: AdminTableProps) {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        background: "#F2F3F4",
        paddingX: isMobile ? "1rem" : "2rem",
        paddingY: "2rem",
        borderRadius: "8px",
        boxShadow: 2,
        marginTop: "4rem",
      }}
    >
      {loading ? (
        <Typography variant="h5" sx={{ color: "#00796b" }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h5" sx={{ color: "#d32f2f" }}>
          {error}
        </Typography>
      ) : admins.length > 0 ? (
        <TableContainer sx={{ maxHeight: 400, marginTop: "2rem" }}>
          <Table sx={{}}>
            <TableHead
              sx={{
                backgroundColor: "#00796b",
                "& th": {
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                },
              }}
            >
              <TableRow>
                {employeeTableHeader.map((el, idx) => {
                  return (
                    <TableCell key={idx} sx={{ padding: "8px 16px" }}>
                      {el}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <AdminTableBody
              page={page}
              rowsPerPage={rowsPerPage}
              admins={admins}
            />
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h5" sx={{ color: "#00796b", marginTop: "2rem" }}>
          No employees found
        </Typography>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalAdmins}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-select": {
            backgroundColor: "#e0f2f1",
          },
          "& .MuiTablePagination-actions button": {
            color: "#00796b",
          },
        }}
      />
    </Box>
  );
}
