import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {
  BORDERCOLOR4,
  PLACEHOLDERCOLOR1,
  PLACEHOLDERCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR7,
  TEXTCOLORRS,
  VALIDCOLOR,
} from '../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../Constants/styles/styles';
import {
  Account,
  ArrowF,
  LeftArrow,
  WhiteArrow,
  WhiteArrowL,
  WhiteCamera,
  WhiteLeftArrow,
} from '../../../../assets';
import {FONTS} from '../../../Constants/Fonts';
import ImageCropPicker from 'react-native-image-crop-picker';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import LangModal from './LangModal';

const EditInfo = ({
  UserId,
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
  Language,
  setLanguage,
  selectedItems,
  setSelectedItems,
  LanguageId,
  setLanguageId,
  image,
  setImage,
  selectedData,
  setSelectedData,
}) => {
 

  const [imageError, setImageError] = useState(false);
  const [ModalOpen, setModalOpen] = useState(false);

  // FUNCTION FOR SELECTING GENDER
  const handleOptionPress = option => {
    setGender(option);
  };

  // console.log("SELECTED ITEMS...................", selectedItems)
  const openCamera = () => {
    // To open Camera
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: false,
    })
      .then(image => {
        console.log('path printing.................', image);
        setImagePath(image);
        setImage(image?.path);
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


  console.log("ASSESSMENT SUMMARY..................",image)
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
              <Text style={styles.profile}>Profile</Text>
            </View>

            <View></View>
          </View>

          <View style={styles.viewImg}>
            <View style={styles.imageView}>
              {!imageError ? (
                <Image 
                style={styles.imageStyle} 
                source={{uri: image}}   
                onError={() => setImageError(true)} />
              ) :ImagePath ? (
              <Image 
              style={styles.imageStyle} 
              source={{uri: image}}   
              onError={() => setImageError(true)} />)
              : (
                <Account/>
              )}

              <View style={{top: GlobalSize(40), left: GlobalSize(-30)}}>
                <TouchableOpacity onPress={() => openCamera()}>
                  <WhiteCamera width={20} height={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.textNm}>{FullName}</Text>
              <Text style={styles.textId}>ID : {UserId}</Text>
            </View>
          </View>
        </View>

        <View style={styles.viewPureWhite}>
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
                  onPress={() => handleOptionPress('0')}>
                  <View
                    style={[
                      styles.radioIcon,
                      Gender == '0' && styles.radioIconSelected,
                    ]}>
                    {Gender == '0' && <View style={styles.radioBorder} />}
                  </View>
                </TouchableOpacity>

                <View>
                  <Text style={styles.textFullNm}>Male</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.radioButton}
                  onPress={() => handleOptionPress('1')}>
                  <View
                    style={[
                      styles.radioIcon,
                      Gender == '1' && styles.radioIconSelected,
                    ]}>
                    {Gender == '1' && <View style={styles.radioBorder} />}
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
            <Text style={styles.textFullNm}>Language</Text>
          </View>

          <TouchableOpacity
            style={styles.textIn}
            onPress={() => setModalOpen(true)}>
            <Text style={[styles.textFullNm, {color: TEXTCOLORRS}]}>
              Select language
            </Text>
          </TouchableOpacity>
          {LanguageId?.length > 0 && (
            <FlatList
              data={selectedItems}
              keyExtractor={(item, index) =>
                item.language_id
                  ? item.language_id.toString()
                  : index.toString()
              } // Use item.language_id or index as key
              numColumns={3}
              renderItem={({item}) => {
                const isSelected = selectedItems.some(
                  selectedItem => selectedItem.language_id === item.language_id,
                );

                // Log the selected item's language_id
                console.log('Selected item language_id:', item.language_id);

                return (
                  <View
                    style={[
                      styles.langCard,
                      isSelected && styles.selectedLangCard, // Apply selected style if item is selected
                    ]}>
                    <Text
                      style={[
                        styles.textC,
                        isSelected && styles.selectedTextC, // Apply selected text style if item is selected
                      ]}>
                      {item.language_name || item.language}
                    </Text>
                  </View>
                );
              }}
            />
          )}

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
               //  padding:GlobalSize(5),
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
        </View>

        <LangModal
          ModalOpen={ModalOpen}
          Language={Language}
          setLanguage={setLanguage}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          LanguageId={LanguageId}
          setLanguageId={setLanguageId}
          setModalOpen={setModalOpen}
        />


      </View>
    </>
  );
};

export default EditInfo;

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
  textC: {
    fontSize: GlobalSize(12),
    fontFamily: FONTS.FontRegular,
    color: PRIMARYCOLOR,
    textAlign: 'left',
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  textId: {
    fontFamily: FONTS.FontRegular,
    color: PUREWHITE,
    fontSize: fontSize(15),
    textAlign: 'center',
  },
  langCard: {
    borderColor: PRIMARYCOLOR,
    borderWidth: 1.5,
    width: DEFAULTWIDTH * 0.24,
    borderRadius: GlobalSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: GlobalSize(5),
    paddingTop: GlobalSize(5),
    margin: GlobalSize(5),
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
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: GlobalSize(8),
    padding: GlobalSize(10),
    color: 'red',
  },
  placeholderStyle: {
    fontSize: 16,
    color: PLACEHOLDERCOLOR1,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: TEXTCOLOR10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: TEXTCOLOR10,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
