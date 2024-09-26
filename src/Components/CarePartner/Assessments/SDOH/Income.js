import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useState } from 'react';
import { BORDERCOLOR4, BORDERCOLOR5, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { SafetyData } from '../../../../Constants/Texts/Assessments/SDOH/SDOH';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import SDOHTextInput from '../../../Common/SDOHTextInput/SDOHTextInput';

const Income = ({
    Heading,
    Income1,
    Income2,
    setIncome1,
    setIncome2,
    QuestionFilter,
    OptionFilter,
    mappedData }) => {

    const newArray = OptionFilter.map(item => ({ //FUNCTION FOR FILTER THE OPTIONS
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));


    switch (Heading) {
        case 0:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'How often does anyone, including family and friends, physically hurt you?';
            break;

        case 1:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'How often does anyone, including family and friends, insult or talk down to you?';
            break;

        case 2:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'How often does anyone, including family and friends, threaten you with harm?';
            break;

        case 3:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'How often does anyone, including family and friends, scream or curse at you?';
            break;
    }

    const onChangeValue = (text) => { //FUNCTION FOR STORE THE VALUE INTO A STATE
        if (Heading === 0) {
            setIncome1(text)
        }
        else {
            setIncome2(text)
        }
    }

    const filteredMappedData1 = mappedData?.filter(item => item.id == 91);
    const filteredMappedData2 = mappedData?.filter(item => item.id == 93);


    return (
        <View>
            <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={imageSource} />
                </View>
            </View>
            
            <View style={styles.viewText}>
                <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>
                    {QuestionFilter[Heading]?.question}</Text>
            </View>
            <View>
                <View style={{ marginLeft: GlobalSize(10) }}>

                    {Heading === 0 ?
                    <TextInput
                        value={Income1 ? Income1 :filteredMappedData1[0]?.answer}
                        //placeholder={placeholder}
                        placeholderTextColor={BORDERCOLOR5}
                        style={styles.inputWrite}
                        maxLength={50}
                        keyboardType='number-pad'
                        onChangeText={text => onChangeValue(text)}
                    />:
                    <TextInput
                    value={Income2 ? Income2:filteredMappedData2[0]?.answer}
                    //placeholder={placeholder}
                    placeholderTextColor={BORDERCOLOR5}
                    style={styles.inputWrite}
                    maxLength={50}
                    keyboardType='number-pad'
                    onChangeText={text => onChangeValue(text)}
                />}

                </View>

            </View>

        </View>
    )
}

export default Income;

const styles = StyleSheet.create({
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE,
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR,
    },
    imageStyle: {
        width: DEFAULTWIDTH * 0.9,
        height: DEFAULTWIDTH * 0.82,
        //marginBottom: '4%',
    },
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(10),
    },
    imageView: {
        alignItems: 'center',
        width: DEFAULTWIDTH * 0.9,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(10),
        elevation: 2,
        marginBottom: GlobalSize(15),
    },
    textDesc: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        maxWidth: DEFAULTWIDTH * 0.9,
        lineHeight: GlobalSize(20)
    },
    viewText: {
        marginLeft: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    inputWrite: {
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(15),
        textAlign: 'left',
        borderColor: BORDERCOLOR5,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        width: DEFAULTWIDTH * 0.88,
        marginLeft: GlobalSize(5)
    },
})