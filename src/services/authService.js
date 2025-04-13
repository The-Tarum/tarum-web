import axiosInstance from '../api/axiosInstance';
import { LoginDTO } from '../dtos/auth.dto';

export const login = async (loginDto) => {
  try {
    const response = await axiosInstance.post('/auth/login', loginDto);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
