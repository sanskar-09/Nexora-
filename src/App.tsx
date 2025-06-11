import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

<<<<<<< HEAD
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
=======
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Auth routes without navigation */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create-account" element={<CreateAccount />} />
              
              {/* Routes with navigation */}
              <Route path="/*" element={
                <>
                  <Navigation 
                    onAuthChange={setIsAuthenticated}
                    isAuthenticated={isAuthenticated}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                  <main>
                    <Routes>
                      <Route path="/" element={<Index activeTab={activeTab} setActiveTab={setActiveTab} />} />
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
                      <Route path="/about" element={<About />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};
>>>>>>> parent of 57c75f1 (Combine login and signup pages)

export default App;
