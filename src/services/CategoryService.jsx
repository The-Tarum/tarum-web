import axios from 'axios';
import { getValidToken } from './AuthService';

const BASE_URL = import.meta.env.VITE_CATEGORY_SERVICE;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject token
axiosInstance.interceptors.request.use(async config => {
  const token = await getValidToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Authentication error - redirect to login');
    }
    return Promise.reject(error);
  }
);

export const fetchCategories = async () => {
  const res = await axiosInstance.get('/categories');
  return res.data;
};

export const fetchSubcategories = async (categoryId) => {
  const res = await axiosInstance.get(`/subcategories`, {
    params: { categoryId },
  });
  return res.data;
};
