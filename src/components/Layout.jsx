import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ auth, children }) => {
  const { keycloak, authenticated } = auth;

  const handleLogin = () => keycloak.login();
  const handleLogout = () => keycloak.logout();

  return (
    <div className="container">
      <header>
        <Link to="/" style={{ textDecoration: 'none', color: '#5a67d8' }}>
          <h1>📝 My Notes App</h1>
        </Link>
        <nav>
          {authenticated ? (
            <div>
              <span>Welcome, <strong>{keycloak.tokenParsed.preferred_username}</strong></span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;