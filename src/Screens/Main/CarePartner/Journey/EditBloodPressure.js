import React, { useState,useEffect } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View, ScrollView,ActivityIndicator } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PRIMARYCOLOR} from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import StatsTextInput from '../../../../Components/CarePartner/PatientJourney/StatsTextInput'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import EditButton from '../../../../Components/Common/Buttons/EditButton'
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'

//IMPORT THIRD-PARTY PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AddStatsClear } from '../../../../redux/Slice/PatientProfile/AddStatsKey'
import { getIndividualStats, OnAddStats } from '../../../../redux/Thunk/PatientProfileThunk'

const EditBloodPressure = ({ navigation }) => {

    const dispatch = useDispatch()

    const [PatientId, setPatientId] = useState(null)
    const [UnitName, setUnitName] = useState('mm Hg')
    const [token, setToken] = useState(null)
    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)
    const [inputPressure, setInputPressure] = useState(false)

    
    const stats_type = "3";

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
        if (PatientId && token) { //FUNCTION FOR GETTING INDIVIDUAL STATS
            getIndividualStats(PatientId, stats_type, token, dispatch);
        }
    }, [PatientId, token, stats_type, dispatch]);

    const OnAfterAddStats = () => { 
        if (data && inputPressure) {
            setMessage('Patient Blood pressure added successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                navigation.navigate('Journey')
            }, 2000)

            dispatch(AddStatsClear())
        } else if (errors && inputPressure) {
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

    const OnAddtats = () => { //FUNCTION FOR ADDING THE STATS
        OnAddStats(PatientId, stats_type,`${inputPressure} ${UnitName}`, token, dispatch)
    }

    return (
<>
        {getStatsLoading ? 
            <View style={styles.loadContainer}>
                <ActivityIndicator size={30} color={PRIMARYCOLOR}/>
            </View>:

        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <SubHeader
                    title={'Blood Pressure'}
                    navigation={navigation} />

                <StatsTextInput
                    Data={getStatsData?.$patient_stats}
                    value={inputPressure}
                    placeholder={'Add blood pressure'}
                    Unit={'mm Hg'}
                    onChangeText={(text) => setInputPressure(text)}
                />

            </ScrollView>

            <View style={styles.buttonContainer}>
                <EditButton
                    navigation={navigation}
                    onPress={OnAddtats}
                    value={inputPressure}
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

        </SafeAreaView>
}</>
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
    }
})

export default EditBloodPressure;