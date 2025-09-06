import React, { useState, useEffect } from 'react';
import keycloak from './keycloak';
import Notes from './components/Notes';

function App() {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      // The Keycloak init logic remains the same
      keycloak.init({ onLoad: 'login-required', pkceMethod: 'S256' }).then(auth => {
          if (auth) {
              setAuthenticated(true);
              console.log("Authenticated successfully");
          }
      }).catch(error => {
          console.error("Authentication failed", error);
      });
      // We have removed the setInterval logic as it's no longer needed.
      // The token is now refreshed on-demand by the Axios interceptor.
  }, []);

    const handleLogout = () => {
        keycloak.logout();
    };

    if (!authenticated) {
        return <div>Loading or authenticating...</div>;
    }

    return (
        <div>
            <h1>My Notes</h1>
            <p>Welcome, {keycloak.tokenParsed.preferred_username}</p>
            <button onClick={handleLogout}>Logout</button>
            <hr />
            <Notes />
        </div>
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