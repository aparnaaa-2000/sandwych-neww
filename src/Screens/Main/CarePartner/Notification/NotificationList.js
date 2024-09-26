import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Platform,
    ActivityIndicator
} from 'react-native'

//IMPORT CONSTANTS
import {
    BACKGROUNDWHITE,
    BORDERCOLORNOT,
    LINECOLOR1,
    NOTIFICATIONCOLOR,
    PLACEHOLDERCOLOR3,
    PRIMARYCOLOR,
    PUREBLACK,
    PUREWHITE
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BlueNotification } from '../../../../../assets'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import NotificationModal from '../../../../Components/CarePartner/Notification/NotificationModal';

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { GetNotificationList, NotificationRead } from '../../../../redux/Thunk/NotificationThunk';
import { ReadNotificationClear } from '../../../../redux/Slice/Notification/ReadNotificationKey';

const NotificationList = ({ navigation }) => {

    const Message = 'test message'
    const [ModalOpen, setModalOpen] = useState(false)
    const [userData, setUserData] = useState([])

    const dispatch = useDispatch();

    const { NotificationListdata, NotificationListerror, NotificationListisLoading, notificationReadData, notificationReadError } = useSelector(
        state => ({
            NotificationListdata: state.NotificationList.data,
            NotificationListerror: state.NotificationList.error,
            NotificationListisLoading: state.NotificationList.isLoading,
            notificationReadData: state.NoitificationRead.data,
            notificationReadError: state.NoitificationRead.error
        }),
        shallowEqual
    )

    useEffect(() => {
        getData().then(data => {
            setUserData(data);
            
            // First API call to list notifications
            GetNotificationList(
                data?.carepartnerData?.id,
                data?.patientData?.patient_id,
                Message,
                data?.storedValue,
                dispatch
            );
    
            setTimeout(() => {
                const IDs = NotificationListdata?.data?.filter((item) => item.is_read === false).map((item) => item.id);
                console.log("IDS..........................", IDs);
    
                // Function to handle notification read and refresh the list
                const handleNotificationRead = () => {
                    NotificationRead(
                        IDs,
                        data?.storedValue,
                        dispatch,
                        () => {
                            // Callback to refresh the list after reading notifications
                            GetNotificationList(
                                data?.carepartnerData?.id,
                                data?.patientData?.patient_id,
                                Message,
                                data?.storedValue,
                                dispatch
                            );
                        }
                    );
                };
    
                handleNotificationRead();
            }, 2000);
        });
    }, []);
    

    // useEffect(() => {
    //     getData().then(data => {
    //         setUserData(data)
    //         GetNotificationList(  //LISTING THE  NOTIFICATIONS
    //             data?.carepartnerData?.id,
    //             data?.patientData?.patient_id,
    //             Message,
    //             data?.storedValue,
    //             dispatch)

    //         setTimeout(() => {
    //             const IDs = NotificationListdata?.data?.filter((item) => item.is_read === false).map((item) => item.id);
    //             console.log("IDS..........................", IDs)
               
    //             NotificationRead(
    //                 IDs,
    //                 data?.storedValue,
    //                 dispatch) //FUNCTION FOR READ THE NOTIFICATION
                
    //         });
    //     }, 2000)


    //     //console.log("data stored.................",data?.storedValue)

    // }, []);

    // useEffect(() =>{
    //     if (NotificationListdata) {
    
    //     dispatch(ReadNotificationClear())
    //    // NotificationReadResponse()
    //     }
    // },[NotificationListdata])

    const NotificationReadResponse = () => {
        if (NotificationListdata) {
            GetNotificationList(  //LISTING THE  NOTIFICATIONS
                userData?.carepartnerData?.id,
                userData?.patientData?.patient_id,
                Message,
                userData?.storedValue,
                dispatch)
        }
    }

    console.log("Id printig......................", notificationReadData, notificationReadError,)
    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');
            const carepartnerData = await AsyncStorage.getItem('UserData');

            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
                carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null,
                patientData: null,
                carepartnerData: null
            };
        }
    };


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                // onPress={() => navigation.navigate('UserSelect')}
                style={[styles.cardView, {
                    backgroundColor: item?.is_read ? PUREWHITE : NOTIFICATIONCOLOR,
                    opacity: item?.is_read ? 1 : 1
                },
                Platform.OS == 'android' ?
                    DEFAULTSTYLES.androidShadow :
                    DEFAULTSTYLES.iosShadow]}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={[styles.roundIcon, Platform.OS !== 'android' &&

                        DEFAULTSTYLES.iosShadow]}>
                        <BlueNotification width={20} height={20} />
                    </View>

                    <View style={{ maxWidth: GlobalSize(220), marginLeft: GlobalSize(15) }}>
                        <Text style={[styles.textMsg, { marginBottom: GlobalSize(5) }]} numberOfLines={6}>{item?.message}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={[styles.textMsg, { color: PLACEHOLDERCOLOR3 }]}>{moment(item?.created_at).format('MM/DD/YYYY')}</Text>

                </View>
                {/* <View style={styles.viewFlex}> */}

                {/* <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginRight: GlobalSize(10) }}>
                            <GreyAccount />
                        </View>

                        <View>
                            <Text style={styles.textTitle}>{item.Title}</Text>
                        </View>
                    </View> */}
                {/* 
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginRight: GlobalSize(5) }}>
                            <GreenTick />
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => setModalOpen(true)}>
                                <RedClose />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                {/* </View> */}

                {/* <View style={styles.borderLine}>
                    <Text style={styles.textMsg}>{item.message}</Text>
                </View> */}

                {/* <View style={styles.viewSub}>
                    <View style={{ marginRight: GlobalSize(10) }}>
                        <Image
                            source={{ uri: AVALONG }}
                            style={styles.imageView} />
                    </View>

                    <View>
                        <Text style={styles.textDoc}>{item.Doctor}</Text>
                        <Text style={[styles.textPost, { fontSize: fontSize(12) }]}>{item.Position}</Text>
                    </View>
                </View> */}
                {/* 
                <View style={{ flexDirection: 'row', marginLeft: DEFAULTWIDTH * 0.16 }}>
                    <View style={styles.viewCal}>
                        <GreyCalender />
                        <Text style={[styles.textPost, { left: GlobalSize(5) }]}>{item.Date}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <GreyClockLine />
                        <Text style={[styles.textPost, { left: GlobalSize(5) }]}>{item.Time}</Text>
                    </View>
                </View> */}
            </TouchableOpacity>
        )
    }
    return (

        <>
            {NotificationListisLoading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                    <StatusBar
                        backgroundColor={BACKGROUNDWHITE}
                        barStyle={'dark-content'}
                        style={{ flex: 0 }} />

                    <View>
                        <ResourceHeader
                            navigation={navigation}
                            title={'Notification'} />
                        <View style={{ top: GlobalSize(-25) }}>
                            <View style={styles.lineBorder} />

                            <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(28) }]}>
                                <FlatList
                                    data={NotificationListdata?.data}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={renderItem} />
                            </View>
                        </View>
                    </View>
                    <NotificationModal
                        ModalOpen={ModalOpen}
                        setModalOpen={setModalOpen}
                    />
                </SafeAreaView>}
        </>
    )
}

export default NotificationList

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardView: {
        width: DEFAULTWIDTH * 0.90,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(5),
        marginBottom: GlobalSize(10),
        margin: GlobalSize(1),
        padding: GlobalSize(12),
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR
    },
    roundIcon: {
        width: GlobalSize(40),
        height: GlobalSize(40),
        borderRadius: GlobalSize(20),
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textMsg: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: fontSize(12)
    },
    borderLine: {
        borderWidth: 1,
        borderColor: BORDERCOLORNOT,
        borderRadius: 8,
        padding: GlobalSize(8),
        marginLeft: DEFAULTWIDTH * 0.08,
        marginBottom: GlobalSize(10)
    },
    textPost: {
        color: PUREBLACK,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(10.5)
    },
    textDoc: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(15)
    },
    lineBorder: {
        backgroundColor: LINECOLOR1,
        height: GlobalSize(1),
        margin: DEFAULTWIDTH * 0.055,
        marginBottom: DEFAULTWIDTH * 0.06,
    },
    viewFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    imageView: {
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25)
    },
    viewSub: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(5)
    },
    viewCal: {
        flexDirection: 'row',
        marginRight: GlobalSize(15),
        alignItems: 'center'
    }
})