import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import moment from 'moment';
import {ArrowB, ArrowF} from '../../../../assets';
import {
  BORDERCOLOR2,
  CALENDER1,
  CALENDER2,
  CALENDER3,
  PRIMARYCOLOR,
  TEXTCOLOR7,
} from '../../../Constants/Colors/Colors';
import {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetMonthlyMood} from '../../../redux/thunk';

const Calendar = ({navigation}) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(moment());
  const [Token, setToken] = useState(null);

  const {data, error, isLoading} = useSelector(
    state => ({
      data: state.getMonthPatientMood.data,
      error: state.getMonthPatientMood.error,
      isLoading: state.getMonthPatientMood.isLoading,
    }),
    shallowEqual,
  );

  useEffect(() => {
    getData().then(data => {
      // setUserData(data),
      //console.log("data print.............", data)
      GetMonthlyMood(
        data?.carepartners_patients[0]?.id,
        moment(date).format('M'),
        moment(date).format('YYYY'),
        Token,
        dispatch,
      );
    });
  }, [Token]);

  console.log('data..................', data?.patient_moods);

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      setToken(storedValue);
      const jsonValue = await AsyncStorage.getItem('UserData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  // Function to get color based on mood
  const getColorForMood = mood => {
    switch (mood) {
      case '1':
        return 'blue'; // Or any color you prefer for mood 1
      case '2':
        return 'green'; // Or any color you prefer for mood 2
      case '3':
        return 'yellow'; // Or any color you prefer for mood 3
      case '4':
        return 'red'; // Or any color you prefer for mood 4
      default:
        return 'black'; // Default color if mood is not recognized
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevMonth} style={{padding: 8}}>
          <ArrowF />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {selectedDate.format('MMMM YYYY')}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={{padding: 8}}>
          <ArrowB />
        </TouchableOpacity>
      </View>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
    return (
      <View style={styles.daysOfWeek}>
        {daysOfWeek.map(day => (
          <Text key={day} style={styles.dayText}>
            {day}
          </Text>
        ))}
      </View>
    );
  };

  const renderCalendarDays = () => {
    const firstDayOfMonth = selectedDate.clone().startOf('month');
    const daysInMonth = selectedDate.daysInMonth();

    const days = [];

    // Calculate the first day of the week
    const startDayOfWeek = (firstDayOfMonth.day() - 1 + 7) % 7;

    for (let i = 0; i < startDayOfWeek; i++) {
      // Calculate the date for previous month's days
      const previousMonthDate = firstDayOfMonth
        .clone()
        .subtract(startDayOfWeek - i, 'days');
      days.push(
        <TouchableOpacity
          key={`empty-${i}`}
          style={[styles.dayCell, styles.previousMonthDayCell]}
          onPress={() => handleDayPress(previousMonthDate)}>
          <Text style={[styles.dayText, styles.previousMonthDayText]}>
            {previousMonthDate.date()}
          </Text>
        </TouchableOpacity>,
      );
    }

    // Define an array of colors for unselected days
    const unselectedDayColors = [
      CALENDER1,
      CALENDER2,
      CALENDER2,
      CALENDER3,
      CALENDER1,
    ];

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = firstDayOfMonth.clone().add(day - 1, 'days');
      const isDisabled = currentDate.isBefore(moment(), 'day');
      const isSelected = currentDate.isSame(moment(), 'day');
      const isDisabledAfter = currentDate.isAfter(moment(), 'day');

      const unselectedDayStyle = {
        backgroundColor:
          unselectedDayColors[(day - 1) % unselectedDayColors.length],
      };

      days.push(
        <TouchableOpacity
          key={`day-${day}`}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDayCell,
            isDisabledAfter && styles.disabledDayCell,
            !isSelected && !isDisabledAfter && unselectedDayStyle,
          ]}
          onPress={() => handleDayPress(currentDate)}
          // disabled={isDisabled}
          >
          <Text
            style={[
              styles.dayText,
              isSelected && styles.selectedDayText,
              isDisabledAfter && styles.disabledDayText,
            ]}>
            {day}
          </Text>
          {isSelected && <Text style={styles.textDot}>.</Text>}
        </TouchableOpacity>,
      );
    }

    // Calculate the upcoming dates
    const endDayOfWeek = (startDayOfWeek + daysInMonth) % 7;
    const upcomingDays = 7 - endDayOfWeek;

    for (let i = 0; i < upcomingDays; i++) {
      // Calculate the date for upcoming month's days
      const upcomingMonthDate = firstDayOfMonth
        .clone()
        .add(daysInMonth + i, 'days');
      days.push(
        <TouchableOpacity
          key={`upcoming-${i}`}
          style={[styles.dayCell, styles.upcomingMonthDayCell]}
          onPress={() => {
            handleDayPress(upcomingMonthDate);
          }}>
          <Text style={[styles.dayText, styles.upcomingMonthDayText]}>
            {upcomingMonthDate.date()}
          </Text>
        </TouchableOpacity>,
      );
    }
    return <View style={styles.daysContainer}>{days}</View>;
  };

  const handlePrevMonth = () => {
    setSelectedDate(selectedDate.clone().subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setSelectedDate(selectedDate.clone().add(1, 'month'));
  };

  const handleDayPress = date => {
    console.log('previous...............', date);
    navigation.navigate("CaseMoodTrackerActivity")

    
    // Handle day press event here
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCalendarDays()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: GlobalSize(10),
    borderWidth: 1,
    borderColor: BORDERCOLOR2,
    borderRadius: GlobalSize(8),
    flex: 0.9,
    paddingBottom: GlobalSize(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.07,
    paddingLeft: 2,
    paddingRight: 2,
  },
  headerText: {
    fontSize: fontSize(18),
    fontWeight: '500',
    color: TEXTCOLOR7,
  },
  daysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: GlobalSize(10),
  },
  dayText: {
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    color: TEXTCOLOR7,
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  dayCell: {
    width: '13%', // 7 days in a week
    height: '15.57%',
    borderRadius: GlobalSize(20),
    padding: GlobalSize(5),
    justifyContent: 'center',
    alignItems: 'center',
    margin: GlobalSize(2),
    flexDirection: 'row',
    opacity: 0.6636,
  },
  selectedDayCell: {
    backgroundColor: '#F2F4F7',
  },

  selectedDayText: {
    textAlign: 'center',
    left: GlobalSize(5),
  },
  disabledDayText: {
    color: 'gray',
    fontFamily: 'Inter-Regular',
  },
  textDot: {
    color: PRIMARYCOLOR,
    fontSize: fontSize(35),
    // left: GlobalSize(-8),
    // bottom: GlobalSize(2),
    alignSelf: 'center',
  },
});

export default Calendar;
