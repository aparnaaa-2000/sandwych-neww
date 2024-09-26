import React from 'react';
import { Platform, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { BlueBed, BlueCalender, BlueScissor } from '../../../../assets'
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

export default function Surgery() {

    const DischargeData = [
        {
            id: 1,
            Date: '05/09/2023',
            Title: 'Surgery',
            Hospital: 'Amrita Hospital',
            Diagnosis: 'Maxilo Facio',
        },
        {
            id: 2,
            Date: '05/09/2023',
            Title: 'Surgery',
            Hospital: 'Amrita Hospital',
            Diagnosis: 'Maxilo Facio',
        },
        {
            id: 3,
            Date: '05/09/2023',
            Title: 'Surgery',
            Hospital: 'Amrita Hospital',
            Diagnosis: 'Maxilo Facio',
        },
    ]

    const renderItem = ({ item,index}) => {
        return (
            <View style={[
                styles.mainCard,
                {
                  marginRight: DischargeData?.length - 1 === index ? GlobalSize(20) : 0,
                },
                Platform.OS == 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow
              ]}>

                <View style={styles.subView}>
                    <View>
                        <Image
                            source={require('../../../../assets/Images/Surgery.png')}
                            style={{ width: width(36), height: height(36) }} />
                    </View>

                    <View>
                        <Text style={styles.textDate}>{item.Title}</Text>
                    </View>
                </View>

                <View style={styles.subView}>
                    <BlueBed />
                    <Text style={styles.textSub}>{item.Hospital}</Text>
                </View>
                <View style={styles.subView}>
                    <BlueScissor />
                    <Text style={styles.textSub}>{item.Diagnosis}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <BlueCalender />
                    <Text style={styles.textSub}>{item.Date}</Text>
                </View>

            </View>
        )
    }
    return (
        <View>
            <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: 10}}>
                <Text style={styles.textRD}>Critical Surgeries/Operations</Text>
            </View>

            <View>
                <FlatList
                    horizontal
                    data={DischargeData}
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
        borderRadius:GlobalSize(15),
        padding: GlobalSize(20),
        marginLeft:DEFAULTWIDTH*0.05,
        marginBottom:DEFAULTWIDTH*0.05
    },
    textSub: {
        fontSize: fontSize(13),
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(8)
    },
    textDate: {
        fontSize: fontSize(14),
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
    subView: {
        marginBottom: GlobalSize(10),
        flexDirection: 'row',
        alignItems: 'center'
    },
   
})