import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import Calendar from '../../../Common/Widgets/Calendar';
import WeeklyMoodHeader from './WeeklyMoodHeader';
import {BACKGROUNDWHITE} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import DefaultBackHeader from '../../../Common/Headers/DefaultBackHeader';

const MoodCalendar = ({navigation}) => {
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <DefaultBackHeader navigation={navigation} />
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <WeeklyMoodHeader
            navigation={navigation}
            moodvalue={1}
            mood={'Good'}
          />
          <Calendar navigation={navigation}/>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    width: DEFAULTWIDTH,
    height: DEFAULTHEIGHT * 0.85,
    backgroundColor: BACKGROUNDWHITE,
  },
  subContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
});

export default MoodCalendar;
