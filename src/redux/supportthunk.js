import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  selectservicesBegin,
  selectservicesClear,
  selectservicesFailure,
  selectservicesSuccess,
} from './Slice/SupportMember/SelectServicesSliceKey';
import {
  supportregisterBegin,
  supportregisterClear,
  supportregisterFailure,
  supportregisterSuccess,
} from './Slice/SupportMember/SupportRegisterSliceKey';
import {
  profilesupportBegin,
  profilesupportClear,
  profilesupportFailure,
  profilesupportSuccess,
} from './Slice/SupportMember/ProfileSupportSliceKey';
import apiInstance from '../instants/api';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

// Getting Services for SupportMember
export const getServicesforSupport = async dispatch => {
  dispatch(selectservicesClear());
  dispatch(selectservicesBegin());
  console.log('=========YES');

  await axios
    .get(baseUrl + '/supports')
    .then(res => {
      dispatch(selectservicesSuccess(res.data));
    })
    .catch(error => {
      dispatch(selectservicesFailure(error));
    });
};

// Register new Supportmember
// Third Method with Error code check validation.
export const RegisterSupport = async (
  role,
  identifier,
  name,
  email,
  phonenumber,
  address,
  zipcode,
  dob,
  gender,
  supports,
  dispatch,
) => {
  dispatch(supportregisterClear());
  dispatch(supportregisterBegin());

  const newReq = {
    role,
    identifier,
    name,
    email,
    zipcode,
    gender,
    dob,
    phonenumber,
    address,
    supports,
  };

  console.log('register details................', newReq);

  try {
    const res = await axios.post(baseUrl + '/signup', newReq);

    // Check if the status code indicates success
    if (res.status >= 200 && res.status < 300) {
      await AsyncStorage.setItem('TOKENAuth', res.data.token);
      console.log('SUCCESS....' + res.data);

      dispatch(supportregisterSuccess(res.data));
    } else {
      // Handle unexpected success codes
      console.error('Unexpected success status code: ' + res.status);
      dispatch(
        supportregisterFailure({
          message: 'Unexpected status code: ' + res.status,
        }),
      );
    }
  } catch (error) {
    // Log the entire error response for debugging
    console.error('Error response: ', error.response);

    if (error.response) {
      dispatch(supportregisterFailure(error.response.data));
      console.error('Failure....' + error.response.data);
    } else if (error.request) {
      dispatch(supportregisterFailure({message: 'No response received'}));
      console.error('No response received', error.request);
    } else {
      dispatch(supportregisterFailure({message: error.message}));
      console.error('Error setting up request', error.message);
    }
  }
};

//Get Profile

export const getProfileSupport = async (token, dispatch) => {
  dispatch(profilesupportClear());
  dispatch(profilesupportBegin());

  console.log('Profile Data Call');

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + '/profile', {headers})
    .then(res => {
      dispatch(profilesupportSuccess(res.data));
      console.log('Profile Data of Support' + res.data);
    })
    .catch(error => {
      dispatch(profilesupportFailure(error));
    });
};

//SUPPORT MEMBER NEWS LOADING API

export const fetchNews = (token) => async (dispatch) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(`${baseUrl}/news`, { headers }); // Make a GET request
    dispatch({ type: NEWS_LOADED, payload: response.data });
  } catch (error) {
    console.error('Error fetching news:', error);
    dispatch({ type: NEWS_LOAD_ERROR });
  }
};
