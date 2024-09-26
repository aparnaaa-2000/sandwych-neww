import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native'

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import MainHeader from '../../../../Components/Common/Headers/MainHeader';
import TeamList from '../../../../Components/CarePartner/Vault/Careteam/TeamList'
import DashboardHeader from '../../../../Components/Common/Headers/DashboardHeader';
import CustomSidebarMenu from '../../../../Components/CarePartner/SideMenu/CustomSideMenuBar';
import { LEGALDOC } from '../../../../Components/CarePartner/Vault/Careteam/CareTeam';

//IMPORT THIRD-PARTY PACKAGES
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { LegalDocClear } from '../../../../redux/Slice/CareTeam/LegalDocKey';
import { CareTeamClear } from '../../../../redux/Slice/CareTeam/CareTeamKey';
import { MedTeamClear } from '../../../../redux/Slice/CareTeam/MedicalTeamKey';
import { getCareTeam, getLegalDoc, getMedTeam } from '../../../../redux/Thunk/CareTeamThunk';

//import TeamList from '../../Components/Careteam/TeamList';


const Drawer = createDrawerNavigator();

const CareTeamScreen = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => <CustomSidebarMenu {...props} />}>
    <Drawer.Screen name="CareTeamMain" component={CareTeamMain} />
  </Drawer.Navigator>
);

const CareTeamMain = ({ navigation }) => {

  const dispatch = useDispatch()

  const DOC_TYPE0 = '0';
  const DOC_TYPE1 = '1';
  
  const [valueTeam, setValueTeam] = useState('Care team');
  const [DocList, setDocList] = useState(LEGALDOC);
  const [UserData, setUserData] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)

  const { MedTeam, error, isLoading, CareTeam, LegalDoc, MedicalDoc } = useSelector(
    state => ({
      MedTeam: state.getMedTeam.data,
      error: state.getMedTeam.error,
      isLoading: state.getCareTeam.isLoading,
      CareTeam: state.getCareTeam.data,
      LegalDoc: state.getLegalDoc.data,
      MedicalDoc: state.getLegalDoc.data
    }),
    shallowEqual
  );


  useEffect(() => {
    dispatch(MedTeamClear());
    dispatch(CareTeamClear());
    dispatch(LegalDocClear());
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
  }, [navigation, selectedDoc]); // Add token if it's a dependency

  const fetchData = async () => { //FUNCTION FOR GETTING THE API DATA AND LOCAL STORAGE DATA
    const data = await getData();
    setUserData(data);

    const patientId = data?.patientData?.patient_id;
    const storedValue = data?.storedValue;

    getMedTeam(patientId, storedValue, dispatch); //CALLING THE MEDICAL TEAM API
    getCareTeam(patientId, storedValue, dispatch); //CALLING THE CARETEAM API
    if (selectedDoc === '0' || selectedDoc === '1') {
      getLegalDoc(selectedDoc, patientId, storedValue, dispatch); //CALLING THE LEGAL DOCUMENTS LIST API
    }
  };

  const getData = async () => { //FETCH THE LOCALLY STORED DATA
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

  const OnUploadNavigation = () => { //FUNCTION FOR NAVIGATING TO THE SCREEN

    if (valueTeam === '0') {
      navigation.navigate('MenuStack', {
        screen: 'UploadDoc',
        params: { docType: DOC_TYPE0 }
      })
    } else {
      navigation.navigate('MenuStack', {
        screen: 'UploadDoc',
        params: { docType: DOC_TYPE1 }
      })
    }
  }

  return (
    <>
      {isLoading ?
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>

          <View style={{ backgroundColor: BACKGROUNDWHITE, margin: GlobalSize(10) }}>

            <DashboardHeader navigation={navigation} />

            <View style={DEFAULTSTYLES.lineBorder} />
            {UserData?.carepartnerData?.role == 'carepartner' &&
              <MainHeader navigation={navigation} />}
          </View>

          <View style={styles.container}>
            <TeamList
              MedTeam={MedTeam}
              CareTeam={CareTeam}
              LegalDoc={LegalDoc}
              DocList={DocList}
              setSelectedDoc={setSelectedDoc}
              MedicalDoc={MedicalDoc}
              setDocList={setDocList}
              valueTeam={valueTeam}
              setValueTeam={setValueTeam}

            />
          </View>

          {(valueTeam === '0' || valueTeam === '1') &&
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.touchBtn}
                onPress={() => OnUploadNavigation()}>
                <Text style={styles.textBtn}>+</Text>
              </TouchableOpacity>
            </View>}

        </SafeAreaView>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center',
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
  loadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },

})
export default CareTeamScreen