
import axios from 'axios';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 30000
    });

    this.client.interceptors.request.use(this.handleRequest);
    this.client.interceptors.response.use(this.handleResponse, this.handleError);
  }

  handleRequest = (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  handleResponse = (response) => response.data;

  handleError = (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  };

  get = (url, config = {}) => this.client.get(url, config);
  post = (url, data, config = {}) => this.client.post(url, data, config);
  put = (url, data, config = {}) => this.client.put(url, data, config);
  delete = (url, config = {}) => this.client.delete(url, config);
}

export const apiClient = new ApiClient();
