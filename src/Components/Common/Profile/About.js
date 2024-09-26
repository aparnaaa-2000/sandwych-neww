import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PUREWHITE, TEXTCOLOR7, TEXTCOLORW } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { BlueCalendar, BlueCall, BlueCode, BlueEmail, BlueGender, BlueLocation, Man, OrangePen, Phone } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

export default function About({ Title, Phone, Edit, Gender, DOB, navigation, data }) {

    return (


        <View style={[
            styles.cardAbout,
            Platform.OS == 'android'
                ? DEFAULTSTYLES.androidShadow
                : DEFAULTSTYLES.iosShadow,
        ]}>

            <View style={styles.flexRow}>

                <View>

                </View>

                <View>
                    <Text style={styles.textAbout}>{Title}</Text>
                </View>

                <View>

                    {Edit &&
                        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                            <OrangePen />
                        </TouchableOpacity>
                    }

                </View>

            </View>

            <View >
                {Phone &&
                    <View style={styles.subView}>
                        <BlueCall />
                        <Text style={styles.textDs}>{Phone}</Text>
                    </View>}

                <View style={styles.subView}>
                    <BlueEmail />
                    <Text style={styles.textDs}>{data?.email}</Text>
                </View>
                {data?.address &&
                    <View style={styles.subView}>
                        <BlueLocation />
                        <Text style={styles.textDs}>{data?.address}</Text>
                    </View>}

                {data?.zipcode?.length > 0 &&
                    <View style={styles.subView}>
                        <BlueCode />
                        <Text style={styles.textDs}>{data?.zipcode}</Text>
                    </View>}
                    {data?.languages?.length > 0 &&
                <View style={styles.viewLan}>
                    <Man />
                    {data?.languages?.map((item, index) => {
                        return (
                            <Text key={index} style={styles.textDs}>
                                {item?.language}{index < data?.languages?.length - 1 ? ',' : ''}
                            </Text>
                        );
                    })}


                </View>}

                {DOB !== null &&
                    <View style={styles.subView}>
                        <BlueCalendar width={15} height={15} />
                        <Text style={styles.textDs}>{DOB}</Text>
                    </View>}


                <View style={[styles.subView, { left: -3 }]}>
                    <BlueGender width={22} height={22} />
                    <Text style={styles.textDs}>{data?.gender == '0' ? 'Male' : 'Female'}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardAbout: {
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.90,
        borderRadius: GlobalSize(15),
        padding: GlobalSize(15),
        paddingBottom: GlobalSize(12)
    },
    textAbout: {
        fontSize: fontSize(16),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR7
    },
    textDs: {
        fontSize: fontSize(14),
        color: TEXTCOLORW,
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(10)
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTHEIGHT * 0.02,
        marginRight: GlobalSize(5),
        alignItems: 'center'
    },
    subView: {
        flexDirection: 'row',
        marginBottom: DEFAULTHEIGHT * 0.02,
        alignItems: 'center',
    },
    viewLan: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(15)
    }
})