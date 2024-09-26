import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../../Screens/Main/CarePartner/HomeScreen';
import EnrollmentProgress from '../../Screens/Main/CarePartner/Assessments/EnrollmentProgress';


// const Stack = createNativeStackNavigator();
const Landing = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const LandingStack = () => (
  <Landing.Navigator
    initialRouteName="EnrollmentProgress"
    screenOptions={screenOptions}>
    <Landing.Screen name="HomeScreen" component={HomeScreen}/>
    <Landing.Screen name="EnrollmentProgress" component={EnrollmentProgress} />

  </Landing.Navigator>
);

export default LandingStack;
