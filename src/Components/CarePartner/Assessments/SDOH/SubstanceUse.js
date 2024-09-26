import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const SubstanceUse = ({
    Heading,
    QuestionFilter,
    OptionFilter,
    SubstanceValue1,
    setSubstanceValue1,
    SubstanceValue2,
    setSubstanceValue2,
    SubstanceValue3,
    setSubstanceValue3,
    SubstanceValue4,
    setSubstanceValue4,
    mappedData
}) => {

    const filteredMappedData1 = mappedData?.filter(item => item.id == 81);
    const filteredMappedData2 = mappedData?.filter(item => item.id == 83);
    const filteredMappedData3 = mappedData?.filter(item => item.id == 84);
    const filteredMappedData4 = mappedData?.filter(item => item.id == 85);
    console.log("MAPPED DATA............", mappedData)
    const newArray = OptionFilter.map(item => ({ //FUNCTION FOR FILTER THE OPTIONS BASED ON ID
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));

    switch (Heading) {
        case 0:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'How many times in the past 12 months have you had 5 or more drinks in a day (males) or 4 or more drinks in a day (females)? One drink is 12 ounces of beer, 5 ounces of wine,or 1.5 ounces of 80-proof spirits.'
            break;

        case 1:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'How many times in the past 12 months have you used tobacco products (like cigarettes, cigars, snuff, chew, electronic cigarettes):'
            break;

        case 2:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'How many times in the past year have you used prescription drugs for non-medical reasons?';
            break;

        case 3:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = 'How many times in the past year have you used illegal drugs?';
            break;
    }

    const onPress = option => { //STORING THE VALUES IN A STATE
        if (Heading === 0) {
            setSubstanceValue1(option.id)
        }
        else if (Heading === 1) {
            setSubstanceValue2(option.id)
        }
        else if (Heading === 2) {
            setSubstanceValue3(option.id)
        }
        else if (Heading === 3) {
            setSubstanceValue4(option.id)
        }
    }

    const isSelected = (item) => {
        if (Heading === 0) {
            if (SubstanceValue1 === item.id) {
                return styles.radioIconSelected;
            } else if (!SubstanceValue1 && filteredMappedData1?.length > 0 && filteredMappedData1[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 1) {
            if (SubstanceValue2 === item.id) {
                return styles.radioIconSelected;
            } else if (!SubstanceValue2 && filteredMappedData2?.length > 0 && filteredMappedData2[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 2) {
            if (SubstanceValue3 === item.id) {
                return styles.radioIconSelected;
            } else if (!SubstanceValue3 && filteredMappedData3?.length > 0 && filteredMappedData3[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        else if (Heading === 3) {
            if (SubstanceValue4 === item.id) {
                return styles.radioIconSelected;
            } else if (!SubstanceValue4 && filteredMappedData4?.length > 0 && filteredMappedData4[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        return null;
    };

    return (
        <View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={imageSource} />
                </View>
            </View>
            <View style={styles.descView}>
                <Text style={[styles.textDesc, { marginLeft: 10 }]}>{QuestionFilter[Heading]?.question}</Text>
            </View>

            <View style={{ marginLeft: 10 }}>
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
                                            style={[styles.radioIcon, isSelected(item)]}>
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
    )
}

export default SubstanceUse;

const styles = StyleSheet.create({
    imageStyle: {
        width: DEFAULTWIDTH * 0.8,
        height: DEFAULTWIDTH * 0.6,
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
        padding: GlobalSize(10)
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
})