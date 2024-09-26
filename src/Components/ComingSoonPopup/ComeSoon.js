import React, { } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR11, THIRDCOLOR } from '../../Constants/Colors/Colors';
import { FONTS } from "../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../Constants/styles/styles";


const ComeSoonModal = ({ ModalOpen, setModalOpen }) => {


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

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.05, paddingTop: 10 }}>
                        <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: 16 }]}>Coming Soon!</Text>
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.05 }}>
                        <Text style={styles.textC}>This feature will be implement soon.</Text>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.touchBtn} onPress={() => setModalOpen(false)}>
                            <Text style={styles.textBtn}>Okay</Text>
                        </TouchableOpacity>
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
        color: TEXTCOLOR11,
        textAlign: 'left',
        marginBottom: DEFAULTWIDTH * 0.02
    },
    touchBtn: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.22,
        height: DEFAULTWIDTH * 0.11,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: 10,
        paddingTop: DEFAULTWIDTH * 0.05,
        backgroundColor: PUREWHITE,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: DEFAULTWIDTH * 0.55,
        marginTop: DEFAULTWIDTH * 0.028
    }

});

export default ComeSoonModal;
