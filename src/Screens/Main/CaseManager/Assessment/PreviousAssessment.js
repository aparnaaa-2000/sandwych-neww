import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native'
import React from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLORAS, FIFTHCOLOR, PLACEHOLDERCOLOR3, PUREBLACK, TEXTCOLOR7, TEXTCOLORAS, TEXTCOLORGREY } from '../../../../Constants/Colors/Colors'
import MainHeader from '../../../../Components/Common/Headers/MainHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { BlackCalender, BlackTick } from '../../../../../assets'
import { AVALONG } from '../../../../Constants/DummyImages'
import CircularProgress from 'react-native-circular-progress-indicator';

const PreviousAssessment = ({ navigation }) => {

    const SupportData = [
        {
            id: 1,
            Title: 'Mobility Issues',
            Desc: 'Caregiver will support the Mobility Issues of the patient'
        },
        {
            id: 2,
            Title: 'Toileting',
            Desc: 'Caregiver will be able to help the patient for Toileting scenarios'
        },
        {
            id: 3,
            Title: 'Bathing',
            Desc: 'Caregiver can help the patient to stay fresh and hygenic by providing the bathing support.'
        },
        {
            id: 4,
            Title: 'Behaviour problems',
            Desc: 'Caregiver is trained to handle the behaviour problems'
        },
        {
            id: 5,
            Title: 'Transportation',
            Desc: 'Caregiver can provide the transportation help required for the patient while visiting hospitals'
        }
    ]

    const widthAndHeight = 50
    const series = [170, 260, 130,]
    const sliceColor = ['#86C8BC', '#86C8BC', '#86C8BC',]

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <MainHeader navigation={navigation} />

                    <View style={{ marginLeft: GlobalSize(20),marginBottom:GlobalSize(10) }}>
                        <Text style={styles.textAssess}>Assessments summary</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.borderView}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.textSupport}>Caregiver style</Text>


                                    <View style={styles.rowImg}>

                                        <View>
                                            <Image
                                                source={{ uri: AVALONG }}
                                                style={styles.imgView} />
                                        </View>

                                        <View style={{ marginLeft: GlobalSize(10) }}>
                                            <Text style={styles.textPost}>Supervisor</Text>
                                            <Text style={styles.textName}>Loris Hoffman</Text>
                                            <Text style={styles.textPost}>Caregiver</Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <CircularProgress
                                        value={100}
                                        radius={25}
                                        duration={0}
                                        progressValueColor={PLACEHOLDERCOLOR3}
                                        activeStrokeWidth={5}
                                        inActiveStrokeWidth={5}
                                        maxValue={100}
                                        inActiveStrokeColor={FIFTHCOLOR}
                                        inActiveStrokeOpacity={0.2}
                                        valueSuffix='%'
                                        activeStrokeColor={FIFTHCOLOR}
                                        progressValueStyle={{ fontFamily: FONTS.FontMedium, fontSize: 12, color: PUREBLACK }}
                                    />
                                </View>

                            </View>
                            <View style={{ marginBottom: GlobalSize(15) }}>
                                <Text style={styles.textStart}>Start date</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <BlackCalender />
                                    <Text style={styles.textDate}>Tuesday, Oct. 01</Text>
                                </View>
                            </View>

                            <View style={{ marginBottom: GlobalSize(15) }}>
                                <Text style={styles.textStart}>Completed date</Text>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <BlackCalender />
                                    <Text style={styles.textDate}>Friday, Oct. 03</Text>
                                </View>

                            </View>

                            <View style={{ marginBottom: GlobalSize(10) }}>
                                <Text style={styles.textSupport}>Support Caregiver can provide</Text>
                            </View>

                            <View style={styles.lineBorder} />
                            <View>
                                {SupportData.map((item) => {
                                    return (
                                        <View style={{ marginBottom: GlobalSize(15) }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={styles.borderTick}>
                                                    <BlackTick />
                                                </View>
                                                <View>
                                                    <Text style={styles.textTitle}>{item.Title}</Text>
                                                    <Text style={styles.textDesc}>{item.Desc}</Text>
                                                </View>
                                            </View>


                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PreviousAssessment

const styles = StyleSheet.create({
    textAssess: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(20)
    },
    borderView: {
        borderWidth: 1,
        borderColor: BORDERCOLORAS,
        borderRadius: GlobalSize(10),
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(15),
        paddingRight: GlobalSize(30),
        marginBottom: GlobalSize(20)
        //height: 200
    },
    textSupport: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(18)
    },
    lineBorder: {
        height: 1,
        width: DEFAULTWIDTH * 0.785,
        backgroundColor: BORDERCOLOR1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(10)
    },
    borderTick: {
        borderWidth: 1,
        borderColor: BORDERCOLORAS,
        borderRadius: GlobalSize(3),
        width: GlobalSize(20),
        height: GlobalSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: GlobalSize(10)
    },
    textTitle: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14)
    },
    textDesc: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORAS,
        fontSize: fontSize(14)
    },
    textStart: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(13),
        color: PLACEHOLDERCOLOR3,
        marginBottom: GlobalSize(6)
    },
    textDate: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        marginLeft: GlobalSize(5)
    },
    textPost: {
        color: TEXTCOLORGREY,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(11)
    },
    textName: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(13),
        color: TEXTCOLORGREY
    },
    imgView: {
        width: GlobalSize(46),
        height: GlobalSize(46),
        borderRadius: GlobalSize(23)
    },
    rowImg: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(15),
        marginTop: GlobalSize(8)
    }
})