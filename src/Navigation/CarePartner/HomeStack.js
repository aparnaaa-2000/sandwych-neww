import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestScreen1 from '../../Screens/Test/TestScreen1';
import MoodCalendar from '../../Components/CarePartner/Home/WeeklyMood/MoodCalendar'
import MoodTrackerActivity from '../../Components/CarePartner/Home/WeeklyMood/MoodTrackerActivity'

import MainScreen from '../../Screens/Main/CarePartner/Home/MainScreen';

// const Stack = createNativeStackNavigator();
const Home = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const HomeStack = () => (
  <Home.Navigator
    initialRouteName="MainScreen"
    screenOptions={screenOptions}>
    <Home.Screen name="TestScreen1" component={TestScreen1} />
    <Home.Screen name='MainScreen' component={MainScreen} />
    <Home.Screen name="MoodCalendar" component={MoodCalendar} />
    <Home.Screen name="MoodTrackerActivity" component={MoodTrackerActivity} />


  </Home.Navigator>
);

export default HomeStack;
