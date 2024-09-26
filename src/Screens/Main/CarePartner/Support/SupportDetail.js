import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, ImageBackground, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BACKGROUNDGREEN, BACKGROUNDWHITE, BORDERCOLOR5, BORDERCOLORSUPPORT, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLORG } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { Account, BlackDots, BlueStar, GreenFace } from '../../../../../assets'
import DetailsSupport from '../../../../Components/CarePartner/Support/DetailsSupport'
import { AVALONG } from '../../../../Constants/DummyImages'
import SupportRequestModal from '../../../../Components/Common/Modal/SupportRequestModal'
import { GlobalSize, fontSize, height, width } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import SupportCompletePopup from '../../../../Components/CarePartner/Support/SupportCompletePopup'
import ReviewRatingModal from '../../../../Components/Common/Modal/ReviewRatingModal'
import SupportStatusPopup from '../../../../Components/CarePartner/Support/SupportStatusPopup'
import SupportCancelPopup from '../../../../Components/CarePartner/Support/SupportCancelPopup'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'
import { SupportMemberRequest } from '../../../../redux/Thunk/SupportThunk'
import { supportInprocessClear } from '../../../../redux/Slice/Support/SupportInprocessKey'
import { supportMemberReqClear } from '../../../../redux/Slice/Support/SupportMemberRequestKey'


const SupportDetail = ({ navigation, route }) => {

    const status = route?.params?.status
    const data = route?.params?.item
    const [ModalOpen, setModalOpen] = useState(false)
    const [ModalRequest, setModalRequest] = useState(false)
    const [ModalReview, setModalReview] = useState(false)
    const [ModalStatus, setModalStatus] = useState(false)
    const [ModalCancel, setModalCancel] = useState(false)

    const [SupportMemberId, setSupportMemberId] = useState(null)
    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)
    const [userData, setUserData] = useState(null)

    const dispatch = useDispatch()
    const support_id = route?.params?.support_id;
    const patient_id = route?.params?.patient_id;
    const zipcode = route?.params?.zipcode;
    const Location = route?.params?.Location;
    const note = route?.params?.Note;
    const ScheduleDate = route?.params?.ScheduleDate;

    const ScheduleTime = route?.params?.ScheduleTime;

    const { dataSupport, errors, Loading } = useSelector(
        state => ({
            dataSupport: state.supportMemberRequest.data,
            errors: state.supportMemberRequest.error,
            Loading: state.supportMemberRequest.isLoading
        }),
        shallowEqual
    );

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


    const onYesClicked = () => {
        setModalRequest(false)

        setTimeout(() => {
            setModalReview(true)
        }, 500)
    }

    const onNoClicked = () => {
        setModalRequest(false)

        setTimeout(() => {
            setModalStatus(true)
        }, 500)
    }

    useEffect(() => {
        if (SupportMemberId) {
            console.log("NEED SUPPORT")
            OnSupportList()
        }
    }, [dataSupport, errors])

    const OnSupportList = () => {
        console.log("API CALL")
        if (data && Location && ScheduleDate && ScheduleTime && note && zipcode) {
            console.log("API SUCCESS", data)
            setModalOpen(false)
            setMessage('Support requested successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)
                setSupportMemberId(null)
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
            support_id, patient_id, ScheduleDate, ScheduleTime, note, zipcode, Location,)
        SupportMemberRequest(support_id, patient_id, ScheduleDate, ScheduleTime, note, zipcode, Location, data?.id, userData?.storedValue, dispatch)

    }

    console.log("ITEM......................",data?.supports[0]?.support)
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.headerRow}>
                    <ResourceHeader title={'Support'} navigation={navigation} />

                    {status &&
                        <TouchableOpacity style={styles.touchDot} onPress={() => setModalCancel(true)}>
                            <BlackDots />
                        </TouchableOpacity>
                    }
                </View>

                <View style={{ padding: GlobalSize(20), paddingTop: 0 }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                    }}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            {data?.profile ?
                                <View style={styles.viewImage}>

                                    <ImageBackground
                                        source={{ uri: data?.profile }}
                                        imageStyle={{ borderRadius: 40 }}
                                        style={{ width: GlobalSize(80), height: GlobalSize(80) }} >

                                    </ImageBackground>

                                </View> :
                                <Account width={80} height={80} />}

                            <View style={{ marginTop: GlobalSize(20), marginLeft: GlobalSize(10) }}>
                                <Text style={styles.textNm}>{data?.name}</Text>
                                <Text style={styles.textGn}>{data?.gender == "1" ? 'Female' : 'Male'}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <GreenFace width={40} height={40} top={20} />

                        </View>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.lineBorder} />
                    </View>



                    <DetailsSupport item={route?.params?.item} supportName={data?.supports[0]?.support} />

                    <View>
                        {status ?
                            <TouchableOpacity
                                style={styles.touchBtn}
                                onPress={() => setModalRequest(true)}>
                                <Text
                                    style={[styles.textBtn,
                                    { fontSize: fontSize(14) }]}>Request Completed</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={styles.touchBtn}
                                onPress={() => { setSupportMemberId(data?.id), setModalOpen(true) }}>
                                <Text
                                    style={[styles.textBtn,
                                    { fontSize: fontSize(14) }]}>Request Support</Text>
                            </TouchableOpacity>}
                    </View>

                </View>

                <SuccessPopup
                    Message={Message}
                    ModalOpen={SuccessModal}
                    setModalOpen={setSuccessModal} />

                <SupportRequestModal
                    ModalOpen={ModalOpen}
                    OnRequestSupport={OnRequestSupport}
                    title={'Are you sure you want to confirm this support?'}
                    setModalOpen={setModalOpen}
                    navigation={navigation} />

                <SupportCompletePopup
                    ModalOpen={ModalRequest}
                    setModalOpen={setModalRequest}
                    onYes={() => onYesClicked()}
                    onNo={() => onNoClicked()}
                    title={'Are you sure your request has been Completed ?'}
                    navigation={navigation} />


                <ReviewRatingModal
                    ModalReview={ModalReview}
                    setModalReview={setModalReview} />

                <SupportStatusPopup
                    ModalOpen={ModalStatus}
                    setModalOpen={setModalStatus} />

                <SupportCancelPopup
                    ModalOpen={ModalCancel}
                    setModalOpen={setModalCancel} />

            </ScrollView>
        </SafeAreaView>

    )
}

