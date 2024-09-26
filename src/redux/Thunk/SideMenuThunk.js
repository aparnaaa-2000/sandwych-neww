import { aboutBegin, aboutClear, aboutFailure, aboutSuccess } from '../Slice/Sidemenu/AboutUsKey';
import { faqBegin, faqClear, faqFailure, faqSuccess } from '../Slice/Sidemenu/FaqKey';
import { PrivacyPolicyBegin, PrivacyPolicyClear, PrivacyPolicyFailure, PrivacyPolicySuccess } from '../Slice/Sidemenu/PrivacyPolicyKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

//ABOUT US

export const getAboutUs = async (token, dispatch) => {
    dispatch(aboutClear());
    dispatch(aboutBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + '/aboutSandwych', {
        headers: headers,
      })
      .then(res => {
        dispatch(aboutSuccess(res.data));
      })
      .catch(error => {
        dispatch(aboutFailure(error));
      });
  };
  

  //GET PRIVACY POLICY
  export const getPrivacyPolicy = async (token, dispatch) => {
    dispatch(PrivacyPolicyClear());
    dispatch(PrivacyPolicyBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/privacy_policy`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(PrivacyPolicySuccess(res?.data));
      })
      .catch(error => {
        dispatch(PrivacyPolicyFailure(error));
      });
  };
  

  //FAQ
export const getFAQ = async (token, dispatch) => {
    dispatch(faqClear());
    dispatch(faqBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/faq`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(faqSuccess(res?.data?.faq));
      })
      .catch(error => {
        dispatch(faqFailure(error));
      });
  };