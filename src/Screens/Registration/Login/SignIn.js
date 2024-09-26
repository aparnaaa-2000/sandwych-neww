import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';

// COLORS IMPORTED GLOBALLY
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

import { FONTS } from '../../../Constants/Fonts';

//SVG ICONS
import {
  EyeClose1,
  EyeOpen1,
  RightWhite,
  ToolTip,
} from '../../../../assets';

// REDUX LOGIN
import { LoginEmail, postLoginDetails } from '../../../redux/thunk';
import { loginClear } from '../../../redux/Slice/LoginSliceKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfileSupport } from '../../../redux/supportthunk';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//MODAL IMPORTED FROM COMPONENTS
import ToolTipModal from '../../../Components/Forms/Signup/TooltipModal';
import SuccessPopup from '../../../Components/ComingSoonPopup/Successpopup';
import ValidationModal from '../../../Components/Forms/LoginScreen/ValidationModal';
import { useFocusEffect } from '@react-navigation/native';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const [Message, setMessage] = useState(null);
  const [mobileView, setMobileView] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const [SuccessModal, setSuccessModal] = useState(false);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [ValidOpen, setValidOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [MobileNum, setMobileNum] = useState(null);

  const [isFirstLaunchSupport, setIsFirstLaunchSupport] = useState(null);

  const [isFirstLaunchCarePartner, setIsFirstLaunchCarePartner] =
    useState(null);
  const [isFirstLaunchCaseManager, setIsFirstLaunchCaseManager] =
    useState(null);

  const [userID, setUserID] = useState(null);

  const phoneErrorMsg = 'Sorry, your phone number or password is incorrect.';
  const emailErrorMsg =
    'Sorry, your email or password is incorrect. Please try again.';


  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.login.data,
      error: state.login.error,
      isLoading: state.login.isLoading,
    }),
    shallowEqual,
  );

  const handleBackButtonPressAndroid = () => {
    const routes = navigation.getState()?.routes;
    const previousRoute = routes[routes.length - 2]?.name; // Get the previous route name
console.log("prvious route.................",previousRoute)
    if (previousRoute === 'MenuStack') {
      // If the previous screen is "Settings", show an alert and prevent going back
    
      BackHandler.exitApp()
      return true // Return true to prevent default back behavior
    }

    // Otherwise, allow the default back behavior (go back to the previous screen)
    return false;
  };

  // Attach the back handler only when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
      };
    }, [navigation])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Your refresh logic goes here
      setEmail(null)
      setMobileNum(null)
      setPassword(null)
      console.log('Home screen focused. Refresh!');
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    checkFirstLaunch();
    checkFirstLaunchCarePartner()
    getItemFromAsyncStorage();
    ModalOpen_Redux();
  }, [data, error]);

  //FUNCTION FOR UPDATING THE DATA WHEN CALLING THE API
  const ModalOpen_Redux = () => {

    if (!mobileView) {

      if (error && email && password !== null) {
        console.log('Seems there is an error',error);
        setValidOpen(true);
        setMessage(emailErrorMsg);

        setTimeout(() => {
          setValidOpen(false);
          setEmail(null);
          setPassword(null);
          setIsLoading(false);
        }, 1500);
        dispatch(loginClear());
      } else if (data && email && password !== null) {
        const jsonValue = JSON.stringify(data?.user);

        // console.log('User id is ' + userID);
        // =================================
        // LOGIN AS A USER TYPE for the Email
        // =================================

        const tokenData = data.token;
        // Support Member
        if (data.user.role_id == '10') {
          console.log('Login to Support Member' + tokenData);
          onLoginAsSupportMember(tokenData);
        }
        // Care Partner
        else if (data.user.role_id == '7') {
          console.log('Login to CarePartner');
          carepartnerEmailLogin(jsonValue);
        }
        // Patient
        else if (data.user.role_id == '6') {
          console.log('Login to Patient');
          PatientEmailLogin(jsonValue);
        }
        // Case Manager
        else if (data.user.role_id == '5') {
          console.log('Login to Case Manager');
        }

        dispatch(loginClear());
      }
    } else {
      if (error && MobileNum && password !== null) {
        setValidOpen(true);
        setMessage(phoneErrorMsg);

        setTimeout(() => {
          setValidOpen(false);
          setMobileNum(null);
          setPassword(null);
          Keyboard.dismiss();
          setIsLoading(false);
        }, 1500);
        dispatch(loginClear());
      } else if (data && MobileNum && password !== null) {
        const jsonValue = JSON.stringify(data?.user);

        // =================================
        // LOGIN AS A USER TYPE for the Mobile
        // =================================

        // Support Member
        if (data.user.role_id == '10') {
          onLoginAsSupportMember();
        }
        // Care Partner
        else if (data.user.role_id == '7') {
          carepartnerPhoneLogin(jsonValue);
        }
        // Patient
        else if (data.user.role_id == '6') {
        }
        // Case Manager
        else if (data.user.role_id == '5') {
        }

        dispatch(loginClear());
      }
    }
  };

  // Carepartner Navigation Email Section by Sismi
  const carepartnerEmailLogin = jsonValue => {
    storeData(jsonValue);
    setSuccessModal(true);

    setTimeout(() => {
      setSuccessModal(false);
      AsyncStorage.setItem('UserType', data?.user?.role);
      AsyncStorage.setItem('HIPAAFORM', data?.hipaa[0]?.pdf);
      setIsLoading(false);
      setEmail(null);
      setPassword(null);

      // console.log("data?.hipaa_comfirmation", data)
      // if (isFirstLaunchCarePartner == true) {
      //   navigation.navigate('Onboarding', {
      //     hipaaData: data?.hipaa_confirmation,
      //     hipaaId: data?.hipaa[0]?.id,
      //     userId: data?.user?.id,
      //     pdf: data?.hipaa[0]?.pdf
      //   });


      // } else {

      if (data?.hipaa_confirmation !== null) {

        navigation.navigate('EnrollmentStack', { screen: 'ChooseTheUser' });
      } else {

        navigation.navigate('HipaaValidationForm', {
          hipaaId: data?.hipaa[0]?.id,
          userId: data?.user?.id,
          pdf: data?.hipaa[0]?.pdf,
        });
      }


    }, 2000);



  };

  const PatientEmailLogin = jsonValue => {
    storePatientData(jsonValue);
    setSuccessModal(true);

    setTimeout(() => {
      setSuccessModal(false);
      AsyncStorage.setItem('UserType', data?.user?.role);
      AsyncStorage.setItem('PatientData', jsonValue);
      AsyncStorage.setItem('HIPAAFORM', data?.hipaa[0]?.pdf);
      setIsLoading(false);
      setEmail(null);
      setPassword(null);

      // console.log("data?.hipaa_comfirmation", data)
      // if (isFirstLaunchCarePartner == true) {
      //   navigation.navigate('Onboarding', {
      //     hipaaData: data?.hipaa_confirmation,
      //     hipaaId: data?.hipaa[0]?.id,
      //     userId: data?.user?.id,
      //     pdf: data?.hipaa[0]?.pdf
      //   });


      // } else {

      if (data?.hipaa_confirmation !== null) {

        navigation.navigate('EnrollmentStack', { screen: 'MainAssessment' });
      } else {

        navigation.navigate('HipaaValidationForm', {
          hipaaId: data?.hipaa[0]?.id,
          userId: data?.user?.id,
          pdf: data?.hipaa[0]?.pdf,
        });
      }


    }, 2000);



  };

  const carepartnerPhoneLogin = jsonValue => { //CAREPARTNER MOBILE LOGIN

    storeData(jsonValue);
    setSuccessModal(true);

    setTimeout(() => {

      AsyncStorage.setItem('UserType', data?.user?.role);
      setSuccessModal(false);
      setIsLoading(false);

      if (data?.hipaa_comfirmation !== null) {
        navigation.navigate('EnrollmentStack', { screen: 'ChooseTheUser' });
      } else {
        navigation.navigate('HipaaValidationForm', {
          hipaaId: data?.hipaa[0]?.id,
          userId: data?.user?.id,
          pdf: data?.hipaa[0]?.pdf,
        });
      }
    }, 2000);
  };

  //FUNCTION FOR VALIDATING EMAIL
  const validateEmail = () => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setValidOpen(true);
      setMessage('Email is required');
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
      return false;
    }

    return true;
  };

  // Get the All Stored Key's.
  const getItemFromAsyncStorage = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('USERROLEID');
      if (storedValue !== null) {
        setUserID(storedValue);
      } else {
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
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

  // FUNCTION FOR VALIDATING PASSWORD
  const validatePassword = () => {

    if (password == null) {
      setValidOpen(true);
      setMessage('Password is required');
      setTimeout(() => {
        setValidOpen(false);
      }, 1500);
      return false;
    }

    return true;
  };



  // Login to Support Member Module
  const onLoginAsSupportMember = token => {
    console.log("TOKEN DATA " + token)
    getProfileSupport(token, dispatch);
    setTimeout(() => {
      setSuccessModal(false);
      setIsLoading(false);
      dispatch(loginClear());

      if (isFirstLaunchSupport == true) {
        navigation.navigate('SupportOnBoardingScreen');
      } else {
        navigation.navigate('SupportLandingScreen');
      }
    }, 2000);
  };

  const onLoginSendEmail = () => {

    if (!mobileView) {
      Keyboard.dismiss();
      if (validateEmail() && validatePassword()) {
        setIsLoading(true);
        // Support Member Dummy Mail & Credentials
        if (
          email.toLowerCase() == 'casemanager@gmail.com' &&
          password == '123456'
        ) {
          // Navigate to Case manager Section
          console.log('..................Case Manager Login');
          setIsLoading(false);
          setEmail(null);
          setPassword(null);
          AsyncStorage.setItem('UserType', 'CaseManager');
          navigation.navigate('HomeStack', { screen: 'PatientList' });
          // Care Partner API Check
        } else {
          LoginEmail(email, password, dispatch);
          console.log('..................success');
        }
      }
    } else {
      if (validatePhone() && validatePassword()) {
        setIsLoading(true);
        postLoginDetails(MobileNum, password, dispatch);
      }
    }
  };

  // Saving the state for onboarding for Support member for first time user.
  const checkFirstLaunch = async () => {
    const firstLaunch = await AsyncStorage.getItem('isFirstLaunchSupport');
    if (firstLaunch === null) {
      setIsFirstLaunchSupport(true);
      AsyncStorage.setItem('isFirstLaunchSupport', 'false');
    } else {
      setIsFirstLaunchSupport(false);
    }
  };

  const checkFirstLaunchCarePartner = async () => {
    const firstLaunch = await AsyncStorage.getItem('isFirstLaunchCarepartner');
    if (firstLaunch === null) {
      setIsFirstLaunchCarePartner(true);
      AsyncStorage.setItem('isFirstLaunchCarepartner', 'false');
    } else {
      setIsFirstLaunchCarePartner(false);
    }
  }

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('UserData', value);
    } catch (e) {
      // handle error
      console.error('Error storing data:', e);
    }
  };

