import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  TablePagination,
  Button,
} from "@mui/material";
import { useGetEmployees } from "../api/getEmployees";
import { useInsertEmployee } from "../api/insertEmployee";
import { useUpdateEmployee } from "../api/updateEmloyee";
import { useDeleteEmployee } from "../api/deleteEmployee";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDebounce } from "../hooks/useDebounce";
import { SearchBar } from "../components/SearchBar";
import { EmployeesTable } from "../components/EmployeesTable";
import {
  EmployeeFormModal,
  DeleteConfirmationModal,
} from "../components/EmployeeModals";
import { Employee, EmployeeFormData } from "../../department/types/employee";
import { colors } from "../../../styles/colors";
import Toast from "../../../components/Toast/Toast";

const DepartmentEmployees: React.FC = () => {
  const navigate = useNavigate();
  const { departmentId } = useParams<{ departmentId: string }>();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [formData, setFormData] = useState<EmployeeFormData>({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    role: "employee",
  });
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "error"
  );

  const insertMutation = useInsertEmployee();
  const updateMutation = useUpdateEmployee(selectedEmployee?.id);
  const deleteMutation = useDeleteEmployee();

  const debouncedFirstName = useDebounce(firstName, 500);
  const debouncedLastName = useDebounce(lastName, 500);

  useEffect(() => {
    setPage(0);
  }, [debouncedFirstName, debouncedLastName]);

  const {
    data: employeesData,
    isLoading,
    error,
  } = useGetEmployees({
    page: page,
    limit: rowsPerPage,
    firstName: debouncedFirstName,
    lastName: debouncedLastName,
    departmentId: departmentId,
  });

  const handleCreateClick = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      position: "",
      role: "employee",
    });
    setIsCreateModalOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      position: employee.position,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleCreateSubmit = async () => {
    try {
      await insertMutation.mutateAsync({
        ...formData,
        departmentId,
      });
      setIsCreateModalOpen(false);
      setToastOpen(true);
      setToastSeverity("success");
      setToastMessage("Employee created successfully");
    } catch (error) {
      console.error("Error creating employee:", error);
      setToastOpen(true);
      setToastSeverity("error");
      setToastMessage("Error creating employee: " + error.message);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedEmployee?.id) return;
    try {
      const updatedEmployee = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        position: formData.position,
        role: selectedEmployee.role,
      };
      await updateMutation.mutateAsync(updatedEmployee);
      setIsEditModalOpen(false);
      setToastOpen(true);
      setToastSeverity("success");
      setToastMessage("Employee updated successfully");
    } catch (error) {
      console.error("Error updating employee:", error);
      setToastOpen(true);
      setToastSeverity("error");
      setToastMessage("Error updating employee: " + error.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEmployee?.id) return;
    try {
      await deleteMutation.mutateAsync(selectedEmployee.id);
      setIsDeleteModalOpen(false);
      setToastOpen(true);
      setToastSeverity("success");
      setToastMessage("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      setToastOpen(true);
      setToastSeverity("error");
      setToastMessage("Error deleting employee: " + error.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!departmentId) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Department ID is missing</Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error loading employees data</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    );
  }

  const employees = employeesData?.data || [];
  const totalCount = employeesData?.all || 0;

  return (
    <Box sx={{ p: 3 }}>
      <SearchBar
        firstName={firstName}
        lastName={lastName}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
        onClearSearch={() => {
          setFirstName("");
          setLastName("");
        }}
        onCreateClick={handleCreateClick}
      />
      <EmployeesTable
        employees={employees}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <TablePagination
        sx={{ backgroundColor: colors.background }}
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          setRowsPerPage(parseInt(e.target.value, 10))
        }
      />
      <EmployeeFormModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        mode="create"
      />
      <EmployeeFormModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        formData={formData}
        onInputChange={handleInputChange}
        mode="edit"
      />
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        employeeName={selectedEmployee?.firstName}
      />
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </Box>
  );
};

export default DepartmentEmployees;
