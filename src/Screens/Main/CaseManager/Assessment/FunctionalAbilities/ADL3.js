import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDRED, BACKGROUNDWHITE, BACKGROUNDYELLOW, BORDERCOLOR1, BORDERCOLOR10, BORDERCOLOR2, BORDERCOLORLINE, BORDERCOLORLINE3, FIFTHCOLOR, FOURTHCOLOR, LINECOLOR1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLORGREEN2, TEXTCOLORGREY } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { FONTS } from '../../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'

const ADL3 = () => {

    const [LEVEL, setLEVEL] = useState([
        {
            id: 0,
            selected: false,
            bgColor:BORDERCOLORLINE
        },
        {
            id: 1,
            selected: false,
            bgColor:BACKGROUNDYELLOW
        },
        {
            id: 2,
            selected: false,
            bgColor:FOURTHCOLOR,
        },
        {
            id: 3,
            selected: false,
            bgColor:BACKGROUNDRED
        },

    ])
    const [selectIdTs, setSelectIdTs] = useState(null)
    const [selectIdGroc,setSelectIdGroc] = useState(null)
    const [selectIdOther,setSelectIdOther] = useState(null)
    const [selectIdHouse,setSelectIdHouse] = useState(null)
    const [selectIdMeals,setSelectMeals] = useState(null)
    const [selectSevice,setSelectService] = useState(null)

    const [TransferLevel,setTransferLevel] = useState(LEVEL)
    const [Groclevel,setGrocLevel]= useState(LEVEL)
    const [OtherLevel,setOtherLevel] = useState(LEVEL)
    const [HouseLevel,setHouseLevel] = useState(LEVEL)
    const [MealLevel,setMealLevel] = useState(LEVEL)
    const [ServiceLevel,setServiceLevel] = useState(LEVEL)


    const onselectTransfer = (ItemId) => {
        setSelectIdTs(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setTransferLevel(updatedLEVEL)
    }

    const onselectGroc = (ItemId) => {
        setSelectIdGroc(ItemId)
         const updatedLEVEL = LEVEL.map(item => 
             item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
         )
         setGrocLevel(updatedLEVEL)
     }

     
    const onselectOther = (ItemId) => {
        setSelectIdOther(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setOtherLevel(updatedLEVEL)
    }

    
    const onselectHouse = (ItemId) => {
        setSelectIdHouse(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setHouseLevel(updatedLEVEL)
    }

    
    const onselectMeal = (ItemId) => {
        setSelectMeals(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setMealLevel(updatedLEVEL)
    }

    
    const onselectService = (ItemId) => {
        setSelectService(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setServiceLevel(updatedLEVEL)
    }

        return (
            <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
                <StatusBar
                    backgroundColor={BACKGROUNDWHITE}
                    barStyle={'dark-content'}
                    style={{ flex: 0 }} />

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: GlobalSize(85) }}>
                    <View>
                        <View style={DEFAULTSTYLES.alignView}>
                            <Text style={styles.textHead}>Functional Abilities - Activities of Daily Living</Text>
                            <Text style={[styles.textHead, { color: BORDERCOLOR10 }]}>ADLs</Text>
                        </View>

                        <View>
                            <View style={styles.lineBorder} />
                            <View style={styles.imageView}>
                                <Image
                                    source={require('../../../../../../assets/Images/SocialWorker/Mob.png')}
                                    style={{ width: GlobalSize(20), height: GlobalSize(20) }} resizeMode='contain'/>
                                <Text style={styles.textTitle}>Transportation</Text>
                            </View>

                            <View style={DEFAULTSTYLES.alignView}>
                                <View style={styles.cardBorder}>

                                    {TransferLevel.map((item) => {

                                        return (
                                            <TouchableOpacity
                                                onPress={() => { onselectTransfer(item.id) }}
                                                style={[styles.card, {
                                                    backgroundColor: item.selected ? item.bgColor : BACKGROUNDWHITE
                                                }]}>
                                                <Text style={styles.textNum}>{item.id}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>

                            </View>


                            <View style={styles.rowTitle}>
                                <View>
                                    <Text style={[styles.textIn, { color: selectIdTs == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                                </View>

                                <View>
                                    <Text style={[styles.textIn, { color: selectIdTs !== 0 && selectIdTs !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                                </View>

                            </View>
                            <View style={styles.lineBorder} />
                        </View>

                        <View>
                            <View style={styles.imageView}>
                                <Image
                                    source={require('../../../../../../assets/Images/SocialWorker/Groc.png')}
                                    style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                                <Text style={styles.textTitle}>Grocery Shopping</Text>
                            </View>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={styles.cardBorder}>

                                {Groclevel.map((item) => {

                                    return (
                                        <TouchableOpacity
                                            onPress={() => { onselectGroc(item.id,) }}
                                            style={[styles.card, {
                                                backgroundColor: item.selected ? item.bgColor : BACKGROUNDWHITE
                                            }]}>
                                            <Text style={styles.textNum}>{item.id}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>

                        </View>


                        <View style={styles.rowTitle}>
                            <View>
                                <Text style={[styles.textIn, { color:  selectIdGroc == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                            </View>

                            <View>
                                <Text style={[styles.textIn, { color:  selectIdGroc !== 0 && selectIdGroc !==null? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                            </View>

                        </View>

                        <View style={styles.lineBorder} />
                        <View style={styles.imageView}>
                            <Image
                                source={require('../../../../../../assets/Images/SocialWorker/other.png')}
                                style={{ width: GlobalSize(20), height: GlobalSize(20) }} resizeMode='contain'/>
                            <Text style={styles.textTitle}>Other Shopping</Text>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={styles.cardBorder}>

                                {OtherLevel.map((item) => {

                                    return (
                                        <TouchableOpacity
                                            onPress={() => { onselectOther(item.id) }}
                                            style={[styles.card, {
                                                backgroundColor: item.selected ? item.bgColor : BACKGROUNDWHITE
                                            }]}>
                                            <Text style={styles.textNum}>{item.id}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>

                        </View>

                        <View style={styles.rowTitle}>
                            <View>
                                <Text style={[styles.textIn, { color: selectIdOther == 0 ? TEXTCOLORGREEN2 :TEXTCOLORGREY }]}>I am independent</Text>
                            </View>

                            <View>
                                <Text style={[styles.textIn, { color: selectIdOther !== 0 && selectIdOther !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.lineBorder} />
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../../../assets/Images/SocialWorker/Union.png')}
                            style={{ width: GlobalSize(20), height: GlobalSize(20) }} resizeMode='contain' />
                        <Text style={styles.textTitle}>Housework</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardBorder}>

                            {HouseLevel.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { onselectHouse(item.id) }}
                                        style={[styles.card, {
                                            backgroundColor: item.selected ? item.bgColor : BACKGROUNDWHITE
                                        }]}>
                                        <Text style={styles.textNum}>{item.id}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    </View>

                    <View style={styles.rowTitle}>
                        <View>
                            <Text style={[styles.textIn, { color:  selectIdHouse == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY}]}>I am independent</Text>
                        </View>

                        <View>
                            <Text style={[styles.textIn, { color:  selectIdHouse !== 0 && selectIdHouse !== null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                        </View>

                    </View>

                    <View style={styles.lineBorder} />
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../../../assets/Images/SocialWorker/meal.png')}
                            style={{ width: GlobalSize(20), height: GlobalSize(20) }} resizeMode='contain' />
                        <Text style={styles.textTitle}>Preparing Meals</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardBorder}>

                            {MealLevel.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { onselectMeal(item.id) }}
                                        style={[styles.card, {
                                            backgroundColor: item.selected ? item.bgColor : BACKGROUNDWHITE
                                        }]}>
                                        <Text style={styles.textNum}>{item.id}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    </View>

                    <View style={styles.rowTitle}>
                        <View>
                            <Text style={[styles.textIn, { color:  selectIdMeals == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                        </View>

                        <View>
                            <Text style={[styles.textIn, { color:  selectIdMeals !== 0 && selectIdMeals !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                        </View>

                    </View>

                    <View style={styles.lineBorder} />
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../../../assets/Images/SocialWorker/service.png')}
                            style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                        <Text style={styles.textTitle}>Arranging Outside Services</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardBorder}>

                            {ServiceLevel.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { onselectService(item.id) }}
                                        style={[styles.card, {
                                            backgroundColor: item.selected ? item.bgColor : BACKGROUNDWHITE
                                        }]}>
                                        <Text style={styles.textNum}>{item.id}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    </View>

                    <View style={styles.rowTitle}>
                        <View>
                            <Text style={[styles.textIn, { color:  selectSevice == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                        </View>

                        <View>
                            <Text style={[styles.textIn, { color:  selectSevice !== 0 && selectSevice !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
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

    export default ADL3;

    const styles = StyleSheet.create({
        textHead: {
            fontFamily: FONTS.FontSemiB,
            color: TEXTCOLOR10,
            fontSize: fontSize(14)
        },
        lineBorder: {
            backgroundColor: LINECOLOR1,
            height: GlobalSize(1),
            margin: DEFAULTWIDTH * 0.06,
            marginBottom: GlobalSize(12),
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
        textTitle: {
            fontFamily: FONTS.FontSemiB,
            fontSize: fontSize(14),
            color: PRIMARYCOLOR,
            paddingLeft: GlobalSize(10)
        },
        textId: {
            color: PUREBLACK,
            fontSize:fontSize(14)
        },
        card: {
            width: DEFAULTWIDTH * 0.22,
            height: GlobalSize(48),
            // backgroundColor: PUREWHITE,
            borderRadius: GlobalSize(25),
            alignItems: 'center',
            justifyContent: 'center'
        },
        cardBorder: {
            width: DEFAULTWIDTH * 0.90,
            height: GlobalSize(50),
            borderWidth: 1,
            borderRadius: GlobalSize(25),
            borderColor: BORDERCOLORLINE3,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            // paddingLeft:GlobalSize(25),
            // paddingRight:GlobalSize(25)
        },
        textNum: {
            color: PUREBLACK,
            fontFamily: FONTS.FontSemiB,
            fontSize: fontSize(14)

        },
        textIn: {
            color: PUREBLACK,
            fontFamily: FONTS.FontSemiB,
            fontSize: fontSize(12)
        },
        rowTitle: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: GlobalSize(10),
            marginLeft: GlobalSize(20),
            marginRight: GlobalSize(20)
        },
        imageView: {
            flexDirection: 'row',
            marginLeft: GlobalSize(20),
            marginBottom: GlobalSize(10)
        }
    })