import apiInstance from '../../instants/api';

const useSupportList = async () => {
  try {
    const response = await apiInstance.get('/upcoming/tasks');
     console.log('upcoming user data....' , response?.data?.tasks);
    return response?.data?.tasks;
  } catch (error) {
    throw error;
  }
};

export default useSupportList;
