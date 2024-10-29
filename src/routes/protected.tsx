import EmployeePage from "../features/employee/routes/EmployeePage.tsx";
import AdminPage from "../features/admin/routes/AdminPage.tsx";
import Layout from "../components/Layout/Layout.tsx";
import { Button } from "react-bootstrap";
import LoginPage from "../features/login/routes/LoginPage.tsx";
import ChatButton from "../components/Chat/ChatButton.tsx";
import { ChatPage1 } from "../features/chat/routes/ChatPage1.tsx";
import {ChatPage2} from "../features/chat/routes/ChatPage2.tsx";
import DepartmentPage from "../features/departament/routes/DepartmentPage.tsx";

export const adminRoutes = [
  {
    path: "/",
    element: (
        <Layout
        navbarChildren={
            <>
            <ChatButton />
            </>
          }
        >
        <DepartmentPage />
      </Layout>
    ),
  },
];

export const employeeRoutes = [
    {
      path: "/",
      element: (
        <Layout
          navbarChildren={
            <>
            <ChatButton />
            </>
          }
        >
          <ChatPage1 />
        </Layout>
      ),
    },
  ];

export const chatRoot = [
    {
      path: "/",
      element: (
        <Layout>
          <>
          navbarChildren={
            <>
              <Button onClick={() => {}}>Chat</Button>
            </>
          }
            <LoginPage />
          </>
        </Layout>
      ),
    },
  ];
