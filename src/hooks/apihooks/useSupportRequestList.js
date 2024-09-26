import apiInstance from '../../instants/api';

const useSupportRequestList = async uid => {
    console.log('user id...' , uid);
  try {
    const response = await apiInstance.get(`/requests?user_id=${uid}`);

    console.log('successfully response...', response?.data);
    return response?.data;
  } catch (error) {
    console.log('error_code', error);
  }
};

export default useSupportRequestList;
