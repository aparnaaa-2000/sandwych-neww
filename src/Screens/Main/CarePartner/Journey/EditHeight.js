import React, { useState, useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView, Keyboard,ActivityIndicator } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors'
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'
import StatsTextInput from '../../../../Components/CarePartner/PatientJourney/StatsTextInput'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import EditButton from '../../../../Components/Common/Buttons/EditButton'

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

//IMPORT API AND SLICE KEYS
import { AddStatsClear } from '../../../../redux/Slice/PatientProfile/AddStatsKey'
import { getIndividualStats, OnAddStats } from '../../../../redux/Thunk/PatientProfileThunk'

const EditHeight = ({ navigation }) => {

    const dispatch = useDispatch()
    const [Height, setHeight] = useState(null)
    const [inputHeight, setInputHeight] = useState(null)
    const [selectUnit, setSelectUnit] = useState(1)
    const [UnitName, setUnitName] = useState('cm')

    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)
    const [PatientId, setPatientId] = useState(null)
    const [token, setToken] = useState(null)

    const stats_type = "0";

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

    const OnAfterAddStats = () => { //FUNCTION FOR UPDATING THE API STATUS AFTER UPDATING
        if (data && Height) {
            setMessage('Patient Height added successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                navigation.navigate('Journey')
            }, 2000)

            dispatch(AddStatsClear())
        } else if (errors && Height) {
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


    const OnAddtats = () => { //FUNCTION FOR ADDING THE HEIGHT TO THE API
    
       OnAddStats(PatientId,stats_type,`${Height} ${UnitName}`, token, dispatch)
    }

    const SelectUnit = (UnitName, ItemId) => { //FUNCTION FOR SELECTING THE UNIT
        Keyboard.dismiss()
      
        setSelectUnit(ItemId)
        setUnitName(UnitName)
        if (UnitName == 'ft' && inputHeight) {
            convertCmToFt()
        } else if (UnitName == 'cm' && inputHeight) {
            convertFtToCm()
        }
    }

    // Function to convert centimeters to feet
    const convertCmToFt = () => {
        const cmValue = parseFloat(Height ? Height : inputHeight);
        const ftValue = cmValue / 30.48; // 1 foot = 30.48 cm
        setHeight(ftValue.toFixed(0)); // Round to 2 decimal places

    };

    // Function to convert feet to centimeters
    const convertFtToCm = () => {
        const ftValue = parseFloat(Height ? Height : inputHeight);
        const cmValue = ftValue * 30.48; // 1 foot = 30.48 cm
        setHeight(cmValue.toFixed(0)); // Round to 2 decimal places
        console.log("cm value......................", inputHeight)
    };


    const Unit = [
        {
            id: 1,
            unit: 'cm'
        },
        {
            id: 2,
            unit: 'ft'
        }
    ]


    //EDIT HEIGHT VALIDATION
    const handleEditChange = (text) => {
        setInputHeight(text);
        setHeight(text);
    };

    return (

        <>
        {getStatsLoading ? 
            <View style={styles.loadContainer}>
                <ActivityIndicator size={30} color={PRIMARYCOLOR}/>
            </View>:

        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} >
                <SubHeader
                    title={'Height'}
                    navigation={navigation} />

                <StatsTextInput
                    UnitData={Unit}
                    Data={getStatsData?.$patient_stats}
                    value={Height}
                    placeholder={'Add Height'}
                    Unit={'ft'}
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
                    value={inputHeight}
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

export default EditHeight;