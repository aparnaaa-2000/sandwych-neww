import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLORLINE, BOTTOMTABTEXT1, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { Dropdown } from 'react-native-element-dropdown';
import { Phone } from '../../../../../assets'

const BasicInfo1 = () => {

    const [FirstNm, setFirstNm] = useState(null)
    const [LastNm, setLastNm] = useState(null)
    const [PhoneNum, setPhoneNum] = useState(null)

    const [Usage, setUsage] = useState(null)
    const [RefCode, setRefCode] = useState(null)
    const [valueRelation, setValueRelation] = useState('');

    const [relationship, setRelationship] = useState([
        { label: 'Spouse / Partner', value: 'Spouse / Partner' },
        { label: 'Mother / Father', value: 'Mother / Father' },
        { label: 'Mother-in-law / Father-in-law ', value: 'Mother-in-law / Father-in-law' },
        { label: 'Grandparent', value: 'Grandparent' },
        { label: 'Grandparent-in-law', value: 'Grandparent-in-law' },
        { label: 'Brother / Sister', value: 'Brother / Sister' },
        { label: 'Son / Daughter', value: 'Son / Daughter' },
        { label: 'Daughter- or Son-in-Law', value: 'Daughter- or Son-in-Law' },
        { label: 'Uncle or Aunt', value: 'Uncle or Aunt' },
        { label: 'Nephew or Niece', value: 'Nephew or Niece' },
        { label: 'Foster child', value: 'Foster child' },
        { label: 'Friend', value: 'Friend' },
        { label: 'Neighbor', value: 'Neighbor' },
        { label: 'Other', value: 'Other' }
    ])

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' && 'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 :0}>


                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: GlobalSize(50) }}>
                    <View style={{ padding: GlobalSize(20) }}>

                        <View style={{ marginBottom: GlobalSize(20) }}>
                            <Text style={styles.textHeader}>Basic Information</Text>
                        </View>

                        <View style={{ marginBottom: GlobalSize(10) }}>
                            <Text style={styles.textTitle}>First Name</Text>

                            <TextInput
                                value={FirstNm}
                                onChangeText={(text) => setFirstNm(text)}
                                style={styles.textInput} />
                        </View>

                        <View style={{ marginBottom: GlobalSize(10) }}>
                            <Text style={styles.textTitle}>Last Name</Text>

                            <TextInput
                                value={LastNm}
                                onChangeText={(text) => setLastNm(text)}
                                style={styles.textInput} />
                        </View>

                        <View style={{ marginBottom: GlobalSize(10) }}>
                            <Text style={styles.textTitle}>Care Recipient Phone Number</Text>

                            <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }]}>
                                <Phone width={25} height={25} />

                                <TextInput
                                    value={PhoneNum}
                                    keyboardType='number-pad'
                                    maxLength={12}
                                    onChangeText={(text) => setPhoneNum(text)}
                                    style={styles.textPhone}
                                />
                            </View>

                        </View>

                        <View>
                            <Text style={styles.textTitle}>Relationship to Care Recipient</Text>
                            <Dropdown
                                style={styles.textIn}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={relationship}
                                search={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select'}
                                value={valueRelation}
                                showsVerticalScrollIndicator={false}
                                onChange={item => {
                                    setValueRelation(item.value)
                                }}
                            />
                        </View>
                        <View>
                            <Text style={styles.textTitle}>I am using Sandwich to...</Text>
                            <Dropdown
                                style={styles.textIn}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={relationship}
                                search={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select'}
                                value={Usage}
                                showsVerticalScrollIndicator={false}
                                onChange={item => {
                                    setUsage(item.value)
                                }}
                            />
                        </View>
                        <View style={{ marginBottom: GlobalSize(10) }}>
                            <Text style={styles.textTitle}>Referral Code</Text>

                            <TextInput
                                value={RefCode}
                                onChangeText={(text) => setRefCode(text)}
                                style={styles.textInput} />
                        </View>
                    </View>
                </ScrollView>
                </KeyboardAvoidingView>

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

export default BasicInfo1

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
    textPhone: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
    },
    textInput: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        borderWidth: 1,
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.88,
        borderRadius: GlobalSize(6),
        backgroundColor: PUREWHITE,
        marginTop: GlobalSize(8),
        paddingLeft: GlobalSize(15),
        marginBottom: GlobalSize(3)
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
})