import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { CalenderLine } from '../../../../../assets'

const CreateAssessment = ({ navigation }) => {

    const [PreDate, setPreDate] = useState(null)
    const [taskName, setTaskName] = useState('')
    const [assessValue, setAssessValue] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [assessmentType, setAssessmentType] = useState([
        { label: 'Medical Power of Attorney', value: 'Medical Power of Attorney' },
        { label: 'DNR', value: 'DNR' },

    ]);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const ConvertDate = moment(date).format('DD/MM/YYYY')
        console.warn("A date has been picked: ", ConvertDate);
        setPreDate(ConvertDate)
        hideDatePicker();
    };
    
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ marginBottom: GlobalSize(40) }}>
                <SubHeader title={'Create Assessments'} navigation={navigation} />
            </View>
            <View>
                <View style={styles.titleRow}>
                    <Text style={styles.textTask}>Task Name</Text>
                </View>

                <View>
                    <TextInput
                        style={styles.textInput}
                        value={taskName}
                        onChangeText={(text) => setTaskName(text)} />
                </View>

                <View style={styles.titleRow}>
                    <Text style={styles.textTask}>Type of Assessment</Text>
                </View>

                <View style={DEFAULTSTYLES.alignView}>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={assessmentType}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={assessValue}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setAssessValue(item.value)
                        }}
                    />
                </View>

                <View style={styles.titleRow}>
                    <Text style={styles.textTask}>Start date</Text>
                </View>

                <View style={[styles.textInput,{
                    flexDirection:'row',justifyContent:'space-between',alignItems:"center"}]}>
                        <Text style={styles.valueText}>{PreDate}</Text>
                    <TouchableOpacity
                        onPress={() => setDatePickerVisibility(true)}
                        style={{ padding: 5,paddingRight:GlobalSize(15) }}>
                        <CalenderLine />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.viewRelative}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Assign</Text>
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

export default CreateAssessment

const styles = StyleSheet.create({
    textTask: {
        color: '#244E5A',
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14)
    },
    textInput: {
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        marginLeft: GlobalSize(20),
        marginRight: GlobalSize(20),
        paddingLeft: GlobalSize(15),
        color: TEXTCOLOR10,
        marginBottom: GlobalSize(20),
        height:GlobalSize(50)
    },
    titleRow: {
        marginLeft: GlobalSize(20),
        marginBottom: GlobalSize(8)
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
        height:GlobalSize(50),
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.88,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        marginBottom: GlobalSize(18)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    viewRelative: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        alignItems: 'center'
    },
    valueText:{
        color:TEXTCOLOR10,
        fontFamily:FONTS.FontRegular,
        fontSize:fontSize(12)
    }

})