import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';

//IMPORT CONSTANTS
import {
    BACKGROUNDWHITE,
    BORDERCOLOR5,
    PRIMARYCOLOR,
    PUREBLACK,
    PUREWHITE,
    TEXTCOLOR2,
    TEXTCOLORRS
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

import { GetSupportActivity } from '../../../../redux/thunk';

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//IMPORT COMPONENTS
import ActivitySelectionPopup from '../../../../Components/CarePartner/Support/ActivitySelectionPopup';
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader';

const ActivitiesList = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const support_type = route?.params?.support_type;
    const [selectedIds, setSelectedIds] = useState(null)
    const [ModalOpen, setModalOpen] = useState(false)

    const { data, errors, Loading } = useSelector(
        state => ({
            data: state.getSupportActivity.data,
            errors: state.getSupportActivity.error,
            Loading: state.getSupportActivity.isLoading
        }),
        shallowEqual
    );


    useEffect(() => {
        // Fetch data when the component mounts and when `token` changes
        fetchData();

    }, [navigation, support_type]); // Add token if it's a dependency

    const fetchData = async () => {
        const data = await getData();
        GetSupportActivity(support_type, data?.storedValue, dispatch)
    };

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');

            return {
                storedValue: storedValue,

            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null
            };
        }
    };


    const toggleSelection = (id) => { //FUNCTION FOR SELECTING THE ID
        setSelectedIds(id)
    }

    const onNavigation = () => { // FUNCTION FOR NAVIGATE TO THE SUPPORT REQUEST SCREEN
        if (selectedIds) {
            navigation.navigate('SupportForm', { support_id: selectedIds })
        }
    }

    return (

        <>
            {Loading ?
                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                    <StatusBar
                        backgroundColor={BACKGROUNDWHITE}
                        barStyle={'dark-content'}
                        style={{ flex: 0 }} />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ResourceHeader
                            title={support_type == 0 ? 'Activities-IADL' : 'Activities-ADL'}
                            navigation={navigation} />
                        <View>

                            <View style={styles.viewAlign}>

                                <View>
                                    <Text style={styles.textHelp}>Ability to help</Text>
                                    <Text style={styles.textFollow}>Which the following do you think</Text>
                                    <Text style={styles.textFollow}>you need help?</Text>
                                </View>

                                <View>
                                    <TouchableOpacity style={styles.btnView} onPress={() => setModalOpen(true)}>
                                        <Text style={styles.textBtn}>{support_type == 0 ? 'IADL' : 'ADL'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.mapView}>
                                {data?.Activities?.map((item) => {
                                    const isSelected = selectedIds === item.id;
                                    return (
                                        <View key={item?.id}>
                                            <TouchableOpacity style={[styles.cardView, {
                                                borderColor: isSelected ?
                                                    PRIMARYCOLOR : BORDERCOLOR5
                                            }]} onPress={() => toggleSelection(item.id)}>
                                                <View>
                                                    <Image
                                                        source={{ uri: item?.image }}
                                                        style={{ width: GlobalSize(100), height: GlobalSize(80) }} />
                                                </View>

                                                <View style={{ paddingLeft: GlobalSize(15) }}>
                                                    <Text style={styles.textName}>{item?.support}</Text>
                                                    {item?.description &&
                                                        <Text style={styles.textDesc} >{item?.description}</Text>}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.absoluteView}>
                            <TouchableOpacity onPress={() => onNavigation()}
                                style={[styles.btnView, { width: DEFAULTWIDTH * 0.85, height: GlobalSize(40), opacity: selectedIds ? 1 : 0.5 }]}>
                                <Text style={[styles.textBtn, { fontSize: 14 }]}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>}

            <ActivitySelectionPopup
                ModalOpen={ModalOpen}
                setModalOpen={setModalOpen}
                navigation={navigation} />
        </>
    )
}

export default ActivitiesList

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textHelp: {
        fontSize: fontSize(17),
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB
    },
    textFollow: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(13),
        color: TEXTCOLORRS
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
        borderRadius: 4,
        padding: GlobalSize(5)
    },
    cardView: {
        width: DEFAULTWIDTH * 0.86,
        borderWidth: 1,
        borderRadius: 10,
        padding: GlobalSize(10),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(12)
    },
    textName: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: TEXTCOLOR2
    },
    textDesc: {
        fontSize: fontSize(12),
        color: PUREBLACK,
        fontFamily: FONTS.FontRegular,
        maxWidth: DEFAULTWIDTH * 0.45
    },
    viewAlign: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(15),
        marginLeft: DEFAULTWIDTH * 0.07,
        marginRight: DEFAULTWIDTH * 0.07
    },
    mapView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(60)
    },
    absoluteView: {
        position: 'absolute',
        bottom: GlobalSize(20),
        alignItems: 'center',
        backgroundColor: BACKGROUNDWHITE
    }
})