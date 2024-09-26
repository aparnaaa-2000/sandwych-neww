import React, { useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Keyboard ,ActivityIndicator} from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE,  PRIMARYCOLOR } from '../../../../Constants/Colors/Colors'
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import StatsTextInput from '../../../../Components/CarePartner/PatientJourney/StatsTextInput'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import EditButton from '../../../../Components/Common/Buttons/EditButton'
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'

//IMPORT PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { AddStatsClear } from '../../../../redux/Slice/PatientProfile/AddStatsKey'
import { getIndividualStats, OnAddStats } from '../../../../redux/Thunk/PatientProfileThunk'

const EditWeight = ({ navigation }) => {

    const dispatch = useDispatch()
    const [Weight, setWeight] = useState(null)
    const [inputWeight, setInputWeight] = useState(null)
    const [selectUnit, setSelectUnit] = useState(1)
    const [UnitName, setUnitName] = useState('lb')
    const [PatientId, setPatientId] = useState(null)
    const [token, setToken] = useState(null)
    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)

    const stats_type = "1";

    const { data, errors, Loading,getStatsData,getStatsError,getStatsLoading } = useSelector(
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

    const Unit = [
        {
            id: 1,
            unit: 'lb'
        },
        {
            id: 2,
            unit: 'kg'
        }
    ]

    useEffect(() => {
        getData().then(data => {
            setPatientId(data?.patientData?.patient_id)
            setToken(data?.storedValue)
    
        });
        OnAfterAddStats()
    }, [data, errors, Loading]);

    useEffect(() => {
        if (PatientId && token) {
            getIndividualStats(PatientId, stats_type, token, dispatch);
        }
    }, [PatientId, token, stats_type, dispatch]);

    const OnAfterAddStats = () => { //FUNCTION AFTER GETTING THE API RESPONSE
        if (data && inputWeight) {
            setMessage('Patient weight added successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                navigation.navigate('Journey')
            }, 2000)

            dispatch(AddStatsClear())
        } else if (errors && inputWeight) {
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

    const SelectUnit = (UnitName, ItemId) => { //FUNCTION FOR SELECTING THE UNIT
        Keyboard.dismiss()
        setSelectUnit(ItemId)
        setUnitName(UnitName)
        if (UnitName == 'lb' && inputWeight) {
            handleKgToLb()
        } else if (UnitName == 'kg' && inputWeight) {
            handleLbToKg()
        }
    }


    //EDIT WEIGHT VALIDATION
    const handleEditChange = (text) => {
        setInputWeight(text);
        setWeight(text);
    };

    // Function to convert kilograms to pounds
    const kgToLb = (kgValue) => {
        return kgValue * 2.20462;
    };

    // Function to convert pounds to kilograms
    const lbToKg = (lbValue) => {
        return lbValue / 2.20462;
    };

    // Event handler for converting kg to lb
    const handleKgToLb = () => {
        const result = kgToLb(parseFloat(inputWeight));
        setInputWeight(result.toFixed(0));
    };

    // Event handler for converting lb to kg
    const handleLbToKg = () => {
      
        const result = lbToKg(parseFloat(inputWeight));
        setInputWeight(result.toFixed(0))
    };

    const OnAddtats = () => { //FUNCTION FOR ADDING THE WEIGHT TO THE API
        OnAddStats(PatientId,stats_type,`${inputWeight} ${UnitName}`, token, dispatch)
    }


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
                    title={'Weight'}
                    navigation={navigation} />

                <StatsTextInput
                    Data={getStatsData?.$patient_stats}
                    value={inputWeight}
                    UnitData={Unit}
                    placeholder={'Add Weight'}
                    Unit={'kg'}
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
                    value={inputWeight}
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: GlobalSize(10), // Adjust as needed
    },
    loadContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})

export default EditWeight;