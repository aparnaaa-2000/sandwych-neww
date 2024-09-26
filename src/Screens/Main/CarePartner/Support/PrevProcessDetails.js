
import { FlatList, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React from 'react'

//
import { GreyCall, GreyEmail, GreyLocation, GreyMap } from '../../../../../assets'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import {
    BACKGROUNDGREY,
    BORDERCOLOR5,
    PUREBLACK,
    TEXTCOLOR10,
    TEXTCOLOR5,
    PUREWHITE,
    PRIMARYCOLOR,
    BORDERCOLORSUPPORT,
    PLACEHOLDERCOLOR1
} from '../../../../Constants/Colors/Colors'
import { FONTS } from '../../../../Constants/Fonts'
import { fontSize, GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

const PrevProcessDetails = ({ item }) => {
    

    return (
        <>
            <View style={{ marginBottom: 5 }}>
                <Text style={[styles.textRes, { fontSize: fontSize(20) }]}>{item?.requested_support}</Text>
            </View>


            <View style={styles.viewDetails}>

                <View style={{ marginRight: 10 }}>
                    <GreyCall />
                </View>

                <View>
                    <Text style={styles.textDetails}>{item?.support_member?.phone_number}</Text>
                </View>
            </View>



            <View style={styles.viewDetails}>

                <View style={{ marginRight: 10 }}>
                    <GreyEmail />
                </View>

                <View>
                    <Text style={styles.textDetails}>{item?.support_member?.email}</Text>
                </View>
            </View>



            <View style={styles.viewDetails}>

                <View style={{ marginRight: 10 }}>
                    <GreyLocation />
                </View>

                <View style={{ maxWidth: DEFAULTWIDTH * 0.5 }}>
                    <Text style={styles.textDetails}>{item?.support_member?.address}</Text>
                </View>


            </View>


            {/* <View style={styles.viewDetails}>

                <View style={{ marginRight: 10 }}>
                    <GreyLocation />
                </View>

                <View style={{ maxWidth: DEFAULTWIDTH * 0.5 }}>
                    <Text style={styles.textDetails}>{item?.support_member_professional_details[0]?.individualcaqh}</Text>
                </View>

            </View> */}

            {/*             
            <View style={styles.viewDetails}>

                <View style={{ marginRight: 10 }}>
                    <GreyLocation />
                </View>

                <View style={{ maxWidth: DEFAULTWIDTH * 0.5 }}>
                    <Text style={styles.textDetails}>{item?.support_member_professional_details[0]?.individualnpi}</Text>
                </View>

            </View>

            
            <View style={styles.viewDetails}>

                <View style={{ marginRight: 10 }}>
                    <GreyLocation />
                </View>

                <View style={{ maxWidth: DEFAULTWIDTH * 0.5 }}>
                    <Text style={styles.textDetails}>{item?.support_member_professional_details[0]?.practicenpi}</Text>
                </View>

            </View> */}

            {item?.language?.length > 0 &&

                <View style={[styles.viewDetails, { marginBottom: 10 }]}>

                    <View style={{ marginRight: 10 }}>
                        <GreyMap />
                    </View>

                    <View>

                        {item?.languages?.map((item, index) => {
                            return (
                                <Text key={index} style={styles.textDesc}>
                                    {item?.language}{index < item?.languages?.length - 1 ? ',' : ''}
                                </Text>
                            );
                        })}

                    </View>
                </View>}


            <View style={styles.rowCard}>
                <View style={[styles.card, DEFAULTSTYLES.iosShadow]}>
                    <Text style={styles.textRate}>Response Rating</Text>
                    <Text style={styles.textNm}>{item?.support_member?.average_response_percentage?.toFixed(0)} %</Text>
                </View>

                <View style={[styles.card, DEFAULTSTYLES.iosShadow]}>
                    <Text style={styles.textRate}>Overall Rating</Text>
                    <Text style={styles.textNm}>{item?.support_member?.overall_rating_percentage?.toFixed(0)} %</Text>
                </View>
            </View>

{item?.supports &&
            <View style={styles.suportView}>
                <Text style={[styles.textRes, { fontSize: 16 }]}>Supports provided</Text>
            </View>}
       
            <View>
                <FlatList
                    data={item?.supports}
                    keyExtractor={(supportItem) => supportItem.id?.toString() || supportItem.support} // Ensuring key is a string
                    renderItem={({ item: supportItem }) => (
                        <View style={[styles.card, styles.sideMargin]}>
                            {/* <Image source={support?.image}/> */}
                            <Image source={require('../../../../../assets/Images/AbilityToHelp1/Eating.png')}
                                style={{ width: GlobalSize(60), height: GlobalSize(60), marginBottom: GlobalSize(8) }} />
                            <Text style={[styles.textNm, { fontSize: fontSize(12) }]}>{supportItem?.support}</Text>
                        </View>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />

            </View>
            <View style={styles.suportView}>
                <Text style={[styles.textRes, { fontSize: 16 }]}>Active Status</Text>
            </View>

            <View style={{ marginBottom: GlobalSize(20) }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {item?.support_member?.schedules?.map((i, index) => {
                        return (
                            <View style={styles.cardActive} key={index}>
                                <View style={styles.dayCard}>
                                    <Text style={[styles.textActive, { fontSize: fontSize(12) }]}>
                                        {i?.day_id == '1' ? 'SUN' :
                                            i?.day_id == '2' ? 'MON' :
                                                i?.day_id == '3' ? 'TUE' :
                                                    i?.day_id == '4' ? 'WED' :
                                                        i?.day_id == '5' ? 'THU' :
                                                            i?.day_id == '6' ? 'FRI' : 'SAT'}
                                    </Text>
                                </View>

                                <View style={styles.rowActive}>
                                    <View>
                                        <Text style={styles.textTime}>{i?.from_time}</Text>
                                    </View>

                                    <View style={styles.viewTo}>
                                        <Text style={styles.textTo}>TO</Text>
                                    </View>

                                    <View>
                                        <Text style={styles.textTime}>{i.to_time}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
            {item?.note &&
                <View style={styles.borderView}>
                    <View>
                        <Text style={styles.textReq}>Your request</Text>
                    </View>

                    <View>
                        <Text style={styles.textDesc}>{item?.note}</Text>
                    </View>
                </View>}
        </>
    )
}

export default PrevProcessDetails;

const styles = StyleSheet.create({
    viewDetails: {
        width: DEFAULTWIDTH * 0.89,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BACKGROUNDGREY,
        marginBottom: 2,
        paddingLeft: 18
    },
    sideMargin: {
        marginRight: GlobalSize(15),
        marginLeft: 2,
        marginBottom: GlobalSize(1),
    },
    cardActive: {
        width: DEFAULTWIDTH * 0.7,
        padding: GlobalSize(10),
        backgroundColor: PUREWHITE,
        elevation: 2,
        borderRadius: GlobalSize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:5,
        left: 2,
        marginBottom: 2
    },
    textDetails: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: 14,
    },
    textTime: {
        color: PLACEHOLDERCOLOR1,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(14)
    },
    suportView: {
        marginLeft: DEFAULTWIDTH * 0.0,
        marginBottom: 5,
        marginTop: GlobalSize(10)
    },
    borderView: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        borderColor: BORDERCOLOR5,
        margin: 2,
        marginBottom: GlobalSize(10)
    },
    dayCard: {
        width: DEFAULTWIDTH * 0.1,
        height: DEFAULTHEIGHT * 0.05,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(6)
    },
    textRes: {
        fontSize: 24,
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    textReq: {
        color: TEXTCOLOR10,
        fontSize: 16,
        fontFamily: FONTS.FontMedium,
        marginBottom: 5
    },
    textNm: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(16)
    },
    textTo: {
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(16)
    },
    textDesc: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        fontSize: 13
    },
    textRate: {
        color: TEXTCOLOR10,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium
    },
    lineBorder: {
        width: DEFAULTWIDTH * 0.86,
        height: 1,
        marginBottom: GlobalSize(10),
        backgroundColor: BORDERCOLORSUPPORT,
        margin: GlobalSize(17),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowActive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: GlobalSize(10)
    },
    dayContainer: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.1,
        height: GlobalSize(30),
        opacity: 0.6,
        borderRadius: GlobalSize(5),
        alignItems: 'center',
        justifyContent: 'center',
        margin: GlobalSize(3.5)
    },
    textActive: {
        fontFamily: FONTS.FontSemiB,
        color: PUREWHITE,
        fontSize: fontSize(16)
    },
    card: {
        width: DEFAULTWIDTH * 0.42,
        elevation: 2,
        backgroundColor: PUREWHITE,
        borderRadius: 10,
        alignItems: 'center',
        padding: GlobalSize(10)
    },
    activeCard: {
        backgroundColor: PRIMARYCOLOR,
        width: DEFAULTWIDTH * 0.90,
        borderRadius: GlobalSize(10),
        padding: GlobalSize(10),
        paddingBottom: GlobalSize(18),
        marginBottom: GlobalSize(10)
    },
    rowCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: GlobalSize(10)
    },
    viewTo: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(40),
        height: GlobalSize(40),
        borderRadius: GlobalSize(20),
        alignItems: 'center',
        justifyContent: 'center'
    },

})
