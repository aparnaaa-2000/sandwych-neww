import apiInstance from '../../instants/api';

const useAcceptSupport = async acceptData => {
  try {
    const response = await apiInstance.post(`/support-requests/accept`, {
      ...acceptData,
    });
    console.log('req accept responce....', response?.data);
    return response?.data;
  } catch (error) {
    console.log('error code req accept...', error);
  }
};

export default useAcceptSupport;
