import React, { } from "react";
import { Modal, StyleSheet, Text, View, Dimensions } from "react-native";
import {  PUREWHITE, TEXTCOLOR11, THIRDCOLOR } from '../../Constants/Colors/Colors';
import { FONTS } from "../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../Constants/styles/styles";

const SuccessPopup = ({ ModalOpen, setModalOpen, Message }) => {

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

                    <View style={styles.viewBorder}>
                        <View style={{ marginLeft: DEFAULTWIDTH * 0.05, paddingTop: 10 }}>
                            <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: 14 }]}>Success !</Text>
                        </View>


                        <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: 10 }}>
                            <Text style={styles.textC}>{Message}</Text>
                        </View>
                    </View>
                </View>
            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 20
    },
    textC: {
        fontSize: 11,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR11,
        textAlign: 'left',
        marginBottom: DEFAULTWIDTH * 0.0
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: 10,
        backgroundColor: PUREWHITE,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 2,
        flexDirection: 'row'
    },
    viewBorder: {
        flexDirection: 'column',
        borderLeftWidth: 4,
        borderLeftColor: 'green',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    }


});

export default SuccessPopup;
