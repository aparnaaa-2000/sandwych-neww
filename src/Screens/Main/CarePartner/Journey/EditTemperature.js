import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Keyboard,ActivityIndicator } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE,PRIMARYCOLOR } from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import StatsTextInput from '../../../../Components/CarePartner/PatientJourney/StatsTextInput'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import EditButton from '../../../../Components/Common/Buttons/EditButton'
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

//IMPORT REDUX COMPONENTS
import { AddStatsClear } from '../../../../redux/Slice/PatientProfile/AddStatsKey'
import { getIndividualStats, OnAddStats } from '../../../../redux/Thunk/PatientProfileThunk'


const EditTemperature = ({ navigation }) => {

    const dispatch = useDispatch()
    const [inputTemp, setInputTemp] = useState(null)
    const [selectUnit, setSelectUnit] = useState(1)
    const [UnitName, setUnitName] = useState('°C')
    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)
    const [PatientId, setPatientId] = useState(null)
    const [token, setToken] = useState(null)

    const stats_type = "2";

    const { data, errors, Loading,getStatsData,getStatsError,getStatsLoading} = useSelector(
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
            unit: '°C'
        },
        {
            id: 2,
            unit: '°F'
        }
    ]

    useEffect(() => {
        getData().then(data => {
            setPatientId(data?.patientData?.patient_id)
            setToken(data?.storedValue)

        });
        OnAfterAddStats()
    }, [data, errors, Loading]);


    const OnAfterAddStats = () => { //FUNCTION FOR CALLING THE API AFTER ADDING THE TEMP
        if (data && inputTemp) {
            setMessage('Patient temperature added successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                navigation.navigate('Journey')
            }, 2000)

            dispatch(AddStatsClear())
        } else if (errors && inputTemp) {
            setMessage('An error occured')
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
            }, 2000)
            dispatch(AddStatsClear())
        }
    }

    useEffect(() => {
        if (PatientId && token) { //FUNCTION FOR GETTING THE TEMP LIST
            getIndividualStats(PatientId, stats_type, token, dispatch);
        }
    }, [PatientId, token, stats_type, dispatch]);

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


    const OnAddtats = () => { //FUNCTION FOR ADDING THE TEMP TO THE API
        OnAddStats(PatientId, stats_type,`${inputTemp} ${UnitName}`, token, dispatch)
    }

    const SelectUnit = (UnitName, ItemId) => { //FUNCTION FOR SELECTING THE UNIT
        Keyboard.dismiss()
        setSelectUnit(ItemId)
        setUnitName(UnitName)
        if (UnitName == '°C' && inputTemp) {

            setInputTemp(fahrenheitToCelsius().toFixed(0));

        } else if (UnitName == '°F' && inputTemp) {

            setInputTemp(celsiusToFahrenheit().toFixed(0));
        }
    }


    // Function to convert degrees Celsius to degrees Fahrenheit
    const celsiusToFahrenheit = () => {
        return (inputTemp * 9) / 5 + 32;
    };

    // Function to convert degrees Fahrenheit to degrees Celsius
    const fahrenheitToCelsius = () => {
        return ((inputTemp - 32) * 5) / 9;
    };


    //EDIT WEIGHT VALIDATION
    const handleEditChange = (text) => {
        setInputTemp(text);
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
                    title={'Temperature'}
                    navigation={navigation} />

                <StatsTextInput
                    Data={getStatsData?.$patient_stats}
                    value={inputTemp}
                    placeholder={'Add Temperature'}
                    Unit={'°C'}
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
                    value={inputTemp}
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
    },
})

export default EditTemperature;