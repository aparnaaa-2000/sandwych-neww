import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';

//IMPORT ICONS (CHANGE TO  SVG)
import IconP from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Pdf from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Ionicons';

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts';
import { BORDERCOLOR1, PUREBLACK, PUREWHITE, TEXTCOLOR11 } from '../../../Constants/Colors/Colors';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const CommonPreview = ({ fileType, fileName, sendImage, imagePath }) => {

    return (
        <View style={{ alignContent: 'center' }}>
            <View style={styles.imageView}>

                {fileType == 'image/jpeg' ?
                    <View>
                        <Image
                            source={{ uri: imagePath }}
                            resizeMode='cover'
                            style={{ width: GlobalSize(50), height: GlobalSize(40) }}
                        />
                    </View> :

                    fileType == 'audio/mpeg' ?
                        <View style={[{ flexDirection: 'row' }]}>
                            <TouchableOpacity style={styles.playIcon} >
                                <IconP name='headphone' color={'#FFFFFF'} size={26} />
                            </TouchableOpacity>
                            <Text style={[styles.messageText, { padding: 12 }]}>{fileName}</Text>
                        </View> :

                        fileType == 'application/pdf' ?
                            <View style={styles.pdfView}>
                                <Pdf name={'file-pdf'} size={25} color={'#de2104'} />
                                <Text style={[styles.messageText, { padding: GlobalSize(5) }]}>{fileName}</Text>
                            </View> :

                            fileType == 'video/mp4' ?
                                <View style={{ flexDirection: 'row' }}>
                                    <ImageBackground
                                        source={{ uri: imagePath }}
                                        //resizeMode={'contain'}
                                        style={styles.imageVideo}
                                    >
                                        <Icon4 name="caret-forward-circle-outline" color={'#FFFFFF'} size={30} />
                                    </ImageBackground>

                                </View>
                                : null}

                <TouchableOpacity style={styles.rightIconButtonStyle} onPress={() => sendImage()}>
                    <Icon3
                        name="send-circle"
                        size={30}
                        color={'#000000'}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        alignSelf: 'flex-start',
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(6),
        margin: GlobalSize(5),
        padding: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 0.5,
    },
    messageText: {
        fontSize: fontSize(12),
        color: TEXTCOLOR11,
        fontFamily: FONTS.FontRegular

    },
    playIcon: {
        backgroundColor: PUREBLACK,
        width: DEFAULTWIDTH * 0.12,
        height: DEFAULTWIDTH * 0.12,
        borderRadius: GlobalSize(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightIconButtonStyle: {
        justifyContent: "center",
        alignItems: "center",
        paddingRight: GlobalSize(5),
        paddingLeft: GlobalSize(10),
        borderLeftWidth: 1,
        borderLeftColor: "#fff",
    },
    imageView: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.97,
        borderRadius: GlobalSize(10),
        padding: GlobalSize(10),
        margin: GlobalSize(5),
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageVideo: {
        width: DEFAULTWIDTH * 0.1,
        height: DEFAULTWIDTH * 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pdfView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default CommonPreview;