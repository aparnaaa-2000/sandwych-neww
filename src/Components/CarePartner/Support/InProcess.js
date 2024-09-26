import React, { useEffect } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image, ScrollView } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PLACEHOLDERCOLOR3, PRIMARYCOLOR, PUREBLACK, PUREWHITE, SEVENTHCOLOR, TEXTCOLORG } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { supportInprocessClear } from '../../../redux/Slice/Support/SupportInprocessKey'
import { GetSupportInprocess } from '../../../redux/Thunk/SupportThunk'
import { DarkGreenFace, GreenFace, OrangeFace, RedFace, YellowFace } from '../../../../assets'

const Inprocess = ({ navigation }) => {

    const dispatch = useDispatch()

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.getSupportInprocess.data,
            error: state.getSupportInprocess.error,
            isLoading: state.getSupportInprocess.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(supportInprocessClear())
        getData().then(data => { //FUNCTION FOR GETTING THE INPROCESS DATA

            GetSupportInprocess(data?.patientData?.patient_id, data?.storedValue, dispatch)
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

    console.log("NO DATA...................", data?.support_requests, isLoading)
    return (
        <>
            {isLoading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <>
                    {/* {data?.support_requests?.length>0 ? */}
                    <View style={styles.viewMain}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {data?.support_requests?.length > 0 && data?.support_requests?.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('InprocessDetails',
                                            { status: item?.Status, inProcessData: item })}
                                        style={[styles.cardView,
                                        Platform.OS == 'android' ?
                                            DEFAULTSTYLES.androidShadow :
                                            DEFAULTSTYLES.iosShadow]}>

                                        <View style={styles.rowView}>
                                            <View style={{ marginBottom: GlobalSize(10) }}>
                                                <Text style={styles.textName}>{item?.requested_support}</Text>
                                            </View>

                                            <View>
                                                {item?.support_member?.satisfaction_rating == 'Very Happy' ?
                                                    <DarkGreenFace /> :
                                                    item?.support_member?.satisfaction_rating == 'Happy' ?
                                                        <GreenFace /> :
                                                        item?.support_member?.satisfaction_rating == 'Angry' ?
                                                            <RedFace /> :
                                                            item?.support_member?.satisfaction_rating == 'Sad' ?
                                                                <YellowFace /> :
                                                                <OrangeFace />}

                                            </View>
                                        </View>
                                        <View style={styles.row}>

                                            <View>
                                                <Text style={styles.textKey}>Support Type</Text>
                                                <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.requested_support_type == "1" ? 'ADL' : 'IADL'}</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.textKey}>Response Rating</Text>
                                                <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.support_member?.average_response_percentage?.toFixed(0)} %</Text>
                                            </View>

                                            <View>
                                                <Text style={styles.textKey}>Status</Text>

                                                <TouchableOpacity >
                                                    <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item.approval_status == "0" ? 'Accepted' : item?.approval_status == "1" ? 'Rejected' : 'Pending'}</Text>
                                                </TouchableOpacity>

                                            </View>

                                        </View>

                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>

                    {data?.support_requests?.length == 0 &&
                        <View style={[DEFAULTSTYLES.alignView, { marginTop: GlobalSize(160) }]}>
                            <Image
                                source={require('../../../../assets/Images/no-data.png')}
                                style={{ width: GlobalSize(120), height: GlobalSize(120) }} />

                            <Text style={styles.textNo}>No Data Found !</Text>
                        </View>}
                </>}

        </>
    )
}

export default Inprocess

const styles = StyleSheet.create({
    viewMain: {
        paddingTop: DEFAULTHEIGHT * 0.026,
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center'
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: GlobalSize(15)
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
        fontSize: fontSize(14)
    },
    textKey: {
        fontSize: fontSize(11),
        color: TEXTCOLORG,
        fontFamily: FONTS.FontRegular
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
        marginBottom: GlobalSize(15)
    }
})