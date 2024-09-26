import { StyleSheet, Text, View, SafeAreaView, StatusBar,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORLINE, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../../Constants/Fonts';
import { PersonalData ,SOCIALANDCOMMUNITYDATA, SOCIALANDCOMMUNITYDATA2} from '../../../../../Constants/Texts/Assessments/SDOH/SDOH';


const SDOHAssessment4 = () => {

    
    const [selectId1, setSelectId1] = useState(null)
    const [selectId2, setSelectId2] = useState(null)
    const [selectId3, setSelected3] = useState(null)
    const [selectId4, setSelected4] = useState(null)

    const OnChooseQuest1 = (ItemId) => {
        setSelectId1(ItemId)
    }

    const OnChooseQuest2 = (ItemId) => {
        setSelectId2(ItemId)
    }

    const OnChooseQuest3 = (ItemId) => {
        setSelected3(ItemId)
    }

    const OnChooseQuest4 = (ItemId) => {
        setSelected4(ItemId)
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

<ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:GlobalSize(60)}}>
            <View style={DEFAULTSTYLES.alignView}>
                <Text style={styles.textSD}>SDOH Assessment</Text>
            </View>
            <View style={{ padding: GlobalSize(20) }}>

                <View>
                    <Text style={styles.textMain}>Social & Community</Text>
                </View>

                <View>
                    <Text style={styles.textDesc}>How often do you see or talk to people that you care about and feel close to? (For example: talking to friends on the phone, visiting friends or family, going to church or club meetings)</Text>
                    <View style={styles.borderCard}>
                        {SOCIALANDCOMMUNITYDATA2?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest1(item.id)}
                                    >
                                        <View
                                            style={[
                                                styles.radioIcon,
                                                selectId1 == item.id && styles.radioIconSelected,
                                            ]}>
                                            {selectId1 == item.id && <View style={styles.radioBorder} />}
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7) }]}>{item.Title}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View>
                    <Text style={styles.textDesc}>Stress is when someone feels tense, nervous, anxious, or can’t sleep at night because their mind is troubled. How stressed are you?</Text>
                
                    <View style={styles.borderCard}>
                        {SOCIALANDCOMMUNITYDATA?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest2(item.id)}
                                    >
                                        <View
                                            style={[
                                                styles.radioIcon,
                                                selectId2 == item.id && styles.radioIconSelected,
                                            ]}>
                                            {selectId2 == item.id && <View style={styles.radioBorder} />}
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7) }]}>{item.Title}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

                <View>
                    <Text style={styles.textDesc}>Within the last two weeks, have you had little interest or pleasure in doing things?</Text>
               
                    <View style={styles.borderCard}>
                        {PersonalData?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest3(item.id)}
                                    >
                                        <View
                                            style={[
                                                styles.radioIcon,
                                                selectId3 == item.id && styles.radioIconSelected,
                                            ]}>
                                            {selectId3 == item.id && <View style={styles.radioBorder} />}
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7) }]}>{item.Title}</Text>
                                </View>
                            )
                        })}
                    </View>
               
                </View>

                <View>
                    <Text style={styles.textDesc}>Within the last two weeks, have you been feeling down, depressed, or hopeless?</Text>
               
                    <View style={styles.borderCard}>
                        {PersonalData?.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest4(item.id)}
                                    >
                                        <View
                                            style={[
                                                styles.radioIcon,
                                                selectId4 == item.id && styles.radioIconSelected,
                                            ]}>
                                            {selectId4 == item.id && <View style={styles.radioBorder} />}
                                        </View>
                                    </TouchableOpacity>

                                    <Text style={[styles.textDesc, { marginTop: GlobalSize(7) }]}>{item.Title}</Text>
                                </View>
                            )
                        })}
                    </View>


                </View>

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

export default SDOHAssessment4

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