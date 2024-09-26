import { AddDiagnosisBegin, AddDiagnosisClear, AddDiagnosisFailure, AddDiganosisSuccess } from '../Slice/Medication/AddDiagnosisKey';
import { AddMedicationManualBegin, AddMedicationManualClear, AddMedicationManualFailure, AddMedicationManualSuccess } from '../Slice/Medication/AddMedicationManualKey';
import { CheckDrugInteractionBegin, CheckDrugInteractionClear, CheckDrugInteractionFailure, CheckDrugInteractionSuccess } from '../Slice/Medication/CheckDrugInteractionKey';
import { DiagnosislistBegin, DiagnosislistClear, DiagnosislistFailure, DiagnosislistSuccess } from '../Slice/Medication/DiagnosisListKey';
import { MedicationTasklistBegin, MedicationTasklistClear, MedicationTasklistFailure, MedicationTasklistSuccess } from '../Slice/Medication/MedicationTaskListKey';
import { MedicationTaskListYesterdayBegin, MedicationTaskListYesterdayClear, MedicationTaskListYesterdayFailure, MedicationTaskListYesterdaySuccess } from '../Slice/Medication/MedicationTaskListYesterday';
import { MedicationTaskSubmitBegin, MedicationTaskSubmitClear, MedicationTaskSubmitFailure, MedicationTaskSubmitSuccess } from '../Slice/Medication/MedicationTaskSubmitKey';
import { MedicinelistBegin, MedicinelistClear, MedicinelistFailure, MedicinelistSuccess } from '../Slice/Medication/MedicineNameListKey';
import { StoreDrugInteractionBegin, StoreDrugInteractionClear, StoreDrugInteractionFailure, StoreDrugInteractionSuccess } from '../Slice/Medication/StoreDrugInteraction';
import { UploadMedicationBegin, UploadMedicationClear, UploadMedicationFailure, UploadMedicationSuccess } from '../Slice/Medication/UploadMedication';


//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';
const TOKEN = 'SHAREDKEY 2267:sRbITjJlA3YQJcuiQPUia9SEqV78bVCzNxZ7R01iX44='


export const GetMedicineList = async (query, dispatch) => {
  dispatch(MedicinelistClear());
  dispatch(MedicinelistBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `${TOKEN}`,
    'Content-Type': 'application/json',
  };


  await axios
    .get(`https://api.fdbcloudconnector.com/CC/api/v1_3/ICD10CM/${query}/DispensableDrugsToTreat?callSystemName=Sandwych`, {
      headers: headers
    })

    .then(res => {
      dispatch(MedicinelistSuccess(res.data));
      //console.log("RESPONSE.................",res.data)
    })
    .catch(error => {
      dispatch(MedicinelistFailure(error.response));
      console.log("medicine", error)
    });
};


//TODAY/YESTERDAY/DETAILS API

