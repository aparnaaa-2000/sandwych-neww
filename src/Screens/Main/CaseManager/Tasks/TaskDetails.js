import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { BACKGROUNDWHITE, BORDERCOLORTASK2, FIFTHCOLOR, FOURTHCOLOR, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import MainHeader from '../../../../Components/Common/Headers/MainHeader'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'
import { AVALONG } from '../../../../Constants/DummyImages'

const TaskDetails = () => {

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
            <MainHeader />

            <View>
                <View style={{ marginLeft: GlobalSize(20) }}>
                    <Text style={styles.today}>Task Details</Text>
                </View>

                <View style={DEFAULTSTYLES.alignView}>
                    <View style={styles.card}>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textApp}>Appointment</Text>
                        </View>

                        <View style={styles.row}>
                            <View style={{ marginRight: GlobalSize(15) }}>
                                <Image source={{ uri: AVALONG }} style={styles.img} />
                            </View>

                            <View>
                                <Text style={[styles.textApp, { color: PUREBLACK }]}>Dr.Yang</Text>
                                <Text style={[styles.date, { color: BORDERCOLORTASK2 }]}>Memorial Hermann</Text>
                            </View>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.date}>Date</Text>
                            <Text style={[styles.textApp, { fontSize: fontSize(14) }]}>30 th Oct 2023</Text>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.date}>Time</Text>
                            <Text style={[styles.textApp, { fontSize: fontSize(14) }]}>3:00 pm -3:30 pm</Text>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.date}>Address</Text>
                            <Text style={[styles.textApp, { fontSize: fontSize(14) }]}>Memorial Herman 23900 Katy Fwy, Katy, TX 77494</Text>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.date}>Assigned Care Team Member</Text>
                            <Text style={styles.textAssign}>Unassigned</Text>
                        </View>

                    </View>
                </View>
            </View>
            <View style={styles.subView}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Add Task</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={[styles.textBtn, { color: PRIMARYCOLOR }]}>Delete Task</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default TaskDetails

const styles = StyleSheet.create({
    today: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB
    },
    card: {
        borderWidth: 1,
        borderRadius: GlobalSize(10),
        borderColor: BORDERCOLORTASK2,
        width: DEFAULTWIDTH * 0.88,
        margin: GlobalSize(20),
        padding: GlobalSize(15)
    },
    textApp: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: fontSize(16)
    },
    date: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12)
    },
    textAssign: {
        fontFamily: FONTS.FontSemiB,
        color: FOURTHCOLOR,
        fontSize: fontSize(14)
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(20)
    },
    img: {
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.86,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: GlobalSize(20)
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    subView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(25),
        alignItems: 'center'
    }
})