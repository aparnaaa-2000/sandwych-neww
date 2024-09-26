import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import HomeStack from '../../../Navigation/CarePartner/HomeStack';
import {BACKGROUNDWHITE} from '../../../Constants/Colors/Colors';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <HomeStack />
    </SafeAreaView>
  );
};

export default HomeScreen;
