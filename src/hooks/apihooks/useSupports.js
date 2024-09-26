import apiInstance from '../../instants/api';

const useSupports = async user_id => {
  try {
    const response = await apiInstance.get(
      `/supports/providing?user_id=${user_id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default useSupports;
