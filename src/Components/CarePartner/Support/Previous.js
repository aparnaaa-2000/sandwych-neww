import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PUREBLACK, PUREWHITE, TEXTCOLORG, PLACEHOLDERCOLOR3 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { BlackReview, BlueStar, GreenFace } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import ReviewRatingModal from '../../Common/Modal/ReviewRatingModal';

//IMPORT PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { supportPreviousClear } from '../../../redux/Slice/Support/SupportPreviousKey'
import { GetSupportPrevious } from '../../../redux/Thunk/SupportThunk'


const Previous = ({ navigation }) => {

    const dispatch = useDispatch()
    const [ModalOpen, setModalOpen] = useState(false)

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.getSupportPrevious.data,
            error: state.getSupportPrevious.error,
            isLoading: state.getSupportPrevious.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(supportPreviousClear())
        getData().then(data => {
            //FUNCTION FOR GETTING THE PREVIOUS DATA
            GetSupportPrevious(data?.patientData?.patient_id, data?.storedValue, dispatch)
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



    return (
        <View style={styles.viewMain}>
            {data?.completed_support?.length > 0 ?
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {data?.completed_support?.map((item) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('PreviousSupportDetails', { item: item })}
                                    style={[styles.cardView,
                                    Platform.OS == 'android' ?
                                        DEFAULTSTYLES.androidShadow :
                                        DEFAULTSTYLES.iosShadow]}>

                                    <View style={styles.viewSpace}>
                                        <View style={{ marginBottom: GlobalSize(10) }}>
                                            <Text style={styles.textName}>{item?.requested_support}</Text>
                                        </View>

                                        <View>
                                            {item.Rating !== null && item.Status !== 'Cancelled' ?
                                                <View>
                                                    <GreenFace />
                                                </View>
                                                :
                                                item.Rating == null && item.Status !== 'Cancelled' ?
                                                    <View>
                                                        <TouchableOpacity onPress={() => setModalOpen(true)}>
                                                            <BlackReview />
                                                        </TouchableOpacity>
                                                    </View> : null}

                                        </View>

                                    </View>

                                    <View style={styles.viewSpace}>

                                        <View>
                                            <Text style={styles.textKey}>Support Type</Text>
                                            <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.requested_support_type == '0' ? 'IADL' : 'ADL'}</Text>
                                        </View>

                                        {/* <View>
                                <Text style={styles.textKey}>Response Time</Text>
                                <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item.ResourceTime}</Text>
                            </View> */}

                                        <View>
                                            <Text style={styles.textKey}>Status</Text>
                                            <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.completion_status == '0' ? 'Completed' : 'Rejected'}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </> :

                <View style={[DEFAULTSTYLES.alignView, { marginTop: GlobalSize(160) }]}>
                    <Image
                        source={require('../../../../assets/Images/no-data.png')}
                        style={{ width: GlobalSize(120), height: GlobalSize(120) }} />

                    <Text style={styles.textNo}>No Data Found !</Text>
                </View>}

            <ReviewRatingModal
                ModalReview={ModalOpen}
                setModalReview={setModalOpen} />
        </View>
    )
}

export default Previous;

const styles = StyleSheet.create({
    viewMain: {
        paddingTop: DEFAULTHEIGHT * 0.026,
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center'
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
        fontSize: GlobalSize(14)
    },
    textKey: {
        fontSize: fontSize(11),
        color: TEXTCOLORG,
        fontFamily: FONTS.FontRegular
    },
    viewSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textNo: {
        fontSize: fontSize(14),
        color: PLACEHOLDERCOLOR3,
        fontFamily: FONTS.FontRegular,
        margin: GlobalSize(20)
    },
})