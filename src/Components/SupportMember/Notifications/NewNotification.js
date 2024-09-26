import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AnalogClock,
  GreyCalendar2,
  SquareMap,
  TransportMobility,
} from '../../../../assets';
import {
  BORDERCOLORW,
  EIGHTHCOLOR,
  NINETHCOLOR,
  PRIMARYCOLOR,
  PRIMARYLESSOPAQ,
  PUREWHITE,
  SECONDARYTEXTCOLOR3,
  SEVENTHCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR13,
  TEXTCOLOR2,
  TEXTCOLOR5,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../Constants/styles/styles';
import {moderateScale} from 'react-native-size-matters';
import useAcceptSupport from '../../../hooks/apihooks/useAcceptSupport';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useRejectSupport from '../../../hooks/apihooks/useRejectSupport';
import NotificationModal from '../Modal/NotificationModal';

const NewNotification = ({notification, day, navigation, loading}) => {
  let badgeText;

  const {
    address = '',
    approval_status = '',
    completion_status,
    created_at,
    functional_abilities = '',
    id,
    image = '',
    note = '',
    patient,
    patient_id,
    patient_name = '',
    rating,
    reason,
    reason_note,
    requested_datetime = '',
    requestor_name = '',
    requestor_role = '',
    response_datetime,
    scheduled_date,
    scheduled_time,
    service_opinion,
    support,
    support_id,
    support_member_id,
    support_name,
    updated_at,
    user,
    user_id,
    zipcode = '',
  } = notification;

  switch (approval_status) {
    case 2:
      badgeText = 'Rejected';
      break;
    case 0:
      badgeText = 'Accepted';
      break;
    default:
      badgeText = 'Rejected';
  }

  useEffect(() => {}, [notification]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [reject, setReject] = useState(false);
  const [reasonText, setReasonText] = useState(null);

  const [date, time] = requested_datetime
    ? requested_datetime.split(' ')
    : ['N/A', 'N/A'];

  const handleAccept = async () => {
    try {
      // const support_id = await AsyncStorage.getItem('Support_id'); // Await the Promise
      // const userId = await AsyncStorage.getItem('User_Id'); // Await the Promise

      console.log('support id ...', id);
      if (id) {
        const payload = {
          request_id: parseInt(id, 10), // Ensure this is a string
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

  useEffect(() => {
    const Sync = async () => {
      console.log('reduxxxxxxxxxxxxxxxxxx.', id);
    };
    Sync();
  }, []);

  const handleReject = async () => {
    try {
      // Retrieve the support ID and user ID if necessary
      // const support_id = await AsyncStorage.getItem('Support_id');
      // const userId = await AsyncStorage.getItem('User_Id');

      // Ensure that support_id is available
      if (!id) {
        console.error('Support ID is missing');
        return; // Stop execution if support_id is null or undefined
      }

      // Ensure that reasonText is provided
      if (!reasonText || reasonText.trim() === '') {
        console.error('Reason text is required');
        return; // Stop execution if reasonText is missing or empty
      }

      console.log('Reason text:', reasonText);

      // Construct the payload
      const payload = {
        request_id: parseInt(id, 10), // Ensure this is an integer
        approval_status: '1',
        reason: reasonText,
      };

      console.log('Request payload:', payload);

      // Send the request
      const response = await useRejectSupport(payload);
      console.log('Successfully rejected:', response);

      // Clear the reason text
      setReasonText(''); // Reset the input field, or use null if preferred

      // Navigate to Home
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error in handleReject:', error);
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
    <View
      style={[
        styles.mainContainer,
        Platform.OS === 'ios'
          ? DEFAULTSTYLES.iosShadow
          : DEFAULTSTYLES.androidShadow,
      ]}>
      <View style={styles.headerContainer}>
        {/* Header Left Container */}
        <View style={{justifyContent: 'space-between'}}>
          {/* Name of the person requested and their role */}
          <View>
            <Text style={styles.nameText}>{user?.name || 'Unknown'}</Text>
            <Text style={styles.roleText}>
              {requestor_role || 'Unknown Role'}
            </Text>
          </View>

          {/* Time & Date info */}
          <View style={styles.timestampContainer}>
            <GreyCalendar2 width={12} height={12} />
            <Text style={styles.timestamp}>
              {date}
              {', '}
            </Text>
            <AnalogClock width={12} height={12} />
            <Text style={styles.timestamp}>{time}</Text>
          </View>
        </View>
        {/* Header Right Container */}
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{
              marginRight: DEFAULTWIDTH * 0.01,
              marginBottom: DEFAULTHEIGHT * 0.005,
            }}>
            <SquareMap />
          </TouchableOpacity>
          <Text style={styles.placeText}>{address || 'No Address'}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SupportStack', {
            screen: 'SupportNotificationDetails',
            params: {
              navigationBack: navigation,
              notification: notification,
              day: day,
            },
          });
          // navigation.navigate('SupportNotificationDetails');
        }}
        style={{flexDirection: 'row'}}>
        {/* Icon and its Type of Request ADL/ IADL/ Medical Assitance/ Medical Treatment or Procedure */}

        <View style={styles.iconContainer}>
          {/* if the status is active, The badge won't be shown. */}

          <Image
            source={{uri: image}}
            style={{
              width: moderateScale(80),
              height: moderateScale(80),
            }}
          />
          {functional_abilities === 1 ? (
            <Text numberOfLines={1} style={styles.typeText}>
              ADL
            </Text>
          ) : (
            <Text numberOfLines={1} style={styles.typeText}>
              IADL
            </Text>
          )}
        </View>
        {/* Title and Description */}
        <View style={{marginLeft: DEFAULTWIDTH * 0.02}}>
          <Text style={styles.titleText}>{support?.support || 'No Title'}</Text>
          <Text numberOfLines={4} style={styles.descText}>
            {note || 'No Description'}
          </Text>
        </View>
      </TouchableOpacity>
      {/* Checking whether its the current day, Only then it will show the Accept Notification */}
      {day === 0 && (
        <>
          {/* This is to see whether the status is confirmed or not */}
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
        </>
      )}
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    marginHorizontal: DEFAULTWIDTH * 0.02,
    backgroundColor: PUREWHITE,
    padding: DEFAULTHEIGHT * 0.01,
    marginTop: DEFAULTHEIGHT * 0.02,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: DEFAULTHEIGHT * 0.009,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: BORDERCOLORW,
    marginBottom: DEFAULTHEIGHT * 0.015,
  },
  nameText: {
    color: TEXTCOLOR10,
    fontSize: 18,
    fontFamily: FONTS.FontSemiB,
  },
  roleText: {
    color: TEXTCOLOR5,
    fontSize: 10,
    fontFamily: FONTS.FontRegular,
  },
  timestampContainer: {
    flexDirection: 'row',
    marginLeft: DEFAULTWIDTH * 0.01,
    marginTop: DEFAULTHEIGHT * 0.005,
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 10,
    fontFamily: FONTS.FontRegular,
    color: SECONDARYTEXTCOLOR3,
    marginLeft: DEFAULTWIDTH * 0.01,
  },
  typeText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: 14,
    color: PUREWHITE,
  },
  iconContainer: {
    backgroundColor: PRIMARYLESSOPAQ,
    borderRadius: 15,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: FONTS.FontBold,
    color: PRIMARYCOLOR,
    fontSize: 16,
    marginBottom: DEFAULTHEIGHT * 0.005,
  },
  descText: {
    width: DEFAULTWIDTH * 0.6,
    fontFamily: FONTS.FontLight,
    fontSize: 14,
    color: TEXTCOLOR2,
  },
  placeText: {
    color: TEXTCOLOR13,
    fontSize: 14,
    fontFamily: FONTS.FontLight,
  },
  buttonStyle: {
    width: DEFAULTWIDTH * 0.3,
    alignItems: 'center',
    height: 35,
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: DEFAULTWIDTH * 0.01,
  },
  buttonLayout: {
    flexDirection: 'row',
    paddingVertical: DEFAULTHEIGHT * 0.01,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 8,
  },
  badgeText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: 12,
    color: PUREWHITE,
  },
  badgeContainer: status => ({
    position: 'absolute',
    zIndex: 11,
    top: 0,
    left: 0,
    padding: 5,
    backgroundColor: status === 'rejected' ? NINETHCOLOR : EIGHTHCOLOR,
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 20,
  }),
});

export default NewNotification;
