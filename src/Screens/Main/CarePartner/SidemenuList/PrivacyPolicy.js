import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar ,ActivityIndicator} from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PRIMARYCOLOR, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import { FONTS } from '../../../../Constants/Fonts'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT PACKAGES FOR API INTEGRATION

import AsyncStorage from '@react-native-async-storage/async-storage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { PrivacyPolicyClear } from '../../../../redux/Slice/Sidemenu/PrivacyPolicyKey';
import { WebView } from 'react-native-webview';
import { getPrivacyPolicy } from '../../../../redux/Thunk/SideMenuThunk';

const PrivacyPolicy = ({ navigation }) => {

    const dispatch = useDispatch()
    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.PrivacyPolicy.data,
            error: state.PrivacyPolicy.error,
            isLoading: state.PrivacyPolicy.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        dispatch(PrivacyPolicyClear())
        getData() //FUNCTION FOR GETTING THE LOCALLY STORED DATA
    }, [])

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            getPrivacyPolicy(storedValue, dispatch)

        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };


    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(data?.url)}&embedded=true`;

    return (
        <>
            <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                <StatusBar
                    backgroundColor={BACKGROUNDWHITE}
                    barStyle={'dark-content'}
                    style={{ flex: 0 }} />
                <SubHeader title={'Privacy Policy'} navigation={navigation} />
                {isLoading ?
                    <View style={styles.loadContainer}>
                        <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                    </View> :

                    <WebView
                        source={{ uri: googleDocsUrl }}
                        style={{ marginTop: GlobalSize(20), flex: 1 }}
                    />}
            </SafeAreaView>
        </>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    textDesc: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(13),
        color: TEXTCOLOR5,
        lineHeight: GlobalSize(20),
        marginTop: GlobalSize(10)
    },
    subView: {
        marginHorizontal: GlobalSize(22),
        marginTop: GlobalSize(10),
        marginVertical: GlobalSize(20)
    },
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})