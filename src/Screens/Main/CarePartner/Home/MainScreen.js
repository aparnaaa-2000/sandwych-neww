import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

//IMPORT COMPONENTS
import DashboardHeader from '../../../../Components/Common/Headers/DashboardHeader';
import MainHeader from '../../../../Components/Common/Headers/MainHeader';
import AssessmentProgress from '../../../../Components/CarePartner/Home/AssessmentProgress';
import WeeklyMood from '../../../../Components/CarePartner/Home/WeeklyMood';
import DailyGoals from '../../../../Components/CarePartner/Home/DailyGoals';
import RxComponent from '../../../../Components/CarePartner/Home/RxComponent';
import CaregivingResources from '../../../../Components/CarePartner/Home/CaregivingResources';
import CustomSidebarMenu from '../../../../Components/CarePartner/SideMenu/CustomSideMenuBar';
import NextMedication from '../../../../Components/CarePartner/Med/Landing/NextMedication';
import UpcomingTasks from '../../../../Components/CarePartner/Tasks/Dashboard/UpcomingTasks';

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, LINECOLOR1, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';
import { SwitchProfile } from '../../../../../assets';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT THIRD - PARTY PACKAGES
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

//IMPORT REDUX
import { GetAssessmentQuest, GetCommunityNews } from '../../../../redux/thunk';
import { AssessmentQuestClear } from '../../../../redux/Slice/Assessment/AssessmentQuest';
import { newsDataClear } from '../../../../redux/Slice/Home/CommunityNewKey';
import { getMedicationTask } from '../../../../redux/Thunk/MedicationThunk';

const Drawer = createDrawerNavigator();

const MainScreen = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => <CustomSidebarMenu {...props} />}
  >

    <Drawer.Screen name="HomeScreen" component={MainScreenView} />
  </Drawer.Navigator>
);


const MainScreenView = ({ navigation }) => {

  const dispatch = useDispatch()
  const [ModalOpen, setModalOpen] = useState(false)
  const [UserData, setUserData] = useState(null)



  const { data, error, isLoading, newsData, taskData,MedicationTaskListData } = useSelector(
    state => ({
      data: state.AssessmentQuest.data,
      error: state.AssessmentQuest.error,
      isLoading: state.AssessmentQuest.isLoading,
      newsData: state.getCommunityNews.data,
      newsError: state.getCommunityNews.error,
      newsLoading: state.getCommunityNews.isLoading,
      taskData: state.getTaskList.data,
      taskerror: state.getTaskList.error,
      taskIsLoading: state.getTaskList.isLoading,
      MedicationTaskListData:state.MedicationTaskList.data,
      MedicationTaskListError:state.MedicationTaskList.error,
      MedicationTaskListIsLoading:state.MedicationTaskList.isLoading
    }),
    shallowEqual
  );

  useEffect(() => { //FUNCTION FOR GETTING THE LOCAL DATA AND API
    OnGetLocalData()
  }, []);

  const OnGetLocalData = () => {
    dispatch(AssessmentQuestClear());
    dispatch(newsDataClear());

    getData().then(data => {

      setUserData(data)
      
      getMedicationTask('2024-08-19',data?.patientData?.patient_id,data?.storedValue,dispatch)
      GetAssessmentQuest(data?.patientData?.patient_id, data?.storedValue, dispatch)
      GetCommunityNews(data?.storedValue, dispatch)
    });
  }

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      const patientData = await AsyncStorage.getItem('PatientData');
      return {
        storedValue: storedValue,
        carepartner: carepartnerData != null ? JSON.parse(carepartnerData) : null,
        patientData: patientData != null ? JSON.parse(patientData) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        carepartner: null,
        patientData: null
      };
    }
  };

  const assignedTasks = data?.map(item => item.assigned_task);

  return (
    <>
      {isLoading ?
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :

        <ScrollView
          style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}
          showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: BACKGROUNDWHITE, margin: GlobalSize(10) }}>
            <DashboardHeader navigation={navigation} />

            <View style={styles.lineBorder} />

            {UserData?.carepartner?.role == 'carepartner' &&
              <MainHeader navigation={navigation} />}

          </View>
          <AssessmentProgress navigation={navigation} assignedTasks={assignedTasks} data={data} />
          <WeeklyMood navigation={navigation} />
          <DailyGoals taskData={taskData} />
          {/* <UpcomingMeds />\ */}
          <View style={{ marginHorizontal: DEFAULTWIDTH * 0.02 }}>
          {MedicationTaskListData &&
          <NextMedication navigation={navigation} data={MedicationTaskListData}/>}
            <View style={{ marginBottom: GlobalSize(10) }}>
              <UpcomingTasks navigation={navigation} />
            </View>
          </View>

          <View style={DEFAULTSTYLES.alignView}>
            <RxComponent />
          </View>
          <CaregivingResources communityNews={newsData} />
          {/* <FromCommunity /> */}

        </ScrollView>}

      {/* <View style={styles.buttonPost}>
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={() => setModalOpen(true)} >
          <SwitchProfile />
        </TouchableOpacity>
      </View> */}

    </>
  );
};


export default MainScreen;


const styles = StyleSheet.create({
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: GlobalSize(1),
    margin: GlobalSize(10),
    marginLeft: GlobalSize(8),
    marginRight: GlobalSize(8),
    marginTop: 0
  },
  buttonPost: {
    position: 'absolute',
    left: 0,
    right: GlobalSize(16),
    bottom: GlobalSize(10),
    alignItems: 'flex-end'
  },
  buttonTouch: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.12,
    height: DEFAULTWIDTH * 0.12,
    borderRadius: GlobalSize(8),
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})