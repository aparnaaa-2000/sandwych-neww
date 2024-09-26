//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  loginBegin,
  loginClear,
  loginFailure,
  loginSuccess,
} from './Slice/LoginSliceKey';
import {
  resetBegin,
  resetClear,
  resetFailure,
  resetSuccess,
} from './Slice/ResetPswKey';
import {
  verifyBegin,
  verifyClear,
  verifyFailure,
  verifySuccess,
} from './Slice/SignupVerifyEmail';
import {OtpBegin, OtpClear, OtpFailure, otpSuccess} from './Slice/OTPSliceKey';
import {
  verifyRBegin,
  verifyRClear,
  verifyRFailure,
  verifyRSuccess,
} from './Slice/VerifyRstEmail';
import {
  OtpRBegin,
  OtpRClear,
  OtpRFailure,
  OtpRSuccess,
} from './Slice/VerifyResetOtp';
import {
  registerBegin,
  registerClear,
  registerFailure,
  registerSuccess,
} from './Slice/RegisterKey';
import {
  createBegin,
  createClear,
  createFailure,
  createSuccess,
} from './Slice/CreatePswSliceKey';
import {
  ResendOtpResetBegin,
  ResendOtpResetClear,
  ResendOtpResetFailure,
  ResendOtpResetSuccess,
} from './Slice/ResendOtpResetEmail';
import {
  OtpResendBegin,
  OtpResendFailure,
  OtpResendSuccess,
} from './Slice/ResendOtpEmail';
import {
  getBegin,
  getClear,
  getFailure,
  getSuccess,
} from './Slice/MoodTracker/ActivityListKey';
import {
  addMoodBegin,
  addMoodClear,
  addMoodFailure,
  addMoodSuccess,
} from './Slice/MoodTracker/AddPatientMoodKey';
import {
  getTodayMoodBegin,
  getTodayMoodClear,
  getTodayMoodFailure,
  getTodayMoodSuccess,
} from './Slice/MoodTracker/TodayPatientMood';
import {
  getWeekBegin,
  getWeekClear,
  getWeekFailure,
  getWeekSuccess,
} from './Slice/MoodTracker/WeekPatientMoodKey';
import {
  getMonthBegin,
  getMonthClear,
  getMonthFailure,
  getMonthSuccess,
} from './Slice/MoodTracker/MonthPatientMoodKey';
import {
  supportListBegin,
  supportListClear,
  supportListFailure,
  supportListSuccess,
} from './Slice/CaregiverProfile/SupportListKey';
import {
  patientListBegin,
  patientListClear,
  patientListFailure,
  patientListSuccess,
} from './Slice/CaregiverProfile/PatientListKey';
import {
  caregiverDetailBegin,
  caregiverDetailClear,
  caregiverDetailFailure,
  caregiverDetailSuccess,
} from './Slice/CaregiverProfile/CaregiverDetailKey';
import {
  DisplaySupportBegin,
  DisplaySupportClear,
  DisplaySupportFailure,
  DisplaySupportSuccess,
} from './Slice/CaregiverProfile/DisplaySupportKey';
import {
  EditSupportBegin,
  EditSupportClear,
  EditSupportFailure,
  EditSupportSuccess,
} from './Slice/CaregiverProfile/EditSupportKey';
import {
  HIPAAVerifyBegin,
  HIPAAVerifyFailure,
  HIPAAVerifySuccess,
  HIPAAVerifyClear,
} from './Slice/HIPAA/HIPAAVerificationKey';
import {
  AssessmentQuestBegin,
  AssessmentQuestClear,
  AssessmentQuestFailure,
  AssessmentQuestSuccess,
} from './Slice/Assessment/AssessmentQuest';
import {
  AssessmentAnsBegin,
  AssessmentAnsClear,
  AssessmentAnsFailure,
  AssessmentAnsSuccess,
} from './Slice/Assessment/AssessmentAnswer';

import {
  TaskStatusBegin,
  TaskStatusClear,
  TaskStatusFailure,
  TaskStatusSuccess,
} from './Slice/Task/TaskCompletionKey';
import {
  YesterdayTaskBegin,
  YesterdayTaskClear,
  YesterdayTaskFailure,
  YesterdayTaskSuccess,
} from './Slice/Task/getYesterdayKey';
import {
  GetEditProfileBegin,
  GetEditProfileClear,
  GetEditProfileFailure,
  GetEditProfileSuccess,
} from './Slice/CaregiverProfile/EditProfileKey';
import {
  UpdateProfileBegin,
  UpdateProfileClear,
  UpdateProfileFailure,
  UpdateProfileSuccess,
} from './Slice/CaregiverProfile/UpdateProfileKey';

