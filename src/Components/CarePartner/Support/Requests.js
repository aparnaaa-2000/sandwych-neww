import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image, ScrollView } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, NINETHCOLOR, PRIMARYCOLOR, PUREBLACK, PUREWHITE, SEVENTHCOLOR, TEXTCOLORG, PLACEHOLDERCOLOR3, BACKGROUNDBLUE } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { supportInprocessClear } from '../../../redux/Slice/Support/SupportInprocessKey'
import { NearBySupportRequestAcceptReject, NearBySupportRequestList } from '../../../redux/Thunk/SupportThunk'
import { Account } from '../../../../assets'
import SuccessPopup from "../../ComingSoonPopup/Successpopup";
import ErrorPopup from "../../ComingSoonPopup/ErrorPopup";
import { supportAcceptClear } from '../../../redux/Slice/Support/SupportAcceptKey';
const Requests = ({ navigation }) => {

    const dispatch = useDispatch()
    const [userData, setUserData] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [Message, setMessage] = useState(null)
    const [ErrorModal, setErrorModal] = useState(false)

    const { data, error, isLoading, supportAcceptData, supportAcceptError } = useSelector(
        state => ({
            data: state.NearBySupportRequestList.data,
            error: state.NearBySupportRequestList.error,
            isLoading: state.NearBySupportRequestList.isLoading,
            supportAcceptData: state.supportAccept.data,
            supportAcceptError: state.supportAccept.error,
            supportIsLoading: state.supportAccept.isLoading
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(supportInprocessClear())
        getData().then(data => { //FUNCTION FOR GETTING THE INPROCESS DATA
            setUserData(data)
            NearBySupportRequestList(data?.patientData?.patient_id, data?.storedValue, dispatch)
        });
    }, []);

    useEffect(() => {
        NearBySupportResponse()
    }, [supportAcceptData, supportAcceptError])



    const NearBySupportResponse = () => {
        if (supportAcceptData) {
            setMessage(supportAcceptData?.status)
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                dispatch(supportAcceptClear());
            }, 1500)
        } else if (supportAcceptError) {
            setMessage('Support request not updated!')
            setErrorModal(true)
            setTimeout(() => {
                setErrorModal(false)
                dispatch(supportAcceptClear());
            }, 1500)
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



    const OnSupportAccept = (RejectId, SupportId, RequestStatus) => {
        NearBySupportRequestAcceptReject(
            userData?.patientData?.patient_id,
            RejectId,
            SupportId,
            RequestStatus,
            userData?.storedValue,
            dispatch)
    }

    return (
        <>
            {isLoading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :
                <>
                    {data ?
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.viewMain}>

                            {data?.map((item) => {
                                console.log("support request...................", item?.rejected_support_details)
                                return (
                                    <TouchableOpacity
                                        //onPress={() => navigation.navigate('InprocessDetails',
                                        // { status: item?.Status, inProcessData: item })}
                                        style={[styles.cardView,
                                        Platform.OS == 'android' ?
                                            DEFAULTSTYLES.androidShadow :
                                            DEFAULTSTYLES.iosShadow]}>



                                        <View style={styles.subRow}>
                                            <View style={{ marginRight: GlobalSize(10) }}>
                                                <Account width={55} height={55} />
                                            </View>

                                            <View>
                                                <Text style={styles.textName}>{item?.support_member_details?.name}</Text>
                                                <Text style={styles.textKey}>{item?.support_member_details?.email}</Text>
                                                <Text style={styles.textKey}>{item?.support_member_details?.phonenumber}</Text>
                                            </View>
                                        </View>

                                        {item?.rejected_support_details?.map((item) => {
                                            return (
                                                <View style={{ flexDirection: 'row', marginBottom: GlobalSize(5) }}>

                                                    <View style={{ backgroundColor: BACKGROUNDBLUE }}></View>
                                                    <Image
                                                        source={require('../../../../assets/Images/AbilityToHelp1/Transportation.png')}
                                                        // source={{ uri: item?.image }}
                                                        style={{ width: GlobalSize(50), height: GlobalSize(50) }} />

                                                    <View style={{ marginLeft: GlobalSize(10) }}>
                                                        <Text style={[styles.textName, { color: PRIMARYCOLOR }]}>{item?.support}</Text>
                                                        <Text style={[styles.textKey, { color: PRIMARYCOLOR, left: 2 }]}>{item?.functional_abilities == '0' ? 'IADL' : 'ADL'}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })}

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>

                                            <View>
                                                <TouchableOpacity style={styles.btnAccept}
                                                    onPress={() => OnSupportAccept(item?.rejected_request_details?.rejected_request_id,
                                                        item?.rejected_request_details?.support_request_id, '0')}>
                                                    <Text style={[styles.textName, { color: PUREWHITE, marginBottom: 0 }]}>Accept</Text>
                                                </TouchableOpacity>
                                            </View>


                                            <View>
                                                <TouchableOpacity style={[styles.btnAccept, { backgroundColor: NINETHCOLOR }]}
                                                    onPress={() => OnSupportAccept(item?.rejected_request_details?.rejected_request_id,
                                                        item?.rejected_request_details?.support_request_id, '1')}>
                                                    <Text style={[styles.textName, { color: PUREWHITE, marginBottom: 0 }]}>Reject</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })}

                        </View>
                        </ScrollView> :
                        <View style={[DEFAULTSTYLES.alignView, { marginTop: GlobalSize(160) }]}>
                            <Image
                                source={require('../../../../assets/Images/no-data.png')}
                                style={{ width: GlobalSize(120), height: GlobalSize(120) }} />

                            <Text style={styles.textNo}>No Data Found !</Text>
                        </View> 
                        
                        } 
                        
                </>}

            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal} />

            <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal}
            />
        </>
    )
}

export default Requests;

const styles = StyleSheet.create({
    viewMain: {
        paddingTop: DEFAULTHEIGHT * 0.026,
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center'
    },
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textNo: {
        fontSize: fontSize(14),
        color: PLACEHOLDERCOLOR3,
        fontFamily: FONTS.FontRegular,
        margin: GlobalSize(20)
    },
    cardView: {
        width: DEFAULTWIDTH * 0.9,
        padding: GlobalSize(15),
        backgroundColor: PUREWHITE,
        borderRadius: 8,
        marginBottom: GlobalSize(15)
    },
    textName: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(14),
        marginBottom: GlobalSize(6)
    },
    textKey: {
        fontSize: fontSize(11),
        color: TEXTCOLORG,
        fontFamily: FONTS.FontRegular,
        marginBottom: GlobalSize(2)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: GlobalSize(1),
        alignItems: 'center'
    },
    textStatus: {
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(12)
    },
    btnAccept: {
        backgroundColor: SEVENTHCOLOR,
        width: DEFAULTWIDTH * 0.22,
        height: GlobalSize(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(5),
        marginRight: GlobalSize(10),
        marginLeft: GlobalSize(10)
    },
    subRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(15),
        borderWidth: 1,
        padding: GlobalSize(10),
        borderRadius: 8,
        borderColor: PLACEHOLDERCOLOR3
    }
})