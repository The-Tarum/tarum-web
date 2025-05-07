import { UserDTO } from '../dtos/user.dto';
import ApiService from './ApiService';

export class AuthService {
  static instance = null;

  constructor() {
    if (AuthService.instance) {
      return AuthService.instance;
    }
    this.api = new ApiService();
    AuthService.instance = this;
  }

  async login(credentials) {
    try {
      const response = await this.api.post('/auth/login', credentials);
      this.setTokens(response.tokens);
      return new UserDTO(response.user);
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    try {
      const response = await this.api.post('/auth/refresh', { refreshToken });
      this.setTokens(response.tokens);
      return response.tokens.accessToken;
    } catch (error) {
      this.logout();
      throw error;
    }
  }

  setTokens(tokens) {
    localStorage.setItem('token', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

export default new AuthService();