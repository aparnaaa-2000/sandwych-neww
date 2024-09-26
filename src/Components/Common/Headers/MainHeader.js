import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  GREYICONBACKGROUND,
  LINECOLOR1,
  TEXTCOLOR10,
  TEXTCOLOR5
} from '../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { BlueHome } from '../../../../assets';
import { Account, SwitchProfile} from '../../../../assets';

//IMPORT PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const MainHeader = ({ navigation, Home,RemoveData }) => {

  const [UserData, setUserData] = useState()
  const [imageError,setImageError] = useState(false)


  useEffect(() => {
    getData().then(data => setUserData(data));
  }, []);

  const getData = async () => { //FUNCTION FOR GETTING THE ASYNC DATA
    try {
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      const patient = patientData != null ? JSON.parse(patientData) : null;
      const carepartner = carepartnerData != null ? JSON.parse(carepartnerData) : null;

      return { patient, carepartner };
    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  const HomeNavigation = ()=>{ //NAVIGATION TO HOME SCREEN
    RemoveData();
    navigation.navigate('LandingScreen');
  }

  const UserNavigation = () => { //NAVIGATEION TO THE PATIENT SELECT SCREEN
    navigation.navigate('ChooseTheUser')
  }

  return (
    <View style={{ backgroundColor: BACKGROUNDWHITE }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('MenuStack', { screen: 'Journey' })}
          style={{ flexDirection: 'row', alignItems: 'center' }}>

          {UserData?.patient?.profile && !imageError ?
            <FastImage
              style={styles.imageView}
              source={{
                uri: UserData?.patient?.profile,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
              onError={()=>setImageError(true)}
            /> :
            <Account width={50} height={50} opacity={0.5} />}
          <View style={{ marginLeft: GlobalSize(10) }}>
            <Text style={styles.mainHeader}>{UserData?.patient?.name}</Text>

            {!Home &&
            <Text style={styles.subHeader}>{UserData?.patient?.email}</Text>}
          </View>
        </TouchableOpacity>

        {Home &&
          <TouchableOpacity onPress={()=>HomeNavigation()}style={{marginLeft:GlobalSize(80)}}>
            <BlueHome />
          </TouchableOpacity>}
        {UserData?.carepartner?.role == 'carepartner' &&
          <TouchableOpacity
            style={styles.peaceOverlay}
            onPress={() => UserNavigation()}>
            <SwitchProfile width={GlobalSize(25)} height={GlobalSize(25)} />
          </TouchableOpacity>}

      </View>
      <View style={styles.lineBorder} />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: GlobalSize(10),
    marginBottom: GlobalSize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: GlobalSize(10)
  },
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: 1,
    margin: GlobalSize(10),
    marginLeft: GlobalSize(8),
    marginRight: GlobalSize(8)
  },
  imageView: {
    width: GlobalSize(40),
    height: GlobalSize(40),
    borderRadius: GlobalSize(40),
    marginLeft: GlobalSize(10)
  },
  imageDummy: {
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(50),
    marginLeft: GlobalSize(10)
  },
  mainHeader: {
    fontFamily: 'Inter-Medium',
    color: TEXTCOLOR10,
    fontSize: fontSize(14),
  },
  subHeader: {
    fontFamily: 'Inter-Regular',
    color: TEXTCOLOR5,
    fontSize: fontSize(13)
  },
  peaceOverlay: {
    width: GlobalSize(40),
    height: GlobalSize(40),
    backgroundColor: GREYICONBACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(40),
    marginRight: GlobalSize(10),
  },
});

export default MainHeader;
