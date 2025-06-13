import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Login from "./components/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SymptomsChecker from './pages/SymptomsChecker';
import SubmitSymptoms from './pages/SubmitSymptoms';
import Appointments from './pages/Appointments';
import AddMedication from './pages/AddMedication';
import LogVitals from './pages/LogVitals';
import NewAppointment from './pages/NewAppointment';
import QuickActionsHistory from './pages/QuickActionsHistory';

const queryClient = new QueryClient();

const AppContent = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/');
  };

  return (
    <AuthProvider onAuthSuccess={handleAuthSuccess}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/symptoms-checker" element={<SymptomsChecker />} />
          <Route path="/submit-symptoms" element={<SubmitSymptoms />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/medications/add" element={<AddMedication />} />
          <Route path="/vitals/log" element={<LogVitals />} />
          <Route path="/quick-actions/history" element={<QuickActionsHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
