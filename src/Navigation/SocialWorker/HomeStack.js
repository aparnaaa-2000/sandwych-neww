import React, {useState, useEffect} from 'react';
//import NetInfo from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WorkerDashboard from '../../Screens/Main/CaseManager/SocialWorkerDashboard/WorkerDashboard';
import PatientProfile from '../../Screens/Main/CaseManager/PatientProfile/PatientProfile';
import PatientDetails from '../../Screens/Main/CaseManager/PatientProfile/PatientDetails';
import AddDiagnosis from '../../Screens/Main/CaseManager/PatientProfile/AddDiagnosis';
import AvailableResource from '../../Screens/Main/CaseManager/Resources/AvailableResource';
import FoodResource from '../../Screens/Main/CaseManager/Resources/Food';
import Transportation from '../../Screens/Main/CaseManager/Resources/Transportation';
import FoodTotalResource from '../../Screens/Main/CaseManager/Resources/FoodTotalResource';
import AddCareTeam from '../../Screens/Main/CaseManager/CareTeam/AddCareTeam';
import ActiveMedication from '../../Screens/Main/CaseManager/Medication/ActiveMedication';
import AssignMedication from '../../Screens/Main/CaseManager/Medication/AssignMedication';
import AddDrugAllergy from '../../Screens/Main/CaseManager/Medication/AddDrugAllergy';
import DrugDetails from '../../Screens/Main/CaseManager/Medication/DrugDetails';
import MedAllergy from '../../Screens/Main/CaseManager/Medication/MedAllergy';
import MedicationDetails from '../../Screens/Main/CaseManager/Medication/MedicationDetails';
import MoreInfo from '../../Screens/Main/CaseManager/Medication/MoreInfo';
import NewSCWMedication from '../../Screens/Main/CaseManager/Medication/NewSCWMedication';
import AssignAssessment from '../../Screens/Main/CaseManager/Tasks/AssignAssessment';
import CreateAssessment from '../../Screens/Main/CaseManager/Tasks/CreateAssessment';
import CreateTask from '../../Screens/Main/CaseManager/Tasks/CreateTask';
import EditTask from '../../Screens/Main/CaseManager/Tasks/EditTask';
import TaskDetails from '../../Screens/Main/CaseManager/Tasks/TaskDetails';
import PatientList from '../../Screens/Users/PatientList';
import CaseManagerLanding from '../../Screens/Main/CaseManager/LandingScreen';
import MoodCalendar from '../../Components/CaseManager/Home/WeeklyMood/MoodCalendar';
import MoodTrackerActivity from '../../Components/CaseManager/Home/WeeklyMood/MoodTrackerActivity';
import PatientDetailCard from '../../Components/CaseManager/Profile/PatientDeatils/PatientDetailCard';
import PatientDiagnosis from '../../Screens/Main/CaseManager/PatientProfile/PatientDiagnosis';
import UserProfile from '../../Screens/Main/CaseManager/CaseManagerProfile/UserProfile';


import CaseSDOHList from '../../Screens/Main/CaseManager/Home/ReportingList/SDOHList';

const Home = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const HomeStack = () => {
  const [isConnected, setIsConnected] = useState(true);

  // useEffect(() => {
  //     const unsubscribe = NetInfo.addEventListener(state => {
  //         setIsConnected(state.isConnected);
  //     });

  //     return () => {
  //         unsubscribe();
  //     };
  // }, []);

  return (
    <Home.Navigator screenOptions={screenOptions}>
      <Home.Screen
        name="CaseManagerLanding"
        component={isConnected ? CaseManagerLanding : NetworkConnectivity}
      />

      <Home.Screen
        name="CaseMoodCalendar"
        component={isConnected ? MoodCalendar : NetworkConnectivity}
      />

      <Home.Screen
        name="CaseMoodTrackerActivity"
        component={isConnected ? MoodTrackerActivity : NetworkConnectivity}
      />

      <Home.Screen
        name="CaseSDOHList"
        component={isConnected ? CaseSDOHList : NetworkConnectivity}
      />

      <Home.Screen
        name="PatientList"
        component={isConnected ? PatientList : NetworkConnectivity}
      />

      <Home.Screen
        name="PatientProfile"
        component={isConnected ? PatientProfile : NetworkConnectivity}
      />

      <Home.Screen
        name="PatientDetails"
        component={isConnected ? PatientDetails : NetworkConnectivity}
      />

      <Home.Screen
        name="CasePatientMoreDetails"
        component={isConnected ? PatientDetailCard : NetworkConnectivity}
      />

      <Home.Screen
        name="CasePatientDiagnosis"
        component={isConnected ? PatientDiagnosis : NetworkConnectivity}
      />

      <Home.Screen
        name="CMProfile"
        component={isConnected ? UserProfile : NetworkConnectivity}
      />

      <Home.Screen
        name="AddDiagnosis"
        component={isConnected ? AddDiagnosis : NetworkConnectivity}
      />

      <Home.Screen
        name="AvailableResource"
        component={isConnected ? AvailableResource : NetworkConnectivity}
      />

      <Home.Screen
        name="FoodResource"
        component={isConnected ? FoodResource : NetworkConnectivity}
      />

      <Home.Screen
        name="Transportation"
        component={isConnected ? Transportation : NetworkConnectivity}
      />

      <Home.Screen
        name="FoodTotalResource"
        component={isConnected ? FoodTotalResource : NetworkConnectivity}
      />

      <Home.Screen
        name="AddCareTeam"
        component={isConnected ? AddCareTeam : NetworkConnectivity}
      />

      <Home.Screen
        name="ActiveMedication"
        component={isConnected ? ActiveMedication : NetworkConnectivity}
      />

      <Home.Screen
        name="AddDrugAllergy"
        component={isConnected ? AddDrugAllergy : NetworkConnectivity}
      />
      <Home.Screen
        name="AssignMedication"
        component={isConnected ? AssignMedication : NetworkConnectivity}
      />
      <Home.Screen
        name="DrugDetails"
        component={isConnected ? DrugDetails : NetworkConnectivity}
      />
      <Home.Screen
        name="MedAllergy"
        component={isConnected ? MedAllergy : NetworkConnectivity}
      />
      <Home.Screen
        name="MedicationDetails"
        component={isConnected ? MedicationDetails : NetworkConnectivity}
      />

      <Home.Screen
        name="MoreInfo"
        component={isConnected ? MoreInfo : NetworkConnectivity}
      />

      <Home.Screen
        name="NewSCWMedication"
        component={isConnected ? NewSCWMedication : NetworkConnectivity}
      />

      <Home.Screen
        name="AssignAssessment"
        component={isConnected ? AssignAssessment : NetworkConnectivity}
      />

      <Home.Screen
        name="CreateAssessment"
        component={isConnected ? CreateAssessment : NetworkConnectivity}
      />

      <Home.Screen
        name="EditTask"
        component={isConnected ? EditTask : NetworkConnectivity}
      />

      <Home.Screen
        name="CreateTasks"
        component={isConnected ? CreateTask : NetworkConnectivity}
      />
      <Home.Screen
        name="TaskDetails"
        component={isConnected ? TaskDetails : NetworkConnectivity}
      />
    </Home.Navigator>
  );
};

export default HomeStack;
