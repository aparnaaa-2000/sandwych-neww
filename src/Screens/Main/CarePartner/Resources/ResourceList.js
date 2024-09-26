import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native'

//IMPORT CONSTANTS 
import {
    BACKGROUNDWHITE,
    LINECOLOR1,
    PRIMARYCOLOR,
    PUREBLACK,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLORG
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import SupportRequestModal from '../../../../Components/Common/Modal/SupportRequestModal';
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader';
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';

//IMPORT REDUX COMPONENTS
import { ResourceNetworkRequest } from '../../../../redux/Thunk/ResourceThunk';
import { ResourceNetworkRequestClear } from '../../../../redux/Slice/Resources/ResourceNetworkRequestKey';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const ResourceList = ({ navigation, route }) => {

    const ResourcesData = route?.params?.resourceData;
    const SubCategValue = route?.params?.SubCategValue;
    const patient_id = route?.params?.patient_id;
    const Date = route?.params?.Date;
    const Time = route?.params?.Time;
    const Note = route?.params?.Note;
    const Zipcode = route?.params?.Zipcode;
    const Address = route?.params?.Address;
    const ContactNum = route?.params?.ContactNum;
    const Priority = route?.params?.Priority;
    const Token = route?.params?.Token;

    const dispatch = useDispatch();
    const [ModalOpen, setModalOpen] = useState(false)
    const [ResourceNetworkId, setResourceNetworkId] = useState(null)
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

    const OpenModal = (item) => { //FUNCTION FOR OPEN THE MODAL FOR REQUESTING RESOURCE
        setResourceNetworkId(item?.resource_network_id)
        setModalOpen(true)
    }


    const renderItem = ({ item }) => {

        return (

            <View>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('ResourceDetail', {
                            item: item,
                            SubCategValue: SubCategValue,
                            patient_id: patient_id,
                            Note: Note,
                            Date: Date,
                            Time: Time,
                            Zipcode: Zipcode,
                            Address: Address,
                            ContactNum: ContactNum,
                            Priority: Priority,
                            ResourceNetworkId: item?.resource_network_id,
                            Token: Token
                        })}

                    style={[styles.cardRS,
                    Platform.OS == 'android' ?
                        DEFAULTSTYLES.androidShadow :
                        DEFAULTSTYLES.iosShadow]}>

                    <View>
                        <Text style={styles.textTitle} numberOfLines={5}>{item?.user_details?.name}, {item?.user_details?.city}</Text>
                        <Text style={styles.textType}>{item?.user_details?.phonenumber}</Text>
                    </View>

                    <View style={styles.viewCommon}>
                        <View>
                            <Text style={styles.textType}>Resource Type</Text>
                            <Text style={styles.textValue}>{ResourcesData?.requested_resource_category?.name}</Text>
                        </View>

                        <View>
                            <Text style={styles.textType}>Satisfaction</Text>
                            <Text style={styles.textValue}>56%</Text>
                        </View>

                        <View>
                            <TouchableOpacity style={styles.btnView} onPress={() => OpenModal(item)}>
                                <Text style={styles.textBtn}>Request Resource</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableOpacity>

            </View>
        )
    }
    return (

        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <ResourceHeader navigation={navigation} title={'Resources'} />

                <View style={styles.lineBorder} />

                <View style={DEFAULTSTYLES.alignView}>
                    <FlatList
                        data={ResourcesData?.available_resource_networks}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem} />
                </View>
                <SupportRequestModal
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
            </View>

        </SafeAreaView>
    )
}

export default ResourceList

const styles = StyleSheet.create({
    textRes: {
        fontSize: fontSize(20),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    lineBorder: {
        backgroundColor: LINECOLOR1,
        height: 1,
        margin: GlobalSize(15),
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH * 0.05,
        marginTop: GlobalSize(1),
        marginBottom: GlobalSize(20)
    },
    textTitle: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK
    },
    cardRS: {
        width: DEFAULTWIDTH * 0.90,
        padding: GlobalSize(15),
        backgroundColor: PUREWHITE,
        marginBottom: GlobalSize(12),
        borderRadius: 8,
        margin: GlobalSize(2)
    },
    textType: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORG
    },
    textValue: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(12),
        maxWidth: GlobalSize(65)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.2,
        height: DEFAULTWIDTH * 0.12,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textBtn: {
        fontSize: fontSize(13),
        color: PUREWHITE,
        fontFamily: FONTS.FontRegular,
        textAlign: 'center',
    },
    viewCommon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: GlobalSize(10)
    }

})