import {
  PreviousAssessmentBegin,
  PreviousAssessmentClear,
  PreviousAssessmentFailure,
  PreviousAssessmentSuccess,
} from './Slice/Assessment/PreviousAssessmentKey';

import {
  AssessmentSummaryBegin,
  AssessmentSummaryClear,
  AssessmentSummaryFailure,
  AssessmentSummarySuccess,
} from './Slice/Assessment/AssessmentSummaryKey';
import {
  AssessmentSaveBegin,
  AssessmentSaveClear,
  AssessmentSaveFailure,
  AssessmentSaveSuccess,
} from './Slice/Assessment/AssessmentSaveKey';
import {
  UpdateAssessmentBegin,
  UpdateAssessmentClear,
  UpdateAssessmentFailure,
  UpdateAssessmentSuccess,
} from './Slice/Assessment/UpdateAssessmentKey';

import {
  supportActivityBegin,
  supportActivityClear,
  supportActivityFailure,
  supportActivitySuccess,
} from './Slice/Support/SupportListkey';
import {
  newsDataBegin,
  newsDataClear,
  newsDataFailure,
  newsDataSuccess,
} from './Slice/Home/CommunityNewKey';

import { AddSupportBegin, AddSupportClear, AddSupportFailure, AddSupportSuccess } from './Slice/CaregiverProfile/AddSupportKey';
import { ChatlistBegin, ChatlistClear, ChatlistFailure, ChatlistSuccess } from './Slice/Chat/ChatList';
import { ChatGrouplistBegin, ChatGrouplistClear, ChatGrouplistFailure, ChatGrouplistSuccess } from './Slice/Chat/ChatGroupListKey';
import { SendMessageBegin, SendMessageClear, SendMessageFailure, SendMessageSuccess } from './Slice/Chat/SendMessageKey';
import { ListMessageBegin, ListMessageClear, ListMessageFailure, ListMessageSuccess } from './Slice/Chat/ListMessageKey';
import { SendGroupMessageBegin, SendGroupMessageClear, SendGroupMessageFailure, SendGroupMessageSuccess } from './Slice/Chat/SendGroupMessageKey';
import { ListGroupMessageBegin, ListGroupMessageClear, ListGroupMessageFailure, ListGroupMessageSuccess } from './Slice/Chat/ListGroupMessageKey';
import { DeleteMessageBegin, DeleteMessageClear, DeleteMessageFailure, DeleteMessageSuccess } from './Slice/Chat/DeleteMessageKey';
import { DeleteGroupMessageBegin, DeleteGroupMessageClear, DeleteGroupMessageFailure, DeleteGroupMessageSuccess } from './Slice/Chat/DeleteGroupMessageKey';
import { UnReadMessageBegin, UnReadMessageClear, UnReadMessageFailure, UnReadMessageSuccess } from './Slice/Chat/UnreadMessageKey';
import { ReadMessageBegin, ReadMessageClear, ReadMessageFailure, ReadMessageSuccess } from './Slice/Chat/ReadMessageKey';
import { SendGroupFileBegin, SendGroupFileClear, SendGroupFileFailure, SendGroupFileSuccess } from './Slice/Chat/SendGroupFileKey';
import { SendFileBegin, SendFileClear, SendFileFailure, SendFileSuccess } from './Slice/Chat/SendFileKey';

//Function to verify the login credentials from api and get the response with token.
export const postLoginDetails = async (phonenumber, password, dispatch) => {
  dispatch(loginClear());
  dispatch(loginBegin());

  const req = {
    phonenumber,
    password,
  };
  await axios
    .post(baseUrl + '/login', req)
    .then(response => {
      dispatch(loginSuccess(response?.data));
      AsyncStorage.setItem('TOKENAuth', response?.data?.token);
      const userroleid = response?.data?.user?.role_id?.toString();
      AsyncStorage.setItem('USERROLEID', userroleid);
    })
    .catch(error => {
      dispatch(loginFailure(error.response));
    });
};

