
import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar,TouchableOpacity, ActivityIndicator,Platform } from 'react-native';

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import EditInfo from '../../../../Components/Common/Profile/EditInfo';
import ValidationModal from '../../../../Components/Forms/LoginScreen/ValidationModal';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { UpdatePatientProfileClear } from '../../../../redux/Slice/PatientProfile/UpdatePatientProfileKey';
import { getEditPatientProfile, UpdatePatientProfile } from '../../../../redux/Thunk/PatientProfileThunk';


const EditProfile = ({ navigation }) => {

    const NameRef = useRef(null);
    const MobileRef = useRef(null);
    const AddressRef = useRef(null);
    const EmailRef = useRef(null);

    const dispatch = useDispatch();
    const [FullName, setFullName] = useState('Amelia');
    const [PhoneNum, setPhoneNum] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Gender, setGender] = useState('');
    const [ImagePath, setImagePath] = useState(null);
    const [NameStatus, setNameStatus] = useState(true);
    const [EmailStatus, setEmailStatus] = useState(true);
    const [PhoneStatus, setPhoneStatus] = useState(true);
    const [AddStatus, setAddStatus] = useState(true);
    const [GenderStatus, setGenderStatus] = useState(true);
    const [ModalOpen, setModalOpen] = useState(false);
    const [PatientData, setPatientData] = useState(null);
    const [LanguageId, setLanguageId] = useState([]);
    const [Language, setLanguage] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [image, setImage] = useState();
    const [imageError, setImageError] = useState(false);

    const [Message, setMessage] = useState(null);
    const [SuccessModal, setSuccessModal] = useState(false);
    const [ErrorModal, setErrorModal] = useState(false);

    const { error, isLoading, getPatientData, UpdatePatientData, UpdatePatientError, UpdatePatientLoading } = useSelector(
        state => ({
            getPatientData: state.EditprofileDetails.data,
            error: state.EditprofileDetails.error,
            isLoading: state.EditprofileDetails.isLoading,
            UpdatePatientData: state.UpdatePatientProfile.data,
            UpdatePatientError: state.UpdatePatientProfile.error,
            UpdatePatientLoading: state.UpdatePatientProfile.isLoading
        }),
        shallowEqual
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setPatientData(data);
            if (data?.patientData?.patient_id && data?.storedValue) { //FUNCTION FOR GETTING THE PATIENT DATA
                getEditPatientProfile(data?.patientData?.patient_id, data?.storedValue, dispatch);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (getPatientData) {
            setFullName(getPatientData?.patient_name);
            setImage(getPatientData?.patient_profileImg);
            setEmail(getPatientData?.patient_email);
            setPhoneNum(getPatientData?.patient_phonenumber);
            setAddress(getPatientData?.patient_address);
            setGender(getPatientData?.patient_gender);
            setLanguage(getPatientData?.languages);
            setSelectedItems(getPatientData?.user_languages || []);
            setLanguageId(getPatientData?.user_languages?.map(item => item.language_id) || []);
        }
    }, [getPatientData]);

    useEffect(() => {
        if (LanguageId?.length === 0) {
            setSelectedItems([]);
        }
    }, [LanguageId]);

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');
            const carepartnerData = await AsyncStorage.getItem('UserData');

            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
                carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
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

    useEffect(() => { //SHOWING THE API RESPONSE AFTER UPDATION
        if (UpdatePatientData) {
            setMessage('Profile updated successfully');
            setSuccessModal(true);
            setTimeout(() => {
                setSuccessModal(false);
                navigation.navigate('Journey');
                dispatch(UpdatePatientProfileClear());
            }, 1500);
        }
        if (UpdatePatientError) {
            setMessage('Profile update unsuccessful. Please try again.');
            setErrorModal(true);
            setTimeout(() => {
                setErrorModal(false);
                dispatch(UpdatePatientProfileClear());
            }, 1500);
        }
    }, [UpdatePatientData, UpdatePatientError, UpdatePatientLoading]);

    const OnSubmit = () => {
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
        } else if (image == null) {
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
            }, 1500);
        } else {
            UpdatePatientProfile(
                PatientData?.patientData?.patient_id,
                FullName,
                Email,
                PhoneNum,
                Address,
                Gender,
                LanguageId,
                ImagePath ? ImagePath : image,
                PatientData?.storedValue,
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
                    <StatusBar
                        backgroundColor={PRIMARYCOLOR}
                        barStyle={Platform.OS == 'ios' ? 'dark-content' :'light-content'}
                        style={{ flex: 1}}
                    />

                            <KeyboardAwareScrollView
                            style={{ top: GlobalSize(-15) }}
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={styles.editView}>
                                <EditInfo
                                    imageError={imageError}
                                    setImageError={setImageError}
                                    image={image}
                                    setImage={setImage}
                                    LanguageId={LanguageId}
                                    setLanguageId={setLanguageId}
                                    selectedItems={selectedItems}
                                    setSelectedItems={setSelectedItems}
                                    Language={Language}
                                    setLanguage={setLanguage}
                                    UserId={PatientData?.patientData?.patient_id}
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
                                    NameRef={NameRef}
                                    ImagePath={ImagePath}
                                    setImagePath={setImagePath}
                                    setAddress={setAddress}
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
                                />
                                <TouchableOpacity style={styles.btnView} onPress={OnSubmit}>
                                    <Text style={styles.textBtn}>Save</Text>
                                    {/* {UpdatePatientLoading && (
                                        <ActivityIndicator size={15} color={BACKGROUNDWHITE} style={{ marginLeft: GlobalSize(10) }} />
                                    )} */}
                                </TouchableOpacity>
                            </View>
                    
                    </KeyboardAwareScrollView>
                    <ValidationModal
                        ModalOpen={ModalOpen}
                        setModalOpen={setModalOpen}
                        Message={'Please upload your profile image'}
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
                </SafeAreaView>
            )}
        </>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    btnView: {
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: GlobalSize(25),
        flexDirection: 'row'
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    editView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: PUREWHITE
    },
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
