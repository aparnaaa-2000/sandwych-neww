import { Platform, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { PUREWHITE, TEXTCOLOR10, TEXTCOLOR2 } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../Constants/Fonts'
import { SALLYBROWN1 } from '../../../Constants/DummyImages'

const CaregiverNotes = () => {
    return (
        <View style={DEFAULTSTYLES.alignView}>
            <View style={[styles.card,
            Platform.OS == 'android' ?
                DEFAULTSTYLES.androidShadow :
                DEFAULTSTYLES.iosShadow]}>
                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={styles.textNotes}>Caregiver Notes</Text>
                </View>

                <View style={{marginBottom:GlobalSize(10)}}>
                    <Text style={styles.textDesc}>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
                </View>

                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                        source={{ uri: SALLYBROWN1 }}
                        style={styles.img} />

                        <View style={{marginLeft:GlobalSize(10)}}>
                            <Text style={[styles.textDesc,{fontFamily:FONTS.FontSemiB}]}>Loris Hoffman</Text>
                            <Text style={styles.textDesc}>Caregiver</Text>
                        </View>
                </View>
            </View>
        </View>
    )
}

export default CaregiverNotes

const styles = StyleSheet.create({
    card: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.80,
      //  height: 200,
        borderRadius: GlobalSize(8),
        alignItems: 'center',
        padding: GlobalSize(15),
        marginBottom:1
        //justifyContent:'center'
    },
    textNotes: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(16)
    },
    textDesc: {
        color: TEXTCOLOR2,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(13),
        textAlign: 'center'
    },
    img: {
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25)
    }
})