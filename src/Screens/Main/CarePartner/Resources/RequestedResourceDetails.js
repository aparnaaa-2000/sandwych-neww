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
    ScrollView,
    FlatList
} from 'react-native';

//IMPORT CONSTANTS
import { BACKGROUNDGREY, BACKGROUNDWHITE, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { BlackDots, GreyCall, GreyEmail, GreyLocation } from '../../../../../assets';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';
import SupportCompletePopup from '../../../../Components/CarePartner/Support/SupportCompletePopup';
import SupportStatusPopup from '../../../../Components/CarePartner/Support/SupportStatusPopup';
import ReviewRatingModal from '../../../../Components/Common/Modal/ReviewRatingModal';
import SupportCancelPopup from '../../../../Components/CarePartner/Support/SupportCancelPopup';

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgUri } from 'react-native-svg';

//IMPORT REDUX COMPONENTS
import { CompletionResourceClear } from '../../../../redux/Slice/Resources/CompletedStatusResourceKey';
import { IncompleteResourceClear } from '../../../../redux/Slice/Resources/IncompleteResourceStatusKey';
import { CancelResourceClear } from '../../../../redux/Slice/Resources/CancelResourceKey';
import { CancelResource,ResourceCompletionStatus,ResourceIncompletionStatus } from '../../../../redux/Thunk/ResourceThunk';

