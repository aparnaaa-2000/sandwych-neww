import React, { } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";

//COLORS IMPORTED GLOBALLY
import {
    BORDERCOLOR1,
    PRIMARYCOLOR,
    PUREWHITE,
    TEXTCOLOR10,
    THIRDCOLOR
} from '../../../Constants/Colors/Colors';

import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../../Constants/styles/styles";


const InvalidLoginModal = ({ ModalOpen, setModalOpen, message }) => {

    const CloseModal = () => { //To close the Delete Modal
        setModalOpen(false)
    }

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

                    <View style={{ paddingTop: 10, alignContent: 'center' }}>
                        <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: 17 }]}>Sign In Error</Text>
                    </View>
                    <View style={{ alignContent: 'center', marginHorizontal: 22, marginBottom: 10 }}>
                        <Text style={[styles.textC, { fontSize: 13 }]}>{message}</Text>
                    </View>

                    <View style={styles.lineView} />
                    <View style={styles.buttonView}>
                        <TouchableOpacity
                            style={[styles.touchBtn, { backgroundColor: PUREWHITE }]}
                            onPress={() => CloseModal()}>
                            <Text style={styles.textCancel}>OK</Text>
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
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: 18,
        color: THIRDCOLOR,
        fontWeight: '700'
    },
    textC: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: PRIMARYCOLOR,
        textAlign: 'left',
        marginBottom: DEFAULTWIDTH * 0.02
    },
    touchBtn: {
        //marginBottom: width * 0.05,
        width: DEFAULTWIDTH * 0.22,
        height: DEFAULTWIDTH * 0.11,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.84,
        borderRadius: 10,
        paddingTop: DEFAULTWIDTH * 0.05,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonView: {
        alignItems: 'center',
        marginTop: DEFAULTWIDTH * 0.015,
        marginBottom: DEFAULTWIDTH * 0.017
    },
    lineView: {
        borderWidth: 0.5,
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.84
    }

});

export default InvalidLoginModal;
