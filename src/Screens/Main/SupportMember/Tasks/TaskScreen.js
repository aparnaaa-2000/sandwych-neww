import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {Calendar, CalendarUtils} from 'react-native-calendars';
import {
  BACKGROUNDCOLORGREYS,
  BACKGROUNDGREEN1,
  BORDERCOLOR1,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR13,
  TEXTCOLOR14,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import {Switch} from 'react-native-paper';
import {fontSize} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import Header from '../../../../Components/SupportMember/Home/Header';
import {GreyLocation, RoundGreenPhone} from '../../../../../assets';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import useTaskList from '../../../../hooks/apihooks/useTaskList';
import {moderateScale} from 'react-native-size-matters';
import useIcons from '../../../../hooks/ichooks/useIcons';
import {setTaskData} from '../../../../redux/actions';
import RNCalendarEvents from 'react-native-calendar-events';
import useCalendarPermission from '../../../../hooks/fnhooks/useCalendarPermission';
import { format } from 'date-fns'; // For date formatting

const {width} = Dimensions.get('window');

const DUMMYDATA = {
  date: '22-05-2024',
  data: [
    {
      time: '09:00 AM',
      title: 'Transportation',
      person: 'Andrew Smith',
      role: 'care partner',
      location: 'Austin, Texas',
    },
    {
      time: '12:00 PM',
      title: 'Eating',
      person: 'Betty Smith',
      role: 'Patient',
      location: 'Austin, Texas',
    },
    {
      time: '05:00 PM',
      title: 'Transportation',
      person: 'Andrew Smith',
      role: 'Care Partner',
      location: 'Austin, Texas',
    },
  ],
};

const TaskScreen = ({navigation}) => {
  const [selected, setSelected] = useState('');
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskerror, setTaskError] = useState(false);
  const NotDataImage = require('../../../../../assets/Images/no-data.png');
  const {data, error, isLoading} = useSelector(
    state => ({
      data: state.profilesupport.data,
      error: state.profilesupport.error,
      isLoading: state.profilesupport.isLoading,
    }),
    shallowEqual,
  );

  const getDate = count => {
    const date = new Date();
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = useCallback(day => {
    setSelected(day.dateString);
    console.log('selected date log...', day);
  }, []);

  const marked = useMemo(() => {
    return {
      [getDate(0)]: {
        dotColor: PRIMARYCOLOR,
        marked: true,
        textColor: PRIMARYCOLOR,
      },
      [selected]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: PRIMARYCOLOR,
        selectedTextColor: PUREWHITE,
        textDayFontFamily: FONTS.FontBold,
      },
    };
  }, [selected]);

  const onNavigateToDetail = item => {
    navigation.navigate('SupportTaskDetails', {data: item});
  };

  useEffect(() => {
    const GetTaskList = async () => {
      setLoading(false);
      try {
        const data = await useTaskList();
        console.log('all dateDatas:', data?.tasks);
        const filteredTasks = data.tasks.filter(
          task => task.scheduled_date === selected,
        );
        console.log('Filtered tasks:', filteredTasks);
        setLoading(true);
        setTaskList(filteredTasks);
      } catch (error) {
        console.log('error code:', error);
        setLoading(false);
        setTaskError(true);
      }
    };

    GetTaskList();
  }, [selected, taskList]);

  useCalendarPermission();

  const convertTo24HourFormat = time12h => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours, 10);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${minutes}:00`;
  };

  const onToggleSwitch = async () => {
    setIsSwitchOn(!isSwitchOn);

    if (!isSwitchOn) {
      const task = taskList[0];
      if (task) {
        console.log('listed all tasks....', task);

        try {
          // Convert 12-hour time to 24-hour time
          const startTime = convertTo24HourFormat(task.scheduled_time);
          const startDateTime = new Date(`${task.scheduled_date}T${startTime}`);
          const endDateTime = new Date(
            startDateTime.getTime() + 60 * 60 * 1000,
          ); // Assuming the event lasts for 1 hour

          const startDateStr = format(startDateTime, "yyyyMMdd'T'HHmmss'Z'");
          const endDateStr = format(endDateTime, "yyyyMMdd'T'HHmmss'Z'");

          // Construct Google Calendar URL
          const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
            task.support,
          )}&dates=${startDateStr}/${endDateStr}&details=${encodeURIComponent(
            task.note,
          )}&location=${encodeURIComponent(task.address)}`;

          // Open URL in the default browser, which will handle the calendar app
          Linking.openURL(googleCalendarUrl);
        } catch (error) {
          console.error('Error creating event:', error);
        }
      }
    }
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity
        onLongPress={() => {
          console.log('On long pressed');
        }}
        onPress={() => {
          onNavigateToDetail(item);
        }}
        style={{margin: DEFAULTWIDTH * 0.02}}>
        <View style={styles.renderItemRow}>
          <View style={styles.leftContainer}>
            <Text style={styles.timeText}>{item.scheduled_time}</Text>
          </View>

          <View style={styles.rightContainer}>
            <View style={styles.rightTopContainer}>
              <GreyLocation width={16} height={16} />
              <Text
                style={[styles.roleText, {marginLeft: DEFAULTWIDTH * 0.02}]}>
                {item.address}
              </Text>
            </View>

            <View style={styles.borderLine}></View>

            <View style={{margin: DEFAULTWIDTH * 0.04}}>
              <Text style={styles.titleText}>{item.support}</Text>
            </View>

            <View style={styles.rightBottomLayer}>
              <View>
                <Text style={styles.personText}>{item.requestedUser}</Text>
                <Text style={styles.roleText}>{item.requestedUserRole}</Text>
              </View>
              <RoundGreenPhone />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Header navigation={navigation} data={data} />
        <View style={styles.borederLine}></View>
        {/* <ScrollView> */}
        <Calendar
          style={styles.calendarStyle}
          onDayPress={onDayPress}
          markedDates={marked}
        />
        <View style={styles.borederLine}></View>
        {/* Switch Layer  */}
        <View style={styles.switchLayer}>
          <Text style={styles.syncText}>Sync to Calendar</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            trackColor={{true: BACKGROUNDGREEN1, false: BACKGROUNDCOLORGREYS}}
            style={styles.swtichStyle}
          />
        </View>

        {taskList.length > 0 ? (
          <View style={styles.flatListLayer}>
            <View style={styles.dateLayer}>
              <Text style={styles.dateText}>DATE - {selected}</Text>
            </View>
            <FlatList
              data={taskList}
              renderItem={renderItems}
              keyExtractor={item => item.id.toString()}
              style={styles.flatListStyle}
            />
          </View>
        ) : (
          <View style={styles.flatListLayer2}>
            <View style={styles.dateLayer2}>
              <Image style={styles.ImageNotFound} source={NotDataImage} />

              <Text style={styles.errorMessage}>
                No tasks available for the selected date.
              </Text>
            </View>
          </View>
        )}
        {/* </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  swtichStyle: {
    borderWidth: 0.3,
    borderColor: BACKGROUNDCOLORGREYS,
    borderRadius: 15,
  },

  borederLine: {
    width: DEFAULTWIDTH * 0.95,
    alignSelf: 'center',
    height: 0.5,
    backgroundColor: TEXTCOLOR14,
    marginTop: DEFAULTHEIGHT * 0.01,
  },

  switchLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: DEFAULTWIDTH * 0.04,
    marginVertical: DEFAULTHEIGHT * 0.01,
  },
  syncText: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR10,
  },

  flatListLayer: {
    flex: 1,
    backgroundColor: PRIMARYCOLOR,
    marginTop: DEFAULTHEIGHT * 0.01,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  flatListLayer2: {
    marginTop: DEFAULTHEIGHT * 0.01,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
    height: moderateScale(220),
  },
  dateText: {
    fontFamily: FONTS.FontSemiB,
    color: PUREWHITE,
    fontSize: fontSize(16),
  },
  dateText2: {
    fontFamily: FONTS.FontSemiB,
    color: PUREWHITE,
    fontSize: fontSize(16),
    marginLeft: moderateScale(20),
  },
  flatListStyle: {
    flex: 1,
    paddingTop: DEFAULTHEIGHT * 0.02,
  },
  dateLayer: {
    marginTop: DEFAULTHEIGHT * 0.03,
    marginLeft: DEFAULTWIDTH * 0.08,
  },

  dateLayer2: {
    marginTop: DEFAULTHEIGHT * 0.03,
  },

  // Flatlist Items
  renderItemRow: {
    flexDirection: 'row',
    width: DEFAULTWIDTH * 0.9,
    alignSelf: 'center',
    flex: 1,
  },
  leftContainer: {
    backgroundColor: PUREWHITE,
    marginRight: DEFAULTWIDTH * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flex: 0.25,
  },
  timeText: {
    fontFamily: FONTS.FontBold,
    fontSize: fontSize(14),
    color: TEXTCOLOR10,
  },
  rightContainer: {
    backgroundColor: PUREWHITE,
    flex: 0.75,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightTopContainer: {
    marginRight: DEFAULTWIDTH * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: DEFAULTWIDTH * 0.02,
  },
  titleText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(16),
    color: PRIMARYCOLOR,
  },
  rightBottomLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: DEFAULTWIDTH * 0.04,
    marginRight: DEFAULTWIDTH * 0.04,
    marginBottom: DEFAULTWIDTH * 0.04,
  },
  personText: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(12),
    color: TEXTCOLOR10,
  },
  roleText: {
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR13,
  },
  calendarStyle: {
    width: DEFAULTWIDTH,
  },
  errorMessage: {
    textAlign: 'center',
    marginTop: DEFAULTHEIGHT * 0.03,
    fontSize: fontSize(12),
    color: TEXTCOLOR13,
    fontFamily: FONTS.FontBold,
    alignSelf: 'center',
  },
  ImageNotFound: {
    width: moderateScale(90),
    height: moderateScale(90),
    alignSelf: 'center',
    marginTop: moderateScale(8),
  },
});

export default TaskScreen;
