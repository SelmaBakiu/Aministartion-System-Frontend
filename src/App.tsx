// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<p>unauthorized</p>} />
          
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['ADMINISTRATOR']}>
                <Routes>
                  <Route path="dashboard" element={<p>administrator</p>} />
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
                  <Route path="dashboard" element={<p>dashboard</p>} />
                  {/* Add other employee routes */}
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;