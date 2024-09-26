import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import {
  PUREWHITE,
  TEXTCOLOR5,
  TEXTCOLORW,
} from '../../../../Constants/Colors/Colors';
import { Stethescope } from '../../../../../assets';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const DiagnosisList = ({ diagnosis,index,data }) => {
  const SVG = diagnosis.svg;
  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS === 'ios'
          ? DEFAULTSTYLES.iosShadow
          : DEFAULTSTYLES.androidShadow,
          {
            marginRight: data?.length - 1 === index ? GlobalSize(10) : 0,
          },
      ]}>
      <SVG width={GlobalSize(40)} height={GlobalSize(40)} />
      <Text style={styles.headerText}>{diagnosis.diagnosis}</Text>
      <Text style={styles.icdText}>ICD Code: {diagnosis.icdcode}</Text>

      <View
        style={{ flexDirection: 'row', marginVertical: DEFAULTHEIGHT * 0.02 }}>
        <View style={DEFAULTSTYLES.medMarginRight}>
          {/* Icon to Denot Physician */}
          <Stethescope width={GlobalSize(20)} height={GlobalSize(20)} />
        </View>
        <Text style={DEFAULTSTYLES.medPhysicianName}>{diagnosis.physician}</Text>
      </View>

      <View
        style={styles.flexView}>
        <View style={DEFAULTSTYLES.dateView}>
          <Text style={DEFAULTSTYLES.dateText}>{diagnosis.startDate}</Text>
        </View>
        <View>
          <View style={DEFAULTSTYLES.dateView}>
            <Text style={DEFAULTSTYLES.dateText}>{diagnosis.period}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    marginLeft:GlobalSize(10),
    width: DEFAULTWIDTH * 0.6,
    alignItems: 'center',
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(15),
    paddingTop: DEFAULTHEIGHT * 0.03,
    marginBottom: GlobalSize(8)
  },
  flexView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: DEFAULTWIDTH * 0.5,
    marginBottom: DEFAULTHEIGHT * 0.03
  },
  headerText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(15),
    color: TEXTCOLOR5
  },
  icdText: {
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLORW
  },
});

export default DiagnosisList;
