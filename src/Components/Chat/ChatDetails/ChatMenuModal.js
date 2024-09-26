import React, { } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

//IMPORT CONSTANTS
import { BACKGROUNDWHITE,PLACEHOLDERCOLOR2, PRIMARYCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';


const ChatMenuModal = ({ ModalOpen, setModalOpen }) => {

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

                    <TouchableOpacity style={{margin:GlobalSize(12)}} onPress={()=>setModalOpen(false)}>
                        <Text style={styles.textSearch}>Search</Text>
                    </TouchableOpacity>

                    <View style={styles.lineIcon} />
                    <TouchableOpacity style={{margin:GlobalSize(12)}} onPress={()=>setModalOpen(false)}>
                        <Text style={styles.textSearch}>Mute Notification</Text>
                    </TouchableOpacity>

                    <View style={styles.lineIcon} />

                    <TouchableOpacity style={{margin:GlobalSize(12)}} onPress={()=>setModalOpen(false)}>
                        <Text style={styles.textSearch}>Report</Text>
                    </TouchableOpacity>

                    <View style={styles.lineIcon} />

                    <TouchableOpacity style={{margin:GlobalSize(12)}} onPress={()=>setModalOpen(false)}>
                        <Text style={styles.textSearch}>Block</Text>
                    </TouchableOpacity>

                    <View style={styles.lineIcon} />

                    <TouchableOpacity style={{margin:GlobalSize(12)}} onPress={()=>setModalOpen(false)}>
                        <Text style={styles.textSearch}>Clear Chat</Text>
                    </TouchableOpacity>

                    <View style={styles.lineIcon} />

                    <TouchableOpacity style={{margin:GlobalSize(12)}} onPress={()=>setModalOpen(false)}>
                        <Text style={styles.textSearch}>Export Chat</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </Modal>


    );
};

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: DEFAULTWIDTH * 0.5,
        paddingTop: DEFAULTWIDTH * 0.17

    },
    viewMain: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.45,
        elevation: 5,

    },
    textSearch: {
        fontSize: fontSize(16),
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR
    },
    lineIcon: {
        width: DEFAULTWIDTH * 0.45,
        height: 1,
        backgroundColor:PLACEHOLDERCOLOR2,
        opacity:0.2
    }

});

export default ChatMenuModal;
