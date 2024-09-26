import React, { } from "react";
import { Modal, StyleSheet, Text, View, Dimensions } from "react-native";
import { PUREWHITE, TEXTCOLOR11 } from '../../Constants/Colors/Colors';
import { FONTS } from "../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../Constants/styles/styles";
import { GlobalSize, fontSize } from "../../Constants/ResponsiveFont/ResponsiveFonts";


const TooltipModal = ({ ModalOpen, setModalOpen }) => {

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
                        {/* <View style={{ marginLeft: DEFAULTWIDTH * 0.05, paddingTop: GlobalSize(10) }}>
                            <Text style={[styles.textC, { fontFamily: FONTS.FontSemiB, fontSize: fontSize(14) }]}>Error !</Text>
                        </View> */}


                        <View style={styles.msgView}>
                            <Text style={styles.textC}>Feature is not implemented</Text>
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
        bottom: 60
    },
    textC: {
        fontSize: 12,
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR11,
        textAlign: 'left',
    
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: 10,
        backgroundColor: PUREWHITE,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        elevation: 2,
        flexDirection: 'row',
        backgroundColor:'#d5e1f5',

    },
    viewBorder: {
        flexDirection: 'column',
        borderLeftWidth: 4,
        borderLeftColor: '#4eb8f5',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor:'#d5e1f5',
        padding:GlobalSize(15),
        
    },
    msgView: {
        marginLeft: DEFAULTWIDTH * 0.05,
        //marginBottom: GlobalSize(10),
        marginRight: GlobalSize(20),
        backgroundColor:'#d5e1f5',
    }



});

export default TooltipModal;