const RequestedResourceDetails = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const status = route?.params?.status;
    const ResourceData = route?.params?.item;

    const completion_status = '0';
    const Incompletion_status = '1';

    const [ModalOpen, setModalOpen] = useState(false);
    const [ErrorModal, setErrorModal] = useState(false);
    const [SuccessModal, setSuccessModal] = useState(false);
    const [ModalRequest, setModalRequest] = useState(false);
    const [ModalStatus, setModalStatus] = useState(false);
    const [ModalReview, setModalReview] = useState(false);
    const [ModalCancel, setModalCancel] = useState(false)
    const [Message, setMessage] = useState(null)
    const [asyncData, setAsyncData] = useState([])
    const [Review, setReview] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [reason, setReason] = useState(null)
    const [selectedMood, setSelectedMood] = useState(null)

    const { resourceData, resourceError, inCompleteData, inCompleteError, cancelData, cancelError } = useSelector(
        state => ({
            resourceData: state.CompletedStatusResource.data,
            resourceError: state.CompletedStatusResource.error,
            resourceLoading: state.CompletedStatusResource.isLoading,
            inCompleteData: state.IncompleteResource.data,
            inCompleteError: state.IncompleteResource.error,
            incompleteLoading: state.IncompleteResource.Loading,
            cancelData: state.CancelResource.data,
            cancelError: state.CancelResource.error,
            cancelLoading: state.CancelResource.isLoading
        }),
        shallowEqual
    );

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

    useEffect(() => {
        getData().then(data => {
            setAsyncData(data);
        });
    }, []);
    
    useEffect(() => {
        FetchResource();
    }, [resourceData, resourceError]);

    useEffect(() => {
        if (Review && selectedMood) {
            console.log("NEED SUPPORT")
            FetchResource()
        }
        if (selectedId) {
            OnReasonUpdate()
        }
        if (cancelData || cancelError) {
            OnCancelRequest()
        }
    }, [resourceData, resourceError, inCompleteData, inCompleteError, cancelData, cancelError])

    const FetchResource = () => { //FUNCTION FOR HANDLING THE API RESPONSE
        if (resourceData && ResourceData?.resource_request_id) {
            setMessage('Review updated successfully');
            setModalOpen(false);
       setSuccessModal(true);

            setTimeout(() => {
                setSuccessModal(false);
                navigation.navigate('LandingScreen');
                dispatch(CompletionResourceClear());
                setReview(null)
                setReason(null)
            }, 2000);
        } else if (resourceError && ResourceData?.resource_request_id) {
            setMessage('Review not updated');
            setModalOpen(false);
            setErrorModal(true);

            setTimeout(() => {
                setErrorModal(false);
                dispatch(CompletionResourceClear());
                setReview(null)
                setReason(null)
            }, 1500);
        }
    };

    const OnReasonUpdate = () => { //FUNCTION FOR UPDATING THE STATUS AFTER API ERROR OR SUCCESS

        if (selectedId && inCompleteData) {

            setModalStatus(false)
            setMessage('Reason updated successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)

                navigation.navigate('LandingScreen');
                dispatch(IncompleteResourceClear())
            }, 1500)


        }
        else if (inCompleteError && selectedId) {
            console.log("ERROR.............", errors)
            setModalStatus(false)
            setMessage('Reason not updated')

            setErrorModal(true)
            setTimeout(() => {

                setErrorModal(false)
                dispatch(IncompleteResourceClear())
            }, 2000)
        }

    }


    const OnCancelRequest = () => { //FUNCTION FOR UPDATING THE STATUS AFTER API SUCCESS OR ERROR

        if (cancelData) {

            setModalCancel(false)
            setMessage('Resource cancelled successfully')
            setSuccessModal(true)
            setTimeout(() => {
                setSuccessModal(false)

                navigation.navigate('LandingScreen');
                dispatch(CancelResourceClear())
            }, 1500)


        }
        else if (cancelError) {

            setModalCancel(false)
            setMessage('Resource not cancelled')

            setErrorModal(true)
            setTimeout(() => {

                setErrorModal(false)
                dispatch(CancelResourceClear())
            }, 2000)
        }

    }
    const onYesClicked = () => { //FNCTION FOR OPEN THE MODAL WHEN CLICKING YES
        setModalRequest(false);

        setTimeout(() => {
            setModalReview(true);
        }, 500);
    };

    const onNoClicked = () => { //FUNCTION FOR OPEN THE MODAL WHEN CLICKING NO
        setModalRequest(false);

        setTimeout(() => {
            setModalStatus(true);
        }, 500);
    };

    const OnReviewRate = () => { //FUNCTION FOR COMPLETION STATUS
        ResourceCompletionStatus(
            asyncData?.patientData?.patient_id,
            ResourceData?.resource_request_id,
            completion_status,
            selectedMood,
            Review,
            asyncData?.storedValue,
            dispatch
        );
    };

    const OnResourceReason = () => { //FUNCTION FOR CHANGE THE STATUS
        ResourceIncompletionStatus(
            asyncData?.patientData?.patient_id,
            ResourceData?.resource_request_id,
            Incompletion_status,
            selectedId,
            reason,
            asyncData?.storedValue,
            dispatch)
    }

    const OnResourceCancel = () => { //FUNCTION FOR CANCEL THE REQUEST
        CancelResource(
            asyncData?.patientData?.patient_id,
            ResourceData?.resource_request_id,
            asyncData?.storedValue,
            dispatch)
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }}
            />

            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    <View>

                        <View style={styles.headerRow}>
                            <ResourceHeader navigation={navigation} title={'Resources'} />
                            <TouchableOpacity style={styles.touchDot} onPress={() => setModalCancel(true)}>
                                <BlackDots />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.outerImage}>
                            <View
                                style={[
                                    styles.imageView,
                                    Platform.OS === 'android'
                                        ? DEFAULTSTYLES.androidShadow
                                        : DEFAULTSTYLES.iosShadow,
                                ]}
                            >
                                {ResourceData?.resource_network_details?.profile ? (
                                    <Image
                                        source={ResourceData?.user_details?.profile}
                                        style={{ width: DEFAULTWIDTH * 0.82, height: DEFAULTWIDTH * 0.65 }}
                                    />
                                ) : (
                                    <Image
                                        source={require('../../../../../assets/Images/Resource.png')}
                                        style={{ width: DEFAULTWIDTH * 0.82, height: DEFAULTWIDTH * 0.65 }}
                                    />
                                )}
                            </View>
                        </View>

                        <View>
                            <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(5) }}>
                                <Text style={[styles.textRes, { fontSize: fontSize(20) }]}>{ResourceData?.resource_network_details?.name}</Text>
                            </View>

                            {ResourceData?.resource_network_details?.phone_number && (
                                <View style={styles.viewDetails}>
                                    <View style={{ marginRight: GlobalSize(10) }}>
                                        <GreyCall />
                                    </View>
                                    <View>
                                        <Text style={styles.textDetails}>{ResourceData?.resource_network_details?.phone_number}</Text>
                                    </View>
                                </View>
                            )}

                            {ResourceData?.resource_network_details?.email && (
                                <View style={styles.viewDetails}>
                                    <View style={{ marginRight: GlobalSize(10) }}>
                                        <GreyEmail />
                                    </View>
                                    <View>
                                        <Text style={styles.textDetails}>{ResourceData?.resource_network_details?.email}</Text>
                                    </View>
                                </View>
                            )}

                            {ResourceData?.resource_network_details?.address && (
                                <View style={styles.viewDetails}>
                                    <View style={{ marginRight: GlobalSize(10) }}>
                                        <GreyLocation />
                                    </View>
                                    <View style={{ maxWidth: DEFAULTWIDTH * 0.5 }}>
                                        <Text style={styles.textDetails}>{ResourceData?.resource_network_details?.address}</Text>
                                    </View>
                                </View>
                            )}

                            {ResourceData?.resource_network_details?.zipcode[0]?.zipcode && (
                                <View style={styles.viewDetails}>
                                    <View style={{ marginRight: GlobalSize(10) }}>
                                        <GreyEmail />
                                    </View>
                                    <View>
                                        <Text style={styles.textDetails}>{ResourceData?.resource_network_details?.zipcode[0]?.zipcode}</Text>
                                    </View>
                                </View>
                            )}

                            <View style={{ marginTop: GlobalSize(10), marginLeft: GlobalSize(18) }}>
                                <Text style={styles.textProvide}>Resources Provided</Text>
                            </View>

                            <FlatList
                                data={ResourceData?.resource_network_details?.resourceNetworkProvidingResourceCategories}
                                keyExtractor={(item) => item?.id?.toString()} // Ensuring key is a string
                                renderItem={({ item }) => (
                                    <View style={[styles.card, DEFAULTSTYLES.iosShadow]}>

                                        <SvgUri
                                            uri={item.icon}
                                            width={GlobalSize(30)}
                                            height={GlobalSize(30)}
                                        />
                                        <Text style={[styles.textBtn, { color: TEXTCOLOR10 }]}>{item?.name}</Text>
                                    </View>
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />

                            <View style={styles.viewDesc}>
                                <Text style={styles.textDesc}>
                                    {ResourceData?.resource_network_details?.how_you_obtain_services}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {!status &&
                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.btnView} onPress={() => setModalRequest(true)}>
                            <Text style={styles.textBtn}>Request Completed</Text>
                        </TouchableOpacity>
                    </View>}

            </View>

            <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal}
            />

            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal}
            />

            <ReviewRatingModal
                ModalReview={ModalReview}
                setModalReview={setModalReview}
                selectedMood={selectedMood}
                setSelectedMood={setSelectedMood}
                Review={Review}
                setReview={setReview}
                OnReviewRate={OnReviewRate}
            />

            <SupportCompletePopup
                ModalOpen={ModalRequest}
                setModalOpen={setModalRequest}
                onYes={() => onYesClicked()}
                onNo={() => onNoClicked()}
                title={'Are you sure your request has been Completed ?'}
                navigation={navigation} />

            <SupportStatusPopup
                ModalOpen={ModalStatus}
                setModalOpen={setModalStatus}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setReason={setReason}
                reason={reason}
                OnSupportReason={OnResourceReason}
            />

            <SupportCancelPopup
                ModalOpen={ModalCancel}
                setModalOpen={setModalCancel}
                OnSupportCancel={OnResourceCancel} />

        </SafeAreaView>
    );
};

export default RequestedResourceDetails;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: BACKGROUNDWHITE,
    },
    textProvide: {
        fontSize: fontSize(16),
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium
    },
    card: {
        backgroundColor: PUREWHITE,
        elevation: 3,
        width: DEFAULTWIDTH * 0.38,
        padding: GlobalSize(10),
        borderRadius: GlobalSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        margin: GlobalSize(10)
    },
    scrollViewContent: {
        //  flexGrow: 1,
        //paddingBottom: DEFAULTHEIGHT * 0.125, // Space for the button
    },
    textRes: {
        fontSize: fontSize(24),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10,
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
        textAlign: 'justify',
    },
    iconView: {
        width: GlobalSize(25),
        height: GlobalSize(25)
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
        paddingLeft: GlobalSize(18),
    },
    textDetails: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: fontSize(14),
    },
    outerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTWIDTH * 0.05,
    },
    viewDesc: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: GlobalSize(16),
        marginBottom: DEFAULTHEIGHT * 0.03,
        marginTop: DEFAULTHEIGHT * 0.02,
    },
    viewBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
    },
});
