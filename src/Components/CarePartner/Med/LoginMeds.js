import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7, VALIDCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { Close } from '../../../../assets';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const LoginMeds = ({ navigation, route }) => {

    const NameRef = useRef();
    const PasswordRef = useRef();
    const [Username, setUserName] = useState(null)
    const [Password, setPassword] = useState(null)
    const [NameStatus, setNameStatus] = useState(true)
    const [PasswordStatus, setPasswordStatus] = useState(true)

    //NAME VALIDATION
    const handleNameChange = (text) => {
        const isValidName = /^[A-Z a-z0-9@.,-_+\s]{2,}$/.test(text);
        setNameStatus(isValidName)
        setUserName(text);
    };

    //PASSWORD VALIDATION
    const handlePasswordChange = (text) => {
        console.log("password status.....................", Password?.length)
        if (Password?.length > 1) {
            setPasswordStatus(true)
            setPassword(text);
        } else {
            setPasswordStatus(false)
            setPassword(text);
        }

    };

    const OnSubmitData = () => {
        if (Username == null) {
            setNameStatus(false)
        } else if (Password == null) {
            setPasswordStatus(false)
        } else {
            setNameStatus(true)
            setPasswordStatus(true)
        }


    }


    return (

        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.textConnect}>Connect Account</Text>
                    </View>

                    <View style={{ top: 2 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Close width={22} height={22} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginHorizontal: 20, top: 12 }}>
                    <Text style={styles.logText}>Log in to your Walgreens account to transfer your prescriptions to SandwYch.</Text>
                </View>

                <View style={styles.border} />
                <View style={[styles.alignView, { bottom: DEFAULTWIDTH * 0.1 }]}>
                    <FastImage
                        style={{ height: DEFAULTWIDTH * 0.4, width: DEFAULTWIDTH * 0.6 }}
                        source={{
                            uri: route?.params?.ImageUri,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>

                <View style={{ bottom: DEFAULTHEIGHT * 0.05 }}>
                    <View style={{ margin: 6, left: 14, }}>
                        <Text style={styles.textUser}>Username or Email</Text>
                    </View>

                    <View style={styles.alignView}>
                        <TextInput
                            ref={NameRef}
                            value={Username}
                            onChangeText={(text) => handleNameChange(text)}
                            style={[styles.textIn, { borderColor: NameStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: 10 }}>
                        {!NameStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Username or Email is required</Text>
                        )}
                    </View>


                    <View style={{ margin: 6, left: 14 }}>
                        <Text style={styles.textUser}>Password</Text>
                    </View>

                    <View style={styles.alignView}>
                        <TextInput
                            ref={PasswordRef}
                            value={Password}
                            onChangeText={(text) => handlePasswordChange(text)}
                            style={[styles.textIn, { borderColor: PasswordStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.05 }}>
                        {!PasswordStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Password is required</Text>
                        )}
                    </View>

                    <View style={[styles.alignView, { marginTop: DEFAULTHEIGHT * 0.04 }]}>
                        <TouchableOpacity style={styles.btnView} onPress={() => OnSubmitData()}>
                            <Text style={styles.textBtn}>Connect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: DEFAULTWIDTH * 0.05,
        top: GlobalSize(10)
    },
    textConnect: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        fontSize: fontSize(18)
    },
    logText: {
        fontSize: fontSize(16),
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontMedium,
    },
    border: {
        borderWidth: 0.5,
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        margin: DEFAULTWIDTH * 0.1,
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH * 0.05,
    },
    textUser: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        fontWeight: '500',
        color: TEXTCOLOR7
    },
    textIn: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        width: DEFAULTWIDTH * 0.90,
        height: DEFAULTWIDTH * 0.13,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        paddingLeft: GlobalSize(15)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.90,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(10),
    },
    textBtn: {
        fontSize: fontSize(16),
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default LoginMeds;