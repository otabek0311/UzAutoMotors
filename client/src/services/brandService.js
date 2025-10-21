import api from '../utils/api';

export const brandService = {
  // Get all brands
  getAllBrands: async (params) => {
    const response = await api.get('/brands', { params });
    return response.data;
  },

  // Get brand by ID
  getBrandById: async (id) => {
    const response = await api.get(`/brands/${id}`);
    return response.data;
  },

  // Create brand
  createBrand: async (formData) => {
    const response = await api.post('/brands', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update brand
  updateBrand: async (id, formData) => {
    const response = await api.put(`/brands/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete brand
  deleteBrand: async (id) => {
    const response = await api.delete(`/brands/${id}`);
    return response.data;
  },
};
