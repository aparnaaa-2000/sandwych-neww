import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // or localStorage for web
import {PersistGate} from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import loginSliceKey from './Slice/LoginSliceKey';
import OtpSliceKey from './Slice/OTPSliceKey';
import resetSliceKey from './Slice/ResetPswKey';
import verifySliceKey from './Slice/SignupVerifyEmail';
import verifyRSliceKey from './Slice/VerifyRstEmail';
import OtpRSliceKey from './Slice/VerifyResetOtp';
import registerSliceKey from './Slice/RegisterKey';
import ResendOtpEmail from './Slice/ResendOtpEmail';
import CreatePswSliceKey from './Slice/CreatePswSliceKey';
import ResetOtpResendSliceKey from './Slice/ResendOtpResetEmail';
import getActivityListKey from './Slice/MoodTracker/ActivityListKey';
import addPatientMoodKey from './Slice/MoodTracker/AddPatientMoodKey';
import getTodayPatientMoodKey from './Slice/MoodTracker/TodayPatientMood';
import getWeekPatientMoodKey from './Slice/MoodTracker/WeekPatientMoodKey';
import getMonthPatientMoodKey from './Slice/MoodTracker/MonthPatientMoodKey';
import SupportListSliceKey from './Slice/CaregiverProfile/SupportListKey';
import patientListSliceKey from './Slice/CaregiverProfile/PatientListKey';
import AddSupportKey from './Slice/CaregiverProfile/AddSupportKey';
import caregiverDetailsSliceKey from './Slice/CaregiverProfile/CaregiverDetailKey';
import DisplaySupportKey from './Slice/CaregiverProfile/DisplaySupportKey';
import EditSupportKey from './Slice/CaregiverProfile/EditSupportKey';
import HIPAAVerificationKey from './Slice/HIPAA/HIPAAVerificationKey';
import AssessmentQuestKey from './Slice/Assessment/AssessmentQuest';
import ValueSliceKey from './Slice/ValueStorage/ValueSliceKey';
import AssessmentAnsKey from './Slice/Assessment/AssessmentAnswer';
import aboutSliceKey from './Slice/Sidemenu/AboutUsKey';
import QuestionStoreKey from './Slice/Assessment/QuestionStoreKey';
import MedicalTeamKey from './Slice/CareTeam/MedicalTeamKey';
import CareTeamKey from './Slice/CareTeam/CareTeamKey';
import LegalDocKey from './Slice/CareTeam/LegalDocKey';
import LegalDocListKey from './Slice/CareTeam/LegalDocListKey';
import UploadDocKey from './Slice/CareTeam/UploadDocKey';
import FaqSliceKey from './Slice/Sidemenu/FaqKey';
import PatientProfileKey from './Slice/PatientProfile/PatientProfileKey';
import EditPatientProfileSliceKey from './Slice/PatientProfile/EditPatientProfileKey';
import AddStatsSliceKey from './Slice/PatientProfile/AddStatsKey';
import GetPatientStatsSliceKey from './Slice/PatientProfile/GetPatientStatsKey';
import IndividualStatsSliceKey from './Slice/PatientProfile/IndividualStatsKey';
import TaskCategorySliceKey from './Slice/Task/TaskCategoryKey';
import CreateTaskSliceKey from './Slice/Task/CreateTaskKey';
import TaskListSliceKey from './Slice/Task/TaskListKey';
import TaskStatusSliceKey from './Slice/Task/TaskCompletionKey';
import getYesterdayKey from './Slice/Task/getYesterdayKey';
import GetEditProfileKey from './Slice/CaregiverProfile/EditProfileKey';
import UpdateProfileKey from './Slice/CaregiverProfile/UpdateProfileKey';
import UpdatePatientProfileSliceKey from './Slice/PatientProfile/UpdatePatientProfileKey';
import PreviousAssessmentKey from './Slice/Assessment/PreviousAssessmentKey';
import AssessmentSummaryKey from './Slice/Assessment/AssessmentSummaryKey';
import AssessmentSaveKey from './Slice/Assessment/AssessmentSaveKey';
import UpdateAssessmentKey from './Slice/Assessment/UpdateAssessmentKey';
import selectServicesSliceKey from './Slice/SupportMember/SelectServicesSliceKey';
import ResourceCategorySliceKey from './Slice/Resources/ResourceCategoryKey';
import ResourceSubCategorySliceKey from './Slice/Resources/ResourceSubCategoryKey';
import SupportActivitySliceKey from './Slice/Support/SupportListkey';
import CommunityNewsKey from './Slice/Home/CommunityNewKey';
import PatientHealthMetricsSliceKey from './Slice/PatientProfile/PatientHealthMetricsKey';
import PatientDietSliceKey from './Slice/PatientProfile/PatientDietKey';
import supportRegisterSliceKey from './Slice/SupportMember/SupportRegisterSliceKey';
import PatientEventsKey from './Slice/PatientProfile/PatientEventsKey';
import PrivacyPolicyKey from './Slice/Sidemenu/PrivacyPolicyKey';
import SupportMemberListkey from './Slice/Support/SupportMemberListKey';
import profileSupportSliceKey from './Slice/SupportMember/ProfileSupportSliceKey';
import SupportMemberRequestKey from './Slice/Support/SupportMemberRequestKey';
import SupportInProcessKey from './Slice/Support/SupportInprocessKey';
import SupportPreviousKey from './Slice/Support/SupportPreviousKey';
import SupportCompletionKey from './Slice/Support/SupportCompletionKey';
import SupportIncompletionKey from './Slice/Support/SupportIncompletionKey';
import SupportCancelRequestKey from './Slice/Support/SupportCancelRequestKey';
import AddPatientAccesskey from './Slice/PatientProfile/AddPatientAccesskey';
import PatientaccessFilesKey from './Slice/PatientProfile/PatientaccessFilesKey';
import PatientRoleaccessKey from './Slice/PatientProfile/PatientRoleaccessListKey';
import ResourceRequestKey from './Slice/Resources/ResourceRequestKey';
import ResourceNetworkRequestKey from './Slice/Resources/ResourceNetworkRequestKey';
import IncompleteResourceKey from './Slice/Resources/IncompleteResourceStatusKey';
import CompletedStatusResourceKey from './Slice/Resources/CompletedStatusResourceKey';
import PreviousResourceKey from './Slice/Resources/PreviousResourceKey';
import CancelResourceKey from './Slice/Resources/CancelResourceKey';
import InprocessResourceKey from './Slice/Resources/InprocessResourceKey';
import ChatlistKey from './Slice/Chat/ChatList';
import ChatGroupListKey from './Slice/Chat/ChatGroupListKey';
import SendMessageKey from './Slice/Chat/SendMessageKey';
import ListMessageKey from './Slice/Chat/ListMessageKey';
import SendGroupMessageKey from './Slice/Chat/SendGroupMessageKey';
import ListGroupMessageKey from './Slice/Chat/ListGroupMessageKey';
import DeleteGroupMessageKey from './Slice/Chat/DeleteGroupMessageKey';
import DeleteMessageKey from './Slice/Chat/DeleteMessageKey';
import ReadMessageKey from './Slice/Chat/ReadMessageKey';
import UnreadMessageKey from './Slice/Chat/UnreadMessageKey';
import SendFileKey from './Slice/Chat/SendFileKey';
import SendGroupFileKey from './Slice/Chat/SendGroupFileKey';
import NotificationListKey from './Slice/Notification/NotificationListKey';
import ReadNotificationKey from './Slice/Notification/ReadNotificationKey';
import NotificationTokenKey from './Slice/Notification/NotificationTokenKey';
import MedicineNameListKey from './Slice/Medication/MedicineNameListKey';
import MedicationTaskListKey  from './Slice/Medication/MedicationTaskListKey';
import MedicationTaskSubmitKey from './Slice/Medication/MedicationTaskSubmitKey';
import MedicationTaskListYesterdayKey  from './Slice/Medication/MedicationTaskListYesterday';
import SupportAcceptKey from './Slice/Support/SupportAcceptKey';
import NearBySupportRequestKey from './Slice/Support/NearBySupportRequestKey';
import DiagnosisListKey from './Slice/Medication/DiagnosisListKey';
import AddDiagnosisKey from './Slice/Medication/AddDiagnosisKey';
import AddMedicationManualKey from './Slice/Medication/AddMedicationManualKey';
import StoreDrugInteractionKey from './Slice/Medication/StoreDrugInteraction';
import StoreMedDataKey from './Slice/Medication/StoreMedDataKey';
import UploadMedicationKey from './Slice/Medication/UploadMedication';
import CheckDrugInteractionKey from './Slice/Medication/CheckDrugInteractionKey';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  //========================================CAREPARTNER======================================

  //LOGIN AND REGISTER
  login: loginSliceKey,
  otp: OtpSliceKey,
  reset: resetSliceKey,
  verify: verifySliceKey,
  verifyEmailReset: verifyRSliceKey,
  verifyOtpReset: OtpRSliceKey,
  register: registerSliceKey,
  ResendOTPER: ResetOtpResendSliceKey,
  ResendOTPESignup: ResendOtpEmail,
  createPSW: CreatePswSliceKey,

  //HIPAA FORM
  HIPAAVerification: HIPAAVerificationKey,

  //ASSESSMENT QUESTION

  AssessmentQuest: AssessmentQuestKey,
  AssessmentAns: AssessmentAnsKey,
  PreviousAssessment: PreviousAssessmentKey,
  GetAssessmentSummary: AssessmentSummaryKey,
  AssessmentSave: AssessmentSaveKey,
  UpdateAssessment: UpdateAssessmentKey,

  //MOOD TRACKER
  getActivity: getActivityListKey,
  addPatientMood: addPatientMoodKey,
  getTodayPatientMood: getTodayPatientMoodKey,
  getWeekMood: getWeekPatientMoodKey,
  getMonthPatientMood: getMonthPatientMoodKey,

  //CAREGIVER PROFILE
  getSupportList: SupportListSliceKey,
  getPatientList: patientListSliceKey,
  addSupport: AddSupportKey,
  caregiverDetails: caregiverDetailsSliceKey,
  getDisplaySupport: DisplaySupportKey,
  editSupport: EditSupportKey,
  getEditCaregiver: GetEditProfileKey,
  updateCaregiverProfile: UpdateProfileKey,

  // STORING VALUE
  getPageNameValue: ValueSliceKey,
  storeMedData: StoreMedDataKey,

  //SIDE MENU
  getAboutUs: aboutSliceKey,
  getQuestions: QuestionStoreKey,
  getFAQ: FaqSliceKey,
  PrivacyPolicy: PrivacyPolicyKey,

  //CARE TEAM
  getMedTeam: MedicalTeamKey,
  getCareTeam: CareTeamKey,
  getLegalDoc: LegalDocKey,
  getLegalDocList: LegalDocListKey,
  UploadDoc: UploadDocKey,

  //PATIENT PROFILE
  getPatientProfile: PatientProfileKey,
  EditprofileDetails: EditPatientProfileSliceKey,
  AddStats: AddStatsSliceKey,
  GetPatientStats: GetPatientStatsSliceKey,
  getIndividualStats: IndividualStatsSliceKey,
  UpdatePatientProfile: UpdatePatientProfileSliceKey,
  getPatientHealthMetrics: PatientHealthMetricsSliceKey,
  getPatientDiet: PatientDietSliceKey,
  getPatientEvents: PatientEventsKey,
  AddPatientAccess: AddPatientAccesskey,
  PatientaccessFiles: PatientaccessFilesKey,
  PatientRoleaccess: PatientRoleaccessKey,
  //TASK

  getTaskCategory: TaskCategorySliceKey,
  createTask: CreateTaskSliceKey,
  getTaskList: TaskListSliceKey,
  UpdatetaskStatus: TaskStatusSliceKey,
  getYesterdayTask: getYesterdayKey,

  //RESOURCES

  ResourceCategory: ResourceCategorySliceKey,
  ResourceSubCategory: ResourceSubCategorySliceKey,
  ResourceRequest: ResourceRequestKey,
  ResourceNetworkRequest: ResourceNetworkRequestKey,
  IncompleteResource: IncompleteResourceKey,
  CompletedStatusResource: CompletedStatusResourceKey,
  PreviousResource: PreviousResourceKey,
  CancelResource: CancelResourceKey,
  InprocessResource: InprocessResourceKey,

  //SUPPORT
  getSupportActivity: SupportActivitySliceKey,
  getSupportMemberList: SupportMemberListkey,
  supportMemberRequest: SupportMemberRequestKey,
  getSupportInprocess: SupportInProcessKey,
  getSupportPrevious: SupportPreviousKey,
  supportCompletion: SupportCompletionKey,
  supportInCompletion: SupportIncompletionKey,
  supportCancel: SupportCancelRequestKey,
  supportAccept:SupportAcceptKey,
  NearBySupportRequestList:NearBySupportRequestKey,

  //COMMUNITY NEWS
  getCommunityNews: CommunityNewsKey,

  //CHAT
  Chatlist: ChatlistKey,
  ChatGroupList: ChatGroupListKey,
  SendMessage: SendMessageKey,
  ListMessage: ListMessageKey,
  SendGroupMessage: SendGroupMessageKey,
  ListGroupMessage: ListGroupMessageKey,
  DeleteMessage: DeleteMessageKey,
  DeleteGroupMessage: DeleteGroupMessageKey,
  ReadMessage: ReadMessageKey,
  UnReadMessage: UnreadMessageKey,
  SendFile: SendFileKey,
  SendGroupFile: SendGroupFileKey,

  //NOTIFICATION
  NotificationList: NotificationListKey,
  NoitificationRead: ReadNotificationKey,
  NotificationToken: NotificationTokenKey,

  //MEDICATION
  MedicineNameList : MedicineNameListKey,
  MedicationTaskList : MedicationTaskListKey,
  MedicationSubmitTask : MedicationTaskSubmitKey,
  MedicationTaskYesterday : MedicationTaskListYesterdayKey,
  DiagnosisList:DiagnosisListKey,
  AddDiagnosis:AddDiagnosisKey,
  AddMedication : AddMedicationManualKey,
  StoreDrugInteraction : StoreDrugInteractionKey,
  UploadMedication:UploadMedicationKey,
  CheckDrugInteraction : CheckDrugInteractionKey,

  //==================================CAREPARTNER ========================================

  // ==============================SUPPORT MEMBER ==============================
  selectservices: selectServicesSliceKey,
  supportregister: supportRegisterSliceKey,
  profilesupport: profileSupportSliceKey,

  // ==============================SUPPORT MEMBER ==============================

  //===============================Task Detail =================================
  //===============================Task Detail =================================
});

// Persist the rootReducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store with middleware
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor
const persistor = persistStore(store);

export {store, persistor};
