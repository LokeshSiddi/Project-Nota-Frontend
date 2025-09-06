import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, User } from 'lucide-react';

const Layout = ({ auth, children }) => {
  const { authenticated } = auth;
  const location = useLocation();

  const showNav = authenticated && location.pathname.startsWith('/dashboard');

  return (
    <div className="app-container">
      <main className="main-content">
        {children}
      </main>
      {showNav && (
        <nav className="bottom-nav">
          <Link to="/dashboard" className="nav-item active">
            <Home size={24} />
            <span>Home</span>
          </Link>
          <div className="nav-item">
            {/* The FAB is separate, so this is a placeholder */}
          </div>
          <Link to="/profile" className="nav-item">
            <User size={24} />
            <span>Profile</span>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Layout;
