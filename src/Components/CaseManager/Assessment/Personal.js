import { StyleSheet, Text, View,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BORDERCOLOR1, BORDERCOLOR4, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { SDOHPERSONAL }  from '../../../Constants/Texts/Assessments/SDOH/SDOH';

const Personal = () => {

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
    const [selectId2,setSelectId2] =  useState(null)
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

    const OnChooseQuest2 = (ItemId) =>{
        setSelectId2(ItemId)
    }
    
    const OnChooseQuest4 = (ItemId) => {
        setSelected4(ItemId)
    }

    const OnChooseQuest3 = (ItemId) => {
        setSelected3(ItemId)
    }

    return (
     
                <View >
                    <View>
                        <Text style={styles.textMain}>Personal Characteristics</Text>

                        <Text style={styles.textDesc}>On average, how many days per week do you engage in moderate to strenuous exercise (like walking fast, running, jogging, dancing, swimming, biking, or other activities that cause a light or heavy sweat)?</Text>

                        <View style={styles.borderCard}>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {Days?.map((item) => {

                                    return (
                                        <View style={{ alignItems: 'center' }}>
                                            <TouchableOpacity
                                                style={styles.radioButton}
                                                onPress={() => OnChooseQuest1(item.id)}>
                                                <View
                                                    style={[
                                                        styles.radioIcon,
                                                        selectId1 == item.id && styles.radioIconSelected,
                                                    ]}>
                                                    {selectId1 == item.id && <View style={styles.radioBorder} />}
                                                </View>
                                            </TouchableOpacity>

                                            <Text style={styles.textDesc}>{item.id}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <TouchableOpacity
                                    style={styles.radioButton}
                                    onPress={() => onDecline()}>
                                    <View
                                        style={[
                                            styles.radioIcon,
                                            Decline && styles.radioIconSelected,
                                        ]}>
                                        {Decline && <View style={styles.radioBorder} />}
                                    </View>
                                </TouchableOpacity>

                                <Text style={[styles.textDesc, { marginTop: GlobalSize(6) }]}>Decline, don't know</Text>
                            </View>

                        </View>


                    </View>


                    <View>
                        <Text style={styles.textDesc}>How often do you have a drink containing alcohol?</Text>

                        <View style={styles.borderCard}>

                             {SDOHPERSONAL?.map((item, index) => {
                            
                                return (
                                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest2(item.id)}>
                                        <View
                                            style={[
                                                styles.radioIcon,
                                                selectId2 == item.id && styles.radioIconSelected,
                                            ]}>
                                            {selectId2 == item.id && <View style={styles.radioBorder} />}
                                        </View>
                                    </TouchableOpacity>

                                        <Text style={[styles.textDesc,{marginTop:GlobalSize(7)}]}>{item.Title}</Text>
                                    </View>
                                )
                            })} 
                        </View>
                    </View>

                    <View>
                        <Text style={styles.textDesc}>At any point in the past 2 years, has season or migrant farm work been your or your family’s main source of income?</Text>
                    </View>

                    <View style={styles.borderCard}>
                        {OPTIONALQUEST1.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest3(item.id)}>
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

                    <View>
                        <Text style={styles.textDesc}>Have you been discharged from the armed forces of the United States?</Text>
                    </View>

                    <View style={styles.borderCard}>
                        {OPTIONALQUEST1.map((item, index) => {
                            return (
                                <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.radioButton}
                                        onPress={() => OnChooseQuest4(item.id)}>
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
    )
}

export default Personal

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
        width: DEFAULTWIDTH * 0.885,
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
})