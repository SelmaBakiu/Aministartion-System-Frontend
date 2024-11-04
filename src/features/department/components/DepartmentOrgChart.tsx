import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { OrganizationChart } from "primereact/organizationchart";
import { getDepartment, useGetAllDepartment } from "../api/getDepartment";
import { useDeleteDepartment } from "../api/deleteDepartment";
import { useUpdateDepartment } from "../api/updateDepartment";
import { Department, OrgChartNode } from "../types";
import { ModalComponent } from "../../../components/Modal/Modal";
import { UpdateDepartmentForm } from "./UpdateDepartmentForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { colors } from "../../../styles/colors";
import CreateDepartmentButton from "./CreateDepartment";
import Toast from "../../../components/Toast/Toast";

export const DepartmentOrgChart: React.FC = () => {
  const navigate = useNavigate();
  const { data: departments, isLoading, refetch } = useGetAllDepartment();
  const deleteDepMutation = useDeleteDepartment();
  const updateDepMutation = useUpdateDepartment();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  const handleActions = async (
    e: MouseEvent,
    department: Department,
    action: "delete" | "update"
  ) => {
    e.stopPropagation();
    const dept = await getDepartment(department.id);
    setSelectedDepartment(dept);
    action === "delete" ? setDeleteModalOpen(true) : setUpdateModalOpen(true);
  };
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "error"
  );

  const handleConfirmDelete = async () => {
    if (selectedDepartment) {
      try {
        await deleteDepMutation.mutateAsync(selectedDepartment.id);
        setDeleteModalOpen(false);
        setToastOpen(true);
        setToastMessage("Department deleted successfully");
        setToastSeverity("success");
        refetch();
      } catch (error) {
        console.error("Error deleting department:", error);
        setToastOpen(true);
        setToastMessage("Error deleting department");
        setToastSeverity("error");
      }
    }
  };

  const DeleteModal = () => (
    <ModalComponent
      open={deleteModalOpen}
      handleClose={() => setDeleteModalOpen(false)}
      width="400px"
    >
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography
          variant="h6"
          sx={{ color: colors.text, mb: 2, fontWeight: 600 }}
        >
          Confirm Delete
        </Typography>
        <Typography sx={{ color: colors.text, mb: 3 }}>
          Are you sure you want to delete {selectedDepartment?.name}?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              bgcolor: "#ff4444",
              textTransform: "none",
              px: 3,
            }}
          >
            Delete
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            variant="contained"
            sx={{
              bgcolor: colors.secondary,
              textTransform: "none",
              px: 3,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </ModalComponent>
  );

  const nodeTemplate = (node: OrgChartNode) => {
    return (
      <div className="org-chart-node">
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            "&:hover": {
              "& .action-buttons": {
                opacity: 1,
              },
            },
          }}
        >
          <Typography
            onClick={() => navigate(`/departments/${node.data.id}/employees`)}
            sx={{
              color: colors.text,
              cursor: "pointer",
              "&:hover": { color: colors.primary },
              fontWeight: 500,
            }}
          >
            {node.label}
          </Typography>
          <Box
            className="action-buttons"
            sx={{
              display: "flex",
              gap: 0.5,
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
          >
            <Button
              sx={{
                minWidth: 30,
                width: 30,
                height: 30,
                p: 0,
                "&:hover": { bgcolor: colors.accent },
              }}
              onClick={(e) => handleActions(e, node.data, "update")}
            >
              <EditIcon sx={{ fontSize: 18, color: colors.secondary }} />
            </Button>
            <Button
              sx={{
                minWidth: 30,
                width: 30,
                height: 30,
                p: 0,
                "&:hover": { bgcolor: "#ffebee" },
              }}
              onClick={(e) => handleActions(e, node.data, "delete")}
            >
              <DeleteIcon sx={{ fontSize: 18, color: "#ff4444" }} />
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  const transformToOrgChartData = (
    departments: Department[]
  ): OrgChartNode[] => {
    if (!departments?.length) return [];

    const buildTree = (parentId: string | null = null): OrgChartNode[] => {
      return departments
        .filter(
          (dept) => dept.parentDepartmentId === parentId && !dept.isDeleted
        )
        .map((dept) => ({
          key: dept.id,
          label: dept.name,
          data: dept,
          type: "department",
          style: {
            padding: "0.75rem",
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: `1px solid ${colors.accent}`,
            transition: "all 0.2s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              borderColor: colors.primary,
            },
          },
          expanded: true,
          children: buildTree(dept.id),
        }));
    };

    return buildTree(null);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  return (
    <>
      <div style={{ display: "flex",flexDirection:"column",overflow: "auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <CreateDepartmentButton />
        </div>
        {departments?.length ? (
          <>
            <OrganizationChart
              value={transformToOrgChartData(departments)}
              nodeTemplate={nodeTemplate}
            />
            <style>{`

.p-organizationchart-line-down,
.p-organizationchart-line-up,
.p-organizationchart-line-right,
.p-organizationchart-line-left {
  background-color: ${colors.primary};
}
`}</style>
          </>
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="200px"
            >
              <Typography sx={{ color: colors.text }}>
                No departments found
              </Typography>
            </Box>
          </>
        )}
        <DeleteModal />
        {updateModalOpen && selectedDepartment && (
          <ModalComponent
            open={updateModalOpen}
            handleClose={() => setUpdateModalOpen(false)}
            width="500px"
          >
            <Box sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ color: colors.text, mb: 2, fontWeight: 600 }}
              >
                Update Department
              </Typography>
              <UpdateDepartmentForm
                department={selectedDepartment}
                departments={departments || []}
                onSubmit={async (data) => {
                  try {
                    await updateDepMutation.mutateAsync({
                      departmentId: selectedDepartment.id,
                      data,
                    });
                    setToastOpen(true);
                    setToastMessage("Department updated successfully");
                    setToastSeverity("success");
                    setUpdateModalOpen(false);
                  } catch (error) {
                    console.error("Error updating department:", error);
                    setToastOpen(true);
                    setToastMessage("Error updating department");
                    setToastSeverity("error");
                  }
                }}
                onCancel={() => setUpdateModalOpen(false)}
              />
            </Box>
          </ModalComponent>
        )}
      </div>
      <Toast
        open={toastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};
