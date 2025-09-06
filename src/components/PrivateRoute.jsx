import React, { useEffect } from 'react';

const PrivateRoute = ({ auth, children }) => {
  const { keycloak, authenticated } = auth;

  useEffect(() => {
    if (keycloak && !authenticated) {
      keycloak.login();
    }
  }, [keycloak, authenticated]);

  if (!authenticated) {
    return <div>Redirecting to login...</div>;
  }

  return children;
};

export default PrivateRoute;