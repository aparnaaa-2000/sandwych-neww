import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  LeftArrow,
  OldPhone,
  SquareMap,
  TransportMobility,
  WhiteAnalogClock,
  WhiteCalendar,
} from '../../../../../assets';
import {
  BORDERCOLORW,
  EIGHTHCOLOR,
  NINETHCOLOR,
  PRIMARYLESSOPAQ,
  PUREWHITE,
  SEVENTHCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR11,
  TEXTCOLOR12,
  TEXTCOLOR14,
  TEXTCOLOR2,
  TEXTCOLOR8,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRejectSupport from '../../../../hooks/apihooks/useRejectSupport';
import useAcceptSupport from '../../../../hooks/apihooks/useAcceptSupport';
import NotificationModal from '../../../../Components/SupportMember/Modal/NotificationModal';

const NotificationDetails = ({route, navigation}) => {
  const {navigationBack, notification, day} = route.params;
  const [visibleModal, setVisibleModal] = useState(false);
  const [reject, setReject] = useState(false);
  const [reasonText, setReasonText] = useState(null);

  // Destructure notification properties
  const {
    address,
    approval_status,
    created_at,
    functional_abilities,
    patient,
    patient_name,
    note,
    requested_datetime,
    requestor_name,
    requestor_role,
    scheduled_date,
    scheduled_time,
    support,
    user,
  } = notification;

  // Define badge text based on approval status
  let badgeText;
  switch (approval_status) {
    case 'rejected':
      badgeText = 'Rejected';
      break;
    case 'accepted':
      badgeText = 'Accepted';
      break;
    default:
      badgeText = 'Pending';
  }

  // Format timestamp from created_at or requested_datetime
  const [date, time] = requested_datetime
    ? requested_datetime.split(' ')
    : [created_at.split('T')[0], created_at.split('T')[1].split('.')[0]];

  const placeName = address || 'Unknown Location';
  const notificationStatus = approval_status === 'active';

  // Open maps based on platform
  const handleOpenMaps = () => {
    const formattedPlaceName = encodeURIComponent(placeName);
    if (Platform.OS === 'ios') {
      Linking.openURL(`https://maps.apple.com/?q=${formattedPlaceName}`);
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${formattedPlaceName}`,
      );
    }
  };

  useEffect(() => {
    console.log('support notification...', notification);
  }, [notification]);

  const handleAccept = async () => {
    try {
      const support_id = await AsyncStorage.getItem('Support_id'); // Await the Promise
      const userId = await AsyncStorage.getItem('User_Id'); // Await the Promise
      console.log('support id ...', support_id);
      if (support_id) {
        const payload = {
          request_id: parseInt(support_id, 10), // Ensure this is a string
          approval_status: '0',
        };
        console.log('api request payload....', payload);
        const response = await useAcceptSupport(payload);

        console.log('successfully accepted...', response);
      } else {
        console.error('Support ID is null or undefined');
      }
    } catch (error) {
      console.log('error code accept...', error);
    }
  };

  const handleReject = async () => {
    const support_id = await AsyncStorage.getItem('Support_id'); // Await the Promise
    const userId = await AsyncStorage.getItem('User_Id'); // Await the Promise
    try {
      const payload = {
        request_id: parseInt(support_id, 10),
        approval_status: '1',
        reason: reasonText,
      };

      console.log('request is require', payload);
      const responce = await useRejectSupport(payload);
      console.log('successfully rejected...', responce);
    } catch (error) {
      console.log('error code...', error);
    }
  };

  const handleRejectCondition = async () => {
    try {
      if (visibleModal === false) {
        setVisibleModal(true);
      }
    } catch (error) {
      console.log('pop function error...');
    }
  };

  return (
    <SafeAreaView
      style={
        Platform.OS === 'android'
          ? DEFAULTSTYLES.AndroidSafeArea
          : styles.container
      }>
      <View style={styles.mainContainer}>
        {/* Header Row for the Page */}
        <View style={styles.headerRow}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigationBack.goBack()}
              style={styles.backConatiner}>
              <LeftArrow width={14} height={14} />
            </TouchableOpacity>
            {functional_abilities === 1 ? (
              <Text style={styles.headerText}>ADL</Text>
            ) : (
              <Text style={styles.headerText}>IADL</Text>
            )}
            <View>
              <Text>{''}</Text>
            </View>
          </View>
        </View>
        {/* Badge display based on approval status */}

        {/* Icon and timestamp */}
        <TransportMobility width={DEFAULTWIDTH} height={DEFAULTWIDTH} />
        <View style={styles.timeStampLayout}>
          <WhiteCalendar width={15} height={15} />
          <Text style={styles.timeStamp}>
            {scheduled_date}
            {', '}
          </Text>
          <WhiteAnalogClock width={15} height={15} />
          <Text style={styles.timeStamp}>{scheduled_time}</Text>
        </View>
      </View>

      <View
        style={[
          styles.middleContainer,
          Platform.OS === 'ios'
            ? DEFAULTSTYLES.iosShadow
            : DEFAULTSTYLES.androidShadow,
        ]}>
        {/* Left Container */}
        <View>
          <View style={{marginBottom: DEFAULTHEIGHT * 0.01}}>
            <Text style={styles.requestedName}>{requestor_name}</Text>
            <Text style={styles.requestedRole}>{requestor_role}</Text>
          </View>
          <View>
            <Text style={styles.placeText}>{address}</Text>
          </View>
        </View>

        {/* Right Container */}
        <View style={{flexDirection: 'row'}}>
          {!notificationStatus && (
            <TouchableOpacity>
              <OldPhone width={40} height={36} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={{marginLeft: 10}} onPress={handleOpenMaps}>
            <SquareMap width={36} height={36} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.middleContainer,
          Platform.OS === 'ios'
            ? DEFAULTSTYLES.iosShadow
            : DEFAULTSTYLES.androidShadow,
        ]}>
        {/* Info of the Request */}
        <View style={{padding: DEFAULTHEIGHT * 0.009}}>
          <Text style={styles.infoContainerHeading}>
            {support?.support || 'Unknown Support'}
          </Text>
          <View style={styles.lineHorizontal} />
          <Text style={styles.infoContainerDesc}>{note}</Text>
        </View>
      </View>

      {/* Button Setup */}
      <View style={styles.buttonLayout}>
        <TouchableOpacity
          onPress={handleAccept}
          style={[styles.buttonStyle, {backgroundColor: SEVENTHCOLOR}]}>
          <Text style={{color: PUREWHITE, fontFamily: FONTS.FontBold}}>
            ACCEPT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRejectCondition}
          style={[styles.buttonStyle, {backgroundColor: NINETHCOLOR}]}>
          <Text style={{color: PUREWHITE, fontFamily: FONTS.FontBold}}>
            REJECT
          </Text>
        </TouchableOpacity>
      </View>

      <NotificationModal
        ModalOpen={visibleModal}
        setModalOpen={setVisibleModal}
        handleReject={handleReject}
        reason_input={setReasonText}
      />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    width: DEFAULTWIDTH,
    height: DEFAULTWIDTH,
    backgroundColor: PRIMARYLESSOPAQ,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backConatiner: {
    backgroundColor: PUREWHITE,
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  headerRow: {position: 'absolute', top: 15, width: DEFAULTWIDTH},
  headerText: {
    fontSize: 18,
    color: PUREWHITE,
    fontFamily: FONTS.FontSemiB,
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DEFAULTHEIGHT * 0.009,
    backgroundColor: PUREWHITE,
    borderColor: BORDERCOLORW,
    margin: DEFAULTHEIGHT * 0.015,
  },
  requestedName: {
    fontFamily: FONTS.FontMedium,
    fontSize: 15,
    color: TEXTCOLOR8,
  },
  requestedRole: {
    fontFamily: FONTS.FontRegular,
    fontSize: 12,
    color: TEXTCOLOR14,
  },
  placeText: {
    color: TEXTCOLOR11,
    fontSize: 14,
    fontFamily: FONTS.FontLight,
  },
  infoContainerHeading: {
    fontSize: 20,
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR10,
  },
  infoContainerDesc: {
    fontFamily: FONTS.FontLight,
    fontSize: 16,
    color: TEXTCOLOR2,
  },
  lineHorizontal: {
    width: DEFAULTWIDTH * 0.85,
    alignSelf: 'center',
    height: 0.2,
    backgroundColor: TEXTCOLOR12,
    marginVertical: 5,
  },
  buttonStyle: {
    width: DEFAULTWIDTH * 0.45,
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: DEFAULTWIDTH * 0.01,
  },
  buttonLayout: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: DEFAULTHEIGHT * 0.04,
    alignSelf: 'center',
    zIndex: 99,
  },
  timeStampLayout: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeStamp: {
    fontSize: 14,
    fontFamily: FONTS.FontLight,
    color: PUREWHITE,
    marginLeft: 6,
  },
  badgeText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: 12,
    color: PUREWHITE,
  },
  badgeContainer: status => ({
    position: 'absolute',
    zIndex: 11,
    bottom: 0,
    right: 0,
    padding: 5,
    backgroundColor: status === 'rejected' ? NINETHCOLOR : EIGHTHCOLOR,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  }),
});

export default NotificationDetails;
