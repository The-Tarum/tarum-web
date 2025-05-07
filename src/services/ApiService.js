
import axios from 'axios';
import AuthService from './AuthService';


class ApiService {
  constructor(baseUrl) {
    this.api = axios.create({
      baseURL :baseUrl,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.api.interceptors.request.use(
      this.handleRequestInterceptor,
      this.handleRequestError
    );

    this.api.interceptors.response.use(
      this.handleResponseInterceptor,
      this.handleResponseError
    );
  }

  handleRequestInterceptor = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  handleRequestError = (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  };

  handleResponseInterceptor = (response) => {
    return response.data;
  };

  handleResponseError = async (error) => {
    if (!error.response) {
      throw new Error('Network error');
    }

    const { status, data } = error.response;
    const originalRequest = error.config;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const token = await AuthService.refreshToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return this.api(originalRequest);
      } catch (refreshError) {
        AuthService.logout();
        window.location.href = '/auth/login';
        throw refreshError;
      }
    }

    if (status === 403) {
      throw new Error('Access denied');
    }

    if (status === 404) {
      throw new Error('Resource not found');
    }

    throw new Error(data.message || 'An error occurred');
  };

  async refreshToken() {
    // eslint-disable-next-line no-useless-catch
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await this.api.post('/auth/refresh', { refreshToken });
      localStorage.setItem('token', response.token);
      return response.token;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiService();
