import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5, TEXTCOLOR7, TEXTCOLOR10 } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH, DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { Dropdown } from 'react-native-element-dropdown';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const HealthSafety = ({
    HealthValue,
    setHealthValue,
    scaleValue,
    setScaleValue,
    WorkValue,
    setWorkValue,
    Heading,
    HealthOptions,
    ScaleOption,
    QuestionFilter,
    OptionFilter }) => {

    const newArray = OptionFilter.map(item => ({ //FUNCTION FOR FILTER THE OPTIONS
        id: item?.id,
        Title: item?.option,
        isSelected: false
    }));

    const [Options, setOptions] = useState(newArray)
    const [Work, setWork] = useState(HealthOptions)
    const [scale,setScale] = useState(ScaleOption)

    const onPress = option => {
        setHealthValue(option)
    }

   
    return (
        <View>
            <View style={DEFAULTSTYLES.alignView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={imageSource} />
                </View>
            </View>
            <View style={styles.descView}>
                <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>{QuestionFilter[Heading]?.question}</Text>
            </View>

            <View>
                {Heading == 0 ?
                    <View style={{ marginLeft: GlobalSize(10) }}>
                        <FlatList
                            data={Options}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ marginLeft: GlobalSize(10) }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity
                                                style={styles.radioButton}
                                                onPress={() => onPress(item.id)}>
                                                <View
                                                    style={[
                                                        styles.radioIcon, HealthValue == item.id ?
                                                            styles.radioIconSelected :
                                                            null,
                                                    ]}>
                                                    {HealthValue == item.id ? (
                                                        <View style={styles.radioBorder} />
                                                    ) :
                                                        null}
                                                </View>
                                            </TouchableOpacity>

                                            <View style={{ marginTop: 7, maxWidth: DEFAULTWIDTH * 0.8 }}>
                                                <Text style={styles.textDesc}>{item.Title}</Text>
                                            </View>

                                        </View>


                                    </View>
                                );
                            }}
                        />

                    </View> :
                    Heading == 1 ?
                    <View style={DEFAULTSTYLES.alignView}>
                    <Dropdown
                        style={styles.dropDnContainer}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={scale}
                        search={false}
                        showsVerticalScrollIndicator={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        dropdownPosition='top'
                        value={scaleValue}
                        onChange={item => {
                            setScaleValue(item.value)
                        }}
                    />
                </View> :
                        Heading == 2 ?

                        <View style={DEFAULTSTYLES.alignView}>
                                <Dropdown
                                    style={styles.dropDnContainer}
                                    placeholderStyle={styles.placeholderS}
                                    itemTextStyle={styles.textArea}
                                    selectedTextStyle={styles.textArea}
                                    containerStyle={styles.dropView}
                                    data={Work}
                                    search={false}
                                    showsVerticalScrollIndicator={false}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={'Select'}
                                    dropdownPosition='top'
                                    value={WorkValue}
                                    onChange={item => {
                                        setWorkValue(item.value)
                                    }}
                                />
                            </View> : null}

            </View>
        </View>
    )
}

export default HealthSafety

const styles = StyleSheet.create({
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE,
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputWrite: {
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        paddingLeft: GlobalSize(15),
        alignItems: 'center'
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR,
    },
    imageStyle: {
        width: DEFAULTWIDTH * 0.9,
        height: DEFAULTWIDTH * 0.82,
        //marginBottom: '4%',
    },
    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(10),
    },
    textInView: {
        width: DEFAULTWIDTH * 0.89,
        height: DEFAULTWIDTH * 0.13,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        borderWidth: 1,
        marginBottom: GlobalSize(15),
        justifyContent: 'center'
    },
    imageView: {
        alignItems: 'center',
        width: DEFAULTWIDTH * 0.9,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(10),
        elevation: 2,
        marginBottom: GlobalSize(15),
    },
    textDesc: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        maxWidth: DEFAULTWIDTH * 0.9,
        lineHeight: GlobalSize(20)
    },
    descView: {
        marginLeft: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginBottom: DEFAULTHEIGHT * 0.01
    },
        dropDnContainer: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.89,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        height:GlobalSize(45)
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1,
    },
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.9,
        padding: GlobalSize(5),
    },
})