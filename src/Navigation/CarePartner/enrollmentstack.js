import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
//import EnrollmentProgress from '../../Screens/Main/CarePartner/Assessments/EnrollmentProgress';
import CaregiverDemographics from '../../Screens/Main/CarePartner/Assessments/CaregiverDemographics/CaregiverDemographics';
import CareRecipientDemographics from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/CareRecipientDemographics';
import ReasonsForCaregiving from '../../Screens/Main/CarePartner/Assessments/ReasonsForCaregiving/ReasonsForCaregiving';
import HealthChallengesMainScreen from '../../Screens/Main/CarePartner/Assessments/HealthChallenges/HealthChallengesMainScreen';
import LandingScreen from '../../Screens/Main/CarePartner/LandingScreen';
import HealthChallengesForm from '../../Screens/Main/CarePartner/Assessments/HealthChallenges/HealthChallengesForm';
import ReasonsForm from '../../Screens/Main/CarePartner/Assessments/ReasonsForCaregiving/ReasonsForm';
import BehaviorDetails from '../../Screens/Main/CarePartner/Assessments/CaregiverDemographics/BehaviorDetails';
import OpenEnded from '../../Screens/Main/CarePartner/Assessments/ReasonsForCaregiving/OpenEnded';
import LivingSituationForm from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/LivingSituationForm';
import Demographics from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/Demographics';
import AbilityToHelp from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/AbilityToHelp';

import ChooseTheUser from '../../Screens/Users/ChooseTheUser'

import AbilityToHelp1 from '../../Screens/Main/CarePartner/Assessments/AbilityToHelpScreens/AbilityToHelp';
import RateYourAbilityToHelp from '../../Screens/Main/CarePartner/Assessments/AbilityToHelpScreens/RateYourAbilityToHelp';

import ResearchPrompt from '../../Screens/Main/CarePartner/Assessments/ResearchPrompt/ResearchPrompt'
import Wearables from '../../Screens/Main/CarePartner/Assessments/Wearables/Wearables'

import SDOHSelection from '../../Screens/Main/CarePartner/Assessments/AbilityToHelpScreens/SDOHSelection';
import AbilityToHelp2 from '../../Screens/Main/CarePartner/Assessments/AbilityToHelp2/AbilityToHelp2';
import CarePartnerInfo from '../../Screens/Main/CarePartner/Assessments/CaregiverDemographics/CarePartnerInfo';
import NetworkConnectivity from '../../Components/Common/NetworkConnection/NetworkConnectivity';
import AssessmentSummary from '../../Screens/Main/CarePartner/Assessments/AssessmentSummary/AssessmentSummary';
import MainAssessment from '../../Screens/Main/CarePartner/Assessments/MainAssessment/MainAssessment';
import AssessmentMain from '../../Screens/Main/CarePartner/Assessments/AssessmentMain/AssessmentMain';
import MainAssessments from '../../Screens/Main/CarePartner/Assessments/MainAssessment/MainAssessment';
import EnrollmentProgress from '../../Screens/Main/CarePartner/Assessments/EnrollmentProgress';
import FunctionalMain from '../../Screens/Main/CarePartner/Assessments/AssessmentMain/FunctionalMain';
import SDOHList from '../../Screens/Main/CarePartner/Assessments/AbilityToHelpScreens/SDOHList';
import PersonalInfo from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/PersonalInfo';
import BasicInfo2 from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/BasicInfo2';
import AboutPatient from '../../Screens/Main/CarePartner/Assessments/CareRecipientDemographics/AboutPatient';

//import EnrollmentProgress from '../../Screens/Main/CarePartner/Assessments/EnrollmentProgress';


// const Stack = createNativeStackNavigator();
const Enrollment = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};



const EnrollmentStack = () => {

  const [isConnected, setIsConnected] = useState(true);

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
  });

  return () => {
    unsubscribe();
  };
}, []);

return (
  <Enrollment.Navigator
    initialRouteName="EnrollmentProgress"
    screenOptions={screenOptions}>
    <Enrollment.Screen name="CaregiverDemographics" component={CaregiverDemographics} />
    <Enrollment.Screen name="CareRecipientDemographics" component={CareRecipientDemographics} />
    <Enrollment.Screen name="ReasonsForCaregiving" component={ReasonsForCaregiving} />
    <Enrollment.Screen name="AssessmentMain" component={isConnected ? AssessmentMain : NetworkConnectivity}/>
    <Enrollment.Screen name="MainAssessment" component={isConnected ? MainAssessments : NetworkConnectivity}/>
    <Enrollment.Screen name="EnrollmentProgress" component={isConnected ? EnrollmentProgress: NetworkConnectivity} />
    <Enrollment.Screen name="HealthChallengesMainScreen" component={HealthChallengesMainScreen} />
    <Enrollment.Screen name='HealthChallengesForm' component={HealthChallengesForm} />
    <Enrollment.Screen name='LandingScreen' component={isConnected ?  LandingScreen : NetworkConnectivity} />
    <Enrollment.Screen name='ReasonsForm' component={ReasonsForm} />
    <Enrollment.Screen name='BehaviorDetails' component={BehaviorDetails} />
    <Enrollment.Screen name='OpenEnded' component={OpenEnded} />
    <Enrollment.Screen name='LivingForm' component={LivingSituationForm} />
    <Enrollment.Screen name='Demographics' component={Demographics} />
    <Enrollment.Screen name='AbilityToHelp' component={AbilityToHelp} />
    <Enrollment.Screen name='ChooseTheUser' component={isConnected ? ChooseTheUser : NetworkConnectivity} />
    <Enrollment.Screen name='AbilityToHelp1' component={AbilityToHelp1} />
    <Enrollment.Screen name='AbilityToHelp2' component={AbilityToHelp2} />
    <Enrollment.Screen name='RateYourAbilityToHelp' component={RateYourAbilityToHelp} />
    <Enrollment.Screen name='ResearchPrompt' component={ResearchPrompt} />
    <Enrollment.Screen name='Wearables' component={Wearables} />
    <Enrollment.Screen name='SDOHSelection' component={SDOHSelection} />
    <Enrollment.Screen name='CarePartnerInfo' component={CarePartnerInfo} />
    <Enrollment.Screen name='AssessmentSummary' component={AssessmentSummary} />
    <Enrollment.Screen name='FunctionalMain' component={FunctionalMain} />
    <Enrollment.Screen name='SDOHList' component={SDOHList} />
    <Enrollment.Screen name='PersonalInfo' component={PersonalInfo} />
    <Enrollment.Screen name='BasicInfo2' component={BasicInfo2} />
    <Enrollment.Screen name='AboutPatient' component={AboutPatient} />



  </Enrollment.Navigator>
);

}

export default EnrollmentStack;
