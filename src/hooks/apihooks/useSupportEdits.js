import apiInstance from '../../instants/api';

const useSupportEdit = async params => {
  try {
    const response = await apiInstance.post('/edit/supports/providing', params);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export default useSupportEdit;
