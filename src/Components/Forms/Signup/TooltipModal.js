import React, { } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PRIMARYCOLOR, PUREWHITE,TEXTCOLOR13,} from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";


const ToolTipModal = ({ ModalOpen, setModalOpen,Title,Desc}) => {

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
            <View style={styles.mainContainer} >
                <View style={styles.viewMain}>

                <View style={{marginBottom:DEFAULTWIDTH*0.035,marginLeft:DEFAULTWIDTH*0.06}}>
                    <Text style={styles.titleText}>{Title}</Text>
                </View>
             
             <View style={{marginHorizontal:GlobalSize(22),marginBottom:DEFAULTWIDTH*0.06}}>
                <Text style={styles.textDesc}>{Desc}</Text>
             </View>
                
                <View style={DEFAULTSTYLES.alignView}>
                <TouchableOpacity style={styles.touchBtn} onPress={()=>CloseModal()}>
                    <Text style={styles.okText}>OK</Text>
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
        alignItems:'flex-end',
        justifyContent:'flex-end'
        
    },
    viewMain: {
        width: DEFAULTWIDTH,
        borderTopLeftRadius: 20,
        borderTopRightRadius:20,
        paddingTop: DEFAULTWIDTH * 0.08,
        backgroundColor: PUREWHITE,
    },
    titleText:{
        fontSize:fontSize(14),
        color:PRIMARYCOLOR,
        fontFamily:FONTS.FontSemiB
    },
    textDesc:{
        fontSize:fontSize(14),
        fontFamily:FONTS.FontRegular,
        color:TEXTCOLOR13
    },
    touchBtn:{
        backgroundColor:PRIMARYCOLOR,
        width:DEFAULTWIDTH*0.3,
        height:DEFAULTHEIGHT*0.05,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:25,
        marginBottom:DEFAULTWIDTH*0.05
    },
    okText:{
        fontSize:fontSize(14),
        color:PUREWHITE,
        fontFamily:FONTS.FontSemiB
    }
 

});

export default ToolTipModal;
