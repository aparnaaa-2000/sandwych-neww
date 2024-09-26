import { View, Text, Platform, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  MEDSITEMCOLOR2,
  MEDSITEMCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLORW,
} from '../../../../Constants/Colors/Colors';
import { Brain, Stethescope } from '../../../../../assets';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const RecentDiagnosis = ({ activeDgData }) => {

  console.log("ACTIVE DATA................", activeDgData)
  return (

    <View>
      {activeDgData?.map((item) => {
        return (
          <ScrollView horizontal>
            <View style={{ marginTop: DEFAULTHEIGHT * 0.02, marginLeft: GlobalSize(10) }}>
              <Text style={styles.ongText}>Recent Diagnosis</Text>
              <View
                style={[
                  styles.cardView,
                  Platform.OS === 'ios'
                    ? DEFAULTSTYLES.iosShadow
                    : DEFAULTSTYLES.androidShadow,
                ]}>

                <View style={{ flexDirection: 'row' }}>

                  <View style={styles.iconView}>
                    <Brain width={120} height={60} />
                  </View>

                  <View>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={styles.diagnosisText}>{item?.diagnosis_name}</Text>
                      <Text style={styles.icdText}>ICD Code: {item?.icd_code}</Text>

                      <View style={{ flexDirection: 'row', marginTop: GlobalSize(10), marginBottom: GlobalSize(10) }}>

                        <View style={{ marginRight: GlobalSize(10) }}>
                          <Stethescope width={GlobalSize(20)} height={GlobalSize(20)} />
                        </View>
                        <Text style={DEFAULTSTYLES.medPhysicianName}>Flores Mark, MD</Text>
                      </View>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                      <View style={[DEFAULTSTYLES.dateView, { marginRight: GlobalSize(30) }]}>
                        <Text style={DEFAULTSTYLES.dateText}>{item?.start_date}</Text>
                      </View>

                      <View style={DEFAULTSTYLES.dateView}>
                        <Text style={DEFAULTSTYLES.dateText}>{item?.duration}</Text>
                      </View>
                    </View>
                  </View>

                </View>
              </View>
            </View>
          </ScrollView>
        )
      })}

    </View>
  );
};

const styles = new StyleSheet.create({
  icdText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: TEXTCOLORW,
  },
  diagnosisText: {
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR5,
    fontSize: fontSize(18),
  },
  iconView: {
    backgroundColor: MEDSITEMCOLOR3,
    //height: DEFAULTHEIGHT * 0.11,
    width: DEFAULTHEIGHT * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: DEFAULTWIDTH * 0.02,
    borderRadius: fontSize(10),
    padding: GlobalSize(16)
  },
  cardView: {
    marginVertical: DEFAULTHEIGHT * 0.02,
    padding: DEFAULTHEIGHT * 0.02,
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.888,
    borderRadius: GlobalSize(15),
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  physicianView: {
    flexDirection: 'row',
    marginVertical: DEFAULTHEIGHT * 0.02,
  },
  ongText: {
    fontSize: fontSize(14),
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontSemiB
  }


});

export default RecentDiagnosis;
