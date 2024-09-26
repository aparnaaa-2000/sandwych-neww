import React, { useState} from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR11, THIRDCOLOR,BACKGROUNDWHITE, BORDERCOLOR4, TEXTCOLOR7, BOTTOMTABTEXT1 } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { fontSize, GlobalSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";

//IMPORT THIRD-PARTY PACKAGES
import { Dropdown } from "react-native-element-dropdown";


const ChatPriorityModal = ({ ModalOpen, setModalOpen,setPriority,Priority,sendMessages }) => {


    const [PriorityData, setPriorityData] = useState([
        { label: 'Low', value: '2' },
        { label: 'Moderate', value: '1' },
        { label: 'High', value: '0' },
    ]);

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

                    <View style={{padding:GlobalSize(7)}}>
                        <Text style={styles.textC}>Please select the priority level of your message</Text>
                    </View>

                    <View>
                                      <Dropdown
                                        style={styles.dropDnContainer}
                                        placeholderStyle={styles.placeholderS}
                                        itemTextStyle={styles.textArea}
                                        selectedTextStyle={styles.textArea}
                                        containerStyle={styles.dropView}
                                        data={PriorityData}
                                        showsVerticalScrollIndicator={false}
                                        search={false}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'Select'}
                                        value={Priority}
                                        onChange={item => {
                                            setPriority(item.value)
                                        }}
                                    />
                                </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.touchBtn} onPress={() => sendMessages()}>
                            <Text style={styles.textBtn}>Send Message</Text>
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
        width: DEFAULTWIDTH * 0.52,
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
        alignItems: 'center',
        justifyContent: 'center',
        },
    buttonView: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop: DEFAULTWIDTH * 0.028
    },
    dropDnContainer: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.7,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        height: GlobalSize(45),
        marginBottom:GlobalSize(10)
    },
    dropView: {
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.7,
        padding: GlobalSize(5),
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1,
    },

});

export default ChatPriorityModal;