import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5, TEXTCOLOR8 } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import {DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { StoreDrugInteraction } from '../../../redux/Thunk/MedicationThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoreDrugInteractionClear } from '../../../redux/Slice/Medication/StoreDrugInteraction';

const ConfirmDrug4 = ({ navigation }) => {

    const dispatch = useDispatch()
    const DrugID = useSelector((state) => state?.storeMedData?.MedID);
    const [userData,setUserData] = useState(null)
    console.log("DRUG ID",DrugID)
    const {
        StoreDrugInteractionSuccess,
        StoreDrugInteractionError } = useSelector(
            state => ({
            
                StoreDrugInteractionSuccess: state.StoreDrugInteraction.data,
                StoreDrugInteractionError: state.StoreDrugInteraction.error,
                StoreDrugInteractionisLoading: state.StoreDrugInteraction.isLoading

            }),
            shallowEqual
        );

        console.log("MED ID.........................",DrugID)

        useEffect(() => {
        dispatch(StoreDrugInteractionClear())
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

       
    const StoreDrugInteractionAPI = () => {
        if(DrugID?.length > 1){
        StoreDrugInteraction(userData?.patientData?.patient_id,DrugID, userData?.storedValue, dispatch)
        }else{
            navigation.navigate('ConfirmDrug5')
        }
    }
console.log("STORE DRUG.............",StoreDrugInteractionSuccess,StoreDrugInteractionError)
    useEffect(() =>{
        if(StoreDrugInteractionSuccess){
            navigation.navigate('ConfirmDrug5')
            dispatch(StoreDrugInteractionClear())
        }else{
            dispatch(StoreDrugInteractionClear())
        }
    },[StoreDrugInteractionSuccess])

    return (
        <SafeAreaView style={{ backgroundColor:BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
{/* 
                    <TouchableOpacity style={{ margin: GlobalSize(15) }} onPress={() => navigation.goBack()}>
                        <Text style={styles.textBack}>Back</Text>
                    </TouchableOpacity> */}

                    <View style={styles.viewMain}>
                        <View style={styles.viewConfirm}>
                            <Text style={styles.textConfirm}>Confirm Drug-Drug Interaction</Text>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15), marginHorizontal: GlobalSize(10) }}>
                            <Text style={styles.supText}>No significant drug-to-drug interactions were found between the medication entered.</Text>
                        </View>

                        <View>
                            <Text style={styles.supText}>Continue to Save medication.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnView} onPress={() =>StoreDrugInteractionAPI()}>
                    <Text style={styles.textBtn}>Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:BACKGROUNDWHITE,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textConfirm: {
        fontSize: fontSize(18),
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR10,
    },
    supText: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR8,
        textAlign: 'center',
        lineHeight: GlobalSize(20)
    },
    textBtn: {
        fontSize: fontSize(16),
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',

    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bottom:DEFAULTWIDTH*0.1,
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(10),
    },
    textBack: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR5,
    },
    viewMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:DEFAULTWIDTH * 0.65
    },
    viewConfirm: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(10)
    }
});

export default ConfirmDrug4;
