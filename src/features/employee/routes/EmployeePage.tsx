import { useGetEmployee } from "../api/getEmployee.ts";
import { useEffect, useState } from "react";
import { Employee } from "../types/index.ts";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { data, error, isLoading } = useGetEmployee();

  useEffect(() => {
    if (data) {
      setEmployee(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <p>Name: {employee?.firstName} {employee?.lastName}</p>
      <p>Email: {employee?.email}</p>
      <p>Role: {employee?.role}</p>
      <p>Department: {employee?.department?.name}</p>
      <p>Position: {employee?.position}</p>
      <p>Phone Number: {employee?.phoneNumber}</p>
      <p>Date of Birth: {employee?.dateOfBirth}</p>
      <p>Address: {employee?.address}</p>

    </div>
  );
};

export default EmployeePage;