//Login using email and password

export const LoginEmail = async (email, password, dispatch) => {
  dispatch(loginClear());
  dispatch(loginBegin());

  const req = {
    email,
    password,
  };
  await axios
    .post(baseUrl + '/login', req)
    .then(response => {
      dispatch(loginSuccess(response.data));
      AsyncStorage.setItem('TOKENAuth', response?.data?.token);
      const {
        data: {
          user: {id},
        },
      } = response;
      AsyncStorage.setItem('User_Id', id.toString());
      console.log('USER_DATA ===$$$', id);
      console.log('USER TOKEN ====%%%%%%%%' + response.data.token);
      // console.log('USER ID ====' + response.data.user.role_id);
      // console.log('USER ID ====' + response.data);
      // Use this RoleID to navigate to respected Modules
      const userroleid = response?.data?.user?.role_id?.toString();
      AsyncStorage.setItem('USERROLEID', userroleid);
    })
    .catch(error => {
      dispatch(loginFailure(error.response));
    });
};

//verify email for new register
export const VerifyEmailsignup = async (email, dispatch, resetForm) => {
  dispatch(verifyClear());
  dispatch(verifyBegin());

  const req = {
    email,
  };
  await axios
    .post(baseUrl + '/signup/verifyEmail', req)
    .then(res => {
      AsyncStorage.setItem('EMAIL', email);
      dispatch(verifySuccess(res.data));
    })
    .catch(error => {
      dispatch(verifyFailure(error.response));
    });
};

//verify email for new register
export const VerifyPhonesignup = async (phonenumber, dispatch) => {
  dispatch(verifyClear());
  dispatch(verifyBegin());

  const req = {
    phonenumber,
  };
  await axios
    .post(baseUrl + '/signup/verifyPhonenumber', req)
    .then(res => {
      dispatch(verifySuccess(res.data));
    })
    .catch(error => {
      dispatch(verifyFailure(error.response));
    });
};

//Verify the OTP - New user register
export const VerifyOtpRegister = async (otp, identifier, dispatch) => {
  dispatch(OtpClear());
  dispatch(OtpBegin());

  const req = {
    identifier,
    otp,
  };
  await axios
    .post(baseUrl + '/signup/verifyOTP', req)
    .then(res => {
      AsyncStorage.setItem('EMAIL', res?.data?.email);
      dispatch(otpSuccess(res.data));
    })
    .catch(error => {
      dispatch(OtpFailure(error.response));
    });
};

// Verify the resend otp - signup
export const ResendVerifyOtp = async (identifier, dispatch, token) => {
  dispatch(OtpResendBegin());

  const req = {
    identifier,
  };

  await axios
    .post(baseUrl + '/signup/resendOTP', req)
    .then(res => {
      dispatch(OtpResendSuccess(res.data));
    })
    .catch(error => {
      dispatch(OtpResendFailure(error.response));
    });
};

//verify email for reset the password
export const verifyEmailReset = async (email, dispatch) => {
  dispatch(verifyRClear());
  dispatch(verifyRBegin());

  const req = {
    email,
  };

  await axios
    .post(baseUrl + '/verifyEmail', req)
    .then(response => {
      dispatch(verifyRSuccess(response.data));
    })
    .catch(error => {
      dispatch(verifyRFailure(error.response));
    });
};

//verify email for reset the password
export const verifyPhoneReset = async (phonenumber, dispatch) => {
  dispatch(verifyRClear());
  dispatch(verifyRBegin());

  const req = {
    phonenumber,
  };

  await axios
    .post(baseUrl + '/verifyPhonenumber', req)
    .then(response => {
      dispatch(verifyRSuccess(response.data));
    })
    .catch(error => {
      dispatch(verifyRFailure(error.response));
    });
};

// Verify the otp for resetting the password
export const VerifyOtpReset = async (otp, identifier, dispatch, token) => {
  dispatch(OtpRClear());
  dispatch(OtpRBegin());
  const req = {
    identifier,
    otp,
  };

  await axios
    .post(baseUrl + '/verifyOTP', req)
    .then(res => {
      dispatch(OtpRSuccess(res.data));
    })
    .catch(error => {
      dispatch(OtpRFailure(error.response));
    });
};

//Resend otp for resetting the password

