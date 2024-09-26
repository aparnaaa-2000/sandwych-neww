import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, TextInput } from 'react-native'
import { BORDERCOLOR1, BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR10, PLACEHOLDERCOLOR2 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const MoreAbout = (
    {
        mappedData,
        QuestionFilter,
        OptionFilter,
        Heading,
        MoreValue1,
        MoreValue2,
        MoreValue3,
        MoreValue4,
        MoreValue5,
        setMoreValue1,
        setMoreValue2,
        setMoreValue3,
        setMoreValue4,
        setMoreValue5,

        LangValue,
        setLangValue,
        setInStoryValue,
        setInstorySelection,

        RefugeeValue,
        setRefugeeValue,

        RefugeeSelection,
        setRefugeeSelection
    }) => {


    const newArray = OptionFilter.map(item => ({ //FILTER THE OPTIONS BASED ON ID
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));

    switch (Heading) {
        case 0:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Do you or your loved one need another language for communication?';
            break;

        case 1:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = "Do you want help with school or training? For example, starting or completing job training or getting a high school diploma, GED or equivalent.";
            break;

        case 2:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Are you a veteran?';
            break;

        case 3:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Are you or have you been a migrant worker?';
            break;

        case 4:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'How much money does your household earn in a year? This helps us check if you qualify for extra support or resources.';
            break;

        case 5:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'How many people live in your home, including yourself? This number helps us understand what support you might need.';
            break;

        case 6:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Because of a physical, mental, or emotional condition, do you have serious difficulty concentrating, remembering, or making decisions?';
            break;

        case 7:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = "Because of a physical, mental, or emotional condition,do you have difficulty doing errands alone such as visiting a doctor's office or shopping?";
            break;

        case 8:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Are there cultural practices or beliefs that are important for us to know about your care?';
            break;

        case 9:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Do you want to share your sexual orientation with us? This helps us understand you better.';
            break;

        case 10:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Have you ever faced homelessness or had trouble finding a stable place to live?';
            break;

        case 11:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Are you a refugee?';
            break;

        case 12:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Have you ever been incarcerated?';
            break;
    }

    const onPress = (id) => { //FUNCTION FOR STORING THE STATE VALUE BASED ON INDEX
        if (Heading === 0) {
            setMoreValue1(id)
        }
        else if (Heading === 1) {
            setMoreValue2(id)
        }
        else if (Heading === 3) {
            setMoreValue4(id)
        }
        else if (Heading === 4) {
            setMoreValue5(id)
        }
    }

    const filteredMappedData1 = mappedData?.filter(item => item.id == 105);
    const filteredMappedData2 = mappedData?.filter(item => item.id == 106);
    const filteredMappedData3 = mappedData?.filter(item => item.id == 107);
    const filteredMappedData4 = mappedData?.filter(item => item.id == 108);
    const filteredMappedData5 = mappedData?.filter(item => item.id == 109);
    console.log("MAPPED DATA ...................", filteredMappedData2)

    
    const isSelected = (item) => {
        if (Heading === 0) {
            if (MoreValue1 === item.id) {
                return styles.radioIconSelected;
            } else if (!MoreValue1 && filteredMappedData1?.length > 0 && filteredMappedData1[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 1) {
            if (MoreValue2 === item.id) {
                return styles.radioIconSelected;
            } else if (!MoreValue2 && filteredMappedData2?.length > 0 && filteredMappedData2[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }

        else if (Heading === 3) {
            if (MoreValue4 === item.id) {
                return styles.radioIconSelected;
            } else if (!MoreValue4 && filteredMappedData4?.length > 0 && filteredMappedData4[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 4) {
            if (MoreValue5 === item.id) {
                return styles.radioIconSelected;
            } else if (!MoreValue5 && filteredMappedData5?.length > 0 && filteredMappedData5[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        return null;
    };

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


            {Heading == 0 || Heading == 1 || Heading == 3 || Heading == 4 ?
                <View>
                    <FlatList
                        data={newArray}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ marginLeft: GlobalSize(10) }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => onPress(item.id)}>

                                            <View
                                                style={[styles.radioIcon, isSelected(item)]}>
                                                {isSelected(item) && <View style={styles.radioBorder} />}
                                            </View>
                                            {/* <View
                                                style={[
                                                    styles.radioIcon,
                                                    Heading == 0 && MoreValue1 == item.id ?
                                                        styles.radioIconSelected :
                                                        Heading == 1 && MoreValue2 == item.id ?
                                                            styles.radioIconSelected :
                                                            Heading == 3 && MoreValue4 == item.id ?
                                                                styles.radioIconSelected :
                                                                Heading == 4 && MoreValue5 == item.id ?
                                                                    styles.radioIconSelected :
                                                                    null,
                                                ]}>
                                                {Heading == 0 && MoreValue1 == item.id ? (
                                                    <View style={styles.radioBorder} />) :
                                                    Heading == 1 && MoreValue2 == item.id ? (
                                                        <View style={styles.radioBorder} />
                                                    ) : Heading == 3 && MoreValue4 == item.id ?
                                                        <View style={styles.radioBorder} /> :
                                                        Heading == 4 && MoreValue5 == item.id ?
                                                            <View style={styles.radioBorder} /> :
                                                            null}
                                            </View> */}
                                        </TouchableOpacity>

                                        {item?.Title !== null ?
                                            <View style={{ marginTop: 7, maxWidth: DEFAULTWIDTH * 0.8 }}>
                                                <Text style={styles.textDesc}>{item.Title}</Text>
                                            </View> :
                                            <View>
                                                <TextInput
                                                    value={LangValue}
                                                    placeholder='Please describe...'
                                                    placeholderTextColor={PLACEHOLDERCOLOR2}
                                                    style={[styles.textInView, { width: DEFAULTWIDTH * 0.78 }]}
                                                    onChangeText={(text) => setLangValue(text)}
                                                />
                                            </View>}

                                    </View>


                                </View>
                            );
                        }}
                    />
                </View> :
                Heading === 2 ?
                    <View style={DEFAULTSTYLES.alignView}>
                        <TextInput
                            value={MoreValue3 ? MoreValue3 : filteredMappedData3[0]?.answer}
                            placeholder='Please describe briefly...'
                            placeholderTextColor={PLACEHOLDERCOLOR2}
                            style={styles.textInView}
                            onChangeText={(text) => setMoreValue3(text)} />
                    </View> :
                    null}
        </View>
    )
}

export default MoreAbout;

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
        height: DEFAULTWIDTH * 0.7,
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
    viewRadioBtn: {
        flexDirection: 'row',
        marginLeft: GlobalSize(8),
        alignItems: 'center',
        marginBottom: GlobalSize(10),
        marginTop: GlobalSize(10),
    },
    inputWrite: {
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(15),
        alignItems: 'center'
    },
    descView: {
        marginLeft: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    textInView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.4,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 1,
        marginTop: GlobalSize(12),
        marginBottom: GlobalSize(1),
        justifyContent: 'center',
        textAlignVertical: 'top',
        padding: GlobalSize(15),
        color: TEXTCOLOR10
    },
    textInputEducation: {
        width: DEFAULTWIDTH * 0.82,
        height: DEFAULTWIDTH * 0.25,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 1,
        marginBottom: GlobalSize(1),
        marginLeft: DEFAULTWIDTH * 0.1
    },
    inputView: {
        justifyContent: 'center',
        marginTop: GlobalSize(17),
        left: GlobalSize(15),
    },
})