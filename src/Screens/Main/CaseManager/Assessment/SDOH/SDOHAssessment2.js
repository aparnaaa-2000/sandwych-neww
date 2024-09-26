import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORLINE, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { FONTS } from '../../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { MONEYRESOURCESDOH, MoneyResourceFour, MoneyResourceThree } from '../../../../../Constants/Texts/Assessments/SDOH/SDOH'
import MoneyResource from '../../../../../Components/CaseManager/Assessment/MoneyResource'

const SDOHAssessment2 = () => {

    const [selectId1, setSelectId1] = useState(null)
    const [selectId2, setSelectId2] = useState(null)
    const [selectId3, setSelectId3] = useState(null)
    const [selectId4, setSelected4] = useState(null)
    const [textValue, setTextValue] = useState(null)

    const OnChooseQuest1 = (ItemId) => {
        setSelectId1(ItemId)
    }

    const OnChooseQuest3 = (ItemId) => {
        setSelectId3(ItemId)
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: GlobalSize(50) }}>

                <View style={{ padding: GlobalSize(20) }}>
                    <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(20) }]}>
                        <Text style={styles.textSD}>SDOH Assessment</Text>
                    </View>

                    <View>
                        <Text style={styles.textMain}>Money & Resources</Text>
                        <Text style={styles.textDesc}>What is the highest level of school that you have finished?</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.borderCard}>
                            {MONEYRESOURCESDOH?.map((item, index) => {

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
                        <Text style={styles.textDesc}>What is your current work situation?</Text>

                        <MoneyResource 
                        selectId2={selectId2}
                         setSelectId2={setSelectId2}
                         textValue={textValue}
                         setTextValue={setTextValue}/>
                    </View>

                    <View>
                        <Text style={styles.textDesc}>Do you want help finding or keeping work or a job?</Text>

                        <View style={DEFAULTSTYLES.alignView}>

                            <View style={styles.borderCard}>
                                {MoneyResourceThree?.map((item, index) => {

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
                    </View>

                    <View>
                        <Text style={styles.textDesc}>How hard is it for you to pay for the very basics like food, housing, medical care, and heating? Would you say it is:</Text>

                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={styles.borderCard}>
                                {MoneyResourceFour?.map((item, index) => {

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

export default SDOHAssessment2

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