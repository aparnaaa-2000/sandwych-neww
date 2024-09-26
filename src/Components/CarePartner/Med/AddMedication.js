import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    FlatList
} from 'react-native';
import {
    BACKGROUNDWHITE,
    BORDERCOLOR4,
    PRIMARYCOLOR,
    PUREWHITE,
    TEXTCOLOR7,
    TEXTCOLOR10,
    VALIDCOLOR,
    PLACEHOLDERCOLOR1,
    PLACEHOLDERCOLOR3,
    BORDERCOLORSUPPORT,

} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { BlackDelete, Close, GreyClockLine } from '../../../../assets';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import moment from 'moment';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { AddMedicationManual, GetMedicineList } from '../../../redux/Thunk/MedicationThunk';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorPopup from '../../ComingSoonPopup/ErrorPopup';
import SuccessPopup from '../../ComingSoonPopup/Successpopup';
import { setDrugID, setMedID } from '../../../redux/Slice/Medication/StoreMedDataKey';
import { AddMedicationManualClear } from '../../../redux/Slice/Medication/AddMedicationManualKey';

const AddMedication = ({ navigation }) => {

    const ScientificRef = useRef();
    const DosageRef = useRef();
    const RefillsRef = useRef();
    const PhysicianRef = useRef();
    const QuantityRef = useRef();
    const DateRef = useRef();
    const DescRef = useRef();
    const LabelRef = useRef();
    const FreqRef = useRef();
    const TimeRef = useRef();
    const NoteRef = useRef();
    const PharmRef = useRef();
    const MealTimeRef = useRef();
    const RouteDescRef = useRef();
    const MedFormRef = useRef();
    const DurationValueRef = useRef();
    const DurationTypeRef = useRef();

    const dispatch = useDispatch()

    const [BrandName, setBrandName] = useState(null)
    const [ScName, setScName] = useState(null)
    const [PhysicianNm, setPhysicianNm] = useState(null)
    const [PreDate, setPreDate] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [Description, setDescription] = useState(null)
    const [AuxLabel, setAuxLabel] = useState(null)
    const [Note, setNote] = useState(null)
    const [RouteDesc, setRouteDesc] = useState(null)

    const [brandStatus, setBrandStatus] = useState(true)
    const [ScientificStatus, setScientificStatus] = useState(true)
    const [DosageStatus, setDosageStatus] = useState(true)
    const [MealStatus, setMealStatus] = useState(true)
    const [QuantityStatus, setQuantityStatus] = useState(true)

    const [DurationTypeStatus, setDurationTypeStatus] = useState(false)
    const [DurationValueStatus, setDurationValueStatus] = useState(false)

    const [RefillStatus, setRefillStatus] = useState(true)
    const [PhysicianStatus, setPhysicianStatus] = useState(true)
    const [DateStatus, setDateStatus] = useState(true)
    const [DescStatus, setDescStatus] = useState(true)
    const [LabelStatus, setLabelStatus] = useState(true)
    const [FreqStatus, setFreqStatus] = useState(true)

    const [RouteDescStatus, setRouteDescStatus] = useState(true)
    const [NoteStatus, setNoteStatus] = useState(true)
    const [TimeStatus, setTimeStatus] = useState(true)
    const [PharmStatus, setPharmStatus] = useState(true)
    const [MedFormStatus, setMedFormStatus] = useState(true)
    const [MedForm, setMedForm] = useState(null)
    const [ErrorModal, setErrorModal] = useState(false)
    const [SuccessModal, setSuccessModal] = useState(false)
    const [inputId, setinputId] = useState(null)
    const [dropdownOpenStates, setDropdownOpenStates] = useState({});
    const [MealTime, setMealTime] = useState(null)

    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [Quantity, setQuantity] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const [diagnisisName, setDiagnosisName] = useState('')
    const [DiagnosisData, setDiagnosisData] = useState([])
    const [ICDCode, setICDCode] = useState(null)

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
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }

    ]);

    const [MedName, setMedName] = useState(null)
    const [valuePh, setValuePh] = useState(null);
    const [DurationValue, setDurationValue] = useState(null)

    const [DurationType, setDurationType] = useState([
        { label: 'Day', value: '0' },
        { label: 'Week', value: '1' },
        { label: 'Month', value: '2' }
    ])
    //To Open Frequency Dropdown

    const [valueF, setValueF] = useState(null);
    const [Frequency, setFrequency] = useState([
        { label: 'Twice daily', value: 'Twice daily' },
        { label: 'Thrice daily', value: 'Thrice daily' },
    ]);

    //To Open Time dropdown

    const [valueT, setValueT] = useState(null);
    const [Time, setTime] = useState(null)
    const ICDCodeValue = useSelector((state) => state?.storeMedData?.ICDCode);
    const PrescriptionID = useSelector((state) => state?.storeMedData?.PrescriptionID);
    //  console.log("Icd value,....................", ICDCodeValue, PrescriptionID)

    const { MedicineListData,
        MedicineListError,
        AddMedicationError,
        AddMedicationSuccess } = useSelector(
            state => ({
                MedicineListData: state.MedicineNameList.data,
                MedicineListError: state.MedicineNameList.error,
                MedicineListLoading: state.MedicineNameList.isLoading,
                AddMedicationSuccess: state.AddMedication.data,
                AddMedicationError: state.AddMedication.error,
                AddMedicationisLoading: state.AddMedication.isLoading,


            }),
            shallowEqual
        );


    const [userData, setUserData] = useState(null)
    const [inputs, setInputs] = React.useState([{
        "patient_prescription_id": PrescriptionID,
        "dispensableGenericID": "",
        "drug_name": "",
        "duration_type": "",
        "time": "",
        id: Math.random()
    }]);

    useEffect(() => {
        dispatch(AddMedicationManualClear())
        getData().then(data => {
            setUserData(data)
        });
    }, []);

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');

            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null,
                patientData: null
            };
        }
    };


    const OnSubmitValidation = () => {
        if (ScName == null) {
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
            navigation.navigate('MedStack2', { screen: 'ConfirmDrug1' })
        }
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const handleConfirm = (date) => {
        const ConvertDate = moment(date).format('hh:mm A')
        console.warn("A date has been picked: ", ConvertDate, inputId);
        setTime(ConvertDate)
        const updatedInputs = inputs.map(input =>
            input?.id === inputId ? { ...input, ['time']: ConvertDate } : input
        );
        setInputs(updatedInputs);
        //  console.log("convert date................", updatedInputs)
        // handleInputChange(ConvertDate, 1, 'time')
        hideDatePicker();
    };


    useEffect(() => {
        GetMedicineList(ICDCodeValue, dispatch)
    }, [ICDCodeValue])

    //console.log("MEDICINElist.............",MedicineListData?.Items)
    const handleSearch = (query) => {
        setDropdownOpen(true)
        setQuery(query)
        //  console.log("Name data", MedicineListData?.Items)
        const filteredData = MedicineListData?.Items?.filter((item) =>
            item?.DrugNameDesc?.toLowerCase()?.includes(query?.toLowerCase())
        );
        //  console.log("FILTER DATA", filteredData)
        setFilteredItems(filteredData);
    };


    const handleSelectMedication = (item) => {
        //  console.log("ITEM............", item?.MedicalConditionID)
        setQuery(item?.MedicalConditionDescShort);
        //setICDCode(item?.MedicalConditionID)
        setFilteredItems([]);
    };

    // Function to handle adding a new TextInput
    const handleAddInput = () => {
        setInputs([...inputs, { id: Math.random(), patient_prescription_id: PrescriptionID }]);
    };

    // Function to handle deleting a specific TextInput
    const handleDeleteInput = (id) => {
        const filteredInputs = inputs.filter(input => input.id !== id);
        setInputs(filteredInputs);
    };


    // Function to handle changing the value of a specific input field
    const handleInputChange = (text, id, field) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, [field]: text } : input
        );
        setInputs(updatedInputs);
        // setNote(text)
    };

    // Function to handle changing the values of specific input fields
    const handleInputChangeMedicine = (text1, text2, text3, text4, id, field1, field2, field3, field4) => {
        const updatedInputs = inputs.map(input =>
            input.id === id ? { ...input, [field1]: text1, [field2]: text2, [field3]: text3, [field4]: text4 } : input
        );
        setInputs(updatedInputs);
        setDropdownOpen(false)

        //  setFilteredItems([])
    };


    const OnCalenderOpen = (id) => {
        setinputId(id)
        setDatePickerVisibility(true)
    }

    useEffect(() => {
        if (AddMedicationSuccess) {
            //  console.log("ADD MEDICATION SUCCESS...............", AddMedicationSuccess?.data, AddMedicationSuccess?.existing_medications)
            setSuccessModal(true)
            // Extract ids from both arrays
            // const dataIds = AddMedicationSuccess?.data?.map(item => item.id);
            // const medicationIds = AddMedicationSuccess?.existing_medications?.map(medication => medication.id);

            // // Combine the two arrays of ids
            // const allIds = [...dataIds, ...medicationIds];

            // console.log("all ids", allIds);
            setTimeout(() => {
                setSuccessModal(false)


                const extractDrugIDs = (arrays) => {
                    return arrays.map(item => ({
                        Prospective: true,
                        DrugID: item.dispensableGenericID,
                        DrugConceptType: "DispensableGeneric"
                    }));
                };



                // Combine arrays and extract IDs
                const combinedArray = [...AddMedicationSuccess?.data.map(item => item.medication), ...AddMedicationSuccess?.existing_medications];
                const screenDrugs = extractDrugIDs(combinedArray);
                // const MedIDs =  extractID(combinedArray)
                dispatch(setDrugID(screenDrugs))


                // Extract IDs from both arrays
                const extractIDs = (array1, array2) => {
                    const ids = [];

                    // Extract id from the first array
                    array1.forEach(item => {
                        ids.push(item.id);
                    });

                    // Extract id from the second array
                    array2.forEach(item => {
                        if (item.id) {
                            ids.push(item.id);
                        }
                    });

                    return ids;
                };

                // Extract the IDs from both arrays
                const ids = extractIDs(AddMedicationSuccess?.data, AddMedicationSuccess?.existing_medications);

                const createInteractions = (ids) => {
                    const interactions = [];

                    // Create one interaction object, assuming all ids are part of a single interaction
                    const interaction = {};

                    // Loop through the ids and dynamically assign them to `patient_medication_id_X` fields
                    for (let i = 0; i < ids.length; i++) {
                        interaction[`patient_medication_id_${i + 1}`] = ids[i]; // Dynamically set patient_medication_id_X
                    }

                    // Add common fields
                    interaction["drug_interaction_message"] = "";
                    interaction["severity"] = "";

                    // Push the interaction object into the interactions array
                    interactions.push(interaction);

                    return interactions;
                };

                // Generate interaction objects
                const interactions = createInteractions(ids);

                console.log(interactions);
                dispatch(setMedID(interactions))
                console.log("screen drugs.............", AddMedicationSuccess?.data, "/n", AddMedicationSuccess?.existing_medications)
                console.log("interactions..................", interactions);
                dispatch(AddMedicationManualClear())
                //console.log("screen drugs.............",MedIDs,AddMedicationSuccess?.data,AddMedicationSuccess?.existing_medications)
                navigation.navigate('MedStack2', { screen: 'ConfirmDrug1' })

            }, 1500)

        } else if (AddMedicationError) {
            dispatch(AddMedicationManualClear())
        }
    }, [AddMedicationSuccess, AddMedicationError])


    const validateInputs = () => {
        let isValid = true;

        // Iterate over all inputs
        inputs.forEach((input) => {
            // Check if required fields are filled
            if (!input?.drug_name
                || !input?.dosage || !input?.refill || !input?.qty || !input?.duration_value ||
                !input?.doseFormDesc || !input?.routeDesc || !input?.meal_timing ||
                !input?.frequency || !input?.time || !input?.instruction_for_medication_usage) {
                isValid = false;
            }
        });

        return isValid;
    };

    const AddMedicationAPIk = () => {
        // Validate inputs
        const isValid = validateInputs();

        if (isValid) {
            console.log("inuts.................", inputs, isValid)
            // Show error message or highlight fields
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
            }, 1500)
            // alert("Please fill in all required fields.");
            return;
        }
        else {
            const updatedArray = inputs.map(({ id, ...rest }) => rest);
            AddMedicationManual(
                userData?.patientData?.patient_id,
                updatedArray,
                userData?.storedValue, dispatch)
        }
        // Proceed with form submission
        // Your existing API call or logic here
    };

    const handleDropdownToggle = (inputId) => {
        setDropdownOpenStates((prev) => ({
            ...prev,
            [inputId]: !prev[inputId], // Toggle the dropdown for the specific input
        }));
    };


    //     console.log("ADD MEDICATION ERROR.......................",AddMedicationError,AddMedicationSuccess,StoreDrugInteractionSuccess)
    console.log("INPUTS....................", inputs)

    // Function to check if all fields are filled
    const areAllFieldsFilled = (item) => {
        // Add conditions to check for required fields
        return item.dispensableGenericID && item.drug_name && item.duration_type && item.time;
      };

    // Check for each object in the array
    const AddMedicationAPI = () => {
        const allFieldsEntered = inputs.every(areAllFieldsFilled)

        if (allFieldsEntered) {
            console.log("All fields are entered.");
            const updatedArray = inputs.map(({ id, ...rest }) => rest);
            AddMedicationManual(
                userData?.patientData?.patient_id,
                updatedArray,
                userData?.storedValue, dispatch)

        } else {
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
            }, 1500)
            console.log("Some fields are missing.");
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' && 'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.mainContainer}>

                        <View style={styles.mainView}>
                            <View>
                                <Text style={styles.textAdd}>Add Medication</Text>
                            </View>

                            <View style={{ top: GlobalSize(2), left: GlobalSize(8) }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Close width={GlobalSize(22)} height={GlobalSize(22)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {inputs.map((input, index) => (
                            <View key={input?.id}>

                                <Text style={styles.subHeading}>Medication Name</Text>
                                <TextInput
                                    placeholder="Search here..."
                                    value={input?.drug_name ? input?.drug_name : MedName}
                                    placeholderTextColor={PLACEHOLDERCOLOR1}
                                    onChangeText={handleSearch}
                                    onFocus={() => handleDropdownToggle(input?.id)} // Open the dropdown on focus
                                    // onBlur={() => handleDropdownToggle(input?.id)}  
                                    style={[styles.textInput, {
                                        borderColor: brandStatus ? BORDERCOLOR4 : VALIDCOLOR,
                                        textTransform: 'capitalize', left: -3
                                    }]}
                                />


                                {dropdownOpenStates[input?.id] && filteredItems?.length > 0 && (
                                    <View style={styles.dropdown}>
                                        <FlatList
                                            data={filteredItems}
                                            keyExtractor={item => item.id}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    style={styles.item}
                                                    onPress={() => {
                                                        handleInputChangeMedicine(
                                                            item?.GenericDispensableDrugDesc,
                                                            item?.DispensableGenericID,
                                                            item?.RouteDesc,
                                                            item?.DoseFormDesc,
                                                            input?.id,
                                                            'drug_name', 'dispensableGenericID', 'routeDesc', 'doseFormDesc'),
                                                            handleDropdownToggle(input?.id)
                                                    }
                                                    }

                                                >
                                                    <Text style={styles.textMed}>{item?.GenericDispensableDrugDesc}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>)}

                                {/* <View>
                                    {!ScientificStatus && (
                                        <Text style={{ color: VALIDCOLOR }}>Medication name is required</Text>
                                    )}
                                </View> */}

                                <View style={styles.dosageView}>
                                    <View style={{ left: GlobalSize(-3) }}>
                                        <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Dosage</Text>

                                        <TextInput
                                            ref={DosageRef}
                                            value={valueDos}
                                            onChangeText={(text) => handleInputChange(text, input?.id, 'dosage')}
                                            style={[styles.textInput, { borderColor: DosageStatus ? BORDERCOLOR4 : VALIDCOLOR, width: DEFAULTWIDTH * 0.42 }]} />
                                        {/* <View>
                                            {!DosageStatus && (
                                                <Text style={{ color: VALIDCOLOR }}>Dosage is required</Text>
                                            )}
                                        </View> */}

                                    </View>


                                    <View style={{ left: GlobalSize(3) }}>
                                        <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Allowed Refills</Text>

                                        <Dropdown
                                            ref={RefillsRef}
                                            style={[styles.textInput, { width: DEFAULTWIDTH * 0.42, borderColor: RefillStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
                                            placeholderStyle={styles.placeholderS}
                                            itemTextStyle={styles.textArea}
                                            selectedTextStyle={styles.textArea}
                                            containerStyle={styles.dropView}
                                            data={Refills}
                                            search={false}
                                            showsVerticalScrollIndicator={false}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={'Select Refills'}
                                            value={valueR}
                                            onChange={item => {
                                                handleInputChange(item.value, input?.id, 'refill');
                                                setRefillStatus(true)
                                            }}
                                        />
                                        {/* <View>
                                            {!RefillStatus && (
                                                <Text style={{ color: VALIDCOLOR }}>Refills is required</Text>
                                            )}
                                        </View> */}

                                    </View>
                                </View>


                                <View style={styles.viewFreq}>
                                    <View style={{ left: GlobalSize(-3) }}>
                                        <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Quantity</Text>
                                        <TextInput
                                            ref={QuantityRef}
                                            value={Quantity}
                                            onChangeText={(text) => handleInputChange(text, input?.id, 'qty')}
                                            style={[styles.textInput, {
                                                width: DEFAULTWIDTH * 0.42,
                                                borderColor: QuantityStatus ? BORDERCOLOR4 : VALIDCOLOR
                                            }]} />

                                        {/* <View>
                                            {!QuantityStatus && (
                                                <Text style={{ color: VALIDCOLOR }}>Quantity is required</Text>
                                            )}
                                        </View> */}
                                    </View>



                                    <View style={{ left: GlobalSize(3) }}>
                                        <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Duration Type</Text>

                                        <Dropdown
                                            ref={DurationTypeRef}
                                            style={[styles.textInput, {
                                                width: DEFAULTWIDTH * 0.42,
                                                // borderColor: DurationTypeStatus ? BORDERCOLOR4 : VALIDCOLOR
                                            }]}
                                            placeholderStyle={styles.placeholderS}
                                            itemTextStyle={styles.textArea}
                                            selectedTextStyle={styles.textArea}
                                            containerStyle={styles.dropView}
                                            data={DurationType}
                                            search={false}
                                            showsVerticalScrollIndicator={false}
                                            labelField="label"
                                            valueField="value"
                                            placeholder={''}
                                            value={valueR}
                                            onChange={item => {
                                                handleInputChange(item.value, input?.id, 'duration_type');
                                                setDurationTypeStatus(true)
                                            }}
                                        />

                                        {/* <View>
                                            {!DurationTypeStatus && (
                                                <Text style={{ color: VALIDCOLOR }}>Duration Type is required</Text>
                                            )}
                                        </View> */}
                                    </View>
                                </View>


                                <Text style={styles.subHeading}>Duration</Text>

                                <View style={styles.alignView}>

                                    <TextInput
                                        ref={DurationValueRef}
                                        value={DurationValue}
                                        keyboardType='number-pad'
                                        onChangeText={(text) => handleInputChange(text, input?.id, 'duration_value')}
                                        style={[styles.textInput, {
                                            // borderColor: DurationValueStatus ? BORDERCOLOR4 : VALIDCOLOR
                                        }]} />
                                </View>
                                {/* 

                                <View>
                                    {!DurationValueStatus && (
                                        <Text style={{ color: VALIDCOLOR }}>Duration is required</Text>
                                    )}
                                </View> */}

                                <Text style={styles.subHeading}>Medication Form</Text>

                                <View style={styles.alignView}>

                                    <TextInput
                                        ref={MedFormRef}
                                        value={input?.doseFormDesc}
                                        style={[styles.textInput, {
                                            borderColor: MedFormStatus ? BORDERCOLOR4 : VALIDCOLOR
                                        }]} />
                                </View>

{/* 
                                <View>
                                    {!MedFormStatus && (
                                        <Text style={{ color: VALIDCOLOR }}>Medication Form is required</Text>
                                    )}
                                </View> */}

                                <View style={{ left: GlobalSize(-3) }}>
                                    <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Route Description</Text>

                                    <TextInput
                                        ref={RouteDescRef}
                                        value={input?.routeDesc}
                                        // onChangeText={(text) => handleInputChange(text, input?.id, 'routeDesc')}
                                        style={[styles.textInput, { borderColor: RouteDescStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />

                                    {/* <View>
                                        {!RouteDescStatus && (
                                            <Text style={{ color: VALIDCOLOR }}>Route description is required</Text>
                                        )}
                                    </View> */}
                                </View>


                                <View style={{ left: GlobalSize(-3) }}>
                                    <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Meal Timing</Text>

                                    <TextInput
                                        ref={MealTimeRef}
                                        value={MealTime}
                                        onChangeText={(text) => handleInputChange(text, input?.id, 'meal_timing')}
                                        style={[styles.textInput, { borderColor: MealStatus ? BORDERCOLOR4 : VALIDCOLOR }]} />
{/* 
                                    <View>
                                        {!MealStatus && (
                                            <Text style={{ color: VALIDCOLOR }}>Meal time is required</Text>
                                        )}
                                    </View> */}
                                </View>

                                <View style={{ marginTop: DEFAULTWIDTH * 0.05, marginBottom: DEFAULTWIDTH * 0.02 }}>
                                    <Text style={styles.textRemind}>Reminder Set Up</Text>
                                </View>

                                <View style={styles.viewFreq}>
                                    <View style={{ left: GlobalSize(-3) }}>
                                        <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Frequency</Text>
                                        <Dropdown
                                            ref={FreqRef}
                                            style={[styles.textInput, { width: DEFAULTWIDTH * 0.42, borderColor: FreqStatus ? BORDERCOLOR4 : VALIDCOLOR }]}
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
                                                handleInputChange(item.value, input?.id, 'frequency');
                                                setFreqStatus(true)
                                            }}
                                        />
                                        {/* <View>
                                            {!FreqStatus && (
                                                <Text style={{ color: VALIDCOLOR }}>Frequency is required</Text>
                                            )}
                                        </View> */}
                                    </View>


                                    <View style={{ left: GlobalSize(3) }}>
                                        <Text style={[styles.subHeading, { left: GlobalSize(3) }]}>Time</Text>



                                        <View style={[styles.textInput, {
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            borderColor: MedFormStatus ? BORDERCOLOR4 : VALIDCOLOR,
                                            justifyContent: 'space-between', width: DEFAULTWIDTH * 0.42,
                                        }]}>
                                            <Text ref={TimeRef} style={styles.PreDate}>{input?.time}</Text>
                                            <TouchableOpacity
                                                onPress={() => OnCalenderOpen(input?.id)}
                                                style={{ padding: 5 }}>
                                                <GreyClockLine width={25} height={20} />
                                            </TouchableOpacity>
                                        </View>

                                        {/* <View>
                                            {!TimeStatus && (
                                                <Text style={{ color: VALIDCOLOR }}>Time is required</Text>
                                            )}
                                        </View> */}

                                    </View>
                                </View>

                                <Text style={styles.subHeading}>Note</Text>

                                <View style={styles.alignView}>
                                    <TextInput
                                        ref={NoteRef}
                                        value={Note}
                                        onChangeText={(text) => handleInputChange(text, input?.id, 'instruction_for_medication_usage')}
                                        style={[styles.textInput, {
                                            height: GlobalSize(70),
                                            textAlignVertical: 'top',
                                            borderColor: NoteStatus ? BORDERCOLOR4 : VALIDCOLOR
                                        }]} />
                                </View>

                                {/* <View>
                                    {!NoteStatus && (
                                        <Text style={{ color: VALIDCOLOR }}>Note is required</Text>
                                    )}
                                </View> */}


                                {inputs?.length > 1 &&
                                    <View style={{ alignItems: 'flex-end' }}>
                                        <TouchableOpacity onPress={() => handleDeleteInput(input?.id)}>
                                            <BlackDelete width={30} height={30} />
                                        </TouchableOpacity>
                                    </View>}

                                {inputs?.length - 1 !== index &&
                                    <View style={styles.lineBorder} />}
                            </View>
                        ))}


                        <View style={[styles.alignViewBtn, { marginTop: GlobalSize(15) }]}>

                            <View style={{ marginRight: GlobalSize(16) }}>
                                <TouchableOpacity style={styles.btnView} onPress={() => handleAddInput()}>
                                    <Text style={styles.textBtn}>Add More</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                <TouchableOpacity style={styles.btnView} onPress={() => AddMedicationAPI()}>
                                    <Text style={styles.textBtn}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode='time'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <ErrorPopup
                    Message={'Please fill in all required fields.'}
                    ModalOpen={ErrorModal}
                    setModalOpen={setErrorModal} />

                <SuccessPopup
                    Message={'Medication addedd Successfully.'}
                    ModalOpen={SuccessModal}
                    setModalOpen={setSuccessModal} />

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
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTWIDTH * 0.04,
    },
    borderView: {
        borderWidth: 1,
        borderColor: PLACEHOLDERCOLOR3,
        borderRadius: GlobalSize(10),
        padding: GlobalSize(10)
    },
    lineBorder: {
        width: DEFAULTWIDTH * 0.86,
        height: 2,
        marginBottom: GlobalSize(10),
        backgroundColor: PRIMARYCOLOR,
        marginTop: GlobalSize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewPharm: {
        marginTop: DEFAULTHEIGHT * 0.006,
        marginBottom: DEFAULTHEIGHT * 0.01
    },
    viewFreq: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTWIDTH * 0.01
    },
    textAdd: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        fontSize: fontSize(18),
    },
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.42,
        padding: GlobalSize(5)
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    alignViewBtn: {
        //alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTHEIGHT * 0.015,
        flexDirection: 'row'
    },
    textMed: {
        fontSize: fontSize(12),
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        textTransform: 'capitalize',
        padding: GlobalSize(15)
    },
    textSub: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR7,

    },
    textPh: {
        fontSize: fontSize(16),
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        color: PRIMARYCOLOR
    },
    subHeading: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR7,
        marginTop: GlobalSize(10)
    },
    placeholderS: {
        color: BORDERCOLOR4,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular
    },
    textInput: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        paddingRight: GlobalSize(10),
        fontWeight: '400',
        color: TEXTCOLOR7,
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.13,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        marginTop: GlobalSize(10),
        paddingLeft: GlobalSize(10)
    },
    PreDate: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
    },
    dosageView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: DEFAULTWIDTH * 0.01
    },
    btnView: {
        width: DEFAULTWIDTH * 0.42,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(10),
    },
    btnDelete: {
        width: DEFAULTWIDTH * 0.35,
        height: DEFAULTWIDTH * 0.10,
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
        marginBottom: DEFAULTWIDTH * 0.01
    },
    textRemind: {
        fontSize: fontSize(16),
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        color: PRIMARYCOLOR
    },
    dropdown: {
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        borderRadius: 8,
        width: DEFAULTWIDTH * 0.87,
        marginTop: GlobalSize(10),
        position: 'relative',
    }


})
export default AddMedication;