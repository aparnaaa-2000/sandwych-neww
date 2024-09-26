import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BETTYSMITHPROFILE} from '../../../../Constants/DummyImages';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR7,
  PRIMARYCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR7,
  TEXTCOLORSC1,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {fontSize} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const PatientImage = ({navigation}) => {
  const profileImg = BETTYSMITHPROFILE;
  const Address =
    'Unit F, Winston Business, Park Churchill Way, Sheffield, S35 2PS';

  const navigateToPatientDetail = () => {
    navigation.navigate('HomeStack', {screen: 'CasePatientMoreDetails'})
  };

  const PatientInfor = () => {
    return (
      <View>
        <View style={styles.infoHeader}>
          <Text style={styles.textLast}>Personal Info</Text>
          <TouchableOpacity
            onPress={() => navigateToPatientDetail()}
            style={{}}>
            <Text style={styles.moreBtnText}>view more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.viewCard}>
          {/* Name */}
          <View style={styles.patientInfoRow}>
            <View>
              <Text style={styles.infoTitle}>Name : </Text>
            </View>
            <View>
              <Text style={styles.infoText}>Betty Smith</Text>
            </View>
          </View>
          {/* Email */}
          <View style={styles.patientInfoRow}>
            <View>
              <Text style={styles.infoTitle}>Email : </Text>
            </View>
            <View>
              <Text style={styles.infoText}>bettysmith@gmail.com</Text>
            </View>
          </View>
          {/* Phone */}
          <View style={styles.patientInfoRow}>
            <View>
              <Text style={styles.infoTitle}>Phone : </Text>
            </View>
            <View>
              <Text style={styles.infoText}>+1 9876543210</Text>
            </View>
          </View>
          {/* Address */}
          <View style={styles.patientInfoRow}>
            <View>
              <Text style={styles.infoTitle}>Address : </Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <Text style={styles.infoText}>{Address}</Text>
            </View>
          </View>
          {/* Zipcode */}
          <View style={styles.patientInfoRow}>
            <View>
              <Text style={styles.infoTitle}>Zipcode : </Text>
            </View>
            <View>
              <Text style={styles.infoText}>541602</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={DEFAULTSTYLES.alignView}>
      <View style={styles.viewImg}>
        <Image source={{uri: profileImg}} style={styles.imageV} />
      </View>
      <PatientInfor />
    </View>
  );
};

const styles = StyleSheet.create({
  imageV: {
    width: DEFAULTWIDTH * 0.42,
    height: DEFAULTWIDTH * 0.42,
    borderRadius: DEFAULTWIDTH * 0.42,
  },
  viewImg: {
    marginTop: DEFAULTWIDTH * 0.03,
  },
  infoHeader: {
    marginVertical: DEFAULTWIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLast: {
    fontFamily: FONTS.FontBold,
    color: TEXTCOLOR7,
    fontSize: 22,
  },
  patientInfoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
  infoTitle: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(15),
    color: TEXTCOLORSC1,
  },
  infoText: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
    textAlign: 'right',
  },
  moreBtnText: {
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontRegular,
    textDecorationLine: 'underline',
  },
  viewCard: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.88,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    borderColor: BORDERCOLOR7,
    padding: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.05,
  },
});
export default PatientImage;
