import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  DEFAULTGRAY,
  PRIMARYCOLOR,
} from '../../Constants/Colors/Colors';
import { Logo } from '../../../assets/svgImages';
import DEFAULTSTYLES from '../../Constants/styles/styles';

//IMPORT PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { UpdateFCMToken } from '../../redux/Thunk/NotificationThunk';
import { PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
import { GlobalSize } from '../../Constants/ResponsiveFont/ResponsiveFonts';


const SplashScreen = ({ navigation }) => {
  // =======================================================
  // TIMEOUT is used to provide a small time for Splashscreen
  // before it loads into another page.
  // =======================================================

  const Message = 'test message'
  const dispatch = useDispatch();

  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.NotificationToken.data,
      error: state.NotificationToken.error,
      isLoading: state.NotificationToken.isLoading,
    }),
    shallowEqual
  );


  useEffect(() => {
    requestMultiplePermissions() //THIS FUNCTION ONLY FOR ANDROID
    setTimeout(() => {
      getToken().then(data => {

        UpdateFCMToken(
          data?.carepartnerData?.id,
          data?.patientData?.patient_id,
          Message,
          data?.fcmtoken,
          data?.storedValue,
          dispatch);
      }).catch(err => console.log("Error getting token:", err));
    }, 3000);

  }, []);


  const getToken = async () => {
    try {
      const userID = await AsyncStorage.getItem('USERROLEID');
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      const patientData = await AsyncStorage.getItem('PatientData');
      const fcmtoken = await AsyncStorage.getItem('fcmtoken');

      // =================================
      // LOGIN AS A USER TYPE for the Mobile
      // =================================

      // Support Member
      if (userID == '10' && storedValue != null) {
        navigation.replace('SupportStack', { screen: 'SupportLandingScreen' });
      }
      // Care Partner
      else if (userID == '7') {

        const patientData = await AsyncStorage.getItem('PatientData');

        if (storedValue) {
          navigation.replace('EnrollmentStack', { screen: 'MainAssessment' });

        }
        else {

        }
      }
      // Patient
      else if (userID == '6') {
        navigation.replace('EnrollmentStack', { screen: 'MainAssessment' });
      }
      // Case Manager
      else if (userID == '5') {
      } else {
        navigation.replace('WelcomeScreen');
      }

      return {
        userID: userID,
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null,
        fcmtoken: fcmtoken
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        carepartnerData: null,
        patientData: null,
        userID: null,
        fcmtoken: null
      };
    }
  };

  const requestMultiplePermissions = async () => { //FUNCTION FOR SHOWING THE PERMISSION ACCESS (ONLY APPLICABLE FOR ANDROID)
    try {
      const permissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.POST_NOTIFICATIONS];

      const statuses = await requestMultiple(permissions);

      const cameraPermission = statuses[PERMISSIONS.ANDROID.CAMERA];
      const notificationPermission = statuses[PERMISSIONS.ANDROID.POST_NOTIFICATIONS];

      if (cameraPermission === RESULTS.GRANTED && notificationPermission === RESULTS.GRANTED) {

        setTimeout(() => {
          getToken().then(data => {

            UpdateFCMToken(
              data?.carepartnerData?.id,
              data?.patientData?.patient_id,
              Message,
              data?.fcmtoken,
              data?.storedValue,
              dispatch);
          }).catch(err => console.log("Error getting token:", err));
        }, 3000);
      } else {

        console.log('One or more permissions denied', cameraPermission, notificationPermission);
        throw new Error('Both Camera and Notification permissions are required');
      }
    } catch (error) {
      // 
      console.log("Permissions denied", error);
    }
  };



  return (
    <SafeAreaView
      style={
        Platform.OS === 'android'
          ? DEFAULTSTYLES.AndroidSafeArea
          : styles.container
      }>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }}
      />
      <View style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Logo width={300} height={50} />
          </View>
          <View style={styles.loaderContainer}>
            <LottieView
              source={require('../../../assets/lottieFiles/loader.json')}
              autoPlay
              loop
              speed={0.5}
              style={{width:GlobalSize(60),height:GlobalSize(60)}}
            />
            {/* <AnimatedLottieView
              source={require('../../../assets/lottieFiles/loader.json')}
              autoPlay
              loop
            /> */}
          </View>
          <View style={styles.loaderContainer}>
            <Text style={styles.textStyle}>You've got their back.</Text>
            <Text style={styles.textStyle}>We've got yours !</Text>
          </View>
        </View>
      </View>

    </SafeAreaView>

  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULTGRAY,
  },
  mainContainer: {
    marginTop: 100,
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    flex: 0.2,
  },
  loaderContainer: {
    flex: 0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  textStyle: {
    alignSelf: 'center',
    fontFamily: 'Inter-Bold',
    color: PRIMARYCOLOR,
  },
});

export default SplashScreen;



