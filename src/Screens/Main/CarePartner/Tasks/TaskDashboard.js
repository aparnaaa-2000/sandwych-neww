import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import MainHeader from '../../../../Components/Common/Headers/MainHeader';
import DashboardHeader from '../../../../Components/Common/Headers/DashboardHeader';
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import MainStats from '../../../../Components/CarePartner/Tasks/Dashboard/MainStats';
import UpcomingTasks from '../../../../Components/CarePartner/Tasks/Dashboard/UpcomingTasks';
import OnGoingGoals from '../../../../Components/CarePartner/Tasks/Dashboard/OnGoingGoals';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomSidebarMenu from '../../../../Components/CarePartner/SideMenu/CustomSideMenuBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  getYesterdayTask } from '../../../../redux/thunk';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import TaskListOverview from '../../../../Components/CarePartner/Tasks/TasksLists/TaskListOverview';
import TasksLandingPage from './TasksLandingPage';
import TaskListing from './TaskListing';
import { YesterdayTaskClear } from '../../../../redux/Slice/Task/getYesterdayKey';
import { TaskListClear } from '../../../../redux/Slice/Task/TaskListKey';
import { FONTS } from '../../../../Constants/Fonts';
import { getTaskList } from '../../../../redux/Thunk/TaskThunk';


const Drawer = createDrawerNavigator();


const TaskDashboard = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => <CustomSidebarMenu {...props} />}>
    <Drawer.Screen name="TaskDashboardScreen" component={TaskDashboardScreen} />
  </Drawer.Navigator>
);

const TaskDashboardScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const [UserData, setUserData] = useState(null);
  const currentDate = moment();
  const previousDate = currentDate.subtract(1, 'days');
  const [date, setDate] = useState(new Date());

  const { data, error, isLoading, yesterData,UpdateTaskStatus } = useSelector(
    (state) => ({
      data: state.getTaskList.data,
      error: state.getTaskList.error,
      isLoading: state.getTaskList.isLoading,
      yesterData: state.getYesterdayTask.data,
      yesterError: state.getYesterdayTask.error,
      yesterLoading: state.getYesterdayTask.isLoading,
      UpdateTaskStatus: state.UpdatetaskStatus.data,
    }),
    shallowEqual
  );

 useFocusEffect(
  useCallback(() => {
    fetchData();

    // Cleanup function
    return () => {
      dispatch(YesterdayTaskClear())
      dispatch(TaskListClear())
      // Any necessary cleanup actions
    };
  }, [navigation,UpdateTaskStatus])
);

 const fetchData = async () => {
  const data = await getData();
  setUserData(data);
  console.log(
    'data use paass...................',
    previousDate.format('YYYY-MM-DD'),
    data?.storedValue,
    data?.patientData?.patient_id,
    moment(date).format('YYYY-MM-DD')
  );
  getYesterdayTask(
    previousDate.format('YYYY-MM-DD'),
    data?.patientData?.patient_id,
    data?.storedValue,
    dispatch
  );
  getTaskList(
    moment(date).format('YYYY-MM-DD'),
    data?.patientData?.patient_id,
    data?.storedValue,
    dispatch
  );
};
  // const { data, error, isLoading } = useSelector(
  //   (state) => ({
  //     data: state.getTaskList.data,
  //     error: state.getTaskList.error,
  //     isLoading: state.getTaskList.isLoading,
  //   }),
  //   shallowEqual
  // );

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchData();

  //     // Cleanup function
  //     return () => {

  //       // Any necessary cleanup actions
  //     };
  //   }, [navigation])
  // );

  // const fetchData = async () => {
  //   const data = await getData();
  //   setUserData(data);

  //   getTaskList(
  //     moment(date).format('YYYY-MM-DD'),
  //     data?.patientData?.patient_id,
  //     data?.storedValue,
  //     dispatch
  //   );
  // };


  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');

      return {
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
      };
    }
  };


  return (

    <>
      {isLoading ?

        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :

        <ScrollView
          style={styles.viewScroll}
          showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: BACKGROUNDWHITE, }}>
            <View style={{ margin: 10, marginBottom: 0 }}>
              <DashboardHeader navigation={navigation} />

              <View style={DEFAULTSTYLES.lineBorder} />

              {UserData?.carepartnerData?.role == 'carepartner' &&
                <MainHeader navigation={navigation} />}
                {data &&
                      <TaskListing data={data} yesterData={yesterData}/>}
{/* <TasksLandingPage/> */}
              {/* {data &&
                <MainStats data={data} />}

              
                <UpcomingTasks navigation={navigation} data={data ? data : data} /> */}
                        
            </View>

          </View>
     
        </ScrollView>}
        <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.touchBtn}
                onPress={() => navigation.navigate('CreateTask')}>
                <Text style={styles.textBtn}>+</Text>
              </TouchableOpacity>
            </View>
    </>
  );
};

export default TaskDashboard;


const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewScroll: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    paddingBottom: GlobalSize(50),
  },
  textBtn: {
    fontSize: fontSize(24),
    color: PUREWHITE,
    fontFamily: FONTS.FontLight,
  },
  touchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.12,
    height: DEFAULTWIDTH * 0.12,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(8),
    marginLeft: GlobalSize(10),
    marginRight: GlobalSize(10),
  },
  buttonView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: GlobalSize(10),
    position: 'absolute',
    bottom: 0
  },
})
