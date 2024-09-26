import { CancelResourceBegin, CancelResourceClear, CancelResourceFailure, CancelResourceSuccess } from '../Slice/Resources/CancelResourceKey';
import { CompletionResourceBegin, CompletionResourceClear, CompletionResourceFailure, CompletionResourceSuccess } from '../Slice/Resources/CompletedStatusResourceKey';
import { IncompleteResourceBegin, IncompleteResourceClear, IncompleteResourceFailure, IncompleteResourceSuccess } from '../Slice/Resources/IncompleteResourceStatusKey';
import { InprocessResourceBegin, InprocessResourceClear, InprocessResourceFailure, InprocessResourceSuccess } from '../Slice/Resources/InprocessResourceKey';
import { PreviousResourceBegin, PreviousResourceClear, PreviousResourceFailure, PreviousResourceSuccess } from '../Slice/Resources/PreviousResourceKey';
import { ResourceCategoryBegin, ResourceCategoryClear, ResourceCategoryFailure, ResourceCategorySuccess } from '../Slice/Resources/ResourceCategoryKey';
import { ResourceNetworkRequestBegin, ResourceNetworkRequestClear, ResourceNetworkRequestFailure, ResourceNetworkRequestSuccess } from '../Slice/Resources/ResourceNetworkRequestKey';
import { ResourceRequestBegin, ResourceRequestClear, ResourceRequestFailure, ResourceRequestSuccess } from '../Slice/Resources/ResourceRequestKey';
import { ResourceSubCategoryBegin, ResourceSubCategoryClear, ResourceSubCategoryFailure, ResourceSubCategorySuccess } from '../Slice/Resources/ResourceSubCategoryKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api'

//RESOURCE CATEGORY

export const GetResourceCategory = async (token, dispatch) => {
    dispatch(ResourceCategoryClear());
    dispatch(ResourceCategoryBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + '/resource_categories_index', {
        headers: headers,
      })
      .then(res => {
        dispatch(ResourceCategorySuccess(res.data));
      })
      .catch(error => {
        dispatch(ResourceCategoryFailure(error));
      });
  };

  //RESOURCE SUB CATEGORY
export const GetResourceSubCategory = async (
    resourceCategory_id,
    token,
    dispatch,
  ) => {
    dispatch(ResourceSubCategoryClear());
    dispatch(ResourceSubCategoryBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/resource_sub_categories_index/${resourceCategory_id}`, {
        headers: headers,
      })
      .then(res => {
        dispatch(ResourceSubCategorySuccess(res.data));
      })
      .catch(error => {
        dispatch(ResourceSubCategoryFailure(error));
      });
  };
  

  //RESOURCE REQUEST FORM,LIST,DETAILS

export const ResourceRequestForm = async (
    resource_subcategory_id,
    patient_id,
    date,
    time,
    note,
    zipcode,
    address,
    contact_number,
    priority,
    token,
    dispatch,
  ) => {
    dispatch(ResourceRequestClear());
    dispatch(ResourceRequestBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      resource_subcategory_id,
      patient_id,
      date,
      time,
      note,
      zipcode,
      address,
      contact_number,
      priority,
    };
  
    try {
      const response = await axios.post(baseUrl + `/requestResource`, req, {
        headers: headers,
      });
  
      dispatch(ResourceRequestSuccess(response.data));
    } catch (error) {
      dispatch(ResourceRequestFailure(error?.response));
    }
  };

  //RESOURCE NETWORK REQUEST
export const ResourceNetworkRequest = async (
    resource_subcategory_id,
    patient_id,
    date,
    time,
    note,
    zipcode,
    address,
    contact_number,
    priority,
    resource_network_id,
    token,
    dispatch,
  ) => {
    dispatch(ResourceNetworkRequestClear());
    dispatch(ResourceNetworkRequestBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      resource_subcategory_id,
      patient_id,
      date,
      time,
      note,
      zipcode,
      address,
      contact_number,
      priority,
      resource_network_id,
    };
  
    console.log('REQUEST SUPPORT..................', req);
    try {
      const response = await axios.post(
        baseUrl + `/requestResourceNetwork`,
        req,
        {
          headers: headers,
        },
      );
  
      dispatch(ResourceNetworkRequestSuccess(response.data));
    } catch (error) {
      dispatch(ResourceNetworkRequestFailure(error?.response));
    }
  };

  //GET INPROCESS RESOURCE

  export const GetResourceInprocess = async (patient_id, token, dispatch) => {
    dispatch(InprocessResourceClear());
    dispatch(InprocessResourceBegin());
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
      const response = await axios.post(baseUrl + `/resourceRequestList`, req, {
        headers: headers,
      });
  
      dispatch(InprocessResourceSuccess(response.data));
    } catch (error) {
      dispatch(InprocessResourceFailure(error?.response));
    }
  };

  //GET PREVIOUS RESOURCES
export const GetResourcePrevious = async (patient_id, token, dispatch) => {
    dispatch(PreviousResourceClear());
    dispatch(PreviousResourceBegin());
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
        baseUrl + `/completedResourceRequestList`,
        req,
        {
          headers: headers,
        },
      );
  
      dispatch(PreviousResourceSuccess(response.data));
    } catch (error) {
      dispatch(PreviousResourceFailure(error?.response));
    }
  };
  

  //Cancel resource

export const CancelResource = async (
    patient_id,
    resource_request_id,
    token,
    dispatch,
  ) => {
    dispatch(CancelResourceClear());
    dispatch(CancelResourceBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      patient_id,
      resource_request_id,
    };
  
    console.log('REQUEST SUPPORT..................', req);
    try {
      const response = await axios.post(baseUrl + `/cancelResourceRequest`, req, {
        headers: headers,
      });
  
      dispatch(CancelResourceSuccess(response.data));
    } catch (error) {
      dispatch(CancelResourceFailure(error?.response));
    }
  };


  
//UPDATE INCOMPLETION STATUS OF RESOURCE
export const ResourceIncompletionStatus = async (
    patient_id,
    resource_request_id,
    completion_status,
    decline_reason,
    message,
    token,
    dispatch,
  ) => {
    dispatch(IncompleteResourceClear());
    dispatch(IncompleteResourceBegin());
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
      message,
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
  
      dispatch(IncompleteResourceSuccess(response.data));
    } catch (error) {
      dispatch(IncompleteResourceFailure(error?.response));
    }
  };
  
  //UPDATE COMPLETION STATUS OF RESOURCE
  
  export const ResourceCompletionStatus = async (
    patient_id,
    resource_request_id,
    completion_status,
    rating,
    opinion,
    token,
    dispatch,
  ) => {
    dispatch(CompletionResourceClear());
    dispatch(CompletionResourceBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      patient_id,
      resource_request_id,
      completion_status,
      rating,
      opinion,
    };
  
    console.log('REQUEST SUPPORT..................', req);
    try {
      const response = await axios.post(baseUrl + `/storeCompletionStatus`, req, {
        headers: headers,
      });
  
      dispatch(CompletionResourceSuccess(response.data));
  
      console.log('SUPPORT SUCCESS..............', response?.data);
    } catch (error) {
      dispatch(CompletionResourceFailure(error?.response));
      console.log('SUPPORT ERROR................', error.response);
    }
  };