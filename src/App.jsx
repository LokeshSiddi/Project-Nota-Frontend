import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import keycloak from './keycloak';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PublicNotePage from './pages/PublicNotePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [auth, setAuth] = useState({ keycloak: null, authenticated: false });

  useEffect(() => {
    keycloak.init({ 
      // This is the critical change:
      // 'login-required' is more reliable than 'check-sso'.
      // It will redirect to the login page if the user is not logged in,
      // which avoids the timeout issue and ensures the app always loads correctly.
      onLoad: 'check-sso', 
      pkceMethod: 'S256',
    })
      .then(authenticated => {
        setAuth({ keycloak: keycloak, authenticated: authenticated });
      })
      .catch(error => console.error("Authentication failed", error));
  }, []);

  if (!auth.keycloak) {
    return <div className="loading-state">Initializing Authentication...</div>;
  }

  return (
    <Layout auth={auth}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute auth={auth}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="/note/public/:shareableId" element={<PublicNotePage />} />
      </Routes>
    </Layout>
  );
}

export default App;






// import React, { useState, useEffect } from 'react';
// import keycloak from './keycloak';
// import Notes from './components/Notes';

// function App() {
//     const [authenticated, setAuthenticated] = useState(false);

//     useEffect(() => {
//     keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256', }).then(auth => {
//         if (auth) {
//             setAuthenticated(true);

//             // Refresh token every 60 seconds
//             setInterval(() => {
//                 keycloak.updateToken(30).catch(() => {
//                     console.log('Failed to refresh token');
//                     keycloak.logout();
//                 });
//             }, 60000);
//         }
//     });
// }, []);


//     const handleLogout = () => {
//         keycloak.logout();
//     };

//     if (!authenticated) {
//         return <div>Loading or authenticating...</div>;
//     }

//     return (
//         <div>
//             <h1>My Notes</h1>
//             <button onClick={handleLogout}>Logout</button>
//             <Notes />
//         </div>
//     );
// }

// export default App;