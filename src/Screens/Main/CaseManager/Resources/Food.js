import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { BACKGROUNDCOLORGREEN, BACKGROUNDORANGE, BACKGROUNDWHITE, BORDERCOLOROR, BORDERCOLORSW, FOURTHCOLOR, TEXTCOLOR10, TEXTCOLOR5, TEXTCOLOR8, TEXTCOLORGREEN, VALIDCOLOR } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { BlackFood, GreenArrow, OrangeArrow } from '../../../../../assets'

const FoodResource = ({navigation}) => {

    const Data = [
        {
            id: 1,
            Title: 'Food',
            Type: 'Uber',
            Used: '00/00/0000',
            Satisfaction: '25%'
        },
        {
            id: 2,
            Title: 'Food',
            Type: 'Uber',
            Used: '00/00/0000',
            Satisfaction: '25%'
        },
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>

                <View style={styles.rowView}>
                    <BlackFood />
                    <Text style={styles.mainText}>{item.Title}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.subTitle}>Type:</Text>
                        <Text style={[styles.subTitle, { color: BORDERCOLORSW, fontFamily: FONTS.FontRegular }]}>{item.Type}</Text>
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Used:</Text>
                        <Text style={[styles.subTitle, { color: BORDERCOLORSW, fontFamily: FONTS.FontRegular }]}>{item.Used}</Text>
                    </View>

                    <View>
                        <Text style={styles.subTitle}>Satisfaction:</Text>
                        <Text style={[styles.subTitle, { color: VALIDCOLOR, fontFamily: FONTS.FontRegular }]}>{item.Satisfaction}</Text>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Food'} />
            </View>

            <View style={DEFAULTSTYLES.alignView}>
                <TouchableOpacity onPress={()=>navigation.navigate('FoodTotalResource')}
                style={[styles.cardTotal, { marginBottom: GlobalSize(4) }]}>
                    <View>
                        <Text style={styles.textTr}>Total Resource Usage</Text>
                        <Text style={styles.textNum}>1,873</Text>
                    </View>

                    <View>
                        <OrangeArrow />
                    </View>
                    </TouchableOpacity>
                <View style={[styles.cardTotal,{backgroundColor:BACKGROUNDCOLORGREEN,borderColor:TEXTCOLORGREEN}]}>
                    <View>
                        <Text style={styles.textTr}>Satisfaction</Text>
                        <Text style={[styles.textNum,{color:TEXTCOLORGREEN}]}>25%</Text>
                    </View>

                    <View>
                        <GreenArrow />
                    </View>
                </View>

            </View>
            <View style={{ padding: GlobalSize(20) }}>
                <Text style={styles.textRes}>Resources History & Satisfaction</Text>

                <View>
                    <FlatList
                        data={Data}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem} />
                </View>
            </View>



        </SafeAreaView>
    )
}

export default FoodResource;

const styles = StyleSheet.create({
    textRes: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR8,
        fontSize: fontSize(14),
        marginBottom: GlobalSize(15)
    },
    card: {
        borderWidth: 1,
        borderRadius: GlobalSize(10),
        borderColor: BORDERCOLORSW,
        padding: GlobalSize(15),
        marginBottom: GlobalSize(10)
    },
    subTitle: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10,
        fontSize: fontSize(14)
    },
    mainText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(16),
        color: TEXTCOLOR5,
        left: GlobalSize(5)
    },
    rowView: {
        flexDirection: 'row',
        marginBottom: GlobalSize(10),
        alignItems: 'center'
    },
    cardTotal: {
        borderWidth: 1,
        borderRadius: GlobalSize(10),
        borderColor: BORDERCOLOROR,
        backgroundColor: BACKGROUNDORANGE,
        padding: GlobalSize(15),
        width: DEFAULTWIDTH * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textTr: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15),
        color: TEXTCOLOR10
    },
    textNum: {
        color: FOURTHCOLOR,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(25)
    }
})