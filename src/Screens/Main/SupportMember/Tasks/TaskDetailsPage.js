import {
  Alert,
  Button,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  BACKGROUNDWHITE1,
  GREYICONBACKGROUND,
  PLACEHOLDERCOLOR1,
  PRIMARYCOLOR,
  PUREWHITE,
  SUBPRIMARY,
  TEXTCOLOR10,
  TEXTCOLOR12,
  TEXTCOLOR7,
  TEXTCOLORW,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import {
  BlueCall,
  BlueEmail,
  BlueLocation,
  CalendarBlack,
  ClockLine,
  Maps,
  OldPhone,
  PersonSpeak,
  TransportMobility,
  WhiteLeftArrow,
  Zipcode,
} from '../../../../../assets';
import {fontSize} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import TimerPopup from '../../../../Components/SupportMember/Timer/TimerPopup';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {setTaskData} from '../../../../redux/actions';
import {moderateScale} from 'react-native-size-matters';
import useStartTask from '../../../../hooks/apihooks/useStartTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFinish from '../../../../hooks/apihooks/useFinish';
import usePhoneCall from '../../../../hooks/call/usePhoneCall';
import useCall from '../../../../hooks/fnhooks/useCall';

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc mi lacus, iaculis nec arcu eget, consequat viverra est. Vivamus tempor congue nibh vitae varius. Aliquam vitae dolor facilisis, rutrum augue eget, malesuada diam. Etiam pellentesque, eros at convallis ullamcorper, tortor mauris accumsan orci, at dapibus augue elit sed nunc. Vestibulum facilisis turpis a risus faucibus, cursus fermentum ligula efficitur. Nam vehicula, est sit amet ultricies elementum, ex orci malesuada quam, vitae consectetur diam dolor sed eros. Nunc vitae odio in velit lobortis varius sed a neque. Proin ornare quis enim sit amet sollicitudin. In hac habitasse platea dictumst. Fusce convallis volutpat mi. Nullam congue odio sem, sed scelerisque elit varius ut.';

const TaskDetailsPage = ({navigation}) => {
  const {openDialer} = useCall();
  const route = useRoute();
  const {data} = route.params || {}; // Safely access data from route.params

  // Destructuring the data object
  const {
    address,
    approval_status,
    completion_status,
    created_at,
    id,
    note,
    patient_id,
    rating,
    reason,
    reason_note,
    rejection_reason,
    requestedUser,
    requestedUserCity,
    requestedUserEmail,
    requestedUserNumber,
    requestedUserRole,
    requested_datetime,
    response_datetime,
    scheduled_date,
    scheduled_time,
    service_opinion,
    support,
    support_id,
    support_member_id,
    updated_at,
    user_id,
    zipcode,
    requestedUserLanguages,
  } = data;

  const formattedLanguages = requestedUserLanguages
    ? requestedUserLanguages.join(', ')
    : '';

  useEffect(() => {
    console.log('data....passed....', data);
  }, []);

  const [taskStarted, setTaskStarted] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isConfirmModalVisisble, setIsConfirmModalVisible] = useState(false);
  const [isScheduledPopupVisible, setIsScheduledPopupVisible] = useState(false);

  // Example scheduled task start time - should be coming from the response.
  const scheduledTaskDateTime = new Date('2024-06-12T10:00:00');

  // Utility function to check if two dates match (down to the minute)
  const isTimeToStartTask = scheduledDateTime => {
    const now = new Date();
    return (
      scheduledDateTime.getFullYear() === now.getFullYear() &&
      scheduledDateTime.getMonth() === now.getMonth() &&
      scheduledDateTime.getDate() === now.getDate() &&
      scheduledDateTime.getHours() === now.getHours() &&
      scheduledDateTime.getMinutes() === now.getMinutes()
    );
  };

  const handleCompleteTask = async () => {
    const support_id = await AsyncStorage.getItem('Support_id');

    try {
      const data = {
        support_request_id: id,
      };
      const res = await useFinish(data);

      console.log('Task successfully finished:', res);
    } catch (error) {
      console.error('Error finishing task:', error);
    }
  };

  const completeTask = () => {
    setIsTimerVisible(false);
    setTaskCompleted(true);
    handleCompleteTask();
  };

  const confirmTask = () => {
    setIsTimerVisible(false);
    setTaskCompleted(true);
    setIsTimerVisible(true);
  };

  const startTask = () => {
    Alert.alert('Start Task', 'Are you ready to start the task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          setIsTimerVisible(true);
          setTaskStarted(true);
          handleStartTask();
        },
      },
    ]);
  };

  // You can log data to verify

  useEffect(() => {
    const TaskId = async () => {
      const support_id = await AsyncStorage.getItem('Support_id');
      console.log('support_task_id..........', support_id);
    };
    TaskId();
  }, []);

  const handleStartTask = async () => {
    const support_id = await AsyncStorage.getItem('Support_id');
    try {
      const data = {
        support_request_id: support_id,
      };
      console.log('support req_id...', data);
      const res = await useStartTask(data);
      console.log('successfully response...', res);
    } catch (error) {
      console.log('error code...', error);
    }
  };

  const handleCallPress = () => {
    console.log('phonenumber_calling', requestedUserNumber);
    openDialer(requestedUserNumber);
  };

  const startCall = () => {
    Alert.alert('Start Call', 'Are you ready to make the call?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          handleCallPress();
        },
      },
    ]);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerLayer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backArrow}>
            <View style={{marginLeft: -DEFAULTWIDTH * 0.01}}>
              <WhiteLeftArrow width={22} height={22} />
            </View>
          </TouchableOpacity>
          <TransportMobility
            height={DEFAULTWIDTH * 0.9}
            width={DEFAULTWIDTH * 0.9}
          />
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              top: DEFAULTHEIGHT * 0.08,
              right: DEFAULTWIDTH * 0.05,
              zIndex: 99,
            }}>
            <TouchableOpacity
              style={[
                styles.accessButtons,
                {marginRight: DEFAULTWIDTH * 0.02},
              ]}>
              <Maps width={24} height={24} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => startCall()}
              style={styles.accessButtons}>
              <OldPhone width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Middle Layer */}
        <View style={styles.scrollLayout}>
          <View
            style={[
              styles.timeLayer,
              Platform.OS == 'ios'
                ? DEFAULTSTYLES.iosShadow
                : DEFAULTSTYLES.androidShadow,
            ]}>
            <View style={styles.rowIconTextLayer}>
              <ClockLine width={22} height={22} />
              <Text
                style={{color: PLACEHOLDERCOLOR1, fontFamily: FONTS.FontSemiB}}>
                {'  '}
                {scheduled_time}
              </Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <CalendarBlack width={22} height={22} />
              <Text
                style={{color: PLACEHOLDERCOLOR1, fontFamily: FONTS.FontSemiB}}>
                {'  '}
                {scheduled_date}
              </Text>
            </View>
          </View>
          <Text style={styles.userName}>{requestedUser}</Text>
          <View
            style={[
              styles.middleLayerCard,
              Platform.OS == 'ios'
                ? DEFAULTSTYLES.iosShadow
                : DEFAULTSTYLES.androidShadow,
            ]}>
            <View style={styles.rowIconTextLayer}>
              <BlueCall width={20} height={20} />
              <Text style={styles.iconText}>{requestedUserNumber}</Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <BlueEmail width={20} height={20} />
              <Text style={styles.iconText}>{requestedUserEmail}</Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <BlueLocation width={20} height={20} />
              <Text style={styles.iconText}>{address}</Text>
            </View>
            <View style={styles.rowIconTextLayer}>
              <Zipcode width={20} height={20} />
              <Text style={styles.iconText}>{zipcode}</Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <PersonSpeak width={20} height={20} />
              <Text style={styles.iconText}>{formattedLanguages}</Text>
            </View>
          </View>

          {/*Middle Layer 2  */}
          <Text style={styles.titleText}>{support}</Text>

          <Text style={styles.descriptionText}>{note}</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.bottomLayer}>
        <TouchableOpacity
          disabled={taskStarted}
          onPress={startTask}
          style={[styles.buttonView, {backgroundColor: PRIMARYCOLOR}]}>
          <Text style={[styles.buttonText, {color: PUREWHITE}]}>
            {taskCompleted
              ? 'Task Completed'
              : taskStarted
              ? 'Task in Progress'
              : 'Start Task'}
          </Text>
        </TouchableOpacity>
      </View>

      <TimerPopup
        isVisible={isTimerVisible}
        onClose={() => setIsTimerVisible(false)}
        onComplete={completeTask}
        onConfirm={confirmTask}
      />
      <ConfirmCompletion
        isVisible={isConfirmModalVisisble}
        onClose={() => setIsConfirmModalVisible(false)}
      />
    </View>
  );
};

