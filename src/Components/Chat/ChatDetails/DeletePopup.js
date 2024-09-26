import React, { } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR11, THIRDCOLOR, VALIDCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { fontSize, GlobalSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";


const DeleteModal = ({ ModalOpen, setModalOpen, DeleteMessage}) => {

    const OnDeleteId = () => { //FUNCTION FOR DELETING THE MESSAGE
        DeleteMessage()
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

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.05, paddingTop: 10 }}>
                        <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: fontSize(16) }]}>Delete this message?</Text>
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.05 }}>
                        <Text style={styles.textC}>Are you sure you want to delete this message ?</Text>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={[styles.touchBtn, { backgroundColor: PUREWHITE }]}
                            onPress={() => setModalOpen(false)}>
                            <Text style={[styles.textBtn, { color: VALIDCOLOR }]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchBtn} onPress={() => OnDeleteId()}>
                            <Text style={styles.textBtn}>Delete</Text>
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
        marginRight: GlobalSize(10)
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
        alignItems: 'center',
        marginLeft: DEFAULTWIDTH * 0.35
    }

});

export default DeleteModal;
