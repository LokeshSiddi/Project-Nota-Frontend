import axios from 'axios';
import keycloak from '../keycloak';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
});

// Use an interceptor to inject the token into every request
api.interceptors.request.use(
  async (config) => {
    try {
      // This is the best place to ensure the token is valid
      const refreshed = await keycloak.updateToken(5); // Refresh if token expires in 5s
      if (refreshed) {
        console.log('Token was refreshed');
      }
    } catch (error) {
      console.error('Could not refresh token!', error);
      // Optionally, you could force a logout here
      // keycloak.logout(); 
      return Promise.reject(error);
    }

    // Add the Authorization header to the request
    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;