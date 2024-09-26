import React from 'react'
import { Platform, StyleSheet, Text, View, Image, FlatList } from 'react-native';

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts'
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7 } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BlueBed, BlueCalender, BlueHeart, BlueSts } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

export default function RecentDischarge({ RecentDgData }) {
  
    const renderItem = ({ item,index}) => {
        return (
            <View style={styles.viewAlign}>
                <View style={[
                    styles.mainCard,
                    Platform.OS == 'android' ?
                        DEFAULTSTYLES.androidShadow :
                        DEFAULTSTYLES.iosShadow,{  marginRight: RecentDgData?.length - 1 === index ? 20 : 0,}]}>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image
                                source={require('../../../../assets/Images/Summary.png')}
                                style={{ width: GlobalSize(60), height: GlobalSize(60) }}
                            />
                        </View>

                        <View style={{ marginLeft: GlobalSize(10) }}>

                            <View style={styles.subView}>
                                <BlueCalender />
                                <Text style={styles.textDate}>{item?.start_date}</Text>
                            </View>

                            <View style={styles.subView}>
                                <BlueBed />
                                <Text style={styles.textSub}>{item?.location_name}</Text>
                            </View>

                            <View style={styles.subView}>
                                <BlueHeart />
                                <Text style={[styles.textSub,{maxWidth:GlobalSize(150)}]}>{item?.diagnosis_name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <BlueSts />
                                <Text style={styles.textSub}>{item?.doctor_name}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.cardMonth}>
                        <Text style={styles.textMonth}>{item?.duration}</Text>
                    </View>

                </View>
            </View>
        )
    }
    return (
        <View>

            <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(10) }}>
                <Text style={styles.textRD}>Recent Events</Text>
            </View>

            <FlatList
                data={RecentDgData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(Item => Item.id)}
                renderItem={renderItem} />
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: DEFAULTWIDTH * 0.85,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(15),
        padding: GlobalSize(18),
        marginLeft:GlobalSize(20)
    },
    textMonth: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(10),
        color: PRIMARYCOLOR
    },
    cardMonth: {
        borderColor: PRIMARYCOLOR,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BACKGROUNDWHITE,
        height: GlobalSize(20),
        paddingLeft: GlobalSize(5),
        paddingRight: GlobalSize(5),
        borderRadius: GlobalSize(10),
        right: GlobalSize(10)
    },
    textDate: {
        fontSize: fontSize(13),
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        paddingLeft: GlobalSize(8)
    },
    textSub: {
        fontSize: fontSize(13),
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(8)
    },
    viewAlign: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(10)
    },
    subView: {
        flexDirection: 'row',
        marginBottom: GlobalSize(10),
        alignItems: 'center'
    }
})