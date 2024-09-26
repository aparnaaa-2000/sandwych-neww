import React, { useCallback } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native'

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, LINECOLOR1, PRIMARYCOLOR } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { GlobalSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import DashboardHeader from '../../../../../Components/Common/Headers/DashboardHeader'
import AssessmentProgress from '../../../../../Components/CarePartner/Home/AssessmentProgress'
import PreviousAssessment from '../../../../../Components/CarePartner/Assessments/MainAssessment/PreviousAssessment'
import CustomSidebarMenu from '../../../../../Components/CarePartner/SideMenu/CustomSideMenuBar'

//IMPORT PACKAGES 
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

//IMPORT REDUX COMPONENTS
import { GetAssessmentQuest, GetPreviousAssessment } from '../../../../../redux/thunk'
import { PreviousAssessmentClear } from '../../../../../redux/Slice/Assessment/PreviousAssessmentKey'
import { AssessmentQuestClear } from '../../../../../redux/Slice/Assessment/AssessmentQuest'
import { UpdateFCMToken } from '../../../../../redux/Thunk/NotificationThunk'

const Drawer = createDrawerNavigator();

const MainAssessments = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => <CustomSidebarMenu {...props} />}
  >

    <Drawer.Screen name="MainAssessmentScreen" component={MainAssessmentScreen} />
  </Drawer.Navigator>
);

const MainAssessmentScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const Message = 'test message'

  const { data, error, isLoading, previousData, previousError, previousLoading, updateTokenData } = useSelector(
    state => ({
      data: state.AssessmentQuest.data,
      error: state.AssessmentQuest.error,
      isLoading: state.AssessmentQuest.isLoading,
      previousData: state.PreviousAssessment.data,
      previousError: state.PreviousAssessment.error,
      previousLoading: state.PreviousAssessment.isLoading,
      updateTokenData: state.NotificationToken.data,
      updateTokenerror: state.NotificationToken.error,
      updateTokenisLoading: state.NotificationToken.isLoading,
    }),
    shallowEqual
  );

  // Function to get data and call the necessary APIs
  const fetchData = useCallback(async () => {
    try {
      const data = await getData(); // FUNCTION FOR CALLING THE API

      const patientId = data?.patientData?.patient_id;
      const storedValue = data?.storedValue;

      if (patientId && storedValue) {
        GetAssessmentQuest(patientId, storedValue, dispatch);
        GetPreviousAssessment(patientId, storedValue, dispatch);
        UpdateFCMToken(data?.carepartnerData?.id, patientId, Message, data?.fcmtoken, storedValue, dispatch)
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [dispatch]);

  // Using useFocusEffect to call fetchData when the screen is focused
  useFocusEffect(
    useCallback(() => {

      dispatch(AssessmentQuestClear());
      dispatch(PreviousAssessmentClear());

      fetchData();
    }, [fetchData])
  );
console.log("TOKEN UPDATED.........................",updateTokenData)
  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const fcmtoken = await AsyncStorage.getItem('fcmtoken');

      return {

        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        fcmtoken: fcmtoken
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        fcmtoken: null
      };
    }
  };

  const assignedTasks = data?.map(item => item?.assigned_task); //MAP THE API DATA


  return (
    <>
      {isLoading || previousLoading ?
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :

        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
          <StatusBar
            backgroundColor={BACKGROUNDWHITE}
            barStyle={'dark-content'}
            style={{ flex: 0 }} />

          <ScrollView showsVerticalScrollIndicator={false}>
            <DashboardHeader navigation={navigation} Home={true} />
            <View style={styles.lineBorder} />
            <AssessmentProgress navigation={navigation} assignedTasks={assignedTasks} data={data} />

            <PreviousAssessment data={previousData?.completed_tasks} />
          </ScrollView>
        </SafeAreaView>}
    </>
  )
}

export default MainAssessments

const styles = StyleSheet.create({
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: GlobalSize(1),
    marginTop: GlobalSize(5),
    margin: DEFAULTWIDTH * 0.06,
    marginBottom: GlobalSize(20),
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})