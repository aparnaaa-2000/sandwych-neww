import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

//IMPORT CONSTANTS
import {
  CARDCOLOR,
  LINECOLOR1,
  PUREWHITE,
  TEXTCOLOR2,
  TEXTCOLOR5,
  TEXTCOLOR7,
} from '../../../Constants/Colors/Colors';
import { TDESC1, TDESC2, TODAY } from '../../../Constants/Texts';
import {
  DarkGreenFace,
  GreenFace,
  OrangeFace,
  RedFace,
  TimeGrey,
  YellowFace,
} from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { GetWeeklyMood } from '../../../redux/thunk';

//IMPORT PACKAGES
import { Card } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const WeeklyMood = ({ navigation }) => {

  const dispatch = useDispatch();
  const [Token, setToken] = useState(null);
  const [weekDates, setWeekDates] = useState([]);
  const [UserData, setUserData] = useState(null);

  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.getWeekMood.data,
      error: state.getWeekMood.error,
      isLoading: state.getWeekMood.isLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUserData(data);

      if (data?.patientData?.user_id) { //AP FOR GETTING THE WEEKLY MOOD
        GetWeeklyMood(data.patientData?.user_id, Token, dispatch);
      }
      getWeekDates();
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => {
      unsubscribe();
    };
  }, [Token, navigation]);

  const getWeekDates = () => { //FUNCTION FOR GETTING THE WEEK
    const currentDate = moment();
    const startOfWeek = currentDate.clone().startOf('week');
    const endOfWeek = currentDate.clone().endOf('week');

    const dates = [];
    let currentDatePointer = startOfWeek.clone();

    while (currentDatePointer.isSameOrBefore(endOfWeek)) {
      dates.push(currentDatePointer.format('YYYY-MM-DD'));
      currentDatePointer.add(1, 'day');
    }

    setWeekDates(dates);
  };

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      setToken(storedValue);
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');

      return {
        storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        carepartnerData: null
      };
    }
  };

  const moveToCalendar = () => {
    navigation.navigate('MoodCalendar', { MODDVALUE: false, MOOD: null });
  };

  const combinedData = weekDates.map(date => {
    const moodData = data?.patient_moods?.find(mood => mood.date === date);
    return { date, moodData };
  });

  const renderImage = (mood) => {
    switch (mood) {
      case '0':
        return <DarkGreenFace width={26} height={26} />;
      case '1':
        return <GreenFace width={26} height={26} />;
      case '2':
        return <YellowFace width={26} height={26} />;
      case '3':
        return <OrangeFace width={26} height={26} />;
      case '4':
        return <RedFace width={26} height={26} />;
      default:
        return <TimeGrey width={26} height={26} />;
    }
  };

  return (
    <View>
      <View style={{ marginTop: GlobalSize(2), marginHorizontal: GlobalSize(10) }}>
        <View style={{ marginLeft: 10, marginBottom: 5 }}>
          <Text style={styles.headingText}>{TODAY}</Text>
          <Text style={{ flexDirection: 'row' }}>
            <Text style={styles.descText}>{TDESC1}</Text>
            <Text style={styles.headingText}>4 hours </Text>
            <Text style={styles.descText}>{TDESC2}</Text>
          </Text>
        </View>
      </View>

      <Card style={styles.cardStyle}>
        <TouchableOpacity
          style={styles.topLayer}
          onPress={() => moveToCalendar()}>
          <View>
            <Text style={{ color: TEXTCOLOR2 }}>{UserData?.patientData?.name} 's Mood this Week</Text>
          </View>

          <View style={styles.singleWeekStyle}>
            {combinedData.map((item, index) => (
              <View style={styles.weekStyle} key={index}>
                <Text style={styles.weekText}>{moment(item.date).format('ddd').toUpperCase()}</Text>
                {renderImage(item.moodData?.mood)}
              </View>
            ))}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => moveToCalendar()}
          style={styles.transparentLayer}></TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  lineBoder: {
    backgroundColor: LINECOLOR1,
    height: GlobalSize(1),
    margin: GlobalSize(10)
  },
  headingText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  descText: {
    color: TEXTCOLOR5,
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(14),
  },
  cardStyle: {
    backgroundColor: CARDCOLOR,
    height: GlobalSize(150),
    margin: GlobalSize(10),
    padding: GlobalSize(16),
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.05
  },
  topLayer: {
    height: GlobalSize(120),
    width: "100%",
    borderRadius: GlobalSize(12),
    borderColor: '#fff',
    borderWidth: 0.5,
    position: 'absolute',
    padding: GlobalSize(10),
  },
  transparentLayer: {
    height: GlobalSize(120),
    backgroundColor: '#fff',
    opacity: 0.3,
    borderRadius: GlobalSize(12),
  },
  weekStyle: {
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(6),
    width: GlobalSize(38),
    paddingBottom: GlobalSize(5),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  singleWeekStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: GlobalSize(10)
  },
  weekText: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(13),
    color: TEXTCOLOR2,
    marginTop: GlobalSize(5),
  },
});

export default WeeklyMood;
