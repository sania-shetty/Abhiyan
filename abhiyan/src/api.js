import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const signup = (userData) => API.post('/signup', userData);
export const signin = (credentials) => API.post('/signin', credentials);
export const submitDetails = (details) => API.post('/details/submit', details);
