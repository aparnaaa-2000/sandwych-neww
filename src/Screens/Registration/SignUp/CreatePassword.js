import React, { useState, useEffect } from 'react';
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
  Platform,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';

//COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR5,
  BORDERCOLORRGBA,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREBLACK
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//SVGICONS
import { EyeClose1, EyeOpen1, RightWhite, ToolTip } from '../../../../assets';

//MODAL IMPORTED FROM COMPONENTS
import ToolTipModal from '../../../Components/Forms/Signup/TooltipModal';
import ValidationModal from '../../../Components/Forms/LoginScreen/ValidationModal';
import SuccessPopup from '../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../Components/ComingSoonPopup/ErrorPopup';

//IMPORT PACKAGES
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CreatePassword } from '../../../redux/thunk';
import { createClear } from '../../../redux/Slice/CreatePswSliceKey';

const CreatePasswordScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const [ModalOpen, setModalOpen] = useState(false);
  const [isPasswordSecure1, setIsPasswordSecure1] = useState(true);
  const [isPasswordSecure2, setIsPasswordSecure2] = useState(true);
  const [ValidOpen, setValidOpen] = useState(false)
  const [Message, setMessage] = useState(null)
  const [SuccessModal, setSuccessModal] = useState(false)
  const [token, setToken] = useState(null)
  const [password1, setPassword1] = useState(null)
  const [password2, setPassword2] = useState(null)
  const [IsLoading, setIsLoading] = useState(false)
  const [ErrorModal, setErrorModal] = useState(false)

  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.createPSW.data,
      error: state.createPSW.error,
      isLoading: state.createPSW.isLoading,
    }),
    shallowEqual
  );


  useEffect(() => {

    handleBackButtonPressAndroid()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, [navigation]);


  const handleBackButtonPressAndroid = () => {
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    else {
      return true;
    }
  }

  useEffect(() => {
    getItemFromAsyncStorage()
    ModalOpen_Redux()
  }, [error, data, token]);

  const ModalOpen_Redux = async () => {

    // Check if error is defined and has a status of 400
    if (error) {
      setMessage(error?.response?.data?.message)
      setErrorModal(true)

      setTimeout(() => {
        setErrorModal(false)
        setIsLoading(false)
      }, 1500)
      dispatch(createClear())
      setIsLoading(false)
    } else if (data && password1 !== null && password2 !== null) {

      const jsonValue = JSON.stringify(data?.user);
    
      storeData(jsonValue)

      setIsLoading(false)
      setSuccessModal(true)
      setMessage('Password generated successfully.')

      const storedValue = await AsyncStorage.removeItem('TOKENAuth');
      setTimeout(() => {
        setSuccessModal(false)
        // navigation.navigate('Onboarding', {
        //   hipaaData: data?.hipaa_confirmation,
        //   hipaaId: data?.hipaa[0]?.id,
        //   userId: data?.user?.id,
        //   pdf: data?.hipaa[0]?.pdf
        // });
        navigation.navigate('SignIn') // NEED TO CHANGE THE NAVIAGTION INTO HIPAA
        //  navigation.navigate('HipaaValidationForm')
      }, 1500)

      dispatch(createClear())
    }
  };


  const getItemFromAsyncStorage = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      if (storedValue !== null) {
        setToken(storedValue)
      } else {

      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  //FUNCTION FOR CHECKING VALIDATION AND API
  const onCreatePsw = () => {
    Keyboard.dismiss()
    if (password1 !== password2) {
      setValidOpen(true)
      setMessage('Password mismatch')
      setTimeout(() => {
        setValidOpen(false)
      }, 1500)
    } else if (password1 == null && password2 == null) {
      setValidOpen(true)
      setMessage('Password is required')
      setTimeout(() => {
        setValidOpen(false)
      }, 1500)
    } else {
      setIsLoading(true)
      // navigation.navigate('HipaaValidationForm')
      CreatePassword(password1, password2, token, dispatch);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('UserData', value);
    } catch (e) {
      // handle error
      console.error('Error storing data:', e);
    }
  };


  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={{ flex: 1 }}
      >

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
          <View style={styles.container}>

            <View style={{ marginLeft: DEFAULTWIDTH * 0.084, alignItems: 'center' }}>
              <Image source={require('../../../../assets/Images/NEWSIGNIN/Password.png')}
                style={{ width: 500, height: 370 }} resizeMode='contain' />
            </View>

            <View style={styles.letsView}>
              <View>
                <Text style={styles.textWe}>Create Password</Text>
              </View>
              <View style={{ marginTop: 5, left: 4 }}>
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                  <ToolTip height={30} width={30} />
                </TouchableOpacity>

              </View>
            </View>

            <View style={{ marginBottom: DEFAULTWIDTH * 0.02 }}>
              <Text style={styles.textSIGNIN}>Generate your new credentials </Text>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={styles.viewTextInput}>

                <View style={styles.inputView}>

                  <TextInput
                    maxLength={10}
                    style={[styles.inputArea, { width: DEFAULTWIDTH * 0.6, left: 5 }]}
                    secureTextEntry={isPasswordSecure1}
                    placeholder='Enter your password'
                    value={password1}
                    onChangeText={(text) => setPassword1(text)}
                    placeholderTextColor={PLACEHOLDERCOLOR3} />
                </View>

                <TouchableOpacity
                  style={[styles.viewOne, { right: GlobalSize(-2) }]}
                  onPress={() => setIsPasswordSecure1(!isPasswordSecure1)}>
                  {!isPasswordSecure1 ?
                    <EyeOpen1 width={width(20)} height={height(20)} /> :
                    <EyeClose1 width={width(20)} height={height(20)} />}
                </TouchableOpacity>
              </View>
            </View>


            <View style={DEFAULTSTYLES.alignView}>
              <View style={styles.viewTextInput}>

                <View style={styles.inputView}>
                  <TextInput
                    maxLength={10}
                    style={[styles.inputArea, { width: DEFAULTWIDTH * 0.6, left: GlobalSize(5) }]}
                    secureTextEntry={isPasswordSecure2}
                    placeholder='Re-enter your password'
                    value={password2}
                    onChangeText={(text) => setPassword2(text)}
                    placeholderTextColor={PLACEHOLDERCOLOR3} />
                </View>

                <TouchableOpacity
                  style={[styles.viewOne, { right: GlobalSize(-2) }]}
                  onPress={() => setIsPasswordSecure2(!isPasswordSecure2)}>

                  {!isPasswordSecure2 ?
                    <EyeOpen1 width={width(20)} height={height(20)} /> :
                    <EyeClose1 width={width(20)} height={height(20)} />}

                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.viewSend}>
              <TouchableOpacity>
                <View style={{ marginTop: DEFAULTWIDTH * 0.05 }}>
                  <Text style={styles.textSend}>Sign In</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => onCreatePsw()}>
                <View style={styles.viewRight}>
                  {!IsLoading ?
                    <RightWhite /> :
                    <ActivityIndicator size={20} color={BACKGROUNDWHITE} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <SuccessPopup
          Message={Message}
          ModalOpen={SuccessModal}
          setModalOpen={setSuccessModal} />

        <ValidationModal
          ModalOpen={ValidOpen}
          setModalOpen={setValidOpen}
          Message={Message} />

        <ErrorPopup
          Message={Message}
          ModalOpen={ErrorModal}
          setModalOpen={setErrorModal} />

        <ToolTipModal
          ModalOpen={ModalOpen}
          setModalOpen={setModalOpen}
          Title={'How should I create a new password?'}
          Desc={'It is always recommended to have a password which has alphabets, numbers and unique symbols like $,#,@,etc... Minimum 8 letters should be there.'} />

      </KeyboardAvoidingView>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    marginLeft: DEFAULTWIDTH * 0.07,
    marginRight: DEFAULTWIDTH * 0.07
  },
  textWe: {
    fontSize: fontSize(25),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR
  },
  textSIGNIN: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: PRIMARYCOLOR
  },
  viewTextInput: {
    borderWidth: 1,
    borderRadius: GlobalSize(28),
    width: DEFAULTWIDTH * 0.86,
    height: DEFAULTWIDTH * 0.16,
    borderColor: BORDERCOLORRGBA,
    flexDirection: 'row',
    marginBottom: GlobalSize(10),
    justifyContent: 'space-around',
    alignItems: 'center'
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
    width: DEFAULTWIDTH * 0.5
  },
  inputView: {
    marginLeft: DEFAULTWIDTH * 0.03,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textSend: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(20),
    color: PRIMARYCOLOR
  },
  viewRight: {
    backgroundColor: PRIMARYCOLOR,
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(25),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(5)
  },
  viewSend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.17
  },
  letsView: {
    marginBottom: DEFAULTWIDTH * 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
export default CreatePasswordScreen;