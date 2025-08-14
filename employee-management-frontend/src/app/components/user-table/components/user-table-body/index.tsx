import {
  Button,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { UserTableBodyProps } from "./types";
import { useState } from "react";
import { User } from "@/app/types/user";
import EditUserDialog from "@/app/components/dialog-edit-user";

export default function UserTableBody({
  users,
  page,
  rowsPerPage,
}: UserTableBodyProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenEditDialog = (user: User) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  return (
    <>
      <TableBody>
        {users.map((user, index) => (
          <TableRow
            key={user.id}
            sx={{
              "&:hover": {
                backgroundColor: "#f1f1f1",
              },
              backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
            }}
          >
            <TableCell sx={{ fontWeight: "bold" }}>
              {page * rowsPerPage + index + 1}
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#333" }}>
                {user.name}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {user.totalAverageWeightRatings}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {user.numberOfRents}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1" sx={{ color: "#777" }}>
                {user.recentlyActive}
              </Typography>
            </TableCell>
            <TableCell>
              <Tooltip
                title={`Total score counted with this formula : totalAverageWeightRatings * 1000000 + numberOfRents * 1000 + recentlyActive`}
                arrow
              >
                <Typography sx={{ color: "#00796b" }}>
                  {user.totalScore}
                </Typography>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Button
                onClick={() => handleOpenEditDialog(user)}
                color="primary"
                sx={{
                  backgroundColor: "#00796b",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#004d40",
                  },
                  padding: "6px 16px",
                  borderRadius: "4px",
                }}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          user={selectedUser}
        />
      )}
    </>
  );
}
