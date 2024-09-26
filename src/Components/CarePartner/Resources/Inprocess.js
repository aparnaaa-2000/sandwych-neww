import React, { useEffect } from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLORG,PLACEHOLDERCOLOR3 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT THIRD-PARTY PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

//IMPORT REDUX COMPONENTS
import { GetResourceInprocess } from '../../../redux/Thunk/ResourceThunk';
import { InprocessResourceClear } from '../../../redux/Slice/Resources/InprocessResourceKey'

const Inprocess = ({ navigation }) => {

    const dispatch = useDispatch()

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.InprocessResource.data,
            error: state.InprocessResource.error,
            isLoading: state.InprocessResource.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(InprocessResourceClear())
        getData().then(data => {
            GetResourceInprocess(data?.patientData?.patient_id, data?.storedValue, dispatch)
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

        <>
            {isLoading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <>
                {data?.resource_requests?.length>0 ? 
                <View style={styles.viewMain}>

                    {data?.resource_requests?.map((item) => {
                        return (

                            <View
                                style={[styles.cardView,
                                Platform.OS == 'android' ?
                                    DEFAULTSTYLES.androidShadow :
                                    DEFAULTSTYLES.iosShadow]}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('RequestedResourceDetails', { item: item })}>
                                    <View style={{ marginBottom: GlobalSize(10) }}>
                                        <Text style={styles.textName}>{item?.resource_network_details?.name}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View>
                                            <Text style={styles.textKey}>Resource Type</Text>
                                            <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.requested_resource_category}</Text>
                                        </View>

                                        {/* <View>
                                <Text style={styles.textKey}>Response Time</Text>
                                <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item.ResourceTime}</Text>
                            </View> */}

                                        <View>
                                            <Text style={styles.textKey}>Status</Text>
                                            <Text style={[styles.textName, { fontSize: fontSize(12) }]}>{item?.approval_status == "0" ? 'Accepeted' : item?.approval_status == "1" ? 'Rejected' : 'Pending'}</Text>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            </View>

                        )
                    })}

                </View>
                 :
                 <View style={[DEFAULTSTYLES.alignView,{marginTop:GlobalSize(160)}]}>
                     <Image
                      source={require('../../../../assets/Images/no-data.png')} 
                      style={{width:GlobalSize(120), height:GlobalSize(120)}}/>

                      <Text style={styles.textNo}>No Data Found !</Text>
                 </View>}
                </>
            }
        </>
    )
}

export default Inprocess

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewMain: {
        paddingTop: DEFAULTHEIGHT * 0.026,
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center'
    },
    textNo:{
        fontSize:fontSize(14),
        color:PLACEHOLDERCOLOR3,
        fontFamily:FONTS.FontRegular,
        margin:GlobalSize(20)
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
    }
})