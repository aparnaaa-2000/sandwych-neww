import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
    ScrollView
} from 'react-native';

//IMPORT CONSTANTS
import {
    PUREWHITE,
    SECONDARYCOLOR,
    TEXTCOLOR7,
    BORDERCOLOR1,
    BORDERCOLOR4,
    THIRDCOLOR,
    BACKGROUNDWHITE,
    PRIMARYCOLOR,
    VALIDCOLOR,
    TEXTCOLOR10
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { CalenderLine, ClockLine } from '../../../../assets';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT PACKAGES
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

//IMPORT COMPONENTS
import TaskHeader from './TaskHeader';
import SuccessPopup from '../../ComingSoonPopup/Successpopup';
import ErrorPopup from '../../ComingSoonPopup/ErrorPopup';

//IMPORT REDUX COMPONENTS
import { CreateTaskClear } from '../../../redux/Slice/Task/CreateTaskKey';
import { getTaskCategory, OnCreateTask } from '../../../redux/Thunk/TaskThunk';



const CreateTask = ({ navigation, route }) => {

    const dispatch = useDispatch()
    const TitleRef = useRef();
    const DescRef = useRef();
    const StartRef = useRef();
    const EndRef = useRef();
    const TimeRef = useRef()
    const PhysicianRef = useRef();
    const AddressRef = useRef();
    const AppointmentRef = useRef();
    const TeamRef = useRef();

    const [Title, setTitle] = useState(null)
    const [Desc, setDesc] = useState(null)
    const [date, setDate] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [EndDate, setEndDate] = useState(null)
    const [Time, setTime] = useState(null)


    const [Address, setAddress] = useState(null)

    const [isStartPickerVisible, setStartPickerVisibility] = useState(false);
    const [isEndPickerVisible, setIsEndPickerVisibility] = useState(false);
    const [isTimePickerVisible, setIsTimePickerVisibility] = useState(false)
    const [TitleStatus, setTitleStatus] = useState(true)
    const [CategStatus, setCategStatus] = useState(true)
    const [DescStatus, setDescStatus] = useState(true)
    const [FreqStatus, setFreqStatus] = useState(true)

    const [StartStatus, setStartStatus] = useState(true)
    const [EndStatus, setEndStatus] = useState(true)
    const [TimeStatus, setTimeStatus] = useState(true)

    const [timeValue, setTimeValue] = useState(null)

    const [PhysicianStatus, setPhysicianStatus] = useState(true)
    const [AddStatus, setAddStatus] = useState(true)
    const [TeamStatus, setTeamStatus] = useState(true)
    const [NewDate, setNewDate] = useState(new Date())
    const [AppointmentStatus, setAppointmentStatus] = useState(true)
    const [asyncData, setAsyncData] = useState([])

    const [selectedOption, setSelectedOption] = useState(null);
    const [processedCategoryData, setProcessedCategoryData] = useState([]);

    const [ErrorModal,setErrorModal] = useState(false)
    const [SuccessModal,setSuccessModal] = useState(false)
    const [Message,setMessage] = useState(null)

    //To open Physician name
    const [valueP, setValueP] = useState(null)
    const [physician, setPhysicianNm] = useState([
        { label: 'Dr Yang', value: 'Dr Yang' },
        { label: 'Dr Mathew', value: 'Dr Mathew' },

    ]);

    //To open care team
    const [valueTeam, setValueTeam] = useState(null);
    const [Team, setTeam] = useState([
        { label: 'Betty M', value: 'Betty M' },
        { label: 'Ava Lounge', value: 'Ava Lounge' },

    ]);

    // Category 
    const [categValue, setCategValue] = useState(null)
    const [Category, setCategory] = useState([
        { label: 'Appointment', value: 'Appointment' },
        { label: 'Others', value: 'Others' }
    ])

    const { categoryData, categoryErrors, categoryLoading, createTaskData, createTaskError, createTaskLoading } = useSelector(
        state => ({
            categoryData: state.getTaskCategory.data,
            categoryErrors: state.getTaskCategory.error,
            categoryLoading: state.getTaskCategory.isLoading,
            createTaskData: state.createTask.data,
            createTaskError: state.createTask.error,
            createTaskLoading: state.createTask.isLoading

        }),
        shallowEqual
    );

    useEffect(() => {
        getData().then(data => {
            setAsyncData(data)
        
            getTaskCategory(data?.storedValue, dispatch) //CALLING THE CATEGORY API
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

    useEffect(() => { //MAP THE TASK CATEGORY BASED ON LABEL AND VALUE
        if (categoryData) {
            const processedData = categoryData?.task_categories?.map((item) => ({
                label: item.category,
                value: item.id
            }));
            setProcessedCategoryData(processedData);
        }
       // OnSubmitTask()
    }, [categoryData, categoryErrors, categoryLoading]);


    useEffect(() => { //FUNCTION CALLIBG AFTER CREATING THE TASK
        if (createTaskData) {
            setMessage('Task Created Successfully');
            setSuccessModal(true);
            setTimeout(() => {
                setSuccessModal(false);
                navigation.navigate('TaskDashboard')
            }, 1500);
            dispatch(CreateTaskClear());
        } else if (createTaskError) {
            setMessage('Task not created');
            setErrorModal(true);
            setTimeout(() => {
                setErrorModal(false);
            }, 1500);
            dispatch(CreateTaskClear());
        }
    }, [createTaskData, createTaskError]);

    

    const hideDatePicker = () => { //HIDE THE DATE PICKER
        setStartPickerVisibility(false);
        setIsEndPickerVisibility(false);
        setIsTimePickerVisibility(false);
        setStartStatus(true);
        setEndStatus(true);
        setTimeStatus(true);
    };

    const handleConfirm = (date) => { //SET THE DATE TO THE STATE
        const ConvertDate = moment(date).format('YYYY-MM-DD')
        console.warn("A date has been picked: ", ConvertDate);
        setStartDate(ConvertDate)
        hideDatePicker();
    };


    const handleEndDate = (date) => {  //SET THE END TIME
        const ConvertDate = moment(date).format('YYYY-MM-DD')
        console.warn("A date has been picked: ", ConvertDate);
        setEndDate(ConvertDate)
        hideDatePicker();
    };

    const handleTime = (date) => { //SET THE TIME TO THE STATE
        const ConvertDate = moment(date).format('hh:mm A')
        const TimeValue = moment(date).format('hh:mm:ss')
        console.warn("A date has been picked: ", ConvertDate);
        setTime(ConvertDate)
        setTimeValue(TimeValue)
        hideDatePicker();
    };

    //TITLE VALIDATION
    const handleTitleChange = (text) => {
        const isValidTitle = /^[A-Za-z.,0-9 ]{2,}$/.test(text);
        setTitleStatus(isValidTitle)
        setTitle(text);
    };



    //ADDRESS VALIDATION
    const handleAddressChange = (text) => {
        const isValidAddress = /^[A-Za-z1234567890 ,./-_()&@;:\s]{2,50}$/.test(text);
        setAddStatus(isValidAddress)
        setAddress(text);
    };

    //DESCRIPTION VALIDATION
    const handleDescChange = (text) => {
        const isValidDesc = /^[A-Za-z1234567890 ,./-_()&@;:\s]{2,50}$/.test(text);
        setDescStatus(isValidDesc)
        setDesc(text);
    };

    // FUNCTION FOR SELECTING FREQUENCY
    const handleOptionPress = (option) => {
        setSelectedOption(option);
        setFreqStatus(true)
    };

    const OnSubmitValidation = () => { // TO VALIDATE ALL THE FIELDS ARE FILLED AND CALLING THE API

        if (categValue == null) {
            setCategStatus(false)
        }
        // if (startDate == null) {
        //     setStartStatus(false)
        // }

        // if (EndDate== null && new) {
        //     setEndStatus(false)
        // }

        if (Time == null) {
            setTimeStatus(false)
        }

        if (selectedOption == null) {
            setFreqStatus(false)
        }

        // else if (categValue == 'Appointment' && valueP == null) {
        //     PhysicianRef?.current?.focus();
        //     setPhysicianStatus(false)
        // }

        if (Desc == null) {
            DescRef?.current.focus();
            setDescStatus(false)
        }
        else {
            CreateTask()

        }
    }

    const CreateTask = () => {
       
        OnCreateTask( //API FOR CREATING THE TASK
            asyncData?.patientData?.patient_id,
            categValue,
            startDate ? startDate : moment(NewDate).format('YYYY-MM-DD'), 
            timeValue, EndDate ? EndDate : moment(NewDate).format('YYYY-MM-DD'), 
            Desc, 
            selectedOption, 
            asyncData?.storedValue,
            dispatch)
    }


    return (

        <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'position'}
        style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <TaskHeader name={'New Task'} navigation={navigation} />

                    <View style={DEFAULTSTYLES.marginLeft}>
                        <Text style={styles.textField}>Task Category</Text>
                    </View>

                    <View style={styles.alignView}>
                        <Dropdown
                            style={[styles.textIn, { borderColor: CategStatus ? BORDERCOLOR1 : VALIDCOLOR }]}
                            placeholderStyle={styles.placeholderS}
                            itemTextStyle={styles.textArea}
                            selectedTextStyle={styles.textArea}
                            containerStyle={styles.dropView}
                            data={processedCategoryData}
                            search={false}
                            labelField="label"
                            valueField="value"
                            placeholder={''}
                            value={categValue}
                            showsVerticalScrollIndicator={false}
                            onChange={item => {
                              
                                setCategValue(item.value)
                                setCategStatus(true)
                            }}
                        />
                    </View>

                    <View style={styles.marginView}>
                        {!CategStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Task category is required</Text>
                        )}
                    </View>


                    <View style={styles.rowDate}>
                        <View style={[DEFAULTSTYLES.marginLeft, { marginBottom: GlobalSize(10) }]}>
                            <Text style={[styles.textField, { left: -2 }]}>Start Date</Text>


                            <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(2) }]}>
                                <View style={[styles.dateView, {
                                    flexDirection: 'row',
                                    borderColor: StartStatus ? BORDERCOLOR4 : VALIDCOLOR
                                }]}>
                                    <Text style={styles.dateText}>{startDate ? startDate :
                                        moment(NewDate).format('YYYY-MM-DD')}</Text>
                                    <View style={DEFAULTSTYLES.alignView}>
                                        <TouchableOpacity onPress={() => setStartPickerVisibility(true)}
                                            style={{ padding: 5 }}>
                                            <CalenderLine />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <View>
                                {!StartStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Start Date is required</Text>
                                )}
                            </View>

                        </View>


                        <View style={[DEFAULTSTYLES.marginLeft, { marginBottom: GlobalSize(10) }]}>
                            <Text style={styles.textField}>End Date</Text>


                            <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(2) }]}>
                                <View style={[styles.dateView, { flexDirection: 'row', borderColor: EndStatus ? BORDERCOLOR4 : VALIDCOLOR }]}>
                                    <Text style={styles.dateText}>{EndDate ? EndDate : moment(NewDate).format('YYYY-MM-DD')}</Text>
                                    <View style={DEFAULTSTYLES.alignView}>
                                        <TouchableOpacity onPress={() => setIsEndPickerVisibility(true)} style={{ padding: 5 }}>
                                            <CalenderLine />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View>
                                {!EndStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>End Date is required</Text>
                                )}
                            </View>
                        </View>

                    </View>

                    <View style={DEFAULTSTYLES.marginLeft}>
                        <Text style={styles.textField}>Time</Text>
                    </View>

                    <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(-2) }]}>
                        <View style={[styles.dateView, {
                            flexDirection: 'row', width: DEFAULTWIDTH * 0.88,
                            borderColor: TimeStatus ? BORDERCOLOR4 : VALIDCOLOR
                        }]}>
                            <Text style={styles.dateText}>{Time}</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TouchableOpacity onPress={() => setIsTimePickerVisibility(true)} style={{ padding: 5 }}>
                                    <ClockLine width={25} height={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {!TimeStatus && (
                        <View style={styles.marginView}>
                            <Text style={{ color: VALIDCOLOR }}>Time is required</Text>
                        </View>
                    )}

                    <View style={[DEFAULTSTYLES.marginLeft, { marginTop: GlobalSize(12) }]}>
                        <Text style={styles.textField}>Frequency</Text>
                    </View>

                    <View style={styles.rowFlex}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => handleOptionPress('1')}>

                                <View style={[styles.radioIcon, selectedOption == '1' && styles.radioIconSelected]}>
                                    {selectedOption == '1' && <View style={styles.radioBorder} />}
                                </View>
                            </TouchableOpacity>

                            <View style={{ marginTop: GlobalSize(7) }}>
                                <Text style={styles.textField}>Repeated</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => handleOptionPress('0')}>

                                <View style={[styles.radioIcon, selectedOption == '0' && styles.radioIconSelected]}>
                                    {selectedOption == '0' && <View style={styles.radioBorder} />}
                                </View>

                            </TouchableOpacity>

                            <View style={{ marginTop: GlobalSize(7) }}>
                                <Text style={styles.textField}>Once</Text>
                            </View>
                        </View>
                    </View>

                    {!FreqStatus && (
                        <View style={styles.marginView}>
                            <Text style={{ color: VALIDCOLOR }}>Frequency is required</Text>
                        </View>
                    )}
                    {/* 
                    {categValue == 'Appointment' &&
                        <>
                            <View style={DEFAULTSTYLES.marginLeft}>
                                <Text style={styles.textField}>Assign Physician</Text>
                            </View>
                            <View style={styles.alignView}>

                                <Dropdown
                                    style={[styles.textIn, { borderColor: PhysicianStatus ? BORDERCOLOR1 : VALIDCOLOR }]}
                                    placeholderStyle={styles.placeholderS}
                                    itemTextStyle={styles.textArea}
                                    selectedTextStyle={styles.textArea}
                                    containerStyle={styles.dropView}
                                    data={physician}
                                    search={false}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={''}
                                    value={valueP}
                                    showsVerticalScrollIndicator={false}
                                    onChange={item => {
                                        setValueP(item.value)
                                        setPhysicianStatus(true)
                                    }}
                                />
                            </View>

                            <View style={styles.marginView}>
                                {!PhysicianStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Physician is required</Text>
                                )}
                            </View>
                        </>} */}



                    <View style={[DEFAULTSTYLES.marginLeft, { marginTop: GlobalSize(5) }]}>
                        <Text style={styles.textField}>Description</Text>
                    </View>

                    <View style={styles.alignView}>
                        <TextInput
                            ref={DescRef}
                            value={Desc}
                            onChangeText={(text) => handleDescChange(text)}
                            style={[styles.textIn,
                            {
                                borderColor: DescStatus ? BORDERCOLOR1 : VALIDCOLOR,
                                height: DEFAULTHEIGHT * 0.12,
                                textAlignVertical: 'top'
                            }]} />
                    </View>

                    <View style={styles.marginView}>
                        {!DescStatus && (
                            <Text style={{ color: VALIDCOLOR }}>Description is required</Text>
                        )}
                    </View>

                    {/* {categValue == 'Appointment' &&
                        <>
                            <View style={DEFAULTSTYLES.marginLeft}>
                                <Text style={styles.textField}>Address</Text>
                            </View>

                            <View style={styles.alignView}>
                                <TextInput
                                    ref={AddressRef}
                                    value={Address}
                                    onChangeText={(text) => handleAddressChange(text)}
                                    style={[styles.textIn, { borderColor: AddStatus ? BORDERCOLOR1 : VALIDCOLOR }]} />
                            </View>


                            <View style={styles.marginView}>
                                {!AddStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Address is required</Text>
                                )}
                            </View>
                        </>} */}

                    {/* {categValue == 'Appointment' &&
                        <>
                            <View style={DEFAULTSTYLES.marginLeft}>
                                <Text style={styles.textField}>Assign Care Team Member or Support Member</Text>
                            </View>

                            <View style={styles.alignView}>

                                <Dropdown
                                    style={[styles.textIn, { borderColor: TeamStatus ? BORDERCOLOR1 : VALIDCOLOR }]}
                                    placeholderStyle={styles.placeholderS}
                                    itemTextStyle={styles.textArea}
                                    selectedTextStyle={styles.textArea}
                                    containerStyle={styles.dropView}
                                    data={Team}
                                    search={false}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={'Assign'}
                                    value={valueTeam}
                                    showsVerticalScrollIndicator={false}
                                    onChange={item => {
                                        setValueTeam(item.value)
                                        setTeamStatus(true)
                                    }}
                                />
                            </View>


                            <View style={styles.marginView}>
                                {!TeamStatus && (
                                    <Text style={{ color: VALIDCOLOR }}>Care team is required</Text>
                                )}
                            </View>
                        </>} */}

                    <DateTimePickerModal
                        isVisible={isStartPickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <DateTimePickerModal
                        isVisible={isEndPickerVisible}
                        mode="date"
                        onConfirm={handleEndDate}
                        onCancel={hideDatePicker}
                    />


                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleTime}
                        onCancel={hideDatePicker}
                    />
                </View>
            </ScrollView>

            <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal}
            />

            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal} />

            <View style={styles.buttonContainer}>
                
                <TouchableOpacity
                 style={styles.btnView} 
                 onPress={() => !createTaskLoading ? OnSubmitValidation() : console.log("")}>
                    <Text style={styles.textBtn}>Save Task</Text>
                    {createTaskLoading &&
                        <ActivityIndicator size={15} color={BACKGROUNDWHITE} style={{ marginLeft: GlobalSize(5) }} />}
                </TouchableOpacity>

                <View style={{ marginTop: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(15) }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: GlobalSize(5) }}>
                        <Text style={styles.textCancel}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
    },
    buttonContainer: {
        top: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 5,
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: GlobalSize(4),
    },
    rowDate:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: GlobalSize(22) 
    },
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(5),
    },
    rowFlex: {
        flexDirection: 'row',
        marginLeft: GlobalSize(10),
        marginBottom: GlobalSize(2)
    },
    placeholderS: {
        color: BORDERCOLOR4,
        fontSize: GlobalSize(12),
        fontFamily: FONTS.FontRegular
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    textField: {
        fontFamily: FONTS.FontMedium,
        fontWeight: '600',
        fontSize: GlobalSize(14),
        color: SECONDARYCOLOR,
        left: 2
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTWIDTH * 0.0,
        marginTop: DEFAULTWIDTH * 0.02
    },
    textIn: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.13,
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        backgroundColor: BACKGROUNDWHITE,
        paddingRight: GlobalSize(10)
    },
    dateView: {
        width: DEFAULTWIDTH * 0.4,
        height: DEFAULTWIDTH * 0.13,
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        alignItems: 'center',
        backgroundColor: BACKGROUNDWHITE,
        paddingRight: GlobalSize(10),
        justifyContent: 'space-between',
        marginBottom: DEFAULTWIDTH * 0.01,
        marginTop: DEFAULTWIDTH * 0.02
    },
    dateText: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        left: GlobalSize(-5)
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(12),
        color: THIRDCOLOR,
        fontWeight: '700'
    },
    marginView: {
        marginLeft: DEFAULTWIDTH * 0.06,
        marginBottom: GlobalSize(10),
        marginTop: GlobalSize(5)
    },
})
export default CreateTask;