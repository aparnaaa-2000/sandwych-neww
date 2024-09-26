import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { BACKGROUNDWHITE, FOURTHCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES from '../../../../Constants/styles/styles'
import PreviousList from '../../../../Components/CaseManager/AssessmentList/PreviousList'
import AssessmentGraph from '../../../../Components/CaseManager/TaskDashboard/AssessmentGraph'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import MainHeader from '../../../../Components/Common/Headers/MainHeader'

const AssessmentList = ({navigation}) => {
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <MainHeader navigation={navigation}/>
                    <AssessmentGraph />
                    <PreviousList />
                </View>
            </ScrollView>

            <View style={styles.rowView}>
                <TouchableOpacity style={styles.touchPls}>
                    <Text style={styles.textPlus}>+</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default AssessmentList

const styles = StyleSheet.create({
    textPlus: {
        color: PUREWHITE,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(25)
    },
    touchPls: {
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25),
        backgroundColor: FOURTHCOLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowView: {
        alignItems: 'flex-end',
        position: 'absolute',
        left: 0,
        right: GlobalSize(20),
        bottom: GlobalSize(20)
    }
})

