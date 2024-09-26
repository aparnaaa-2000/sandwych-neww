import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React from 'react'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { BACKGROUNDGREEN1, BORDERLINE3, FIFTHCOLOR, FOURTHCOLOR, PLACEHOLDERCOLOR3, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLORGRY } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import AVALONG, { BETTYSMITHPROFILE } from '../../../Constants/DummyImages';
import CircularProgress from 'react-native-circular-progress-indicator';

const AssessmentGraph = () => {
    return (
        <View>
            <View style={{ marginLeft: GlobalSize(20), marginBottom: GlobalSize(10) }}>
                <Text style={styles.today}>Assessments</Text>
            </View>

            <View style={DEFAULTSTYLES.alignView}>
                <View style={[
                    styles.card,
                    Platform.OS === 'ios'
                        ? DEFAULTSTYLES.iosShadow
                        : DEFAULTSTYLES.androidShadow,
                ]}>
                    <View style={styles.rowCircle}>

                        <CircularProgress
                            value={60}
                            radius={40}
                            duration={0}
                            progressValueColor={PLACEHOLDERCOLOR3}
                            activeStrokeWidth={8}
                            inActiveStrokeWidth={8}
                            maxValue={100}
                            inActiveStrokeColor={FIFTHCOLOR}
                            inActiveStrokeOpacity={0.2}
                            valueSuffix='%'
                            activeStrokeColor={FIFTHCOLOR}
                            progressValueStyle={{ fontFamily: FONTS.FontMedium, fontSize: 12, color: PUREBLACK }}
                        />

                        <View style={{ marginTop: GlobalSize(15), marginRight: GlobalSize(20) }}>
                            <View style={styles.rowSub}>
                                <View style={[styles.box, { backgroundColor: FOURTHCOLOR }]} />
                                <Text style={styles.textProgress}>Complete 60%</Text>
                            </View>

                            <View style={styles.rowSub}>
                                <View style={[styles.box, { backgroundColor: BACKGROUNDGREEN1 }]} />
                                <Text style={styles.textProgress}>Progress 40%</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rowView}>
                        <View style={styles.borderLine}>

                            <View style={{ marginRight: GlobalSize(5) }}>
                                <Text style={styles.textAssess}>Total Assessments</Text>
                                <Text style={styles.textCom}>Completed</Text>
                            </View>

                            <View>
                                <Text style={[styles.textAssess, { fontSize: fontSize(20) }]}>04</Text>
                            </View>
                        </View>


                        <View style={styles.borderLine}>
                            <View>
                                <Image source={{ uri: BETTYSMITHPROFILE }} style={styles.imgView} />
                            </View>

                            <View style={{ marginLeft: GlobalSize(10) }}>
                                <Text style={styles.textCom}>Supervisor</Text>
                                <Text style={styles.textAssess}>Loris Hoffman</Text>
                                <Text style={styles.textCom}>Caregiver</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AssessmentGraph

const styles = StyleSheet.create({
    card: {
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(8),
        width: DEFAULTWIDTH * 0.88,
        elevation: 2,
        paddingBottom: GlobalSize(15),
        marginBottom: GlobalSize(16)
    },
    today: {
        color: PUREBLACK,
        fontSize: fontSize(20),
        fontFamily: FONTS.FontSemiB
    },
    borderLine: {
        borderWidth: 1,
        borderColor: BORDERLINE3,
        borderRadius: GlobalSize(5),
        width: DEFAULTWIDTH * 0.4,
        padding: GlobalSize(10),
        flexDirection: 'row',
        height: GlobalSize(55),
        alignItems: 'center'
    },
    textAssess: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(10),
        color: TEXTCOLORGRY
    },
    textCom: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORGRY,
        fontSize: fontSize(10)
    },
    imgView: {
        width: GlobalSize(40),
        height: GlobalSize(40),
        borderRadius: GlobalSize(20)
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    box: {
        width: GlobalSize(18),
        height: GlobalSize(18),
        borderRadius: GlobalSize(5),
        marginRight: GlobalSize(10)
    },
    textProgress: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
    },
    rowSub: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(6)
    },
    rowCircle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: GlobalSize(20)
    }
})

