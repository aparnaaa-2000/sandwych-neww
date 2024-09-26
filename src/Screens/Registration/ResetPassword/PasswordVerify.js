import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

//COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR5,
  FOURTHCOLOR,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR14,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//SVG ICONS
import {RightWhite, ToolTip} from '../../../../assets';

//REDUX
import {verifyEmailReset, verifyPhoneReset} from '../../../redux/thunk';
import {verifyRClear} from '../../../redux/Slice/VerifyRstEmail';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';

//IMPORTED MODAL FROM COMPONENTS
import ValidationModal from '../../../Components/Forms/LoginScreen/ValidationModal';
import ToolTipModal from '../../../Components/Forms/Signup/TooltipModal';
import ErrorPopup from '../../../Components/ComingSoonPopup/ErrorPopup';
import SuccessPopup from '../../../Components/ComingSoonPopup/Successpopup';


const PasswordVerify = ({navigation}) => {

  const dispatch = useDispatch();

  const [mobileView, setMobileView] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [ValidOpen, setValidOpen] = useState(false);
  const [Message, setMessage] = useState(false);
  const [Email, setEmail] = useState(null);
  const [SuccessModal, setSuccessModal] = useState(false);
  const [ErrorModal, setErrorModal] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [MobileNum, setMobileNum] = useState(null);

  const {data, error, isLoading} = useSelector(
    state => ({
      data: state.verifyEmailReset.data,
      error: state.verifyEmailReset.error,
      isLoading: state.verifyEmailReset.isLoading,
    }),
    shallowEqual,
  );

  useEffect(() => {
    ModalOpen_Redux();
  }, [error, data]);

  const ModalOpen_Redux = () => {
    // Check if error is defined and has a status of 400
    if (!mobileView) {
      if (error && Email !== null) {
        setMessage(error?.data?.message);
        setErrorModal(true);
        setIsLoading(false);
        setEmail(null);

        setTimeout(() => {
          setErrorModal(false);
        }, 1500);

        dispatch(verifyRClear());
      } else if (data) {
        setMessage(
          'Verification code generated successfully. Please check your email',
        );
        setSuccessModal(true);
        setIsLoading(false);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('OTPVerification', {email: Email});
        }, 2000);

        dispatch(verifyRClear());
      }
    } else {
      if (error && MobileNum !== null) {
        setMessage(error?.data?.message);
        setErrorModal(true);
        setIsLoading(false);
        setMobileNum(null);

        setTimeout(() => {
          setErrorModal(false);
        }, 1500);

        dispatch(verifyRClear());
      } else if (data) {
        setMessage(
          'Verification code generated successfully. Please check your email',
        );
        setSuccessModal(true);
        setIsLoading(false);
        setTimeout(() => {
          setSuccessModal(false);
          navigation.navigate('OTPVerification', {email: MobileNum});
        }, 2000);

        dispatch(verifyRClear());
      }
    }
  };

  const ValidateValues = () => {
    if (!mobileView) {
      VerifyEmail_reset();
    } else {
      VerifyPhone_reset();
    }
  };

  // VALIDATING EMAIL ADDRESS
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(Email)) {
      setValidOpen(true);
      setMessage('Email is required');
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
      return false;
    }
    //  navigation.navigate('OTPVerification', { email: Email })
    return true;
  };

  const validatePhone = () => {
    const isValidPhoneNumber = /^\d{10}$/.test(
      MobileNum?.replace(/[^\d]/g, ''),
    );

    if (!isValidPhoneNumber) {
      setValidOpen(true);
      setMessage('Phone number is required');
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
      return false;
    }
 
    return true;
  };

  // FUNCTION FOR VALIDATING EMAIL AND CALLING THE API
  const VerifyEmail_reset = () => {
    if (validateEmail()) {
      setIsLoading(true);
      Keyboard.dismiss();
      setEmail(Email.toLowerCase());
      verifyEmailReset(Email, dispatch);
    }
  };

  // FUNCTION FOR VALIDATING PHONE AND CALLING THE API
  const VerifyPhone_reset = () => {
    if (validatePhone()) {
      setIsLoading(true);
      Keyboard.dismiss();
      verifyPhoneReset(MobileNum, dispatch);
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View
              style={{marginLeft: DEFAULTWIDTH * 0.06, alignItems: 'center'}}>
              <Image
                source={require('../../../../assets/Images/NEWSIGNIN/Verify.png')}
                style={{width: width(420), height: height(350)}}
                resizeMode="contain"
              />
            </View>

            <View style={styles.letsView}>
              <View>
                <Text style={styles.textWe}>Verify it’s you</Text>
              </View>
              <View style={{marginTop: 10, left: 4}}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  <ToolTip height={30} width={30} />
                </TouchableOpacity>
              </View>
            </View>

            {/* <View style={{marginBottom: DEFAULTWIDTH * 0.02}}>
              {mobileView ? (
                <Text style={styles.textSIGNIN}>
                  Sign up using phone number
                </Text>
              ) : (
                <Text style={styles.textSIGNIN}>Sign up using E-mail</Text>
              )}
            </View> */}

            <View style={DEFAULTSTYLES.alignView}>
              <View style={styles.viewTextInput}>
                <View style={styles.viewOne}>
                  {mobileView ? (
                    <Text style={styles.textOne}>1+</Text>
                  ) : (
                    <Text style={styles.textOne}>@</Text>
                  )}
                </View>

                <View style={styles.viewTextIn}>
                  {mobileView ? (
                    <TextInput
                      keyboardType="number-pad"
                      maxLength={10}
                      style={styles.inputArea}
                      value={MobileNum}
                      onChangeText={text => setMobileNum(text)}
                      placeholder="Enter phone number"
                      placeholderTextColor={PLACEHOLDERCOLOR3}
                    />
                  ) : (
                    <TextInput
                      maxLength={30}
                      value={Email}
                      keyboardType={'email-address'}
                      onChangeText={text => setEmail(text)}
                      style={[styles.inputArea, {width: DEFAULTWIDTH * 0.65}]}
                      placeholder="Enter your email address"
                      placeholderTextColor={PLACEHOLDERCOLOR3}
                    />
                  )}
                </View>
              </View>
            </View>


            {/* <View style={styles.viewSend}>
              <View>
                <Text style={styles.textSend}>Send</Text>
                <Text style={styles.textSend}>Verification Code</Text>
              </View>

              <TouchableOpacity onPress={() => ValidateValues()}>
                <View style={styles.viewRight}>
                  {!IsLoading ? (
                    <RightWhite />
                  ) : (
                    <ActivityIndicator size={20} color={BACKGROUNDWHITE} />
                  )}
                </View>
              </TouchableOpacity>
            </View> */}

          <View style={DEFAULTSTYLES.alignView}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => ValidateValues()}>
                <Text style={styles.buttonText}>Send Verification Code</Text>
                {IsLoading &&
                  <ActivityIndicator size={20} color={BACKGROUNDWHITE} />}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.viewSign}
              onPress={() => setMobileView(!mobileView)}>
              {mobileView ? (
                <Text style={styles.textSignin}>or reset using email</Text>
              ) : (
                <Text style={styles.textSignin}>or reset using phone</Text>
              )}
            </TouchableOpacity>

  
          </View>
        </ScrollView>


        <ValidationModal
          Message={Message}
          ModalOpen={ValidOpen}
          setModalOpen={setValidOpen}
        />

        <SuccessPopup
          Message={Message}
          ModalOpen={SuccessModal}
          setModalOpen={setSuccessModal}
        />

        <ErrorPopup
          Message={Message}
          ModalOpen={ErrorModal}
          setModalOpen={setErrorModal}
        />

        <ToolTipModal
          ModalOpen={ModalOpen}
          setModalOpen={setModalOpen}
          Title={'What should you verify?'}
          Desc={
            'It is required to verify your email or phone number which your account is registered with. '
          }
        />
      </KeyboardAvoidingView>


      <View style={{marginRight:GlobalSize(15),marginTop:GlobalSize(35)}}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <View style={[styles.viewSign,{bottom:Platform.OS == 'android' ? 20 :10}]}>
                <Text style={styles.textIn}>Sign In</Text>
              </View>
            </TouchableOpacity>
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.05,
  },
  textWe: {
    fontSize: fontSize(25),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
  },
  textSIGNIN: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontRegular,
    color: PRIMARYCOLOR,
  },
  viewTextInput: {
    borderWidth: 1,
    borderRadius: GlobalSize(28),
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.16,
    borderColor: PRIMARYCOLOR,
    opacity: 0.45,
    flexDirection: 'row',
    marginBottom: GlobalSize(5),
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: GlobalSize(10),
    borderRadius: 5,
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.88,
    padding: GlobalSize(5),
    height: GlobalSize(48),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: GlobalSize(10)
  },
  buttonText: {
    color: PUREWHITE,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontSemiB,
    marginRight: GlobalSize(5)

  },
  textOne: {
    fontSize: fontSize(15),
    color: FOURTHCOLOR,
    fontFamily: FONTS.FontSemiB,
  },
  viewOne: {
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDERCOLOR5,
    marginLeft: GlobalSize(3.5),
  },
  inputArea: {
    fontSize: fontSize(15),
    fontFamily: FONTS.FontRegular,
    color: PUREBLACK,
    width: DEFAULTWIDTH * 0.5,
  },
  viewTextIn: {
    marginLeft: DEFAULTWIDTH * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSignin: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR14,
    textDecorationLine: 'underline',
  },
  viewSign: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: GlobalSize(10),
  },
  textSend: {
    fontFamily: FONTS.FontSemiB,
    fontSize: GlobalSize(20),
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
    marginTop: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.17,
  },
  textIn: {
    fontSize: fontSize(20),
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontRegular,
    textDecorationLine: 'underline',
  },
  letsView: {
    marginBottom: DEFAULTWIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default PasswordVerify;
