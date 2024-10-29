import React, { useState } from "react";
import { useGetEmployees } from "../api/getEmployees";
import { Table } from "react-bootstrap";

const AdminPage: React.FC = () => {
  const [{ page, limit }, setPagination] = useState({ page: 0, limit: 10 });
  const {
    data: employeeData,
    isLoading,
    error,
  } = useGetEmployees({
    page,
    limit,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Department</th>
            <th>Position</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Profile Image</th>
          </tr>
        </thead>
        <tbody>
          {employeeData?.data?.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName || "-"}</td>
              <td>{employee.lastName || "-"}</td>
              <td>{employee.email || "-"}</td>
              <td>{employee.role || "-"}</td>
              <td>{employee.department?.name || "-"}</td>
              <td>{employee.position || "-"}</td>
              <td>{employee.phoneNumber || "-"}</td>
              <td>{employee.dateOfBirth || "-"}</td>
              <td>{employee.address || "-"}</td>
              <td>{employee.profileImageUrl || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPage;
