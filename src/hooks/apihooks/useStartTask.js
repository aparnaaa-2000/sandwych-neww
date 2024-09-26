

import apiInstance from '../../instants/api';

const useStartTask = async data => {
  try {
    const response = await apiInstance.post(`/start/task` , data);

    console.log('successfully started task...', response?.data);

    return response?.data;
  } catch (error) {
    console.log('error issue', error);
  }
};


export default useStartTask;
