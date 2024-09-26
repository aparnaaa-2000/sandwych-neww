import apiInstance from '../../instants/api';

const useTaskList = async () => {
  try {
    const response = await apiInstance.get(`/upcoming/tasks`);
    return response?.data;
  } catch (error) {
    console.log('error upcoming task...', error);
    throw error;
  }
};

export default useTaskList;
