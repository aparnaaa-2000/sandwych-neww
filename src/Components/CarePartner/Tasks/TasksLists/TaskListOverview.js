import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//IMPORT PACKAGES
import * as Progress from 'react-native-progress';

//IMPORT CONSTANTS
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import {
  FOURTHCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const TaskListOverview = ({ info }) => {

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.iconRow}>
          <View
            style={styles.iconView}
          //Add the Icon
          ></View>
        </View>

        <Text style={styles.headerText}>Daily Task</Text>
      </View>

      <View style={styles.headerContainer}>
        <View
          style={styles.iconRow}
        //Add the Icon
        >
          <Text style={styles.statusText}>
            {info?.completed_tasks}/{info?.total_tasks}
          </Text>
        </View>
        <View>
          <Progress.Bar
            progress={0.75}
            width={DEFAULTWIDTH * 0.65}
            height={6}
            color={FOURTHCOLOR}
            unfilledColor={PUREWHITE}
            borderWidth={0}
          />
          <Text style={styles.descText}>Overall Completion of Daily Task</Text>
        </View>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.9,
    alignSelf: 'center',
    borderRadius: GlobalSize(12),
    padding: GlobalSize(10)
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginTop: DEFAULTWIDTH * 0.03,
    marginBottom: DEFAULTWIDTH * 0.01,
    alignItems: 'center',
  },
  iconRow: {
    width: DEFAULTWIDTH * 0.12,
    marginRight: DEFAULTWIDTH * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconView: {
    width: DEFAULTWIDTH * 0.1,
    height: DEFAULTWIDTH * 0.1,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: PUREWHITE,
    fontSize: fontSize(28),
    fontFamily: FONTS.FontLight
  },
  statusText: {
    color: PUREWHITE,
    fontSize: fontSize(20),
    fontFamily: FONTS.FontRegular,
  },
  descText: {
    color: PUREWHITE,
    marginTop: DEFAULTWIDTH * 0.01,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontLight,
  },
});

export default TaskListOverview;
