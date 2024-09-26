import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native'

//IMPORT CONSTANTS
import {
    BACKGROUNDWHITE,
    BORDERCOLOR4,
    BOTTOMTABTEXT1,
    PRIMARYCOLOR,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLOR7,
    TEXTCOLORRS
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { CalendarBlack, ClockLine } from '../../../../../assets';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'

//IMPORT REDUX COMPONENTS
import { ResourceRequestForm } from '../../../../redux/Thunk/ResourceThunk'
import { ResourceRequestClear } from '../../../../redux/Slice/Resources/ResourceRequestKey'

//IMPORT THIRD-PARTY PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';


const FilterResource = ({ navigation, route }) => {

    const SubCategValue = route?.params?.SubCategValue

    const dispatch = useDispatch()

    const [PriorityData, setPriorityData] = useState([
        { label: 'Low', value: '2' },
        { label: 'Moderate', value: '1' },
        { label: 'High', value: '0' },
    ]);
    const [userData, setUserData] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const [ContactNum, setContactNum] = useState(null)
    const [Address, setAddress] = useState(null)
    const [Date, setDate] = useState(null)
    const [Time, setTime] = useState(null)
    const [Zipcode, setZipcode] = useState(null)
    const [Priority, setPriority] = useState(null)
    const [Note, setNote] = useState(null)
    const [ErrorModal, setErrorModal] = useState(false)

    const { resourceData, resourceError, resourceLoading } = useSelector(
        state => ({
            resourceData: state.ResourceRequest.data,
            resourceError: state.ResourceRequest.error,
            resourceLoading: state.ResourceRequest.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData();
            setUserData(data)
        };
        // Fetch data when the component mounts and when `token` changes
        fetchData();

        // Add event listener for focus event
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData(); // Call API when screen is focused
        });

        // Clean up event listener
        return () => {
            unsubscribe();
        };
    }, [navigation]); // Add token if it's a dependency

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');
            const carepartnerData = await AsyncStorage.getItem('UserData');

            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
                carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                storedValue: null,
                patientData: null,
                carepartnerData: null
            };
        }
    };

    useEffect(() => { // FUNCTION FOR FETCH THE API UPDATEAFTER SUBMISSION
        FetchResource()
    }, [resourceData, resourceError])


    const FetchResource = () => {
        if (resourceData && SubCategValue && Note) {
            navigation.navigate('ResourceList', {
                resourceData: resourceData,
                SubCategValue: SubCategValue,
                patient_id: userData?.patientData?.patient_id,
                Date: Date,
                Time: Time,
                Note: Note,
                Zipcode: Zipcode,
                Address: Address,
                ContactNum: ContactNum,
                Priority: Priority,
                Token: userData?.storedValue
            })
            dispatch(ResourceRequestClear())
        }
        else if (resourceError && SubCategValue && Note) {
            setErrorModal(true)

            setTimeout(() => {
                setErrorModal(false)
                dispatch(ResourceRequestClear())
            }, 1500)
        }
    }

    const handleConfirmDate = (date) => { //FUNCTION FOR SET THE DATE
        const ConvertDate = moment(date).format('YYYY-MM-DD')
        setDate(ConvertDate)
        setDatePickerVisibility(false)
    };

    const showDatePicker = () => { //FUNCTION FOR OPEN THE DATE PICKER
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => { // FUNCTION FOR CLOSE THE PICKER
        setDatePickerVisibility(false);
    };

    const handleConfirmTime = (date) => { //FUNCION FOR SET THE TIME
        const ConvertTime = moment(date).format('hh:mm A')
        setTime(ConvertTime)
        setTimePickerVisibility(false)
    };

    const showTimePicker = () => { //FUNCTION FOR OPEN THE TIME PICKER
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => { //FUNCTION FOR CLOSE THE TIME PICKER
        setTimePickerVisibility(false);
    };


    const FilterSubmit = () => { //FUNCTION FOR PASSING THE DATA INTO API
        if (ContactNum && Address && Date && Time && Zipcode && Time && Priority && Note) {
            ResourceRequestForm(
                SubCategValue,
                userData?.patientData?.patient_id,
                Date,
                Time,
                Note,
                Zipcode,
                Address,
                ContactNum,
                Priority,
                userData?.storedValue,
                dispatch)
        }
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
             
                    <ResourceHeader navigation={navigation} title={'Filter resources'} />
                    <View style={{ padding: GlobalSize(15) }}>

                        <View style={styles.cardView}>
                            <Text style={styles.textCatg}>Contact Number</Text>

                            <View>
                                <TextInput
                                    style={styles.viewCateg}
                                    value={ContactNum}
                                    keyboardType='number-pad'
                                    onChangeText={(text) => setContactNum(text)} />
                            </View>
                        </View>


                        <View style={styles.cardView}>
                            <Text style={styles.textCatg}>Address</Text>

                            <View>
                                <TextInput
                                    style={[styles.viewCateg, {
                                        height: GlobalSize(80),
                                        alignItems: 'flex-start',
                                        textAlignVertical: 'top',
                                        paddingTop:GlobalSize(10)
                                    }]}
                                    value={Address}
                                    multiline
                                    onChangeText={(text) => setAddress(text)} />
                            </View>
                        </View>

                        <View style={styles.row}>

                            <View style={styles.cardView}>
                                <Text style={styles.textCatg}>Date</Text>


                                <View style={[styles.viewCateg,
                                styles.row, {
                                    width: DEFAULTWIDTH * 0.4,
                                    alignItems: 'center'
                                }]}>
                                    <Text style={styles.textDate}>{Date}</Text>

                                    <TouchableOpacity onPress={() => showDatePicker()}>
                                        <CalendarBlack width={20} height={20} />
                                    </TouchableOpacity>

                                </View>


                            </View>


                            <View style={styles.cardView}>
                                <Text style={styles.textCatg}>Time</Text>

                                <View style={[styles.viewCateg,
                                styles.row, {
                                    width: DEFAULTWIDTH * 0.4,
                                    alignItems: 'center'
                                }]}>
                                    <Text style={styles.textDate}>{Time}</Text>

                                    <TouchableOpacity onPress={() => showTimePicker()}>
                                        <ClockLine width={22} height={22} />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.cardView}>
                                <Text style={styles.textCatg}>Zipcode</Text>

                                <View>
                                    <TextInput
                                        style={[styles.viewCateg, { width: DEFAULTWIDTH * 0.42 }]}
                                        value={Zipcode}
                                        keyboardType='number-pad'
                                        onChangeText={(text) => setZipcode(text)} />
                                </View>
                            </View>

                            <View style={[styles.cardView, { marginBottom: GlobalSize(15) }]}>
                                <Text style={styles.textCatg}>Priority</Text>

                                <View>
                                    <Dropdown
                                        style={styles.dropDnContainer}
                                        placeholderStyle={styles.placeholderS}
                                        itemTextStyle={styles.textArea}
                                        selectedTextStyle={styles.textArea}
                                        containerStyle={styles.dropView}
                                        data={PriorityData}
                                        showsVerticalScrollIndicator={false}
                                        search={false}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={'Select'}
                                        value={Priority}
                                        onChange={item => {
                                            setPriority(item.value)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.cardView}>
                            <Text style={styles.textCatg}>Note</Text>
                        </View>
                        <View style={DEFAULTSTYLES.alignView}>
                            <TextInput
                                multiline
                                style={[styles.viewCateg, {
                                    height: GlobalSize(80),
                                    alignItems: 'flex-start',
                                    textAlignVertical: 'top',
                                    paddingTop:GlobalSize(10)
                                }]}
                                value={Note}
                                onChangeText={(text) => setNote(text)} />
                        </View>

                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                <TouchableOpacity
                    style={[styles.btnView,
                    { opacity: ContactNum && Address && Date && Time && Zipcode && Priority && Note ? 1 : 0.5 }]}
                    onPress={() => FilterSubmit()}>
                    <Text style={styles.textBtn}>Apply</Text>
                    {resourceLoading &&
                        <ActivityIndicator size={20} color={PUREWHITE} />}
                </TouchableOpacity>
            </View>

    
                </KeyboardAwareScrollView>
        

 

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
            />

            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
            />

            <ErrorPopup
                Message={'Resources are Not available'}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal} />

        </SafeAreaView>
    )
}

export default FilterResource

const styles = StyleSheet.create({
    textFilter: {
        color: TEXTCOLOR10,
        fontSize: fontSize(18),
        fontFamily: FONTS.FontMedium
    },
    textDate: {
        color: TEXTCOLOR10,
    },
    textCatg: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        marginBottom: GlobalSize(10)
    },
    cardView: {
        marginLeft: GlobalSize(10)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: GlobalSize(10)
    },
    viewCateg: {
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        borderRadius: 8,
        width: DEFAULTWIDTH * 0.86,
        padding: GlobalSize(10),
        marginBottom: GlobalSize(15),
        color: TEXTCOLOR10,
        height: GlobalSize(50)
    },
    inputCateg: {
        color: TEXTCOLORRS,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(15)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.86,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        flexDirection: 'row'
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
        marginRight: GlobalSize(10)
    },
    viewPost: {
        position: 'absolute',
        bottom: GlobalSize(20),
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
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
    dropDnContainer: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.42,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        height: GlobalSize(50)
    },
    dropView: {
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.42,
        padding: GlobalSize(5),
    },
})