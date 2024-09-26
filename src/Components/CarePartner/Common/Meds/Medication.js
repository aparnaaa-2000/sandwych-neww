import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';

//IMPORT CONSTANTS
import {
  MEDSITEMCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
  TRANSPARENTCOLOR1,
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';

import { Drop } from '../../../../../assets';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT PACKAGES
import { TouchableOpacity } from 'react-native-gesture-handler';

const Medication = ({ medication }) => {
  console.log("medication...................", medication?.time)
  return (
    <>
      <View style={styles.contentContainer}>
        <View style={{ marginRight: DEFAULTWIDTH * 0.02 }}>
          <Text style={styles.timeText}>{medication?.time}</Text>
        </View>
        <View style={styles.lineVertical} />
        <View>
          {medication?.tasks?.map((item) => {

            return (
              <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                  <View style={[styles.headerItems, DEFAULTSTYLES.medMarginLeft]}>
                    <Text style={styles.diagnosisText}>{item?.diagnosis_name}</Text>
                  </View>

                  {/* Button / Marking */}
                  <TouchableOpacity
                    style={[
                      styles.buttonView,
                      Platform.OS === 'ios'
                        ? DEFAULTSTYLES.iosShadow
                        : DEFAULTSTYLES.androidShadow,
                    ]}>
                    <Text style={[styles.textColor, { fontFamily: FONTS.FontSemiB }]}>
                      Done?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.infoView}>
                  {/* Icon */}
                  <View style={styles.iconView}>
                    <Drop width={55} height={55} />
                  </View>
                  {/* Informations */}
                  <View style={styles.infoHeight}>
                    <View style={styles.informationView}>
                      <Text style={styles.titleText} numberOfLines={7}>{item?.medication_name}</Text>
                      <Text style={[styles.textColor, { fontFamily: FONTS.FontLight, width: DEFAULTWIDTH * 0.5 }]} numberOfLines={4}>
                        {item?.instruction_for_medication_usage}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    </>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    width: DEFAULTWIDTH * 0.73,
    marginBottom: DEFAULTHEIGHT * 0.009,
    borderRadius: GlobalSize(15),
    backgroundColor: TRANSPARENTCOLOR1,
    paddingBottom: GlobalSize(10)
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: MEDSITEMCOLOR2,
    borderTopLeftRadius: GlobalSize(15),
    borderTopRightRadius: GlobalSize(15),
    alignItems: 'center',
  },
  iconView: {
    height: DEFAULTHEIGHT * 0.07,
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.18,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textColor: {
    color: PUREWHITE,
    fontSize: fontSize(12),
  },
  buttonView: {
    width: DEFAULTWIDTH * 0.18,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderLeftWidth: 0.5,
    borderColor: PUREWHITE,
    padding: GlobalSize(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerItems: {
    height: DEFAULTHEIGHT * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    flex: 1,
    flexDirection: 'row'
  },
  informationView: {
    justifyContent: 'space-around',
    flex: 1
  },
  titleText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(12),
    color: PUREWHITE,
    width: DEFAULTWIDTH * 0.5,

  },
  diagnosisText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: PUREWHITE,
  },
  infoHeight: {
    height: DEFAULTHEIGHT * 0.12
  },
  timeText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: PRIMARYCOLOR,
  },
  lineVertical: {
    height: 'auto',
    width: DEFAULTWIDTH * 0.002,
    marginRight: DEFAULTWIDTH * 0.02,
    backgroundColor: PRIMARYCOLOR,
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: DEFAULTHEIGHT * 0.01,
    marginBottom: GlobalSize(10)
  },
});

export default Medication;