export default SupportDetail

const styles = StyleSheet.create({
    textNm: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(16)
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    touchDot: {
        marginRight: GlobalSize(20),
        top: GlobalSize(10),
        padding: GlobalSize(5)
    },
    textDay: {
        color: PUREWHITE,
        fontSize: fontSize(10),
        fontFamily: FONTS.FontSemiB
    },
    textGn: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORG,
        fontSize: fontSize(12)
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    btnView: {
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: GlobalSize(7),
        top: GlobalSize(-20)
    },
    textRate: {
        color: TEXTCOLOR10,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium
    },
    rowActive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: GlobalSize(10),
        marginBottom: 0
    },
    dayContainer: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.1,
        height: GlobalSize(30),
        opacity: 0.6,
        borderRadius: GlobalSize(5),
        alignItems: 'center',
        justifyContent: 'center',
        margin: GlobalSize(3.5)
    },
    viewTo: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(40),
        height: GlobalSize(40),
        borderRadius: GlobalSize(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    lineBorder: {
        width: DEFAULTWIDTH * 0.86,
        height: 1,
        marginBottom: GlobalSize(10),
        backgroundColor: BORDERCOLORSUPPORT,
        margin: GlobalSize(17),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTime: {
        color: PUREWHITE,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(18)
    },
    textTo: {
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(16)
    },
    textActive: {
        fontFamily: FONTS.FontSemiB,
        color: PUREWHITE,
        fontSize: fontSize(16)
    },
    touchBtn: {
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: GlobalSize(14),
        margin: GlobalSize(7),
        marginBottom: GlobalSize(10)
    },
    rowCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    viewImage: {
        borderWidth: 1,
        borderColor: BORDERCOLOR5,
        borderRadius: GlobalSize(40),
        width: GlobalSize(80),
        height: GlobalSize(80),
        marginRight: GlobalSize(15)
    },
    onlineView: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(10),
        backgroundColor: BACKGROUNDGREEN,
        marginTop: GlobalSize(10),
        left: DEFAULTWIDTH * 0.18
    },
    card: {
        width: DEFAULTWIDTH * 0.42,
        elevation: 2,
        backgroundColor: PUREWHITE,
        borderRadius: 10,
        alignItems: 'center',
        padding: GlobalSize(10)
    },
    activeCard: {
        backgroundColor: PRIMARYCOLOR,
        width: DEFAULTWIDTH * 0.90,
        borderRadius: GlobalSize(10),
        padding: GlobalSize(10),
        paddingBottom: GlobalSize(18),
        marginBottom: GlobalSize(10)
    }
})
