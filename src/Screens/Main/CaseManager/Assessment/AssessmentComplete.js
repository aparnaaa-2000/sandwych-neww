import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'

const AssessmentComplete = () => {
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={[DEFAULTSTYLES.alignView,{flex:1}]}>
                <Text style={styles.textComplete}>Assessment Complete</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Submit</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default AssessmentComplete

const styles = StyleSheet.create({
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(20)
    },
    textComplete: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(24)
    }
})