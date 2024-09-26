import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    ImageBackground
} from 'react-native'

//IMPORT CONSTANTS AND ASSEST
import {
    BACKGROUNDGREEN,
    BACKGROUNDWHITE,
    BORDERCOLOR5,
    BORDERCOLORSUPPORT,
    PRIMARYCOLOR,
    PUREBLACK,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLORG
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { Account, BlackDots, DarkGreenFace, GreenFace, OrangeFace, RedFace, YellowFace } from '../../../../../assets'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import SupportCompletePopup from '../../../../Components/CarePartner/Support/SupportCompletePopup'
import ReviewRatingModal from '../../../../Components/Common/Modal/ReviewRatingModal'
import SupportStatusPopup from '../../../../Components/CarePartner/Support/SupportStatusPopup'
import SupportCancelPopup from '../../../../Components/CarePartner/Support/SupportCancelPopup'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup'
import PrevProcessDetails from './PrevProcessDetails'

//IMPORT THIRD-PARTY PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

//IMPORT REDUX 
import { supportCompletionClear } from '../../../../redux/Slice/Support/SupportCompletionKey'
import { supportInCompletionClear } from '../../../../redux/Slice/Support/SupportIncompletionKey'
import { supportCancelClear } from '../../../../redux/Slice/Support/SupportCancelRequestKey'
import { CancelSupport, SupportCompletion, SupportIncompletion } from '../../../../redux/Thunk/SupportThunk'


const InProcessDetails = ({ navigation, route }) => {

    const data = route?.params?.inProcessData

    const completion_status = '0';
    const Incompletion_status = '1';

    const [ModalRequest, setModalRequest] = useState(false)
    const [ModalReview, setModalReview] = useState(false)
    const [ModalStatus, setModalStatus] = useState(false)
    const [ModalCancel, setModalCancel] = useState(false)
    const [selectedMood, setSelectedMood] = useState('')

    const [Message, setMessage] = useState(null)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const [Review, setReview] = useState(null);

    const [selectedId, setSelectedId] = useState(null);
    const [reason, setReason] = useState("No reason")

    const dispatch = useDispatch()

    const {
        dataCompletion,
        errors,
        Loading,
        incompleteLoading,
        inCompleteData,
        inCompleteError,
        cancelData,
        cancelError,
        cancelLoading
    } = useSelector(
        state => ({
            dataCompletion: state.supportCompletion.data,
            errors: state.supportCompletion.error,
            Loading: state.supportCompletion.isLoading,
            inCompleteData: state.supportInCompletion.data,
            inCompleteError: state.supportInCompletion.error,
            incompleteLoading: state.supportInCompletion.Loading,
            cancelData: state.supportCancel.data,
            cancelError: state.supportCancel.error,
            cancelLoading: state.supportCancel.isLoading
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
        if (Review && selectedMood) {
            console.log("NEED SUPPORT")
            OnSupportRequest()
        }
        if (selectedId) {
            OnReasonUpdate()
        }
        if (cancelData || cancelError) {
            OnCancelRequest()
        }
    }, [dataCompletion, errors, inCompleteData, cancelData, cancelError])

    const OnSupportRequest = () => { //FUNCTION FOR UPDATING THE REASON OF THE REQUEST 

        if (dataCompletion && selectedMood && Review) {

            setModalReview(false)
            setMessage('Completion status updated successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)

                navigation.navigate('LandingScreen');
                dispatch(supportCompletionClear())
            }, 1500)


        }
        else if (errors && selectedMood && Review) {

            setMessage('Review not updated')
            setModalReview(false)
            setErrorModal(true)
            setTimeout(() => {

                setErrorModal(false)
                dispatch(supportCompletionClear())
            }, 2000)
        }

    }

    const OnReasonUpdate = () => { //FUNCTION FOR UPDATING THE STATUS AFTER API ERROR OR SUCCESS

        if (selectedId && inCompleteData) {

            setModalStatus(false)
            setMessage('Reason updated successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)

                navigation.navigate('LandingScreen');
                dispatch(supportInCompletionClear())
            }, 1500)


        }
        else if (inCompleteError && selectedId) {

            setModalStatus(false)
            setMessage('Reason not updated')

            setErrorModal(true)
            setTimeout(() => {

                setErrorModal(false)
                dispatch(supportInCompletionClear())
            }, 2000)
        }

    }
    console.log("INCOMPLETED ....................", inCompleteData, inCompleteError)

    const OnCancelRequest = () => { //FUNCTION FOR UPDATING THE STATUS AFTER API SUCCESS OR ERROR

        if (cancelData) {

            setModalCancel(false)
            setMessage('Support cancelled successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)

                navigation.navigate('LandingScreen');
                dispatch(supportCancelClear())
            }, 1500)
        }
        else if (cancelError) {

            setModalCancel(false)
            setMessage('Support not cancelled')

            setErrorModal(true)
            setTimeout(() => {

                setErrorModal(false)
                dispatch(supportCancelClear())
            }, 2000)
        }

    }

    const OnReviewRate = () => { //FUNCTION FOR COMPLETING THE SUPPORT STATUS
        SupportCompletion(
            userData?.patientData?.patient_id,
            data?.support_request_id,
            completion_status,
            selectedMood,
            Review,
            userData?.storedValue,
            dispatch)
    }

    const OnSupportReason = () => { //FUNCTION FOR UPDATING THE SUPPORT INCOMPLETE STATUS
        SupportIncompletion(
            userData?.patientData?.patient_id,
            data?.support_request_id,
            Incompletion_status,
            selectedId,
            reason,
            userData?.storedValue,
            dispatch)
    }

    const OnSupportCancel = () => { //FUNCTION FOR CALLING THE CANCEL
        CancelSupport(
            userData?.patientData?.patient_id,
            data?.support_request_id,
            userData?.storedValue,
            dispatch)
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: DEFAULTHEIGHT * 0.08 }}>

                <View style={styles.headerRow}>
                    <ResourceHeader title={'Support'} navigation={navigation} />


                    <TouchableOpacity style={styles.touchDot} onPress={() => setModalCancel(true)}>
                        <BlackDots />
                    </TouchableOpacity>

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
                                <Text style={styles.textNm}>{data?.support_member?.name}</Text>
                                <Text style={styles.textGn}>{data?.support_member?.gender == "1" ? 'Female' : 'Male'}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>

                            {data?.support_member?.satisfaction_rating == 'Very Happy' ?
                                <DarkGreenFace width={40} height={40} top={20} /> :
                                data?.support_member?.satisfaction_rating == 'Happy' ?
                                    <GreenFace width={40} height={40} top={20}  /> :
                                    data?.support_member?.satisfaction_rating == 'Angry' ?
                                        <RedFace width={40} height={40} top={20} /> :
                                        data?.support_member?.satisfaction_rating == 'Sad' ?
                                            <YellowFace width={40} height={40} top={20} /> :
                                            <OrangeFace width={40} height={40} top={20} />}
                        </View>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.lineBorder} />
                    </View>



                    <PrevProcessDetails item={route?.params?.inProcessData} />


                </View>

                <SuccessPopup
                    Message={Message}
                    ModalOpen={SuccessModal}
                    setModalOpen={setSuccessModal} />

                <SupportCompletePopup
                    ModalOpen={ModalRequest}
                    setModalOpen={setModalRequest}
                    onYes={() => onYesClicked()}
                    onNo={() => onNoClicked()}
                    title={'Are you sure your request has been Completed ?'}
                    navigation={navigation} />

                <ReviewRatingModal
                    ModalReview={ModalReview}
                    setModalReview={setModalReview}
                    selectedMood={selectedMood}
                    setSelectedMood={setSelectedMood}
                    Review={Review}
                    setReview={setReview}
                    OnReviewRate={OnReviewRate}
                />

                <SupportStatusPopup
                    ModalOpen={ModalStatus}
                    setModalOpen={setModalStatus}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    setReason={setReason}
                    reason={reason}
                    OnSupportReason={OnSupportReason}
                    incompleteLoading={incompleteLoading} />

                <SupportCancelPopup
                    ModalOpen={ModalCancel}
                    setModalOpen={setModalCancel}
                    OnSupportCancel={OnSupportCancel} />

            </ScrollView>


            <View style={styles.viewBtn}>

                <TouchableOpacity
                    style={styles.touchBtn}
                    onPress={() => setModalRequest(true)}>
                    <Text
                        style={[styles.textBtn,
                        { fontSize: fontSize(14) }]}>Request Completed</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}

export default InProcessDetails;

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
    viewBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
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
        marginBottom: GlobalSize(10),
        width: DEFAULTWIDTH * 0.88
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