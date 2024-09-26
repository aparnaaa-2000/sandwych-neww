import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

//IMPORT CONSTANTS
import { PUREWHITE, TEXTCOLOR5, TEXTCOLORW } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";
import { Account } from "../../../../assets";

import FastImage from "react-native-fast-image";


const AboutUsModal = ({ ModalOpen, setModalOpen, item }) => {

    const [imageError, setImageError] = useState(false);

    const CloseModal = () => { //To close the Modal
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
            <TouchableWithoutFeedback onPress={CloseModal}>
                <View style={styles.mainContainer} >
                    <View style={styles.viewMain} onPress={() => CloseModal()}>

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: DEFAULTWIDTH * 0.06 }}>
                                {!imageError ?
                                    <FastImage
                                        style={styles.imgView}
                                        source={{
                                            uri: item?.picture_url,
                                            priority: FastImage.priority.high,
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                        onError={() => setImageError(true)}
                                    /> :
                                    <Account />}
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.textDgNm}>{item?.title}</Text>
                                <Text style={styles.textCode}>607-777-2804</Text>
                                <Text style={styles.textCode}>support@gmail.com</Text>

                            </View>
                        </View>
                        <View style={{ padding: GlobalSize(25), paddingTop: GlobalSize(12) }}>
                            <Text style={styles.textCode}>{item?.text_content}</Text>
                        </View>


                    </View>
                </View>
            </TouchableWithoutFeedback>

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

    viewMain: {
        width: DEFAULTWIDTH * 0.85,
        borderRadius: GlobalSize(10),
        paddingTop: DEFAULTHEIGHT * 0.04,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDgNm: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(15),
        color: TEXTCOLOR5,
        marginTop: GlobalSize(10)
    },
    textCode: {
        fontSize: fontSize(12),
        color: TEXTCOLORW,
        fontFamily: FONTS.FontRegular
    },
    imgView: {
        width: GlobalSize(70),
        height: GlobalSize(70),
        borderRadius: GlobalSize(35)
    }


});

export default AboutUsModal;
