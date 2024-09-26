import apiInstance from '../../instants/api';

const useFinish = async (data) => {
  try {
    const responce = await apiInstance.post(`/finish/task` , data);

    console.log('successfully finish task...', responce);

    return responce?.data;
  } catch (error) {
    console.log('error task...', error);
  }
};


export default useFinish;