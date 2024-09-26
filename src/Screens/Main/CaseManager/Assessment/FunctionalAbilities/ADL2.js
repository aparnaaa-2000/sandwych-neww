import { SafeAreaView, StatusBar, StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDRED, BACKGROUNDWHITE, BACKGROUNDYELLOW, BORDERCOLOR1, BORDERCOLOR10, BORDERCOLOR2, BORDERCOLORLINE, BORDERCOLORLINE3, FIFTHCOLOR, FOURTHCOLOR, LINECOLOR1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLORGREEN2, TEXTCOLORGREY } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { FONTS } from '../../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'

const ADL2 = () => {

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
    const [selectIdEat, setSelectIdEat] = useState(null)
    const [selectIdDress,setSelectIdDress] = useState(null)
    const [selectIdTransfer,setSelectIdTransfer] = useState(null)
    const [selectIdBath,setSelectIdBath] = useState(null)
    const [selectIdDental,setSelectDental] = useState(null)
    const [selectToil,setSelectToil] = useState(null)
    const [bgColor, setBgColor] = useState(null)
    const [eatLevel,seteatLevel] = useState(LEVEL)
    const [dresslevel,setDressLevel]= useState(LEVEL)
    const [transferLevel,setTransferLevel] = useState(LEVEL)
    const [BathLevel,setBathLevel] = useState(LEVEL)
    const [DentalLevel,setDentalLevel] = useState(LEVEL)
    const [ToilLevel,setToilLevel] = useState(LEVEL)

    const ADLDATA = [
        {
            id: 1,
            Title: 'Eating',
            image: null,

        }
    ]


    const onselectEat = (ItemId) => {
        setSelectIdEat(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        seteatLevel(updatedLEVEL)
    }

    const onselectDress = (ItemId) => {
        setSelectIdDress(ItemId)
         const updatedLEVEL = LEVEL.map(item => 
             item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
         )
         setDressLevel(updatedLEVEL)
     }

     
    const onselectTransfer = (ItemId) => {
        setSelectIdTransfer(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setTransferLevel(updatedLEVEL)
    }

    
    const onselectBath = (ItemId) => {
        setSelectIdBath(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setBathLevel(updatedLEVEL)
    }

    
    const onselectDental = (ItemId) => {
        setSelectDental(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setDentalLevel(updatedLEVEL)
    }

    
    const onselectToil = (ItemId) => {
        setSelectToil(ItemId)
        const updatedLEVEL = LEVEL.map(item => 
            item.id === ItemId ? { ...item, selected: true } : { ...item, selected: false }
        )
        setToilLevel(updatedLEVEL)
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
                                    source={require('../../../../../../assets/Images/SocialWorker/eat.png')}
                                    style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                                <Text style={styles.textTitle}>Eating</Text>
                            </View>

                            <View style={DEFAULTSTYLES.alignView}>
                                <View style={styles.cardBorder}>

                                    {eatLevel.map((item) => {

                                        return (
                                            <TouchableOpacity
                                                onPress={() => { onselectEat(item.id) }}
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
                                    <Text style={[styles.textIn, { color: selectIdEat == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                                </View>

                                <View>
                                    <Text style={[styles.textIn, { color: selectIdEat !== 0 && selectIdEat !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                                </View>

                            </View>
                            <View style={styles.lineBorder} />
                        </View>

                        <View>
                            <View style={styles.imageView}>
                                <Image
                                    source={require('../../../../../../assets/Images/SocialWorker/Dress.png')}
                                    style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                                <Text style={styles.textTitle}>Dressing</Text>
                            </View>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={styles.cardBorder}>

                                {dresslevel.map((item) => {

                                    return (
                                        <TouchableOpacity
                                            onPress={() => { onselectDress(item.id,) }}
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
                                <Text style={[styles.textIn, { color:  selectIdDress == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                            </View>

                            <View>
                                <Text style={[styles.textIn, { color:  selectIdDress !== 0 && selectIdDress !==null? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                            </View>

                        </View>

                        <View style={styles.lineBorder} />
                        <View style={styles.imageView}>
                            <Image
                                source={require('../../../../../../assets/Images/SocialWorker/Transfer.png')}
                                style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                            <Text style={styles.textTitle}>Transfer & Mobility</Text>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <View style={styles.cardBorder}>

                                {transferLevel.map((item) => {

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
                                <Text style={[styles.textIn, { color: selectIdTransfer == 0 ? TEXTCOLORGREEN2 :TEXTCOLORGREY }]}>I am independent</Text>
                            </View>

                            <View>
                                <Text style={[styles.textIn, { color: selectIdTransfer !== 0 && selectIdTransfer !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                            </View>

                        </View>
                    </View>

                    <View style={styles.lineBorder} />
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../../../assets/Images/SocialWorker/Bath.png')}
                            style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                        <Text style={styles.textTitle}>Bathing</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardBorder}>

                            {BathLevel.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { onselectBath(item.id) }}
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
                            <Text style={[styles.textIn, { color:  selectIdBath == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY}]}>I am independent</Text>
                        </View>

                        <View>
                            <Text style={[styles.textIn, { color:  selectIdBath !== 0 && selectIdBath !== null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                        </View>

                    </View>

                    <View style={styles.lineBorder} />
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../../../assets/Images/SocialWorker/Dental.png')}
                            style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                        <Text style={styles.textTitle}>Dental Hygiene</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardBorder}>

                            {DentalLevel.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { onselectDental(item.id) }}
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
                            <Text style={[styles.textIn, { color:  selectIdDental == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                        </View>

                        <View>
                            <Text style={[styles.textIn, { color:  selectIdDental !== 0 && selectIdDental !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
                        </View>

                    </View>

                    <View style={styles.lineBorder} />
                    <View style={styles.imageView}>
                        <Image
                            source={require('../../../../../../assets/Images/SocialWorker/Toil.png')}
                            style={{ width: GlobalSize(20), height: GlobalSize(20) }} />
                        <Text style={styles.textTitle}>Toileting</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardBorder}>

                            {ToilLevel.map((item) => {

                                return (
                                    <TouchableOpacity
                                        onPress={() => { onselectToil(item.id) }}
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
                            <Text style={[styles.textIn, { color:  selectToil == 0 ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I am independent</Text>
                        </View>

                        <View>
                            <Text style={[styles.textIn, { color:  selectToil !== 0 && selectToil !==null ? TEXTCOLORGREEN2 : TEXTCOLORGREY }]}>I need support</Text>
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

    export default ADL2

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