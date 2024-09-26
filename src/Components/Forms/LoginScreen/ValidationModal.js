import React, { } from "react";
import { Modal, StyleSheet, Text,View, Dimensions } from "react-native";
import { PUREWHITE,THIRDCOLOR, TEXTCOLOR11 } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../../Constants/styles/styles";


const ValidationModal = ({ ModalOpen, setModalOpen, Message }) => {

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

                    <View style={styles.invalid}>
                        <View style={{ marginLeft: DEFAULTWIDTH * 0.05, paddingTop: 10 }}>
                            <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: 14 }]}>Error !</Text>
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
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: 14,
        color: THIRDCOLOR,
        fontWeight: '700'
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
    invalid:{
         flexDirection: 'column',
     borderLeftWidth: 4, 
     borderLeftColor: '#f71105', 
     borderTopLeftRadius: 10, 
     borderBottomLeftRadius: 10 
    }

});

export default ValidationModal;
