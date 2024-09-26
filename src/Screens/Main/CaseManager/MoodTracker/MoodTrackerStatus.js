import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, FOURTHCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors'
import CaregiverNotes from '../../../../Components/CaseManager/MoodTrackerStatus/CaregiverNotes'
import Activities from '../../../../Components/CaseManager/MoodTrackerStatus/Activities'
import { ArrowF, BellIcon, LeftArrow, SwitchProfile } from '../../../../../assets'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'

const MoodTrackerStatus = () => {
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
                
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View style={styles.row}>
                        <View>
                            <ArrowF width={20} height={20} />
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={styles.peaceOverlay}
                            // onPress={() => UserNavigation()}
                            >
                                <SwitchProfile width={GlobalSize(30)} height={GlobalSize(30)} />
                            </TouchableOpacity>


                            <TouchableOpacity

                                style={{ marginLeft: DEFAULTWIDTH * 0.06, flexDirection: 'row' }}>
                                <BellIcon />
                                <View style={styles.iconNum}>
                                    {/* Here mention the no of notifications mentioned for the user */}
                                    <Text style={styles.textNum}>1</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Activities />
                    <CaregiverNotes />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MoodTrackerStatus

const styles = StyleSheet.create({
    iconNum: {
        backgroundColor: FOURTHCOLOR,
        width: GlobalSize(14),
        height: GlobalSize(14),
        borderRadius: GlobalSize(7),
        left: GlobalSize(-6),
        top: GlobalSize(-2),
        borderColor: PUREWHITE,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNum: {
        fontSize: fontSize(7),
        color: PUREWHITE,
        fontFamily: FONTS.FontSemiB,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: GlobalSize(15),
        marginRight: GlobalSize(15),
        marginBottom: GlobalSize(10)
    }
})