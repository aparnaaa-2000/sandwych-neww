import apiInstance from '../../instants/api';

const useGetProfile = async () => {
  try {
    const response = await apiInstance.get(`/profile`);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export default useGetProfile;
