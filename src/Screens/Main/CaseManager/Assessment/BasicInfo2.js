import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLORLINE, BOTTOMTABTEXT1, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BlackCalender } from '../../../../../assets'

const BasicInfo2 = () => {
    const [DOB, setDOB] = useState(null)
    const [LangValue, setLangValue] = useState(null)
    const [RaceValue, setRaceValue] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Language, setLanguage] = useState(
        [
            { label: 'English', value: 'English' },
            { label: 'German', value: 'German' }
        ]
    )

    const showDatePicker = ()=>{
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const ConvertDate = moment(date).format('DD/MM/YYYY')
        console.warn("A date has been picked: ", ConvertDate);
        setDOB(ConvertDate)
        hideDatePicker();
    };

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ padding: GlobalSize(20) }}>

                <View style={{ marginBottom: GlobalSize(20) }}>
                    <Text style={styles.textHeader}>Basic Information</Text>
                </View>

                <View>
                    <Text style={styles.textTitle}>Date of birth</Text>

                    <View style={styles.dobView}>
                        <TextInput
                            value={DOB}
                            style={styles.dobValue}
                            onChangeText={(text) => setDOB(text)} />

                        <View>
                            <TouchableOpacity onPress={() => showDatePicker()}>
                                <BlackCalender />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View>
                    <Text style={styles.textTitle}>Preferred Language</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={Language}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={LangValue}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setLangValue(item.value)
                        }}
                    />

                </View>


                <View>
                    <Text style={styles.textTitle}>Race</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={Language}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={RaceValue}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setRaceValue(item.value)
                        }}
                    />
                </View>

            </View>

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

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </SafeAreaView>
    )
}

export default BasicInfo2

const styles = StyleSheet.create({
    textHeader: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(24)
    },
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
        color: TEXTCOLOR7,
        fontSize: fontSize(14)
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
        borderRadius: 4,
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.88,
        color: TEXTCOLOR10,
    },
    dobValue:{
        color:PUREBLACK,
        fontFamily:FONTS.FontRegular,
        fontSize:fontSize(12)
    },
    textIn: {
        height: GlobalSize(50),
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.88,
        borderWidth: 1,
        borderRadius: GlobalSize(6),
        backgroundColor: PUREWHITE,
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        marginBottom: GlobalSize(15),
        marginTop: GlobalSize(10),
    },
    dobView: {
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.88,
        backgroundColor: PUREWHITE,
        paddingLeft: GlobalSize(10),
        height: GlobalSize(50),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingRight:GlobalSize(15),
        marginBottom: GlobalSize(15),
        marginTop: GlobalSize(10),
    }
})