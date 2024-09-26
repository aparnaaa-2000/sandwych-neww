import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    Image,
    Platform,
    TouchableOpacity,
    ScrollView
} from 'react-native';

//IMPORT CONSTANTS AND ASSESTS
import {
    BACKGROUNDGREY,
    BACKGROUNDWHITE,
    PRIMARYCOLOR,
    PUREBLACK,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLOR5
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { GreyCall, GreyEmail, GreyLocation } from '../../../../../assets'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import SupportRequestModal from '../../../../Components/Common/Modal/SupportRequestModal';
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

//IMPORT REDUX COMPONENTS
import { ResourceNetworkRequestClear } from '../../../../redux/Slice/Resources/ResourceNetworkRequestKey';
import { ResourceNetworkRequest } from '../../../../redux/Thunk/ResourceThunk';


const ResourceDetail = ({ navigation, route }) => {

    const dispatch = useDispatch()

    const ResourceData = route?.params?.item;
    const SubCategValue = route?.params?.SubCategValue;
    const patient_id = route?.params?.patient_id;
    const Note = route?.params?.Note;
    const Date = route?.params?.Date;
    const Time = route?.params?.Time;
    const Zipcode = route?.params?.Zipcode;
    const Address = route?.params?.Address;
    const ContactNum = route?.params?.ContactNum
    const Priority = route?.params?.Priority
    const ResourceNetworkId = route?.params?.ResourceNetworkId;
    const Token = route?.params?.Token;

    const [ModalOpen, setModalOpen] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)
    const [SuccessModal, setSuccessModal] = useState(false)

    const { resourceData, resourceError, resourceLoading } = useSelector(
        state => ({
            resourceData: state.ResourceNetworkRequest.data,
            resourceError: state.ResourceNetworkRequest.error,
            resourceLoading: state.ResourceNetworkRequest.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => { // FUNCTION FOR FETCH THE API UPDATEAFTER SUBMISSION
        FetchResource()
    }, [resourceData, resourceError])


    const FetchResource = () => {
        if (resourceData && SubCategValue && Note && ResourceNetworkId) {
            setModalOpen(false)
            setSuccessModal(true)

            setTimeout(() => {
                setSuccessModal(false)
                navigation.navigate('LandingScreen')
                dispatch(ResourceNetworkRequestClear())
            }, 2000)

        }
        else if (resourceError && SubCategValue && Note && ResourceNetworkId) {
            setModalOpen(false)
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
                dispatch(ResourceNetworkRequestClear())

            }, 1500)
        }
    }

    const RequestResource = () => { //FUNCTION FOR CALLING THE API
        ResourceNetworkRequest(
            SubCategValue,
            patient_id,
            Date,
            Time,
            Note,
            Zipcode,
            Address,
            ContactNum,
            Priority,
            ResourceNetworkId,
            Token,
            dispatch)
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <ResourceHeader navigation={navigation} title={'Resources'} />
                    <View style={styles.outerImage}>
                        <View
                            style={[styles.imageView,
                            Platform.OS == 'android' ?
                                DEFAULTSTYLES.androidShadow :
                                DEFAULTSTYLES.iosShadow]}>
                            {ResourceData?.user_details?.picture ?
                                <Image
                                    source={ResourceData?.user_details?.picture}
                                    style={{ width: DEFAULTWIDTH * 0.82, height: DEFAULTWIDTH * 0.8 }}
                                /> :
                                <Image
                                    source={require('../../../../../assets/Images/Resource.png')}
                                    style={{ width: DEFAULTWIDTH * 0.82, height: DEFAULTWIDTH * 0.8 }}
                                />}
                        </View>
                    </View>

                    <View>

                        <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(5) }}>
                            <Text style={[styles.textRes, { fontSize: fontSize(20) }]}>{ResourceData?.user_details?.name}</Text>
                        </View>

                        <View style={styles.viewDetails}>

                            <View style={{ marginRight: GlobalSize(10) }}>
                                <GreyCall />
                            </View>

                            <View>
                                <Text style={styles.textDetails}>{ResourceData?.user_details?.phonenumber}</Text>
                            </View>
                        </View>



                        <View style={styles.viewDetails}>

                            <View style={{ marginRight: GlobalSize(10) }}>
                                <GreyEmail />
                            </View>

                            <View>
                                <Text style={styles.textDetails}>{ResourceData?.user_details?.email}</Text>
                            </View>
                        </View>



                        <View style={styles.viewDetails}>

                            <View style={{ marginRight: GlobalSize(10) }}>
                                <GreyLocation />
                            </View>

                            <View style={{ maxWidth: DEFAULTWIDTH * 0.5 }}>
                                <Text style={styles.textDetails}>{ResourceData?.user_details?.address}</Text>
                            </View>
                        </View>


                        <View style={styles.viewDesc}>
                            <Text style={styles.textDesc}>
                                {ResourceData?.resource_network_details?.how_you_obtain_services}
                            </Text>
                        </View>


                    </View>
                </View>

                <RequestModal
                    ModalOpen={ModalOpen}
                    title={'Are you sure you want to confirm this resource?'}
                    setModalOpen={setModalOpen}
                    OnRequestSupport={RequestResource}
                    navigation={navigation} />

                <ErrorPopup
                    Message={'Request not sent'}
                    ModalOpen={ErrorModal}
                    setModalOpen={setErrorModal} />

                <SuccessPopup
                    Message={'Resource request sent successfully'}
                    ModalOpen={SuccessModal}
                    setModalOpen={setSuccessModal} />
            </ScrollView>

            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btnView} onPress={() => setModalOpen(true)}>
                    <Text style={styles.textBtn}>Request Resource</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ResourceDetail

const styles = StyleSheet.create({
    textRes: {
        fontSize: fontSize(24),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    imageView: {
        backgroundColor: PUREWHITE,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        padding: GlobalSize(15),
    },
    textDesc: {
        fontSize: fontSize(13),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        textAlign: 'justify'
    },
    btnView: {
        width: DEFAULTWIDTH * 0.90,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textBtn: {
        fontSize: fontSize(16),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    viewDetails: {
        width: DEFAULTWIDTH,
        padding: GlobalSize(12),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BACKGROUNDGREY,
        marginBottom: GlobalSize(2),
        paddingLeft: GlobalSize(18)
    },
    textDetails: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: fontSize(14),
    },
    outerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTWIDTH * 0.05
    },
    viewDesc: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: GlobalSize(16),
        marginBottom: DEFAULTHEIGHT * 0.03,
        marginTop: DEFAULTHEIGHT * 0.02
    },
    viewBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
        left: 0,
        right: 0,
        position: 'absolute'
    }
})
