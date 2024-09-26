import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View, 
    SafeAreaView,
    StatusBar,
    Platform,
    TouchableOpacity,
    ActivityIndicator, 
    KeyboardAvoidingView 
    } from 'react-native';

//IMPORT COMPONENTS
import EditInfo from '../../../../Components/Common/Profile/EditInfo';
import ValidationModal from '../../../../Components/Forms/LoginScreen/ValidationModal';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT THIRD-PARTY PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UpdateCaregiverProfile, getEditCaregiverProfile } from '../../../../redux/thunk';
import { UpdateProfileClear } from '../../../../redux/Slice/CaregiverProfile/UpdateProfileKey';


const CarePartnerEditProfile = ({ navigation }) => {

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
    const [caregiverData, setCaregiverData] = useState(null);
    const [LanguageId, setLanguageId] = useState([]);
    const [Language, setLanguage] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [image, setImage] = useState(null);

    const [Message, setMessage] = useState(null);
    const [SuccessModal, setSuccessModal] = useState(false);
    const [ErrorModal, setErrorModal] = useState(false);

    const { error, isLoading, getCaregiverData, updateCaregiverData, updateCaregiverError, updateCaregiverLoading } = useSelector(
        state => ({
            getCaregiverData: state.getEditCaregiver.data,
            error: state.getEditCaregiver.error,
            isLoading: state.getEditCaregiver.isLoading,
            updateCaregiverData: state.updateCaregiverProfile.data,
            updateCaregiverError: state.updateCaregiverProfile.error,
            updateCaregiverLoading: state.updateCaregiverProfile.isLoading
        }),
        shallowEqual
    );

    useEffect(() => {
        const fetchCaregiverData = async () => {
            const data = await getData();
            setCaregiverData(data);

            if (data) {
                getEditCaregiverProfile(data?.carepartnerData?.id, data?.storedValue, dispatch); //FETCH THE DATA
            }
        };

        fetchCaregiverData(); //API FOR GETTING THE EDIT DATA
    }, [dispatch]);

    useEffect(() => {
        if (getCaregiverData) {
            setFullName(getCaregiverData.caregiver_name || '');
            setEmail(getCaregiverData.caregiver_email || '');
            setPhoneNum(getCaregiverData.caregiver_phonenumber || '');
            setAddress(getCaregiverData.caregiver_address || '');
            setImage(getCaregiverData.caregiver_profileImg || '');
            setLanguage(getCaregiverData.languages || []);
            setGender(getCaregiverData.caregiver_gender || '');
            setSelectedItems(getCaregiverData.user_languages || []);
            setLanguageId(getCaregiverData.user_languages?.map(item => item.language_id) || []);
        }
    }, [getCaregiverData]);

    useEffect(() => {
        if (LanguageId.length === 0) {
            setSelectedItems([]);
        }
    }, [LanguageId]);

    useEffect(() => {
        if (updateCaregiverData) {
            setMessage('Profile updated successfully');
            setSuccessModal(true);
            setTimeout(() => {
                setSuccessModal(false);
                navigation.navigate('CarePartnerProfile');
                dispatch(UpdateProfileClear());
            }, 1500);
        }
        if (updateCaregiverError) {
         
            setMessage('Profile update unsuccessful. Please try again.');
            setErrorModal(true);
            setTimeout(() => {
                setErrorModal(false);
                dispatch(UpdateProfileClear());
            }, 2000);
        }
    }, [updateCaregiverData, updateCaregiverError, updateCaregiverLoading, dispatch, navigation]);

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');
            const carepartnerData = await AsyncStorage.getItem('UserData');

            return {
                storedValue,
                patientData: patientData ? JSON.parse(patientData) : null,
                carepartnerData: carepartnerData ? JSON.parse(carepartnerData) : null
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null,
                patientData: null,
                carepartnerData: null
            };
        }
    };


    const OnSubmit = () => { //FUNCTION FOR SUBMIT THE EDITED DATA
        const isValidAddress = /^[A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(Address);
        const isValidPhoneNumber = /^\d{10}$/.test(PhoneNum.replace(/[^\d]/g, ''));
        const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(Email);
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
        } else if (image === null) {
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 1500);
        } else {
            UpdateCaregiverProfile( //FUNCTION FOR CALLING THE API 
                caregiverData?.carepartnerData?.id,
                FullName,
                Email,
                PhoneNum,
                Address,
                Gender,
                LanguageId,
                ImagePath ? ImagePath : image,
                caregiverData?.storedValue,
                dispatch
            );
        }
    };

    return (
        <>
            {isLoading ? (
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View>
            ) : (
                <SafeAreaView style={[DEFAULTSTYLES.AndroidSafeArea, { paddingTop: 0 }]}>
                  
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust this value if needed
                    >

                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                   
                    <StatusBar backgroundColor={PRIMARYCOLOR} style={{ flex: 1 }} barStyle={'light-content'}/>
                        <View style={{ backgroundColor: PUREWHITE }}>
                            <EditInfo
                                image={image}
                                setImage={setImage}
                                LanguageId={LanguageId}
                                setLanguageId={setLanguageId}
                                selectedItems={selectedItems}
                                setSelectedItems={setSelectedItems}
                                UserId={caregiverData?.carepartnerData?.id}
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
                            />

                            <View style={DEFAULTSTYLES.alignView}>
                                <TouchableOpacity style={styles.btnView} onPress={OnSubmit}>
                                    <Text style={styles.textBtn}>Save</Text>
                                    {updateCaregiverLoading && (
                                        <ActivityIndicator size={15} color={BACKGROUNDWHITE} style={{ marginLeft: GlobalSize(10) }} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ValidationModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} Message={'Please upload your profile image'} />

                        <SuccessPopup Message={Message} ModalOpen={SuccessModal} setModalOpen={setSuccessModal} />

                        <ErrorPopup Message={Message} ModalOpen={ErrorModal} setModalOpen={setErrorModal} />
            
                    </KeyboardAwareScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            )}
        </>
    );
};

export default CarePartnerEditProfile;

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
        marginBottom: GlobalSize(20),
        flexDirection: 'row'
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center'
    }
});
