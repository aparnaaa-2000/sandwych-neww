import React, { } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions,Image } from "react-native";
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, THIRDCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { GlobalSize, fontSize, height, width } from "../../../Constants/ResponsiveFont/ResponsiveFonts";


const OTPSuccessModal = ({ ModalOpen, setModalOpen,navigation }) => {

    const CloseModal = () => { //To close the Delete Modal
        navigation()
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

                    <Image
                     source ={require('../../../../assets/Images/OTPSS.png')}
                     style={{width:width(100),height:height(100)}}resizeMode="contain"/>

                 <View style={{ paddingTop: GlobalSize(10) }}>
                        <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize:20 }]}>Congratulations !</Text>
                    </View> 

                    <View style={{marginBottom:GlobalSize(15) }}>
                        <Text style={styles.textC}>Your code has been verified successfully.</Text>
                    </View> 

                  
                <TouchableOpacity style={styles.touchBtn} onPress={()=>CloseModal()}>
                    <Text style={styles.textBtn}>Close</Text>
                </TouchableOpacity>
                      
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
        fontSize: fontSize(14),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: THIRDCOLOR,
        fontWeight: '700'
    },
    textC: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        marginBottom: DEFAULTWIDTH * 0.02,
        textAlign:'center'
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
        alignItems: 'center',
        justifyContent: 'center'
    },
   

});

export default OTPSuccessModal;
