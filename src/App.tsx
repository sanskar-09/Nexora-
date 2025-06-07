import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import Dashboard from "@/components/Dashboard";

function App() {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin'>('patient');

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <header className="bg-gray-800 p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Nexora Classic</h1>
            <div className="space-x-6">
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            </div>
          </nav>
        </header>
        
        <main className="container mx-auto p-4 mt-4">
          <Routes>
            <Route path="/" element={<Dashboard userRole={userRole} />} />
            <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 p-4 mt-8">
          <p className="text-center">&copy; 2025 Nexora Classic. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
