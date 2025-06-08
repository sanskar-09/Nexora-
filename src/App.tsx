import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import NotFound from "@/pages/NotFound";
import Dashboard from "@/components/Dashboard";
import Home from "@/components/Home";

function App() {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | 'admin'>('patient');
  const location = useLocation();

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Router>
        <div className="min-h-screen">
          <header className="bg-gradient-to-r from-gray-800 to-gray-900 p-4">
            <nav className="container mx-auto flex justify-between items-center">
              <h1 className="text-4xl font-bold text-blue-400">Nexora Classic</h1>
              <div className="space-x-6">
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
              </div>
            </nav>
          </header>
          
          <main className="container mx-auto p-4 mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 mt-8">
        <div className="container mx-auto">
          <div className="footer-grid">
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-4">Nexora Classic</h3>
              <p className="text-gray-400">
                Your trusted healthcare companion, providing modern medical solutions
                with a classic touch.
              </p>
            </div>
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="footer-link">Home</Link>
                </li>
                <li>
                  <Link to="/dashboard" className="footer-link">Dashboard</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="footer-contact">
                Email: support@nexora-classic.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400">&copy; 2025 Nexora Classic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
