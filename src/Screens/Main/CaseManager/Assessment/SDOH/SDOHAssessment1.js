import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORLINE, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../../../Constants/Colors/Colors'
import { FONTS } from '../../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { SDOHPERSONAL } from '../../../../../Constants/Texts/Assessments/SDOH/SDOH';
import Personal from '../../../../../Components/CaseManager/Assessment/Personal'
import FamHome from '../../../../../Components/CaseManager/Assessment/Fam&Home'

const SDOHAssessment1 = () => {

    const Days = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        },
        {
            id: 6
        },
        {
            id: 7
        }
    ]

    const OPTIONALQUEST1 = [
        {
            id: 1,
            Title: 'Yes',
            selected: false
        },
        {
            id: 2,
            Title: 'No',
            selected: false
        },
        {
            id: 3,
            Title: 'I chose not to answer this question',
            selected: false
        }
    ]

    const [selectId1, setSelectId1] = useState(null)
    const [Decline, setDecline] = useState(false)
    const [selectId2, setSelectId2] = useState(null)
    const [selectId4, setSelected4] = useState(null)
    const [selectId3, setSelected3] = useState(null)

    const OnChooseQuest1 = (id) => {
        if (Decline) {
            setDecline(false)
        }
        setSelectId1(id)
    }

    const onDecline = () => {
        setDecline(!Decline)
        if (selectId1 && !Decline) {
            setSelectId1(null)
        }
    }

    const OnChooseQuest2 = (ItemId) => {
        setSelectId2(ItemId)
    }

    const OnChooseQuest4 = (ItemId) => {
        setSelected4(ItemId)
    }

    const OnChooseQuest3 = (ItemId) => {
        setSelected3(ItemId)
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={DEFAULTSTYLES.alignView}>
                <Text style={styles.textSD}>SDOH Assessment</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: GlobalSize(50) }}>
                <View style={{ padding: GlobalSize(20) }}>
                    <Personal />
                    <FamHome />
                </View>

            </ScrollView>

            <View style={styles.rowBtn}>

                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Back</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Save & Exit</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Next</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default SDOHAssessment1;

const styles = StyleSheet.create({
    textSD: {
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(20)
    },
    textMain: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB,
        marginBottom: GlobalSize(10)
    },
    textDesc: {
        color: PUREBLACK,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        marginBottom: GlobalSize(10)
    },
    borderCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(5),
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.88,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: GlobalSize(10),
        marginBottom: GlobalSize(10)
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
        marginRight: GlobalSize(3.5)
    },
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE,
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textnx: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14)
    },
    touchBtn: {
        borderWidth: 1,
        borderColor: BORDERCOLORLINE,
        borderRadius: GlobalSize(5),
        width: DEFAULTWIDTH * 0.27,
        padding: GlobalSize(8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: GlobalSize(20),
        marginRight: GlobalSize(20),
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(20),
        backgroundColor: BACKGROUNDWHITE,
        paddingTop: GlobalSize(20)
    },
})