import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';

//IMPORT CONSTANTS
import { BellIcon, BlueHome, BlueMenu, LogoSmall } from '../../../../assets';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import {
  FOURTHCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { GlobalSize, height, width, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

//IMPORT REDUX THUNK API
import { GetNotificationList } from '../../../redux/Thunk/NotificationThunk';


export default function DashboardHeader({ navigation,Home }) {

  const Message = 'test message'
  const [UserType, setUserType] = useState(null)
  const [carepartnerData,setCarepartnerData] = useState(null)

  const dispatch = useDispatch();

  const { data, error, isLoading } = useSelector(
      state => ({
          data: state.NotificationList.data,
          error: state.NotificationList.error,
          isLoading: state.NotificationList.isLoading,
      }),
      shallowEqual
  )


  // Assume you want to get an item with the key 'exampleKey'
  const getItemFromAsyncStorage = async () => {
    try {
      // Use AsyncStorage.getItem() to retrieve the value associated with the key
      const storedValue = await AsyncStorage.getItem('UserType');
      const Token = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');

      return {
          storedValue: storedValue,
          Token : Token,
          patientData: patientData != null ? JSON.parse(patientData) : null,
          carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
      };
    
    } catch (error) {

    }
  };

  useEffect(() => {
    getItemFromAsyncStorage().then(data => {
      setUserType(data?.storedValue)
  
      getInititals(data?.carepartnerData?.name)
        GetNotificationList(  //LISTING THE  NOTIFICATIONS
            data?.carepartnerData?.id,
            data?.patientData?.patient_id, 
            Message,
            data?.Token,
            dispatch)
    });

}, []);

  const navigateToProfile = () => { //FUNCTION FOR NAVIGATION TO THE USER PROFILES
  
    switch (UserType) {
      case 'carepartner':
        navigation.navigate('MenuStack', {screen: 'CarePartnerProfile'});
        break;
      case 'CaseManager':
        navigation.navigate('HomeStack', {screen: 'CMProfile'})
        break;
      case 'patient':
        navigation.navigate('MenuStack', { screen: 'Journey' })
        break;
      default:
        null
    }
  }

  const getInititals = (name) =>{ //CONVERT THE FULL NAME AS INITITAL FORMAT
    const Name =  name?.split(' ')?.map(word => word[0])?.join('');  
    setCarepartnerData(Name)
  }


  return (
    <View>
      <View style={styles.flexView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Open Side Menu Bar from Here */}
          <TouchableOpacity
            style={{ marginRight: DEFAULTWIDTH * 0.02 }}
            onPress={() => navigation.openDrawer()}>
            <BlueMenu height={height(22)} width={width(22)} />
          </TouchableOpacity>

          <View>
            <LogoSmall />
          </View>
        </View>

        <View>

        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        {Home &&
          <TouchableOpacity onPress={()=>navigation.navigate('LandingScreen')}>
            <BlueHome />
          </TouchableOpacity>}

          {/* Notificationn is settuped here */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MenuStack', { screen: 'NotificationList' })}
            style={[styles.touchView,{marginRight:data?.unread_count>0 ? 0: GlobalSize(14) }]}>
            <BellIcon />

            {data?.unread_count>0 &&
            <View style={styles.iconNum}>
              {/* Here mention the no of notifications mentioned for the user */}
              <Text style={styles.textNum}>{data?.unread_count}</Text>
            </View> }
          </TouchableOpacity>

          {/* Profile Icon is shown which navigates to the Profile page of the User */}

          <TouchableOpacity
            style={styles.viewCard}
            onPress={() => navigateToProfile()}>
            {/* Use the users First Letter */}
            <Text style={styles.textLetter}>{carepartnerData}</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DEFAULTHEIGHT * 0.02,
    marginLeft: GlobalSize(8),
    marginRight: GlobalSize(8),
  },
  viewRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEFAULTHEIGHT * 0.04,
    marginRight: GlobalSize(4),
  },
  iconNum: {
    backgroundColor: FOURTHCOLOR,
    width: GlobalSize(16),
    height: GlobalSize(16),
    borderRadius: GlobalSize(8),
    left: GlobalSize(-8),
    top: GlobalSize(-5),
    borderColor: PUREWHITE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNum: {
    fontSize: fontSize(9),
    color: PUREWHITE,
    fontFamily: FONTS.FontSemiB,
  },
  viewCard: {
    width: GlobalSize(30),
    height: GlobalSize(30),
    borderRadius: GlobalSize(15),
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLetter: {
    color: PUREWHITE,
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(13),
  },
  touchView:{
     marginLeft: DEFAULTWIDTH * 0.04,
      flexDirection: 'row',
      alignItems:'center'
    }
});
