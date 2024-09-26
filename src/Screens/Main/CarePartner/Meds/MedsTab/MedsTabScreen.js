import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';

//IMPORT CONSTANTS
import { FONTS } from '../../../../../Constants/Fonts';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR2,
  FOURTHCOLOR,
  GREYBACKGROUND1,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR7
} from '../../../../../Constants/Colors/Colors';
import {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../../Constants/styles/styles';
import { PlusWhite } from '../../../../../../assets';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import DefaultBackHeader from '../../../../../Components/Common/Headers/DefaultBackHeader';
import MedModal from '../../../../../Components/CarePartner/Med/AddMeds/MedModal';
import TimeList from '../../../../../Components/CarePartner/Med/MedTab/TimeList';

//IMPORT PACKAGES
import moment from 'moment';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//IMPORT REDUX KEYS
import { getMedicationTask, getMedicationTaskYesterday } from '../../../../../redux/Thunk/MedicationThunk';
import AddDiagnosisModal from '../../../../../Components/CarePartner/Med/Modal/AddDiagnosisModal';
import { MedicationTasklistClear } from '../../../../../redux/Slice/Medication/MedicationTaskListKey';
import { MedicationTaskListYesterdayClear } from '../../../../../redux/Slice/Medication/MedicationTaskListYesterday';


const MedsTabScreen = ({ navigation }) => {
  // Today and Yesterday Tabs will be shown and listed here.
  // Today Medication will have a button
  // Yesterday Medication will only have badges.
  const dispatch = useDispatch()
  const [ModalOpen, setModalOpen] = useState(false)
  const [itemState, setItemState] = useState(1)
  const [DgModal, setDgModal] = useState(false)
  const currentDate = moment();
  const TodayDate = new Date()
  const previousDate = currentDate.subtract(1, 'days');
  const [date, setDate] = useState(new Date());

  const taskItems = [
    {
      id: 1,
      Title: 'Today'
    },
    {
      id: 2,
      Title: 'Yesterday'
    },

  ]


  const { MedicationTaskListData, MedicationTaskListError, MedicationTaskListIsLoading, MedicationYesterdayData, MedicationTaskSubmitData, MedicationTaskSubmitError } = useSelector(
    state => ({
      MedicationTaskListData: state.MedicationTaskList.data,
      MedicationTaskListError: state.MedicationTaskList.error,
      MedicationTaskListIsLoading: state.MedicationTaskList.isLoading,
      MedicationYesterdayData: state.MedicationTaskYesterday.data,
      MedicationYesterdayError: state.MedicationTaskYesterday.error,
      MedicationTaskSubmitData: state.MedicationSubmitTask.data,
      MedicationTaskSubmitError: state.MedicationSubmitTask.error,
      MedicationTaskSubmitIsLoading: state.MedicationSubmitTask.isLoading
    }),
    shallowEqual
  );


  useEffect(() => {

    dispatch(MedicationTasklistClear())
    dispatch(MedicationTaskListYesterdayClear())
    const fetchData = async () => {
      const data = await getData();
      getMedicationTask('2024-08-19', data?.patientData?.patient_id, data?.storedValue, dispatch)

      //CURRENTLY ADD THE DUMMY DATE, NEED CHANGE THAT AFTER THE BACKEND WORK
      getMedicationTaskYesterday(moment(previousDate).format('YYYY-MM-DD'), data?.patientData?.patient_id, data?.storedValue, dispatch)
//moment(previousDate).format('YYYY-MM-DD')
//moment(TodayDate).format('YYYY-MM-DD')
    };

    // Fetch data when the component mounts and when `token` changes
    fetchData();

    // Add event listener for focus event
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData(); // Call API when screen is focused
    });

    // Clean up event listener
    return () => {
      unsubscribe();
    };
  }, [navigation, MedicationTaskSubmitData, MedicationTaskListError]);


  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartner = await AsyncStorage.getItem('UserData');

      return {
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartner: carepartner != null ? JSON.parse(carepartner) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        carepartner: null
      };
    }
  };

  const OnCallApi = (item) => { //SET THE TODAY AND YESTERDAY STATE
    setItemState(item.id)

  }

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
  const filteredTasks = (MedicationTaskListData?.medications || []).filter(task => task);

  // Group the filtered tasks by time
  const groupedTasks = groupTasksByTime(filteredTasks);

  // Convert the grouped tasks object into an array
  const groupedTasksArray = Object.keys(groupedTasks).map((time) => ({
    time,
    tasks: groupedTasks[time],
  }));

  const groupTasksByTimeYesterday = (tasks) => { //FILTER THE TASK BY TIME
    return tasks.reduce((acc, task) => {
      if (!acc[task.time]) {
        acc[task.time] = [];
      }
      acc[task.time].push(task);
      return acc;
    }, {});
  };

  // Filter tasks based on status: 0
  const filteredTasksYesterday = (MedicationYesterdayData?.medications || []).filter(task => task);

  // Group the filtered tasks by time
  const groupedTasksYesterday = groupTasksByTimeYesterday(filteredTasksYesterday);

  // Convert the grouped tasks object into an array
  const groupedTasksArrayYesterday = Object.keys(groupedTasks).map((time) => ({
    time,
    tasks: groupedTasksYesterday[time],
  }));

  console.log("CURRENT DATE.......................",groupedTasksArrayYesterday)
  
  return (

    <>
      {MedicationTaskListIsLoading ?
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :

        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle="dark-content" />

          <View style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
            <DefaultBackHeader navigation={navigation} />
            <View style={styles.mainContainer}>
              <Text style={styles.headerText}>Medications</Text>

              <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalOpen(true)}>
                <PlusWhite width={GlobalSize(26)} height={GlobalSize(26)} />
              </TouchableOpacity>
            </View>
            <View style={styles.tabView}>
              <View style={styles.cardView}>

                {taskItems?.map((item) => {
                  return (

                    <TouchableOpacity
                      style={itemState == item.id ?
                        styles.selectView :
                        styles.unselectView}
                      onPress={() => OnCallApi(item)}>
                      <Text style={styles.textTitle}>{item.Title}</Text>
                    </TouchableOpacity>

                  )
                })}

              </View>
            </View>

            {itemState == 1 &&
              <FlatList
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='always'
                data={groupedTasksArray}
                renderItem={({ item }) => <TimeList
                  time={item}
                  day={0}
                  navigation={navigation}
                  itemState={itemState}
                />}
                keyExtractor={item => item.id}
              />}

            {itemState == 2 &&
              <FlatList
                showsVerticalScrollIndicator={false}
                data={groupedTasksArrayYesterday}
                renderItem={({ item }) => <TimeList
                  time={item}
                  day={1}
                  navigation={navigation}
                  itemState={itemState} />}
                keyExtractor={item => item.id}
              />}
          </View>

          <MedModal
            navigation={navigation}
            ModalOpen={ModalOpen}
            onPress={() => {setModalOpen(false),setDgModal(true)}}
            setModalOpen={setModalOpen} />

          <AddDiagnosisModal
            navigation={navigation}
            ModalOpen={DgModal}
            setModalOpen={setDgModal} />

        </SafeAreaView>
      }
    </>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginHorizontal: DEFAULTWIDTH * 0.06,
    marginVertical: DEFAULTHEIGHT * 0.02,
    justifyContent: 'space-between',
    backgroundColor: BACKGROUNDWHITE

  },
  selectView: {
    backgroundColor: PUREWHITE,
    padding: GlobalSize(8),
    borderRadius: GlobalSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: PLACEHOLDERCOLOR3,
    shadowOpacity: 0.3,
    paddingLeft: GlobalSize(15),
    paddingRight: GlobalSize(15)

  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DEFAULTHEIGHT * 0.02,
    paddingLeft: DEFAULTWIDTH * 0.1,
    paddingRight: DEFAULTWIDTH * 0.1,
    marginTop: GlobalSize(15)
  },
  cardView: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.9,
    padding: GlobalSize(5),
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR2,
    borderWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: GREYBACKGROUND1,
    paddingLeft: DEFAULTWIDTH * 0.05,
    paddingRight: DEFAULTWIDTH * 0.05
  },
  textTitle: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    color: TEXTCOLOR7
  },
  unselectView: {
    padding: GlobalSize(6),
    alignItems: 'center',
    justifyContent: 'center',

  },
  headerText: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(18),
    color: TEXTCOLOR10,
  },
  buttonAdd: {
    backgroundColor: FOURTHCOLOR,
    borderRadius: GlobalSize(15),
    width: DEFAULTWIDTH * 0.07,
    height: DEFAULTWIDTH * 0.07,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MedsTabScreen;

