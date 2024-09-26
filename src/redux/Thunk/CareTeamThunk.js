import { CareTeamBegin, CareTeamClear, CareTeamFailure, CareTeamSuccess } from '../Slice/CareTeam/CareTeamKey';
import { LegalDocBegin, LegalDocClear, LegalDocFailure, LegalDocSuccess, MedicalDocSuccess } from '../Slice/CareTeam/LegalDocKey';
import { LegalDocListBegin, LegalDocListClear, LegalDocListFailure, LegalDocListSuccess } from '../Slice/CareTeam/LegalDocListKey';
import { MedTeamBegin, MedTeamClear, MedTeamFailure, MedTeamSuccess } from '../Slice/CareTeam/MedicalTeamKey';
import { UploadDocBegin, UploadDocClear, UploadDocFailure, UploadDocSuccess } from '../Slice/CareTeam/UploadDocKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api'

//CARE TEAM

export const getCareTeam = async (patientId, token, dispatch) => {
    dispatch(CareTeamClear());
    dispatch(CareTeamBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/get_careteam/${patientId}`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(CareTeamSuccess(res.data));
      })
      .catch(error => {
        dispatch(CareTeamFailure(error));
      });
  };

  //LEGAL DOCUMENTS
export const getLegalDoc = async (document_id, patientId, token, dispatch) => {
    dispatch(LegalDocClear());
    dispatch(LegalDocBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    console.log(req);
    const req = {
      type: document_id,
    };
  
    await axios
      .post(baseUrl + `/patient_document_index/${patientId}`, req, {headers})
  
      .then(res => {
        if (document_id == '0') {
          dispatch(LegalDocSuccess(res.data?.documents));
          console.log('value team...............', document_id);
        } else {
          dispatch(MedicalDocSuccess(res?.data?.documents));
        }
      })
      .catch(error => {
        dispatch(LegalDocFailure(error));
        console.log('ERR.............', error?.response);
      });
  };

  //MEDICAL TEAM

export const getMedTeam = async (patientId, token, dispatch) => {
    dispatch(MedTeamClear());
    dispatch(MedTeamBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/get_medicalteam/${patientId}`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(MedTeamSuccess(res.data));
      })
      .catch(error => {
        dispatch(MedTeamFailure(error));
      });
  };

  //UPLOAD DOCUMENTS - CARETEAM

export const UploadDocument = async (
    patient_id,
    document_id,
    file,
    token,
    dispatch,
  ) => {
    dispatch(UploadDocClear());
    dispatch(UploadDocBegin());
  
    const formData = new FormData();
    formData.append('patient_id', patient_id),
      formData.append('document_id', document_id),
      formData.append('file_name', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });
  
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };
  
    console.log('FORMDATA...............', formData);
  
    await axios
      .post(baseUrl + '/patient_documents', formData, {headers})
      .then(response => {
        dispatch(UploadDocSuccess(response.data));
      })
      .catch(error => {
        dispatch(UploadDocFailure(error.response));
        console.log('ERROR.............', error?.response);
      });
  };
  
  
  //LEGAL DOCUMENT LIST FOR UPLOADING
export const getLegalDocList = async (document_type, token, dispatch) => {
    dispatch(LegalDocListClear());
    dispatch(LegalDocListBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    await axios
      .get(baseUrl + `/get_documents_types/${document_type}`, {
        headers: headers,
      })
  
      .then(res => {
        dispatch(LegalDocListSuccess(res?.data?.documentsTypes));
      })
      .catch(error => {
        dispatch(LegalDocListFailure(error));
      });
  };
  
  
  