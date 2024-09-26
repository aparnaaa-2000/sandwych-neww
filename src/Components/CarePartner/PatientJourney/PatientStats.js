// 

import { FlatList, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { PUREWHITE, TEXTCOLOR7, TEXTCOLORW } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { OrangePen } from '../../../../assets';

export default function PatientStats({ navigation, stats }) {


    const StatsData = [
        { id: 1, Title: 'Height', Value: '176 centimetre', navigation: 'EditHeight' },
        { id: 2, Title: 'Weight', Value: '80 Kilograms', navigation: 'EditWeight' },
        { id: 3, Title: 'Body Temperature', Value: '36 deg cel', navigation: 'EditTemperature' },
        { id: 4, Title: 'Blood Pressure', Value: '125 / 80 mm Hg', navigation: 'EditBloodPressure' },
        { id: 5, Title: 'Blood Glucose', Value: '90 mg/dl', navigation: 'EditGlucose' },
        { id: 6, Title: 'Blood Group', Value: 'O +ve', navigation: null }
    ];
 
    const filteredData = { //FILTER THE STATS
        Height: stats?.filter(item => item?.stats_type === "0"),
        Weight: stats?.filter(item => item?.stats_type === "1"),
        'Body Temperature': stats?.filter(item => item?.stats_type === "2"),
        'Blood Pressure': stats?.filter(item => item?.stats_type === "3"),
        'Blood Glucose': stats?.filter(item => item?.stats_type === "4")
    };

    const renderFilteredData = (title, navigateTo) => {
        const data = filteredData[title];
        if (data?.length > 0) {
            return data.map((entry, index) => (
                <Text key={index} style={styles.textValue}>{entry.count}</Text>
            ));
        } else {
            return navigateTo ? (
                <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
                    <OrangePen />
                </TouchableOpacity>
            ) : null;
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => item?.navigation ? navigation.navigate(item?.navigation) : null}
            style={[
                styles.cardView,
                Platform.OS === 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow
            ]}
        >
            <Text style={styles.textTitle}>{item.Title}</Text>
            {renderFilteredData(item.Title, item.navigation)}
        </TouchableOpacity>
    );

    return (
        <View style={styles.viewAlign}>
            <FlatList
                data={StatsData}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    cardView: {
        width: DEFAULTWIDTH * 0.43,
        padding: GlobalSize(15),
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(15),
        margin: GlobalSize(7),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: fontSize(13),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR7,
        paddingBottom: GlobalSize(10)
    },
    textValue: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLORW
    },
    viewAlign: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});
