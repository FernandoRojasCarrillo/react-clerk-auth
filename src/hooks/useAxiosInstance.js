// src/hooks/useAxiosInstance.js
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';

const useAxiosInstance = () => {
  const { getToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001', // Define la URL base para todas las solicitudes
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosInstance;
