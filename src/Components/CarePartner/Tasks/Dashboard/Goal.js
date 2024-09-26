import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  MEDSITEMCOLOR1,
  MEDSITEMCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const Goal = ({ goal,index,length }) => {
  const SVG = goal.svg;
  return (
    <View style={[styles.mainContainer,{paddingRight: length - 1 === index ? 16 : 0,}]}>
      <View
        style={[
          styles.headerFooter,
          { borderTopRightRadius: GlobalSize(15), borderTopLeftRadius: GlobalSize(15) },
        ]}>
        <Text style={styles.title}>{goal.title}</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.badgeText}>{goal.assignedBy}</Text>
        </View>
      </View>
      <View style={styles.lineWhite} />
      <View style={styles.middleLayer}>
        <View style={styles.iconContainer}>
          <SVG />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={styles.goalDesc}>
            {goal.description}
          </Text>
        </View>
      </View>
      <View style={styles.lineWhite} />
      <View
        style={[
          styles.headerFooter,
          styles.footerExtra
        ]}>
        <Text style={styles.footerText}>{goal.startDate}</Text>
        <Text style={styles.footerText}>{goal.period}</Text>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    paddingLeft:GlobalSize(15),
    paddingBottom:GlobalSize(20)
  },
  headerFooter: {
    flexDirection: 'row',
    backgroundColor: PRIMARYCOLOR,
    justifyContent: 'space-between',
    padding: GlobalSize(5),
    alignItems: 'center',
  },
  middleLayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MEDSITEMCOLOR2,
    width: DEFAULTWIDTH * 0.65,
    padding:GlobalSize(5)
  },
  title: {
    fontStyle: FONTS.FontBold,
    color: PUREWHITE,
    fontSize: fontSize(14)
  },
  headerBadge: {
    backgroundColor: PUREWHITE,
    padding: GlobalSize(5),
    borderRadius: GlobalSize(10)
  },
  badgeText: {
    color: MEDSITEMCOLOR1,
    fontFamily: FONTS.FontLight,
    fontSize: fontSize(12),
  },
  iconContainer: {
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(15),
    margin: GlobalSize(5),
    width: DEFAULTWIDTH * 0.18,
    padding:GlobalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineWhite: {
    backgroundColor: PUREWHITE,
    height: 1
  },
  footerText: {
    color: PUREWHITE,
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(10)
  },
  footerExtra: {
    borderBottomRightRadius: GlobalSize(15),
    borderBottomLeftRadius: GlobalSize(15),
    paddingBottom: GlobalSize(10),
  },
  goalDesc:{
    color: PUREWHITE,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
  }
});

export default Goal;
