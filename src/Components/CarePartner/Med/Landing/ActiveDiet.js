import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalSize, fontSize, width } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { BlueSts } from '../../../../../assets'

const ActiveDiet = ({ activeDietPlans }) => {

    const renderItemActive = ({ item, index }) => {
        return (
            <View
                style={[styles.card, DEFAULTSTYLES.iosShadow,
                { marginRight: activeDietPlans?.length - 1 === index ? GlobalSize(20) : 0 }]}>

                <View>
                    <View style={{ marginBottom: GlobalSize(15) }}>
                        <Text style={styles.textDiet}>General Diet Plan</Text>
                    </View>

                    <View style={styles.mainRow}>
                        <View style={{ flexDirection: 'row' }}>
                            <BlueSts />
                            <Text style={[styles.textDiet, { marginLeft: GlobalSize(5), fontSize: fontSize(12) }]}>{item?.doctor_name}</Text>
                        </View>
                        <Text style={[styles.textDiet, { fontSize: fontSize(12) }]}>{item.date}</Text>
                    </View>

                    <View style={styles.rowFlex}>
                        <Text style={styles.textHead}>Food to Omit :</Text>

                        <View>
                        {item?.food_to_omit && (
                            <Text style={[styles.textHead, { fontFamily: FONTS.FontSemiB}]}>
                                {item?.food_to_omit.map((food) => food?.food_name).join(', ')}
                            </Text>
                        )}
                        </View>
                    </View>


                    <View style={styles.rowFlex}>
                        <Text style={styles.textHead}>Food to Substitute :</Text>
            
                        <View>
                            {item?.food_to_substitute && (
                                <Text style={[styles.textHead, { fontFamily: FONTS.FontSemiB }]}>
                                    {Object.values(item?.food_to_substitute).map(food => food?.food_name).join(', ')}
                                </Text>
                            )}
                        </View>

                    </View>

{/* 
                    <View style={styles.rowFlex}>
                        <Text style={styles.textHead}>Texture</Text>
                        <Text style={[styles.textHead, { fontFamily: FONTS.FontSemiB }]}>{item.Texture}</Text>
                    </View> */}

                    <View style={styles.rowFlex}>
                        <Text style={styles.textHead}>Additional advice</Text>
                        <Text style={[styles.textHead, { fontFamily: FONTS.FontSemiB }]}>{item?.additional_advise}</Text>
                    </View>

                </View>
            </View>
        )
    }

    return (
        <View>
            {activeDietPlans?.length > 0 &&
            <View style={{ marginLeft: GlobalSize(10), marginBottom: GlobalSize(10) }}>
                <Text style={styles.textRD}>Active Diet Plan</Text>
            </View>}

            <View style={DEFAULTSTYLES.alignView}>
                <FlatList
                    data={activeDietPlans}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItemActive} />
            </View>
        </View>
    )
}

export default ActiveDiet;

const styles = StyleSheet.create({
    card: {
        width: DEFAULTWIDTH * 0.89,
        backgroundColor: PUREWHITE,
        elevation: 2,
        borderRadius: GlobalSize(10),
        // margin: GlobalSize(1),
        padding: GlobalSize(20),
        marginHorizontal: 10,
        paddingBottom: GlobalSize(10),
        paddingTop: GlobalSize(15),
        marginBottom: GlobalSize(15)
    },
    textDiet: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: fontSize(18)
    },
    textHead: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        // textAlign:'center',
        //marginRight: GlobalSize(10)
    },
    cardSub: {
        alignItems: 'center',
        width: GlobalSize(95),
        padding: GlobalSize(10),
        elevation: 5,
        borderRadius: GlobalSize(10),
        backgroundColor: PUREWHITE
    },
    lineBorder: {
        width: GlobalSize(250),
        height: GlobalSize(1),
        backgroundColor: BORDERCOLOR4,
        marginVertical: GlobalSize(10)
    },
    textRD: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15),
        color: TEXTCOLOR7
    },
    rowFlex: {
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    mainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(15)
    }
})