import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native'

//IMPORT CONSTANTS
import { PUREWHITE, TEXTCOLOR7, TEXTCOLORW } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { BlueCall, BlueCode, BlueEmail, BlueLocation, Man } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

export default function PatientInfo() {
    return (
        <View style={[
            styles.cardAbout,
            Platform.OS == 'android'
                ? DEFAULTSTYLES.androidShadow
                : DEFAULTSTYLES.iosShadow,
        ]}>

            <View style={styles.viewMore}>
                <Text style={styles.textAbout}>More Info</Text>
            </View>

            <View>
                <View style={styles.subView}>
                    <BlueCall />
                    <Text style={styles.textDs}>SSN Number Here [ID]</Text>
                </View>

                <View style={styles.subView}>
                    <BlueEmail />
                    <Text style={styles.textDs}>Medicare Number</Text>
                </View>

                <View style={styles.subView}>
                    <BlueLocation />
                    <Text style={styles.textDs}>Medicaid Number</Text>
                </View>

                <View style={styles.subView}>
                    <BlueCode />
                    <Text style={styles.textDs}>Recent Discharge Date</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Man />
                    <Text style={styles.textDs}>Insurance Number</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardAbout: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.90,
        borderRadius: GlobalSize(15),
        padding: GlobalSize(15)
    },
    textAbout: {
        fontSize: fontSize(16),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR7
    },
    textDs: {
        fontSize: fontSize(14),
        color: TEXTCOLORW,
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(10)
    },
    viewMore:{ 
        marginBottom: DEFAULTHEIGHT * 0.02,
        justifyContent:'center',
        alignItems:'center'
    },
    subView:{ 
        flexDirection: 'row', 
        marginBottom: DEFAULTHEIGHT * 0.02, 
        alignItems: 'center'
     }
})