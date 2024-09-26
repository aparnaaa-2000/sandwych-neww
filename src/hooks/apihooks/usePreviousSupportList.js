import apiInstance from '../../instants/api';

const usePreviousSupportList = async (uid) => {
  try {
    const responce = await apiInstance.get(`/previous/requests?user_id=${uid}`);
    console.log('previous support data', responce?.data);
    return responce?.data;
  } catch (error) {
    console.log('error previouse support ', error);
  }
};

export default usePreviousSupportList;
