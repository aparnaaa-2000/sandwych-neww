import { useState,useEffect, useCallback } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import DefaultBackHeader from '../../../../Components/Common/Headers/DefaultBackHeader';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';

import { AddIcon, PlusWhite } from '../../../../../assets';
import { BACKGROUNDWHITE, FOURTHCOLOR, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import TaskListing from './TaskListing';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { UpdateTaskStatus, getYesterdayTask } from '../../../../redux/thunk';
import { YesterdayTaskClear } from '../../../../redux/Slice/Task/getYesterdayKey';
import { TaskListClear } from '../../../../redux/Slice/Task/TaskListKey';
import { getTaskList } from '../../../../redux/Thunk/TaskThunk';

const Tab = createMaterialTopTabNavigator();
const TasksLandingPage = ({ navigation, route }) => {
  const currentTab = getFocusedRouteNameFromRoute(route);
 // console.log("current tab...................", currentTab)
  // Today and Yesterday Tabs will be shown and listed here.
  // Today Medication will have a button
  // Yesterday Medication will only have badges.

  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
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


  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      return {
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
      };
    }
  };

  const screenNavigation = () => {
    navigation.navigate('CreateTask');
  }

  return (

    <>
    {isLoading ? 
    <View style={styles.loadContainer}>
      <ActivityIndicator size={30} color={PRIMARYCOLOR} />
    </View>:
    
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <DefaultBackHeader navigation={navigation} />

        <TouchableOpacity
          onPress={() => screenNavigation()}
          style={styles.buttonAdd}>
          <PlusWhite width={GlobalSize(25)} height={GlobalSize(25)} />
        </TouchableOpacity>
      </View>
      <TaskListing data={data} yesterData={yesterData}/>
      {/* You might need to remove the navigation container from here */}
      {/* <View style={{flex: 1,backgroundColor:BACKGROUNDWHITE}}>

          <Tab.Navigator tabBar={props => <RounderTopTab {...props} />}>
            <Tab.Screen name="Tasks" component={TasksList} />
            <Tab.Screen name="Goals" component={GoalsList} />
          </Tab.Navigator>
  
      </View> */}
    </SafeAreaView>}
    </>
  );
};
const styles = new StyleSheet.create({
  buttonAdd: {
    backgroundColor: FOURTHCOLOR,
    borderRadius: GlobalSize(15),
    width: DEFAULTWIDTH * 0.07,
    height: DEFAULTWIDTH * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
    margin: GlobalSize(20)
  },
  loadContainer:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});

export default TasksLandingPage;
