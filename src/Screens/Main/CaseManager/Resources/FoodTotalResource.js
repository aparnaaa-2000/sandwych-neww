import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLORAS, PLACEHOLDERCOLOR1, PLACEHOLDERCOLOR2, PLACEHOLDERCOLOR3, PUREBLACK, PUREWHITE, TEXTCOLOR10 } from '../../../../Constants/Colors/Colors'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { LineChart } from "react-native-gifted-charts"
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'

const FoodTotalResource = () => {
    const lineData = [{ value: 20 }, { value: 20 }, { value: 32.50 }, { value: 27.50 }, { value: 30 }];
    const XAxisData = ['', 'March', 'Apr', 'May', 'June', 'July']; // Custom Y-axis data

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Food'} />

                <View style={DEFAULTSTYLES.alignView}>
                    <View style={styles.borderCard}>

                        <View style={styles.row}>
                            <View>
                                <Text style={styles.textResource}>Total Resource Usage</Text>
                                <Text style={styles.textNum}>1,873</Text>
                            </View>

                            <View>
                                <Text style={styles.textResource}>Satisfaction</Text>
                                <Text style={styles.textNum}>55%</Text>
                            </View>
                        </View>

                        <View style={{marginLeft:GlobalSize(10),marginBottom:GlobalSize(10)}}>
                        <LineChart
                            areaChart
                            hideDataPoints
                            isAnimated={false}
                            animationDuration={1200}
                            startFillColor='#84aff5'
                            startOpacity={1}
                            endOpacity={1}
                            initialSpacing={0}
                            data={lineData}
                            spacing={60}
                            thickness={7}
                            hideRules
                            hideYAxisText={false}
                            yAxisColor={PLACEHOLDERCOLOR3}
                            showVerticalLines
                            verticalLinesColor={PUREWHITE}
                            xAxisColor={PLACEHOLDERCOLOR3}
                            color='#03378c'
                            yAxisTextStyle={{ color: PLACEHOLDERCOLOR3 }}
                            xAxisLabelTexts={XAxisData}
                            xAxisLabelTextStyle={{color:PLACEHOLDERCOLOR3}}
                            
                        />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FoodTotalResource

const styles = StyleSheet.create({
    borderCard: {
        borderRadius: GlobalSize(10),
        backgroundColor: PLACEHOLDERCOLOR2,
        width: DEFAULTWIDTH * 0.89,

    },
    textResource: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(10)
    },
    textNum: {
        color: PLACEHOLDERCOLOR3,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(15)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: GlobalSize(15),
        marginBottom: GlobalSize(20)
    }
})