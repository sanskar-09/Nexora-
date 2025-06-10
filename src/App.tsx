import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import SymptomChecker from "./components/SymptomChecker";
import MedicationManager from "./components/MedicationManager";
import HealthMonitoring from "./components/HealthMonitoring";
import Telemedicine from "./components/Telemedicine";
import HealthEducation from "./components/HealthEducation";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/medication" element={<MedicationManager />} />
          <Route path="/health-monitoring" element={<HealthMonitoring />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/education" element={<HealthEducation />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
