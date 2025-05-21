import axios from 'axios';
import UserResponseDto from "../dtos/user.dto.js";

const BASE_URL = import.meta.env.VITE_USER_SERVICE;

// Attach auth token to every request if present
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));

  export const register = async (registerDto) => {
    const response = await axios.post(`${BASE_URL}/register`, registerDto);
    return response.data;
  };

  /**
   * Fetch the current user's profile from the API
   * @returns {Promise<UserResponseDto>}
   */
  export const getProfile = async () => {
    const cached = localStorage.getItem('user');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        return new UserResponseDto(parsed);
      } catch {
        // ignore
      }
    }

    const response = await axios.get(`${BASE_URL}/getProfile`);
    const userResponseDto = new UserResponseDto(response.data);
    localStorage.setItem('user', JSON.stringify(response.data));
    return userResponseDto;
  };

  export default {
    register,
    getProfile
  };
  