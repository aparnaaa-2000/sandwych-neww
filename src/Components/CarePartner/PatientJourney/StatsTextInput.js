import React from 'react'
import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity, FlatList } from 'react-native'

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLORW, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLORW, SECONDARYCOLOR, TEXTCOLOR10 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts';
import { Man } from '../../../../assets';
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT PACKAGES
import moment from 'moment/moment';

const StatsTextInput = ({
    value,
    onChangeText,
    placeholder,
    Data,
    Unit,
    selectUnit,
    setSelectUnit,
    UnitData,
    SelectUnit }) => {

    const renderItem = ({ item }) => {
        return (
            <View key={item.id}
                style={[
                    styles.viewMap,
                    Platform.OS == 'android'
                        ? DEFAULTSTYLES.androidShadow
                        : DEFAULTSTYLES.iosShadow,
                ]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: GlobalSize(10) }}>
                        <Man />
                    </View>

                    <View>
                        <Text style={styles.textWt}>{item.count}</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.textWt}>{moment(item.created_at).format('DD/MM/YYYY')}</Text>
                </View>
            </View>
        )
    }
    return (

        <>
            <View style={styles.viewWeight}>

                <View>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={SECONDARYCOLOR}
                        style={[styles.textInput, { width: DEFAULTWIDTH * 0.4 }]}
                        value={value}
                        maxLength={6}
                        keyboardType='number-pad'
                        onChangeText={onChangeText} />
                </View>


                <View style={styles.rowFlex}>
                    {UnitData?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={[styles.unitView, {
                                    backgroundColor:
                                        selectUnit == item.id ?
                                            PRIMARYCOLOR :
                                            PUREWHITE
                                }]}
                                onPress={() => selectUnit !== item.id ? SelectUnit(item.unit, item.id) : console.log("helo")}>
                                <Text style={[styles.textUnit, { color: selectUnit == item.id ? PUREWHITE : TEXTCOLOR10 }]}>{item.unit}</Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>

            </View>
            <View style={DEFAULTSTYLES.alignView}>
                <FlatList
                    data={Data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem} />
            </View>

        </>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
    },
    textWeight: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB,
        paddingRight: GlobalSize(20)
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH * 0.05,
        marginBottom: DEFAULTHEIGHT * 0.02
    },
    textInput: {
        fontSize: fontSize(14),
        color: SECONDARYCOLOR,
        fontFamily: FONTS.FontMedium
    },
    viewWeight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BORDERCOLORW,
        margin: GlobalSize(20),
        alignItems: 'center',
        width: width(310),
        paddingLeft: GlobalSize(10),
        paddingRight: GlobalSize(10),
        height: height(45)
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(12),
        color: PRIMARYCOLOR,
        fontWeight: '700'
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        bottom: GlobalSize(10)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    textWt: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORW
    },
    viewMap: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.90,
        padding: GlobalSize(15),
        margin: GlobalSize(10),
        borderRadius: GlobalSize(15),
    },
    textUnit: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(12),
        color: TEXTCOLOR10
    },
    unitView: {
        width: GlobalSize(50),
        height: GlobalSize(43),
        //borderWidth: 1,
        // borderColor: BORDERCOLOR1,
        marginRight: GlobalSize(0),
        marginLeft: GlobalSize(0),
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowFlex: {
        flexDirection: 'row',
        marginLeft: GlobalSize(59),
        alignItems: 'center'
    }
})

export default StatsTextInput;