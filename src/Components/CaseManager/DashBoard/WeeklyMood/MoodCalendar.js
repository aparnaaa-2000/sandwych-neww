import {StyleSheet, View} from 'react-native';
import React from 'react';
import Calendar from '../../../Common/Widgets/Calendar'
import WeeklyMoodHeader from './WeeklyMoodHeader';
import { BACKGROUNDWHITE } from '../../../../Constants/Colors/Colors';

const MoodCalendar = ({navigation, route}) => {
  const {MOODVALUE, MOOD} = route ? route.params : null;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subContainer}>
        <WeeklyMoodHeader
          navigation={navigation}
          moodvalue={MOODVALUE}
          mood={MOOD ? MOOD : ''}
        />
        <Calendar />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUNDWHITE,
  },
  subContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
});

export default MoodCalendar;
