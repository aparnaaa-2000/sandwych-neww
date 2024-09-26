import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from "../../../../Constants/Colors/Colors";
import { FONTS } from "../../../../Constants/Fonts";
import ImagePicker from 'react-native-image-crop-picker';
import { DEFAULTWIDTH } from "../../../../Constants/styles/styles";
import { Close } from "../../../../../assets";
import { GlobalSize, fontSize } from "../../../../Constants/ResponsiveFont/ResponsiveFonts";
import AddDiagnosisModal from "../Modal/AddDiagnosisModal";
import { UploadMedication } from "../../../../redux/Thunk/MedicationThunk";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ErrorPopup from "../../../ComingSoonPopup/ErrorPopup";
import SuccessPopup from "../../../ComingSoonPopup/Successpopup";


const MedModal = ({ ModalOpen, setModalOpen, navigation, onPress }) => {

    const dispatch = useDispatch()
    const [ImagePath, setImagePath] = useState()
    const [DgModal, setDgModal] = useState(false)
    const [UserData, setUserData] = useState(null)


    useEffect(() => {
        getData().then(data => {
            setUserData(data)
        });
    }, []);

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');

            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null,
                patientData: null
            };
        }
    };


    const ScanBottleLabel = () => { // Upload Prescription using camera
        setModalOpen(false)
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            useFrontCamera: false
        }).then((image) => {
            setImagePath(image)
            console.log("IMAGE................", image)
             UploadMedication(UserData?.patientData?.patient_id,image,UserData?.storedValue,dispatch)
        }).catch((error) => {
            console.log(error);
        });
    }

    const UploadGallery = () => { // Upload Prescription from gallery
        setModalOpen(false)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setImagePath(image)
            console.log("IMAGE................", image)
             UploadMedication(UserData?.patientData?.patient_id,image,UserData?.storedValue,dispatch)
        });
    }


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
                            <Text style={styles.textAddMed}>Add Medication</Text>
                        </View>

                        <TouchableOpacity onPress={() => setModalOpen(false)}>
                            <Close />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewSub}>
                        <Text style={styles.textSub}>Use your bottle label to scan or manually enter medication details </Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.btnView} onPress={() => ScanBottleLabel()}>
                            <Text style={styles.textBtn}>Scan Bottle Label</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnManual} onPress={() => UploadGallery()}>
                            <Text style={[styles.textBtn, { color: TEXTCOLOR7 }]}>Upload From Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnManual} onPress={onPress}>
                            <Text style={[styles.textBtn, { color: TEXTCOLOR7 }]}>Manually Enter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <AddDiagnosisModal
                navigation={navigation}
                ModalOpen={DgModal}
                setModalOpen={setDgModal} />

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
    btnView: {
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(8),
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
    },
    viewSub: {
        marginHorizontal: GlobalSize(18),
        marginBottom: DEFAULTWIDTH * 0.05
    }

});

export default MedModal;
