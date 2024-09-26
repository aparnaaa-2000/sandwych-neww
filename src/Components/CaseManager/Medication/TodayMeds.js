import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FONTS } from '../../../Constants/Fonts'
import { BORDERCOLOR4, BORDERCOLORLINE, FIFTHCOLOR, FOURTHCOLOR, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR7, TEXTCOLOR8 } from '../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { ClockLine } from '../../../../assets'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'

const TodayMeds = ({navigation}) => {

    const Meds = [
        {
            id: 1,
            Name: 'Losartan',
            Dosage: 'Daily - (2) 100mg',
            Time: '11:00 am',
            Status: 'Done',
        },
        {
            id: 2,
            Name: 'Losartan',
            Dosage: 'Daily - (2) 100mg',
            Time: '1:00 pm',
            Status: 'Upcoming',
        },
        {
            id: 3,
            Name: 'Losartan',
            Dosage: 'Daily - (2) 100mg',
            Time: '3:00 pm',
            Status: 'Upcoming',
        }
    ]
    return (
        <View>

            <View style={styles.rowSub}>
                <Text style={styles.textMed}>Today’s medication</Text>
            </View>

            <View style={{marginBottom:GlobalSize(15)}}>
                {Meds.map((item) => {
                    return (
                        <View style={styles.row}>

                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={styles.radioButton}>
                                    <View
                                        style={[
                                            styles.radioIcon,
                                            item.Status == 'Done' && styles.radioIconSelected,
                                        ]}>
                                        {item.Status == 'Done' && <View style={styles.radioBorder} />}
                                    </View>
                                </TouchableOpacity>

                                <View>

                                    <Text style={styles.textNm}>{item.Name}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.textDos}>{item.Dosage}</Text>
                                        <ClockLine />
                                        <Text style={[styles.textDos, { marginLeft: GlobalSize(6) }]}>{item.Time}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.btn, { backgroundColor: item.Status == 'Done' ? FOURTHCOLOR : FIFTHCOLOR }]}>
                                <Text style={styles.textBtn}>{item.Status}</Text>
                            </View>

                            <View>
                            </View>
                        </View>
                    )
                })}
            </View>

            <View style={[DEFAULTSTYLES.alignView,{marginBottom:GlobalSize(40)}]}>
                <TouchableOpacity style={styles.moreBtn} onPress={()=>navigation.navigate('MoreInfo')}>
                    <Text style={[styles.textBtn,{fontSize:fontSize(14)}]}>More Info</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.border} />

        </View>
    )
}

export default TodayMeds

const styles = StyleSheet.create({
    textMed: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(20)
    },
    textNm: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: TEXTCOLOR7
    },
    textDos: {
        color: TEXTCOLOR8,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12),
        marginRight: GlobalSize(10)
    },
    textBtn: {
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(12)
    },
    btn: {
        width: DEFAULTWIDTH * 0.20,
        height: GlobalSize(30),
        borderRadius: GlobalSize(20),
        alignItems: 'center',
        justifyContent: "center"
    },
    radioBorder: {
        width: GlobalSize(12),
        height: GlobalSize(12),
        borderRadius: GlobalSize(6),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PUREWHITE,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
    },
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE
    },
    radioIconSelected: {
        backgroundColor: PRIMARYCOLOR,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(20),
        marginLeft: GlobalSize(10)
    },
    rowSub: {
        marginLeft: GlobalSize(20),
        marginBottom: GlobalSize(20),
        marginTop: GlobalSize(10)
    },
    moreBtn:{
        backgroundColor:PRIMARYCOLOR,
        width:DEFAULTWIDTH*0.7,
        height:GlobalSize(45),
        borderRadius:GlobalSize(25),
        alignItems:'center',
        justifyContent:'center'
    },
    border: {
        backgroundColor: BORDERCOLORLINE,
        height: GlobalSize(1),
    },
})