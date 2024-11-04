import React from "react";
import { DepartmentOrgChart } from "../components/DepartmentOrgChart";

export const DepartmentPage: React.FC = () => {
  return (
    <div 
    style={{display: "flex",flexDirection:"column"}}>
      <DepartmentOrgChart />
    </div>
  );
};
