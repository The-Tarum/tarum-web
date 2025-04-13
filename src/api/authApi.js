import firebaseService from '../services/firebaseService';

export const login = async (loginDto) => {
  try {
    const response = await firebaseService.post('/accounts:signInWithPassword', loginDto);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};
