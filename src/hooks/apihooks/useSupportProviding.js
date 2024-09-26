import apiInstance from '../../instants/api';

const useSupportProviding = async uid => {
  try {
    const responce = await apiInstance(`/supports/providing?user_id=${uid}`);

    console.log('response for all dataa...', responce?.data);
    return responce?.data;
  } catch (error) {
    console.log('error code datas....', error);
  }
};


export default useSupportProviding;
