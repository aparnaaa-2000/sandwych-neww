import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

//IMPORT CONSTANTS
import { BACKGROUNDWHITE,PRIMARYCOLOR } from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import {RightWhite, ToolTip} from '../../../../assets';
import ToolTipModal from '../../../Components/Forms/Signup/TooltipModal';
import OtpInput from '../../../Components/Forms/NewOTPComponent/OTPinput';
import ErrorPopup from '../../../Components/ComingSoonPopup/ErrorPopup';
import OTPSuccessModal from '../../../Components/Forms/Signup/OTPSuccessModal';
import ValidationModal from '../../../Components/Forms/LoginScreen/ValidationModal';
import {OtpClear} from '../../../redux/Slice/OTPSliceKey';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../Constants/styles/styles';

//IMPORT PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//IMPORT REDUX COMPONENTS
import {OtpResendClear} from '../../../redux/Slice/ResendOtpEmail';
import { ResendVerifyOtp,VerifyOtpRegister } from '../../../redux/thunk';

const SignUpVerification = ({navigation, route}) => {

  const dispatch = useDispatch();
  const [ValidOpen, setValidOpen] = useState(false);
  const [OtpSuccess, setOtpSucess] = useState(false);
  const [OtpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const [isRunning, setIsRunning] = useState(true);
  const [TimerStart, setTimerStart] = useState(true);
  const [token, setToken] = useState(null);
  const [Message, setMessage] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const [ErrorModal, setErrorModal] = useState(false);
  const [Email, setEmail] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  const {data, error, isLoading, error2} = useSelector(
    state => ({
      data: state.otp.data,
      error: state.otp.error,
      isLoading: state.otp.isLoading,
      error2: state.ResendOTPESignup.error,
    }),
    shallowEqual,
  );

  useEffect(() => {
    getItemFromAsyncStorage(); //FUNCTION FOR GETTING THE ASYNC DATA
    ModalOpen_Redux(); 
  }, [error, data, error2]);

  const getItemFromAsyncStorage = async () => { //FUNCTION FOR GETTING THE ASYNC DATA
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const storedValue2 = await AsyncStorage.getItem('EMAIL');

      if (storedValue !== null) {
        // Handle the retrieved value
        setToken(storedValue);
        setEmail(storedValue2);
        console.log('Retrieved value:', storedValue);
      } else {
        // Key does not exist in AsyncStorage
        console.log('Key does not exist in AsyncStorage');
      }
    } catch (error) {
      // Handle errors that may occur during AsyncStorage operations
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const ModalOpen_Redux = () => { //FUNCTION FOR GETTING THE API RESPONSE
    // Check if error is defined and has a status of 400
    if (error) {
      setIsLoading(false);
      setMessage(error?.data?.message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 1500);
      dispatch(OtpClear());
      setTimerStart(false);
      setIsRunning(false);
    
    } 
    else if (data && OtpCode.every(element => element !== '')) {
      setOtpSucess(true);
      setIsLoading(false);
    } 
    else if (error2 && error2?.status == 400) {
      setTimerStart(false);
      setIsRunning(false);
      setSeconds(0);
    
      setMessage(error2?.data?.message);
      setErrorModal(true);
      setTimeout(() => {
        setErrorModal(false);
      }, 2000);
      dispatch(OtpResendClear());
    }
  };

  useEffect(() => {
    //HANDLE THE TIMER
    let intervalId;

    if (isRunning && seconds > 0) {
      // Start the timer
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // Stop the timer when it reaches 0

      setIsRunning(false);
      setTimerStart(false);
    }

    // Cleanup: Clear the interval when the component is unmounted or when the timer is stopped
    return () => clearInterval(intervalId);
  }, [isRunning, seconds]);

  const onOTPSend = () => {
    // TO COMBINE THE OTP INTO A STRING AND VERIFYING THE OTP
    
    const joinedString = OtpCode?.join('');
    if (joinedString.length !== 6) {
      setMessage('Please enter a valid OTP');
      setValidOpen(true);
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
    } else {
      setIsLoading(true);
      const joinedString = OtpCode?.join('');
      setOtpCode(OtpCode);

      VerifyOtpRegister(joinedString, route?.params.email, dispatch);
    }
  };

  const ResendOtp = () => {
    //TO CALL THE RESEND API AND START THE TIMERS
    setTimerStart(true);
    setIsRunning(true);
    setSeconds(30);
    ResendVerifyOtp(route?.params?.email, dispatch);
  };

  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../../../assets/Images/NEWSIGNIN/reset.png')}
              style={styles.imgBackground}
              resizeMode="contain"
            />
          </View>

          <View style={styles.letsView}>
            <View>
              <Text style={styles.textWe}>OTP</Text>
            </View>
            <View style={styles.toolView}>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <ToolTip height={30} width={30} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={DEFAULTSTYLES.alignView}>
            <View style={styles.viewTextInput}>
              <OtpInput otp={OtpCode} setOtp={setOtpCode} />
            </View>
          </View>

          <View style={styles.viewSend}>
            <View style={{marginTop: DEFAULTWIDTH * 0.04}}>
              <Text style={styles.textSend}>Continue</Text>
            </View>

            <TouchableOpacity onPress={() => onOTPSend()}>
              <View style={styles.viewRight}>
                {!IsLoading ? (
                  <RightWhite />
                ) : (
                  <ActivityIndicator size={20} color={BACKGROUNDWHITE} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.postView}>
            {!TimerStart ? (
              <TouchableOpacity
                style={{padding: GlobalSize(5)}}
                onPress={() => ResendOtp()}>
                <Text style={styles.textIn}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.resendView}>
                <Text style={styles.textC}>
                  <Text style={[styles.textC, {fontFamily: FONTS.FontRegular}]}>
                    Resend OTP in{' '}
                  </Text>
                  00:{seconds < 10 ? '0' + seconds : seconds}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={{padding: GlobalSize(5)}}>
              <View>
                <Text style={styles.textIn}>Sign In</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* AFTER CALLING THE API,TO SHOW THE ERROR MESSAGE */}
      <ErrorPopup
        Message={Message}
        ModalOpen={ErrorModal}
        setModalOpen={setErrorModal}
      />

      <ValidationModal
        ModalOpen={ValidOpen}
        setModalOpen={setValidOpen}
        Message={Message}
      />

      {/* AFTER CALLING THE API TO SHOW THE SUCCESS MODAL */}
      <OTPSuccessModal
        ModalOpen={OtpSuccess}
        setModalOpen={setOtpSucess}
        navigation={() => navigation.navigate('UserSelect')}
      />

      <ToolTipModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        Title={'Why OTP is required for sign up process?'}
        Desc={
          'Your 6 digit OTP which has been send to your email or phone is required. This helps us to identify that you own this phone number or email address'
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: DEFAULTWIDTH * 0.06,
    backgroundColor: BACKGROUNDWHITE,
  },
  textWe: {
    fontSize: fontSize(25),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
  },
  letsView: {
    marginBottom: DEFAULTWIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewTextInput: {
    borderWidth: 1,
    borderRadius: GlobalSize(28),
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.16,
    borderColor: PRIMARYCOLOR,
    opacity: 0.45,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground: {
    width: width(350),
    height: height(330),
  },
  toolView: {
    marginTop: GlobalSize(10),
    left: GlobalSize(4),
  },
  postView: {
    position: 'absolute',
    bottom: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resendView: {
    padding: GlobalSize(5),
    marginTop: GlobalSize(5),
  },
  textSend: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(20),
    color: PRIMARYCOLOR,
  },
  textC: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontMedium,
    color: PRIMARYCOLOR,
  },
  viewRight: {
    backgroundColor: PRIMARYCOLOR,
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(5),
  },
  viewSend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTWIDTH * 0.34,
    alignItems: 'center',
  },
  textIn: {
    fontSize: fontSize(20),
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontRegular,
    textDecorationLine: 'underline',
  },
});
export default SignUpVerification;
