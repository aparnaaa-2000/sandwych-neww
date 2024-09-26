import React, { useState, useRef, useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, FlatList, ActivityIndicator } from "react-native";
import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7, PLACEHOLDERCOLOR1, VALIDCOLOR, BACKGROUNDWHITE } from "../../../../Constants/Colors/Colors";
import { FONTS } from "../../../../Constants/Fonts";

import DEFAULTSTYLES, { DEFAULTWIDTH } from "../../../../Constants/styles/styles";
import { CalenderLine, Close } from "../../../../../assets";
import { GlobalSize, fontSize } from "../../../../Constants/ResponsiveFont/ResponsiveFonts";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { AddDiagnosis, GetDiagnosisList } from "../../../../redux/Thunk/MedicationThunk";
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorPopup from "../../../ComingSoonPopup/ErrorPopup";
import SuccessPopup from "../../../ComingSoonPopup/Successpopup";
import { setICDCOde, setPrescriptionID } from "../../../../redux/Slice/Medication/StoreMedDataKey";

const AddDiagnosisModal = ({ ModalOpen, setModalOpen, navigation, onPress }) => {

    const dispatch = useDispatch()

    const PhysicianRef = useRef();
    const NoteRef = useRef();
    const DateRef = useRef();

    const [PreDate, setPreDate] = useState(null)
    const [diagnosisName, setDiagnosisName] = useState('')
    const [Note, setNote] = useState("null")
    const [DiagnosisData, setDiagnosisData] = useState([])
    const [NoteStatus, setNoteStatus] = useState(true)
    const [DateStatus, setDateStatus] = useState(true)
    const [userData, setUserData] = useState(null)
    const [ICDCode, setICDCode] = useState(null)
    const [brandStatus, setBrandStatus] = useState(true)
    const [PhysicianNm, setPhysicianNm] = useState(null)
    const [Message, setMessage] = useState(null)

    const [PhysicianStatus, setPhysicianStatus] = useState(true)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [ErrorModal, setErrorModal] = useState(false)
    const [SuccessModal, setSuccessModal] = useState(false)


    const { DiagnosisListData, DiagnosisListError, AddDiagnosisError, AddDiagnosisLoading, AddDiagnosisSuccess } = useSelector(
        state => ({
            DiagnosisListData: state.DiagnosisList.data,
            DiagnosisListError: state.DiagnosisList.error,
            AddDiagnosisSuccess: state.AddDiagnosis.data,
            AddDiagnosisError: state.AddDiagnosis.error,
            AddDiagnosisLoading: state.AddDiagnosis.isLoading

        }),
        shallowEqual
    );


    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setUserData(data);
        };

        fetchData();
    }, [navigation]);

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');


            return {
                storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null,
                patientData: null
            };
        }
    };

    console.log("USERDATA,,,,,,,,,,,,,,,,,,,,,,,,,", userData?.storedValue, userData?.patientData?.patient_id)

    const handleSearchDiagnosis = (query) => {  //FUNCTION FOR SEARCH THE DIAGNOSIS NAME
        GetDiagnosisList(query, dispatch)
        setDiagnosisName(query);
        console.log("Name data", DiagnosisListData?.Items)
        const filteredData = DiagnosisListData?.Items?.filter((item) =>
            item?.MedicalConditionDescShort?.toLowerCase()?.includes(query?.toLowerCase())
        );
        console.log("FILTER DATA", filteredData)
        setDiagnosisData(filteredData);
    };


    const handleSelectDiagnosis = (item) => {
        console.log("ITEM............", item?.MedicalConditionID)
        setDiagnosisName(item?.MedicalConditionDescShort);
        setICDCode(item?.MedicalConditionID)
        dispatch(setICDCOde(item?.MedicalConditionID))
        setDiagnosisData([]);
    };

    //PHYSICIAN VALIDATION
    const handlePhyChange = (text) => {
        const isPhysician = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setPhysicianStatus(isPhysician)
        setPhysicianNm(text);
    };



    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const ConvertDate = moment(date).format('MM-DD-YYYY')
        console.warn("A date has been picked: ", ConvertDate);
        setPreDate(ConvertDate)
        hideDatePicker();
    };

    const OnSubmitDiagnosis = () => {
        AddDiagnosis(
            userData?.patientData?.patient_id,
            diagnosisName,
            ICDCode,
            PreDate,
            Note,
            PhysicianNm,
            userData?.storedValue,
            dispatch)
    }

    useEffect(() => {
        DiagnosisSubmit()
    }, [AddDiagnosisError, AddDiagnosisSuccess])

    const DiagnosisSubmit = () => {
        if (AddDiagnosisSuccess && diagnosisName && Note && PhysicianNm) {
            setModalOpen(false)
            dispatch(setPrescriptionID(AddDiagnosisSuccess?.data?.patient_prescription_id))
            //setSuccessModal(true)
            navigation.navigate('MedStack',{screen:'AddMedication'})
            // setTimeout(() => {
            //     setSuccessModal(false)
      
            //     onPress()
            // }, 1500)
        }
        else if (AddDiagnosisError && Note && PhysicianNm && PreDate && diagnosisName) {
            setModalOpen(false)
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
        
            }, 1500)
        }
    }

    //console.log("PRE DATE............................",AddDiagnosisSuccess?.data?.patient_prescription_id,AddDiagnosisSuccess[0]?.patient_prescription_id)

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalOpen}
            onRequestClose={() => {
                setModalOpen(!ModalOpen)
            }}>
            <View style={styles.mainContainer} >
                <View style={styles.viewMain}>

                    <View style={styles.rowView}>
                        <View style={styles.medView}>
                            <Text style={styles.textAddMed}>Add Diagnosis</Text>
                        </View>

                        <TouchableOpacity onPress={() => setModalOpen(false)}>
                            <Close />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewSub}>
                        <Text style={styles.textSub}>Add your Diagnosis details here.</Text>

                        <Text style={styles.subHeading}>Diagnosis Name</Text>
                    </View>


                    <View style={DEFAULTSTYLES.alignView}>
                        <TextInput
                            placeholder="Search here..."
                            value={diagnosisName}
                            placeholderTextColor={PLACEHOLDERCOLOR1}
                            onChangeText={handleSearchDiagnosis}
                            style={[styles.textInput, { borderColor: brandStatus ? BORDERCOLOR4 : VALIDCOLOR, textTransform: 'capitalize' }]}
                        />
                    </View>
                    {DiagnosisData?.length > 0 && (
                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={styles.dropdown}>
                                <FlatList
                                    data={DiagnosisData}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.item}
                                            onPress={() => handleSelectDiagnosis(item)}
                                        >
                                            <Text style={styles.textMed}>{item?.MedicalConditionDescShort}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>)}

                    
                        {!brandStatus && (
                                    <View style={{ marginLeft: GlobalSize(20) }}>
                            <Text style={{ color: VALIDCOLOR }}>Diagnosis name is required</Text>
                            </View>
                        )}
                    


                    <View style={styles.viewFreq}>
                        <View>
                            <Text style={[styles.subHeading, { left: GlobalSize(18), marginBottom: 9 }]}>Physician Name</Text>

                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={PhysicianRef}
                                    value={PhysicianNm}
                                    onChangeText={(text) => handlePhyChange(text)}
                                    style={[styles.textInput, { borderColor: PhysicianStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                            </View>


                            {!PhysicianStatus && (
                                <View style={{ marginLeft: GlobalSize(20) }}>
                                    <Text style={{ color: VALIDCOLOR }}>Physician is required</Text>
                                </View>
                            )}

                        </View>

                        <View>
                            <Text style={[styles.subHeading, { left: GlobalSize(18), marginBottom: GlobalSize(10) }]}>Prescribed Date</Text>

                            <View style={DEFAULTSTYLES.alignView}>
                                <View style={[styles.textInput, {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    borderColor: DateStatus ? BORDERCOLOR4 : VALIDCOLOR,
                                    justifyContent: 'space-between',
                                }]}>
                                    <Text ref={DateRef} style={styles.PreDate}>{PreDate}</Text>
                                    <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ padding: 5 }}>
                                        <CalenderLine />
                                    </TouchableOpacity>
                                </View>
                            </View>


                            {!DateStatus && (
                                <View style={{ marginLeft: GlobalSize(20) }}>
                                    <Text style={{ color: VALIDCOLOR }}>Date is required</Text>
                                </View>
                            )}

                        </View>

                  

                    </View>

                    <View style={styles.btnFlex}>
                        <TouchableOpacity
                            style={[styles.btnView, { opacity: PhysicianNm && PreDate ? 1 : 0.5 }]}
                            onPress={() => {  PhysicianNm && PreDate ? OnSubmitDiagnosis(): console.log("he;p") }}>
                            <Text style={styles.textBtn}>Submit</Text>
                            {AddDiagnosisLoading &&
                            <ActivityIndicator size={20} color={BACKGROUNDWHITE}/>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />


            <ErrorPopup
                Message={'Diagnosis not added'}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal} />

            <SuccessPopup
                Message={'Diagnosis addedd Successfully'}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableStyle: {
        flex: 1,
        height: Dimensions.get('window').height,
    },
    centeredView2: {
        justifyContent: "flex-end",
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: GlobalSize(10),
        paddingTop: DEFAULTWIDTH * 0.05,
        backgroundColor: PUREWHITE,
        paddingBottom: GlobalSize(5)
    },
    medView: {
        marginLeft: DEFAULTWIDTH * 0.05,
    },
    btnFlex: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(25)
    },
    textAddMed: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        fontSize: fontSize(18)
    },
    textSub: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        marginTop: GlobalSize(10),
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: GlobalSize(15)
    },
    PreDate: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
    },
    btnView: {
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(8),
        flexDirection:'row',
        marginBottom: DEFAULTWIDTH * 0.04
    },
    btnManual: {
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(8),
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        marginBottom: DEFAULTWIDTH * 0.04
    },
    textBtn: {
        fontSize: fontSize(16),
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
        left:-5
    },
    viewSub: {
        marginHorizontal: GlobalSize(18),
        marginBottom: DEFAULTWIDTH * 0.025
    },
    subHeading: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR7,
        marginTop: GlobalSize(10)
    },
    textInput: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        paddingRight: GlobalSize(10),
        fontWeight: '400',
        color: TEXTCOLOR7,
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.13,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        //marginTop: GlobalSize(10),
        paddingLeft: GlobalSize(10)
    },
    dropdown: {
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        borderRadius: 8,
        width: DEFAULTWIDTH * 0.80,
        marginTop: GlobalSize(10),
        position: 'relative',
    },
    textMed: {
        fontSize: fontSize(12),
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        textTransform: 'capitalize',
        padding: GlobalSize(15)
    },

});

export default AddDiagnosisModal;
