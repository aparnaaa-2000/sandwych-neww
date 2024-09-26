import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { BORDERCOLOR1, BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const SDOHTextInputWithout = ({
    radioBtnValue,
    setRadioBtnValue,
    Data,
    setLivingAnswer1,
    LivingAnswer1,
    Heading,
    LivingAnswer3,
    setLivingAnswer3,
    LivingAnswer4,
    setLivingAnswer4,
    filteredMappedData,
    filteredMappedData3,
    filteredMappedData4
}) => {

    const onPress = (option) => {
        if (Heading === 0) {
            setLivingAnswer1(option.id);
        } else if (Heading === 2) {
            setLivingAnswer3(option.id);
        } else if (Heading === 3) {
            setLivingAnswer4(option.id);
        }
        setRadioBtnValue(option.id);
    };

    const isSelected = (item) => {
        if (Heading === 0) {
            if (LivingAnswer1 === item.id) {
                return styles.radioIconSelected;
            } else if (!LivingAnswer1 && filteredMappedData?.length > 0 && filteredMappedData[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 2) {
            if (LivingAnswer3 === item.id) {
                return styles.radioIconSelected;
            } else if (!LivingAnswer3 && filteredMappedData3?.length > 0 && filteredMappedData3[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        } else if (Heading === 3) {
            if (LivingAnswer4 === item.id) {
                return styles.radioIconSelected;
            } else if (!LivingAnswer4 && filteredMappedData4?.length > 0 && filteredMappedData4[0]?.option_id === item.id) {
                return styles.radioIconSelected;
            }
        }
        return null;
    };
    


    return (
        <View>
            <FlatList
                data={Data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    return (
                        <View style={{ marginLeft: GlobalSize(10) }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => onPress(item)}
                                >
                                    <View style={[styles.radioIcon, isSelected(item)]}>
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
                extraData={[LivingAnswer1, LivingAnswer3, LivingAnswer4]}
            />
        </View>
    );
};

export default SDOHTextInputWithout;

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
    textDesc: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        maxWidth: DEFAULTWIDTH * 0.9,
        lineHeight: GlobalSize(20),
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
        fontSize: fontSize(11),
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(15),
    },
    textInputEducation: {
        width: DEFAULTWIDTH * 0.8,
        height: DEFAULTWIDTH * 0.25,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 1,
        marginBottom: 1,
        marginLeft: DEFAULTWIDTH * 0.1,
    },
    inputView: {
        justifyContent: 'center',
        marginTop: GlobalSize(17),
        left: GlobalSize(15),
    },
});
