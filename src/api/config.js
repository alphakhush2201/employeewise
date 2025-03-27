export const API_BASE_URL = 'https://reqres.in/api';

export const getAuthHeader = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const commonHeaders = {
  'Content-Type': 'application/json',
};