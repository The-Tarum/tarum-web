
import axios from 'axios';

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

// // Add request interceptor
// firebaseService.interceptors.request.use(
//   async (config) => {
//     if (!config.url.includes('signInWithPassword') && !config.url.includes('token')) {
//       const token = await getValidToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default firebaseService;