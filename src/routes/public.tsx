import {Navigate} from "react-router-dom";
import LoginPage from "../features/login/routes/LoginPage.tsx";

export const publicRoutes = [
    {path: "/", element: <LoginPage/>},
    { path: "*", element: <Navigate to={"/"} /> },
];