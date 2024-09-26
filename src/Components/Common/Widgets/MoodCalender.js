import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { BACKGROUNDWHITE, BORDERCOLOR1, CALENDER1, CALENDER2, CALENDER3, CALENDER4, CALENDER5, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR7 } from '../../../Constants/Colors/Colors';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GetMonthlyMood } from '../../../redux/thunk';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONTS } from '../../../Constants/Fonts';
import { ArrowB, ArrowF } from '../../../../assets';
import { ActivityIndicator } from 'react-native';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const CalendarTrack = ({navigation,data}) => {
    
    const dispatch = useDispatch()
    const [Token, setToken] = useState(null)
    const [date, setDate] = useState(new Date())
    const [UserData, setUserData] = useState([])
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(moment().year());
    const [Loading, setLoading] = useState(false)

    const { data1, error, isLoading } = useSelector(
        state => ({
            data1: state.getMonthPatientMood.data,
            error: state.getMonthPatientMood.error,
            isLoading: state.getMonthPatientMood.isLoading,
        }),
        shallowEqual
    );


    // useEffect(() => {
    //     console.log("Initial API call or Token change");
      
    //     let apiCalled = false;
      
    //     const fetchData = async () => {
    //       console.log("Monthly Mood API calling.................");
      
    //       const data = await getData();
    //       setUserData(data);
      
    //       if (!apiCalled) {
    //         apiCalled = true;
    //         GetMonthlyMood(
    //           data?.carepartners_patients[0]?.id,
    //           moment(date).format('M'),
    //           moment(date).format('YYYY'),
    //           Token,
    //           dispatch
    //         );
    //       }
    //     };
      
    //     fetchData();
      
    //     // Add event listener for focus event
    //     const focusListener = navigation.addListener('focus', fetchData);
      
    //     // Clean up event listener
    //     return () => {
    //       focusListener();
    //     };
    //   }, [Token, navigation]);
      
      

useEffect(() =>{
    getData().then((data) => {
        setUserData(data)
    })
})

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
  

    const LeftArrowApi = (currentMonth, currentYear) => {
        setLoading(true)
        console.log("left arrow passed................", currentMonth, currentYear)
        GetMonthlyMood(UserData?.patientData?.user_id,
            currentMonth,
            currentYear,
            Token,
            dispatch)
        setLoading(false)
    }

    // Function to convert patient moods data into marked dates format with different colors based on mood
    const convertToMarkedDates = (data) => {
        const markedDates = {};
        data?.forEach(mood => {
            const color = getColorForMood(mood.mood);
            markedDates[mood.date] = { marked: false, selectedColor: color, selected: true, selectedDayTextColor: PUREBLACK };
        });
        return markedDates;
    };


    // Function to get color based on mood
    const getColorForMood = (mood) => {
        switch (mood) {
            case '0':
                return CALENDER1;
            case '1':
                return CALENDER2;
            case '2':
                return CALENDER3;
            case '3':
                return CALENDER4;
            case '4':
                return CALENDER5
            default:
                return PUREWHITE;
        }
    };

    return (
        <View style={styles.calenderBorder}>
            <Calendar
    
                theme={{
                    textSectionTitleColor: '#b6c1cd',
                    calendarBackground: BACKGROUNDWHITE,
                    backgroundColor: BACKGROUNDWHITE,
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: PUREBLACK,
                    todayTextColor: TEXTCOLOR7,
                    dayTextColor: TEXTCOLOR7,
                    todayDotColor: 'red',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#2d4150',
                    selectedDotColor: '#2d4150',
                    arrowColor: '#344054',
                    disabledArrowColor: '#d9e1e8',
                    selectedDayTextColor: '#2d4150',
                    selectedDayBackgroundColor: '#ffffff',
                    monthTextColor: '#344054',
                    indicatorColor: '#344054',
                    textDayFontFamily: FONTS.FontMedium,
                    textMonthFontFamily: FONTS.FontMedium,
                    textDayHeaderFontFamily: FONTS.FontMedium,
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 14,
                    textMonthFontSize: 14,
                    textDayHeaderFontSize: 14,
                }}

                firstDay={1}
        
                onMonthChange={(month) => { LeftArrowApi(month.month, month.year), console.log("month.mon", month.month) }}
                markedDates={convertToMarkedDates(data)}
            />
        </View>
    );
};

export default CalendarTrack;

const styles = StyleSheet.create({
    calenderBorder: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        borderWidth: 1,
        borderColor: BORDERCOLOR1,
        borderRadius: GlobalSize(2),
        marginBottom:GlobalSize(70)
    }
})
