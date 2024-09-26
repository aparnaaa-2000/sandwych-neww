import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {
  BORDERCOLOR1,
  SECONDARYTEXTCOLOR4,
  TEXTCOLOR10,
  TEXTCOLOR2,
} from '../../../../Constants/Colors/Colors';
import MainHeader from '../../../Common/Headers/MainHeader';
import CaseManagerHeader from '../../../Common/Headers/CaseManagerHeader';

const WeeklyMoodHeader = ({navigation, moodvalue, mood}) => {
  // Get the current date
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const month = currentDate.toLocaleString('default', {month: 'long'});
  const year = currentDate.getFullYear();

  const moveToWeeklyTracker = () => {
    navigation.navigate('CaseMoodTrackerActivity');
  };

  return (
    <View style={styles.mainContainer}>
      <CaseManagerHeader navigation={navigation} />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Mood Tracker</Text>
      </View>
      <View style={styles.dateOverlay}>
        <Text style={styles.dateText}>
          {month} {day}, {year}
        </Text>
        <TouchableOpacity
          onPress={() => moveToWeeklyTracker()}
          style={styles.patientsFeelOverlay}>
          <View style={{marginTop: 10}}>
            <Text style={{color: TEXTCOLOR2}}>{mood}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    marginBottom: 15,
    marginTop: 10,
  },
  subContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: TEXTCOLOR10,
  },
  dateOverlay: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    borderColor: BORDERCOLOR1,
  },
  patientsFeelOverlay: {
    height: 40,
    width: '100%',
    marginTop: 5,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: BORDERCOLOR1,
    borderColor: BORDERCOLOR1,
  },
  patientsFeelText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: SECONDARYTEXTCOLOR4,
  },
  dateText: {
    color: TEXTCOLOR10,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});

export default WeeklyMoodHeader;
