import { StyleSheet, Text, View, Image ,FlatList,TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const Safety = ({
    Heading,
    QuestionFilter,
    OptionFilter,
    SafetyValue1,
    setSafetyValue1,
    SafetyValue2,
    setSafetyValue2,
    SafetyValue3,
    setSafetyValue3,
    SafetyValue4,
    setSafetyValue4,
    mappedData
 }) => {

 

  const filteredMappedData1 = mappedData?.filter(item => item.id == 67);
  const filteredMappedData2 = mappedData?.filter(item => item.id == 68);
  const filteredMappedData3 = mappedData?.filter(item => item.id == 69);
  const filteredMappedData4 = mappedData?.filter(item => item.id == 70);

  console.log("MAPPED DATA............",mappedData)

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

    const onPress = option => { //STORING THE STATE VALUE
        if(Heading === 0){
            setSafetyValue1(option.id)
        }
        else if(Heading === 1){
            setSafetyValue2(option.id)
        }
        else if(Heading === 2){
            setSafetyValue3(option.id)
        }
        else if(Heading === 3){
            setSafetyValue4(option.id)
        }
    }

    const isSelected = (item) => {
        if (Heading === 0) {
            if (SafetyValue1 === item.id) {
                return styles.radioIconSelected;
            } else if (!SafetyValue1 && filteredMappedData1?.length > 0 && filteredMappedData1[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 1) {
            if (SafetyValue2 === item.id) {
                return styles.radioIconSelected;
            } else if (!SafetyValue2 && filteredMappedData2?.length > 0 && filteredMappedData2[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 2) {
            if (SafetyValue3 === item.id) {
                return styles.radioIconSelected;
            } else if (!SafetyValue3 && filteredMappedData3?.length > 0 && filteredMappedData3[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 3) {
            if (SafetyValue4 === item.id) {
                return styles.radioIconSelected;
            } else if (!SafetyValue4 && filteredMappedData4?.length > 0 && filteredMappedData4[0]?.option_id === item.id) {
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
                                            onPress={() => onPress(item)}>
                                            <View
                                                style={[styles.radioIcon,isSelected(item)]}>
                                                {isSelected(item) &&
                                                    <View style={styles.radioBorder} />
                                                }
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

export default Safety;

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
    }
})