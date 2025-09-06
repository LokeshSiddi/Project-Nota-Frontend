// keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL || 'https://keycloak-c40y.onrender.com',
    realm: 'notes-realm',
    clientId: 'oauth2-pkce-client',
});

export default keycloak;