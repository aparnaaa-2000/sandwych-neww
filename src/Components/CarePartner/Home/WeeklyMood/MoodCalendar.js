import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import WeeklyMoodHeader from './WeeklyMoodHeader';
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';

import { GetCurrentPatientMood, GetMonthlyMood } from '../../../../redux/thunk';
import CalendarTrack from '../../../Common/Widgets/MoodCalender';
import { addMoodClear } from '../../../../redux/Slice/MoodTracker/AddPatientMoodKey';

import { getMonthClear } from '../../../../redux/Slice/MoodTracker/MonthPatientMoodKey';
import { getTodayMoodClear } from '../../../../redux/Slice/MoodTracker/TodayPatientMood';

//IMPORT PACKAGES
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodCalendar = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const [Token, setToken] = useState(null)
  const [UserData, setUserData] = useState(null)
  const [LoadingData, setLoadingData] = useState(true)
  const [date, setDate] = useState(new Date())

  const { MOODVALUE, MOOD } = route ? route.params : null;

  const { data, error, isLoading, dataCalender, errorCalender, isLoadingCalender } = useSelector(
    state => ({
      data: state.getTodayPatientMood.data,
      error: state.getTodayPatientMood.error,
      isLoading: state.getTodayPatientMood.isLoading,
      dataCalender: state.getMonthPatientMood.data,
      errorCalender: state.getMonthPatientMood.error,
      isLoadingCalender: state.getMonthPatientMood.isLoading,
    }),
    shallowEqual
  );


  useEffect(() => {

    const fetchData = () => {
      getData().then((data) => {
        GetCurrentPatientMood(data?.patientData?.user_id, data?.storedValue, dispatch);
        GetMonthlyMood(
          data?.patientData?.user_id,
          moment(date).format('M'),
          moment(date).format('YYYY'),
          data?.storedValue,
          dispatch
        );
        console.log('Retrieved data:', data?.patientData?.user_id);
      });
      //const data = await getData();
      //setUserData(data);
      console.log("patient id.....................", data)

    };

    // Fetch data when the screen mounts and Token changes
    fetchData();

    // Add event listener for focus event
    const focusListener = navigation.addListener('focus', fetchData);

    // Clean up event listener
    return () => {
      focusListener();
      dispatch(addMoodClear())
      dispatch(getTodayMoodClear());
      dispatch(getMonthClear());
    };
  }, [Token, navigation]);


  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      setToken(storedValue);
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');

      return {
        storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        carepartnerData: null
      };
    }
  };




  console.log("data......................", data, dataCalender, error, errorCalender)
  return (
    <View style={styles.mainContainer}>
      {isLoading ?
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :
        <View style={styles.subContainer}>
          <WeeklyMoodHeader
            navigation={navigation}
            moodvalue={MOODVALUE}
            mood={MOOD ? MOOD : ''}
            moodData={data}
          />
          <CalendarTrack navigation={navigation} data={dataCalender?.patient_moods} />
        </View>}
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUNDWHITE,
  },
  subContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
});

export default MoodCalendar;
