import apiInstance from '../../instants/api';

const useUpdateProfile = async (data) => {

  console.log('UPDATE_API_SENDING_DATA====>' , data);
  
  try {
    const response = await apiInstance.post(`/update/profile` , data);
     console.log('UPDATE_PROFILE' , response?.data);
    return response?.data;
  } catch (error) {
    throw error;
  }
};

export default useUpdateProfile;
