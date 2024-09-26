import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BACKGROUNDCOLORH, BACKGROUNDCOLORM, BACKGROUNDGREEN2, BACKGROUNDWHITE, BORDERCOLORGREEN1, BORDERCOLORH, BORDERCOLORM, FOURTHCOLOR, TEXTCOLOR7, TEXTCOLORGREEN3, TEXTCOLORH } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { ArrowF } from '../../../../../assets'

const MedDetail = () => {

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={styles.rowMain}>
                <TouchableOpacity>
                    <ArrowF width={30} height={20} />
                </TouchableOpacity>

                <View style={{marginLeft:GlobalSize(10)}}>
                    <Text style={styles.textTitle}>Economic Stability</Text>
                </View>

            </View>
            <View style={{ padding: GlobalSize(20) }}>


                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Image
                        style={{ width: GlobalSize(20), height: GlobalSize(20) }}
                        resizeMode='contain'
                        source={require('../../../../../assets/Images/SocialWorker/Man.png')} />
                </View>


                <View style={{ marginBottom: GlobalSize(20) }}>
                    <Text style={styles.textDesc}>In the United States, 1 in 10 people live in poverty,1 and many people can’t afford things like healthy foods, health care, and housing. Healthy People 2030 focuses on helping more people achieve economic stability.</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.textRisk}>High Risk</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.lineView} />
                    <Text style={styles.textDesc}>An economy with fairly constant output growth and low and stable inflation would be considered economically stable. An economy with frequent large recessions, a pronounced business cycle</Text>
                </View>

                <View style={[styles.card, { backgroundColor: BACKGROUNDCOLORM, borderColor: BORDERCOLORM }]}>
                    <Text style={[styles.textRisk, { color: FOURTHCOLOR }]}>Medium Risk</Text>
                </View>

                <View style={styles.row}>

                    <View style={[styles.lineView, { backgroundColor: FOURTHCOLOR }]} />
                    <Text style={styles.textDesc}>An economy with fairly constant output growth and low and stable inflation would be considered economically stable. An economy with frequent large recessions, a pronounced business cycle</Text>
                </View>

                <View style={[styles.card, { backgroundColor: BACKGROUNDGREEN2, borderColor: BORDERCOLORGREEN1 }]}>
                    <Text style={[styles.textRisk, { color: TEXTCOLORGREEN3 }]}>Low Risk</Text>
                </View>

                <View style={styles.row}>
                    <View style={[styles.lineView, { backgroundColor: TEXTCOLORGREEN3 }]} />
                    <Text style={styles.textDesc}>An economy with fairly constant output growth and low and stable inflation would be considered economically stable. An economy with frequent large recessions, a pronounced business cycle</Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default MedDetail;

const styles = StyleSheet.create({
    textTitle: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(20)
    },
    textDesc: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(13)
    },
    textRisk: {
        color: TEXTCOLORH,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(12)
    },
    card: {
        borderWidth: 1,
        borderColor: BORDERCOLORH,
        backgroundColor: BACKGROUNDCOLORH,
        width: DEFAULTWIDTH * 0.26,
        padding: GlobalSize(5),
        borderRadius: GlobalSize(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    lineView: {
        backgroundColor: TEXTCOLORH,
        height: GlobalSize(60),
        width: 1.5,
        marginRight: GlobalSize(10)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: GlobalSize(5),
        marginBottom: GlobalSize(20)
    },
    rowMain: {
        marginLeft: GlobalSize(12),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:GlobalSize(20)
    }
})