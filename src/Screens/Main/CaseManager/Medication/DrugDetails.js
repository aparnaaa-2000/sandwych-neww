import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DEFAULTSTYLES from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, PUREBLACK } from '../../../../Constants/Colors/Colors'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

const DrugDetails = () => {
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
    <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }} />

    <View>
        <PatientHeader Header={'Medication Allergies'} />
    </View>

    <View style={{padding:GlobalSize(20)}}>
        <View>
            <Text style={styles.textNm}>Penicillin</Text>
        </View>

        <View>
            <Text style={styles.textDesc}>The usual dose is 6.7 to 13.3 mg per kg (3 to 6 mg per pound) of body weight every eight ...</Text>
        </View>

        <View>
            <Text style={styles.textDesc}>A penicillin allergy is a common allergy. It occurs when your immune system reacts negatively to the antibiotic penicillin. You may experience a skin rash, swelling or difficulty breathing shortly after taking penicillin. An allergic reaction can be a medical emergency, so contact your healthcare provider or call 911 if symptoms are severe.</Text>
        </View>
    </View>
    </SafeAreaView>
  )
}

export default DrugDetails

const styles = StyleSheet.create({
    textNm:{
        color:PUREBLACK,
        fontFamily:FONTS.FontSemiB,
        fontSize:fontSize(20),
        marginBottom:GlobalSize(7)
    },
    textDesc:{
        fontFamily:FONTS.FontRegular,
        fontSize:fontSize(13),
        color:PUREBLACK,
        marginBottom:GlobalSize(10)
    }
})