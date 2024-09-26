import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput } from 'react-native'
import React,{useState} from 'react'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORNEW1, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts';
import { Dropdown } from 'react-native-element-dropdown';

const AssignMedication = () => {

    const [MedType,setMedType] = useState(null)
    const [Duration,setDuration] = useState(null)
    const [StartDate,setStartDate] = useState(null)
    const [EndDate,setEndDate] = useState(null)
    const [Assignee,setAssignee] = useState(null)

    const [DurationData, setDurationData] = useState(
        [
            { label: '2 Months', value: '2 Months' },
            { label: '1 Month', value: '1 Month' },
        ]
    )

    const [AssignData, setAssignData] = useState(
        [
            { label: 'Ava Long', value: 'Ava Long' },
            { label: 'Sally Brown', value: 'Sally Brown' },

        ]
    )
    const [MedData, setMedData] = useState(
        [
            { label: 'Morning', value: 'Morning' },
            { label: 'Evening', value: 'Evening' },

        ]
    )

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Assign Medication'} />
            </View>

            <View style={{padding:GlobalSize(20)}}>

                <View>
                    <Text style={styles.textTitle}>Medication type</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={MedData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={MedType}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setMedType(item.value)
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

                <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:GlobalSize(5)}}>
                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={styles.textTitle}>Start Date</Text>

                    <TextInput
                        value={StartDate}
                        onChangeText={(text) => setStartDate(text)}
                        style={styles.textInput} />
                </View>

                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={styles.textTitle}>End date</Text>

                    <TextInput
                        value={EndDate}
                        onChangeText={(text) => setEndDate(text)}
                        style={styles.textInput} />
                </View>
                </View>
                <View>
                    <Text style={styles.textTitle}>Assignee</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={AssignData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={Assignee}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setAssignee(item.value)
                        }}
                    />

                </View>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Assign Task</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={[styles.textBtn,{color:PRIMARYCOLOR}]}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AssignMedication

const styles = StyleSheet.create({
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
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:GlobalSize(20)
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
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
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.41,
        borderRadius: GlobalSize(4),
        marginTop: GlobalSize(8),
        paddingLeft: GlobalSize(15),
        marginBottom:GlobalSize(3)
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
        borderRadius: 4,
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        marginBottom: GlobalSize(15),
        marginTop: GlobalSize(10)
    },
})