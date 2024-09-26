
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { 
    BORDERCOLORTASK,
     FIFTHCOLOR,
      FOURTHCOLOR,
       PLACEHOLDERCOLOR3,
        PRIMARYCOLOR,
         PUREBLACK, 
         PUREWHITE,
          TEXTCOLOR10,
           TEXTCOLORTASK } from '../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../Constants/Fonts';
import { BlackMenuSW, ClockLine } from '../../../../assets';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';

const TodayTask = () => {

    const [weekDates, setWeekDates] = useState([]);
    const [date, setDate] = useState(new Date());

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // const month = date.getMonth() + 1;
    const month = monthList[date.getMonth()];
    const year = date.getFullYear();

    useEffect(() => {
        const getWeekDates = () => {
            const today = new Date();
            const day = today.getDay();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - day + (day === 0 ? -6 : 1)); // 0 for Sunday
            const endOfWeek = new Date(today);
            endOfWeek.setDate(startOfWeek.getDate() + 6);

            const dates = [];
            for (let i = 0; i <= 6; i++) {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(startOfWeek.getDate() + i);
                dates.push(currentDate);
            }

            return dates;
        };

        const weekDatesArray = getWeekDates();
        setWeekDates(weekDatesArray);
    }, []);

    return (
        <View style={{ padding: GlobalSize(20),paddingBottom:0 }} >
            <View style={styles.row}>
                <View>
                    <Text style={styles.today}>Today's Task</Text>
                </View>

                <View>
                    <BlackMenuSW />
                </View>
            </View>

            <View style={styles.card}>
                <View style={{ marginLeft: GlobalSize(6) }}>
                    <Text style={styles.today}>{month}, {year}</Text>
                </View>

                <View style={styles.weekView}>
                    {weekDates.map((dateItem, index) => (
                        <View key={index} style={[styles.dateContainer, dateItem.getDate() === date.getDate() ? styles.highlightedDateContainer : null]}>

                            <Text style={[styles.dateText, { marginBottom: GlobalSize(10), color: dateItem.getDate() === date.getDate() ? PUREWHITE : TEXTCOLORTASK }]}>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateItem.getDay()]}</Text>
                            <Text style={[styles.dateText, { color: dateItem.getDate() === date.getDate() ? PUREWHITE : TEXTCOLORTASK }]}>{moment(dateItem).format('DD')}</Text>
                        </View>
                    ))}
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row',alignItems:'center'}}>
                    <View style={styles.dotComplete}>
                        <View style={styles.dotWhite} />
                    </View>

                    <View style={{marginRight:GlobalSize(20)}}>
                        <Text style={styles.textMed}>Morning Medication</Text>

                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={[styles.textTime, { marginRight: GlobalSize(7) }]}>Daily - (2) 100mg</Text>
                            <ClockLine />
                            <Text style={[styles.textTime, { marginLeft: GlobalSize(2) }]}>9:00 am</Text>
                        </View>
                    </View>

                    <View style={styles.btn}>
                        <Text style={styles.textBtn}>Done</Text>
                    </View>
                </View>

                <View style={{ marginLeft: GlobalSize(11), top: GlobalSize(-7) }}>
                    <View style={styles.lineBorder} />
                </View>

                <View style={{ flexDirection: 'row',top:GlobalSize(-14),alignItems:'center',justifyContent:'space-between' }}>
                    <View>
                        <View style={styles.dotIncome} />
                    </View>


                    <View>
                        <Text style={styles.textMed}>Morning Medication</Text>

                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={[styles.textTime, { marginRight: GlobalSize(7) }]}>Daily - (2) 100mg</Text>
                            <ClockLine />
                            <Text style={[styles.textTime, { marginLeft: GlobalSize(2) }]}>9:00 am</Text>
                        </View>
                    </View>

                    <View style={[styles.btn,{backgroundColor:FIFTHCOLOR}]}>
                        <Text style={styles.textBtn}>Upcoming</Text>
                    </View>

                </View>

                <View style={{ marginLeft: GlobalSize(11), top: GlobalSize(-21) }}>
                    <View style={styles.lineBorder} />
                </View>

                <View style={{ flexDirection: 'row',top:GlobalSize(-28),alignItems:'center',justifyContent:'space-between'}}>
                    <View>
                        <View style={styles.dotIncome} />
                    </View>


                    <View>
                        <Text style={styles.textMed}>Morning Medication</Text>

                        <View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <Text style={[styles.textTime, { marginRight: GlobalSize(7) }]}>Daily - (2) 100mg</Text>
                            <ClockLine />
                            <Text style={[styles.textTime, { marginLeft: GlobalSize(2) }]}>9:00 am</Text>
                        </View>
                    </View>

                    <View style={[styles.btn,{backgroundColor:FIFTHCOLOR}]}>
                        <Text style={styles.textBtn}>Upcoming</Text>
                    </View>

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: GlobalSize(20),
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLORTASK,
        padding: GlobalSize(6),
        paddingBottom: GlobalSize(12),
        marginBottom:GlobalSize(20)
    },
    dateContainer: {
        alignItems: 'center',
    },
    highlightedDateContainer: {
        backgroundColor: PRIMARYCOLOR,
        width: GlobalSize(45),
        padding: GlobalSize(7),
        borderRadius: GlobalSize(8)
    },
    dateText: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLORTASK
    },
    today: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB
    },
    weekView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: GlobalSize(15)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dotComplete: {
        backgroundColor: PRIMARYCOLOR,
        width: GlobalSize(24),
        height: GlobalSize(24),
        borderRadius: GlobalSize(12),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: GlobalSize(10)
    },
    dotWhite: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(8),
        height: GlobalSize(8),
        borderRadius: GlobalSize(4)
    },
    textMed: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: PRIMARYCOLOR
    },
    textTime: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12)
    },
    lineBorder: {
        height: GlobalSize(50),
        width: GlobalSize(1),
        backgroundColor: PLACEHOLDERCOLOR3
    },
    dotIncome: {
        width: GlobalSize(24),
        height: GlobalSize(24),
        borderRadius: GlobalSize(12),
        borderColor: PLACEHOLDERCOLOR3,
        borderWidth: 1,
    },
    textBtn:{
        fontFamily:FONTS.FontMedium,
        color:PUREWHITE,
        fontSize:fontSize(14)
    },
    btn:{
        backgroundColor:FOURTHCOLOR,
       // width:DEFAULTWIDTH*0.3,
       // height:DEFAULTHEIGHT*0.05,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:GlobalSize(20),
        padding:GlobalSize(4),
        paddingLeft:GlobalSize(15),
        paddingRight:GlobalSize(15)
    }
});

export default TodayTask;
