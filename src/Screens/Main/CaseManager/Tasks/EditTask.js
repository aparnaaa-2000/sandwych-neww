import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, PUREBLACK, TEXTCOLOR10, BOTTOMTABTEXT1, BORDERCOLOR4, TEXTCOLOR7, PRIMARYCOLOR, PUREWHITE, PLACEHOLDERCOLOR1, PLACEHOLDERCOLOR2 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import MainHeader from '../../../../Components/Common/Headers/MainHeader'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'
import { BlackPencil, CalenderLine } from '../../../../../assets'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const EditTask = () => {

    const [taskName, setTaskName] = useState('Appointement')
    const [Address, setAddress] = useState('USA 20')
    const [AppointDate, setAppointDate] = useState('30/12/2023')
    const [AppointTime, setAppointTime] = useState('10:00')
    const [assessValue, setAssessValue] = useState('DNR')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [assessmentType, setAssessmentType] = useState([
        { label: 'Medical Power of Attorney', value: 'Medical Power of Attorney' },
        { label: 'DNR', value: 'DNR' },

    ]);
    const [careteam, setCareteam] = useState('Ava long')
    const [careteamList, setCareteamList] = useState([
        { label: 'Ava long', value: 'Ava long' },
        { label: 'Betty smith', value: 'Betty smith' },

    ]);

    const [valuetimeExt, setvalueTimeExt] = useState('AM')
    const [timeExt, setTimeExt] = useState([
        { label: 'AM', value: 'AM' },
        { label: 'PM', value: 'PM' },

    ]);


    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const ConvertDate = moment(date).format('DD/MM/YYYY')
        console.warn("A date has been picked: ", ConvertDate);
        setAppointDate(ConvertDate)
        hideDatePicker();
    };

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
            <MainHeader />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View style={styles.row}>

                        <View>
                            <Text style={styles.today}>Edit your Tasks</Text>
                        </View>

                        <View>
                            <BlackPencil />
                        </View>
                    </View>

                    <View>
                        <View style={styles.titleView}>
                            <Text style={styles.textTask}>Title</Text>
                        </View>

                        <View>
                            <TextInput
                                style={styles.textInput}
                                value={taskName}
                                onChangeText={(text) => setTaskName(text)} />
                        </View>

                        <View style={styles.titleView}>
                            <Text style={styles.textTask}>Assign Physician</Text>
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

                        <View style={styles.titleView}>
                            <Text style={styles.textTask}>Appointment Date</Text>
                        </View>


                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textInput, { width: DEFAULTWIDTH * 0.70, marginRight: 0 }]}
                                value={AppointDate}
                                onChangeText={(text) => setAppointDate(text)} />

                            <View style={styles.borderDate}>
                                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                                    <CalenderLine width={25} height={25} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.titleView}>
                            <Text style={styles.textTask}>Appointment Time</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textInput, { width: DEFAULTWIDTH * 0.65, marginRight: GlobalSize(10) }]}
                                value={AppointTime}
                                placeholder='00:00'
                                placeholderTextColor={PLACEHOLDERCOLOR2}
                                onChangeText={(text) => setAppointTime(text)} />

                            <Dropdown
                                style={[styles.textIn, { width: DEFAULTWIDTH * 0.2 }]}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={[styles.dropView, { width: DEFAULTWIDTH * 0.2 }]}
                                data={timeExt}
                                search={false}
                                labelField="label"
                                valueField="value"
                                value={valuetimeExt}
                                showsVerticalScrollIndicator={false}
                                onChange={item => {
                                    setvalueTimeExt(item.value)
                                }}
                            />

                        </View>

                        <View style={styles.titleView}>
                            <Text style={styles.textTask}>Address</Text>
                        </View>

                        <View>
                            <TextInput
                                style={[styles.textInput,{height:GlobalSize(100),textAlignVertical:'top'}]}
                                value={Address}
                                multiline
                                onChangeText={(text) => setAddress(text)} />
                        </View>

                        <View style={styles.titleView}>
                            <Text style={styles.textTask}>Assign care team</Text>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <Dropdown
                                style={styles.textIn}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={careteamList}
                                search={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Careteam Member'}
                                value={careteam}
                                showsVerticalScrollIndicator={false}
                                onChange={item => {
                                    setCareteam(item.value)
                                }}
                            />
                        </View>
                    </View>
                </View>
      

            <View style={[DEFAULTSTYLES.alignView,{marginTop:GlobalSize(20)}]}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Save Task</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginBottom:GlobalSize(20)}}>
                    <Text style={[styles.textBtn, { color: PRIMARYCOLOR }]}>Cancel</Text>
                </TouchableOpacity>
            </View>
      </ScrollView>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </SafeAreaView>
    )
}

export default EditTask;

const styles = StyleSheet.create({
    today: {
        color: PUREBLACK,
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB
    },
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
        height: GlobalSize(50)
    },
    borderDate: {
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        marginLeft: GlobalSize(10),
        marginBottom: GlobalSize(20),
        height: GlobalSize(50),
        width: DEFAULTWIDTH * 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: GlobalSize(20)
    },
    titleView: {
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
        height: GlobalSize(50),
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
        marginBottom: GlobalSize(20)
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    subView: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(25),
        alignItems: 'center'
    }
})