import { Platform, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { FlatList } from 'react-native'
import { BlueBed, BlueCalender, BlueHeart, BlueSts } from '../../../../assets'

export default function Events() {

    const DischargeData = [
        {
            id: 1,
            Date: '05/01/2024',
            Period: 'For 1 month',
            Hospital: 'Aster Medicity',
            Diagnosis: 'Alzheimer',
            Doctor: 'Flores Mark, MD'
        },
        {
            id: 2,
            Date: '05/01/2024',
            Period: 'For 1 month',
            Hospital: 'Aster Medicity',
            Diagnosis: 'Alzheimer',
            Doctor: 'Flores Mark, MD'
        },
        {
            id: 3,
            Date: '05/01/2024',
            Period: 'For 1 month',
            Hospital: 'Aster Medicity',
            Diagnosis: 'Alzheimer',
            Doctor: 'Flores Mark, MD'
        },
    ]

    const renderItem = ({ item,index }) => {
        return (
            <View style={[styles.mainCard,
            {
                marginRight: DischargeData?.length - 1 === index ? 20 : 0,
            },
            Platform.OS == 'android' ?
                DEFAULTSTYLES.androidShadow :
                DEFAULTSTYLES.iosShadow]}>


                <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                    <View>
                        <Image source={require('../../../../assets/Images/Calender.png')}
                            style={{ width: 36, height: 36 }} />
                    </View>

                    <View>
                        <Text style={styles.textDate}>{item.Date}</Text>

                        <View style={styles.cardMonth}>
                            <Text style={styles.textMonth}>For 1 month</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.subView}>
                    <BlueBed />
                    <Text style={styles.textSub}>Aster Medicity</Text>
                </View>
                <View style={styles.subView}>
                    <BlueHeart />
                    <Text style={styles.textSub}>Alzheimer</Text>
                </View>
                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                    <BlueSts />
                    <Text style={styles.textSub}>Flores Mark, MD</Text>
                </View>

            </View>
        )
    }
    return (
        <View>
            <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: 10 }}>
                <Text style={styles.textRD}>Previous Discharge</Text>
            </View>

            <View>
                <FlatList
                    horizontal
                    data={DischargeData}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textRD: {
        fontFamily: FONTS.FontMedium,
        fontSize: 15,
        color: TEXTCOLOR7
    },
    mainCard: {
        width: DEFAULTWIDTH * 0.5,
        backgroundColor: PUREWHITE,
        borderRadius: 15,
        marginLeft:DEFAULTWIDTH*0.05,
        marginBottom:DEFAULTWIDTH*0.03,
        padding: 20,
    },
    textSub: {
        fontSize: 13,
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontRegular,
        paddingLeft: 8
    },
    textDate: {
        fontSize: 13,
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        paddingLeft: 8
    },
    textMonth: {
        fontFamily: FONTS.FontRegular,
        fontSize: 11,
        color: PRIMARYCOLOR
    },
    cardMonth: {
        borderColor: PRIMARYCOLOR,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 20,
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 10,
        marginLeft: 8
    },
    subView:{
        flexDirection: 'row',
         marginBottom: 10,
        alignItems:'center' 
    }
})