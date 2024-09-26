import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

//IMPORT CONSTANTS
import { FOURTHCOLOR,TEXTCOLOR5, TEXTCOLOR8, TEXTCOLOR7, BACKGROUNDCOLORMEDS, PRIMARYCOLOR } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';

const UpcomingMeds = () => {

    const UpcomingMedsData = [ //DUMMY DATA
        {
            id: 1,
            Time: '09:00 AM',
            medications: [
                {
                    id: 1,
                    Title: 'Galantamine Tablet',
                    Desc: '100mg - Once a day - After meals'
                },
                {
                    id: 2,
                    Title: 'Epinephrine Tablet',
                    Desc: '50mg - Once a day - After meals'
                }
            ]
        }
    ];

    const renderItem = ({ item }) => {

        return (
            <View style={{ flexDirection: 'row', margin: 10 }}>

                <View style={styles.viewTime}>
                    <Text style={styles.textTime}>{item.Time}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.lineBorder} />
                </View>
                <View style={{ flexDirection: 'column' }}>
                    {item.medications.map((medication) => (

                        <View style={styles.cardTask} key={medication.id}>
                            <Text style={styles.textTitle}>{medication.Title}</Text>
                            <Text style={styles.textDesc}>{medication.Desc}</Text>
                        </View>

                    ))}
                </View>
            </View>
        )
    }


    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ marginLeft: DEFAULTWIDTH * 0.045 }}>
                <Text style={styles.textTask}>Upcoming Meds</Text>
            </View>
            <View>
                <FlatList
                    data={UpcomingMedsData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
        </View>
    )
}

export default UpcomingMeds


const styles = StyleSheet.create({
    textTask: {
        fontSize: 14,
        fontFamily: FONTS.FontSemiB,
        color: TEXTCOLOR7
    },
    textTime: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR8
    },
    cardTask: {
        width: DEFAULTWIDTH * 0.65,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        backgroundColor: BACKGROUNDCOLORMEDS
    },
    lineBorder: {
        height: DEFAULTHEIGHT * 0.20,
        width: 1,
        backgroundColor: FOURTHCOLOR,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        color: PRIMARYCOLOR,
        fontSize: 14,
        fontFamily: FONTS.FontSemiB
    },
    textDesc: {
        fontSize: 12,
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontRegular
    },
    viewTime: {
        paddingTop: 10,
        marginLeft: DEFAULTWIDTH * 0.02,
        paddingRight: 10
    }
})