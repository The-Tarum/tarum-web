// src/services/SupplierService.js
import axios from 'axios';
import { getValidToken } from './AuthService';

const BASE_URL = import.meta.env.VITE_PRODUCT_SERVICE; // same base

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async config => {
  const token = await getValidToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      console.error('Auth error – redirect to login');
    }
    return Promise.reject(err);
  }
);

export const fetchSuppliers = async (params = {}) => {
  const defaultParams = {
    page: 1,
    pageSize: 10,
    // you can add defaults like sortBy, sortOrder, etc.
  };

  try {
    const response = await axiosInstance.get('/products/suppliers/with-products', {
      params: {
        ...defaultParams,
        ...params,
        // ensure numeric types
        page: Number(params.page ?? defaultParams.page),
        pageSize: Number(params.pageSize ?? defaultParams.pageSize),
        // pass through any filters:
        categoryId: params.categoryId,
        subCategoryId: params.subCategoryId,
        minRating: params.minRating,
        search: params.search,
      },
    });

    return {
      success: true,
      data: response.data,          // array of { supplier, products }
      totalPages: Number(response.headers['x-total-pages'] || 1),
      currentPage: Number(response.headers['x-current-page'] || params.page),
    };
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
