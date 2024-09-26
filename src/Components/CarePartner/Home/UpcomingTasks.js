import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts'
import { BACKGROUNDCOLORT1, BACKGROUNDCOLORT2, BORDERCOLORT1, BORDERCOLORT2, FOURTHCOLOR, PRIMARYCOLOR, TEXTCOLOR5, TEXTCOLOR7, TEXTCOLOR8 } from '../../../Constants/Colors/Colors'
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'

const UpcomingTasks = () => {

    const UpcomingTask = [ //DUMMY DATA
        { 
            id: 1,
            Time: '03:00 PM',
            Title: 'Physio Therapy',
            Description: 'Patient should do 3 sets of hand folding exercise.',
            borderColor: BORDERCOLORT1,
            backgroundColor: BACKGROUNDCOLORT1
        },
        {
            id: 2,
            Time: '04:00 PM',
            Title: 'Diet Food ',
            Description: 'As patient is diabetic, patient should take small amount of proteins food intake.',
            borderColor: BORDERCOLORT2,
            backgroundColor: BACKGROUNDCOLORT2
        }
    ]


    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', margin: 10 }}>

                <View style={styles.viewTime}>
                    <Text style={styles.textTime}>{item.Time}</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.lineBorder} />
                </View>
                <View style={[styles.cardTask, { borderColor: item.borderColor, backgroundColor: item.backgroundColor }]}>
                    <Text style={styles.textTitle}>{item.Title}</Text>
                    <Text style={styles.textDesc}>{item.Description}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{ marginBottom: 10 }}>
            <View style={{ marginLeft: DEFAULTWIDTH * 0.045 }}>
                <Text style={styles.textTask}>Upcoming Tasks</Text>
            </View>
            <View>
                <FlatList
                    data={UpcomingTask}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>

        </View>
    )
}

export default UpcomingTasks

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
        borderWidth: 1,
        width: DEFAULTWIDTH * 0.65,
        borderRadius: 10,
        padding: 15,
    },
    lineBorder: {
        height: DEFAULTHEIGHT * 0.13,
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