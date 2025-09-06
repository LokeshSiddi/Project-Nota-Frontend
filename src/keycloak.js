import Keycloak from 'keycloak-js';

// Use Vite's `import.meta.env` syntax for all configuration values.
const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak-c40y.onrender.com',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'notes-realm',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'oauth2-pkce-client',
});

export default keycloak;