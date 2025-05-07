import axios from 'axios';
import { getValidToken } from './AuthService';


const BASE_URL = import.meta.env.VITE_PRODUCT_SERVICE;

// Create axios instance with interceptors
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to inject token dynamically
axiosInstance.interceptors.request.use( async config => {
  const token = await getValidToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle token expiration here
      console.error('Authentication error - redirect to login');
    }
    return Promise.reject(error);
  }
);

export const fetchProducts = async (params = {}) => {
  const defaultParams = {
    sortBy: 'createdAt',
    sortOrder: 'DESC',
    page: 1,
    pageSize: 10
  };

  try {
    const response = await axiosInstance.get('/products', {
      params: {
        ...defaultParams,
        ...params,
        // Convert 0 values to actual numbers
        minPrice: params.minPrice !== undefined ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice !== undefined ? Number(params.maxPrice) : undefined,
        minRating: params.minRating !== undefined ? Number(params.minRating) : undefined,
        maxRating: params.maxRating !== undefined ? Number(params.maxRating) : undefined,
      }
    });

    return {
      success: true,
      products: response.data.products,
      totalPages: response.data.totalPages,
      currentPage: response.data.currentPage
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch products'
    };
  }
};