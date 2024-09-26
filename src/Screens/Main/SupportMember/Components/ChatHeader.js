import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';

export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.FontStyle}>Chats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(60),
    backgroundColor: '#151F6D',
    justifyContent: 'center',
    paddingLeft: moderateScale(15),
    // Apply top margin for iOS only
    marginTop: Platform.OS === 'ios' ? moderateScale(20) : 0,
  },
  FontStyle: {
    fontSize: moderateScale(26),
    fontWeight: '400',
    color: '#fff'
  },
});
