import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get the token from AsyncStorage
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('TOKENAuth');
    return token;
  } catch (error) {
    console.error('Error getting the token', error);
    return null;
  }
};

// Create Axios instance
const apiInstance = axios.create({
  baseURL: 'http://18.237.111.97:2000/api',
  timeout: 5000,
});

// Add a request interceptor to include the token in headers
apiInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers['Content-Type'] = 'multipart/form-data'; // Adding Content-Type
    }
    return config;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default apiInstance;
