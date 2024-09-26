import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORLINE, PLACEHOLDERCOLOR2, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../../Constants/Fonts';
import { MONEYRESOURCESOCIALWORKER, PersonalData } from '../../../../../Constants/Texts/Assessments/SDOH/SDOH'

const SDOHAssessment3 = () => {

    const [selectedId, setSelectedId] = useState(null)
    const [FoodId, setFoodId] = useState(null)
    const [ClothId, setClothId] = useState(null)
    const [UtilityId, setUtilityId] = useState(null)
    const [CareId, setCareId] = useState(null)
    const [MedId, setMedId] = useState(null)
    const [HealthId, setHealthId] = useState(null)
    const [OtherValue, setOtherValue] = useState(null)

    const OnChooseQuest = (ItemId) => {
        setSelectedId(ItemId)
    }

    const OnChooseFood = (ItemId) => {
        setFoodId(ItemId)
    }

    const OnChooseCloth = (ItemId) => {
        setClothId(ItemId)
    }

    const OnChooseUtility = (ItemId) => {
        setUtilityId(ItemId)
    }

    const OnChooseCare = (ItemId) => {
        setCareId(ItemId)
    }

    const OnChooseMed = (ItemId) => {
        setMedId(ItemId)
    }

    const OnChooseHealth = (ItemId) => {
        setHealthId(ItemId)
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
                    </View>
                    <View>
                        <Text style={styles.textDesc}>In the past year, have you or any family member you live with been unable to get any of the following when it was really needed? Check all that apply.</Text>

                        <View style={styles.borderCard}>

                            <View>
                                <Text style={[styles.textDesc, { fontFamily: FONTS.FontMedium, marginLeft: GlobalSize(10) }]}>Food</Text>
                            </View>
                            <FlatList
                                data={PersonalData}
                                keyExtractor={item => item.id}
                                numColumns={2}
                                renderItem={(item, index) => {

                                    return (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={styles.radioButton}
                                                onPress={() => OnChooseFood(item.item.id)}
                                            >
                                                <View
                                                    style={[
                                                        styles.radioIcon,
                                                        FoodId == item.item.id && styles.radioIconSelected,
                                                    ]}>
                                                    {FoodId == item.item.id && <View style={styles.radioBorder} />}
                                                </View>
                                            </TouchableOpacity>

                                            <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.item.Title}</Text>
                                        </View>
                                    )
                                }} />
                        </View>

                    </View>

                    <View style={styles.borderCard}>

                        <View>
                            <Text style={[styles.textDesc, { fontFamily: FONTS.FontMedium, marginLeft: GlobalSize(10) }]}>Clothing</Text>
                        </View>
                        <FlatList
                            data={PersonalData}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={(item, index) => {

                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => OnChooseCloth(item.item.id)}
                                        >
                                            <View
                                                style={[
                                                    styles.radioIcon,
                                                    ClothId == item.item.id && styles.radioIconSelected,
                                                ]}>
                                                {ClothId == item.item.id && <View style={styles.radioBorder} />}
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.item.Title}</Text>
                                    </View>
                                )
                            }} />
                    </View>

                    <View style={styles.borderCard}>

                        <View>
                            <Text style={[styles.textDesc, { fontFamily: FONTS.FontMedium, marginLeft: GlobalSize(10) }]}>Utilities</Text>
                        </View>
                        <FlatList
                            data={PersonalData}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={(item, index) => {

                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => OnChooseUtility(item.item.id)}
                                        >
                                            <View
                                                style={[
                                                    styles.radioIcon,
                                                    UtilityId == item.item.id && styles.radioIconSelected,
                                                ]}>
                                                {UtilityId == item.item.id && <View style={styles.radioBorder} />}
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.item.Title}</Text>
                                    </View>
                                )
                            }} />
                    </View>

                    <View style={styles.borderCard}>

                        <View>
                            <Text style={[styles.textDesc, { fontFamily: FONTS.FontMedium, marginLeft: GlobalSize(10) }]}>Childcare</Text>
                        </View>
                        <FlatList
                            data={PersonalData}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={(item, index) => {

                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => OnChooseCare(item.item.id)}
                                        >
                                            <View
                                                style={[
                                                    styles.radioIcon,
                                                    CareId == item.item.id && styles.radioIconSelected,
                                                ]}>
                                                {CareId == item.item.id && <View style={styles.radioBorder} />}
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.item.Title}</Text>
                                    </View>
                                )
                            }} />
                    </View>

                    <View style={styles.borderCard}>

                        <View>
                            <Text style={[styles.textDesc, { fontFamily: FONTS.FontMedium, marginLeft: GlobalSize(10) }]}>Medicine</Text>
                        </View>
                        <FlatList
                            data={PersonalData}
                            keyExtractor={item => item.id}
                            numColumns={2}
                            renderItem={(item, index) => {

                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => OnChooseMed(item.item.id)}
                                        >
                                            <View
                                                style={[
                                                    styles.radioIcon,
                                                    MedId == item.item.id && styles.radioIconSelected,
                                                ]}>
                                                {MedId == item.item.id && <View style={styles.radioBorder} />}
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.item.Title}</Text>
                                    </View>
                                )
                            }} />
                    </View>

                    <View>
                        <Text style={styles.textDesc}>Any health care (medical, dental, mental health, vision)</Text>
                        <View style={styles.borderCard}>
                            <FlatList
                                data={PersonalData}
                                keyExtractor={item => item.id}
                                numColumns={2}
                                renderItem={(item, index) => {

                                    return (
                                        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={styles.radioButton}
                                                onPress={() => OnChooseHealth(item.item.id)}
                                            >
                                                <View
                                                    style={[
                                                        styles.radioIcon,
                                                        HealthId == item.item.id && styles.radioIconSelected,
                                                    ]}>
                                                    {HealthId == item.item.id && <View style={styles.radioBorder} />}
                                                </View>
                                            </TouchableOpacity>

                                            <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.item.Title}</Text>
                                        </View>
                                    )
                                }} />
                        </View>

                    </View>


                    <View style={{ marginBottom: GlobalSize(10) }}>
                        <Text style={[styles.textDesc, { fontFamily: FONTS.FontMedium }]}>Other</Text>
                        <TextInput
                            value={OtherValue}
                            placeholder='Please write...'
                            placeholderTextColor={PLACEHOLDERCOLOR2}
                            style={styles.textInput}
                            onChangeText={(text) => setOtherValue(text)} />
                    </View>
                    <View>
                        <Text style={styles.textDesc}>Has lack of transportation kept you from medical appointments, meetings, work, or from getting things needed for daily living? Check all that apply</Text>

                        <View style={styles.borderCard}>
                            {MONEYRESOURCESOCIALWORKER?.map((item, index) => {

                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => OnChooseQuest(item.id)}
                                        >
                                            <View
                                                style={[
                                                    styles.radioIcon,
                                                    selectedId == item.id && styles.radioIconSelected,
                                                ]}>
                                                {selectedId == item.id && <View style={styles.radioBorder} />}
                                            </View>
                                        </TouchableOpacity>

                                        <Text style={[styles.textDesc, { marginTop: GlobalSize(7), marginRight: GlobalSize(40) }]}>{item.Title}</Text>
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

export default SDOHAssessment3

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
    textInput: {
        width: DEFAULTWIDTH * 0.88,
        height: GlobalSize(50),
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15)
    }
})