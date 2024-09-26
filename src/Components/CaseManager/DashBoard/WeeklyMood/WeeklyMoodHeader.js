import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
  BORDERCOLOR1,
  SECONDARYTEXTCOLOR4,
  TEXTCOLOR10,
  TEXTCOLOR2
} from '../../../../Constants/Colors/Colors';
import MainHeader from '../../../Common/Headers/MainHeader';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const WeeklyMoodHeader = ({ navigation, moodvalue, mood }) => {
  // Get the current date
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = currentDate.getDate();
  // const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const moveToWeeklyTracker = () => {
    navigation.navigate('MoodTrackerActivity');
  };


  return (
    <View style={styles.mainContainer}>

      <MainHeader navigation={navigation} />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>Mood Tracker</Text>
      </View>
      <View style={styles.dateOverlay}>
        <Text style={styles.dateText}>
          {month}  {day}, {year}
        </Text>
        {mood != null && moodvalue === true ? (
          <View style={{ marginTop: GlobalSize(10) }}>
            <Text style={{ color: TEXTCOLOR2 }}>{mood}</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => moveToWeeklyTracker()}
            style={styles.patientsFeelOverlay}>
            <Text style={styles.patientsFeelText}>
              How is Betty feeling today?
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    marginBottom: GlobalSize(15),
    marginTop: GlobalSize(10)
  },
  subContainer: {
    marginBottom: GlobalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(20),
    color: TEXTCOLOR10,
  },
  dateOverlay: {
    borderWidth: 1,
    padding: GlobalSize(10),
    borderRadius: GlobalSize(4),
    borderColor: BORDERCOLOR1,
  },
  patientsFeelOverlay: {
    height: GlobalSize(40),
    width: '100%',
    marginTop: GlobalSize(5),
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: fontSize(4),
    backgroundColor: BORDERCOLOR1,
    borderColor: BORDERCOLOR1,
  },
  patientsFeelText: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(12),
    color: SECONDARYTEXTCOLOR4,
  },
  dateText: {
    color: TEXTCOLOR10,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14)
  }
});

export default WeeklyMoodHeader;
