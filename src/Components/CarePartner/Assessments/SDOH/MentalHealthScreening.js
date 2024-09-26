import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7, TEXTCOLOR10 } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { Dropdown } from 'react-native-element-dropdown';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';


const MentalHealthScreening = ({
    mappedData,
    Heading,
    QuestionFilter,
    OptionFilter,
    MentalValue1,
    MentalValue2,
    MentalValue3,
    MentalValue4,
    setMentalValue1,
    setMentalValue2,
    setMentalValue3,
    setMentalValue4,

    MentalLabel1,
    MentalLabel2,
    MentalLabel3,
    MentalLabel4,
    setMentalLabel1,
    setMentalLabel2,
    setMentalLabel3,
    setMentalLabel4,

    ScreenOptions1,
    ScreenOptions2,
    ScreenOptions3,
    ScreenOptions4
}) => {


    const HandleOnPress = (option) => { //STORE THE STATE BASED ON QUESTIONS
        if (QuestionFilter[Heading]?.id == 96) {
            setMentalValue1(option.value)
            setMentalLabel1(option.label)
        }
        else if (QuestionFilter[Heading]?.id == 98) {
            setMentalValue2(option.value)
            setMentalLabel2(option.label)
        }
        else if (QuestionFilter[Heading]?.id == 101) {
            setMentalValue3(option.value)
            setMentalLabel3(option.label)
        }
        else if (QuestionFilter[Heading]?.id == 103) {
            setMentalValue4(option.value)
            setMentalLabel4(option.label)
        }
    }

    const filteredMappedData1 = mappedData?.filter(item => item.id == 96);
    const filteredMappedData2 = mappedData?.filter(item => item.id == 98);
    const filteredMappedData3 = mappedData?.filter(item => item.id == 101);
    const filteredMappedData4 = mappedData?.filter(item => item.id == 103);

    return (
        <View>
            <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={imageSource} />
                </View>
            </View>
            <View style={styles.descView}>
                <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>{QuestionFilter[Heading]?.question}</Text>
            </View>

            <View>
                {Heading == 0 ?
                    <View style={DEFAULTSTYLES.alignView}>
                        <Dropdown
                            style={styles.dropDnContainer}
                            placeholderStyle={styles.placeholderS}
                            itemTextStyle={styles.textArea}
                            selectedTextStyle={styles.textArea}
                            containerStyle={styles.dropView}
                            data={ScreenOptions1}
                            search={false}
                            showsVerticalScrollIndicator={false}
                            labelField="label"
                            valueField="value"
                            placeholder={MentalLabel1 ? MentalLabel1 : filteredMappedData1[0]?.answer}
                            dropdownPosition='top'
                            value={MentalValue1}
                            onChange={option => {
                                HandleOnPress(option)
                            }}
                        />
                    </View> :
                    Heading == 1 ?

                        <View style={DEFAULTSTYLES.alignView}>
                            <Dropdown
                                style={styles.dropDnContainer}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={ScreenOptions2}
                                search={false}
                                showsVerticalScrollIndicator={false}
                                labelField="label"
                                valueField="value"
                                placeholder={MentalLabel2 ? MentalLabel2 : filteredMappedData2[0]?.answer}
                                dropdownPosition='top'
                                value={MentalValue2}
                                onChange={option => {
                                    console.log(option,QuestionFilter[Heading]?.id)
                                    HandleOnPress(option)
                                }}
                            />

                        </View> :
                        Heading == 2 ?

                            <View style={DEFAULTSTYLES.alignView}>
                                <Dropdown
                                    style={styles.dropDnContainer}
                                    placeholderStyle={styles.placeholderS}
                                    itemTextStyle={styles.textArea}
                                    selectedTextStyle={styles.textArea}
                                    containerStyle={styles.dropView}
                                    data={ScreenOptions3}
                                    search={false}
                                    showsVerticalScrollIndicator={false}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={MentalLabel3 ? MentalLabel3 : filteredMappedData3[0]?.answer}
                                    dropdownPosition='top'
                                    value={MentalValue3}
                                    onChange={option => {
                                        HandleOnPress(option)
                                    }}
                                />
                            </View> :

                            <View style={DEFAULTSTYLES.alignView}>
                                <Dropdown
                                    style={styles.dropDnContainer}
                                    placeholderStyle={styles.placeholderS}
                                    itemTextStyle={styles.textArea}
                                    selectedTextStyle={styles.textArea}
                                    containerStyle={styles.dropView}
                                    data={ScreenOptions4}
                                    search={false}
                                    showsVerticalScrollIndicator={false}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={MentalLabel4 ? MentalLabel4 : filteredMappedData4[0]?.answer}
                                    dropdownPosition='top'
                                    value={MentalValue4}
                                    onChange={option => {
                                        HandleOnPress(option)
                                    }}
                                />
                            </View>}

            </View>
        </View>
    )
}

export default MentalHealthScreening;

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
    inputWrite: {
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(15),
        alignItems: 'center'
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
    textInView: {
        width: DEFAULTWIDTH * 0.89,
        height: DEFAULTWIDTH * 0.13,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 1,
        marginBottom: GlobalSize(15),
        justifyContent: 'center'
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
    descView: {
        marginLeft: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    dropDnContainer: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.89,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        height: GlobalSize(45)
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
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.9,
        padding: GlobalSize(5),
    },
})