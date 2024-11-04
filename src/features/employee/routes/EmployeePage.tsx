import { useGetEmployee } from "../api/getEmployee.ts";
import { useEffect, useState, useRef } from "react";
import { Employee, ResetPasswordRequest } from "../types/index.ts";
import { useupdateProfile } from "../api/updateProfile.ts";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { Camera } from "lucide-react";
import { useUploadEmployeeImage } from "../api/uploadEmployeeImage.ts";
import { colors } from "../../../styles/colors.ts";
import storage from "../../../utils/storage.ts";
import Toast from "../../../components/Toast/Toast.tsx";
import { useRessetPassword } from "../api/resetPassword.ts";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": { borderColor: colors.primary },
    "&.Mui-focused fieldset": { borderColor: colors.primary },
    "&.Mui-disabled": { backgroundColor: colors.accent },
  },
  "& .MuiInputLabel-root": {
    color: colors.text,
    "&.Mui-focused": { color: colors.primary },
  },
};

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, error, isLoading } = useGetEmployee();
  const [resetPassword, setResetPassword] = useState<ResetPasswordRequest>({
    oldPassword: "",
    newPassword: "",
  });
  const updateEmployee = useupdateProfile();
  const uploadMutation = useUploadEmployeeImage();
  const useResetPassword = useRessetPassword();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "error"
  );

  useEffect(() => {
    if (data) {
      setEmployee(data);
      setImagePreview(data.profileImageUrl);
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (employee) {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("file", file);
      uploadMutation.mutate(formData);
      setToastMessage("Image uploaded successfully.");
      setToastSeverity("success");
      setToastOpen(true);
    }
  };

  const handleUpdateEmployee = () => {
    if (employee) {
      try {
        updateEmployee.mutate(employee);
        setToastMessage("Employee updated successfully.");
        setToastSeverity("success");
        setToastOpen(true);
      } catch (error) {
        console.error("Error updating employee:", error);
        setToastMessage("Error updating employee: " + error.message);
        setToastSeverity("error");
        setToastOpen(true);
      }
    }
  };

  const handleRessetPassword =  () => {
    try {
      useResetPassword.mutate(resetPassword);
      useResetPassword.isSuccess && setToastMessage("Password reset successfully!");
      useResetPassword.isError && setToastMessage("Error resetting password: " + useResetPassword.error.message);
      setToastSeverity(useResetPassword.isSuccess ? "success" : "error");
      setToastOpen(true);
    } catch (error) {
      console.error("Error resetting password:", error);
      setToastMessage("Error resetting password: " + error.message);
      setToastSeverity("error");
      setToastOpen(true);
    }
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ backgroundColor: colors.background }}
      >
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  if (error)
    return <Alert severity="error">Error loading employee data.</Alert>;

  const isEmployee = storage.getUser().user.role === "employee";

  const formFields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "role", label: "Role", disabled: isEmployee },
    {
      name: "department",
      label: "Department",
      value: employee?.department?.name,
      disabled: isEmployee,
    },
    { name: "position", label: "Position" },
    { name: "phoneNumber", label: "Phone Number" },
    { name: "address", label: "Address" },
    { name: "dateOfBirth", label: "Date of Birth", type: "date" },
  ];

  return (
    <>
      <Box>
        {employee && (
          <Paper
            sx={{
              p: 2,
              borderRadius: "16px",
              maxWidth: 1200,
              mx: "auto",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={imagePreview || employee.profileImageUrl}
                    sx={{
                      width: 100,
                      height: 100,
                      cursor: "pointer",
                      border: `4px solid ${colors.primary}`,
                      "&:hover": { transform: "scale(1.02)" },
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      bgcolor: colors.secondary,
                      borderRadius: "50%",
                      p: 1,
                      cursor: "pointer",
                      "&:hover": { bgcolor: colors.primary },
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Camera size={15} color="white" />
                  </Box>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Box>
              </Grid>

              {formFields.map((field) => (
                <Grid item xs={8} sm={4} key={field.name}>
                  <TextField
                    fullWidth
                    {...field}
                    value={
                      field.value || employee[field.name as keyof Employee]
                    }
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: field.type === "date" ? true : undefined,
                    }}
                    sx={textFieldStyles}
                  />
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                onClick={handleUpdateEmployee}
                sx={{
                  bgcolor: colors.primary,
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: colors.secondary,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
      <Box mt={2}>
        <Paper
          sx={{
            p: 2,
            borderRadius: "16px",
            maxWidth: 1200,
            mx: "auto",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="Old Password"
                  name="oldPassword"
                  type="password"
                  value={resetPassword.oldPassword}
                  onChange={(e) =>
                    setResetPassword({
                      ...resetPassword,
                      oldPassword: e.target.value,
                    })
                  }
                  sx={textFieldStyles}
                />
              </Box>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
              <Box sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={resetPassword.newPassword}
                  onChange={(e) =>
                    setResetPassword({
                      ...resetPassword,
                      newPassword: e.target.value,
                    })
                  }
                  sx={textFieldStyles}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleRessetPassword}
              sx={{
                bgcolor: colors.primary,
                px: 4,
                py: 1.5,
                borderRadius: "8px",
                "&:hover": {
                  bgcolor: colors.secondary,
                  transform: "translateY(-2px)",
                },
              }}
            >
              Reset Password
            </Button>
          </Box>
        </Paper>
      <Toast
        open={toastOpen}
        severity={toastSeverity}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
      />
      </Box>
    </>
  );
};

export default EmployeePage;