export const ResendVerifyOtpReset = async (identifier, dispatch) => {
  dispatch(ResendOtpResetClear());
  dispatch(ResendOtpResetBegin());
  const req = {
    identifier,
  };

  await axios
    .post(baseUrl + '/resendOTP', req)
    .then(res => {
      dispatch(ResendOtpResetSuccess(res.data));
    })
    .catch(error => {
      dispatch(ResendOtpResetFailure(error?.response));
    });
};

// Reset Password
export const ResetPassword = async (
  password,
  confirm_password,
  identifier,
  token,
  dispatch,
) => {
  dispatch(resetClear());
  dispatch(resetBegin());

  const req = {
    identifier,
    password,
    confirm_password,
  };
  await axios
    .post(baseUrl + '/reset-password', req)
    .then(res => {
      dispatch(resetSuccess(res.data));
      // AsyncStorage.setItem('TOKENAuth', res.data.token);
    })
    .catch(error => {
      dispatch(resetFailure(error));
    });
};

// Register new caregiver
export const RegisterUser = async (
  role,
  identifier,
  name,
  email,
  relationship,
  code,
  phonenumber,
  address,
  zipcode,
  dob,
  gender,
  dispatch,
) => {
  dispatch(registerClear());
  dispatch(registerBegin());
  const req = {
    role,
    identifier,
    name,
    email,
    relationship,
    code,
    phonenumber,
    address,
    zipcode,
    dob,
    gender,
  };

  await axios
    .post(baseUrl + '/signup', req)
    .then(res => {
      AsyncStorage.setItem('TOKENAuth', res.data.token);
      dispatch(registerSuccess(res?.data));
    })
    .catch(error => {
      dispatch(registerFailure(error?.response));
      console.log('REGISTER ERROR..............', error?.response);
    });
};

// create new password for the new user
export const CreatePassword = async (
  password,
  confirm_password,
  token,
  dispatch,
) => {
  dispatch(createClear());
  dispatch(createBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    password,
    confirm_password,
  };

  await axios
    .post(baseUrl + '/signup/generatePassword', req, {headers})
    .then(res => {
      dispatch(createSuccess(res.data));
      AsyncStorage.setItem('TOKENAuth', res.data.token);
    })
    .catch(error => {
      dispatch(createFailure(error));
    });
};

//MOOD TRACKER GET ACTIVITY

export const GetActivityList = async (token, dispatch) => {
  dispatch(getClear());
  dispatch(getBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + '/activities', {headers})
    .then(res => {
      dispatch(getSuccess(res.data));
    })
    .catch(error => {
      dispatch(getFailure(error));
    });
};

//MOOD TRACKER ADD PATIENT MOOD, ACTIVITY

export const AddPatientMood = async (
  login_user_id,
  patient_id,
  mood,
  activities,
  note,
  token,
  dispatch,
) => {
  dispatch(addMoodClear());
  dispatch(addMoodBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    login_user_id,
    patient_id,
    mood,
    activities,
    note,
  };
  console.log('req..........................', req);
  await axios
    .post(baseUrl + '/patientmood', req, {headers})
    .then(res => {
      dispatch(addMoodSuccess(res.data));
    })
    .catch(error => {
      dispatch(addMoodFailure(error.response));
    });
};

export const GetCurrentPatientMood = async (patient_id, token, dispatch) => {
  dispatch(getTodayMoodClear());
  dispatch(getTodayMoodBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
  };
  console.log('req', req);
  await axios
    .get(baseUrl + '/display/today/patientmood', {
      headers: headers,
      params: req,
    })

    .then(res => {
      dispatch(getTodayMoodSuccess(res.data));
    })
    .catch(error => {
      dispatch(getTodayMoodFailure(error.response));
    });
};

//GET WEEKLY MOOD

export const GetWeeklyMood = async (patient_id, token, dispatch) => {
  dispatch(getWeekClear());
  dispatch(getWeekBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
  };

  await axios
    .get(baseUrl + '/display/weekly/patientmood', {
      headers: headers,
      params: req,
    })
    .then(res => {
      dispatch(getWeekSuccess(res.data));
    })
    .catch(error => {
      dispatch(getWeekFailure(error));
    });
};

//GET WEEKLY MOOD

