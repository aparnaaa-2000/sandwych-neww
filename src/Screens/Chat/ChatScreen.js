import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StatusBar, SafeAreaView, Text } from 'react-native';

//IMPORT COMPONENTS
import ChatHeader from '../../Components/Common/Headers/ChatHeader';
import List from '../../Components/Chat/ChatList/List';
import GroupList from '../../Components/Chat/ChatList/GroupList';

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../Constants/Colors/Colors';
import { FONTS } from '../../Constants/Fonts';
import { fontSize, GlobalSize } from '../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT THIRD-PARTY PACKAGES
import { useIsFocused } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUnreadMessage } from '../../redux/thunk';

const Tab = createMaterialTopTabNavigator();

const ChatScreen = ({ navigation }) => {
  const isFocused = useIsFocused();  
  const dispatch = useDispatch();

  const { UnReadData, UnReadError, UnReadLoading } = useSelector(
    state => ({
      UnReadData: state.UnReadMessage.data,
      UnReadError: state.UnReadMessage.error,
      UnReadLoading: state.UnReadMessage.isLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    //FUNCTION FOR GETTING THE API DATA
    getData().then(data => {
      getUnreadMessage(data?.storedValue, dispatch);
    });
  }, []);

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      return {
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        patientData: null,
        storedValue: null,
        carepartnerData: null
      };
    }
  };

  const UnreadBadge = ({ count }) => {
    if (count > 0) {
      return (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={{ backgroundColor: PRIMARYCOLOR, flex: 1 }}>
      {isFocused &&
        <StatusBar
          backgroundColor={PRIMARYCOLOR}
          style={{ flex: 0 }}
          barStyle={'light-content'} />}
      
      <View style={styles.Container}>
        <ChatHeader navigation={navigation} />
        
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: PRIMARYCOLOR,
            labelStyle: {
              fontSize: fontSize(14),
              textTransform: 'capitalize',
              fontFamily: FONTS.FontMedium,
              fontWeight: '500',
            },
            style: {
              backgroundColor: BACKGROUNDWHITE,
            },
            indicatorStyle: { backgroundColor: PRIMARYCOLOR },
          }}
        >
          <Tab.Screen 
            name="Chat" 
            component={List} 
            options={{
              tabBarLabel: ({ color }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color }}>Chat</Text>
                  <UnreadBadge count={UnReadData?.unread_individual_count} />
                </View>
              ),
            }} 
          />
          <Tab.Screen 
            name="Group" 
            component={GroupList} 
            options={{
              tabBarLabel: ({ color }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ color }}>Group</Text>
                  <UnreadBadge count={UnReadData?.unread_count} />
                </View>
              ),
            }} 
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
  },
  badgeContainer: {
    backgroundColor:PRIMARYCOLOR,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
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
});

export default ChatScreen;
