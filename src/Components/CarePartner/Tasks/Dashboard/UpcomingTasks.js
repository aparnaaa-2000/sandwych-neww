import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { PRIMARYCOLOR} from '../../../../Constants/Colors/Colors';
import { Tree, Walk } from '../../../../../assets';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import Task from './Task';

//IMPORT REDUX
import { TaskListClear } from '../../../../redux/Slice/Task/TaskListKey';

//IMPORT PACKAGES
import { useFocusEffect } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { getTaskList } from '../../../../redux/Thunk/TaskThunk';



const UpcomingTasks = ({ navigation,data }) => {

  const dispatch = useDispatch()

  const [date, setDate] = useState(new Date());

  const { upcomingData, error, isLoading,UpdateTaskStatus } = useSelector(
    (state) => ({
      upcomingData: state.getTaskList.data,
      error: state.getTaskList.error,
      isLoading: state.getTaskList.isLoading,
      UpdateTaskStatus: state.UpdatetaskStatus.data,
    }),
    shallowEqual
  );

 useFocusEffect(
  useCallback(() => {
    fetchData();

    // Cleanup function
    return () => {
      dispatch(TaskListClear())
      // Any necessary cleanup actions
    };
  }, [navigation,UpdateTaskStatus])
);

 const fetchData = async () => {
  const data = await getData();
 // setUserData(data);
 
  getTaskList( //GET THE TASK LIST BASED ON DATE
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


  const groupTasksByTime = (tasks) => { //FILTER THE TASK BY TIME
    return tasks.reduce((acc, task) => {
        if (!acc[task.time]) {
            acc[task.time] = [];
        }
        acc[task.time].push(task);
        return acc;
    }, {});
};

// Filter tasks based on status: 0
const filteredTasks = (upcomingData?.tasks || []).filter(task => task.status === "0");

// Group the filtered tasks by time
const groupedTasks = groupTasksByTime(filteredTasks);

// Convert the grouped tasks object into an array
const groupedTasksArray = Object.keys(groupedTasks).map((time) => ({
    time,
    tasks: groupedTasks[time],
}));


  return (
    <View>
      {/* Header */}
      {groupedTasksArray?.length > 0 &&
      <View style={[DEFAULTSTYLES.subHeaderContainer,{marginLeft:GlobalSize(5)}]}>
        <Text
          style={DEFAULTSTYLES.subHeader}>
          Upcoming Tasks
        </Text>
        
        <TouchableOpacity onPress={()=>navigation.navigate('TaskStack',{screen:'TaskDashboard'})}>
          <Text
            style={DEFAULTSTYLES.seeAll}>
            see all
          </Text>
        </TouchableOpacity>
      </View>}
      {/* Content */}
      {/* <View style={styles.contentContainer}> */}
        {/* <View style={{marginRight: DEFAULTWIDTH * 0.02}}>
          <Text style={styles.timeText}>{groupedTasksArray?.time}</Text>
        </View> */}
        {/* <View style={styles.lineVertical} /> */}
        <View>
          <FlatList
            data={groupedTasksArray}
            renderItem={({ item }) => <Task task={item}/>}
            keyExtractor={item => item.id}
          />
        </View>
      {/* </View> */}
    </View>
  );
};

const styles = new StyleSheet.create({

  contentContainer: {
    flexDirection: 'row',
    marginTop: DEFAULTHEIGHT * 0.01,
    marginBottom:GlobalSize(10)
  },
  timeText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
  },
  lineVertical: {
    height: 'auto',
    width: DEFAULTWIDTH * 0.002,
    marginRight: DEFAULTWIDTH * 0.02,
    backgroundColor: PRIMARYCOLOR,
  },
});

export default UpcomingTasks;
