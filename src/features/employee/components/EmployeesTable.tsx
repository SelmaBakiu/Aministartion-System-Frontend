import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableProps } from "../../department/types/employee";
import { colors } from "../../../styles/colors";

export const EmployeesTable: React.FC<TableProps> = ({
  employees,
  onEdit,
  onDelete,
}) => {
  return (
    <Paper sx={{ width: "100%", mb: 2, bgcolor: colors.background }}>
      <TableContainer>
        <Table aria-label="employees table">
          <TableHead>
            <TableRow sx={{ bgcolor: colors.accent }}>
              <TableCell sx={{ color: colors.text }}>First Name</TableCell>
              <TableCell sx={{ color: colors.text }}>Last Name</TableCell>
              <TableCell sx={{ color: colors.text }}>Email</TableCell>
              <TableCell sx={{ color: colors.text }}>Position</TableCell>
              <TableCell align="right" sx={{ color: colors.text }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell sx={{ color: colors.text }}>
                    {employee.firstName}
                  </TableCell>
                  <TableCell sx={{ color: colors.text }}>
                    {employee.lastName}
                  </TableCell>
                  <TableCell sx={{ color: colors.text }}>
                    {employee.email}
                  </TableCell>
                  <TableCell sx={{ color: colors.text }}>
                    {employee.position}
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <EditIcon
                        sx={{ color: colors.secondary, cursor: "pointer" }}
                        onClick={() => onEdit(employee)}
                      />
                      <DeleteIcon
                        sx={{ color: "#dc3545", cursor: "pointer" }}
                        onClick={() => onDelete(employee)}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ color: colors.text }}
                >
                  No employees found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
