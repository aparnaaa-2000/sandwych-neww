import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { BORDERCOLOR1, BORDERCOLOR4, BORDERCOLOR5, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

const SDOHTextInput = ({radioBtnValue,textInputValue,setRadioBtnValue,setTextInputValue,placeholder}) => {
    return (

        <View>
            <View style={styles.viewRadioBtn}>
                <View style={{ marginTop: GlobalSize(13) }}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => setRadioBtnValue('Yes')}>
                        <View
                            style={[
                                styles.radioIcon,
                                radioBtnValue == 'Yes' && styles.radioIconSelected,
                            ]}>
                            {radioBtnValue == 'Yes' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.textInView, { width: DEFAULTWIDTH * 0.8 }]}>
                    {radioBtnValue !== 'Yes' ? (
                        <View style={styles.inputView}>
                            <Text style={{ fontSize: fontSize(12), color: BORDERCOLOR5 }}>
                                {placeholder}
                            </Text>
                        </View>
                    ) : (
                        <TextInput
                            value={textInputValue}
                            placeholder={placeholder}
                            placeholderTextColor={BORDERCOLOR5}
                            style={styles.inputWrite}
                            maxLength={50}
                            onChangeText={text => setTextInputValue(text)}
                        />
                    )}
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: GlobalSize(8) }}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => { setRadioBtnValue('No'),setTextInputValue(null) }}>
                    <View
                        style={[
                            styles.radioIcon,
                            radioBtnValue == 'No' && styles.radioIconSelected,
                        ]}>
                        {radioBtnValue == 'No' && <View style={styles.radioBorder} />}
                    </View>
                </TouchableOpacity>
                <View style={{ marginTop: 7 }}>
                    <Text style={styles.textDesc}>
                        I chose not to answer this question
                    </Text>
                </View>
            </View>

        </View>

    )
}

export default SDOHTextInput

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
        textAlign:'left'
    },
    textInView: {
        width: DEFAULTWIDTH * 0.9,
        height: DEFAULTWIDTH * 0.13,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 1,
        marginTop: GlobalSize(12),
        marginBottom: GlobalSize(1),
    },
    textDesc: {
        fontSize: GlobalSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        maxWidth: DEFAULTWIDTH * 0.9,
        lineHeight: GlobalSize(20),
    },
    inputView: {
        justifyContent: 'center',
        padding:GlobalSize(14)
    },
})