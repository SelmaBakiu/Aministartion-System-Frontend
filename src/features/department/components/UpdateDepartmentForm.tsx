import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Department, UpdateDepartment } from "../types";
import { colors } from "../../../styles/colors";

interface UpdateDepartmentFormProps {
  department: Department;
  departments: Department[];
  onSubmit: (updatedDepartment: UpdateDepartment) => void;
  onCancel: () => void;
}

export const UpdateDepartmentForm: React.FC<UpdateDepartmentFormProps> = ({
  department,
  departments,
  onSubmit,
  onCancel,
}) => {
  const initialFormData: UpdateDepartment = {
    name: department.name,
    description: department.description,
    parentDepartmentId: department.parentDepartmentId,
  };

  const [formData, setFormData] = useState<UpdateDepartment>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
      />

      {formData.parentDepartmentId !== null && (
        <FormControl fullWidth>
          <InputLabel>Parent Department</InputLabel>
          <Select
            name="parentDepartmentId"
            value={formData.parentDepartmentId || ""}
            onChange={handleChange}
            label="Parent Department"
          >
            {departments
              .filter((dept) => dept.id !== department.id && !dept.isDeleted)
              .map((dept) => {
                return dept.parentDepartmentId !== department.id ? (
                  <MenuItem key={dept.id} value={dept.id} selected>
                    {dept.name}
                  </MenuItem>
                ) : null;
              })}
          </Select>
        </FormControl>
      )}

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            color: "#1976d2",
            borderColor: colors.secondary,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: colors.primary,
            "&:hover": {
              bgcolor: colors.primary + "dd",
            },
          }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};
