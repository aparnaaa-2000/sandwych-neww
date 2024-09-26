import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

//IMPORT CONSTANTS
import { BORDERCOLOR4,GREYICONBACKGROUND, PRIMARYCOLOR, PUREWHITE,TEXTCOLOR7} from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import SDOHTextInputRadioBtn from "../../Common/SDOHTextInput/SDOHTextInputRadioBtn";
import { BlueGain } from "../../../../assets";


const ChooseSupportModal = ({ ModalOpen, setModalOpen, }) => {

    const [TaskValue, setTaskValue] = useState(null)
    const [InputValue, setInputValue] = useState(null)
    const [ValueSelection, setValueSelection] = useState(null)
    const [borderStatus, setBorderStatus] = useState(true)

    const CloseModal = () => { //To close the  Modal
        setModalOpen(false)
        setTaskValue(null)
        setInputValue(null)
    }

    const [Data, setData] = useState([
        {
            id: 1,
            Title: 'Completed',
            isSelected: false,
        },
        {
            id: 2,
            Title: 'Not Completed',
            isSelected: false,
        },
        {
            id: 3,
            Title: 'Skipped',
            isSelected: false,
        },
    ])

    const SubmitTask = () => { //SUBMIT THE  SUPPORT 
        if (TaskValue == null) {
      
        } else if (TaskValue == 1 && InputValue || TaskValue !== 1) {
            setModalOpen(false)
            setTaskValue(null)
            setInputValue(null)
        }
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
                <View style={[styles.viewMain, {}]}>

                    {/* <View style={{ marginLeft: DEFAULTWIDTH * 0.05 }}>
                        <Text style={styles.textSupport}>Have you completed the task?</Text>
                    </View> */}

                    <View style={styles.alignView}>
                        <View style={styles.viewGain}>

                            <View>
                                <BlueGain width={55} height={55} />
                            </View>

                            <View style={{ marginLeft: 10 }}>
                                <Text style={[styles.textMonth, { fontSize: 20 }]}>Gain Weight</Text>

                                <View style={styles.viewSlf}>
                                    <Text style={[styles.textWg, { color: PUREWHITE }]}>Self</Text>
                                </View>
                                <Text style={styles.textWg}>Increase weight by 5 Kg</Text>
                                <View style={{ marginTop: 10 }}>
                                    <Text style={styles.textMonth}>05/01/2024</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: DEFAULTHEIGHT * 0.125 }}>
                                <Text style={styles.textMonth}>For 1 month</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginBottom: 15 }}>
                        <SDOHTextInputRadioBtn
                            Data={Data}
                            placeholder={''}
                            radioBtnValue={TaskValue}
                            setRadioBtnValue={setTaskValue}
                            textInputValue={InputValue}
                            setTextInputValue={setInputValue}
                            radioBtnSelect={ValueSelection}
                            setRadioBtnSelect={setValueSelection}
                            borderStatus={borderStatus}
                            setBorderStatus={setBorderStatus}

                        />
                    </View>

                    <View style={styles.viewBtn}>
                        <TouchableOpacity style={styles.touchCancel} onPress={()=>CloseModal()}>
                            <Text style={styles.textCancel}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnView,{opacity:TaskValue==1 && InputValue && borderStatus ||TaskValue  !== 1 ? 1: 0.5}]} onPress={() => SubmitTask()}>
                            <Text style={styles.textBtn}>Save</Text>
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
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'flex-end'

    },
    viewMain: {
        width: DEFAULTWIDTH,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: DEFAULTWIDTH * 0.07,
        backgroundColor: PUREWHITE,
        justifyContent: 'center',
        marginTop: 20,
        padding: 15

    },
    btnView: {
        width: DEFAULTWIDTH * 0.25,
        height: DEFAULTWIDTH * 0.1,
        marginRight: 10,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        opacity: 0.5
    },
    textBtn: {
        fontSize: 12,
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    textSupport: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: 15,
        marginBottom: 10
    },

    textCancel: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR7
    },
    touchCancel: {
        width: DEFAULTWIDTH * 0.25,
        height: DEFAULTWIDTH * 0.1,
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginRight: 10
    },
    viewBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    viewGain: {
        width: DEFAULTWIDTH * 0.82,
        backgroundColor: GREYICONBACKGROUND,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16
    },
    textMonth: {
        fontSize: 12,
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB
    },
    textWg: {
        fontFamily: FONTS.FontRegular,
        color: PRIMARYCOLOR,
        fontSize: 12,
    },
    viewSlf: {
        width: DEFAULTWIDTH * 0.17,
        height: DEFAULTWIDTH * 0.08,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 5
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }

});

export default ChooseSupportModal;
