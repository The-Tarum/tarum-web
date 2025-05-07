
import firebaseService from './FirebaseService';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_USER_SERVICE;

// Check if token needs refresh
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expTime;
  } catch (e) {
    return true;
  }
};

// Refresh token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await firebaseService.post('/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    });

    localStorage.setItem('token', response.data.id_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    return response.data.id_token;
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    throw error;
  }
};

// Get current valid token
export const getValidToken = async () => {
  const token = localStorage.getItem('token');
  if (isTokenExpired(token)) {
    return await refreshToken();
  }
  return token;
};

export const login = async (loginDto) => {
  try {
    const response = await firebaseService.post('/accounts:signInWithPassword', loginDto);
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const register = async (registerDto) => {
  const response = await axios.post(`${BASE_URL}/register`, registerDto);
  return response.data;
};