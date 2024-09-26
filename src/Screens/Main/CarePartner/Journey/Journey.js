import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

//CUSTOME STYLES IMPORTED
import {
  BACKGROUNDWHITE,
  BORDERCOLOR2,
  GREYBACKGROUND1,
  LINECOLOR1,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR7
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { ArrowF, LogoSmall } from '../../../../../assets';
import { GlobalSize, fontSize, height, width } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../../Constants/Fonts';

// COMPONETS IMPORTED
import RecentDgsis from '../../../../Components/CarePartner/PatientJourney/RecentDgsis';
import PatientStats from '../../../../Components/CarePartner/PatientJourney/PatientStats';
import RecentDischarge from '../../../../Components/CarePartner/PatientJourney/RecentDischarge';
import PreviousDischarge from '../../../../Components/CarePartner/PatientJourney/PreviousDischarge';
import Diagnosis from '../../../../Components/Common/Profile/Diagnosis';
import PatientDetails from '../../../../Components/CarePartner/PatientJourney/PatientDetails';
import PatientInfo from '../../../../Components/CarePartner/PatientJourney/PatientInfo';
import About from '../../../../Components/Common/Profile/About';
import Access from '../../../../Components/CarePartner/PatientJourney/Access';
import DietPlan from '../../../../Components/CarePartner/PatientJourney/DietPlan';

//PACKAGE IMPORTED
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// REDUX FUNCTIONS IMPORTED
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';
import { AddPatientaccessClear } from '../../../../redux/Slice/PatientProfile/AddPatientAccesskey';
import { getPatientAccessFiles, getPatientAccessRoles, GetPatientDiet, GetPatientEvents, GetPatientHealthMetrics, getPatientProfile, getPatientStats, UpdatePatientaccess } from '../../../../redux/Thunk/PatientProfileThunk';


export default function Journey({ navigation }) {


  const JourneyItems = [
    {
      id: 1,
      Title: 'Details'
    },
    {
      id: 2,
      Title: 'Health Metrics'
    },
    {
      id: 3,
      Title: 'Stats'
    },
    {
      id: 4,
      Title: 'Event'
    },
    {
      id: 5,
      Title: 'Access'
    },
    {
      id: 6,
      Title: 'Diet'
    }
  ]

  const dispatch = useDispatch()
  const [itemState, setItemState] = useState(1)
  const [GrantData, setGrantData] = useState([])
  const [userData, setUserData] = useState([])
  const [roleId, setRoleId] = useState(null)
  const [accessId, setAccessId] = useState([])
  const [FileData, setFileData] = useState([])
  const [SuccessModal, setSuccessModal] = useState(false)
  const [ErrorModal, setErrorModal] = useState(false)
  const [Message, setMessage] = useState(null)

  useEffect(() => {
    if (GrantData?.length !== GrantData?.length) {
      setGrantData(GrantData)
    }
    console.log("grat................", GrantData)
  }, [GrantData])


  const [users, setUsers] = useState([
    {
      id: 1,
      Name: 'Primary Physician',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]

    },
    {
      id: 2,
      Name: 'Physicians',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 3,
      Name: 'Nurses',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 4,
      Name: 'Hospital Admin',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 5,
      Name: 'Case Manager',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 6,
      Name: 'Primary Caregiver',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 7,
      Name: 'Caregiver',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 8,
      Name: 'Support Member',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 9,
      Name: 'MPOA',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },
    {
      id: 10,
      Name: 'LPOA',
      selected: false,
      data: [

        { id: 1, name: 'Basic Info', selected: false },
        { id: 2, name: 'Personal Info', selected: false },
        { id: 3, name: 'Medical data', selected: false },
        { id: 4, name: 'Diagnosis data', selected: false }
      ]
    },

  ])

  const { data, errors,
    Loading,
    getPatientData,
    patientStatsData,
    patientDietData,
    patientHealthData,
    patientEventData,
    patientAccessRoles,
    PatientaccessFiles,
    AddPatientAccessData,
    AddPatientAccessError,
    AddPatientAccessLoading
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
      patientEventData: state.getPatientEvents.data,
      patientAccessRoles: state.PatientRoleaccess.data,
      PatientaccessFiles: state.PatientaccessFiles.data,
      getPatientData: state.getPatientProfile.data,
      error: state.getPatientProfile.error,
      isLoading: state.getPatientProfile.isLoading,
      AddPatientAccessData: state.AddPatientAccess.data,
      AddPatientAccessError: state.AddPatientAccess.error,
      AddPatientAccessLoading: state.AddPatientAccess.isLoading
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUserData(data)
      const SelectedId = data?.patientData?.patient_id;
      const Patient_ID = data?.carepartnerData?.id
      console.log("userdata...................",data?.carepartnerData?.id)
   
      getPatientProfile(SelectedId ? SelectedId : Patient_ID, data?.storedValue, dispatch)
      getPatientStats(SelectedId ? SelectedId : Patient_ID, data?.storedValue, dispatch)
      GetPatientDiet(SelectedId ? SelectedId : Patient_ID, data?.storedValue, dispatch)
      GetPatientHealthMetrics(SelectedId ? SelectedId : Patient_ID, data?.storedValue, dispatch)
      GetPatientEvents(SelectedId ? SelectedId : Patient_ID, data?.storedValue, dispatch)
      getPatientAccessRoles(data?.storedValue, dispatch)
      getPatientAccessFiles(data?.storedValue, dispatch)
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
  }, [navigation]); // Add token if it's a dependency


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
        carepartnerData: null
      };
    }
  };

  useEffect(() => {
    if (AddPatientAccessData) {
      setSuccessModal(true);
      setMessage(AddPatientAccessData?.message);
      setTimeout(() => {
        setSuccessModal(false);
        dispatch(AddPatientaccessClear());
      }, 1500);
    }
    if (AddPatientAccessError) {
      setErrorModal(true);
      setMessage(AddPatientAccessError?.message);
      setTimeout(() => {
        setErrorModal(false);
        dispatch(AddPatientaccessClear());
      }, 1500);
    }
  }, [AddPatientAccessData, AddPatientAccessError]);

  const SubmitAccessRoles = () => { //API FUNCTION FOR UPDATING THE PATIENT ACCESS
    UpdatePatientaccess(
      userData?.patientData?.patient_id,
      roleId,
      accessId,
      userData?.storedValue,
      dispatch)

    
  }

  const Files = PatientaccessFiles?.data?.map(item => ({ ...item, isSelected:false }));

  console.log("file state.................", userData?.storedValue,userData?.patientData?.patient_id)
  return (
    <>
      {Loading ?

        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
          <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
          <ScrollView showsVerticalScrollIndicator={false}>


            <View>

              <View style={styles.flexView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginRight: GlobalSize(10) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                      <ArrowF height={width(22)} width={height(22)} />
                    </TouchableOpacity>
                  </View>

                  <View>
                    <LogoSmall />
                  </View>

                </View>

                <View>
                </View>


              </View>

              <View>
                <PatientDetails data={getPatientData} />
              </View>

              <View style={styles.tabView}>
                <View style={styles.cardView}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {JourneyItems?.map((item) => {
                      return (

                        <TouchableOpacity
                          style={itemState == item.id ?
                            styles.selectView :
                            styles.unselectView}
                          onPress={() => setItemState(item.id)}>
                          <Text style={styles.textTitle}>{item.Title}</Text>
                        </TouchableOpacity>

                      )
                    })}
                  </ScrollView>
                </View>
              </View>

              <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.lineView} />
              </View>

              {itemState == 1 ?
                <View>
                  <View style={styles.bottomView}>

                    <About
                      data={getPatientData}
                      Title={'About'}
                      Edit={true}
                      Phone={getPatientData?.phonenumber}
                      Gender={null}
                      DOB={getPatientData?.dob}
                      navigation={navigation}
                    />
                  </View>

                  <View style={styles.bottomView}>
                    <PatientInfo />
                  </View>
                </View> :
                itemState == 2 ?
                  <View>
                    {patientHealthData?.activeDiagnosis?.length > 0 &&
                      <View>
                        <RecentDgsis activeData={patientHealthData?.activeDiagnosis} />
                      </View>}

                    {patientHealthData?.ongoingDiagnosis?.length > 0 &&
                      <View style={{ top: GlobalSize(-20) }}>
                        <Diagnosis
                          title={'Ongoing Diagnosis'}
                          OngoingData={patientHealthData?.ongoingDiagnosis} />
                      </View>}

                    {patientHealthData?.previousDiagnosis?.length > 0 &&
                      <View style={{ top: GlobalSize(-20) }}>
                        <Diagnosis
                          title={'Previous Diagnosis'}
                          previousData={patientHealthData?.previousDiagnosis} />
                      </View>}
                  </View> :
                  itemState == 3 ?
                    <View>

                      <View>
                        <PatientStats
                          navigation={navigation}
                          stats={patientStatsData?.latest_patient_stats} />
                      </View>

                      {/* <View> //SDOH DATA NOT AVAILABLE NOW.
                      <SDOHStats />
                    </View> */}
                    </View> :

                    itemState == 4 ?
                      <View>
                        {patientEventData?.activeDiagnosis?.length > 0 &&
                          <View>
                            <RecentDischarge RecentDgData={patientEventData?.activeDiagnosis} />
                          </View>}

                        {patientEventData?.previousDiagnosis?.length > 0 &&
                          <View>
                            <PreviousDischarge previusData={patientEventData?.previousDiagnosis} />
                          </View>}

                        {/* <View>
                          <Surgery />
                        </View> */}

                      </View> :

                      itemState == 5 ?
                        <View style={DEFAULTSTYLES.alignView}>
                          <Access
                            patientAccessRoles={patientAccessRoles?.data}
                            PatientaccessFiles={Files}
                            users={users}
                            roleId={roleId}
                            setRoleId={setRoleId}
                            accessId={accessId}
                            setAccessId={setAccessId}
                            setUsers={setUsers}
                            GrantData={GrantData}
                            setGrantData={setGrantData}
                            SubmitAccessRoles={SubmitAccessRoles} />
                        </View> :
                        <View>
                          <DietPlan
                            activeDiet={patientDietData?.activeDietPlans}
                            previousDiet={patientDietData?.inactiveDietPlans} />
                        </View>}
            </View>
          </ScrollView>
        </SafeAreaView>}

      <SuccessPopup
        Message={Message}
        ModalOpen={SuccessModal}
        setModalOpen={setSuccessModal} />

      <ErrorPopup
        Message={Message}
        ModalOpen={ErrorModal}
        setModalOpen={setErrorModal} />
    </>
  )
}

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.06,
    marginBottom: DEFAULTHEIGHT * 0.02
  },
  textTitle: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    color: TEXTCOLOR7
  },
  cardView: {
    backgroundColor: BACKGROUNDWHITE,
    //width: DEFAULTWIDTH ,
    padding: GlobalSize(5),
    borderRadius: 8,
    borderColor: BORDERCOLOR2,
    borderWidth: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: GREYBACKGROUND1
  },
  lineView: {
    width: DEFAULTWIDTH * 0.88,
    height: 1,
    backgroundColor: LINECOLOR1,
    marginBottom: DEFAULTHEIGHT * 0.02
  },
  selectView: {
    backgroundColor: PUREWHITE,
    padding: GlobalSize(8),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: PLACEHOLDERCOLOR3,
    shadowOpacity: 0.3,
    marginLeft: DEFAULTWIDTH * 0.02,
    marginRight: DEFAULTWIDTH * 0.02
  },
  unselectView: {
    padding: GlobalSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: DEFAULTWIDTH * 0.03,
    paddingRight: DEFAULTWIDTH * 0.03
  },
  tabView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DEFAULTHEIGHT * 0.02,
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.05
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DEFAULTHEIGHT * 0.02
  }
})