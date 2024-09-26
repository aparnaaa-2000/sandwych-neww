import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Platform, ScrollView, Image } from 'react-native'
import { BACKGROUNDWHITE, BORDERCOLORSUPPORT, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLORG } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import { AVALONG } from '../../../../Constants/DummyImages'
import { FONTS } from '../../../../Constants/Fonts'
import { Account, BlueStar, GreenFace } from '../../../../../assets'
import SupportRequestModal from '../../../../Components/Common/Modal/SupportRequestModal';
import { GlobalSize, height, width } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';
import { SupportMemberRequest } from '../../../../redux/Thunk/SupportThunk';
import { supportInprocessClear } from '../../../../redux/Slice/Support/SupportInprocessKey';
import { supportMemberReqClear } from '../../../../redux/Slice/Support/SupportMemberRequestKey';

const SupportPersonList = ({ navigation, route }) => {

   
    const dispatch = useDispatch()
    const support_id = route?.params?.support_id;
    const patient_id = route?.params?.patient_id;
    const zipcode = route?.params?.zipcode;
    const Location = route?.params?.Location;
    const note = route?.params?.Note;
    const ScheduleDate = route?.params?.ScheduleDate;
    const ScheduleTime = route?.params?.ScheduleTime;


    const supportListData = route?.params?.support_members;
    const [ModalOpen, setModalOpen] = useState(false)
    const [userData, setUserData] = useState(null)
    const [imageErrors, setImageErrors] = useState({});
    const [SupportMemberId, setSupportMemberId] = useState(null)
    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)

    const { data, errors, Loading } = useSelector(
        state => ({
            data: state.supportMemberRequest.data,
            errors: state.supportMemberRequest.error,
            Loading: state.supportMemberRequest.isLoading
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(supportMemberReqClear());
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

    // Handle image load errors
    const handleImageError = (index) => {

        setImageErrors((prevErrors) => ({
            ...prevErrors,
            [index]: true,
        }));
    };

    useEffect(() => {
        if (SupportMemberId) {
    
            OnSupportList()
        }
    }, [data, errors,SupportMemberId])
console.log("ERRORS...................",errors,data,SupportMemberId)
    const OnSupportList = () => {
        console.log("API CALL")
        if (data && Location && ScheduleDate && ScheduleTime && note && zipcode) {
            console.log("API SUCCESS", data)
            setModalOpen(false)
            setMessage('Support requested successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                
                navigation.navigate('LandingScreen');
                dispatch(supportMemberReqClear());
            }, 1500)

        }
        else if (errors && Location && ScheduleDate && ScheduleTime && note && zipcode) {
            console.log("ERROR.............", errors)
            setModalOpen(false)
            setMessage('Request not sent')
            setErrorModal(true)
            setTimeout(() => {

                setErrorModal(false)
                dispatch(supportMemberReqClear());
            }, 2000)
        }

    }


    const OnRequestSupport = () => {

        console.log("ON REQUEST SUPPORT...........",
            support_id, patient_id, ScheduleDate, ScheduleTime, note, zipcode, Location,SupportMemberId)
       SupportMemberRequest(support_id, patient_id, ScheduleDate, ScheduleTime, note, zipcode, Location, SupportMemberId, userData?.storedValue, dispatch)

    }

   

    const renderItem = ({ item, index }) => {
        console.log("SUPPORT LIST DATA................",item)
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('SupportDetail',
                     { item: item,
                        support_id:support_id,
                        patient_id:patient_id,
                        ScheduleDate: ScheduleDate, 
                        ScheduleTime:ScheduleTime, 
                        Note:note,
                        zipcode: zipcode,
                        Location: Location,
                     })}
                style={[
                    styles.cardView,
                    Platform.OS == 'android' ?
                        DEFAULTSTYLES.androidShadow :
                        DEFAULTSTYLES.iosShadow]}>

                <View style={styles.viewAlign}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: 10 }}>
                            {item?.profile !== null ?
                                <Image
                                    source={{ uri: item?.profile }}
                                    style={styles.imageV}
                                    onError={() => handleImageError(index)} /> :

                                <Account width={60} height={60} />}
                        </View>

                        <View>
                            <Text style={[styles.textValue, { fontSize: 15 }]}>{item?.name}, {item?.gender == 1 ? 'F' : 'M'}</Text>
                            <Text style={styles.textKey}>{item?.address}</Text>

                            <View style={{ marginTop: 5 }}>
                                <GreenFace width={22} height={22} />
                            </View>

                        </View>

                    </View>

                </View>
                <View style={styles.lineBorder} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View>
                        <Text style={styles.textKey}>Overall Rating</Text>
                        <Text style={styles.textValue}>50%</Text>
                    </View>

                    <View>
                        <Text style={styles.textKey}>Response Rating</Text>
                        <Text style={styles.textValue}>Average</Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => { setModalOpen(true), setSupportMemberId(item?.id) }}
                            style={styles.btnView}>
                            <Text style={styles.textBtn}>Request Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <ResourceHeader title={'Support'} navigation={navigation} />

            <View style={DEFAULTSTYLES.alignView}>
                <FlatList
                    data={supportListData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem} />
            </View>

            <SupportRequestModal
                ModalOpen={ModalOpen}
                OnRequestSupport={OnRequestSupport}
                title={'Are you sure you want to confirm this support'}
                setModalOpen={setModalOpen}
                navigation={navigation} />

            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal} />

            {/* <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal}
            /> */}
        </SafeAreaView>
    )
}

export default SupportPersonList

const styles = StyleSheet.create({
    cardView: {
        width: DEFAULTWIDTH * 0.86,
        backgroundColor: PUREWHITE,
        borderRadius: 8,
        marginBottom: GlobalSize(10),
        margin: GlobalSize(2),
        padding: GlobalSize(18)
    },
    textKey: {
        fontSize: GlobalSize(12),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORG
    },
    textValue: {
        fontSize: GlobalSize(13),
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        textAlign: 'center'
    },
    lineBorder: {
        width: DEFAULTWIDTH * 0.76,
        height: 1,
        backgroundColor: BORDERCOLORSUPPORT,
        marginBottom: DEFAULTHEIGHT * 0.02,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    btnView: {
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: GlobalSize(5),
        width: DEFAULTWIDTH * 0.2
    },
    viewAlign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTHEIGHT * 0.025,
        alignItems: 'center'
    },
    imageV: {
        width: GlobalSize(70),
        height: GlobalSize(70),
        borderRadius: GlobalSize(35)
    }
})