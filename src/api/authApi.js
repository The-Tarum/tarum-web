import firebaseService from '../services/firebaseService';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_USER_SERVICE;

export const login = async (loginDto) => {
  try {
    const response = await firebaseService.post('/accounts:signInWithPassword', loginDto);
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