import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BACKGROUNDWHITE, LINECOLOR1, PRIMARYCOLOR, PUREWHITE } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import InitialAssessment from '../../../../../Components/CarePartner/Assessments/AssessmentSummary/InitialAssessment'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import Info from '../../../../../Components/CarePartner/Assessments/AssessmentSummary/Info'
import { FONTS } from '../../../../../Constants/Fonts'
import SubmitModal from '../../../../../Components/CarePartner/Assessments/AssessmentSummary/SubmitModal'
import DashboardHeader from '../../../../../Components/Common/Headers/DashboardHeader'
import CustomSidebarMenu from '../../../../../Components/CarePartner/SideMenu/CustomSideMenuBar'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AssessmentSubmit, GetAssessmentSummary} from '../../../../../redux/thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { AssessmentSaveClear } from '../../../../../redux/Slice/Assessment/AssessmentSaveKey'
import { setEditValue } from '../../../../../redux/Slice/ValueStorage/ValueSliceKey'
import { getCareTeam } from '../../../../../redux/Thunk/CareTeamThunk'

const Drawer = createDrawerNavigator();

const AssessmentSummary = () => (
    <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={props => <CustomSidebarMenu {...props} />}
    >
        <Drawer.Screen name="AssessmentSummaryScreen" component={AssessmentSummaryScreen} />
    </Drawer.Navigator>
);

const AssessmentSummaryScreen = ({ navigation }) => {

    const dispatch = useDispatch()
    const [ModalOpen, setModalOpen] = useState(false)
    const [PatientData, setPatientData] = useState()

    const { data, errors, Loading, taskId, CareTeam, editValue,
        assessmentLoading, assessmentSubmitData, assessmenterrors } = useSelector(
            state => ({
                data: state.GetAssessmentSummary.data,
                errors: state.GetAssessmentSummary.error,
                Loading: state.GetAssessmentSummary.isLoading,
                taskId: state.getPageNameValue.task_Id,
                CareTeam: state.getCareTeam.data,
                assessmentSubmitData: state.AssessmentSave.data,
                assessmenterrors: state.AssessmentSave.error,
                assessmentLoading: state.AssessmentSave.isLoading,
                editValue: state.getPageNameValue.editValue
            }),
            shallowEqual
        );

    useEffect(() => {
        getData().then(data => {
            setPatientData(data)
            GetAssessmentSummary(data?.patientData?.patient_id, taskId, data?.storedValue, dispatch) //Function for calling the assessment summary api
            getCareTeam(data?.patientData?.patient_id, data?.storedValue, dispatch); // Function for calling the careteam api

            dispatch(setEditValue(true))


        });

    }, []);

    const SubmitData = () => { //Function for submit the assessment answers to the API
        AssessmentSubmit(PatientData?.patientData?.patient_id, taskId, PatientData?.storedValue, dispatch)
    }

    const getData = async () => { //Function for get the stored value from the AysncStorage
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

    useEffect(() => {
        SubmitNavigation() //Function for handling the api response after submitting the Assessment answers
    }, [assessmentSubmitData])

    const SubmitNavigation = () => {
        if (assessmentSubmitData) {
            setModalOpen(false)
            dispatch(AssessmentSaveClear());
            RemoveData()
            navigation.navigate('LandingScreen');
        } else {
            dispatch(AssessmentSaveClear());
        }
    }

    const RemoveData = () => { //Function for removing the async data
        AsyncStorage.removeItem('PERSONALINFO_ANSWERS');
        AsyncStorage.removeItem('ABOUTPATIENT_ANSWERS');
        AsyncStorage.removeItem('BASICINFO2_ANSWERS');
        AsyncStorage.removeItem('ABOUT_CAREGIVER_ANSWERS');
        AsyncStorage.removeItem('BASICINFO_ANSWERS');
        AsyncStorage.removeItem('SDOH_ANSWERS');
        AsyncStorage.removeItem('CAREGIVINGSYLE_ANSWERS1');
        AsyncStorage.removeItem('CAREGIVINGSYLE_ANSWERS2');
        AsyncStorage.removeItem('OPENEND_ANSWERS');
        AsyncStorage.removeItem('FUNCTIONAL_ABILITIES')
        AsyncStorage.removeItem('TYPEOFASSIST_ANSWERS')

        AsyncStorage.removeItem('BASIC_INFO_TWO')
        AsyncStorage.removeItem('ABOUT_PATIENT_DATA')
        AsyncStorage.removeItem('PERSONALINFO_ANSWERS')
        AsyncStorage.removeItem('DEMOGRAPHICS')
        AsyncStorage.removeItem('ABOUT_CAREGIVER')
        AsyncStorage.removeItem('SDOHARRAY')
        AsyncStorage.removeItem('ADLData')
    }

    console.log("assessment data...............",data,errors)
    return (
        <>
            {Loading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                    <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ padding: GlobalSize(15), paddingTop: 0 }}>
                            <DashboardHeader navigation={navigation} />
                            <View style={styles.lineBorder} />
                            <InitialAssessment navigation={navigation} data={data} edit={true} />
                    
                            <Info CareTeamData={CareTeam} data={PatientData} QuestionData={data?.assessment_details} />


                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.touchBtn} onPress={() => {
                                    AsyncStorage.setItem('EDITVALUE', true),
                                        navigation.navigate('LandingScreen')
                                }
                                }>
                                    <Text style={styles.textBtn}>SAVE & EXIT</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.touchBtn} onPress={() => setModalOpen(true)}>
                                    <Text style={styles.textBtn}>SUBMIT</Text>
                                </TouchableOpacity>

                            </View>

                            <SubmitModal
                                SubmitData={SubmitData}
                                ModalOpen={ModalOpen}
                                title={"Do you want to submit this assessment. Once submitted you wont' be able to edit it ?"}
                                setModalOpen={setModalOpen}
                                navigation={navigation} />

                        </View>
                    </ScrollView>
                </SafeAreaView>}
        </>
    )
}

export default AssessmentSummary;

const styles = StyleSheet.create({
    textBtn: {
        fontSize: fontSize(15),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    touchBtn: {
        marginBottom: GlobalSize(10),
        width: DEFAULTWIDTH * 0.44,
        height: DEFAULTWIDTH * 0.13,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: GlobalSize(20),
    },
    lineBorder: {
        backgroundColor: LINECOLOR1,
        height: GlobalSize(1),
        marginTop: GlobalSize(5),
        margin: DEFAULTWIDTH * 0.0,
        marginBottom: GlobalSize(20),
    },
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

})