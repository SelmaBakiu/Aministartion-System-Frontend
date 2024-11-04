import EmployeePage from "../features/employee/routes/EmployeePage.tsx";
import Layout from "../components/Layout/Layout.tsx";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ChatPage } from "../features/chat/routes/ChatPage.tsx";
import DepartmentEmployees from "../features/employee/routes/DepartmentEmployees.tsx";
import { DepartmentPage } from "../features/department/routes/DepartmentPage.tsx";

const App = () => {
  return (
    <>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </Layout>
    </>
  );
};

export const adminRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <DepartmentPage /> },
      {
        path: "/departments/:departmentId/employees",
        element: <DepartmentEmployees />,
      },
      { path: "employee", element: <EmployeePage /> },
      { path: "chat", element: <ChatPage /> },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
];

export const employeeRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <EmployeePage /> },
      { path: "chat", element: <ChatPage /> },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
];