export const GetMonthlyMood = async (
  patient_id,
  month,
  year,
  token,
  dispatch,
) => {
  dispatch(getMonthClear());
  dispatch(getMonthBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    month,
    year,
  };

  await axios
    .get(baseUrl + '/display/patientmood', {
      headers: headers,
      params: req,
    })
    .then(res => {
      dispatch(getMonthSuccess(res.data));
    })
    .catch(error => {
      dispatch(getMonthFailure(error.response));
    });
};

// SUPPORT LIST - CAREGIVER PROFILE

export const GetSupportList = async (token, dispatch) => {
  dispatch(supportListClear());
  dispatch(supportListBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + '/support', {
      headers: headers,
    })
    .then(res => {
      dispatch(supportListSuccess(res.data));
    })
    .catch(error => {
      dispatch(supportListFailure(error));
    });
};

//ADD SUPPORT
export const AddSupport = async (user_id, supports, token, dispatch) => {
  dispatch(AddSupportClear());
  dispatch(AddSupportBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    user_id,
    supports,
  };

  await axios
    .post(baseUrl + '/add/carepartner/support', req, {headers})
    .then(res => {
      dispatch(AddSupportSuccess(res));
    })
    .catch(error => {
      dispatch(AddSupportFailure(error.response));
    });
};

//DISPLAY SUPPORT(AFTER ADDING SUPPORT)

export const GetDisplaySupport = async (user_id, token, dispatch) => {
  dispatch(DisplaySupportClear());
  dispatch(DisplaySupportBegin());

  const req = {
    user_id,
  };
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + '/carepartner/supports', {
      headers: headers,
      params: req,
    })
    .then(res => {
      dispatch(DisplaySupportSuccess(res?.data?.supports));
    })
    .catch(error => {
      dispatch(DisplaySupportFailure(error));
    });
};

//CAREGIVER PROFILE - PATIENT LIST

export const GetPatientList = async (token, dispatch) => {
  dispatch(patientListClear());
  dispatch(patientListBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + '/patient_list', {
      headers: headers,
    })
    .then(res => {
      dispatch(patientListSuccess(res.data));
    })
    .catch(error => {
      dispatch(patientListFailure(error));
    });
};

//CAREGIVER - DETAILS

export const GetCaregiverDetails = async (token, dispatch) => {
  dispatch(caregiverDetailClear());
  dispatch(caregiverDetailBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + '/caregiver_details', {
      headers: headers,
    })
    .then(res => {
      dispatch(caregiverDetailSuccess(res.data));
    })
    .catch(error => {
      dispatch(caregiverDetailFailure(error.response));
    });
};

//EDIT SUPPORT
export const EditSupport = async (user_id, supports, token, dispatch) => {
  dispatch(EditSupportClear());
  dispatch(EditSupportBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    user_id,
    supports,
  };

  await axios
    .post(baseUrl + '/edit/carepartner/support', req, {headers})
    .then(res => {
      dispatch(EditSupportSuccess(res));
    })
    .catch(error => {
      dispatch(EditSupportFailure(error));
    });
};

//HIPAA Verification

export const HIPAAVerification = async (userId, hipaaId, token, dispatch) => {
  dispatch(HIPAAVerifyClear());
  dispatch(HIPAAVerifyBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    userId,
    hipaaId,
  };

  await axios
    .post(baseUrl + '/confirm_hipaa', req, {headers})
    .then(res => {
      dispatch(HIPAAVerifySuccess(res));
    })
    .catch(error => {
      dispatch(HIPAAVerifyFailure(error));
    });
};

export const GetAssessmentQuest = async (patientId, token, dispatch) => {
  dispatch(AssessmentQuestClear());
  dispatch(AssessmentQuestBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(
      baseUrl + `/get_assessment_question/${patientId}`,
      {
        headers: headers,
      },
    );

    dispatch(AssessmentQuestSuccess(response.data));
  } catch (error) {
    dispatch(AssessmentQuestFailure(error.response));
  }
};

export const GetAssessmentAnswer = async (
  patient_id,
  task_id,
  answers,
  token,
  dispatch,
) => {
  dispatch(AssessmentAnsClear());
  dispatch(AssessmentAnsBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    task_id,
    answers,
  };

  try {
    const response = await axios.post(
      baseUrl + `/patient/assessment/answers`,
      req,
      {
        headers: headers,
      },
    );

    dispatch(AssessmentAnsSuccess(response.data));
  } catch (error) {
    dispatch(AssessmentAnsFailure(error.response));
    console.log('ERROR UPLOAD..............', error?.response);
  }
};



