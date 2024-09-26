import React, { useState, useRef } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import {
    BACKGROUNDWHITE,
    BORDERCOLOR4,
    PRIMARYCOLOR,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLOR5,
    TEXTCOLOR7,
    VALIDCOLOR
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { CalenderLine, Qrcode } from '../../../../assets';
import { Dropdown } from 'react-native-element-dropdown';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const NewMedication = ({ navigation }) => {

    const BrandRef = useRef();
    const ScientificRef = useRef();
    const DosageRef = useRef();
    const RefillsRef = useRef();
    const PhysicianRef = useRef();
    const DateRef = useRef();
    const DescRef = useRef();
    const LabelRef = useRef();
    const FreqRef = useRef();
    const TimeRef = useRef();
    const NoteRef = useRef();
    const PharmRef = useRef();

    // const [BrandName, setBrandName] = useState('Advil')
    // const [ScName, setScName] = useState('Ibuprofen')
    // const [PhysicianNm, setPhysicianNm] = useState('Dr. Smith Joe')
    // const [PreDate, setPreDate] = useState('04/20/2023')
    // const [Description, setDescription] = useState('Medication description here.')
    // const [AuxLabel, setAuxLabel] = useState('Take one tablet by mouth twice daily')
    // const [Note, setNote] = useState('Lorem Ipsum....')

    const [BrandName, setBrandName] = useState(null)
    const [ScName, setScName] = useState(null)
    const [PhysicianNm, setPhysicianNm] = useState(null)
    const [PreDate, setPreDate] = useState(null)
    const [Description, setDescription] = useState(null)
    const [AuxLabel, setAuxLabel] = useState(null)
    const [Note, setNote] = useState(null)

    const [brandStatus, setBrandStatus] = useState(true)
    const [ScientificStatus, setScientificStatus] = useState(true)
    const [DosageStatus, setDosageStatus] = useState(true)
    const [RefillStatus, setRefillStatus] = useState(true)
    const [PhysicianStatus, setPhysicianStatus] = useState(true)
    const [DateStatus, setDateStatus] = useState(true)
    const [DescStatus, setDescStatus] = useState(true)
    const [LabelStatus, setLabelStatus] = useState(true)
    const [FreqStatus, setFreqStatus] = useState(true)
    const [NoteStatus, setNoteStatus] = useState(true)
    const [TimeStatus, setTimeStatus] = useState(true)
    const [PharmStatus, setPharmStatus] = useState(true)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    //To open Dosage
    const [valueDos, setValueDos] = useState(null);
    const [Dosage, setDosage] = useState([
        { label: '800 MG', value: '800 MG' },
        { label: '650 MG', value: '650 MG' },
        { label: '500 MG', value: '500 MG' }
    ]);

    //To open Refils dropdown
    const [valueR, setValueR] = useState(null);
    const [Refills, setRefills] = useState([
        { label: 'No refills', value: 'No refills' },

    ]);

    //To open Pharmacy dropdown
    const [valuePh, setValuePh] = useState(null);
    const [Pharmacy, setPharmacy] = useState([
        { label: 'Walgreens, 1234 Slaughter', value: 'Walgreens, 1234 Slaughter' },
        { label: 'CVS Pharmacy', value: 'CVS Pharmacy' },
        { label: 'Randall Pharmacy', value: 'Randall Pharmacy' }
    ]);

    //To Open Frequency Dropdown
    const [valueF, setValueF] = useState(null);
    const [Frequency, setFrequency] = useState([
        { label: 'Twice daily', value: 'Twice daily' },
        { label: 'Thrice daily', value: 'Thrice daily' },
    ]);

    //To Open Time dropdown
    const [valueT, setValueT] = useState(null);
    const [Time, setTime] = useState([
        { label: '12 PM', value: '12 PM' },
        { label: '8 PM', value: '8 PM' },
    ]);


    //BRAND VALIDATION
    const handleBrandChange = (text) => {
        const isBrandName = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setBrandStatus(isBrandName)
        setBrandName(text);
    };

    //SCIENTIFIC VALIDATION
    const handleScientificChange = (text) => {
        const isScName = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setScientificStatus(isScName)
        setScName(text);
    };

    //SCIENTIFIC VALIDATION
    const handleNoteChange = (text) => {
        const isNote = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setNoteStatus(isNote)
        setNote(text);
    };

    //LABEL VALIDATION
    const handleLabelChange = (text) => {
        const isLabel = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setLabelStatus(isLabel)
        setAuxLabel(text);
    };

    //DESCRIPTION VALIDATION
    const handleDescChange = (text) => {
        const isDesc = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setDescStatus(isDesc)
        setDescription(text);
    };

    //PHYSICIAN VALIDATION
    const handlePhyChange = (text) => {
        const isPhysician = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setPhysicianStatus(isPhysician)
        setPhysicianNm(text);
    };

    //DATE VALIDATION
    const handleDateChange = (text) => {
        const isDate = /^[-/0-9a-zA-Z ]{9,}$/.test(text);
        setDateStatus(isDate)
        setPreDate(text);
    };

    const OnSubmitValidation = () => {
        console.log(".......................", valueDos)
        if (BrandName == null) {
            BrandRef.current.focus();
            setBrandStatus(false)
        }
        else if (ScName == null) {
            ScientificRef.current.focus();
            setScientificStatus(false)
        }
        else if (valueDos == null) {
            if (DosageRef?.current && typeof DosageRef.current.focus === 'function') {
                DosageRef.current.focus();
            }
            setDosageStatus(false)
        }

        else if (valueR == null) {
            if (RefillsRef?.current && typeof RefillsRef.current.focus === 'function') {
                RefillsRef.current.focus();
            }
            setRefillStatus(false)
        }

        else if (PhysicianNm == null) {
            PhysicianRef?.current?.focus();
            setPhysicianStatus(false)
        }
        else if (PreDate == null) {
            DateRef?.current?.focus()
            setDateStatus(false)
        }
        else if (Description == null) {
            DescRef?.current?.focus();
            setDescStatus(false)
        }
        else if (AuxLabel == null) {
            LabelRef?.current?.focus();
            setLabelStatus(false)
        }
        else if (valuePh == null) {
            if (PharmRef?.current && typeof PharmRef.current.focus === 'function') {
                PharmRef.current.focus();
            }
            setPharmStatus(false)
        }

        else if (valueF == null) {
            if (FreqRef?.current && typeof FreqRef.current.focus === 'function') {
                FreqRef.current.focus();
            }
            setFreqStatus(false)
        }
        else if (valueT == null) {
            if (TimeRef?.current && typeof TimeRef.current.focus === 'function') {
                TimeRef.current.focus();
            }
            setTimeStatus(false)
        }
        else if (Note == null) {
            NoteRef?.current?.focus();
            setNoteStatus(false)
        }
        else {
            navigation.navigate('MedStack2',{screen:'ConfirmDrug1'})
        }
    }

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
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' && 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('MedsTabScreen')}>
                        <Text style={styles.textBack}>Back to Medication List</Text>
                    </TouchableOpacity>

                    <View style={styles.viewFlexRow}>
                        <View>
                            <Text style={styles.textNewMeds}>New medication</Text>
                        </View>

                        <View>
                            <Qrcode />
                        </View>
                    </View>

                    <Text style={styles.textSub}>Diagnosis Name</Text>
                    <View style={styles.alignView}>
                        <TextInput
                            ref={BrandRef}
                            value={BrandName}
                            onChangeText={(text) => handleBrandChange(text)}
                            style={[styles.textIn, { borderColor: brandStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>

                    <View>
                        {!brandStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Diagnosis name is required</Text>
                        )}
                    </View>

                    <Text style={styles.textSub}>Scientific Name</Text>
                    <View style={styles.alignView}>
                        <TextInput
                            ref={ScientificRef}
                            value={ScName}
                            onChangeText={(text) => handleScientificChange(text)}
                            style={[styles.textIn, { borderColor: ScientificStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>

                    <View>
                        {!ScientificStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Medication name is required</Text>
                        )}
                    </View>

                    <View style={[styles.viewPhs]}>
                        <View style={{ left: GlobalSize(-3) }}>
                            <Text style={[styles.textSub, { left: GlobalSize(3) }]}>Dosage</Text>
                            <Dropdown
                                ref={DosageRef}
                                style={[styles.textIn, { width: DEFAULTWIDTH * 0.42, borderColor: DosageStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={Dosage}
                                showsVerticalScrollIndicator={false}
                                search={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select Dosage'}
                                value={valueDos}
                                onChange={item => {
                                    setValueDos(item.value);
                                    setDosageStatus(true)
                                }}
                            />
                            <View>
                                {!DosageStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Dosage is required</Text>
                                )}
                            </View>

                        </View>


                        <View style={{ left: GlobalSize(3) }}>
                            <Text style={[styles.textSub, { left: GlobalSize(3) }]}>Allowed Refills</Text>

                            <Dropdown
                                ref={RefillsRef}
                                style={[styles.textIn, { width: DEFAULTWIDTH * 0.42, borderColor: RefillStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={Refills}
                                showsVerticalScrollIndicator={false}
                                search={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select Refills'}
                                value={valueR}
                                onChange={item => {
                                    setValueR(item.value);
                                    setRefillStatus(true)
                                }}
                            />

                            <View>
                                {!RefillStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Refills is required</Text>
                                )}
                            </View>

                        </View>
                    </View>

                    <View style={styles.viewPhs}>
                        <View style={{ left: GlobalSize(-3) }}>
                            <Text style={[styles.textSub, { left: GlobalSize(3) }]}>Physician</Text>
                            <TextInput
                                ref={PhysicianRef}
                                value={PhysicianNm}
                                onChangeText={(text) => handlePhyChange(text)}
                                style={[styles.textIn, { width: DEFAULTWIDTH * 0.42, borderColor: PhysicianStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                            <View>
                                {!PhysicianStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Physician is required</Text>
                                )}
                            </View>
                        </View>


                        <View style={{ left: GlobalSize(3) }}>
                            <Text style={[styles.textSub, { left: GlobalSize(3) }]}>Prescribed Date</Text>

                            <View style={[styles.textIn, {
                                flexDirection: 'row', alignItems: 'center', borderColor: DateStatus ? BORDERCOLOR4 : VALIDCOLOR,
                                justifyContent: 'space-between', width: DEFAULTWIDTH * 0.42,
                            }]}>
                                <Text ref={DateRef} style={styles.PreDate}>{PreDate}</Text>
                                <TouchableOpacity onPress={() => setDatePickerVisibility(true)} style={{ padding: 5 }}>
                                    <CalenderLine />
                                </TouchableOpacity>
                            </View>


                            <View>
                                {!DateStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Date is required</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <Text style={styles.textSub}>Medication Description</Text>

                    <View style={styles.alignView}>

                        <TextInput
                            ref={DescRef}
                            value={Description}
                            onChangeText={(text) => handleDescChange(text)}
                            style={[styles.textIn, { borderColor: DescStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>
                    <View>
                        {!DescStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Description is required</Text>
                        )}
                    </View>

                    <Text style={styles.textSub}>Auxiliary Label</Text>
                    <View style={styles.alignView}>
                        <TextInput
                            ref={LabelRef}
                            value={AuxLabel}
                            onChangeText={(text) => handleLabelChange(text)}
                            style={[styles.textIn, { borderColor: LabelStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>

                    <View>
                        {!LabelStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Auxiliary label is required</Text>
                        )}
                    </View>

                    <View style={[styles.viewPharm, { marginTop: GlobalSize(8) }]}>
                        <Text style={styles.textPh}>Pharmacy Details</Text>
                    </View>
                    <Text style={styles.textSub}>Select Pharmacy</Text>
                    <View style={[styles.alignView]}>

                        <Dropdown
                            ref={PharmRef}
                            style={[styles.textIn, { borderColor: PharmStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
                            placeholderStyle={styles.placeholderS}
                            itemTextStyle={styles.textArea}
                            selectedTextStyle={styles.textArea}
                            containerStyle={[styles.dropView, { width: DEFAULTWIDTH * 0.88 }]}
                            data={Pharmacy}
                            search={false}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Pharmacy'}
                            showsVerticalScrollIndicator={false}
                            value={valuePh}
                            onChange={item => {
                                setValuePh(item.value);
                                setPharmStatus(true)
                            }}
                        />
                    </View>

                    <View>
                        {!PharmStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Pharmacy is required</Text>
                        )}
                    </View>

                    <View style={styles.viewRm}>
                        <Text style={styles.textPh}>Reminder Set Up</Text>
                    </View>

                    <View style={styles.viewFreq}>
                        <View style={{ left: GlobalSize(-3) }}>
                            <Text style={[styles.textSub, { left: GlobalSize(3) }]}>Frequency</Text>

                            <Dropdown
                                ref={FreqRef}
                                style={[styles.textIn, { width: DEFAULTWIDTH * 0.42, borderColor: FreqStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={Frequency}
                                showsVerticalScrollIndicator={false}
                                search={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select Frequency'}
                                value={valueF}
                                onChange={item => {
                                    setValueF(item.value);
                                    setFreqStatus(true)
                                }}
                            />
                            <View>
                                {!FreqStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Frequency is required</Text>
                                )}
                            </View>
                        </View>


                        <View style={{ left: GlobalSize(3) }}>
                            <Text style={[styles.textSub, { left: GlobalSize(3) }]}>Time</Text>


                            <Dropdown
                                ref={TimeRef}
                                style={[styles.textIn, { width: DEFAULTWIDTH * 0.42, borderColor: TimeStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={Time}
                                search={false}
                                labelField="label"
                                valueField="value"
                                showsVerticalScrollIndicator={false}
                                placeholder={'Select Time'}
                                value={valueT}
                                onChange={item => {
                                    setValueT(item.value);
                                    setTimeStatus(true)
                                }}
                            />


                            <View>
                                {!TimeStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Time is required</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    <Text style={styles.textSub}>Note</Text>

                    <View style={styles.alignView}>
                        <TextInput
                            ref={NoteRef}
                            value={Note}
                            onChangeText={(text) => handleNoteChange(text)}
                            style={[styles.textIn, { borderColor: NoteStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
                    </View>
                    <View>
                        {!NoteStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Note is required</Text>
                        )}
                    </View>

                    <View style={[styles.alignView, { marginTop: GlobalSize(15) }]}>
                        <TouchableOpacity style={styles.btnView} onPress={() => OnSubmitValidation()}>
                            <Text style={styles.textBtn}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        padding: DEFAULTWIDTH * 0.07
    },
    viewFlexRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: DEFAULTHEIGHT * 0.025,
        marginBottom: DEFAULTHEIGHT * 0.02
    },
    viewRm: {
        marginTop: DEFAULTHEIGHT * 0.01,
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    placeholderS: {
        color: BORDERCOLOR4,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular
    },
    textBack: {
        color: TEXTCOLOR5,
        fontSize: fontSize(14),
        fontWeight: '500',
        fontFamily: FONTS.FontMedium
    },
    dropView: {
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.42,
        padding: GlobalSize(5)
    },
    PreDate:{
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10
    },
    textNewMeds: {
        fontSize: fontSize(25),
        color: PRIMARYCOLOR,
        fontFamily: FONTS.FontSemiB,
        fontWeight: '700'
    },
    viewPhs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTHEIGHT * 0.0
    },
    textSub: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR7,
        marginTop: GlobalSize(10)
    },
    viewFreq: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTHEIGHT * 0.015
    },
    viewPharm: {
        marginTop: DEFAULTHEIGHT * 0.006,
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    textIn: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.13,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        marginTop: GlobalSize(10),
        paddingLeft: GlobalSize(10),
        paddingRight: GlobalSize(10)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(10),
    },
    textBtn: {
        fontSize: fontSize(16),
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(2)
    },
    textPh: {
        fontSize: fontSize(16),
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        color: PRIMARYCOLOR
    },


})
export default NewMedication;