import React, { } from "react";
import { Modal, StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLORW } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { BlueSts } from "../../../../assets";
import { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { GlobalSize, fontSize, height, width } from "../../../Constants/ResponsiveFont/ResponsiveFonts";

const OngoingDgModal = ({ ModalOpen, setModalOpen, item }) => {

    const CloseModal = () => { //To close the Delete Modal
        setModalOpen(false)
    }

console.log("ITEM...................",item)
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
                        <Image
                            source={require('../../../../assets/Images/Treatment.png')} 
                            resizeMode='contain'
                            style={{ width: width(60), height: height(60) }} />

                        <View style={styles.textView}>
                            <Text style={styles.textDgNm}>{item?.Name ? item?.Name : item?.diagnosis_name}</Text>
                            <Text style={styles.textCode}>ICD Code - {item?.Code ? item?.Code : item?.icd_code}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: GlobalSize(8) }}>
                                <BlueSts />
                            </View>

                            <View>
                                <Text style={styles.textDR}>{item?.Doctor ? item?.Doctor : item?.doctor_name}</Text>
                            </View>
                        </View>

                        <View style={styles.viewTime}>

                            <View style={styles.viewDisplay}>
                                <Text style={styles.textDT} >{item?.Date ? item?.Date : item?.start_date}</Text>
                            </View>

                            <View style={styles.viewDisplay}>
                                <Text style={styles.textDT}>{item?.Period ? item?.Period : item?.duration}</Text>
                            </View>
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
        width: DEFAULTWIDTH * 0.75,
        borderRadius: GlobalSize(10),
        paddingTop: DEFAULTHEIGHT * 0.05,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDgNm: {
        fontFamily: FONTS.FontSemiB,
        fontSize: GlobalSize(18),
        color: TEXTCOLOR5
    },
    textCode: {
        fontSize: fontSize(12),
        color: TEXTCOLORW,
        fontFamily: FONTS.FontRegular
    },
    textDR: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(14),
        color: TEXTCOLORW
    },
    viewDisplay: {
        padding: GlobalSize(7),
        backgroundColor: PRIMARYCOLOR,
        borderRadius: GlobalSize(15),
        alignItems: 'center',
        justifyContent: 'center',
        margin: GlobalSize(10),
        paddingLeft: GlobalSize(10),
        paddingRight: GlobalSize(10)
    },
    textDT: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    textView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(10),
        marginBottom: GlobalSize(10)
    },
    viewTime: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: GlobalSize(10)
    }

});

export default OngoingDgModal;