export const getYesterdayTask = async (date, patient_id, token, dispatch) => {
  dispatch(YesterdayTaskBegin());
  dispatch(YesterdayTaskClear());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    date,
  };

  try {
    const response = await axios.post(
      baseUrl + `/patient_daily_task/${patient_id}`,
      req,
      {
        headers: headers,
      },
    );

    dispatch(YesterdayTaskSuccess(response.data));
  } catch (error) {
    dispatch(YesterdayTaskFailure(error));
  }
};

//TASK STATUS UPDATE API

export const UpdateTaskStatus = async (
  status,
  message,
  patientId,
  patientTaskDayByDayId,
  token,
  dispatch,
) => {
  dispatch(TaskStatusClear());
  dispatch(TaskStatusBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    status,
    message,
  };

  try {
    const response = await axios.post(
      baseUrl + `/updateTaskStatus/${patientId}/${patientTaskDayByDayId}`,
      req,
      {
        headers: headers,
      },
    );

    dispatch(TaskStatusSuccess(response.data));
  } catch (error) {
    dispatch(TaskStatusFailure(error));
  }
};

//GET CAREGIVER PROFILE FOR EDIT
export const getEditCaregiverProfile = async (user_id, token, dispatch) => {
  dispatch(GetEditProfileClear());
  dispatch(GetEditProfileBegin());

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get(baseUrl + `/caregiver/${user_id}/edit`, {
      headers,
    });
    dispatch(GetEditProfileSuccess(response.data));
  } catch (error) {
    dispatch(GetEditProfileFailure(error));
    if (error.response) {
      console.error('Error response from server:', error.response);
    } else {
      console.error('Error occurred while making request:', error.message);
    }
  }
};

//UPDATE THE PATIENT PROFILE
export const UpdateCaregiverProfile = async (
  user_id,
  name,
  email,
  phonenumber,
  address,
  gender,
  language_id,
  file,
  token,
  dispatch,
) => {
  dispatch(UpdateProfileClear());
  dispatch(UpdateProfileBegin());

  const formData = new FormData();

  formData.append('name', name),
    formData.append('email', email),
    formData.append('phonenumber', phonenumber),
    formData.append('address', address),
    formData.append('gender', gender),
    language_id.forEach((id, index) => {
      formData.append(`language_id[${index}]`, id);
    });
    if(file?.path){
  formData.append('picture', {
    uri: file.path ? file.path : file,
    type: file.mime ? file.mime : 'image/jpeg',
    name: file.path ? file.path : file,
  });
}

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  await axios
    .post(baseUrl + `/caregiver/${user_id}`, formData, {headers})
    .then(response => {
      dispatch(UpdateProfileSuccess(response.data));
    })
    .catch(error => {
      dispatch(UpdateProfileFailure(error?.response));
      console.log(".....................",error,formData?._parts)
    });
};


