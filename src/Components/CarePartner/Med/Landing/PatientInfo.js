import { View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLORW,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const PatientInfo = ({ patientStatsData }) => {

  const ARRAYSTYLES = [
    styles.squareContainer,
    Platform.OS == 'android'
      ? DEFAULTSTYLES.androidShadow
      : DEFAULTSTYLES.iosShadow,
  ];

  console.log("STATS PASSED.......................", patientStatsData?.latest_patient_stats)
  return (
    <View style={{marginBottom:GlobalSize(10)}}>
{patientStatsData?.latest_patient_stats?.length >0 &&
      <View style={{ marginLeft: GlobalSize(10) }}>
        <Text style={styles.patientText}>
          Patient Info
        </Text></View>}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}>

        {patientStatsData?.latest_patient_stats?.map((item) => {
          return (
            <View>
              <View style={ARRAYSTYLES}>
                <Text style={styles.titleText}>{item?.stats_type == '0' ? 'Height' :
                  item?.stats_type == '1' ? 'Weight' : item?.stats_type == '2' ? 'Body Temperature' : item?.stats_type == '3' ?
                    'Body Pressure' : item?.stats_type == '4' ? 'Blood Glucose' : null}</Text>
                <Text style={styles.detailText}>{item?.count}</Text>
              </View>

            </View>
          )
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  squareContainer: {
    width: DEFAULTWIDTH * 0.38,
    marginRight: DEFAULTWIDTH * 0.02,
    alignItems: 'center',
    backgroundColor: PUREWHITE,
    justifyContent: 'center',
    padding: GlobalSize(10),
    borderRadius: GlobalSize(15),
    margin: GlobalSize(2),
    marginLeft: GlobalSize(8)
  },
  detailText: {
    fontFamily: FONTS.FontRegular,
    fontSize: GlobalSize(16),
    color: TEXTCOLORW,
    alignSelf: 'center',
    marginTop: DEFAULTWIDTH * 0.02,
  },
  titleText: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(12),
    color: TEXTCOLOR7,
    textAlign: 'center'
    // marginTop: -DEFAULTWIDTH * 0.05
  },
  patientText: {
    fontFamily: FONTS.FontBold,
    color: TEXTCOLOR7,
    fontSize: fontSize(14),
    marginBottom: GlobalSize(10)
  }
});

export default PatientInfo;
