import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Account, SwitchProfile} from '../../../../assets';
import {
  BACKGROUNDWHITE,
  GREYICONBACKGROUND,
  LINECOLOR1,
  TEXTCOLOR10,
  TEXTCOLOR5,
} from '../../../Constants/Colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const CaseManagerHeader = ({navigation}) => {
  const [UserData, setUserData] = useState();

  useEffect(() => {
    getData().then(data => setUserData(data));
  }, []);

  const getData = async () => {
    try {
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      const patient = patientData != null ? JSON.parse(patientData) : null;
      const carepartner =
        carepartnerData != null ? JSON.parse(carepartnerData) : null;

      return {patient, carepartner};
    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  const UserNavigation = () => {
    navigation.navigate('HomeStack', {screen: 'PatientList'})
  };

  return (
    <View style={{backgroundColor: BACKGROUNDWHITE}}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('HomeStack', {screen: 'PatientProfile'})
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Account width={50} height={50} opacity={0.5} />
          <View style={{marginLeft: GlobalSize(10)}}>
            <Text style={styles.mainHeader}>Betty Smith</Text>
            <Text style={styles.subHeader}>Bettysmith@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.peaceOverlay}
          onPress={() => UserNavigation()}>
          <SwitchProfile width={GlobalSize(25)} height={GlobalSize(25)} />
        </TouchableOpacity>
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
    marginLeft: GlobalSize(10),
  },
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: 1,
    margin: GlobalSize(10),
    marginLeft: GlobalSize(8),
    marginRight: GlobalSize(8),
  },
  imageView: {
    width: GlobalSize(40),
    height: GlobalSize(40),
    borderRadius: GlobalSize(40),
    marginLeft: GlobalSize(10),
  },
  imageDummy: {
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(50),
    marginLeft: GlobalSize(10),
  },
  mainHeader: {
    fontFamily: 'Inter-Medium',
    color: TEXTCOLOR10,
    fontSize: fontSize(14),
  },
  subHeader: {
    fontFamily: 'Inter-Regular',
    color: TEXTCOLOR5,
    fontSize: fontSize(14),
    // maxWidth:DEFAULTWIDTH*0.9,
    // backgroundColor:'red'
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

export default CaseManagerHeader;
