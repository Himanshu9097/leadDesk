import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';

import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import LeadsTable from './pages/LeadsTable';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="leads" element={<LeadsTable />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-center" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
