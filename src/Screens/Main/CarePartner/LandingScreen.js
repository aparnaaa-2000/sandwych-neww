import React,{useEffect} from 'react';
import {View, Text, StyleSheet, Platform,BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  BACKGROUNDWHITE,
  BOTTOMTABTEXT1,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR2,
} from '../../../Constants/Colors/Colors';
import {
  Chats2,
  ChatsHighlighted,
  Home,
  HomeHighlighted,
  IconFigure,
  Med,
  MedHighlighted,
  Tasks1,
  TasksHighlighted,
  Teams,
  TeamsHighlighted,
} from '../../../../assets';

import CareTeamScreen from './Vault/CareTeamScreen';
import TaskScreen from './Tasks/TaskScreen';
import MedScreen from './Meds/MedScreen';
import ChatScreen from '../../Chat/ChatScreen';

import HomeScreen from './HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUnreadMessage } from '../../../redux/thunk';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const Tab = createMaterialBottomTabNavigator();



const CustomTabBarOverlay = ({label, icon, isFocused,unreadCount}) => {

  const textColor = isFocused ? TEXTCOLOR2 : BOTTOMTABTEXT1;

  const renderImage = () => {
    switch (label) {
      case 'Careteam':
        return isFocused ? (
          <TeamsHighlighted width={26} height={26} />
        ) : (
          <Teams width={26} height={26} />
        );
        break;
      case 'Tasks':
        return isFocused ? (
          <TasksHighlighted width={26} height={26} />
        ) : (
          <Tasks1 width={26} height={26} />
        );
        break;
      case 'Home':
        return isFocused ? (
          <IconFigure width={26} height={26} />
        ) : (
          <Home width={26} height={26} />
        );
        break;
      case 'Med':
        return isFocused ? (
          <MedHighlighted width={26} height={26} />
        ) : (
          <Med width={26} height={26} />
        );
        break;
      case 'Chat':
        return isFocused ? (
          <ChatsHighlighted width={26} height={26} />
        ) : (
          <Chats2 width={26} height={26} />
        );
        break;
      // .. rest of the case
      default:
        return <Home width={26} height={26} />;
        break;
    }
  };

  return (
    <View style={{flex: 1, zIndex: 15}}>
      <View
        style={[
          styles.tabOverlay,
          //   {
          //     backgroundColor: overlayColor,
          //     borderWidth: borderWidth,
          //     position: 'absolute',
          //   },
          styles.tabOverlaySelected(isFocused),
        ]}></View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 999,
          marginTop: 2,
        }}>
        {/* <Text style={[styles.tabLabel,{color: textColor}]}>{label}</Text> */}
        {renderImage()}
        {label === 'Chat' && unreadCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const LandingScreen = ({navigation}) => {

  const dispatch = useDispatch()
  const { UnReadData,UnReadError,UnReadLoading } = useSelector(
    state => ({
   
        UnReadData: state.UnReadMessage.data,
        UnReadError: state.UnReadMessage.error,
        UnReadLoading: state.UnReadMessage.isLoading,
    }),
    shallowEqual
);


useEffect(() => { //FUNCTION FOR GETTING THE API DATA
    getData().then(data => {
        getUnreadMessage(data?.storedValue, dispatch)
    });

}, []);

console.log("chat.............................", UnReadData?.unread_count)
const getData = async () => {
    try {

        const storedValue = await AsyncStorage.getItem('TOKENAuth');
        const patientData = await AsyncStorage.getItem('PatientData');
        const carepartnerData = await AsyncStorage.getItem('UserData');
        return {
            storedValue: storedValue,
            patientData: patientData != null ? JSON.parse(patientData) : null,
            carepartnerData:carepartnerData != null ? JSON.parse(carepartnerData):null
        };
    } catch (e) {
        console.error('Error retrieving data:', e);
        return {
            patientData: null,
            storedValue: null,
            carepartnerData:null
        };
    }
};

  useEffect(() => {

    handleBackButtonPressAndroid()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, [navigation]);

  const handleBackButtonPressAndroid = () => {
    if (!navigation.isFocused()) {
0      // The screen is not focused, so don't do anything
      return false;
    }
    else {
      return true;
    }
  };
 
  return (
    <View style={styles.container}>
      <Tab.Navigator
        activeColor={PUREBLACK}
        inactiveColor="#aaa"
        barStyle={{
          height: '12%',
          width: '100%',
          borderWidth: 0.5,
          borderBottomWidth: 1,
          backgroundColor: PUREWHITE,
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          borderColor: 'transparent',
          tabBarPressOpacity: 0.1,
          overflow: 'hidden',
          // shadowColor: PUREBLACK,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 3.84,
          elevation: Platform == 'ios' ? -5 : 5,
        }}
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;
            let unreadCount = 0
            switch (route.name) {
              case 'Team':
                iconName = 'Team';
                break;
              case 'Tasks':
                iconName = 'Tasks';
                break;
              case 'Home':
                iconName = 'Home';
                break;
              case 'Med':
                iconName = 'Med';
                break;
              case 'Chat':
                iconName = 'Chat';
                unreadCount = UnReadData?.unread_count;
                break;
              // Add more icons for additional tabs
              default:
                iconName = 'Home';
                break;
            }
            return (
              <CustomTabBarOverlay
                label={route.name}
                icon={iconName}
                isFocused={focused}
                unreadCount={unreadCount}
              />
            );
          },
        })}>
        {/* Define your screens here */}
        <Tab.Screen name="Careteam" component={CareTeamScreen} />
        <Tab.Screen name="Tasks" component={TaskScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Med" component={MedScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUNDWHITE,
    flex: 1,
  },
  tabOverlay: {
    borderRadius: 8, // Adjust the value as needed for your desired roundness
    margin: -5,
    zIndex: 99,
    alignSelf: 'center',
    width: '200%',
    height: '200%',
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeContainer: {
    backgroundColor:PRIMARYCOLOR,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: GlobalSize(10),
    top:-20,
    alignItems: 'center',
    justifyContent: 'center',
    width:GlobalSize(20),
    height:GlobalSize(20),
    
  
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabOverlaySelected: isFocused => ({
    backgroundColor: isFocused ? PUREWHITE : 'transparent',
    // borderWidth: isFocused ? 1 : 0,
    position: 'absolute',
    // shadowColor: isFocused ? '#000' : '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: isFocused ? 0.27 : 0,
    shadowRadius: isFocused ? 2.65 : 0,

    elevation: isFocused ? 3 : 0,
  }),
});

export default LandingScreen;


