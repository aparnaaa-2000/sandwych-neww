import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Platform,
    ActivityIndicator
} from 'react-native'

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, BORDERCOLOR2, PRIMARYCOLOR, PUREBLACK } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT PACKAGES FOR API INTEGRATION
import AsyncStorage from '@react-native-async-storage/async-storage'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { faqClear } from '../../../../redux/Slice/Sidemenu/FaqKey';
import { getFAQ } from '../../../../redux/Thunk/SideMenuThunk';

const FAQ = ({ navigation }) => {

    const dispatch = useDispatch()
    const [expandedId, setExpandedId] = useState(null)

    
    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.getFAQ.data,
            error: state.getFAQ.error,
            isLoading: state.getFAQ.isLoading,
        }),
        shallowEqual
    );

    const toggleExpand = (id) => { //FUNCTION FOR OPEN AND CLOSE THE FAQ QUESTION AND ANSWERS
        setExpandedId(expandedId === id ? null : id)
    };

    useEffect(() => {  //FUNCTION FOR GETTING THE LOCALLLY STORED DATA
        dispatch(faqClear());
        getData()
    }, [])

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            getFAQ(storedValue, dispatch)

        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };


    const renderItem = ({ item }) => {
        const expanded = expandedId === item.id
        return (
            <View>
                <TouchableOpacity
                    style={[styles.cardView,
                    Platform.OS == 'android' ?
                        DEFAULTSTYLES.androidShadow :
                        DEFAULTSTYLES.iosShadow]}
                    onPress={() => toggleExpand(item.id)}>
                    <Text style={styles.textTitle}>{item.question}</Text>

                    {expanded && (
                        <View style={styles.viewDesc}>
                            <Text style={styles.textFAQ}>{item.answer}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <>
            {isLoading ?

                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :
                <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                    <StatusBar
                        backgroundColor={BACKGROUNDWHITE}
                        barStyle={'dark-content'}
                        style={{ flex: 0 }} />

                    <View style={{ marginBottom: DEFAULTHEIGHT * 0.04 }}>
                        <SubHeader title={'FAQ'} navigation={navigation} />
                    </View>


                    <View style={DEFAULTSTYLES.alignView}>
                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem} />

                    </View>
                </SafeAreaView>}
        </>
    )
}

export default FAQ;

const styles = StyleSheet.create({
    textFAQ: {
        fontSize: fontSize(12),
        color: PUREBLACK,
        fontFamily: FONTS.FontRegular
    },
    textTitle: {
        fontFamily: FONTS.FontMedium,
        color: PUREBLACK,
        fontSize: fontSize(14)
    },
    cardView: {
        margin: GlobalSize(1),
        width: DEFAULTWIDTH * 0.86,
        backgroundColor: BACKGROUNDWHITE,
        borderRadius: 8,
        marginBottom: GlobalSize(15),
        justifyContent: 'center',
        padding: GlobalSize(15)
    },
    viewDesc: {
        marginTop: GlobalSize(5),
        backgroundColor: BORDERCOLOR2,
        padding: GlobalSize(10),
        borderRadius: 5

    },
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