const OnMobileView = () =>{
  setMobileView(!mobileView),
  setEmail(null)
  setMobileNum(null)
}

const storePatientData = async value => {
  try {
    await AsyncStorage.setItem('PatientData', value);
  } catch (e) {
    // handle error
    console.error('Error storing data:', e);
  }
};

  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={{ marginLeft: GlobalSize(30) }}>
              <Image
                source={require('../../../../assets/Images/NEWSIGNIN/Login.png')}
                style={{ width: GlobalSize(300), height: 'auto', aspectRatio: 1 }}
                resizeMode="contain"
              />
            </View>

            <View style={styles.letsView}>
              <View>
                <Text style={styles.textWe}>Welcome</Text>
              </View>
              <View style={{ marginTop: GlobalSize(10), left: GlobalSize(4) }}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  <ToolTip height={30} width={30} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: GlobalSize(8) }}>
              {mobileView ? (
                <Text style={styles.textSIGIN}>Sign in using phone number</Text>
              ) : (
                <Text style={styles.textSIGIN}>Sign in using E-mail</Text>
              )}
            </View>

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
                      value={MobileNum}
                      onChangeText={text => setMobileNum(text)}
                      style={[
                        styles.textInputPass,
                        { width: DEFAULTWIDTH * 0.75 },
                      ]}
                      placeholder="Enter phone number"
                      placeholderTextColor={PLACEHOLDERCOLOR3}
                    />
                  ) : (
                    <TextInput
                      maxLength={30}
                      value={email}
                      keyboardType={'email-address'}
                      style={[
                        styles.textInputPass,
                        { width: DEFAULTWIDTH * 0.75 },
                      ]}
                      placeholder="Enter your email address"
                      onChangeText={text => setEmail(text)}
                      placeholderTextColor={PLACEHOLDERCOLOR3}
                    />
                  )}
                </View>
              </View>
            </View>

            <View style={DEFAULTSTYLES.alignView}>
              <View style={styles.viewTextInput}>
                <View style={styles.viewTextIn}>
                  <TextInput
                    maxLength={10}
                    value={password}
                    style={[
                      styles.textInputPass,
                      { width: DEFAULTWIDTH * 0.6, left: GlobalSize(5) },
                    ]}
                    secureTextEntry={isPasswordSecure}
                    placeholder="Enter your password"
                    onChangeText={text => setPassword(text)}
                    placeholderTextColor={PLACEHOLDERCOLOR3}
                  />
                </View>

                <TouchableOpacity
                  style={[styles.viewOne, { right: GlobalSize(4) }]}
                  onPress={() => setIsPasswordSecure(!isPasswordSecure)}>
                  {!isPasswordSecure ? (
                    <EyeOpen1 width={20} height={20} />
                  ) : (
                    <EyeClose1 width={20} height={20} />
                  )}
                </TouchableOpacity>
              </View>
            </View>



            <View style={DEFAULTSTYLES.alignView}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => onLoginSendEmail()}>
                <Text style={styles.buttonText}>Sign In</Text>
                {IsLoading &&
                  <ActivityIndicator size={20} color={BACKGROUNDWHITE} />}
              </TouchableOpacity>
            </View>

            <View style={styles.viewDiv}>
              <View>
                <TouchableOpacity
                  style={styles.touchSign}
                  onPress={() => navigation.navigate('PasswordVerify')}>
                  <Text style={styles.textSignin}>Forgot password</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.touchSign}
                  onPress={() => OnMobileView()}>
                  {mobileView ? (
                    <Text style={styles.textSignin}>
                      or sign in using email
                    </Text>
                  ) : (
                    <Text style={styles.textSignin}>
                      or sign in using phone
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={styles.viewSend}>
              <View style={{ marginTop: DEFAULTWIDTH * 0.04 }}>
                <Text style={styles.textSign}>Sign In</Text>
              </View>

              <TouchableOpacity onPress={() => onLoginSendEmail()}>
                <View style={styles.viewRight}>
                  {!IsLoading ? (
                    <RightWhite />
                  ) : (
                    <ActivityIndicator size={20} color={BACKGROUNDWHITE} />
                  )}
                </View>
              </TouchableOpacity>
            </View> */}

      
          </View>
        </ScrollView>
    
      </KeyboardAvoidingView>
      <View style={{ alignItems: 'flex-end' ,right:GlobalSize(25),bottom:GlobalSize(20)}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={styles.textSignup}>Sign Up</Text>
              </TouchableOpacity>
            </View>
      <ValidationModal
        ModalOpen={ValidOpen}
        setModalOpen={setValidOpen}
        Message={Message}
      />

      <SuccessPopup
        Message={'Login successfull '}
        ModalOpen={SuccessModal}
        setModalOpen={setSuccessModal}
      />

      <ToolTipModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        Title={'What is the sign in process?'}
        Desc={
          'You have to login using your email or phone number and the password you have created.  If it is validated, you will be redirected to your associated role which you have selected at the time of sign up.'
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
  letsView: {
    marginBottom: DEFAULTWIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  textWe: {
    fontSize: fontSize(25),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
  },
  textSIGIN: {
    fontSize: GlobalSize(16),
    fontFamily: FONTS.FontRegular,
    color: PRIMARYCOLOR,
  },
  viewDiv: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: GlobalSize(10),
  },
  viewTextInput: {
    borderWidth: 1,
    borderRadius: GlobalSize(28),
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.16,
    borderColor: 'rgba(21, 31, 109, 0.25)',
    flexDirection: 'row',
    marginBottom: GlobalSize(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textOne: {
    fontSize: GlobalSize(15),
    color: FOURTHCOLOR,
    fontFamily: FONTS.FontSemiB,
    opacity: 0.45,
  },
  viewOne: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BORDERCOLOR5,
    marginLeft: GlobalSize(3.5),
  },
  textInputPass: {
    fontSize: fontSize(15),
    fontFamily: FONTS.FontRegular,
    color: PUREBLACK,
    width: DEFAULTWIDTH * 0.5,
  },
  postView: {
    position: 'relative',
    bottom: GlobalSize(1),
    right: GlobalSize(10),
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
  touchSign: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginRight: GlobalSize(8),
  },
  textSign: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(20),
    color: PRIMARYCOLOR,
  },
  viewRight: {
    backgroundColor: PRIMARYCOLOR,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(5),
  },
  viewSend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.04,
    marginLeft: GlobalSize(8),
    marginRight: GlobalSize(8),
  },
  textSignup: {
    fontSize: GlobalSize(20),
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontRegular,
    textDecorationLine: 'underline',
  },
});
export default SignIn;
