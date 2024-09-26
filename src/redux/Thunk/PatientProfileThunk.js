import { AddPatientaccessBegin, AddPatientaccessClear, AddPatientaccessFailure, AddPatientaccessSuccess } from '../Slice/PatientProfile/AddPatientAccesskey';
import { AddStatsBegin, AddStatsClear, AddStatsFailure, AddStatsSuccess } from '../Slice/PatientProfile/AddStatsKey';
import { EditPatientProfileBegin, EditPatientProfileClear, EditPatientProfileFailure, EditPatientProfileSuccess } from '../Slice/PatientProfile/EditPatientProfileKey';
import { GetPatientStatsBegin, GetPatientStatsClear, GetPatientStatsFailure, GetPatientStatsSuccess } from '../Slice/PatientProfile/GetPatientStatsKey';
import { IndividualStatsBegin, IndividualStatsClear, IndividualStatsFailure, IndividualStatsSuccess } from '../Slice/PatientProfile/IndividualStatsKey';
import { PatientaccessFilesBegin, PatientaccessFilesClear, PatientaccessFilesFailure, PatientaccessFilesSuccess } from '../Slice/PatientProfile/PatientaccessFilesKey';
import { PatientDietBegin, PatientDietClear, PatientDietFailure, PatientDietSuccess } from '../Slice/PatientProfile/PatientDietKey';
import { PatientEventBegin, PatientEventClear, PatientEventFailure, PatientEventSuccess } from '../Slice/PatientProfile/PatientEventsKey';
import { PatientHealthMetricsBegin, PatientHealthMetricsClear, PatientHealthMetricsFailure, PatientHealthMetricsSuccess } from '../Slice/PatientProfile/PatientHealthMetricsKey';
import { PatientProfileBegin, PatientProfileClear, PatientProfileFailure, PatientProfileSuccess } from '../Slice/PatientProfile/PatientProfileKey';
import { PatientRoleaccessBegin, PatientRoleaccessClear, PatientRoleaccessFailure, PatientRoleaccessSuccess } from '../Slice/PatientProfile/PatientRoleaccessListKey';
import { UpdatePatientProfileBegin, UpdatePatientProfileClear, UpdatePatientProfileFailure, UpdatePatientProfileSuccess } from '../Slice/PatientProfile/UpdatePatientProfileKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

//PATIENT PROFILE

export const getPatientProfile = async (patient_id, token, dispatch) => {
    dispatch(PatientProfileClear());
    dispatch(PatientProfileBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/get_patient_profile/${patient_id}`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(PatientProfileSuccess(res?.data));
      })
      .catch(error => {
        dispatch(PatientProfileFailure(error));
      });
  };
  

  //GET DETAILS FOR EDIT PATIENT DATA

export const getEditPatientProfile = async (patient_id, token, dispatch) => {
    dispatch(EditPatientProfileClear());
    dispatch(EditPatientProfileBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/patient/${patient_id}/edit`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(EditPatientProfileSuccess(res?.data));
      })
      .catch(error => {
        dispatch(EditPatientProfileFailure(error));
      });
  };


  //ADD STATS

export const OnAddStats = async (
    patient_id,
    stats_type,
    count,
    token,
    dispatch,
  ) => {
    dispatch(AddStatsClear());
    dispatch(AddStatsBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      stats_type,
      count,
    };
  
    try {
      const response = await axios.post(
        baseUrl + `/add_patient_stats/${patient_id}`,
        req,
        {
          headers: headers,
        },
      );
  
      dispatch(AddStatsSuccess(response.data));
    } catch (error) {
      dispatch(AddStatsFailure(error));
    }
  };
  

  //GET DETAILS FOR PATIENT STATS

export const getPatientStats = async (patient_id, token, dispatch) => {
    dispatch(GetPatientStatsClear());
    dispatch(GetPatientStatsBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/get_patient_stats/${patient_id}`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(GetPatientStatsSuccess(res?.data));
      })
      .catch(error => {
        dispatch(GetPatientStatsFailure(error));
      });
  };
  

  //GET PATIENT DIET DATA
export const GetPatientDiet = async (patient_id, token, dispatch) => {
    dispatch(PatientDietClear());
    dispatch(PatientDietBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/diet-plans/${patient_id}`, {
        headers: headers,
      })
      .then(res => {
        dispatch(PatientDietSuccess(res.data));
      })
      .catch(error => {
        dispatch(PatientDietFailure(error));
      });
  };

  // GET HEALTH METRICS DATA
