import React, {useState} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {FONTS} from '../../../../Constants/Fonts';
import {
  TEXTCOLOR10,
  BACKGROUNDWHITE,
  BORDERCOLOR7,
  LINECOLOR1,
  TEXTCOLORSC1,
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../../Constants/styles/styles';
import PatientHeader from '../PatientProfile/PatientHeader';

const PatientDetailCard = ({navigation}) => {
  const PATIENTFULLINFO = {
    name: 'Betty Smith',
    address: '1234567 S. Congress St, Austin TX',
    pincode: '78744',
    dob: '17-10-1970',
    email: 'bettysmith@gmail.com',
    phone: '+1 989121',
    ssnNumber: '000-000-0000',
    medicareNo: '123456789',
    medicaidNo: '123456789',
    currentPayementSrc: 'Cash, Check, Card',
    unit: 'ICU',
    location: 'Pearland Hospital',
    languages: 'English[US], French, Spanish',
    advanceCareDirective: 'YES',
    mpoa: 'Alan Betty Smith, +1 (123) 456-7890, alanbetty@gmail.com',
    // isMpoaPrimaryCarePartner: '',
  };

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <ScrollView style={{flex: 1}}>
      <PatientHeader navigation = {navigation} Header={'Patient Info'} />
        <View style={DEFAULTSTYLES.alignView}>
          <View style={styles.viewCard}>
            {Object.keys(PATIENTFULLINFO).map(key => (
              <>
                <View key={key} style={styles.itemRow}>
                  <Text style={styles.textTitle}>{key.toUpperCase()} :</Text>
                  <Text style={styles.textKey}>{PATIENTFULLINFO[key]}</Text>
                </View>
                <View style={styles.lineView} />
              </>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewCard: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.88,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDERCOLOR7,
    padding: DEFAULTWIDTH * 0.04,
    marginBottom: 15,
  },
  textKey: {
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
    textAlign: 'right',
    width: "50%"
  },
  textTitle: {
    fontSize: 15,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLORSC1,
    width: "40%"
  },
  lineView: {
    margin: 10,
    width: DEFAULTWIDTH * 0.82,
    height: 1,
    backgroundColor: LINECOLOR1,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.02,
  },
});

export default PatientDetailCard;
