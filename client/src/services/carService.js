import api from '../utils/api';

export const carService = {
  // Get all cars
  getAllCars: async (params) => {
    const response = await api.get('/cars', { params });
    return response.data;
  },

  // Get car by ID
  getCarById: async (id) => {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  // Get popular cars
  getPopularCars: async (limit = 8) => {
    const response = await api.get('/cars/popular', { params: { limit } });
    return response.data;
  },

  // Get latest cars
  getLatestCars: async (limit = 8) => {
    const response = await api.get('/cars/latest', { params: { limit } });
    return response.data;
  },

  // Create car
  createCar: async (formData) => {
    const response = await api.post('/cars', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update car
  updateCar: async (id, formData) => {
    const response = await api.put(`/cars/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete car
  deleteCar: async (id) => {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  },
};
