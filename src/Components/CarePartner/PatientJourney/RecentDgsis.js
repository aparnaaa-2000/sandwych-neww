import { StyleSheet, Text, View, Image, Platform, FlatList } from 'react-native'
import React from 'react'

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts'
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7, TEXTCOLORW } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BlueSts } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

export default function RecentDgsis({ activeData,dashboard}) {

    const renderItem = ({item,index})=>{
        return(
            <View style={[styles.viewOut, {
                marginRight: activeData?.length - 1 === index ? 20 : 0,
                marginLeft:dashboard ? 10 :GlobalSize(20)
            }]}>
            <View style={[
                styles.cardDg,
                Platform.OS == 'android'
                    ? DEFAULTSTYLES.androidShadow
                    : DEFAULTSTYLES.iosShadow,
            ]} >

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image
                            source={require('../../../../assets/Images/Heart.png')}
                            style={styles.imageV} />
                    </View>

                    <View>
                        <Text style={styles.textDgNm}>{item?.diagnosis_name}</Text>
                        <Text style={styles.textCode}>ICD Code - {item?.icd_code}</Text>

                        <View style={styles.viewIcon}>
                            <BlueSts />
                            <Text style={styles.textPlace}>{item?.doctor_name}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={[styles.dateView, { marginRight: DEFAULTWIDTH * 0.0 }]}>
                                <Text style={styles.textDT}>{item?.start_date}</Text>
                            </View>

                            <View style={styles.dateView}>
                                <Text style={styles.textDT}>For {item?.duration}</Text>
                            </View>
                        </View>
                    </View>


                </View>



            </View>
        </View>
        )
    }
    return (
        <View>

            <View style={{ marginLeft:dashboard?10: DEFAULTWIDTH * 0.05, marginBottom: DEFAULTHEIGHT * 0.015 }}>
                <Text style={styles.textRecent}>Recent Diagnosis</Text>
            </View>
            <FlatList
                data={activeData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(Item => Item.id)}
                renderItem={renderItem} />
        </View>
    )
}

const styles = StyleSheet.create({
    textRecent: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR7
    },
    cardDg: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.80,
        borderRadius: fontSize(15),
        padding: GlobalSize(18)
    },
    textDgNm: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR5,
        width:DEFAULTWIDTH*0.45
    },
    textCode: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(10),
        color: TEXTCOLORW
    },
    textPlace: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORW,
        paddingLeft: GlobalSize(10)
    },
    dateView: {
        borderWidth: 1,
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        width: DEFAULTWIDTH * 0.2,
        padding: GlobalSize(2),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textDT: {
        fontSize: fontSize(10),
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontMedium
    },
    viewOut: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTHEIGHT * 0.04,
      
    },
    imageV: {
        width: GlobalSize(80),
        height: GlobalSize(90),
        marginRight: GlobalSize(10)
    },
    viewIcon: {
        flexDirection: 'row',
        marginTop: GlobalSize(8),
        marginBottom: GlobalSize(10)
    }
})