import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Platform, BackHandler} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import {
  BACKGROUNDWHITE,
  BOTTOMTABTEXT1,
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
  LogoSmall,
  Med,
  MedHighlighted,
  NotificationIcon,
  Tasks1,
  TasksHighlighted,
  Teams,
  TeamsHighlighted,
} from '../../../../assets';
import WorkerDashboard from './SocialWorkerDashboard/WorkerDashboard';
import TaskDashboard from './Tasks/TaskDashboard';
import MedMain from './Medication/MedMain';
import CareTeamScreen from './CareTeam/Careteam';

const Tab = createMaterialBottomTabNavigator();

const CustomTabBarOverlay = ({label, icon, isFocused}) => {
  const textColor = isFocused ? TEXTCOLOR2 : BOTTOMTABTEXT1;

  const renderIcons = () => {
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
          styles.tabOverlaySelected(isFocused),
        ]}></View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 999,
          marginTop: 2,
        }}>
        {renderIcons()}
      </View>
    </View>
  );
};

const CaseManagerLanding = ({navigation}) => {
  useEffect(() => {
    handleBackButtonPressAndroid();
    BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonPressAndroid,
    );

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonPressAndroid,
      );
    };
  }, [navigation]);

  const handleBackButtonPressAndroid = () => {
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    } else {
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
              />
            );
          },
        })}>
        {/* <Tab.Screen name="Careteam" component={CareTeamScreen} />
        <Tab.Screen name="Task" component={TaskDashboard} />
        <Tab.Screen name="Home" component={WorkerDashboard} />
        <Tab.Screen name="Meds" component={MedMain} /> */}

        {/* Define your screens here */}
        <Tab.Screen name="Careteam" component={CareTeamScreen} />
        <Tab.Screen name="Tasks" component={TaskDashboard} />

        <Tab.Screen name="Home" component={WorkerDashboard} />
        <Tab.Screen name="Med" component={MedMain} />
        <Tab.Screen name="Chat" component={() => <></>} />
        {/* Define your screens above */}
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
  tabOverlaySelected: isFocused => ({
    backgroundColor: isFocused ? PUREWHITE : 'transparent',
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: isFocused ? 0.27 : 0,
    shadowRadius: isFocused ? 2.65 : 0,

    elevation: isFocused ? 3 : 0,
  }),
});

export default CaseManagerLanding;
