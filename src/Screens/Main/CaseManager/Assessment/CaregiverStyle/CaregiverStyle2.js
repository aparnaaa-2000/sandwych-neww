import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLORLINE, PUREBLACK, TEXTCOLOR10, TEXTCOLOR5, TEXTCOLOR7 } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../../Constants/Fonts'
import { Data } from '../../../../../Constants/Texts/Assessments/ReasonForCaregiving/CheckBox';
import { Check, Uncheck } from '../../../../../../assets'

const CaregivingStyle2 = () => {

    const [data, setData] = useState(Data)
    const [Checked, setChecked] = useState([])

    const handleCheckBoxPress = (item) => { //To check and uncheck the checkBox
        const updatedData = data.map((dataItem) => {
            if (dataItem.id === item.id) {
                return { ...dataItem, isSelected: !dataItem.isSelected };
            }
            return dataItem;
        });
        setData(updatedData);
        const FilterData = updatedData.filter((item) => item.isSelected == true)

        setChecked(FilterData)
    };

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ padding: GlobalSize(20),paddingTop:GlobalSize(5) }}>

                <View>
                    <Text style={styles.textTitle}>Caregiving Style</Text>
                </View>

                <View>
                    <Text style={styles.textSub}>Check the factors influenced your decision to care for your [Care recipient]? Please check all that apply</Text>
                </View>
            </View>

            <ScrollView>
                <View style={{ flex: 1, marginBottom: DEFAULTWIDTH * 0.22 }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {

                            return (
                                <View style={styles.checkView}>
                                    {item?.isSelected ?
                                        <TouchableOpacity onPress={() => handleCheckBoxPress(item)} style={{ padding: 5 }}>
                                            <Check style={{ marginTop: 4 }} />
                                        </TouchableOpacity> :

                                        <TouchableOpacity onPress={() => handleCheckBoxPress(item)} style={{ padding: 5 }}>
                                            <Uncheck style={{ marginTop: 4 }} />
                                        </TouchableOpacity>}

                                    <View style={{ marginLeft: DEFAULTWIDTH * 0.03,marginRight:GlobalSize(45) }}>
                                        <Text style={styles.checkBoxText}>{item.Title} </Text>
                                    
                                    </View>
                                </View>
                            )
                        }} />
                </View>
            </ScrollView>

            <View style={styles.rowBtn}>

                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Back</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Save & Exit</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.touchBtn}>
                    <Text style={styles.textnx}>Next</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default CaregivingStyle2

const styles = StyleSheet.create({
    textnx: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14)
    },
    touchBtn: {
        borderWidth: 1,
        borderColor: BORDERCOLORLINE,
        borderRadius: GlobalSize(5),
        width: DEFAULTWIDTH * 0.27,
        padding: GlobalSize(8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: GlobalSize(20),
        marginRight: GlobalSize(20),
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(20),
        backgroundColor: BACKGROUNDWHITE,
        paddingTop: GlobalSize(20)
    },
    textTitle: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(24),
        color: TEXTCOLOR10,
        marginBottom:GlobalSize(5)
    },
    textSub: {
        color: TEXTCOLOR10,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontMedium
    },
    exampleTextStyle: {
        color: TEXTCOLOR5,
        fontFamily: 'Inter-Regular',
        fontSize: fontSize(14),
    },
    checkBoxText: {
        color: TEXTCOLOR7,
        fontFamily: 'Inter-Medium',
        fontSize: fontSize(14),
    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: DEFAULTWIDTH * 0.022,
        marginLeft: DEFAULTWIDTH * 0.05
    },
})