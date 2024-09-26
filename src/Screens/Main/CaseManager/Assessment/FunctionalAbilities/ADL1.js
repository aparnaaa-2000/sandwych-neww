import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR4, BORDERCOLORLINE, PUREBLACK, TEXTCOLOR10, TEXTCOLOR7, BOTTOMTABTEXT1, BORDERCOLOR1 } from '../../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../../Constants/Fonts'
import { Dropdown } from 'react-native-element-dropdown';

const ADL1 = () => {

    //To open ADL 1
    const [valueADL, setValueADL] = useState('');
    const [ADL, setADL] = useState([
        { label: 'No assistance needed - Care recipient is independent or does not have needs in this area', value: 'No assistance needed - Care recipient is independent or does not have needs in this area' },
        { label: 'Assistance needed', value: 'Assistance needed' },
    ]);


    //To open ADL 2
    const [valueMed, setValueMed] = useState('');
    const [Med, setMed] = useState([
        { label: 'Caregiver needs training/supportive services to provide assistance', value: 'Caregiver needs training/supportive services to provide assistance' },
        { label: 'Caregiver does not need any services', value: 'Caregiver does not need any services' },
    ]);

    //To open ADL 3
    const [valueMedT, setValueMedT] = useState('');
    const [MedT, setMedT] = useState([
        { label: 'Caregiver cannot/does not want to provide assistance', value: 'Caregiver cannot/does not want to provide assistance' },
        { label: 'Caregiver does not need any services', value: 'Caregiver does not need any services' },
    ]);

    //To open ADL 4
    const [valueSS, setValueSS] = useState('');
    const [MedSS, setMedSS] = useState([
        { label: 'Assistance needed by an agency Caregiver', value: 'Assistance needed by an agency Caregiver' },
        { label: 'Does not need any assistance', value: 'Does not need any assistance' },
    ]);


    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ padding: GlobalSize(20) }}>
                <View style={{marginBottom:GlobalSize(10)}}>
                    <Text style={styles.mainHead}>Functional abilities</Text>
                </View>
                <View>
                    <Text style={styles.subHeader}>ADLs/IADLs Assistance</Text>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={ADL}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueADL}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueADL(item.value);
                        }}
                    />
                </View>

                <View style={{ marginTop: GlobalSize(5) }} >
                    <Text style={styles.subHeader}>Medication Assistance</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={Med}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueMed}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueMed(item.value);
                        }}

                    />
                </View>

                <View style={{ marginTop: GlobalSize(5) }}>
                    <Text style={styles.subHeader}>Medical Procedure/Treatments</Text>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={MedT}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueMedT}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueMedT(item.value);
                        }}

                    />
                </View>

                <View style={{ marginTop: GlobalSize(5) }}>
                    <Text style={styles.subHeader}>Supervision and Safety</Text>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        iconStyle={styles.iconStyle}
                        data={MedSS}
                        containerStyle={styles.dropView}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        showsVerticalScrollIndicator={false}
                        value={valueSS}
                        onChange={item => {
                            setValueSS(item.value);
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
        </SafeAreaView>
    )
}

export default ADL1

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
    mainHead: {
        fontFamily: FONTS.FontSemiB,
        color: TEXTCOLOR10,
        fontSize: fontSize(24)
    },
    textTitle: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR7,
        fontSize: fontSize(14)
    },
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.885,
        padding: GlobalSize(5)
    },
    subHeader: {
        marginTop: GlobalSize(8),
        marginBottom: GlobalSize(8),
        color: TEXTCOLOR7,
        fontSize: fontSize(14),
        fontFamily: 'Inter-Medium',
    },
    placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1
    },
    textIn: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.885,
        borderWidth: 1,
        height: GlobalSize(65),
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
    },
    textArea: {
        fontSize: fontSize(13),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
})