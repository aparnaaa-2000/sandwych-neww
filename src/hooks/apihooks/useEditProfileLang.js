import apiInstance from '../../instants/api';

const useEditProfileLang = async () => {
  try {
    const response = await apiInstance.get(`/languages/list`);
    console.log("Language List..." , response?.data);
    return response?.data;
  } catch (error) {
    console.log('Error_code', error);

    throw error;
  }
};

export default useEditProfileLang;
