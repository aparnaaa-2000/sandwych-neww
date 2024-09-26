import apiInstance from '../../instants/api';

const useNearByRequest = async rejected_request_id => {
  try {
    const responce = await apiInstance.post(
      `request/support/by/supportmember`,
      {
        rejected_request_id,
      },
    );

    console.log('successfull data.....', responce?.data);

    return responce?.data;
  } catch (error) {
    console.log('error code...', error);
  }
};

export default useNearByRequest;
