import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PUREBLACK, PUREWHITE, TEXTCOLORG, PLACEHOLDERCOLOR3 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { BlackReview, GreenFace } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import ReviewRatingModal from '../../Common/Modal/ReviewRatingModal';

//IMPORT THIRD PARTY PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

//REDUX COMPONENTS
import { GetResourcePrevious } from '../../../redux/Thunk/ResourceThunk'
import { PreviousResourceClear } from '../../../redux/Slice/Resources/PreviousResourceKey'



const Previous = ({ navigation }) => {

    const dispatch = useDispatch()

    const [ModalOpen, setModalOpen] = useState(false)

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.PreviousResource.data,
            error: state.PreviousResource.error,
            isLoading: state.PreviousResource.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        getResourceData()
    }, []);

    const getResourceData = () => { //FUNCTION FOR GETTING THE RESOURCE DATA
        dispatch(PreviousResourceClear())
        getData().then(data => {
            GetResourcePrevious(data?.patientData?.patient_id, data?.storedValue, dispatch)
        });
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


    return (
        <View style={styles.viewMain}>
            {data?.resource_requests?.length>0 ?
                <>
                    {data?.resource_requests?.map((item) => {

                        return (
                            <View
                                style={[styles.cardView,
                                Platform.OS == 'android' ?
                                    DEFAULTSTYLES.androidShadow :
                                    DEFAULTSTYLES.iosShadow]}>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('RequestedResourceDetails',
                                        { item: item, status: item?.completion_status })}>

                                    <View style={styles.viewSpace}>
                                        <View style={{ marginBottom: GlobalSize(10) }}>
                                            <Text style={styles.textName}>{item?.resource_network_details?.name}</Text>
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
                                            <Text style={styles.textKey}>Resource Type</Text>
                                            <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.requested_resource_category}</Text>
                                        </View>
                                        {/* 
                            <View>
                                <Text style={styles.textKey}>Resource Time</Text>
                                <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item.ResourceTime}</Text>
                            </View> */}

                                        <View>
                                            <Text style={styles.textKey}>Status</Text>
                                            <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.completion_status == '0' ? 'Completed' : 'Cancelled'}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
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
    textNo: {
        fontSize: fontSize(14),
        color: PLACEHOLDERCOLOR3,
        fontFamily: FONTS.FontRegular,
        margin: GlobalSize(20)
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
    viewSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})