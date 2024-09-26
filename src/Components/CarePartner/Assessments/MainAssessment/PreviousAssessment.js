import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

//IMPORT CONSTANTS
import { FONTS } from '../../../../Constants/Fonts'
import { BORDERCOLOR9, LINECOLOR1, PRIMARYCOLOR, PUREBLACK, TEXTCOLOR10, TEXTCOLOR15 } from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'

const PreviousAssessment = ({ data }) => {

    return (
        <View style={{ marginBottom: GlobalSize(15) }}>
                 {/* <View style={styles.lineBorder} /> */}
            {data?.length >= 1 &&
                <View style={styles.prevView}>
                    <Text style={styles.textAssess}>Previous Assessment</Text>
                </View>}

            {data?.map((item) => {

                return (

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.cardView}>

                            
                        <View style={{marginBottom:GlobalSize(10)}}>
                                <Text style={styles.textStart}>Title:</Text>
                                <Text style={[styles.textInit, { fontSize: fontSize(15) }]}>{item?.task_details?.task_name}</Text>
                            </View>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{marginBottom:GlobalSize(6)}}>
                                <Text style={styles.textStart}>No. of Assessment:</Text>
                                <Text style={[styles.textInit, { fontSize: fontSize(15) }]}>{data?.[0]?.assessment_titles?.length}</Text>
                            </View>

                            <View style={{ marginBottom: GlobalSize(10) }}>
                                <Text style={styles.textStart}>Completed by:</Text>
                                <Text style={[styles.textInit, { fontSize: fontSize(15) }]}>{item?.completedBy?.name}</Text>
                            </View>
                            </View>
                            <View style={styles.viewRow}>
                                <View>
                                    <Text style={styles.textStart}>Start Date:</Text>
                                    <Text style={[styles.textStart, { color: TEXTCOLOR10 }]}>{item?.task_details?.start_date}</Text>
                                </View>

                                <View>
                                    <Text style={styles.textStart}>End Date:</Text>
                                    <Text style={[styles.textStart, { color: TEXTCOLOR10 }]}>{item?.task_details?.complete_date}</Text>
                                </View>
                            </View>


                        </View>
                    </View>
                )
            })}

        </View>
    )
}

export default PreviousAssessment

const styles = StyleSheet.create({
    textAssess: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(22)
    },
    textStart: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR15,
        fontSize: fontSize(13)
    },
    textInit: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: fontSize(22)
    },
    cardView: {
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR9,
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(15),
        marginBottom: GlobalSize(10),

    },
    viewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(6)
    },
    prevView: {
        marginLeft: GlobalSize(20),
        marginBottom: GlobalSize(10)
    },
    lineBorder: {
        backgroundColor: LINECOLOR1,
        height: GlobalSize(1),
        margin: DEFAULTWIDTH * 0.06,
        marginBottom: 12,
      },
})