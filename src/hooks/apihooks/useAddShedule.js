import apiInstance from '../../instants/api';

const useAddShedule = async shedules => {
  console.log('Sheduled...' , shedules);
  try {
    const response = await apiInstance.post(`/schedule`, shedules);

    console.log('sheduled successfull' , response?.data);


    return response?.data
    
  } catch (error) {
    console.log('error_code', error);

    throw error;
  }
};

export default useAddShedule;
