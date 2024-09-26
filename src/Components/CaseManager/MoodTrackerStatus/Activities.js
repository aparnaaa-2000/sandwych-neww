import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BORDERCOLOR1, CARDCOLOR2, PLACEHOLDERCOLOR1, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR2 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { Book, GreenFace, TvPlay, VaccumCleaner } from '../../../../assets'
import { BETTYSMITHPROFILE } from '../../../Constants/DummyImages'

const Activities = () => {

    const DailyActivities = [
        {
            id: 1,
            selComponent: <Book width={25} height={25} />,
            name: 'Book',
        },
        {
            id: 2,
            selComponent: <TvPlay width={25} height={25} />,
            name: 'Watch TV',
        },
        {
            id: 3,
            selComponent: <VaccumCleaner width={25} height={25} />,
            name: 'Clean',
        },
    ]

    return (
        <View style={{ marginBottom: GlobalSize(20) }}>

            <View style={DEFAULTSTYLES.alignView}>
                <Image source={{ uri: BETTYSMITHPROFILE }} style={styles.img} />

                <View style={DEFAULTSTYLES.alignView}>
                    <Text style={[styles.textPatient,{fontFamily:FONTS.FontSemiB}]}>Betty Smith</Text>
                    <Text style={styles.textPatient}>bettysmith@gmail.com</Text>
                </View>
            </View>
            <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.line} />
            </View>
            <View style={styles.viewDay}>
                <Text style={styles.textNotes}>Friday, July 24, 2023</Text>
                <Text style={styles.textDesc}>Betty was happy and did 3
                    Tasks on this date</Text>
            </View>

            <View style={styles.card}>

                <View style={{ marginBottom: GlobalSize(10) }}>
                    <GreenFace width={55} height={55} />
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {DailyActivities.map((item, index) => (
                        <View key={index} style={styles.subCard}>
                            <View style={styles.iconContainer}>
                                {item.selComponent}
                            </View>

                            <View>
                                <Text style={styles.textNm}>{item.name}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </View>
        </View>
    )
}

export default Activities

const styles = StyleSheet.create({
    textNotes: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(18)
    },
    textDesc: {
        color: TEXTCOLOR2,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(13),
        textAlign: 'center'
    },
    viewDay: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(15)
    },
    card: {
        width: DEFAULTWIDTH,
        backgroundColor: CARDCOLOR2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: GlobalSize(20)
    },
    subCard: {
        width: DEFAULTWIDTH * 0.22,
        height:GlobalSize(75),
        backgroundColor: PUREWHITE,
        borderWidth: 1,
        borderColor: BORDERCOLOR1,
        margin: GlobalSize(5),
        borderRadius: GlobalSize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        marginBottom: GlobalSize(5) 
    },
    textNm: {
        color: PUREBLACK,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(12)
    },
    line: {
        backgroundColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.90,
        height: 1,
        margin: GlobalSize(20)
    },
    img: {
        width: GlobalSize(60),
        height: GlobalSize(60),
        borderRadius: GlobalSize(30),
        marginBottom:GlobalSize(10)
    },
    textPatient:{
        color:TEXTCOLOR10,
        fontFamily:FONTS.FontRegular,
        fontSize:fontSize(14)
    }
})