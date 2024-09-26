import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomSidebarMenu from '../../../../Components/CarePartner/SideMenu/CustomSideMenuBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { BACKGROUNDWHITE, LINECOLOR1, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DashboardHeader from '../../../../Components/Common/Headers/DashboardHeader';
import MainHeader from '../../../../Components/Common/Headers/MainHeader';
import PatientInfo from '../../../../Components/CarePartner/Med/Landing/PatientInfo';
import NextMedication from '../../../../Components/CarePartner/Med/Landing/NextMedication';
import RecentDiagnosis from '../../../../Components/CarePartner/Med/Landing/RecentDiagnosis';
import OnGoingDiagnosis from '../../../../Components/CarePartner/Med/Landing/OnGoingDiagnosis';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { fontSize, GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import ActiveDiet from '../../../../Components/CarePartner/Med/Landing/ActiveDiet';
import RxComponent from '../../../../Components/CarePartner/Home/RxComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import RecentDgsis from '../../../../Components/CarePartner/PatientJourney/RecentDgsis';
import Diagnosis from '../../../../Components/Common/Profile/Diagnosis';
import { FONTS } from '../../../../Constants/Fonts';
import MedModal from '../../../../Components/CarePartner/Med/AddMeds/MedModal';
import { getMedicationTask } from '../../../../redux/Thunk/MedicationThunk';
import { getPatientStats } from '../../../../redux/Thunk/PatientProfileThunk';
import AddDiagnosisModal from '../../../../Components/CarePartner/Med/Modal/AddDiagnosisModal';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import { UploadMedicationClear, UploadMedicationFailure } from '../../../../redux/Slice/Medication/UploadMedication';

const Drawer = createDrawerNavigator();

const MedsLandingPage = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => <CustomSidebarMenu {...props} />}>
    <Drawer.Screen name="MedsLanding" component={MedsLanding} />
  </Drawer.Navigator>
);

const MedsLanding = ({ navigation }) => {

  const dispatch = useDispatch()
  const [UserData, setUserData] = useState(null)
  const [ModalOpen, setModalOpen] = useState(false)
  const [DgModal, setDgModal] = useState(false)
  const [ErrorModal, setErrorModal] = useState(false)
  const [SuccessModal, setSuccessModal] = useState(false)
  const [Message, setMessage] = useState(null)

  const currentDate = new Date()

  const {
    patientStatsData,
    patientStatsLoading,
    patientDietData,
    patientHealthData,
    MedicationTaskListData,
    MedicationTaskListError,
    MedicationTaskListIsLoading,
    UploadSuccess,
    UploadError,
    UploadLoading
  } = useSelector(
    state => ({
      data: state.getPatientProfile.data,
      // errors: state.getPatientProfile.error,
      Loading: state.getPatientProfile.isLoading,
      patientStatsData: state.GetPatientStats.data,
      patientStatsError: state.GetPatientStats.error,
      patientStatsLoading: state.GetPatientStats.isLoading,
      patientDietData: state.getPatientDiet.data,
      patientDietError: state.getPatientDiet.error,
      patientDietLoading: state.getPatientDiet.isLoading,
      patientHealthData: state.getPatientHealthMetrics.data,
      MedicationTaskListData: state.MedicationTaskList.data,
      MedicationTaskListError: state.MedicationTaskList.error,
      MedicationTaskListIsLoading: state.MedicationTaskList.isLoading,
      UploadSuccess: state.UploadMedication.data,
      UploadError: state.UploadMedication.error,
      UploadLoading: state.UploadMedication.isLoading,
    }),
    shallowEqual
  );


  useEffect(() => {
    dispatch(UploadMedicationClear())
    const fetchData = async () => {
      const data = await getData();
      setUserData(data),
        getPatientStats(data?.patientData?.patient_id, data?.storedValue, dispatch)
      getMedicationTask('2024-08-19', data?.patientData?.patient_id, data?.storedValue, dispatch)
      console.log("data................", currentDate)
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
  }, [navigation]);


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


  useEffect(() => {
    UploadSuccessResponse()
  }, [UploadError, UploadSuccess])

  const UploadSuccessResponse = () => {
    if (UploadSuccess) {
      console.log("UPLOAD,......................", UploadSuccess?.message)
      setMessage(UploadSuccess?.message)
      setSuccessModal(true)

      setTimeout(() => {
        setSuccessModal(false)
        dispatch(UploadMedicationClear())
      }, 2000)
    } else if (UploadError) {
      setErrorModal(true)
      console.log("error...................", UploadError)
      setTimeout(() => {
        setErrorModal(false)
        dispatch(UploadMedicationClear())
      }, 1500)
    }
  }


  console.log("Medication task.......................", MedicationTaskListData, MedicationTaskListError)


  return (
    <>
      {MedicationTaskListIsLoading && patientStatsLoading ?
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={{ backgroundColor: BACKGROUNDWHITE, padding: GlobalSize(10) }}>
            <DashboardHeader navigation={navigation} />

            <View style={DEFAULTSTYLES.lineBorder} />

            {UserData?.carepartner?.role == 'carepartner' &&
              <MainHeader navigation={navigation} />}

            {patientStatsData &&
              <PatientInfo patientStatsData={patientStatsData} />
            }

            {MedicationTaskListData &&
              <NextMedication navigation={navigation} data={MedicationTaskListData} />}
            {/* {patientHealthData &&
        <RecentDiagnosis activeDgData={patientHealthData?.activeDiagnosis} />} */}

            {patientHealthData?.activeDiagnosis?.length > 0 &&
              <View>
                <RecentDgsis activeData={patientHealthData?.activeDiagnosis} dashboard={true} />
              </View>}

            {/* {patientHealthData &&
          <OnGoingDiagnosis onGoingData={patientHealthData?.ongoingDiagnosis} />} */}

            {patientHealthData?.ongoingDiagnosis?.length > 0 &&
              <View style={{ top: GlobalSize(-20) }}>
                <Diagnosis
                  dashboard={true}
                  title={'Ongoing Diagnosis'}
                  OngoingData={patientHealthData?.ongoingDiagnosis} />
              </View>}

            {patientDietData?.activeDietPlans &&
              <ActiveDiet activeDietPlans={patientDietData?.activeDietPlans} />}


            <View style={DEFAULTSTYLES.alignView}>
              <RxComponent />
            </View>
          </View>
        </ScrollView>}

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => setModalOpen(true)}>
          <Text style={styles.textBtn}>+</Text>
        </TouchableOpacity>
      </View>

      <MedModal
        navigation={navigation}
        ModalOpen={ModalOpen}
        onPress={() => { setModalOpen(false), setDgModal(true) }}
        setModalOpen={setModalOpen} />


      <AddDiagnosisModal
        navigation={navigation}
        ModalOpen={DgModal}
        setModalOpen={setDgModal} />


      <ErrorPopup
        Message={'Prescription Not added'}
        ModalOpen={ErrorModal}
        setModalOpen={setErrorModal} />

      <SuccessPopup
        Message={Message}
        ModalOpen={SuccessModal}
        setModalOpen={setSuccessModal} />
    </>
  );
};


export default MedsLandingPage;


const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    paddingBottom: GlobalSize(50)
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  textBtn: {
    fontSize: fontSize(24),
    color: PUREWHITE,
    fontFamily: FONTS.FontLight,
  },
  buttonView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: GlobalSize(10),
    position: 'absolute',
    bottom: 0
  },
})
