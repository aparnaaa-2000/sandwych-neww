import React from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { FONTS } from '../../../../Constants/Fonts';
import { BACKGROUNDWHITE, BORDERCOLOR1, PUREWHITE, PRIMARYCOLOR0, TEXTCOLOR10 } from '../../../../Constants/Colors/Colors';
import { AddIcon } from '../../../../../assets';
import RxComponent from '../../Home/RxComponent';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';


const MedicationCard = ({ navigation }) => {
  
  return (
    <>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle="dark-content" />
      <View style={{ backgroundColor: BACKGROUNDWHITE }}>
        <View style={styles.viewMain}>
          <View>
            <Text style={styles.textMeds}>
              Medications
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('AddMeds')}>
            <AddIcon width={25} height={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.border} />
        <View style={styles.rxView}>
          <RxComponent />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textMeds: {
    fontSize: 18,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
    fontWeight: '500',
  },
  border: {
    borderWidth: 0.5,
    borderColor: BORDERCOLOR1,
    width: DEFAULTWIDTH * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.05,
  },
  viewMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  rxView: {
    margin: 6,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MedicationCard;
