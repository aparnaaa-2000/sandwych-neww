import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native'

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, PRIMARYCOLOR, TEXTCOLOR10, TEXTCOLOR5, TEXTCOLOR8 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { Account, LogoSmall } from '../../../../../assets'
import { ADR, AVALONG, SALLYBROWN1, SALLYBROWN2 } from '../../../../Constants/DummyImages'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT MODAL
import AboutUsModal from '../../../../Components/CarePartner/AboutUs/AboutUsModal';

//IMPORT PACKAGES FOR API INTEGRATION
import AsyncStorage from '@react-native-async-storage/async-storage'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image'
import { getAboutUs } from '../../../../redux/Thunk/SideMenuThunk';

const AboutUs = ({ navigation }) => {

    const dispatch = useDispatch()
    const [ModalOpen, setModalOpen] = useState(false)
    const [imageErrors, setImageErrors] = useState({});
    const [Item, setItem] = useState([])

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.getAboutUs.data,
            error: state.getAboutUs.error,
            isLoading: state.getAboutUs.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => { //FUNCTION FOR GETTING THE LOCALLY STORED DATA
        getData()
    }, [])

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            getAboutUs(storedValue, dispatch)

        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };


    // Handle image load errors
    const handleImageError = (index) => {
        setImageErrors((prevErrors) => ({
            ...prevErrors,
            [index]: true,
        }));
    };

    const OnModalOpen = (item) => { //FUNCTION FOR OPENING THE MODAL SET THE STATE
        setModalOpen(true)
        setItem(item)
    }

    const renderItemMain = ({ item }) => {
        return (
            <View>
                {item?.category_name === 'About SandwyCh' ?

                    <View>
                        {item.content.map(contentItem => {

                            return (
                                <View style={DEFAULTSTYLES.alignView}>

                                    <Image
                                        source={require('../../../../../assets/Images/ABOUTUS.png')}
                                        style={{ width: DEFAULTWIDTH * 0.89, height: DEFAULTHEIGHT * 0.3 }} />

                                    <LogoSmall width={120} height={100} />

                                    <View style={{ marginHorizontal: GlobalSize(20), top: -5 }}>
                                        <Text style={styles.textDesc}>
                                            {contentItem?.text_content}
                                        </Text>
                                    </View>
                                </View>)
                        }
                        )
                        }
                    </View> :
                    <View>
                        {item.content.map((item, index) => {

                            return (

                                <View key={index}>

                                    <View style={[DEFAULTSTYLES.alignView, { marginTop: GlobalSize(5) }]}>
                                        <Text style={styles.ourTeam}>Our Team</Text>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => { OnModalOpen(item) }}>
                                        <View style={styles.imgOutView}>
                                            {!imageErrors[index] ? (
                                                <FastImage
                                                    style={styles.imageView}
                                                    source={{
                                                        uri: item?.picture_url,
                                                        priority: FastImage.priority.high,
                                                    }}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                    onError={() => handleImageError(index)}
                                                />
                                            ) : (
                                                <Account /> // Fallback component/icon if image fails to load
                                            )}

                                            <Text style={styles.textDesc}>{item?.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>)
                        })}
                    </View>}
            </View>

        )
    }


    return (
        <>

            {isLoading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                    <StatusBar
                        backgroundColor={BACKGROUNDWHITE}
                        barStyle={'dark-content'}
                        style={{ flex: 0 }} />

                    <ScrollView showsVerticalScrollIndicator={false}>

                        <View style={{ marginBottom: DEFAULTHEIGHT * 0.04 }}>
                            <SubHeader title={'About Us'} navigation={navigation} />
                        </View>

                        <View>
                            <FlatList
                                data={data?.categories}
                                renderItem={renderItemMain}
                                keyExtractor={(item, index) => index.toString()}
                            />

                        </View>

                    </ScrollView>

                    <AboutUsModal
                        item={Item}
                        ModalOpen={ModalOpen}
                        setModalOpen={setModalOpen} />

                </SafeAreaView>}
        </>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    textRes: {
        fontSize: fontSize(24),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    imgOutView: {
        margin: GlobalSize(20),
        alignItems: 'center',
        marginBottom: 0
    },
    textDesc: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(13),
        color: TEXTCOLOR5,
        lineHeight: GlobalSize(20),
        marginBottom: GlobalSize(10)
    },
    ourTeam: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR8,
        fontSize: fontSize(24),
        textAlign: 'left'
    },
    imageView: {
        width: GlobalSize(100),
        height: GlobalSize(100),
        borderRadius: GlobalSize(50),
        marginBottom: GlobalSize(10)
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})