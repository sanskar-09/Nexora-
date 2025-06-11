
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import CreateAccount from "./pages/CreateAccount";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import SymptomChecker from "./components/SymptomChecker";
import MedicationManager from "./components/MedicationManager";
import HealthMonitoring from "./components/HealthMonitoring";
import Telemedicine from "./components/Telemedicine";
import HealthEducation from "./components/HealthEducation";

const queryClient = new QueryClient();

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                {/* Auth routes without navigation */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Routes with navigation */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <>
                      <Navigation 
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                      />
                      <main>
                        <Routes>
                          <Route path="/" element={<Index activeTab={activeTab} setActiveTab={setActiveTab} />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/signup" element={<Signup />} />
                          
                          <Route path="/symptom-checker" element={
                            <div className="container mx-auto px-4 py-8">
                              <SymptomChecker />
                            </div>
                          } />
                          <Route path="/medication" element={
                            <div className="container mx-auto px-4 py-8">
                              <MedicationManager />
                            </div>
                          } />
                          <Route path="/health-monitoring" element={
                            <div className="container mx-auto px-4 py-8">
                              <HealthMonitoring />
                            </div>
                          } />
                          <Route path="/telemedicine" element={
                            <div className="container mx-auto px-4 py-8">
                              <Telemedicine />
                            </div>
                          } />
                          <Route path="/education" element={
                            <div className="container mx-auto px-4 py-8">
                              <HealthEducation />
                            </div>
                          } />
                          
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </>
                  </ProtectedRoute>
                } />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
