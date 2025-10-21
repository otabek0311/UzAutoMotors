import api from '../utils/api';
import Cookies from 'js-cookie';

export const authService = {
  // Register
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  // Verify OTP
  verifyOtp: async (data) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
  },

  // Login
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    if (response.data.success) {
      Cookies.set('AccessToken', response.data.data.accessToken, { expires: 1/96 }); // 15 minutes
      Cookies.set('RefreshToken', response.data.data.refreshToken, { expires: 15 }); // 15 days
    }
    return response.data;
  },

  // Logout
  logout: () => {
    Cookies.remove('AccessToken');
    Cookies.remove('RefreshToken');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!Cookies.get('AccessToken');
  },
};
