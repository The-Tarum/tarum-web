import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { handleError } from './ErrorHandlingService';

let tokenRefreshTimeout;

const refreshTokenPeriodically = async (auth) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      localStorage.setItem('token', token);

      // Refresh token 5 minutes before expiry (tokens last 1 hour)
      tokenRefreshTimeout = setTimeout(() => refreshTokenPeriodically(auth), 55 * 60 * 1000);
    }
  } catch (error) {
    handleError(error);
  }
};

// Initialize Firebase and set up auth state listener
const initializeFirebase = () => {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      refreshTokenPeriodically(auth);
    } else {
      if (tokenRefreshTimeout) {
        clearTimeout(tokenRefreshTimeout);
      }
    }
  });

  return auth;
};


const API_KEY = 'AIzaSyCCZ-ahrrYhigpTGFuwTVtsB-j-0O8YsYA';

const firebaseService = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    key: API_KEY,
  },
});

// Add request interceptor
firebaseService.interceptors.request.use(
  async (config) => {
    if (!config.url.includes('signInWithPassword') && !config.url.includes('token')) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

initializeFirebase(); // Initialize Firebase after defining the service

export default firebaseService;