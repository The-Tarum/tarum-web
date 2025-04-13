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

export default firebaseService;
