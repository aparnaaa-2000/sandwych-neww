import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native'

//IMPORT CONSTANTS 
import { PUREWHITE, TEXTCOLOR7, TEXTCOLORW } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { fontSize, GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

export default function ProfessionalInfo() {
    return (

        <View style={[
            styles.cardAbout,
            Platform.OS == 'android'
                ? DEFAULTSTYLES.androidShadow
                : DEFAULTSTYLES.iosShadow,
        ]}>

            <View style={styles.viewMore}>
                <Text style={styles.textAbout}>Professional Info</Text>
            </View>

            <View>
                <View style={styles.subView}>
          
                    <Text style={styles.textDs}>SSN Number</Text>
                    <Text style={styles.textDs}>1209313</Text>
                </View>

                <View style={styles.subView}>
                   
                    <Text style={styles.textDs}>Badge Number</Text>
                    <Text style={styles.textDs}>9957447</Text>
                </View>

                {/* <View style={styles.subView}>
               
                    <Text style={styles.textDs}>Practice NPI</Text>
                    <Text style={styles.textDs}>1234567890</Text>
                </View>

                <View style={styles.subView}>
                 
                    <Text style={styles.textDs}>Practice CAQH CMS Number</Text>
                    <Text style={styles.textDs}>Nil</Text>
                </View>

                <View style={styles.subView}>
                 
                    <Text style={styles.textDs}>Individual NPI (if applicable)</Text>
                    <Text style={styles.textDs}>Nil</Text>
                </View>

                <View style={styles.subView}>
                 
                 <Text style={styles.textDs}>Individual CAQH (if applicable)</Text>
                 <Text style={styles.textDs}>Nil</Text>
             </View> */}
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
        marginBottom: DEFAULTHEIGHT * 0.03 ,
        justifyContent:'center',
        alignItems:'center'
    },
    subView:{ 
        flexDirection: 'row', 
        marginBottom: DEFAULTHEIGHT * 0.02, 
        justifyContent:'space-between'
     }
})