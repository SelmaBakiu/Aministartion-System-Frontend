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
import { ModalComponent } from "../../../components/Modal/Modal";
import { useGetAllDepartment } from "../api/getDepartment";
import { useCreateDepartment } from "../api/createDepartment";
import { UpdateDepartment } from "../types";
import { colors } from "../../../styles/colors";
import Toast from "../../../components/Toast/Toast";

const CreateDepartmentButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createDepartmentMutation = useCreateDepartment();
  const { data: departments = [], isLoading: isLoadingDepartments } =
    useGetAllDepartment();
    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
      "error"
    );

  

  const initialFormData: UpdateDepartment = {
    name: "",
    description: "",
    parentDepartmentId: "",
  };

  const [formData, setFormData] = useState<UpdateDepartment>(initialFormData);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialFormData);
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as string]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDepartmentMutation.mutateAsync(formData);
      handleCloseModal();
      setToastOpen(true)
      setToastMessage("Department created succesful.")
      setToastSeverity("success")
    } catch (error) {
      setToastOpen(true)
      setToastMessage(error.message)
      setToastSeverity('error')
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleOpenModal}
        sx={{ 
          bgcolor: colors.primary,
          '&:hover': {
            bgcolor: colors.primary + 'dd',
          },
          '&:disabled': {
            bgcolor: colors.primary + '80',
          },
        }}
      >
        Create Department
      </Button>

      <ModalComponent
        open={isModalOpen}
        handleClose={handleCloseModal}
        width="500px"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            p: 3,
            borderRadius: 2,
          }}
        >
          <TextField
            fullWidth
            label="Department Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ bgcolor: "#fff", borderRadius: 1 }}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
            sx={{ bgcolor: "#fff", borderRadius: 1 }}
          />

          <FormControl fullWidth sx={{ bgcolor: "#fff", borderRadius: 1 }}>
            <InputLabel>Parent Department</InputLabel>
            <Select
              name="parentDepartmentId"
              value={formData.parentDepartmentId || ""}
              onChange={handleChange}
              label="Parent Department"
              disabled={isLoadingDepartments}
            >
              <MenuItem value="">None</MenuItem>
              {departments
                .filter((dept) => !dept.isDeleted)
                .map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
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
              disabled={
                createDepartmentMutation.isLoading || isLoadingDepartments
              }
              sx={{ 
                bgcolor: colors.primary,
                '&:hover': {
                  bgcolor: colors.primary + 'dd',
                },
                '&:disabled': {
                  bgcolor: colors.primary + '80',
                },
              }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </ModalComponent>
      <Toast
            open={toastOpen}
            onClose={() => setToastOpen(false)}
            message={toastMessage}
            severity={toastSeverity}
          />
    </>
  );
};

export default CreateDepartmentButton;
