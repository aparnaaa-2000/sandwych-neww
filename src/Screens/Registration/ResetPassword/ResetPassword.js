import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';

//COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR5,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREBLACK,
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
import {EyeClose1, EyeOpen1, RightWhite, ToolTip} from '../../../../assets';

// MODAL IMPORTED FROM COMPONENTS
import ToolTipModal from '../../../Components/Forms/Signup/TooltipModal';
import ValidationModal from '../../../Components/Forms/LoginScreen/ValidationModal';
import ErrorPopup from '../../../Components/ComingSoonPopup/ErrorPopup';
import SuccessPopup from '../../../Components/ComingSoonPopup/Successpopup';

//IMPORT PACKAGES
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//IMPORT REDUX RELATED COMPONENTS
import {ResetPassword} from '../../../redux/thunk';
import {resetClear} from '../../../redux/Slice/ResetPswKey';

const ResetPasswordScreen = ({navigation, route}) => {

  const dispatch = useDispatch();

  const [IsLoading, setIsLoading] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);
  const [isPasswordSecure2, setIsPasswordSecure2] = useState(true);
  const [ValidOpen, setValidOpen] = useState(false);
  const [Message, setMessage] = useState(null);
  const [ErrorModal, setErrorModal] = useState(false);
  const [SuccessModal, setSuccessModal] = useState(false);
  const [token, setToken] = useState(null);
  const [password1, setPassword1] = useState(null);
  const [password2, setPassword2] = useState(null);

  const {data, error, isLoading} = useSelector(
    state => ({
      data: state.reset.data,
      error: state.reset.error,
      isLoading: state.reset.isLoading,
    }),
    shallowEqual,
  );

  useEffect(() => {

    handleBackButtonPressAndroid()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, [navigation]);


  const handleBackButtonPressAndroid = () => { //FUNCTION FOR HANDLING THE BACK BUTTON OF DEVICE
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    else {
      return true;
    }
  };
  useEffect(() => {
    getItemFromAsyncStorage();
    ModalOpen_Redux();
  }, [error, data, token]);

  const ModalOpen_Redux = () => {
  
    // Check if error is defined and has a status of 400
    if (error) {
      setIsLoading(false);
      setMessage(error?.response?.data?.message);
      setErrorModal(true);

      setTimeout(() => {
        setErrorModal(false);
      }, 1500);
      dispatch(resetClear());
    } 
    else if (data && password1 !== null && password2 !== null) {
      setIsLoading(false);
      setSuccessModal(true);
    
      setMessage('Password generated successfully.');
      setTimeout(() => {
        setSuccessModal(false);
        navigation.navigate('SignIn');
        //     navigation.navigate('HipaaValidationForm')
      }, 1500);

      dispatch(resetClear());
    }
  };

  const getItemFromAsyncStorage = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      if (storedValue !== null) {
        setToken(storedValue);
      } else {
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  // FUNCTION FOR RESET PASSWORD
  const onResetPsw = () => {
    Keyboard.dismiss();

    if (password1 !== password2) {
      setValidOpen(true);
      setMessage('Password mismatch');
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
    } 
    else if (password1 == null || password2 == null) {
      setValidOpen(true);
      setMessage('Password is required');
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
    } 
    else {
      setIsLoading(true);
      ResetPassword( 
        password1,
        password2,
        route?.params?.email,
        token,
        dispatch,
      );
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View
              style={{marginLeft: DEFAULTWIDTH * 0.084, alignItems: 'center'}}>
              <Image
                source={require('../../../../assets/Images/NEWSIGNIN/Password.png')}
                style={{width: GlobalSize(500), height: GlobalSize(370)}}
                resizeMode="contain"
              />
            </View>

            <View style={styles.letsView}>
              <View>
                <Text style={styles.textWe}>Create Password</Text>
              </View>
              <View style={{marginTop: GlobalSize(5), left: GlobalSize(4)}}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  <ToolTip height={30} width={30} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginBottom: DEFAULTWIDTH * 0.02}}>
              <Text style={styles.textSIGNIN}>
                Generate your new credentials{' '}
              </Text>
            </View>
            <View style={DEFAULTSTYLES.alignView}>
              <View style={styles.viewTextInput}>
                <View style={styles.inputView}>
                  <TextInput
                    maxLength={10}
                    style={[
                      styles.inputArea,
                      {width: DEFAULTWIDTH * 0.6, left: GlobalSize(5)},
                    ]}
                    secureTextEntry={isPasswordSecure1}
                    placeholder="Enter your password"
                    value={password1}
                    onChangeText={text => setPassword1(text)}
                    placeholderTextColor={PLACEHOLDERCOLOR3}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.viewOne, {right: GlobalSize(-3)}]}
                  onPress={() => setIsPasswordSecure1(!isPasswordSecure1)}>
                  {!isPasswordSecure1 ? (
                    <EyeOpen1 width={width(20)} height={height(20)} />
                  ) : (
                    <EyeClose1 width={width(20)} height={height(20)} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={DEFAULTSTYLES.alignView}>
              <View style={styles.viewTextInput}>
                <View style={styles.inputView}>
                  <TextInput
                    maxLength={10}
                    style={[
                      styles.inputArea,
                      {width: DEFAULTWIDTH * 0.6, left: GlobalSize(5)},
                    ]}
                    secureTextEntry={isPasswordSecure2}
                    placeholder="Re-enter your password"
                    value={password2}
                    onChangeText={text => setPassword2(text)}
                    placeholderTextColor={PLACEHOLDERCOLOR3}
                  />
                </View>
                <TouchableOpacity
                  style={[styles.viewOne, {right: GlobalSize(-3)}]}
                  onPress={() => setIsPasswordSecure2(!isPasswordSecure2)}>
                  {!isPasswordSecure2 ? (
                    <EyeOpen1 width={width(20)} height={height(20)} />
                  ) : (
                    <EyeClose1 width={width(20)} height={height(20)} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.viewSend}>
              <TouchableOpacity>
                <View style={{marginTop: DEFAULTWIDTH * 0.05}}>
                  <Text style={styles.textSend}>Sign In</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onResetPsw()}>
                <View style={styles.viewRight}>
                  {!IsLoading ? (
                    <RightWhite />
                  ) : (
                    <ActivityIndicator size={20} color={BACKGROUNDWHITE} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <SuccessPopup
          Message={Message}
          ModalOpen={SuccessModal}
          setModalOpen={setSuccessModal}
        />

        <ValidationModal
          ModalOpen={ValidOpen}
          setModalOpen={setValidOpen}
          Message={Message}
        />

        <ErrorPopup
          Message={Message}
          ModalOpen={ErrorModal}
          setModalOpen={setErrorModal}
        />

        <ToolTipModal
          ModalOpen={ModalOpen}
          setModalOpen={setModalOpen}
          Title={'How should I create a new password?'}
          Desc={
            'It is always recommended to have a password which has alphabets, numbers and unique symbols like $,#,@,etc... Minimum 8 letters should be there.'
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    marginLeft: DEFAULTWIDTH * 0.07,
    marginRight: DEFAULTWIDTH * 0.07,
  },
  textWe: {
    fontSize: fontSize(25),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    left:-3
  },
  textSIGNIN: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: PRIMARYCOLOR,
  },
  viewTextInput: {
    borderWidth: 1,
    borderRadius: GlobalSize(28),
    width: DEFAULTWIDTH * 0.86,
    height: DEFAULTWIDTH * 0.16,
    borderColor: 'rgba(21, 31, 109, 0.25)',
    flexDirection: 'row',
    marginBottom: GlobalSize(10),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  viewOne: {
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(25),
    opacity: 5,
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
  inputView: {
    marginLeft: DEFAULTWIDTH * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSend: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(20),
    color: PRIMARYCOLOR,
  },
  viewRight: {
    backgroundColor: PRIMARYCOLOR,
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  viewSend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.17,
  },
  letsView: {
    marginBottom: DEFAULTWIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default ResetPasswordScreen;