const ConfirmCompletion = ({isVisible, onClose}) => {
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View>
            <Text style={styles.titleText}>Confirm Completion</Text>
          </View>
          <View style={styles.borderLine} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = new StyleSheet.create({
  backArrow: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: PRIMARYCOLOR,
    position: 'absolute',
    top: DEFAULTHEIGHT * 0.08,
    left: DEFAULTWIDTH * 0.05,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessButtons: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Header
  mainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {fontSize: 18, fontFamily: FONTS.FontMedium, color: TEXTCOLOR10},
  headerLayer: {
    backgroundColor: SUBPRIMARY,
    height: DEFAULTHEIGHT * 0.4,
    alignItems: 'center',
  },

  //   Middle Layer
  scrollLayout: {
    backgroundColor: BACKGROUNDWHITE1,
    paddingVertical: DEFAULTHEIGHT * 0.02,
  },
  middleLayerCard: {
    backgroundColor: PUREWHITE,
    margin: DEFAULTWIDTH * 0.02,
    padding: DEFAULTWIDTH * 0.03,
    width: DEFAULTWIDTH * 0.95,
    borderRadius: 20,
  },
  userName: {
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    fontSize: fontSize(25),
    marginTop: DEFAULTHEIGHT * 0.02,
    marginLeft: DEFAULTWIDTH * 0.02,
  },
  timeLayer: {
    flexDirection: 'row',
    backgroundColor: GREYICONBACKGROUND,
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    paddingHorizontal: DEFAULTWIDTH * 0.02,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  rowIconTextLayer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  iconText: {
    color: TEXTCOLORW,
    fontFamily: FONTS.FontSemiB,
    marginLeft: DEFAULTWIDTH * 0.02,
  },
  titleText: {
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR7,
    fontSize: fontSize(25),
    margin: DEFAULTWIDTH * 0.02,
    marginLeft: 8,
  },
  descriptionText: {
    fontFamily: FONTS.FontLight,
    color: TEXTCOLOR7,
    fontSize: fontSize(16),
    marginHorizontal: DEFAULTWIDTH * 0.05,
    marginBottom: 100,
    marginTop: 8,
    marginRight: 20,
  },

  //   Bottom Tab
  bottomLayer: {
    flexDirection: 'row',
    backgroundColor: SUBPRIMARY,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: DEFAULTHEIGHT * 0.1,
    width: DEFAULTWIDTH,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonView: {
    width: DEFAULTWIDTH * 0.8,
    marginBottom: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {fontFamily: FONTS.FontSemiB, fontSize: fontSize(14)},

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: PUREWHITE,
    paddingVertical: DEFAULTHEIGHT * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
  },

  titleText: {
    fontFamily: FONTS.FontBold,
    color: PRIMARYCOLOR,
    fontSize: fontSize(22),
    marginLeft: 10,
  },
  borderLine: {
    width: '100%',
    height: 0.3,
    backgroundColor: TEXTCOLOR12,
    marginVertical: DEFAULTHEIGHT * 0.02,
  },
});

export default TaskDetailsPage;
