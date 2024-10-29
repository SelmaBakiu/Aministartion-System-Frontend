import EmployeePage from "../features/employee/routes/EmployeePage.tsx";
import AdminPage from "../features/admin/routes/AdminPage.tsx";
import Layout from "../components/Layout/Layout.tsx";
<<<<<<< Updated upstream
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import ChatPage from "../features/chat/routes/ChatPage.tsx";

const App = () => {
    return <>
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet/>
            </Suspense>
        </Layout>
    </>
}

export const adminRoutes = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <AdminPage/>},
            {path: "employee", element: <EmployeePage/>},
            {path: "chat", element: <ChatPage />},
            {path: "*", element: <div>Not Found</div>},
        ],
    }
=======
import { Button } from "react-bootstrap";
import LoginPage from "../features/login/routes/LoginPage.tsx";
import ChatButton from "../components/Chat/ChatButton.tsx";
import { ChatPage1 } from "../features/chat/routes/ChatPage1.tsx";
import {ChatPage2} from "../features/chat/routes/ChatPage2.tsx";

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
        <ChatPage2 />
      </Layout>
    ),
  },
>>>>>>> Stashed changes
];

export const employeeRoutes = [
    {
<<<<<<< Updated upstream
        path: "/",
        element: <App/>,
        children: [
            {path: "", element: <AdminPage/>},
            {path: "employee", element: <EmployeePage/>},
            {path: "chat", element: <ChatPage/>},
            {path: "*", element: <div>Not Found</div>},
        ]
    }
];
=======
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
>>>>>>> Stashed changes
