import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { ModalComponent } from "../../../components/Modal/Modal";
import {
  EmployeeModalProps,
  DeleteModalProps,
} from "../../department/types/employee";
import { colors } from "../../../styles/colors";

export const EmployeeFormModal: React.FC<EmployeeModalProps> = ({
  open,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  isLoading,
  mode,
}) => {
  const title = mode === "create" ? "Create Employee" : "Edit Employee";
  const submitText = mode === "create" ? "Create" : "Save Changes";

  return (
    <ModalComponent open={open} handleClose={onClose} width="400px">
      <Box
        sx={{
          bgcolor: colors.background,
          p: 3,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: colors.text }}>
          {title}
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Position"
            name="position"
            value={formData.position}
            onChange={onInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary,
                },
              },
            }}
          />
          <FormControl fullWidth sx={{ bgcolor: "#fff", borderRadius: 1 }}>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={onInputChange}
              label="Role"
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="administrator">Administrator</MenuItem>
            </Select>
          </FormControl>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: colors.secondary,
                borderColor: colors.secondary,
                "&:hover": {
                  borderColor: colors.secondary,
                  backgroundColor: `${colors.secondary}10`,
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={isLoading}
              sx={{
                bgcolor: colors.primary,
                "&:hover": {
                  bgcolor: colors.primary + "dd",
                },
                "&:disabled": {
                  bgcolor: colors.primary + "80",
                },
              }}
            >
              {submitText}
            </Button>
          </Box>
        </Box>
      </Box>
    </ModalComponent>
  );
};

export const DeleteConfirmationModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  isLoading,
  employeeName,
}) => {
  return (
    <ModalComponent open={open} handleClose={onClose} width="400px">
      <Box sx={{ bgcolor: colors.background, p: 3, borderRadius: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: colors.text }}>
          Confirm Delete
        </Typography>
        <Typography sx={{ mb: 3, color: colors.text }}>
          Are you sure you want to delete {employeeName}?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: 1 }}>
          <Button
            variant="contained"
            onClick={onConfirm}
            disabled={isLoading}
            sx={{
              bgcolor: "#dc3545",
              "&:hover": {
                bgcolor: "#bb2d3b",
              },
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              bgcolor: colors.secondary,
              "&:hover": {
                bgcolor: colors.secondary + "dd",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </ModalComponent>
  );
};

