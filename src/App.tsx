import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { authService } from "./services";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin' | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      try {
        const user = authService.getCurrentUser();
        if (user && user.token) {
          setIsAuthenticated(true);
          setUserRole(user.role as 'patient' | 'doctor' | 'admin');
        } else {
          setIsAuthenticated(false);
          setUserRole(undefined);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
        setUserRole(undefined);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Function to handle login
  const handleLogin = (authenticated: boolean, role?: 'patient' | 'doctor' | 'admin') => {
    setIsAuthenticated(authenticated);
    setUserRole(role);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Index 
                isAuthenticated={isAuthenticated} 
                userRole={userRole} 
                onAuthChange={handleLogin} 
              />
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
