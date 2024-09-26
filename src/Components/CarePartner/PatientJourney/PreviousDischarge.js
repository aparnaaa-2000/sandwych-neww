import { Platform, StyleSheet, Text, View, Image,FlatList } from 'react-native'
import React from 'react'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { BlueBed, BlueHeart, BlueSts } from '../../../../assets'
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

export default function PreviousDischarge({previusData}) {

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
                marginRight: DischargeData?.length - 1 === index ? GlobalSize(20) : 0,
            },
            Platform.OS == 'android' ?
                DEFAULTSTYLES.androidShadow :
                DEFAULTSTYLES.iosShadow]}>


                <View style={{ marginBottom: GlobalSize(10), flexDirection: 'row' }}>
                    <View>
                        <Image source={require('../../../../assets/Images/Calender.png')}
                            style={{ width: width(36), height: height(36) }} />
                    </View>

                    <View>
                        <Text style={styles.textDate}>{item.start_date}</Text>

                        <View style={styles.cardMonth}>
                            <Text style={styles.textMonth}>{item?.duration}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.subView}>
                    <BlueBed />
                    <Text style={styles.textSub}>{item?.location_name}</Text>
                </View>
                <View style={styles.subView}>
                    <BlueHeart />
                    <Text style={styles.textSub}>{item?.diagnosis_name}</Text>
                </View>
                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                    <BlueSts />
                    <Text style={styles.textSub}>{item?.doctor_name}</Text>
                </View>

            </View>
        )
    }
    return (
        <View>
            <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(10) }}>
                <Text style={styles.textRD}>Previous Events</Text>
            </View>

            <View>
                <FlatList
                    horizontal
                    data={previusData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textRD: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15),
        color: TEXTCOLOR7
    },
    mainCard: {
        width: DEFAULTWIDTH * 0.5,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(15),
        marginLeft:DEFAULTWIDTH*0.05,
        marginBottom:DEFAULTWIDTH*0.03,
        padding: GlobalSize(20),
    },
    textSub: {
        fontSize: fontSize(13),
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(8)
    },
    textDate: {
        fontSize: fontSize(13),
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        paddingLeft: GlobalSize(8)
    },
    textMonth: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(11),
        color: PRIMARYCOLOR
    },
    cardMonth: {
        borderColor: PRIMARYCOLOR,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: GlobalSize(20),
        paddingLeft: GlobalSize(5),
        paddingRight: GlobalSize(5),
        borderRadius: GlobalSize(10),
        marginLeft: GlobalSize(8)
    },
    subView:{
        flexDirection: 'row',
         marginBottom: GlobalSize(10),
        alignItems:'center' 
    }
})