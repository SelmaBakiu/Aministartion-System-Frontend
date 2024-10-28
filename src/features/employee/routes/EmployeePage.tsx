
import React, {useState} from 'react';
import {useGetEmployees} from "../api/getEmployees.ts";

const EmployeePage = () => {
    const [{page, limit}, setPagination] = useState({page: 0, limit: 10});
    const getEmployees = useGetEmployees()

    console.log("getEmployees", getEmployees.data);
  return (
    <div>
      <h1>Employee Dashboard</h1>
      {/* Employee profile management will go here */}
    </div>
  );
};

export default EmployeePage;
