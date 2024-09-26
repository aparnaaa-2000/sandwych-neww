import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditInfo from '../../../../Components/Common/Profile/EditInfo';
import ValidationModal from '../../../../Components/Forms/LoginScreen/ValidationModal';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';
import {PRIMARYCOLOR, PUREWHITE} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../../Constants/styles/styles';
import {FONTS} from '../../../../Constants/Fonts';
import {GlobalSize} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import {UpdateProfileClear} from '../../../../redux/Slice/CaregiverProfile/UpdateProfileKey';
import useGetProfile from '../../../../hooks/apihooks/useGetProfile';
import useEditProfileLang from '../../../../hooks/apihooks/useEditProfileLang';
import useUpdateProfile from '../../../../hooks/apihooks/useUpdateProfile';
import {UpdateCaregiverProfile} from '../../../../redux/thunk';
import ProfileModal from './ProfileModal';

const EditProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const NameRef = useRef(null);
  const MobileRef = useRef(null);
  const AddressRef = useRef(null);
  const EmailRef = useRef(null);

  const [ModalOpen, setModalOpen] = useState(false);
  const [FullName, setFullName] = useState('');
  const [PhoneNum, setPhoneNum] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [Gender, setGender] = useState('');
  const [ImagePath, setImagePath] = useState('');
  const [NameStatus, setNameStatus] = useState(true);
  const [EmailStatus, setEmailStatus] = useState(true);
  const [PhoneStatus, setPhoneStatus] = useState(true);
  const [AddStatus, setAddStatus] = useState(true);
  const [GenderStatus, setGenderStatus] = useState(true);
  const [LanguageId, setLanguageId] = useState([]);
  const [Language, setLanguage] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [image, setImage] = useState(null);
  const [Message, setMessage] = useState(null);
  const [SuccessModal, setSuccessModal] = useState(false);
  const [ErrorModal, setErrorModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState([]);
  const [openVisible, setOpenVisible] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await useGetProfile();
        console.log('USERS_DATA:::', data);
        setProfile(data);
        setFullName(data?.user?.name || '');
        setEmail(data?.user?.email || '');
        setPhoneNum(data?.user?.phonenumber || '');
        setAddress(data?.user?.address || '');
        setGender(data?.user?.gender || '');
        setImage(data?.user?.picture || '');
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const data = await useEditProfileLang();
        const languages =
          data?.languages?.map(lang => ({
            language_id: lang.id,
            language_name: lang.language,
          })) || [];
        console.log('language.............', languages);

        setLanguage(languages);
        setSelectedItems(languages);
        setLanguageId(languages.map(lang => lang.language_id));
        console.log('LANGUAGE_LIST...', languages); // Log the full language data
      } catch (error) {
        console.log('error_code', error);
      }
    };
    fetchLanguage();
  }, []);

  useEffect(() => {
    if (LanguageId.length === 0) {
      setSelectedItems([]);
    }
  }, [LanguageId]);

  const formDataToObject = formData => {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      // Handle Blob (file) objects separately if needed
      if (value instanceof Blob) {
        obj[key] = `Blob with type ${value.type}`;
      } else {
        obj[key] = value;
      }
    }
    return obj;
  };

  const OnSubmit = async () => {
    // Ensure that these variables are defined and valid
    const isValidAddress = /^[A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(
      Address,
    );
    const isValidPhoneNumber = /^\d{10}$/.test(PhoneNum.replace(/[^\d]/g, ''));
    const isValidEmail =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(Email);
    const isValidName = /^[A-Za-z\s]{2,}$/.test(FullName);

    if (!isValidName) {
      NameRef.current.focus();
      setNameStatus(false);
    } else if (!isValidEmail) {
      EmailRef.current.focus();
      setEmailStatus(false);
    } else if (!isValidPhoneNumber) {
      MobileRef.current.focus();
      setPhoneStatus(false);
    } else if (Gender === '') {
      setGenderStatus(false);
    } else if (!isValidAddress) {
      AddressRef.current.focus();
      setAddStatus(false);
    } else if (!ImagePath && !image) {
      // Validate if an image has been selected
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
      }, 1500);
    } else {
      // Create form data
      const formData = new FormData();
      formData.append('user_id', profile?.user?.id || 169); // Fallback to a default user ID if profile is undefined
      formData.append('name', FullName),
        formData.append('email', Email),
        formData.append('phonenumber', PhoneNum),
        formData.append('address', Address),
        formData.append('gender', Gender),
        LanguageId.forEach((id, index) => {
          formData.append(`language_id[${index}]`, id);
        });
      formData.append('picture', {
        uri: ImagePath.path ? ImagePath.path : image,
        type: ImagePath.mime ? ImagePath.mime : 'image/jpeg',
        name: ImagePath.path ? ImagePath.path : image,
      });
      console.log('USER_PROFILE_LISTED', formData);
      try {
        const response = await useUpdateProfile(formData); // Assuming useUpdateProfile is your API call
        console.log('Update Profile Response:', response);
        setOpenVisible(true);
        setTimeout(() => {
          setOpenVisible(false);
          navigation.goBack();
        }, 1000);
      } catch (error) {
        console.error('Error updating profile:', error);
        Alert.alert('Error', 'There was an error updating your profile.');
      }
    }
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View>
      ) : (
        <SafeAreaView style={[DEFAULTSTYLES.AndroidSafeArea, {paddingTop: 0}]}>
          <StatusBar
            backgroundColor={PRIMARYCOLOR}
            barStyle={'light-content'}
            style={{flex: 0}}
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{top: GlobalSize(-15)}}>
            <View style={{backgroundColor: PUREWHITE}}>
              <EditInfo
                image={image}
                setImage={setImage}
                LanguageId={LanguageId}
                setLanguageId={setLanguageId}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                UserId={profile?.user?.id}
                navigation={navigation}
                FullName={FullName}
                setFullName={setFullName}
                Email={Email}
                setEmail={setEmail}
                PhoneNum={PhoneNum}
                setPhoneNum={setPhoneNum}
                Gender={Gender}
                setGender={setGender}
                Address={Address}
                setAddress={setAddress}
                NameRef={NameRef}
                ImagePath={ImagePath}
                setImagePath={setImagePath}
                NameStatus={NameStatus}
                setNameStatus={setNameStatus}
                EmailRef={EmailRef}
                EmailStatus={EmailStatus}
                setEmailStatus={setEmailStatus}
                MobileRef={MobileRef}
                PhoneStatus={PhoneStatus}
                setPhoneStatus={setPhoneStatus}
                AddressRef={AddressRef}
                AddStatus={AddStatus}
                setAddStatus={setAddStatus}
                GenderStatus={GenderStatus}
                setGenderStatus={setGenderStatus}
                Language={Language}
                setLanguage={setLanguage}
                selectedData={selectedData}
                setSelectedData={setSelectedData}
              />

              <View style={DEFAULTSTYLES.alignView}>
                <TouchableOpacity style={styles.btnView} onPress={OnSubmit}>
                  <Text style={styles.textBtn}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <ValidationModal
            ModalOpen={ModalOpen}
            setModalOpen={setModalOpen}
            message={'Please add the image'}
          />

          <SuccessPopup
            ModalOpen={SuccessModal}
            setModalOpen={setSuccessModal}
            successMessage={Message}
          />

          <ErrorPopup
            ModalOpen={ErrorModal}
            setModalOpen={setErrorModal}
            ErrorMessage={Message}
          />

          <ProfileModal setModalOpen={setOpenVisible} ModalOpen={openVisible} />
        </SafeAreaView>
      )}
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnView: {
    width: DEFAULTWIDTH / 1.2,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 5,
    marginVertical: 20,
  },
  textBtn: {
    color: PUREWHITE,
    fontFamily: FONTS.FONT_POPPINS_SEMI_BOLD,
    fontSize: GlobalSize(18),
  },
});