//PREVIOUS ASSESSMENT
export const GetPreviousAssessment = async (patient_id, token, dispatch) => {
  dispatch(PreviousAssessmentClear());
  dispatch(PreviousAssessmentBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/get_previous_assessment_task/${patient_id}`, {
      headers: headers,
    })

    .then(res => {
      dispatch(PreviousAssessmentSuccess(res?.data));
    })
    .catch(error => {
      dispatch(PreviousAssessmentFailure(error));
    });
};

//ASSESSMENT SUMMARY
export const GetAssessmentSummary = async (
  patient_id,
  task_id,
  token,
  dispatch,
) => {
  dispatch(AssessmentSummaryClear());
  dispatch(AssessmentSummaryBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    task_id,
  };

  try {
    const response = await axios.get(
      'http://18.237.111.97:2000/api/assessment/summary',
      {
        headers: headers,
        params: req,
      },
    );

    dispatch(AssessmentSummarySuccess(response?.data));
  } catch (error) {
    dispatch(AssessmentSummaryFailure(error?.response));
  }
};

//ASSESSMENT SAVE
export const AssessmentSubmit = async (
  patient_id,
  task_id,
  token,
  dispatch,
) => {
  dispatch(AssessmentSaveClear());
  dispatch(AssessmentSaveBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const req = {
    patient_id,
    task_id,
  };

  await axios
    .post(baseUrl + '/saveAndExit', req, {headers})
    .then(res => {
      dispatch(AssessmentSaveSuccess(res.data));
    })
    .catch(error => {
      dispatch(AssessmentSaveFailure(error));
    });
};

//UPDATE ASSESSMENT

export const UpdateAssessmentAnswer = async (
  patient_id,
  task_id,
  answers,
  token,
  dispatch,
) => {
  dispatch(UpdateAssessmentClear());
  dispatch(UpdateAssessmentBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    task_id,
    answers,
  };

  try {
    const response = await axios.put(
      baseUrl + `/update_assessment_answers`,
      req,
      {
        headers: headers,
      },
    );

    dispatch(UpdateAssessmentSuccess(response.data));
  } catch (error) {
    dispatch(UpdateAssessmentFailure(error));
  }
};


// LIST SUPPORT ACTIVITIES IN THE SUPPORT SECTION
export const GetSupportActivity = async (support_type, token, dispatch) => {
  dispatch(supportActivityClear());
  dispatch(supportActivityBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/support_activity/${support_type}`, {
      headers: headers,
    })
    .then(res => {
      dispatch(supportActivitySuccess(res.data));
    })
    .catch(error => {
      dispatch(supportActivityFailure(error));
    });
};

export const GetCommunityNews = async (token, dispatch) => {
  dispatch(newsDataClear());
  dispatch(newsDataBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/communityNews`, {
      headers: headers,
    })
    .then(res => {
      dispatch(newsDataSuccess(res.data));
    })
    .catch(error => {
      dispatch(newsDataFailure(error));
    });
};



//GET CHAT TEAM LIST
export const getChatTeamList = async (patient_id, token, dispatch) => {
  dispatch(ChatlistClear());
  dispatch(ChatlistBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/chatList/${patient_id}`, {
      headers: headers,
    })

    .then(res => {
      dispatch(ChatlistSuccess(res?.data));
    })
    .catch(error => {
      dispatch(ChatlistFailure(error));
    });
};

//GET CHAT GROUP LIST

export const getChatGroupList = async (patient_id, token, dispatch) => {
  dispatch(ChatGrouplistClear());
  dispatch(ChatGrouplistBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/patients/${patient_id}/groups`, {
      headers: headers,
    })

    .then(res => {
      dispatch(ChatGrouplistSuccess(res?.data));
    })
    .catch(error => {
      dispatch(ChatGrouplistFailure(error.response));
    });
};

//SEND MESSAGE Individual

export const sendMessage = async (
  patient_id,
  recipient_id,
  content,
  priority,
  token,
  dispatch,
) => {
  dispatch(SendMessageClear());
  dispatch(SendMessageBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    recipient_id,
    content,
    priority,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/send-message`, req, {
      headers: headers,
    });

    dispatch(SendMessageSuccess(response.data));
  } catch (error) {
    dispatch(SendMessageFailure(error?.response));
  }
};

//GET MESSAGE

export const getMessage = async (patient_id, recipient_id, token, dispatch) => {
  dispatch(ListMessageClear());
  dispatch(ListMessageBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    recipient_id,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/get-message`, req, {
      headers: headers,
    });

    dispatch(ListMessageSuccess(response.data));
  } catch (error) {
    dispatch(ListMessageFailure(error?.response));
  }
};

//SEND GROUP MESSAGE

export const SendGroupMessage = async (
  patient_group_id,
  content,
  token,
  dispatch,
) => {
  dispatch(SendGroupMessageClear());
  dispatch(SendGroupMessageBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_group_id,
    content,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/send-group-message`, req, {
      headers: headers,
    });

    dispatch(SendGroupMessageSuccess(response.data));
  } catch (error) {
    dispatch(SendGroupMessageFailure(error?.response));
  }
};

//GET MESSAGE

export const getGroupMessage = async (patient_group_id, token, dispatch) => {
  dispatch(ListGroupMessageClear());
  dispatch(ListGroupMessageBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_group_id,
  };

  console.log('REQUEST SUPPORT..................', req);
  try {
    const response = await axios.post(baseUrl + `/get-group-message`, req, {
      headers: headers,
    });

    dispatch(ListGroupMessageSuccess(response.data));
  } catch (error) {
    dispatch(ListGroupMessageFailure(error?.response));
  }
};

