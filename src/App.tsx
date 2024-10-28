// App.tsx
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './features/login/routes/LoginPage.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient, QueryClientProvider} from "react-query";
import EmployeePage from "./features/employee/routes/EmployeePage.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchInterval: 1000 * 60 * 1,
        },
    },
})

const App: React.FC = () => {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>

                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/unauthorized" element={<p>unauthorized</p>}/>

                        {/* Admin Routes */}
                        <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute allowedRoles={['ADMINISTRATOR']}>
                                    <Routes>
                                        <Route path="dashboard" element={<p>administrator</p>}/>
                                        {/* Add other admin routes */}
                                    </Routes>
                                </ProtectedRoute>
                            }
                        />

                        {/* Employee Routes */}
                        <Route
                            path="/employee/*"
                            element={
                                <ProtectedRoute allowedRoles={['EMPLOYEE']}>
                                    <Routes>
                                        <Route path="" element={<EmployeePage />}/>

                                        <Route path="dashboard" element={<p>dashboard</p>}/>
                                        {/* Add other employee routes */}
                                    </Routes>
                                </ProtectedRoute>
                            }
                        />

                        <Route path="/" element={<Navigate to="/login" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </AuthProvider>
    );
};

export default App;