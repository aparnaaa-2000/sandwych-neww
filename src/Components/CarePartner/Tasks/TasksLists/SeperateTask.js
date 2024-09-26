import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';

//IMPORT CONSTANTS
import DEFAULTSTYLES, { DEFAULTHEIGHT,DEFAULTWIDTH,} from '../../../../Constants/styles/styles';
import {
  FOURTHCOLOR,
  MEDSITEMCOLOR1,
  MEDSITEMCOLOR2,
  MEDSITEMCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  SEVENTHCOLOR,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, width } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { Close, Walk } from '../../../../../assets';

//IMPORT COMPONENTS
import GoalsModal from '../Modal/GoalsModal';
import RadioButtonGroup from '../Modal/RadioButtonGroup';
import SuccessPopup from '../../../ComingSoonPopup/Successpopup';
import ErrorPopup from '../../../ComingSoonPopup/ErrorPopup';

import { UpdateTaskStatus } from '../../../../redux/thunk';

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SeperateTask = ({ task, day }) => {

  const dispatch = useDispatch()
  const [Message, setMessage] = useState(null)
  const [ErrorModal, setErrorModal] = useState(false)
  const [SuccessModal, setSuccessModal] = useState(false)

  const [taskStatus, setTaskStatus] = useState(null)
  const [textInputValue, setTextInputValue] = useState(null)

  const [selectedOption, setSelectedOption] = useState(null)
  const SVG = task.SVG;

  let badgeText, badgeColor, press;

  // In Switch case checking the stats to update the badge on top.
  // Additionally checking the day Today = 0, Yesterday = 1
  // badgeText - identifies the text which is shown in badge
  // badgecolor - indicates the color shown to badge
  // press - true - indicates the badge is disabled
  // press - false - indicates the badge can be pressed
  switch (task.status) {
    case 'upcoming':
      badgeText = 'Done?';
      (badgeColor = MEDSITEMCOLOR2), (press = false);
      break;
    case 'pending':
      badgeText = day == 1 ? 'Skipped' : 'Pending';
      badgeColor = FOURTHCOLOR;
      press = day == 1 ? true : false;
      break;
    case 'completed':
      badgeText = 'Done';
      badgeColor = SEVENTHCOLOR;
      press = true;
      break;
    default:
      badgeText = 'Done?';
  }

  const [isModalVisible, setModalVisible] = useState(false);
  const [asyncData, setAsyncData] = useState(null)

  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.UpdatetaskStatus.data,
      error: state.UpdatetaskStatus.error,
      //isLoading:state.UpdateTaskStatus.isLoading
    }),
    shallowEqual
  );

  useEffect(() => {
    getData().then(data => {
      setAsyncData(data)
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

  const toggleModal = () => { //OPEN ANND CLOSE THE MODAL
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    saveContent() //FUNCTION CALLING AFTER UPDATING THE SATUS
  }, [data, error])

  const saveContent = () => {
    if (data && taskStatus) {
      toggleModal()   
      setMessage('Task status updated successfully')
    
      setSuccessModal(true)
      setTimeout(() => {
        setSuccessModal(false)
        setTaskStatus(null)
        setTextInputValue(null)
      }, 1500)
    }
    if(error && taskStatus) {
      setMessage('Task not updated')
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
        setTaskStatus(null)
        setTextInputValue(null)
      }, 1500)
    }
    // write the function to post the status to api here from the data from RadioButton
  };

 

  const OnTaskUpdate = () => {
    UpdateTaskStatus( //UPDATE THE TASK STATUS TO THE API
      taskStatus,
      textInputValue,
      asyncData?.patientData?.patient_id, 
      task?.id,
      asyncData?.storedValue,
      dispatch)
  }

  const TaskModalHeader = () => (
    <View style={[DEFAULTSTYLES.modalHeader, { marginBottom: GlobalSize(10) }]}>
      <Text style={DEFAULTSTYLES.modalText}>Have you completed the task?</Text>
      <TouchableOpacity onPress={toggleModal}>
        <Close />
      </TouchableOpacity>
    </View>
  );

  const TaskModalItem = ({ task }) => (
    <View style={styles.modalmainContainer}>
      <View style={styles.iconContainer}>
        <Walk width={GlobalSize(30)} height={GlobalSize(30)} />
      </View>
      <View style={{ width: DEFAULTWIDTH * 0.6 }}>
        <Text style={styles.titleText}>{task.category_name}</Text>
        <Text style={styles.descText}>{task.description}</Text>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.mainContainer,
        Platform.OS === 'ios'
          ? DEFAULTSTYLES.iosShadow
          : DEFAULTSTYLES.androidShadow,
      ]}>
        {console.log("TASK IMAGE",task?.category_image )}
      <View style={styles.iconContainer}>
        {/* {task?.category_image ?
        <Image source={{ uri: task?.category_image }} style={{ width: GlobalSize(25), height: GlobalSize(25) }} />: */}
        <Walk width={GlobalSize(30)} height={GlobalSize(30)} /> 
      </View>
      <View style={{ width: DEFAULTWIDTH * 0.53 }}>
        <TouchableOpacity
          disabled={press}
          onPress={ task?.status == 1 || task?.status == 0 ? toggleModal : console.log("null")}
          style={[styles.doneButton, {
            backgroundColor: task?.status == 0 ? FOURTHCOLOR : task?.status == 1 ? FOURTHCOLOR :
              task?.status == 2 ? SEVENTHCOLOR : task?.status == 3 ?
                FOURTHCOLOR : task?.status == 4 ? FOURTHCOLOR : FOURTHCOLOR
          }]}>

          <Text style={styles.doneText}>{task?.status == 0 ? 'Upcoming' : task?.status == 1 ? 'Pending' :
            task?.status == 2 ? 'Done' : task?.status == 3 ?
              'Skipped' : task?.status == 4 ? 'Partially' : null}</Text>
        </TouchableOpacity>
        <Text style={styles.titleText}>{task.category_name}</Text>
        <Text style={styles.descText}>{task.description}</Text>
      </View>
      {/* <View style={styles.iconContainer}>
        <SVG width={GlobalSize(30)} height={GlobalSize(30)} />
      </View>
    */}
      {/* Reusing the component from the goals the child of each component is written seperately */}
      <GoalsModal isVisible={isModalVisible} onClose={toggleModal}>

        <TaskModalHeader />

        <TaskModalItem task={task} />

        <RadioButtonGroup
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          textInputValue={textInputValue}
          setTextInputValue={setTextInputValue}
          onClose={toggleModal}
          onSave={OnTaskUpdate}
          onGoing={1}
        />
      </GoalsModal>

      <ErrorPopup
        Message={Message}
        ModalOpen={ErrorModal}
        setModalOpen={setErrorModal}
      />

      <SuccessPopup
        Message={Message}
        ModalOpen={SuccessModal}
        setModalOpen={setSuccessModal} />

    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    //height: DEFAULTHEIGHT * 0.14,
    marginBottom: DEFAULTHEIGHT * 0.012,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(25),
    width: DEFAULTWIDTH * 0.7,
    paddingBottom: GlobalSize(10),
    paddingLeft: GlobalSize(20),
    paddingTop: GlobalSize(5),
    alignItems: 'center', justifyContent: 'center'
  },
  iconContainer: {
    backgroundColor: MEDSITEMCOLOR1,
    alignItems: 'center',
    justifyContent: 'center',
    width: DEFAULTWIDTH * 0.18,
    height: DEFAULTWIDTH * 0.18,
    alignSelf: 'center',
    marginTop: GlobalSize(5),
    borderRadius: GlobalSize(20),
    marginHorizontal: DEFAULTWIDTH * 0.02,
  },
  doneButton: {
    alignSelf: 'flex-end',
    backgroundColor: MEDSITEMCOLOR3,
    justifyContent: 'center',
    height: DEFAULTHEIGHT * 0.035,
    borderTopRightRadius: GlobalSize(25),
    borderBottomLeftRadius: GlobalSize(25),
    width: DEFAULTWIDTH * 0.18,
    alignItems: 'center',
    marginRight: GlobalSize(35)
  },
  doneText: {
    fontSize: GlobalSize(10),
    fontFamily: FONTS.FontSemiB,
    color: PUREWHITE,
  },
  titleText: {
    fontFamily: FONTS.FontBold,
    fontSize: GlobalSize(14),
    color: PRIMARYCOLOR,
  },
  descText: {
    fontFamily: FONTS.FontLight,
    fontSize: GlobalSize(12),
    color: PRIMARYCOLOR,
    maxWidth: width(150)
  },
  modalmainContainer: {
    flexDirection: 'row',
    //height: DEFAULTHEIGHT * 0.14,
    marginVertical: DEFAULTHEIGHT * 0.012,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(25),
    width: DEFAULTWIDTH * 0.9,
    borderWidth: 0.2,
    borderColor: PRIMARYCOLOR,
    padding: GlobalSize(8),
    alignItems: 'center'

  },
});

export default SeperateTask;
