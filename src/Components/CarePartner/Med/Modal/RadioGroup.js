import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TimePickerAndroid,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import {
  BORDERCOLOR4,
  GREYBACKGROUND1,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  SECONDARYCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR8,
  VALIDCOLOR,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import CustomTimePicker from '../../../Common/TimePicker/CustomTimePicker';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import moment from 'moment';
import { UpdateMedicationStatus } from '../../../../redux/Thunk/MedicationThunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SuccessPopup from '../../../ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../ComingSoonPopup/ErrorPopup';
import { MedicationTaskSubmitClear } from '../../../../redux/Slice/Medication/MedicationTaskSubmitKey';

const RadioButtonGroup = ({ onClose, onSave, navigation, TaskId }) => {

  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState(null);
  const [reason, setReason] = useState(null);
  const [otherTime, setOtherTime] = useState('');
  const [reasonStatus, setReasonStatus] = useState(true)
  const [PickerOpen, setPickerOpen] = useState(false)
  const [UserData, setUserData] = useState(null)

  const [Message, setMessage] = useState(null)
  const [ErrorModal, setErrorModal] = useState(false)
  const [SuccessModal, setSuccessModal] = useState(false)


  const { MedicationTaskSubmitData, MedicationTaskSubmitError, MedicationTaskSubmitIsLoading } = useSelector(
    state => ({
      MedicationTaskSubmitData: state.MedicationSubmitTask.data,
      MedicationTaskSubmitError: state.MedicationSubmitTask.error,
      MedicationTaskSubmitIsLoading: state.MedicationSubmitTask.isLoading
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
  }, [navigation]);


  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartner = await AsyncStorage.getItem('UserData');

      return {
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartner: carepartner != null ? JSON.parse(carepartner) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        carepartner: null
      };
    }
  };

  useEffect(() => {
    AfterTaskUpdate()
  }, [MedicationTaskSubmitData, MedicationTaskSubmitError,selectedOption])

  const AfterTaskUpdate = () => {
    if (MedicationTaskSubmitData && selectedOption !== null) {
      setMessage(MedicationTaskSubmitData?.status)
      setSuccessModal(true)
      setTimeout(() =>{
        setSuccessModal(false)
        dispatch(MedicationTaskSubmitClear())
        setSelectedOption(null)
        setReason(null)
        onClose()
        navigation.navigate('MedsTabScreen')
      },1500)
   
    }
    else if(MedicationTaskSubmitError && selectedOption !==null) {
      setMessage('Not updated your status')
      setErrorModal(true)
      setTimeout(() =>{
        setErrorModal(false)
        dispatch(MedicationTaskSubmitClear())
        setSelectedOption(null)

      },1500)
 
    }
  }

  const handleOptionChange = option => {
    setSelectedOption(option);
  };

  const handleReasonChange = text => {
    const isValidReason = /^[A-Za-z .,()\s]{2,}$/.test(text);
    setReasonStatus(isValidReason)
    setReason(text);
  };

  const onSubmitData = () => {
    if (selectedOption == '0' && reason || selectedOption !== '0' && selectedOption !== null) {
      onClose()
      // console.log("date change.......................", moment(date).format('MMMM D, YYYY h:mm A'))
      setSelectedOption(null)
      setReason(null)
    } else {

    }
  }

  const onSubmitStatus = () => {
    UpdateMedicationStatus(TaskId, UserData?.patientData?.patient_id, selectedOption, moment(new Date).format('YYYY-MM-DD hh:mm A'), UserData?.storedValue, dispatch)
  }



  return (
    <View style={styles.container}>

      <View style={{ marginBottom: DEFAULTHEIGHT * 0.1 }}>
        <View style={styles.radioBtnContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleOptionChange('0')}
              style={[styles.radioButtonStyle, { borderColor: selectedOption == '0' ? PRIMARYCOLOR : BORDERCOLOR4 }]}>
              {selectedOption === '0' && (
                <View style={styles.radioButtonSelected} />
              )}
            </TouchableOpacity>
            <Text style={styles.radioBtnText}>Skipped</Text>
          </View>
        </View>

        {/* {selectedOption == '0' && (
          <View style={[styles.input, { borderColor: reasonStatus ? BORDERCOLOR4 : VALIDCOLOR }]}>
            <TextInput
              placeholder="Enter reason"
              placeholderTextColor={BORDERCOLOR4}
              value={reason}
              multiline={true}
              // numberOfLines={4} // Adjust the number of lines according to your layout
              onChangeText={handleReasonChange}
              style={styles.textIns}
            />
          </View>
        )} */}
        {/* {!reasonStatus &&
          <View style={{ marginBottom: GlobalSize(10), marginLeft: GlobalSize(20) }}>
            <Text style={{ color: VALIDCOLOR }}>Please enter your reason</Text>
          </View>} */}

        <View style={styles.radioBtnContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleOptionChange('1')}
              style={[styles.radioButtonStyle, { borderColor: selectedOption == '1' ? PRIMARYCOLOR : BORDERCOLOR4 }]}>
              {selectedOption === '1' && (
                <View style={styles.radioButtonSelected} />
              )}
            </TouchableOpacity>
            <Text style={styles.radioBtnText}>On Time</Text>
          </View>
        </View>

        <View style={styles.radioBtnContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleOptionChange('2')}
              style={[styles.radioButtonStyle, { borderColor: selectedOption == '2' ? PRIMARYCOLOR : BORDERCOLOR4 }]}>
              {selectedOption === '2' && (
                <View style={styles.radioButtonSelected} />
              )}
            </TouchableOpacity>
            <Text style={styles.radioBtnText}>Just Now</Text>
          </View>
        </View>

        <View style={styles.radioBtnContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => handleOptionChange('5')}
              style={[styles.radioButtonStyle, { borderColor: selectedOption == '5' ? PRIMARYCOLOR : BORDERCOLOR4 }]}>
              {selectedOption === '5' && (
                <View style={styles.radioButtonSelected} />
              )}
            </TouchableOpacity>
            <Text style={styles.radioBtnText}>Other than above</Text>
          </View>
        </View>


        {/* {selectedOption === '5' && (
          // 
          // Generate a custom Datepicker here similar to the ios alarm time picker -
          // Wheel modal to scroll hours and minutes
          // Should be done on custom component / service step.
          // Component is already generated, <CustomTimePicker /> do the codng there
          <CustomTimePicker />

        )} */}
      </View>
      <TouchableOpacity
        onPress={onSubmitStatus}
        style={[styles.btnView,
        {
          opacity: selectedOption ? 1 : 0.5
        }]}>
        <Text
          style={styles.btnText}>
          SAVE
        </Text>
      </TouchableOpacity>

      <SuccessPopup
        Message={Message}
        ModalOpen={SuccessModal}
        setModalOpen={setSuccessModal}
      />

      <ErrorPopup
        Message={Message}
        ModalOpen={ErrorModal}
        setModalOpen={setErrorModal}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  input: {
    borderWidth: 1,
    height: DEFAULTHEIGHT * 0.1,
    width: DEFAULTWIDTH * 0.80,
    borderColor: BORDERCOLOR4,
    backgroundColor: GREYBACKGROUND1,
    borderRadius: GlobalSize(10),
    paddingLeft: GlobalSize(10),
    marginLeft: GlobalSize(18),
    marginBottom: DEFAULTHEIGHT * 0.01
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: GlobalSize(5),
    padding: GlobalSize(5),
    marginTop: GlobalSize(5),
  },
  textIns: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: TEXTCOLOR10,
  },
  radioButtonStyle: {
    backgroundColor: PUREWHITE,
    borderColor: BORDERCOLOR4,
    borderWidth: 1,
    width: GlobalSize(18),
    height: GlobalSize(18),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(15),
    marginRight: DEFAULTWIDTH * 0.03,
  },
  radioButtonSelected: {
    backgroundColor: PRIMARYCOLOR,
    width: GlobalSize(9),
    height: GlobalSize(9),
    borderRadius: GlobalSize(9),
    alignItems: 'center',
    justifyContent: 'center'
  },

  radioBtnContainer: {
    width: DEFAULTWIDTH * 0.8,
    marginBottom: DEFAULTHEIGHT * 0.02,
    justifyContent: 'center',
  },
  radioBtnText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
    color: TEXTCOLOR8,
  },

  btnText: {
    color: PUREWHITE,
    fontFamily: FONTS.FontBold,
    fontSize: fontSize(14),
  },
  pickView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnView: {
    alignItems: 'center',
    backgroundColor: PRIMARYCOLOR,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: GlobalSize(15),
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTHEIGHT * 0.06,
    borderRadius: GlobalSize(4),

  }
});

export default RadioButtonGroup;
