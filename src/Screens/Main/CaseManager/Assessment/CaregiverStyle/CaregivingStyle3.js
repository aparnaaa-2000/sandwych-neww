import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR4, BORDERCOLORLINE, PUREBLACK, TEXTCOLOR10, TEXTCOLOR5 } from '../../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../../Constants/Fonts'

const CaregivingStyle3 = () => {
    const [MainDiagnosis, setMainDiagnosis] = useState(null)
    const [BigProblem, setBigProblem] = useState(null)

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ padding: GlobalSize(20), paddingTop: GlobalSize(5) }}>

                <View style={{ marginBottom: GlobalSize(20) }}>
                    <Text style={styles.textTitle}>Caregiving Style</Text>
                </View>

                <View>
                    <Text style={styles.textMain}>Main Diagnosis : <Text style={styles.textDesc}>
                        In your opinion, what is the main reason or diagnosis that [Care recipient] needs care and support?</Text></Text>
                </View>

                <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.borderView}>
                    <TextInput
                        placeholder="Enter your answer"
                        placeholderTextColor={TEXTCOLOR5}
                        value={MainDiagnosis}
                        multiline={true}
                        onChangeText={(text) => setMainDiagnosis(text)}
                        style={styles.textInput}
                    />
                    </View>
                </View>

                <View>
                    <Text style={styles.textMain}>Biggest Challenges : <Text style={styles.textDesc}>
                        What things do you find most challenging about being a caregiver for [Care recipient]?</Text></Text>
                </View>

                <View style={DEFAULTSTYLES.alignView}>
                    <View style={styles.borderView}>
                        <TextInput
                            placeholder="Enter your answer"
                            placeholderTextColor={TEXTCOLOR5}
                            value={BigProblem}
                            multiline={true}
                            onChangeText={(text) => setBigProblem(text)}
                            style={styles.textInput}
                        />
                    </View>
                </View>

            </View>
            <View style={styles.rowBtn}>

                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Back</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Save & Exit</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CaregivingStyle3

const styles = StyleSheet.create({
    textTitle: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(24),
        color: TEXTCOLOR10,
        marginBottom: GlobalSize(5)
    },
    textnx: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14)
    },
    touchBtn: {
        borderWidth: 1,
        borderColor: BORDERCOLORLINE,
        borderRadius: GlobalSize(5),
        width: DEFAULTWIDTH * 0.27,
        padding: GlobalSize(8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: GlobalSize(20),
        marginRight: GlobalSize(20),
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(20),
        backgroundColor: BACKGROUNDWHITE,
        paddingTop: GlobalSize(20)
    },
    textMain: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(16)
    },
    textDesc: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(14)
    },
    textInput: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12),
        textAlignVertical: 'top'
    },
    borderView: {
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        borderRadius: GlobalSize(8),
        width: DEFAULTWIDTH * 0.88,
        height: GlobalSize(100),
        paddingLeft: GlobalSize(10),
        marginTop: GlobalSize(10),
        marginBottom: GlobalSize(20)
    }
})