export const getMedicationTask = async (
  date,
  patient_id,
  token,
  dispatch) => {

  dispatch(MedicationTasklistClear())
  dispatch(MedicationTasklistBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = { date }

  try {
    const response = await axios.post(baseUrl + `/daily-medication-details/${patient_id}`, req, {
      headers: headers
    });

    dispatch(MedicationTasklistSuccess(response.data));

  } catch (error) {
    dispatch(MedicationTasklistFailure(error?.response));
  }
};

//GET YESTERDAY TASK OF MEDICATION

export const getMedicationTaskYesterday = async (
  date,
  patient_id,
  token,
  dispatch) => {

  dispatch(MedicationTaskListYesterdayClear())
  dispatch(MedicationTaskListYesterdayBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = { date }

  try {
    const response = await axios.post(baseUrl + `/daily-medication-details/${patient_id}`, req, {
      headers: headers
    });

    dispatch(MedicationTaskListYesterdaySuccess(response.data));

  } catch (error) {
    dispatch(MedicationTaskListYesterdayFailure(error?.response));
  }
};


//MEDICATION STATUS UPDATION

export const UpdateMedicationStatus = async (
  patient_medication_task_day_by_day_id,
  patient_id,
  status,
  last_taken_datetime,
  token,
  dispatch) => {

  dispatch(MedicationTaskSubmitClear())
  dispatch(MedicationTaskSubmitBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_medication_task_day_by_day_id,
    patient_id,
    status,
    last_taken_datetime
  }

  try {
    const response = await axios.post(baseUrl + `/daily-medication-task-status-update`, req, {
      headers: headers
    });

    dispatch(MedicationTaskSubmitSuccess(response.data));

  } catch (error) {
    dispatch(MedicationTaskSubmitFailure(error?.response));
  }
};


//GET DIAGNOSIS LIST

export const GetDiagnosisList = async (query, dispatch) => {
  dispatch(DiagnosislistClear());
  dispatch(DiagnosislistBegin());

  // Set the Bearer token in the headers
  const headers = {
    Authorization: `${TOKEN}`,
    'Content-Type': 'application/json',
  };


  await axios
    .get(`https://api.fdbcloudconnector.com/cc/api/v1_3/ICD10CM/?CallSystemName=test&searchText=${query}&searchType=Contains&limit=5`, {
      headers: headers
    })

    .then(res => {
      dispatch(DiagnosislistSuccess(res.data));
      //console.log("RESPONSE.................",res.data)
    })
    .catch(error => {
      dispatch(DiagnosislistFailure(error.response));
      console.log("medicine", error.response)
    });
};


//ADD DIAGNOSIS

export const AddDiagnosis = async (
  patient_id,
  diagnosis_name,
  icd_code,
  start_date,
  note,
  physician_name,
  token,
  dispatch) => {

  dispatch(AddDiagnosisClear())
  dispatch(AddDiagnosisBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    diagnosis_name,
    icd_code,
    start_date,
    note,
    physician_name
  }

  try {
    const response = await axios.post(baseUrl + `/add-diagnosis`, req, {
      headers: headers
    });

    dispatch(AddDiganosisSuccess(response.data));

  } catch (error) {
    dispatch(AddDiagnosisFailure(error?.response));
  }
};


//ADD MEDICATION MANUAL 

export const AddMedicationManual = async (
  patient_id,
  medications,
  token,
  dispatch) => {
  // patient_prescription_id,
      // dispensableGenericID,
      // drug_name,
      // routeDesc,
      // doseFormDesc,
      // qty,
      // dosage,
      // duration_value,
      // duration_type,
      // frequency,
      // meal_timing,
      // time,
      // instruction_for_medication_usage,
      //refill
  dispatch(AddMedicationManualClear())
  dispatch(AddMedicationManualBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const req = {
    patient_id,
    medications

  }

  try {
    const response = await axios.post(baseUrl + `/add-medications-details`, req, {
      headers: headers
    });

    dispatch(AddMedicationManualSuccess(response.data));

  } catch (error) {
    dispatch(AddMedicationManualFailure(error.response));
    console.log("Err of Add Medication.................",error)
  }
};


//CONFIRM DRUG INTERACTION

export const StoreDrugInteraction = async (
  patient_id,
  interactions,
  token,
  dispatch) => {

  dispatch(StoreDrugInteractionClear())
  dispatch(StoreDrugInteractionBegin());
  // Set the Bearer token in the headers
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };


  const req = {
    patient_id,
    interactions
  }
  console.log("REQ.....................",req)
  try {
    const response = await axios.post(baseUrl + `/store-drug-interaction`, req, {
      headers: headers
    });

    dispatch(StoreDrugInteractionSuccess(response.data));

  } catch (error) {
    dispatch(StoreDrugInteractionFailure(error?.response));
  }
};


//CHECK DRUG INTERACTION

export const CheckDrugInteraction = async (
  ScreenDrugs,
  dispatch) => {

  dispatch(CheckDrugInteractionClear())
  dispatch(CheckDrugInteractionBegin());
  // Set the Bearer token in the headers
  
  const headers = {
    Authorization: `${TOKEN}`,
    'Content-Type': 'application/json',
  };

  const req = { 
    DDIScreenRequest: {
      ProspectiveOnly: false,
      SeverityFilter: "3"
    },
    CallContext: {
      CallSystemName: "Sandwych"
    },
    ScreenProfile: {
      ScreenDrugs
    }

   }

  try {
    const response = await axios.post(`https://api.fdbcloudconnector.com/CC/api/v1_4/Screen`, req, {
      headers: headers
    });

    dispatch(CheckDrugInteractionSuccess(response.data));

  } catch (error) {
    dispatch(CheckDrugInteractionFailure(error?.response));
  }
};

 //UPDATE THE PATIENT PROFILE
 export const UploadMedication = async (
  patient_id,
  file,
  token,
  dispatch,
) => {
  dispatch(UploadMedicationClear());
  dispatch(UploadMedicationBegin());

  const formData = new FormData();

  formData.append('patient_id',patient_id),
  formData.append('prescription_file', {
    uri: file.path ? file.path : file,
    type: file.mime ? file.mime : 'image/jpeg',
    name: file.path ? file.path : file,
  });

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };

  await axios
    .post(baseUrl + `/upload-prescription`, formData, {headers})
    .then(response => {
      dispatch(UploadMedicationSuccess(response.data));
    })
    .catch(error => {
      dispatch(UploadMedicationFailure(error));
    });
};

