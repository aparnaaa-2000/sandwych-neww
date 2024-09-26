import React, { useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, ScrollView } from "react-native";
import { BORDERCOLOR4, GREYBACKGROUND1, PLACEHOLDERCOLOR1, PLACEHOLDERCOLOR2, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR11, TEXTCOLOR5, TEXTCOLOR7, THIRDCOLOR, VALIDCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { BalancedFace, BlueBed, BlueStar, Close, DarkGreenFace, GloomyFace, GreenFace, GreyStar, HappyFace, OrangeFace, PleasentFace, RedFace, SadFace, YellowFace, YellowStar } from "../../../../assets"; // Assuming you have star icons
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";


const ReviewRatingModal = ({ ModalReview, setModalReview, navigation,selectedMood,setSelectedMood,Review,setReview,OnReviewRate }) => {

    const reviewRef = useRef();


    const [errorStatus, setErrorStatus] = useState(true)

    const handleMoodSelect = mood => {
        setSelectedMood(mood);
    };

    //Here all the mood Icons are defined according the selected
    const getIconComponent = (mood, isSelected) => {
        switch (mood) {
            // ... Cases to set patients mood
            case '0':
                return isSelected ? (
                    <DarkGreenFace width={40} height={40} top={-3} />
                ) : (

                    <HappyFace width={35} height={35} />

                );
            case '1':
                return isSelected ? (
                    <GreenFace width={40} height={40} top={-3} />
                ) : (
                    <PleasentFace width={35} height={35} />
                );
            case '2':
                return isSelected ? (
                    <YellowFace width={40} height={40} top={-3} />
                ) : (
                    <BalancedFace width={35} height={35} />
                );
            case '3':
                return isSelected ? (
                    <OrangeFace width={40} height={40} top={-3} />
                ) : (
                    <GloomyFace width={35} height={35} />
                );
            case '4':
                return isSelected ? (
                    <RedFace width={40} height={40} top={-3} />
                ) : (
                    <SadFace width={35} height={35} />
                );

            default:
                return <SadFace width={26} height={26} />;
        }
    };


    const handleReviewText = (text) => {
        const isReview = /^[A-Za-z.,()0-9 ]{2,}$/.test(text);
        setErrorStatus(isReview)
        setReview(text);
    };


    const CloseModal = () => {
        if (Review == null) {
            reviewRef?.current?.focus()
            setErrorStatus(false)
        } else {
            setModalReview(false)
        }
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={ModalReview}
                onRequestClose={() => {
                    setModalReview(!ModalReview)
                }}>
                <View style={styles.mainContainer} >
                    <View style={styles.viewMain}>

                        <View style={{ marginBottom: GlobalSize(10) }}>
                            <View style={styles.alignRate}>
                                <View>
                                    <Text style={styles.textRate}>What is your Rating?</Text>
                                </View>

                                <TouchableOpacity onPress={() => setModalReview(false)} style={{ right: GlobalSize(20) }}>
                                    <Close />
                                </TouchableOpacity>
                            </View>

                            <View
                                style={styles.moodView}>
                                <TouchableOpacity onPress={() => handleMoodSelect('0')}>
                                    {getIconComponent('0', selectedMood === '0')}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMoodSelect('1')}>
                                    {getIconComponent('1', selectedMood === '1')}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMoodSelect('2')}>
                                    {getIconComponent('2', selectedMood === '2')}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMoodSelect('3')}>
                                    {getIconComponent('3', selectedMood === '3')}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleMoodSelect('4')}>
                                    {getIconComponent('4', selectedMood === '4')}
                                </TouchableOpacity>
                                {/* Repeat the above pattern for other moods */}
                            </View>

                            <Text style={styles.textSh}>Share your opinion about this service</Text>
                        </View>
                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={[styles.viewTextInput, { borderColor: errorStatus ? BORDERCOLOR4 : VALIDCOLOR }]}>
                                <TextInput
                                    ref={reviewRef}
                                    style={styles.textInput}
                                    value={Review}
                                    onChangeText={(text) => handleReviewText(text)} />
                            </View>


                            <View style={{ marginBottom: GlobalSize(15), left: GlobalSize(-60) }}>
                                {!errorStatus &&
                                    <Text style={styles.textErr}>Please share a valid opinion</Text>}
                            </View>

                            <TouchableOpacity style={styles.touchBtn} onPress={() => OnReviewRate()}>
                                <Text style={styles.textBtn}>Send Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>

        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtn: {
        fontSize: fontSize(14),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(12),
        color: THIRDCOLOR,
        fontWeight: '700'
    },
    textQuest: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(16),
        color: TEXTCOLOR5,
        textAlign: 'center'
    },
    touchBtn: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.35,
        height: DEFAULTWIDTH * 0.11,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    touchCancel: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.22,
        height: DEFAULTWIDTH * 0.11,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: BORDERCOLOR4
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: 10,
        paddingTop: DEFAULTWIDTH * 0.07,
        backgroundColor: PUREWHITE,
        justifyContent: 'center'
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: DEFAULTWIDTH * 0.05,
        margin: GlobalSize(10),
        paddingLeft: DEFAULTWIDTH * 0.15,
        paddingRight: DEFAULTWIDTH * 0.15
    },
    textRate: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(18),
        color: TEXTCOLOR7
    },
    textInput: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12)
    },
    viewTextInput: {
        borderWidth: 1,
        height: DEFAULTHEIGHT * 0.3,
        width: DEFAULTWIDTH * 0.80,
        borderColor: BORDERCOLOR4,
        backgroundColor: GREYBACKGROUND1,
        borderRadius: 10,
        paddingLeft: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    moodView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: GlobalSize(10),
        marginHorizontal: GlobalSize(20)
    },
    textSh: {
        fontFamily: FONTS.FontRegular,
        fontSize: GlobalSize(15),
        color: TEXTCOLOR7,
        marginLeft: GlobalSize(15)
    },
    starContainer: {
        margin: GlobalSize(15),
    },
    textErr: {
        fontFamily: FONTS.FontRegular,
        color: VALIDCOLOR,
        fontSize: GlobalSize(12)
    },
    alignRate: {
        justifyContent: 'space-between',
        flexDirection: "row",
        marginBottom: GlobalSize(10),
        marginLeft: GlobalSize(15)
    }

});

export default ReviewRatingModal;