//DELETE INDIVIDUAL MESSAGE

export const DeleteIndividualMessage = async (message_id, token, dispatch) => {
  dispatch(DeleteMessageClear());
  dispatch(DeleteMessageBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${baseUrl}/delete-message/${message_id}`,
      {}, // Empty object for POST data since it's not needed
      {headers}, // Correctly set the headers here
    );

    dispatch(DeleteMessageSuccess(response.data));
    console.log('indi........................', response);
  } catch (error) {
    dispatch(DeleteMessageFailure(error?.response));
    console.log(error?.response);
  }
};

//DELETE GROUP MESSAGE

export const DeleteGroupMessage = async (group_message_id, token, dispatch) => {
  dispatch(DeleteGroupMessageClear());
  dispatch(DeleteGroupMessageBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(
      `${baseUrl}/delete-group-message/${group_message_id}`,
      {}, // Empty object for POST data since it's not needed
      {headers}, // Correctly set the headers here
    );
    dispatch(DeleteGroupMessageSuccess(response.data));
  } catch (error) {
    dispatch(DeleteGroupMessageFailure(error?.response));
  }
};

//UNREAD MESSAGE

export const getUnreadMessage = async (token, dispatch) => {
  dispatch(UnReadMessageClear());
  dispatch(UnReadMessageBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  await axios
    .get(baseUrl + `/getUnreadMessagesCount`, {
      headers: headers,
    })

    .then(res => {
      dispatch(UnReadMessageSuccess(res?.data));
    })
    .catch(error => {
      dispatch(UnReadMessageFailure(error.response));
    });
};

//READ MESSAGE

export const getReadMessage = async (message_ids, token, dispatch) => {
  dispatch(ReadMessageClear());
  dispatch(ReadMessageBegin());

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    message_ids,
  };

  try {
    const res = await axios.post(`${baseUrl}/markMessagesAsRead`, req, {
      headers,
    });
    dispatch(ReadMessageSuccess(res.data));
  } catch (error) {
    const {response} = error;
    dispatch(ReadMessageFailure(response));
   // console.log("message read...................",message_ids,error.response);
  }
};

//SEND FILE MESSAGE - GROUP

export const SendFileGroup = async (
  patient_group_id,
  content,
  file,
  token,
  dispatch,
) => {
  dispatch(SendGroupFileClear());
  dispatch(SendGroupFileBegin());

  console.log(patient_group_id, content, file);

  const formData = new FormData();
  formData.append('patient_group_id', patient_group_id);
  formData.append('content', content);
  formData.append('type', file.type == 'image/jpeg' ? '0' : '1');
  formData.append('file', {
    uri: file.uri,
    type: file?.type,
    name: file.name, // Extract file name
  });

  console.log('FormData...................', formData);

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(
      `${baseUrl}/sendGroupMessageWithFile`,
      formData,
      {headers},
    );
    dispatch(SendGroupFileSuccess(response.data));
    console.log('success');
  } catch (error) {
    console.log('Error details:', {
      message: error.message,
      code: error.code,
      request: error.request,
      response: error.response,
    });
    dispatch(SendGroupFileFailure(error?.response));
  }
};

//SEND FILE MESSAGE -INDIVIDUAL
export const SendFileIndividual = async (
  patient_id,
  recipient_id,
  content,
  priority,
  file,
  token,
  dispatch,
) => {
  dispatch(SendFileClear());
  dispatch(SendFileBegin());

  console.log(patient_id, recipient_id, content, priority, file, token);

  const formData = new FormData();
  formData.append('patient_id', patient_id);
  formData.append('recipient_id', recipient_id);
  formData.append('content', content);
  formData.append('priority', '0');
  formData.append('type', file.type == 'image/jpeg' ? '0' : '1');
  formData.append('file', {
    uri: file.uri,
    type: file?.type,
    name: file.name, // Extract file name
  });

  console.log('FormData...................', formData);

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(
      `${baseUrl}/sendMessageWithFile`,
      formData,
      {headers},
    );
    dispatch(SendFileSuccess(response.data));
    console.log('success');
  } catch (error) {
    console.log('Error details:', {
      message: error.message,
      code: error.code,
      request: error.request,
      response: error.response,
    });
    dispatch(SendFileFailure(error?.response));
  }
};



