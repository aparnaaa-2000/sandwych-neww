import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const Food = ({
    Heading,
    QuestionFilter,
    OptionFilter,
    FoodValue1,
    setFoodValue1,
    FoodValue2,
    setFoodValue2,
    mappedData
}) => {


    switch (Heading) {
        case 0:
            imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
            Description = 'Within the past 12 months, you worried that your food would run out before you got money to buy more:';
            break;

        case 1:
            imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
            Description = "Within the past 12 months, the food you bought just didn't last and you didn't have money to get more:";
            break;

    }


    const filteredMappedData1 = mappedData.filter(item => item.id == 56);
    const filteredMappedData2 = mappedData.filter(item => item.id == 57);

    const newArray = OptionFilter.map(item => ({
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));

    const onPress = option => { //SETTING THE VALUE INTO A STATE
        if (Heading === 0) {
            setFoodValue1(option.id)
        }
        else if (Heading === 1) {
            setFoodValue2(option.id)
        }
    }

    const isSelected = (item) => {
        if (Heading === 0) {
            if (FoodValue1 === item.id) {
                return styles.radioIconSelected;
            } else if (!FoodValue1 && filteredMappedData1?.length > 0 && filteredMappedData1[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 1) {
            if (FoodValue2 === item.id) {
                return styles.radioIconSelected;
            } else if (!FoodValue2 && filteredMappedData2?.length > 0 && filteredMappedData2[0]?.option_id === item.id) {
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

export default Food

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
    descView: {
        marginLeft: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    }
})