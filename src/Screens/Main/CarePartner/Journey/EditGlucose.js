import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Keyboard ,ActivityIndicator} from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import StatsTextInput from '../../../../Components/CarePartner/PatientJourney/StatsTextInput'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import EditButton from '../../../../Components/Common/Buttons/EditButton'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'

//IMPORT THIRD-PARTY PACKAGE
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AddStatsClear } from '../../../../redux/Slice/PatientProfile/AddStatsKey'
import { getIndividualStats, OnAddStats } from '../../../../redux/Thunk/PatientProfileThunk'


const EditGlucose = ({ navigation }) => {

    const Unit = [
        {
            id: 1,
            unit: 'mg/dL'
        },
        {
            id: 2,
            unit: 'mmol/L'
        }
    ]

    const dispatch = useDispatch()
    const [inputGlucose, setInputGlucose] = useState(null)
    const [selectUnit, setSelectUnit] = useState(1)
    const [UnitName, setUnitName] = useState('mg/dl')
    const [PatientId, setPatientId] = useState(null)
    const [token, setToken] = useState(null)
    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)

    const stats_type = "4";

    const { data, errors, Loading, getStatsData, getStatsError, getStatsLoading } = useSelector(
        state => ({
            data: state.AddStats.data,
            errors: state.AddStats.error,
            Loading: state.AddStats.isLoading,
            getStatsData: state.getIndividualStats.data,
            getStatsError: state.getIndividualStats.error,
            getStatsLoading: state.getIndividualStats.isLoading
        }),
        shallowEqual
    );

    useEffect(() => {
        getData().then(data => {
            setPatientId(data?.patientData?.patient_id)
            setToken(data?.storedValue)
    
        });

        OnAfterAddStats() 
    }, [data, errors, Loading]);
   

    useEffect(() => {
        if (PatientId && token) { //FUNCTION FOR CALLING THE GLUCOSE LIST API
            getIndividualStats(PatientId, stats_type, token, dispatch);
        }
    }, [PatientId, token, stats_type, dispatch]);

    const OnAfterAddStats = () => { //FUNCTION AFTER UPDATION
        if (data && inputGlucose) {
            setMessage('Patient Glucose level added successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                navigation.navigate('Journey')
            }, 2000)

            dispatch(AddStatsClear())
        } else if (errors && inputGlucose) {
            setMessage('An error occured')
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
            }, 2000)
            dispatch(AddStatsClear())
        }
    }

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

    const OnAddtats = () => { //FUNCTION FOR ADDING THE GLUCOSE STATS
        OnAddStats(PatientId, stats_type,`${inputGlucose} ${UnitName}`, token, dispatch)
    }

    const SelectUnit = (UnitName, ItemId) => { //FUNCTION FOR SELECTING THE UNITS
        Keyboard.dismiss()
        setSelectUnit(ItemId)
        setUnitName(UnitName)

        if (UnitName == 'mg/dL' && inputGlucose) {
            setInputGlucose(mmolToMg())
        } else if (UnitName == 'mmol/L' && inputGlucose) {
            setInputGlucose(mgToMmol())
        }
    }

    //EDIT GLUCOSE VALIDATION
    const handleEditChange = (text) => {
        setInputGlucose(text);
    };

    // Convert mg/dL to mmol/L
    const mgToMmol = () => {
        return (inputGlucose / 18.01559).toFixed(2); // 1 mg/dL = 0.0555 mmol/L
    };

    // Convert mmol/L to mg/dL
    const mmolToMg = () => {
        return (inputGlucose * 18.01559).toFixed(2); // 1 mmol/L = 18.01559 mg/dL
    };

    return (

        <>
        {getStatsLoading ? 
            <View style={styles.loadContainer}>
                <ActivityIndicator size={30} color={PRIMARYCOLOR}/>
            </View>:

        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}>
                <SubHeader
                    title={'Blood Glucose'}
                    navigation={navigation} />

                <StatsTextInput
                    Data={getStatsData?.$patient_stats}
                    value={inputGlucose}
                    placeholder={'Add blood glucose'}
                    Unit={'mg/dl'}
                    UnitData={Unit}
                    selectUnit={selectUnit}
                    setSelectUnit={setSelectUnit}
                    SelectUnit={SelectUnit}
                    UnitName={UnitName}
                    setUnitName={setUnitName}
                    onChangeText={(text) => handleEditChange(text)}
                />

            </ScrollView>

            <View style={styles.buttonContainer}>
                <EditButton
                    navigation={navigation}
                    onPress={OnAddtats}
                    value={inputGlucose}
                    Loading={Loading} />
            </View>

            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal} />

            <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal} />

        </SafeAreaView>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
    },
    loadContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: GlobalSize(10),
    },

})

export default EditGlucose;