export const GetPatientHealthMetrics = async (patient_id, token, dispatch) => {
    dispatch(PatientHealthMetricsClear());
    dispatch(PatientHealthMetricsBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/diagnosis/${patient_id}`, {
        headers: headers,
      })
      .then(res => {
        dispatch(PatientHealthMetricsSuccess(res.data));
      })
      .catch(error => {
        dispatch(PatientHealthMetricsFailure(error));
      });
  };

  // GET EVENTS DATA
export const GetPatientEvents = async (patient_id, token, dispatch) => {
    dispatch(PatientEventClear());
    dispatch(PatientEventBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/patient_events/${patient_id}`, {
        headers: headers,
      })
      .then(res => {
        dispatch(PatientEventSuccess(res.data));
      })
      .catch(error => {
        dispatch(PatientEventFailure(error));
      });
  };

  //GET PATIENT ACCESS ROLES

export const getPatientAccessRoles = async (token, dispatch) => {
    dispatch(PatientRoleaccessClear());
    dispatch(PatientRoleaccessBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/accessRoles`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(PatientRoleaccessSuccess(res?.data));
      })
      .catch(error => {
        dispatch(PatientRoleaccessFailure(error));
        console.log('ROLE ACCESS................', error);
      });
  };

  //GET Patient access files
export const getPatientAccessFiles = async (token, dispatch) => {
    dispatch(PatientaccessFilesClear());
    dispatch(PatientaccessFilesBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/accessData`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(PatientaccessFilesSuccess(res?.data));
      })
      .catch(error => {
        dispatch(PatientaccessFilesFailure(error));
      });
  };

  //GIVE PATIENT ACCESS
export const UpdatePatientaccess = async (
    patient_id,
    role_access_id,
    access_data_id,
    token,
    dispatch,
  ) => {
    dispatch(AddPatientaccessClear());
    dispatch(AddPatientaccessBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      patient_id,
      role_access_id,
      access_data_id,
    };
  
    try {
      const response = await axios.post(baseUrl + `/grantAccess`, req, {
        headers: headers,
      });
  
      dispatch(AddPatientaccessSuccess(response.data));
    } catch (error) {
      dispatch(AddPatientaccessFailure(error.response));
    }
  };
  

  //UPDATE THE PATIENT PROFILE
export const UpdatePatientProfile = async (
    patient_id,
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
    dispatch(UpdatePatientProfileClear());
    dispatch(UpdatePatientProfileBegin());
  
    const formData = new FormData();
  
    formData.append('name', name),
      formData.append('email', email),
      formData.append('phonenumber', phonenumber),
      formData.append('address', address),
      formData.append('gender', gender),
      language_id.forEach((id, index) => {
        formData.append(`language_id[${index}]`, id);
      });
    formData.append('picture', {
      uri: file.path ? file.path : file,
      type: file.mime ? file.mime : 'image/jpeg',
      name: file.path ? file.path : file,
    });
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
  
    await axios
      .post(baseUrl + `/patient/${patient_id}`, formData, {headers})
      .then(response => {
        dispatch(UpdatePatientProfileSuccess(response.data));
      })
      .catch(error => {
        dispatch(UpdatePatientProfileFailure(error));
      });
  };
  

  //GET INDIVIDUAL STATS

export const getIndividualStats = async (
    patient_id,
    stats_type,
    token,
    dispatch,
  ) => {
    dispatch(IndividualStatsClear());
    dispatch(IndividualStatsBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(
        baseUrl + `/get_patient_individual_stats/${patient_id}/${stats_type}`,
        {
          headers: headers,
        },
      )
  
      .then(res => {
        dispatch(IndividualStatsSuccess(res?.data));
      })
      .catch(error => {
        dispatch(IndividualStatsFailure(error));
      });
  };
  