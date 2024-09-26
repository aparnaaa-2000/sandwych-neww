import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BACKGROUNDDARKO, BORDERCOLORAS, FIFTHCOLOR, PLACEHOLDERCOLOR3, PUREBLACK, PUREWHITE, TEXTCOLORGREY } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BlackCalender } from '../../../../assets'
import { AVALONG } from '../../../Constants/DummyImages';
import CircularProgress from 'react-native-circular-progress-indicator';

const PreviousList = () => {

    const List = [
        {
            id: 1,
            Type: 'Caregiver style',
            StartDate: 'Tuesday, Oct.01',
            CompletedDate: 'Friday, Oct.03'
        },
        {
            id: 2,
            Type: 'SDOH',
            StartDate: 'Tuesday, Oct.01',
            CompletedDate: 'Friday, Oct.03'
        },
    ]

    return (
        <View>

            <View style={{ marginLeft: GlobalSize(20) }}>
                <Text style={styles.textMain}>Previous Assessments</Text>
            </View>

            <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(20) }]}>

                {List.map((item) => {
                    return (
                        <View style={styles.borderCard}>

                            <View style={styles.rowMain}>

                                <View>
                                    <Text style={styles.textAssess}>Assessment Name</Text>

                                    <View style={styles.cardType}>
                                        <Text style={styles.textType}>Type - {item.Type}</Text>
                                    </View>
                                </View>

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
                                    progressValueStyle={{ fontFamily: FONTS.FontMedium, fontSize: 12,color:PUREBLACK }}
                                />
                            </View>


                            <View style={styles.rowView}>
                                <View style={{ marginBottom: GlobalSize(15) }}>
                                    <Text style={styles.textStart}>Start date</Text>

                                    <View style={styles.rowDate}>
                                        <BlackCalender />
                                        <Text style={styles.textDate}>Tuesday, Oct. 01</Text>
                                    </View>
                                </View>

                                <View style={{ marginBottom: GlobalSize(15) }}>
                                    <Text style={styles.textStart}>Completed date</Text>


                                    <View style={styles.rowDate}>
                                        <BlackCalender />
                                        <Text style={styles.textDate}>Friday, Oct. 03</Text>
                                    </View>

                                </View>

                            </View>

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
                    )
                })}
            </View>
        </View>
    )
}

export default PreviousList;

const styles = StyleSheet.create({
    textMain: {
        color: PUREBLACK,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(20)
    },
    borderCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLORAS,
        margin: GlobalSize(10),
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(10),
        marginBottom: 0
    },
    textAssess: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15)
    },
    cardType: {
        // width:DEFAULTWIDTH*0.5,
        backgroundColor: BACKGROUNDDARKO,
        padding: GlobalSize(8),
        borderRadius: GlobalSize(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(5)
    },
    textType: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(11)
    },
    textStart: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(13),
        color: PLACEHOLDERCOLOR3,
        marginBottom: GlobalSize(2)
    },
    rowMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: GlobalSize(10)
    },
    textDate: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(12),
        marginLeft: GlobalSize(5)
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: GlobalSize(10)
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
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25)
    },
    rowImg: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(10),
        marginLeft: GlobalSize(8)
    },
    rowDate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: GlobalSize(5)
    }
})