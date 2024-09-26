import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BORDERCOLORSWC, FIFTHCOLOR, FOURTHCOLOR,
     PLACEHOLDERCOLOR1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10 } from '../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../Constants/Fonts'
import { AVALONG } from '../../../Constants/DummyImages'
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'

const UpcomingSchedule = () => {

    const ScheduleData = [
        {
            id: 1,
            Title: 'Appointment',
            assignee: 'Assigned',
            image: AVALONG,
            DocName: 'Dr. Yang',
            Department: 'Memorial Hermann',
            Date: '30 th Oct 2023',
            Time: '3:00 pm -3:30 pm',
            background1: FIFTHCOLOR,
            background2: FOURTHCOLOR
        },
        {
            id: 2,
            Title: 'Physiotherapy',
            assignee: 'Unassigned',
            image: AVALONG,
            DocName: 'Dr. Sandra',
            Department: 'Health Plus Physiotherapy',
            Date: '30 th Oct 2023',
            Time: '5:00 pm -5:30 pm',
            background1: FOURTHCOLOR,
            background2: FIFTHCOLOR
        }
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={styles.taskCard}>

                <View style={{ marginRight: GlobalSize(10) }}>
                    <View style={[styles.lineView, { backgroundColor: item.background2 }]} />
                </View>

                <View style={{ paddingTop: GlobalSize(15),paddingBottom:GlobalSize(10)}}>
                    <View>
                        <Text style={styles.textTitle}>{item.Title}</Text>
                    </View>

                    <View style={[styles.cardAssign, { backgroundColor: item.background1 }]}>
                        <Text style={styles.textAssign}>{item.assignee}</Text>
                    </View>

                    <View style={{ marginBottom: GlobalSize(10) }}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.img} />
                    </View>

                    <View style={{ marginBottom: GlobalSize(10) }}>
                        <Text style={styles.textDoc}>{item.DocName}</Text>
                        <Text style={[styles.textDep,{maxWidth:DEFAULTWIDTH*0.4}]}>{item.Department}</Text>
                    </View>

                    <View style={{ marginBottom: GlobalSize(10) }}>
                        <Text style={styles.textDep}>Date</Text>
                        <Text style={[styles.textDep, { color: TEXTCOLOR10 }]}>{item.Date}</Text>
                    </View>

                    <View>
                        <Text style={styles.textDep}>Time</Text>
                        <Text style={[styles.textDep, { color: TEXTCOLOR10 }]}>{item.Time}</Text>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={{ padding: GlobalSize(20) }}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.today}>Upcoming Schedule</Text>
                </View>

                <View>
                    <Text style={styles.today}>See all</Text>
                </View>
            </View>

            <View>
                <FlatList
                    data={ScheduleData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem} />
            </View>
        </View>
    )
}

export default UpcomingSchedule

const styles = StyleSheet.create({
    today: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: GlobalSize(15)
    },
    taskCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(10),
        borderColor: BORDERCOLORSWC,
        marginRight: GlobalSize(10),
        width: DEFAULTWIDTH * 0.47,
        flexDirection: 'row',
    },
    textTitle: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: GlobalSize(16),
        marginBottom: GlobalSize(5)
    },
    cardAssign: {
        borderRadius: GlobalSize(15),
        marginBottom: GlobalSize(10),
        padding: GlobalSize(3),
        alignItems: 'center',
        justifyContent: 'center',
        width: DEFAULTWIDTH * 0.19
    },
    textAssign: {
        color: PUREWHITE,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(10)
    },
    img: {
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25)
    },
    textDoc: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(16)
    },
    textDep: {
        fontFamily: FONTS.FontRegular,
        color: PLACEHOLDERCOLOR1,
        fontSize: fontSize(13)
    },
    lineView: {
        width: GlobalSize(8),
        height:DEFAULTHEIGHT*0.42,
        borderTopLeftRadius: GlobalSize(10),
        borderBottomLeftRadius: GlobalSize(10)
    }
})