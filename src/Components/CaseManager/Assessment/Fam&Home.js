import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { BORDERCOLOR1, BORDERCOLOR4, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10 } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';

const FamHome = () => {

    const [selectId1, setSelected1] = useState(null)
    const [selected2, setSelected2] = useState(null)
    const [textValue, setTextValue] = useState(null)

    const onChooseOpt1 = (ItemId) => {
        setSelected1(ItemId)
    }

    const onChooseOpt2 = (ItemId) => {
        setSelected2(ItemId)
    }

    return (
        <View>
            <View>
                <Text style={styles.textMain}>Family & Home</Text>
            </View>

            <View>
                <Text style={styles.textDesc}>How many family members, including yourself, do you currently live with?</Text>
            </View>

            <View style={styles.borderCard}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => onChooseOpt1(1)}
                    >
                        <View
                            style={[
                                styles.radioIcon,
                                selectId1 == '1' && styles.radioIconSelected,
                            ]}>
                            {selectId1 == '1' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>

                    <TextInput
                        value={textValue}
                        editable={selectId1 == '1' ? true : false}
                        onChangeText={(text) => setTextValue(text)}
                        style={styles.inputCard}
                        keyboardType='number-pad'
                        maxLength={5}
                    />
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => onChooseOpt1(2)}
                    >
                        <View
                            style={[
                                styles.radioIcon,
                                selectId1 == '2' && styles.radioIconSelected,
                            ]}>
                            {selectId1 == '2' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7) }]}>I chose not to answer this question</Text>
                </View>

            </View>
            <View>
                <Text style={styles.textDesc}>What is your housing situation today?</Text>
            </View>

            <View style={styles.borderCard}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => onChooseOpt2(1)}
                    >
                        <View
                            style={[
                                styles.radioIcon,
                                selected2 == '1' && styles.radioIconSelected,
                            ]}>
                            {selected2 == '1' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7) }]}>I have housing</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => onChooseOpt2(2)}
                    >
                        <View
                            style={[
                                styles.radioIcon,
                                selected2 == '2' && styles.radioIconSelected,
                            ]}>
                            {selected2 == '2' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>
                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>I do not have housing (staying with others, in a hotel, in a shelter, living outside on the street, on a beach, in a car, or in a park)</Text>
                </View>
            </View>

        </View>
    )
}

export default FamHome;

const styles = StyleSheet.create({
    textMain: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB,
        marginBottom: GlobalSize(10)
    },
    textDesc: {
        color: PUREBLACK,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        marginBottom: GlobalSize(10),
    },
    borderCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(5),
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.885,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: GlobalSize(10),
        marginBottom: GlobalSize(10)
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
        marginRight: GlobalSize(3.5)
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
    inputCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.67,
        height: GlobalSize(40),
        paddingLeft: GlobalSize(12),
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12)
    }
})