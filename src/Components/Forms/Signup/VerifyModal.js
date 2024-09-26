import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, THIRDCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { DEFAULTWIDTH } from "../../../Constants/styles/styles";

const VerifyModal = ({ ModalOpen, setModalOpen }) => {

    const [OTPCode, setOtpCode] = useState('')

    const handleOTPChange = (code) => {
        setOtpCode(code);
    };

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalOpen}
            onRequestClose={() => {
                setModalOpen(!ModalOpen)
            }}>
            <View style={styles.mainContainer} >
                <View style={styles.viewMain}>

                    <View style={{ paddingTop: 5, marginLeft: DEFAULTWIDTH * 0.075 }}>
                        <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: 20 }]}>Verify OTP</Text>
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.075, marginHorizontal: 20 }}>
                        <Text style={styles.textC}>Code has been sent to your registered email address.</Text>
                    </View>

                    <View style={styles.viewOTP}>
                        <OTPInputView
                            style={styles.commonOTP}
                            pinCount={6}
                            code={OTPCode}
                            onCodeChanged={handleOTPChange}
                            autoFocusOnLoad={false}
                            codeInputFieldStyle={styles.otpCode}
                            onCodeFilled={(code) => {
                                console.log(`Code is ${code}, you are good to go!`)
                            }}
                        />

                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                        <TouchableOpacity style={styles.touchBtn} onPress={() => setModalOpen(false)}>
                            <Text style={styles.textBtn}>Verify</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginBottom: 15, marginLeft: DEFAULTWIDTH * 0.075 }}>
                        <Text style={[styles.textC, { color: PRIMARYCOLOR, fontWeight: '600' }]} >Didn’t get the OTP ? <Text style={[styles.textC, { color: PRIMARYCOLOR, fontFamily: FONTS.FontSemiB }]}>Resend</Text></Text>
                    </View>
                </View>
            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: 14,
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: 14,
        color: THIRDCOLOR,
        fontWeight: '700'
    },
    textC: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        marginBottom: DEFAULTWIDTH * 0.02,
        textAlign: 'left'
    },
    touchBtn: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.76,
        height: DEFAULTWIDTH * 0.14,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: 10,
        paddingTop: DEFAULTWIDTH * 0.05,
        backgroundColor: PUREWHITE,
        justifyContent: 'flex-start'
    },
    viewOTP: {
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    otpCode: {
        borderRadius: 8,
        fontSize: 14,
        margin: 1,
        color: PRIMARYCOLOR
    },
    commonOTP: {
        height: 60,
        marginLeft: 40,
        marginRight: 40
    }

});

export default VerifyModal;
