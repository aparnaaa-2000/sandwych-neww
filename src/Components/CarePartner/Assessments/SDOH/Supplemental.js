import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { BORDERCOLOR4, BORDERCOLOR5, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { SafetyData } from '../../../../Constants/Texts/Assessments/SDOH/SDOH';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import SDOHTextInput from '../../../Common/SDOHTextInput/SDOHTextInput';

const Supplemental = ({
    mappedData,
    Heading,
    OtherItem1,
    setOtherItem1,
    OtherItem2,
    setOtherItem2,
    OtherItem3,
    setOtherItem3,
    OtherItem4,
    setOtherItem4,
    OtherItem5,
    setOtherItem5,
    OtherItem6,
    setOtherItem6,
    OtherItem7,
    setOtherItem7,
    QuestionFilter,
    OptionFilter }) => {

    const newArray = OptionFilter.map(item => ({
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));

    console.log(newArray);

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

    const onPress = option => { //FUNCTION FOR STORING THE VALUES IN A STATE BASED ON INDEX(HEADING PASSED AS INDEX)
        if(Heading === 0){
            setOtherItem1(option)
        }
        else if(Heading === 1){
            setOtherItem2(option)
        }
        else if(Heading === 2){
            setOtherItem3(option)
        }
        else if(Heading === 3){
            setOtherItem4(option)
        }
        else if(Heading === 4){
            setOtherItem5(option)
        }
        else if(Heading === 5){
            setOtherItem6(option)
        }
        else if(Heading === 6){
            setOtherItem7(option)
        }
        
      }

    const filteredMappedData1 = mappedData?.filter(item => item.id == 94);
    const filteredMappedData2 = mappedData?.filter(item => item.id == 95);
    const filteredMappedData3 = mappedData?.filter(item => item.id == 97);
    const filteredMappedData4 = mappedData?.filter(item => item.id == 99);
    const filteredMappedData5 = mappedData?.filter(item => item.id == 100);
    const filteredMappedData6 = mappedData?.filter(item => item.id == 102);
    const filteredMappedData7 = mappedData?.filter(item => item.id == 104);
    console.log("MAPPED DATA ...................",mappedData)

    
    const isSelected = (item) => {
        if (Heading === 0) {
            if (OtherItem1 === item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem1 && filteredMappedData1?.length > 0 && filteredMappedData1[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 1) {
            if (OtherItem2 === item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem2 && filteredMappedData2?.length > 0 && filteredMappedData2[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 2) {
            if (OtherItem3 === item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem3 && filteredMappedData3?.length > 0 && filteredMappedData3[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 3) {
            if (OtherItem4 === item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem4 && filteredMappedData4?.length > 0 && filteredMappedData4[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 4) {
            if (OtherItem5=== item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem5 && filteredMappedData5?.length > 0 && filteredMappedData5[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 5) {
            if (OtherItem6=== item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem6 && filteredMappedData6?.length > 0 && filteredMappedData6[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 6) {
            if (OtherItem7=== item.id) {
                return styles.radioIconSelected;
            } else if (!OtherItem7 && filteredMappedData7?.length > 0 && filteredMappedData7[0]?.option_id === item.id) {
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
            <View style={styles.viewText}>
                <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>{QuestionFilter[Heading]?.question}</Text>
            </View>
            <View>
                <View style={{ marginLeft: GlobalSize(10) }}>
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
                                        </TouchableOpacity>

                                        <View style={{ marginTop: 7, maxWidth: DEFAULTWIDTH * 0.8 }}>
                                            <Text style={styles.textDesc}>{item.Title}</Text>
                                        </View>

                                    </View>


                                </View>
                            );
                        }}
                    />
                </View>

            </View>

        </View>
    )
}

export default Supplemental;

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