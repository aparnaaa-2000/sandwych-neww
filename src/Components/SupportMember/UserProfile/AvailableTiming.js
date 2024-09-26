import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Switch} from 'react-native-paper';
import {
  BACKGROUNDCOLORGREYS,
  BACKGROUNDCOLORLIGHTBLUE,
  BACKGROUNDGREEN1,
  MEDSITEMCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLOR8,
} from '../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../Constants/Fonts';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import useAddShedule from '../../../hooks/apihooks/useAddShedule';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SuccessPopup from '../../ComingSoonPopup/Successpopup';
import {format, addDays, startOfWeek} from 'date-fns';
import useDays from '../../../hooks/apihooks/useDays';
const AvailableTiming = ({
  AvailableStatus,
  ChangeAvailablityStatus,
  changeModalVisiblity,
  modalVisiblityValue,
  changeAllDayOn,
  allDayOn,
  WEEKDAYS = [], // Default to an empty array if undefined
  selectWeekday,
  setSelectedWeekdays,
  timeValue,
  modalSecVisible,
  modalSecVisibleStatus,
  timeSecValue,
  selectedSchedule,
}) => {
  const onToggleSwitch = () => ChangeAvailablityStatus(!AvailableStatus);

  const onModalVisiblity = () => changeModalVisiblity(!modalVisiblityValue);
  const onModalSecVisible = () => modalSecVisible(!modalSecVisibleStatus);

  const onToggleAllDay = () => changeAllDayOn(!allDayOn);

  const {data} = useDays();

  const [dayIds, setDayIds] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [allDaysSelected, setAllDaysSelected] = useState(false);

  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');

  console.log('Current Date:', formattedDate);

  useEffect(() => {
    console.log('formatted date...', formattedDate);
  }, []);

  const toggleDay = day => {
    console.log('SELECTED:', day?.id);
    const isSelected = selectWeekday.includes(day?.day);

    // Update day IDs
    setDayIds(prevIds => {
      if (isSelected) {
        console.log('PREV....', prevIds);
        return prevIds.filter(id => id !== day?.id);
      } else {
        return [...prevIds, day?.id];
      }
    });

    // Update selected weekdays
    setSelectedWeekdays(
      isSelected
        ? selectWeekday.filter(d => d !== day?.day)
        : [...selectWeekday, day?.day],
    );
  };

  const toggleAllDays = () => {
    if (allDaysSelected) {
      // Deselect all days
      setDayIds([]);
      setSelectedWeekdays([]);
    } else {
      // Select all days
      setDayIds(WEEKDAYS.map(day => day.id));
      setSelectedWeekdays(WEEKDAYS.map(day => day.day));
    }
    setAllDaysSelected(!allDaysSelected);
  };

  const handleSchedule = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('User_Id');

      // Validate dayIds
      if (!dayIds || dayIds.length === 0) {
        console.warn('No days selected. Please select at least one day.');

        Alert.alert(
          'No Days Selected',
          'Please select at least one day.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );

        return;
      }

      // Validate userId
      if (!userId) {
        console.warn('User ID is missing.');
        return;
      }

      // Get the current week's start date
      const startDateOfWeek = startOfWeek(new Date(), {weekStartsOn: 1}); // Assuming the week starts on Monday

      // Map selected days to corresponding dates
      const schedules = dayIds.map(dayId => {
        const day = WEEKDAYS.find(weekday => weekday.id === dayId).day;
        const dayIndex = WEEKDAYS.findIndex(weekday => weekday.id === dayId);

        // Calculate the date for the selected day in the current week
        const dateForSelectedDay = addDays(startDateOfWeek, dayIndex);
        const formattedDateForSelectedDay = format(
          dateForSelectedDay,
          'yyyy-MM-dd',
        );

        return {
          user_id: userId,
          day_id: dayId,
          date: formattedDateForSelectedDay,
          from_time: timeValue != null ? timeValue : '09:00 AM', // Default if timeValue is null
          to_time: timeSecValue != null ? timeSecValue : '12:00 PM', // Default if timeSecValue is null
        };
      });

      // Construct the data object
      const data = {
        schedules: schedules, // Match the structure expected by the API
      };
      console.log('Scheduled data:', data);
      // Send the request to the API
      const response = await useAddShedule(data);
      setLoading(false);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 1000);
      console.log('Response from API:', response.data);
    } catch (error) {
      setLoading(false);
      console.error('Error handling schedule:', error);
    }
  };

  console.log('SHOOOOOOOOOOOOOOOOOOOOOOOOOO', data);

  return (
    <View
      style={[
        styles.cardAbout,
        Platform.OS === 'android'
          ? DEFAULTSTYLES.androidShadow
          : DEFAULTSTYLES.iosShadow,
      ]}>
      <View style={styles.rowLayout}>
        <Text style={styles.textTitle}>User Active Status</Text>
        <View style={styles.switchButtonLayout}>
          <Switch
            value={AvailableStatus}
            onValueChange={onToggleSwitch}
            trackColor={{true: BACKGROUNDGREEN1, false: BACKGROUNDCOLORGREYS}}
            style={styles.swtichStyle}
            color={PUREWHITE}
          />
        </View>
      </View>

      <View style={styles.timingLayout}>
        <TouchableOpacity onPress={onModalVisiblity}>
          {timeValue != null ? (
            <Text style={styles.textSubTitle}>{timeValue}</Text>
          ) : (
            <Text style={styles.textSubTitle}>08:00 AM</Text>
          )}
        </TouchableOpacity>
        <View style={styles.toLayout}>
          <Text style={styles.textBetween}>TO</Text>
        </View>
        <TouchableOpacity onPress={onModalSecVisible}>
          {timeSecValue != null ? (
            <Text style={styles.textSubTitle}>{timeSecValue}</Text>
          ) : (
            <Text style={styles.textSubTitle}>08:00 AM</Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: PUREWHITE,
          width: '100%',
          height: 0.5,
          marginBottom: DEFAULTHEIGHT * 0.02,
        }}
      />

      <View style={styles.rowLayout}>
        <Text style={styles.textTitle}>All Days</Text>
        <View style={styles.switchButtonLayout}>
          <Switch
            value={allDaysSelected}
            onValueChange={toggleAllDays}
            trackColor={{true: BACKGROUNDGREEN1, false: BACKGROUNDCOLORGREYS}}
            style={styles.swtichStyle}
            color={PUREWHITE}
          />
        </View>
      </View>

      <View
        style={{flexDirection: 'row', marginVertical: DEFAULTHEIGHT * 0.02}}>
        {WEEKDAYS.length > 0 ? (
          WEEKDAYS.map(weekday => (
            <TouchableOpacity
              key={weekday.day}
              onPress={() => toggleDay(weekday)}
              style={styles.weekdaysStyle(selectWeekday.includes(weekday.day))}>
              <Text
                style={styles.dayTextStyle(
                  selectWeekday.includes(weekday.day),
                )}>
                {weekday.day}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.textSubTitle}>No weekdays available</Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => handleSchedule()}
        style={styles.SubmitButtonStyle}>
        {loading === true ? (
          <ActivityIndicator size={moderateScale(24)} color={'#000'} />
        ) : (
          <Text style={styles.SubmitText}>Submit</Text>
        )}
      </TouchableOpacity>

      <SuccessPopup
        Message={'Successfully sheduled task'}
        ModalOpen={openModal}
        setModalOpen={setOpenModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardAbout: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.9,
    borderRadius: GlobalSize(15),
    padding: GlobalSize(15),
    marginHorizontal: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
  SubmitButtonStyle: {
    width: '100%',
    height: moderateScale(45),
    backgroundColor: '#fff',
    alignSelf: 'center',
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  SubmitText: {
    color: '#000',
    fontSize: moderateScale(14),
    fontWeight: '400',
  },
  textTitle: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: PUREWHITE,
  },
  textSubTitle: {
    fontSize: fontSize(20),
    fontFamily: FONTS.FontLight,
    color: PUREWHITE,
  },
  switchButtonLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toLayout: {
    backgroundColor: PUREWHITE,
    width: 35,
    height: 35,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: DEFAULTWIDTH * 0.05,
  },
  timingLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: DEFAULTHEIGHT * 0.02,
    alignItems: 'center',
  },
  swtichStyle: {
    borderWidth: 0.3,
    borderColor: BACKGROUNDCOLORGREYS,
    borderRadius: 15,
  },
  textBetween: {
    color: TEXTCOLOR7,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontBold,
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekdaysStyle: isSelected => ({
    height: DEFAULTHEIGHT * 0.05,
    backgroundColor: isSelected ? BACKGROUNDCOLORLIGHTBLUE : MEDSITEMCOLOR2,
    justifyContent: 'center',
    marginRight: DEFAULTWIDTH * 0.02,
    width: DEFAULTWIDTH * 0.1,
    alignItems: 'center',
    borderRadius: 4,
  }),
  dayTextStyle: isSelected => ({
    color: isSelected ? TEXTCOLOR8 : PUREWHITE,
    fontSize: fontSize(13),
    fontFamily: isSelected ? FONTS.FontSemiB : FONTS.FontLight,
  }),
});

export default AvailableTiming;
