import axios from 'axios';
import keycloak from './keycloak';

const api = axios.create({
  baseURL: 'http://localhost:9000', // API Gateway URL
});

// Automatically inject Bearer token into outgoing requests
api.interceptors.request.use((config) => {
  if (keycloak.authenticated && keycloak.token) {
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

export const placeOrder = (orderData) => api.post('/api/order', orderData);

export const getOrders = () => api.get('/api/order');

export const checkInventory = (skuCode, quantity) =>
  api.get(`/api/inventory?skuCode=${skuCode}&quantity=${quantity}`);

export default api;