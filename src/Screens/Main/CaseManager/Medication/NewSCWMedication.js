import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORNEW1, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { Dropdown } from 'react-native-element-dropdown';

const NewSCWMedication = () => {

    const [MedName, setMedName] = useState(null)
    const [Dosage, setDosage] = useState(null)
    const [BeginTalk, setBeginTalk] = useState(null)
    const [Schedule, setSchedule] = useState(null)
    const [Duration, setDuration] = useState(null)
    const [DosageData, setDosageData] = useState(
        [
            { label: '2 Pill', value: '2 Pill' },
            { label: '1 Pill', value: '1 Pill' },

        ]
    )

    const [DurationData, setDurationData] = useState(
        [
            { label: '1 Month', value: '2 Month' },
            { label: '2 Month', value: '1 Month' },

        ]
    )

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Medication'} />
            </View>

            <View style={{ padding: GlobalSize(20) }}>
                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={styles.textTitle}>Medicine</Text>

                    <TextInput
                        value={MedName}
                        onChangeText={(text) => setMedName(text)}
                        style={styles.textInput} />
                </View>

                <View>
                    <Text style={styles.textTitle}>Dosage</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={DosageData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={Dosage}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setDosage(item.value)
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.textTitle}>Begin talking</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={DosageData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={BeginTalk}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setBeginTalk(item.value)
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.textTitle}>Schedule</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={DosageData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={Schedule}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setSchedule(item.value)
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.textTitle}>Duration</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={DurationData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={Duration}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setDuration(item.value)
                        }}
                    />
                </View>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Add medication</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NewSCWMedication

const styles = StyleSheet.create({
    textTitle: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15)
    },
    textInput: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        borderWidth: 1,
        borderColor: BORDERCOLORNEW1,
        width: DEFAULTWIDTH * 0.88,
        borderRadius: GlobalSize(5),
        marginTop: GlobalSize(8),
        paddingLeft: GlobalSize(15)
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
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.88,
        color: TEXTCOLOR10,
    },
    textIn: {
        height: GlobalSize(50),
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.88,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        marginBottom: GlobalSize(10),
        marginTop: GlobalSize(10)
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
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(20)
    },
})