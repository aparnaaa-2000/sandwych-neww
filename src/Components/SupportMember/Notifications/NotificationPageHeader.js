import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import useIcons from '../../../hooks/iconhooks/useIcons';
import {TouchableOpacity} from 'react-native';
import useNavigations from '../../../hooks/navigationhooks/useNavigations';

export default function NotificationPageHeader() {
  const {BackArrow} = useIcons();
  const {BackNavigation} = useNavigations();
  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <TouchableOpacity
          onPress={() => BackNavigation()}
          style={styles.BottonContainer}>
          <BackArrow width={moderateScale(30)} height={moderateScale(30)} />
        </TouchableOpacity>

        <View style={styles.NotificationTextbox}>
          <Text style={styles.TextStyle}>Notification</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: moderateScale(50),
  },
  HeaderContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  BottonContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  NotificationTextbox: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
  },
  TextStyle: {
    fontSize: moderateScale(20),
    color: '#000',
  },
});
