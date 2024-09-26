import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

//COLOR IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  FOURTHCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
  SECONDARYCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR13,
  TEXTCOLOR2,
  TEXTCOLOR7,
  VALIDCOLOR,
} from '../../../../../Constants/Colors/Colors';

//TEXT CONSTANTS
import { USERTYPES } from '../../../../../Constants/Texts';

//SVGICONS
import { CalenderLine, GreyInfo } from '../../../../../../assets';

//IMPORT CONSTANTS
import { FONTS } from '../../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize, height} from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT THIRD-PARTY PACKAGES
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';

import { RegisterUser } from '../../../../../redux/thunk';
import { registerClear } from '../../../../../redux/Slice/RegisterKey';

// MODAL IMPORTED FROM COMPONENTS
import ErrorPopup from '../../../../../Components/ComingSoonPopup/ErrorPopup';

const SignUpForm = ({ navigation }) => {

  const dispatch = useDispatch()

  const CodeRef = useRef(null);
  const NameRef = useRef(null);
  const EmailRef = useRef(null);
  const ZipRef = useRef(null);
  const AddressRef = useRef(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [Gender, setGender] = useState(false)
  const [Role, setRole] = useState('7')
  const [DOB, setDOB] = useState(null)
  const [relationV, setRelationV] = useState(null)
  const [DOBStatus, setDOBStatus] = useState(false)
  const [RelationStatus, setRelationStatus] = useState(false)
 
  const [Code, setCode] = useState(null)
  const [CodeStatus, setCodeStatus] = useState(true)

  const [zipcode, setZipcode] = useState(null)
  const [ZipcodeStatus, setZipcodeStatus] = useState(true)

  const [Email, setEmail] = useState(null)
  const [EmailStatus, setEmailStatus] = useState(true)

  const [PhoneNum, setPhoneNum] = useState(null)
  const [PhoneStatus, setPhoneStatus] = useState(true)

  const [Address, setAddress] = useState(null)
  const [AddStatus, setAddStatus] = useState(true)

  const [selectedOption, setSelectedOption] = useState(null);

  const [Name, setName] = useState(null)
  const [NameStatus, setNameStatus] = useState(true)

  const [Message, setMessage] = useState(null)
  const [ErrorModal, setErrorModal] = useState(false)

  const [TooltipOpen, setTooltipOpen] = useState(false)
  const [Identifier,setIdentifier] = useState(null)

  const [relationship, setRelationship] = useState([
    { label: 'Spouse / Partner', value: '1' },
    { label: 'Mother / Father', value: '2' },
    { label: 'Mother-in-law / Father-in-law ', value: '3' },
    { label: 'Grandparent', value: '4' },
    { label: 'Grandparent-in-law', value: '5' },
    { label: 'Brother / Sister', value: '6' },
    { label: 'Son / Daughter', value: '7' },
    { label: 'Daughter- or Son-in-Law', value: '8' },
    { label: 'Uncle or Aunt', value: '9' },
    { label: 'Nephew or Niece', value: '10' },
    { label: 'Foster child', value: '11' },
    { label: 'Friend', value: '12' },
    { label: 'Neighbor', value: '13' },
    { label: 'Other', value: '14' }
  ])

  const { data, error, isLoading, data1 } = useSelector(
    state => ({
      data: state.register.data,
      error: state.register.error,
      isLoading: state.register.isLoading,
      data1: state.otp.data,
    }),
    shallowEqual
  );


  useEffect(() => {
    ModalOpen_Redux();
    getItemFromAsyncStorage()
    setSelectedOption(data1?.gender)
    setName(data1?.name)
  }, [error, data]);

  const getItemFromAsyncStorage = async () => {
    try {

      const storedValue = await AsyncStorage.getItem('EMAIL');
      const Identifier =  await AsyncStorage.getItem('IDENTIFIER')

      if (storedValue !== null || Identifier !== null) {
        setEmail(storedValue)
        setIdentifier(Identifier)
      } else {

      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  const ModalOpen_Redux = () => {
  
    if (error?.status == 500) {
      setMessage(error?.data?.message)
      setErrorModal(true)

      setTimeout(() => {
        setErrorModal(false)
      }, 1500)
      dispatch(registerClear())

    } else if (data) {
 
      navigation.navigate('CreatePasswordScreen')
      dispatch(registerClear())

    } else if (error) {
      setMessage(error?.data?.message)
      setErrorModal(true)

      setTimeout(() => {
        setErrorModal(false)
      }, 1500)
      dispatch(registerClear())

    }
  };

  const backToSignUp = () => { // navigate back to signup screen
    navigation.navigate('WelcomeScreen');
  };

  // TO HIDE THE CALENDER
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // FUNCTION FOR SETTIG GENDER
  const handleConfirm = (date) => {
    const ConvertDate = moment(date).format('YYYY-MM-DD')
    console.warn("A date has been picked: ", ConvertDate);
    setDOB(ConvertDate)
    setDOBStatus(false)
    hideDatePicker();
  };

  //NAME VALIDATION
  const handleNameChange = (text) => {
    const isValidName = /^[ A-Za-z\s]{2,}$/.test(text);
    setNameStatus(isValidName)
    setName(text);
  };


  //CODE VALIDATION
  const handleCodeChange = (text) => {
    setTooltipOpen(false)
    const isValidName = /^[ A-Za-z1234567890\s]{2,12}$/.test(text);
    setCodeStatus(isValidName)
    setCode(text);
  };

  //EMAIL VALIDATION
  const handleEmailChange = (text) => {
    const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(text);
    setEmailStatus(isValidEmail);
    setEmail(text);
  };

  //ZIPCODE VALIDATION
  const handleZipChange = (text) => {
    const isValidName = /^[ 1234567890\s]{5}$/.test(text);
    setZipcodeStatus(isValidName)
    setZipcode(text);
  };

  //ADDRESS VALIDATION
  const handleAddressChange = (text) => {
    const isValidAddress = /^[ A-Za-z1234567890,./-_()&@;:\s]{2,500}$/.test(text);
    setAddStatus(isValidAddress);
    setAddress(text);
  };

  //NUMBER VALIDATION
  const handlePhoneNumberChange = (text) => {
    const isValidPhoneNumber = /^\d{10}$/.test(text.replace(/[^\d]/g, ''));
    setPhoneStatus(isValidPhoneNumber);
    setPhoneNum(text);
  };

  // FUNCTION FOR SELECTING GENDER
  const handleOptionPress = (option) => {
    setGender(false)
    setSelectedOption(option);
  };

  const OnValidation = () => {
    if (Code == null) {
      CodeRef.current.focus();
      setCodeStatus(false)

    } else if (Name == null) {
      NameRef.current.focus();
      setNameStatus(false)

    } else if (Email == null) {
      EmailRef.current.focus();
      setEmailStatus(false)

    } else if (zipcode == null) {
      ZipRef.current.focus();
      setZipcodeStatus(false)

    } else if (selectedOption == null) {
      setGender(true)

    } else if (DOB == null) {
      setDOBStatus(true)
    }
    else if (relationV == null) {
      setRelationStatus(true)

    } else if (Address == null) {
      AddressRef.current.focus();
      setAddStatus(false)

    } else {
   
      RegisterUser( //FUNCTION FOR CALLING THE REGISTER API
        Role,
        Identifier,
        Name, 
        Email,
        relationV,
        Code,
        PhoneNum,
        Address,
        zipcode, 
        DOB,
        selectedOption, 
        dispatch)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' && 'padding'}
        style={{ flex: 1 }}
      >
        <ScrollView 
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
       //  keyboardShouldPersistTaps='handled'
        >
          <View style={styles.mainContainer}>

            <View style={{ marginBottom: DEFAULTWIDTH * 0.07 }}>
              <Text style={styles.headingText}>{USERTYPES[1].title}</Text>
              <Text style={styles.subHeadingText}>
                We need information to create your account
              </Text>
              <Text style={styles.descriptionText}>
                This can always be updated within your account settings.
              </Text>
            </View>
            <View>
            </View>

            <View style={styles.inputTextViewStyle}>

          <View style={styles.row}>
              <View>
                <Text style={styles.textInputLabel}>Code</Text>
              </View>
              <TouchableOpacity onPress={() => setTooltipOpen(!TooltipOpen)}>
                  <GreyInfo width={25} height={25} />
                </TouchableOpacity>
                </View>
        
                <TextInput
                  ref={CodeRef}
                  value={Code}
                   maxLength={12}
                  onChangeText={(text) => handleCodeChange(text)}
                  style={[styles.textInputStyle, {
                    justifyContent: 'space-between',
                     alignItems: 'center',
                    paddingRight: GlobalSize(10),
                    borderColor: !CodeStatus ? VALIDCOLOR : BORDERCOLOR4,}]}
                />
              {!CodeStatus && (
                <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>Code is required</Text>
              )}

              {TooltipOpen &&
              <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.viewTooltip}>
                  <Text style={styles.textDesc}>This is an invitation code recieved when a patient is requests you to add as their Care Partner.</Text>
                </View>
                </View>}
            </View>

            <View style={styles.inputTextViewStyle}>

              <View style={{ marginBottom: GlobalSize(7) }}>
                <Text style={styles.textInputLabel}>First Name Last Name</Text>
              </View>

              <TextInput
                value={Name}
                ref={NameRef}
                maxLength={32}
                onChangeText={(text) => handleNameChange(text)}
                style={[styles.textInputStyle, { borderColor: !NameStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />

              {!NameStatus && (
                <Text style={{ color: VALIDCOLOR, top: 5 }}>Name is required</Text>
              )}
            </View>


            <View style={styles.inputTextViewStyle}>
              <View style={{ marginBottom: GlobalSize(7) }}>
                <Text style={styles.textInputLabel}>Email Address</Text>
              </View>

              <TextInput
                ref={EmailRef}
                value={Email}
                onChangeText={(text) => handleEmailChange(text)}
                style={[styles.textInputStyle, { borderColor: !EmailStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />

              {!EmailStatus && (
                <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>Email Address is required</Text>
              )}

            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.inputTextViewStyle}>
                <View style={{ marginBottom: GlobalSize(7) }}>
                  <Text style={styles.textInputLabel}>Zipcode</Text>
                </View>

                <TextInput
                  ref={ZipRef}
                  value={zipcode}
                  maxLength={5}
                  onChangeText={(text) => handleZipChange(text)}
                  keyboardType='number-pad'
                  style={[styles.textInputStyle, { borderColor: !ZipcodeStatus ? VALIDCOLOR : BORDERCOLOR4, width: DEFAULTWIDTH * 0.40 }]} />

                {!ZipcodeStatus && (
                  <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>Zipcode is required</Text>
                )}

              </View>

              <View style={{ marginBottom: GlobalSize(7), marginLeft: GlobalSize(10) }}>
                <View style={[styles.inputTextViewStyle, { marginLeft: GlobalSize(10), marginBottom: DEFAULTWIDTH * 0.04 }]}>
                  <Text style={styles.textInputLabel}>Gender</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.radioButton}
                      onPress={() => handleOptionPress('Male')}>

                      <View style={[styles.radioIcon, selectedOption == 'Male' && styles.radioIconSelected]}>
                        {selectedOption == 'Male' && <View style={styles.radioBorder} />}
                      </View>
                    </TouchableOpacity>

                    <View style={{ marginTop: GlobalSize(7) }}>
                      <Text style={styles.textInputLabel}>Male</Text>
                    </View>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.radioButton}
                      onPress={() => handleOptionPress('Female')}>

                      <View style={[styles.radioIcon, selectedOption == 'Female' && styles.radioIconSelected]}>
                        {selectedOption == 'Female' && <View style={styles.radioBorder} />}
                      </View>

                    </TouchableOpacity>

                    <View style={{ marginTop: GlobalSize(7) }}>
                      <Text style={styles.textInputLabel}>Female</Text>
                    </View>
                  </View>
                </View>

                {Gender && (
                  <View style={{ marginLeft: DEFAULTWIDTH * 0.03, marginTop: DEFAULTWIDTH * 0.025 }}>
                    <Text style={{ color: VALIDCOLOR }}>Gender is required</Text>
                  </View>
                )}
              </View>
            </View>

            <View style={styles.inputTextViewStyle}>
              <View style={{ marginBottom: GlobalSize(7) }}>
                <Text style={styles.textInputLabel}>DOB</Text>
              </View>

              <View style={[styles.textInputStyle, {
                flexDirection: 'row',
                justifyContent: 'space-between', borderColor: DOBStatus ? VALIDCOLOR : BORDERCOLOR4
              }]}>
                <TextInput
                  value={DOB}
                  style={styles.dobText}
                  onChangeText={(text) => setDOB(text)}
                />

                <View style={styles.calenderView}>
                  <TouchableOpacity onPress={() => { setDatePickerVisibility(true) }} style={{ padding: 5 }}>
                    <CalenderLine />
                  </TouchableOpacity>
                </View>
              </View>

              {DOBStatus &&
                <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>DOB is required</Text>}
            </View>


            <View style={styles.inputTextViewStyle}>
              <View style={{ marginBottom: GlobalSize(7) }}>
                <Text style={styles.textInputLabel}>Phone Number (Optional)</Text>
              </View>

              <TextInput
                value={PhoneNum}
                keyboardType='number-pad'
                maxLength={13}
                onChangeText={(text) => handlePhoneNumberChange(text)}
                style={[styles.textInputStyle, { borderColor: !PhoneStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />


              {!PhoneStatus &&
                <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>Phone is required</Text>}
            </View>

            <View style={styles.inputTextViewStyle}>

              <View style={{ marginBottom: GlobalSize(7) }}>
                <Text style={styles.textInputLabel}>
                  Relationship to Care Recipient
                </Text>
              </View>

              <View>
                <Dropdown
                  style={[styles.textIn, { borderColor: RelationStatus ? VALIDCOLOR : BORDERCOLOR1 }]}
                  placeholderStyle={styles.placeholderS}
                  itemTextStyle={styles.textArea}
                  selectedTextStyle={styles.textArea}
                  containerStyle={styles.dropView}
                  data={relationship}
                  search={false}
                  labelField="label"
                  valueField="value"
                  placeholder={'Select relationship'}
                  value={relationV}
                  showsVerticalScrollIndicator={false}
                  onChange={item => {
                    setRelationV(item.value);
                    setRelationStatus(false)
                  }}
                />


                {RelationStatus &&
                  <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>Relationship is required</Text>}
              </View>

              <View style={styles.inputTextViewStyle}>

                <View style={{ marginBottom: GlobalSize(7) }}>
                  <Text style={styles.textInputLabel}>
                    Address
                  </Text>
                </View>

                <TextInput
                  ref={AddressRef}
                  value={Address}
                  multiline={true}
                  onChangeText={(text) => handleAddressChange(text)}
                  style={[styles.textInputStyle, { 
                    borderColor: !AddStatus ? VALIDCOLOR : BORDERCOLOR4 ,
                    height:GlobalSize(100),
                    paddingTop:GlobalSize(10)}]} />

                {!AddStatus && (
                  <Text style={{ color: VALIDCOLOR, top: GlobalSize(5) }}>Address is required</Text>
                )}

              </View>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  OnValidation()
                }}>
                <Text style={styles.buttonText}>Continue</Text>
                {isLoading && <ActivityIndicator color={PUREWHITE} size={20} marginLeft={7} />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => backToSignUp()}
                style={styles.cancelView}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          maximumDate={new Date()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <ErrorPopup
          Message={Message}
          ModalOpen={ErrorModal}
          setModalOpen={setErrorModal} />

        {/* <ToolTipModal
          ModalOpen={TooltipOpen}
          setModalOpen={setTooltipOpen}
        /> */}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    padding: GlobalSize(20),
    flex: 1,
    backgroundColor: BACKGROUNDWHITE
  },
  calenderView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: GlobalSize(15)
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:GlobalSize(7)
  },
  headingText: {
    fontFamily: 'Inter-ExtraBold',
    color: PRIMARYCOLOR,
    fontSize: fontSize(25),
    marginTop: GlobalSize(30),
  },
  textIn: {
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR7,
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.14,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BORDERCOLOR1,
    marginTop: GlobalSize(10),
    paddingLeft: GlobalSize(10),
    paddingRight: GlobalSize(10)
  },
  placeholderS: {
    color: BORDERCOLOR4,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular
  },
  dropView: {
    borderRadius: 8,
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.88,
    marginBottom: GlobalSize(10)
  },
  textArea: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
  },
  subHeadingText: {
    fontFamily: 'Inter-SemiBold',
    color: PRIMARYCOLOR,
    fontSize: GlobalSize(16),
    marginTop: GlobalSize(10),
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    color: TEXTCOLOR2,
    fontSize: fontSize(14),
    marginTop: GlobalSize(5)
  },
  textInputLabel: {
    color: SECONDARYCOLOR,
    fontFamily: 'Inter-SemiBold',
    fontSize: fontSize(14),
  },
  textInputStyle: {
    backgroundColor: BACKGROUNDWHITE,
    borderRadius: 4,
    borderWidth: 1,
    height:GlobalSize(42),
    borderColor: BORDERCOLOR1,
    color: TEXTCOLOR10,
    fontSize: fontSize(15),
    fontFamily: FONTS.FontRegular,
    paddingLeft: GlobalSize(15)
  },
  radioBorder: {
    width: GlobalSize(10),
    height: GlobalSize(10),
    borderRadius: GlobalSize(5),
    borderWidth: 2,
    borderColor: PRIMARYCOLOR,
    backgroundColor: PRIMARYCOLOR
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: GlobalSize(8),
  },
  radioIcon: {
    marginLeft: GlobalSize(10),
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderWidth: 2,
    borderColor: BORDERCOLOR4,
    marginRight: GlobalSize(8),
    backgroundColor: PUREWHITE
  },
  radioIconSelected: {
    backgroundColor: PUREWHITE,
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderColor: PRIMARYCOLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dobText: {
    color: TEXTCOLOR10,
    fontSize: fontSize(15),
    left: GlobalSize(-5),
    fontFamily: FONTS.FontRegular,
  },
  textInputOutlineStyle: {
    borderColor: BORDERCOLOR1,
  },
  inputTextViewStyle: {
    marginTop: GlobalSize(15),
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: PRIMARYCOLOR,
    marginTop: GlobalSize(15),
    width: DEFAULTWIDTH * 0.885,
    padding: GlobalSize(5),
    height: height(48),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  viewTooltip: {
    borderRadius: GlobalSize(10),
    borderColor: FOURTHCOLOR,
    width: DEFAULTWIDTH * 0.89,
    borderWidth: 1,
    padding: GlobalSize(10),
    margin: GlobalSize(5),
    marginTop: GlobalSize(10)

  },
  textDesc: {
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR13
  },
  buttonText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: fontSize(13),
    color: PUREWHITE,
  },
  cancelText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
  },
  cancelView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(10),
    marginBottom: DEFAULTWIDTH * 0.05
  },
});

export default SignUpForm;

