import apiInstance from '../../instants/api';

const useRejectSupport = async rejectData => {

  console.log('reeejjjjjjeeeeecccccttttteeeeedddddd' , rejectData);
  
  try {
    const response = await apiInstance.post(`/support-requests/reject`, {
      ...rejectData,
    });

    console.log('response reject...', response?.data);

    return response?.data;
  } catch (error) {
    console.log('error reject code....', error);
  }
};

export default useRejectSupport;
