import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {BellFilledColor} from '../../../../assets';
import {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {FONTS} from '../../../Constants/Fonts';
import {NINETHCOLOR, PUREWHITE} from '../../../Constants/Colors/Colors';
import useNavigations from '../../../hooks/navigationhooks/useNavigations';
import {useNotificationContext} from '../../../Context/NotificationContext';
import useNotification from '../../../hooks/fnhooks/useNotifications';

const Header = () => {
  const {NotificationNav} = useNavigations();
  const {status, setStatus} = useNotificationContext();
   const {notifications} = useNotification();


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Notifications</Text>
      <TouchableOpacity onPress={() => NotificationNav()} style={{}}>
        <BellFilledColor width={30} height={30} />
        {status === 'success' ? (
          <View style={styles.notificationNoOverlay}>
            <Text style={styles.notificationNo}>2</Text>
          </View>
        ) : null}
        <View></View>
      </TouchableOpacity>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.04,
    alignItems: 'center',
  },
  heading: {fontFamily: FONTS.FontBlack, fontSize: 22, color: '#969595'},
  notificationNo: {
    color: PUREWHITE,
    fontSize: 10,
    fontFamily: FONTS.FontSemiB,
  },
  notificationNoOverlay: {
    position: 'absolute',
    backgroundColor: NINETHCOLOR,
    right: 1,
    borderRadius: 20,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;