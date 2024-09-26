import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import { MEDSITEMCOLOR1, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const MainStats = ({data}) => {

  return (
    <View style={DEFAULTSTYLES.alignView}>
     <View
      style={[
        styles.headerContainer,
        Platform.OS === 'ios'
          ? DEFAULTSTYLES.iosShadow
          : DEFAULTSTYLES.androidShadow,
      ]}>
      <Text style={styles.titleText}>Daily Task</Text>
      <View style={styles.headerSatsItem}>
        <Text style={styles.calcText}>
        {data?.completed_tasks}/{data?.total_tasks}
        </Text>
      </View>
    </View>
    </View>
  );
};



const styles = new StyleSheet.create({
  headerContainer: {
    width: DEFAULTWIDTH * 0.70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(15),
    margin: DEFAULTWIDTH * 0.01,
    padding:GlobalSize(10),
    marginLeft:GlobalSize(6),
    marginRight:GlobalSize(6)
    
  },
  headerSatsItem: {
    padding: DEFAULTWIDTH * 0.03,
    backgroundColor: MEDSITEMCOLOR1,
    width: DEFAULTWIDTH * 0.56,
    height: DEFAULTWIDTH * 0.24,
    borderRadius: GlobalSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: DEFAULTHEIGHT * 0.01
  },
  titleText: {
    fontSize: fontSize(20),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR
  },
  calcText: {
    color: PUREWHITE,
    fontSize: fontSize(24),
    fontFamily: FONTS.FontBlack
  },
});

export default MainStats;
