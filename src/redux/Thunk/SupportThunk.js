import { NearBySupportRequestBegin, NearBySupportRequestClear, NearBySupportRequestFailure, NearBySupportRequestSuccess } from '../Slice/Support/NearBySupportRequestKey';
import { supportAcceptBegin, supportAcceptClear, supportAcceptFailure, supportAcceptSuccess } from '../Slice/Support/SupportAcceptKey';
import { supportCancelBegin, supportCancelClear, supportCancelFailure, supportCancelSuccess } from '../Slice/Support/SupportCancelRequestKey';
import { supportCompletionBegin, supportCompletionClear, supportCompletionFailure, supportCompletionSuccess } from '../Slice/Support/SupportCompletionKey';
import { supportInCompletionBegin, supportInCompletionClear, supportInCompletionFailure, supportInCompletionSuccess } from '../Slice/Support/SupportIncompletionKey';
import { supportInprocessBegin, supportInprocessClear, supportInprocessFailure, supportInprocessSuccess } from '../Slice/Support/SupportInprocessKey';
import { supportMemberListBegin, supportMemberListClear, supportMemberListFailure, supportMemberListSuccess } from '../Slice/Support/SupportMemberListKey';
import { supportMemberReqBegin, supportMemberReqClear, supportMemberReqFailure, supportMemberReqSuccess } from '../Slice/Support/SupportMemberRequestKey';
import { supportPreviousBegin, supportPreviousClear, supportPreviousFailure, supportPreviousSuccess } from '../Slice/Support/SupportPreviousKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

//SUPPORT REQUEST FORM

export const SupportRequestForm = async (
  support_id,
  patient_id,
  date,
  time,
  note,
  zipcode,
  address,
  token,
  dispatch,
) => {
  dispatch(supportMemberListClear());
  dispatch(supportMemberListBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    support_id,
    patient_id,
    date,
    time,
    note,
    zipcode,
    address,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/requestSupport`, req, {
      headers: headers,
    });

    dispatch(supportMemberListSuccess(response.data));
  } catch (error) {
    dispatch(supportMemberListFailure(error?.response));
  }
};


//SUPPORT MEMBER REQUEST FORM

export const SupportMemberRequest = async (
  support_id,
  patient_id,
  date,
  time,
  note,
  zipcode,
  address,
  support_member_id,
  token,
  dispatch,
) => {
  dispatch(supportMemberReqClear());
  dispatch(supportMemberReqBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    support_id,
    patient_id,
    date,
    time,
    note,
    zipcode,
    address,
    support_member_id,
  };


  try {
    const response = await axios.post(baseUrl + `/requestSupportMember`, req, {
      headers: headers,
    });

    dispatch(supportMemberReqSuccess(response.data));
  } catch (error) {
    console.log("ERROR..............",error)
    dispatch(supportMemberReqFailure(error?.response));
  }
};


//LIST NEARBY SUPPORT
export const NearBySupportRequestList = async (
    patient_id,
    token,
    dispatch,
  ) => {
    dispatch(NearBySupportRequestClear());
    dispatch(NearBySupportRequestBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      patient_id
    };
  
    try {
      const response = await axios.post(baseUrl + `/nearBySupportRequestsSendBySupportMembers`, req, {
        headers: headers,
      });
  
      dispatch(NearBySupportRequestSuccess(response.data));
    } catch (error) {
      dispatch(NearBySupportRequestFailure(error?.response));
    }
  };


  //NEARBY SUPPORT ACCEPT/REJECT

  export const NearBySupportRequestAcceptReject = async (
    patient_id,
    rejected_request_id,
    support_request_id,
    request_status,
    token,
    dispatch,
  ) => {
    dispatch(supportAcceptClear());
    dispatch(supportAcceptBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      patient_id,
      rejected_request_id,
      support_request_id,
      request_status
    };
  
    try {
      const response = await axios.post(baseUrl + `/acceptOrRejectNearBySupportRequest`, req, {
        headers: headers,
      });
  
      dispatch(supportAcceptSuccess(response.data));
    } catch (error) {
      dispatch(supportAcceptFailure(error?.response));
    }
  };


  //get inprocess
export const GetSupportInprocess = async (patient_id, token, dispatch) => {
  dispatch(supportInprocessClear());
  dispatch(supportInprocessBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/supportRequestList`, req, {
      headers: headers,
    });

    dispatch(supportInprocessSuccess(response.data));
  } catch (error) {
    dispatch(supportInprocessFailure(error?.response));
  }
};


//get inprocess
export const GetSupportPrevious = async (patient_id, token, dispatch) => {
  dispatch(supportPreviousClear());
  dispatch(supportPreviousBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(
      baseUrl + `/completedSupportRequestList`,
      req,
      {
        headers: headers,
      },
    );

    dispatch(supportPreviousSuccess(response.data));
  } catch (error) {
    dispatch(supportPreviousFailure(error?.response));
  }
};

//CANCEL THE REQUESTED SUPPORT

export const CancelSupport = async (
  patient_id,
  support_request_id,
  token,
  dispatch,
) => {
  dispatch(supportCancelClear());
  dispatch(supportCancelBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    support_request_id,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/cancelSupportRequest`, req, {
      headers: headers,
    });

    dispatch(supportCancelSuccess(response.data));
  } catch (error) {
    dispatch(supportCancelFailure(error?.response));
  }
};

//INCOMPLETE REASON FOR THE SUPPORT

export const SupportIncompletion = async (
  patient_id,
  resource_request_id,
  completion_status,
  decline_reason,
  message,
  token,
  dispatch,
) => {

  console.log("..................",  patient_id,
    resource_request_id,
    completion_status,
    decline_reason,
    message,)

  dispatch(supportInCompletionClear());
  dispatch(supportInCompletionBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    resource_request_id,
    completion_status,
    decline_reason,
    message
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(
      baseUrl + `/storeInCompletionStatus`,
      req,
      {
        headers: headers,
      },
    );

    dispatch(supportInCompletionSuccess(response.data));
  } catch (error) {
    dispatch(supportInCompletionFailure(error?.response));
  }
};

//UPDATE COMPLETION STATUS OF SUPPORT

export const SupportCompletion = async (
  patient_id,
  support_request_id,
  completion_status,
  rating,
  opinion,
  token,
  dispatch,
) => {
  dispatch(supportCompletionClear());
  dispatch(supportCompletionBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    support_request_id,
    completion_status,
    rating,
    opinion,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/storeCompletionStatus`, req, {
      headers: headers,
    });

    dispatch(supportCompletionSuccess(response.data));

    console.log('SUPPORT SUCCESS..............', response?.data);
  } catch (error) {
    dispatch(supportCompletionFailure(error?.response));
    console.log('SUPPORT ERROR................', error);
  }
};

