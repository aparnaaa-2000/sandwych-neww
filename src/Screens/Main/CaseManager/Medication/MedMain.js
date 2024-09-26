import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import DEFAULTSTYLES from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, FOURTHCOLOR, PUREBLACK, PUREWHITE } from '../../../../Constants/Colors/Colors'
import MainHeader from '../../../../Components/Common/Headers/MainHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import TodayMeds from '../../../../Components/CaseManager/Medication/TodayMeds'
import MedStat from '../../../../Components/CaseManager/Medication/MedStat'
import CaseManagerHeader from '../../../../Components/Common/Headers/CaseManagerHeader'

const MedMain = ({navigation}) => {

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
            <CaseManagerHeader navigation={navigation}/>

                <View>
                    <TodayMeds navigation={navigation}/>
                    <MedStat />
                </View>
            </ScrollView>

            <View style={styles.align}>
                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textPlus}>+</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default MedMain

const styles = StyleSheet.create({
    textPlus: {
        color: PUREWHITE,
        fontFamily: FONTS.FontBold,
        fontSize: fontSize(26)
    },
    touchBtn: {
        backgroundColor: FOURTHCOLOR,
        width: GlobalSize(46),
        height: GlobalSize(46),
        borderRadius: GlobalSize(23),
        alignItems: 'center',
        justifyContent: 'center'
    },
    align: {
        position: 'absolute',
        left: 0,
        right: GlobalSize(15),
        alignItems: 'flex-end',
        bottom: GlobalSize(20)
    }
})