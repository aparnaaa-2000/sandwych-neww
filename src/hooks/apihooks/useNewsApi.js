import apiInstance from '../../instants/api';

const useNewsApi = async () => {
  try {
    const response = await apiInstance.get('/news');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default useNewsApi;
