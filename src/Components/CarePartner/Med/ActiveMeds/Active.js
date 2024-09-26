import React from 'react';
import { Text, View, FlatList, Dimensions, StyleSheet, Platform } from 'react-native';
import { BACKGROUNDWHITE, PUREBLACK, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { SettingsDot, Tablet } from '../../../../../assets';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';


const Active = () => {
    //dummy data

    const MedicineData = [
        {
            id: 1,
            name: 'Losartan',
            Time: 'Reminder:11:00 am'
        },
        {
            id: 2,
            name: 'Amiodarone',
            Time: 'Reminder:11:00 am'
        },
        {
            id: 3,
            name: 'Warfarin',
            Time: 'Reminder:11:00 am'
        },
        {
            id: 4,
            name: 'Aspirin',
            Time: 'Reminder:11:00 am'
        },
        {
            id: 5,
            name: 'Bisoprolol',
            Time: 'Reminder:11:00 am'
        },
        {
            id: 6,
            name: 'Amlodipine',
            Time: 'Reminder:11:00 am'
        },
    ]

    const renderItem = (({ item }) => {
        return (
            <View style={{flex:1}}>
            <View style={[styles.viewMain,
            Platform.OS == "android" ? DEFAULTSTYLES.androidShadow :DEFAULTSTYLES.iosShadow]}>
                <View style={styles.viewTAB}>
                    <Tablet />

                    <View style={DEFAULTSTYLES.marginLeft}>
                        <Text style={styles.textName}>{item.name}</Text>
                        <Text style={styles.textTime}>{item.Time}</Text>
                    </View>
                </View>
                <View style={{ marginRight: DEFAULTWIDTH * 0.04 }}>
                    <SettingsDot />
                </View>
            </View>
            </View>
        )
    })

    return (
        <View style={styles.viewFlat}>
            <FlatList
                data={MedicineData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={renderItem} />
        </View>
    )
};

const styles = StyleSheet.create({
    viewMain: {
        width: DEFAULTWIDTH * 0.92,
        backgroundColor: PUREWHITE,
        elevation: 2,
        borderRadius: 8,
        margin: 7,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: DEFAULTWIDTH * 0.03,
        paddingBottom: DEFAULTWIDTH * 0.03,
    },
    textName: {
        fontSize: 14,
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR7
    },
    textTime: {
        color: TEXTCOLOR5,
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400'
    },
    viewTAB: {
        marginLeft: DEFAULTWIDTH * 0.05,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewFlat: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor:BACKGROUNDWHITE
    }
})
export default Active;