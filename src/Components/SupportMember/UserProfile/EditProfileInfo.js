import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  BORDERCOLOR4,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLORRS,
  VALIDCOLOR,
} from '../../../Constants/Colors/Colors';
import {WhiteCamera, WhiteLeftArrow} from '../../../../assets';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../Constants/Fonts';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';

import ImageCropPicker from 'react-native-image-crop-picker';

// Requires Spoken Languages, Zipcode
const EditProfileInfo = ({
  FullName,
  setFullName,
  Email,
  setEmail,
  PhoneNum,
  setPhoneNum,
  Gender,
  setGender,
  Address,
  setAddress,
  NameRef,
  NameStatus,
  setNameStatus,
  ImagePath,
  setImagePath,
  EmailRef,
  EmailStatus,
  setEmailStatus,
  MobileRef,
  PhoneStatus,
  setPhoneStatus,
  AddressRef,
  AddStatus,
  setAddStatus,
  GenderStatus,
  setGenderStatus,
  navigation,
}) => {
  // FUNCTION FOR SELECTING GENDER
  const handleOptionPress = option => {
    setGender(option);
  };

  const openCamera = () => {
    // To open Camera
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: false,
    })
      .then(image => {
        setImagePath(image?.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //NAME VALIDATION
  const handleNameChange = text => {
    const isValidName = /^[ A-Za-z\s]{2,}$/.test(text);
    setNameStatus(isValidName);
    setFullName(text);
  };

  //EMAIL VALIDATION
  const handleEmailChange = text => {
    const isValidEmail =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(Email);
    setEmailStatus(isValidEmail);
    setEmail(text);
  };

  //PHONE VALIDATION
  const handlePhoneChange = text => {
    const isValidPhoneNumber = /^\d{10}$/.test(text.replace(/[^\d]/g, ''));
    setPhoneStatus(isValidPhoneNumber);
    setPhoneNum(text);
  };

  //ADDRESS VALIDATION
  const handleAddressChange = text => {
    const isValidAddress = /^[A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(
      Address,
    );
    setAddStatus(isValidAddress);
    setAddress(text);
  };

  return (
    <>
      <View style={{backgroundColor: PRIMARYCOLOR}}>
        <View style={{backgroundColor: PRIMARYCOLOR}}>
          <View style={styles.viewHeader}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <WhiteLeftArrow width={width(20)} height={height(20)} />
              </TouchableOpacity>
            </View>

            <View style={{left: GlobalSize(-18)}}>
              <Text style={styles.profile}>Edit Profile</Text>
            </View>

            <View></View>
          </View>

          <View style={styles.viewImg}>
            <View style={styles.imageView}>
              {ImagePath ? (
                <Image style={styles.imageStyle} source={{uri: ImagePath}} />
              ) : (
                <Image
                  style={{width: GlobalSize(100), height: GlobalSize(100)}}
                  source={require('../../../../assets/Images/Account.png')}
                />
              )}

              <View style={{top: GlobalSize(40), left: GlobalSize(-30)}}>
                <TouchableOpacity onPress={() => openCamera()}>
                  <WhiteCamera width={20} height={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.textNm}>Amelia</Text>
              <Text style={styles.textId}>ID CG2015</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.viewPureWhite}>
          <View>
            <Text style={styles.textFullNm}>Full Name</Text>
            <TextInput
              ref={NameRef}
              value={FullName}
              style={[
                styles.textIn,
                {borderColor: !NameStatus ? VALIDCOLOR : BORDERCOLOR4},
              ]}
              onChangeText={text => handleNameChange(text)}
            />

            {!NameStatus && (
              <Text style={{color: VALIDCOLOR, fontSize: fontSize(12)}}>
                Name is required
              </Text>
            )}
          </View>

          <View>
            <Text style={styles.textFullNm}>Email Address</Text>
            <TextInput
              ref={EmailRef}
              value={Email}
              keyboardType={'email-address'}
              style={[
                styles.textIn,
                {borderColor: !EmailStatus ? VALIDCOLOR : BORDERCOLOR4},
              ]}
              onChangeText={text => handleEmailChange(text)}
            />

            {!EmailStatus && (
              <Text style={{color: VALIDCOLOR, fontSize: fontSize(12)}}>
                Email address is required
              </Text>
            )}
          </View>

          <View>
            <Text style={styles.textFullNm}>Phone Number</Text>
            <TextInput
              ref={MobileRef}
              value={PhoneNum}
              style={[
                styles.textIn,
                {borderColor: !PhoneStatus ? VALIDCOLOR : BORDERCOLOR4},
              ]}
              keyboardType={'number-pad'}
              maxLength={12}
              onChangeText={text => handlePhoneChange(text)}
            />

            {!PhoneStatus && (
              <Text style={{color: VALIDCOLOR, fontSize: fontSize(12)}}>
                Phone number is required
              </Text>
            )}
          </View>

          <View>
            <Text style={styles.textFullNm}>Gender</Text>

            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => handleOptionPress('Male')}>
                  <View
                    style={[
                      styles.radioIcon,
                      Gender == 'Male' && styles.radioIconSelected,
                    ]}>
                    {Gender == 'Male' && <View style={styles.radioBorder} />}
                  </View>
                </TouchableOpacity>

                <View>
                  <Text style={styles.textFullNm}>Male</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => handleOptionPress('Female')}>
                  <View
                    style={[
                      styles.radioIcon,
                      Gender == 'Female' && styles.radioIconSelected,
                    ]}>
                    {Gender == 'Female' && <View style={styles.radioBorder} />}
                  </View>
                </TouchableOpacity>

                <View>
                  <Text style={styles.textFullNm}>Female</Text>
                </View>
              </View>
            </View>

            {!GenderStatus && (
              <View>
                <Text style={{color: VALIDCOLOR, fontSize: fontSize(12)}}>
                  Gender is required
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.textFullNm}>Address</Text>
            <TextInput
              ref={AddressRef}
              value={Address}
              multiline
              style={[
                styles.textIn,
                {
                  borderColor: !AddStatus ? VALIDCOLOR : BORDERCOLOR4,
                  height: GlobalSize(100),
                  textAlignVertical: 'top',
                },
              ]}
              onChangeText={text => handleAddressChange(text)}
            />

            {!AddStatus && (
              <Text style={{color: VALIDCOLOR, fontSize: fontSize(12)}}>
                Address is required
              </Text>
            )}
          </View>
          <View style={{height: 1000, width: DEFAULTWIDTH}} />
        </ScrollView>
      </View>
    </>
  );
};

export default EditProfileInfo;

const styles = StyleSheet.create({
  profile: {
    color: PUREWHITE,
    fontSize: fontSize(17),
    fontFamily: FONTS.FontSemiB,
  },
  textNm: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(20),
    color: PUREWHITE,
    textAlign: 'center',
  },
  textId: {
    fontFamily: FONTS.FontRegular,
    color: PUREWHITE,
    fontSize: fontSize(15),
    textAlign: 'center',
  },
  viewPureWhite: {
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    padding: DEFAULTWIDTH * 0.1,
  },
  viewImg: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: GlobalSize(20),
  },
  viewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DEFAULTHEIGHT * 0.02,
    margin: GlobalSize(10),
    paddingTop: GlobalSize(10),
  },
  textFullNm: {
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
    marginBottom: GlobalSize(10),
    marginTop: GlobalSize(10),
  },
  imageStyle: {
    width: GlobalSize(100),
    height: GlobalSize(100),
    borderRadius: GlobalSize(50),
  },
  imageView: {
    marginBottom: GlobalSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIn: {
    color: TEXTCOLORRS,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: GlobalSize(8),
    marginBottom: DEFAULTHEIGHT * 0.01,
    paddingLeft: GlobalSize(10),
    width: DEFAULTWIDTH * 0.8,
    height: GlobalSize(50),
    justifyContent: 'center',
    //alignItems:'center'
  },
  radioBorder: {
    width: GlobalSize(10),
    height: GlobalSize(10),
    borderRadius: GlobalSize(5),
    borderWidth: 2,
    borderColor: PRIMARYCOLOR,
    backgroundColor: PRIMARYCOLOR,
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
    backgroundColor: PUREWHITE,
  },
  radioIconSelected: {
    backgroundColor: PUREWHITE,
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderColor: PRIMARYCOLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
