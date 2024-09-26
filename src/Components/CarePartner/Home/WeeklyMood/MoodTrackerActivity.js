import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  Platform
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  BACKGROUNDWHITE,
  PUREWHITE,
  TEXTCOLOR2,
  BORDERCOLOR1,
  TEXTCOLOR10,
  VALIDCOLOR,
  PRIMARYCOLOR
} from '../../../../Constants/Colors/Colors';

import {
  BalancedFace,
  DarkGreenFace,
  GloomyFace,
  GreenFace,
  HappyFace,
  OrangeFace,
  PleasentFace,
  RedFace,
  SadFace,
  YellowFace,
} from '../../../../../assets';

import { Button, Card, Modal } from 'react-native-paper';
import MainHeader from '../../../Common/Headers/MainHeader';

import { FONTS } from '../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { AddPatientMood, GetActivityList } from '../../../../redux/thunk';
import { SvgUri } from 'react-native-svg';
import ErrorPopup from '../../../ComingSoonPopup/ErrorPopup';
import SuccessPopup from '../../../ComingSoonPopup/Successpopup';
import { addMoodClear } from '../../../../redux/Slice/MoodTracker/AddPatientMoodKey';

const MoodTrackerActivity = ({ navigation }) => {

  const dispatch = useDispatch()

  // Get the current date
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = currentDate.getDate();
  const textInputRef = useRef(null);
  // const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const [UserData, setUserData] = useState([]);
  const [Token, setToken] = useState(null)
  const [Message, setMessage] = useState(null)
  const [SuccessModal, setSuccessModal] = useState(false)
  const [ErrorModal, setErrorModal] = useState(false)
  const [selectedMood, setSelectedMood] = useState(''); // Initialize with an empty mood
  const [NoteStatus, setNoteStatus] = useState(true)
  const [visible, setVisible] = React.useState(false);
  const [description, setDescription] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleItemSelection = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);

    }
  };
  const { data, error, isLoading, moodCreateData, moodCreateError, moodCreateLoading } = useSelector(
    state => ({
      data: state.getActivity.data,
      error: state.getActivity.error,
      isLoading: state.getActivity.isLoading,
      moodCreateData: state.addPatientMood.data,
      moodCreateError: state.addPatientMood.error,
      moodCreateLoading: state.addPatientMood.isLoading
    }),
    shallowEqual
  );


  // useEffect(() => {
  //   getData().then(data => setUserData(data));
  // }, []);

  // useEffect(() => {
  //   ModalOpen_Redux();
  // }, [moodCreateData, moodCreateError])


  const getDataAndModalOpen = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      setToken(storedValue);
      GetActivityList(storedValue, dispatch);
      const carepartnerData = await AsyncStorage.getItem('UserData');
      const patientData = await AsyncStorage.getItem('PatientData');
      // ModalOpen_Redux();
      return {
        storedValue,
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

  useEffect(() => {
    getDataAndModalOpen().then((data) => {
      setUserData(data)
    })
  }, []);

  useEffect(() => {
    ModalOpen_Redux();
  }, [moodCreateData, moodCreateError, description, selectedMood, selectedItems]);

  const ModalOpen_Redux = () => {

    // Check if error is defined and has a status of 400
    if (moodCreateError && description) {
      console.log("error.................", moodCreateData, moodCreateError)
      setMessage('Patient data not recorded')
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
      }, 2000)
      dispatch(addMoodClear())

    } else if (moodCreateData && description && selectedMood && selectedItems) {
      setMessage(moodCreateData?.message)
      setVisible(false)
      setSuccessModal(true)
      setTimeout(() => {
        setSuccessModal(false)
        //navigation.navigate('EnrollmentStack',{screen:'LandingScreen'})
        navigation.navigate('MoodCalendar', { MOODVALUE: true, MOOD: description });
      }, 2000);
      dispatch(addMoodClear())
    }
  }

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      setToken(storedValue)
      GetActivityList(storedValue, dispatch)
      const jsonValue = await AsyncStorage.getItem('UserData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };


  const moveToCalendar = () => {
    console.log(UserData?.carepartnerData?.id)
    if (description) {
      AddPatientMood(
        UserData?.carepartnerData?.id,
        UserData?.patientData?.user_id,
        selectedMood,
        selectedItems,
        description,
        Token,
        dispatch)
    } else {
      setNoteStatus(false)
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleMoodSelect = mood => {
    setSelectedMood(mood);
  };

  //NOTE VALIDATION
  const handleNoteChange = (text) => {
    const isValid = /^[A-Za-z1234567890 ,./-_()&@;:\s]{2,50}$/.test(text);
    setNoteStatus(isValid)
    setDescription(text);
  };


  //Here all the mood Icons are defined according the selected
  const getIconComponent = (mood, isSelected) => {
    switch (mood) {

      case '0':
        return isSelected ? (
          <DarkGreenFace width={44} height={44} />
        ) : (
          <HappyFace width={40} height={40} />
        );
      case '1':
        return isSelected ? (
          <GreenFace width={44} height={44} />
        ) : (
          <PleasentFace width={40} height={40} />
        );
      case '2':
        return isSelected ? (
          <YellowFace width={44} height={44} />
        ) : (
          <BalancedFace width={40} height={40} />
        );
      case '3':
        return isSelected ? (
          <OrangeFace width={44} height={44} />
        ) : (
          <GloomyFace width={40} height={40} />
        );
      case '4':
        return isSelected ? (
          <RedFace width={44} height={44} />
        ) : (
          <SadFace width={40} height={40} />
        );

      default:
        return <SadFace width={26} height={26} />;
    }
  };

  console.log("MOOD ..................",data)

  return (
    <>
    
      {isLoading ?

        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View> :

        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={{ backgroundColor: BACKGROUNDWHITE }}
          showsVerticalScrollIndicator={false}>



          <View style={styles.mainContainer}>

            <MainHeader navigation={navigation} />

            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                {month} {day}, {year}
              </Text>
            </View>
            <View>
              <Text style={styles.subHeading}>Select Mood</Text>
            </View>
            <View
              style={styles.moodView}>
              <TouchableOpacity onPress={() => handleMoodSelect('0')}>
                {getIconComponent('0', selectedMood === '0')}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('1')}>
                {getIconComponent('1', selectedMood === '1')}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('2')}>
                {getIconComponent('2', selectedMood === '2')}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('3')}>
                {getIconComponent('3', selectedMood === '3')}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('4')}>
                {getIconComponent('4', selectedMood === '4')}
              </TouchableOpacity>
              {/* Repeat the above pattern for other moods */}
            </View>
            <View>
              <Text style={{ color: TEXTCOLOR2 }}>What has {UserData?.patientData?.name} done today? Select all that apply:</Text>
            </View>
            <View>

              <View style={{ flex: 1 }}>
                <View style={styles.container}>
                  {data?.data.map(item => {

                    return (
                      <Card
                        key={item.id}
                        style={[
                          styles.card,
                          //   selectedItems.includes(item.id) && styles.selectedCard,
                        ]}>
                        <TouchableOpacity
                          onPress={() => toggleItemSelection(item.id)}
                          style={[
                            styles.cardView,
                            selectedItems.includes(item.id) && styles.selectedCard,
                          ]}>
                          <View style={{ marginTop: -10 }}>
                            <SvgUri
                              uri={item.image}
                              width={GlobalSize(30)}
                              height={GlobalSize(30)}
                            />
                          </View>
                          <Text
                            style={[
                              styles.cardText,
                              // selectedItems.includes(item.id) && { color: PUREWHITE },
                            ]}>
                            {item?.activity_name}
                          </Text>

                          {/* <Card.Content></Card.Content> */}
                        </TouchableOpacity>
                      </Card>
                    )
                  })}
                </View>
                <Button
                  disabled={selectedItems.length != 0 && selectedMood ? false : true}
                  onPress={showModal}
                  style={[
                    selectedItems.length != 0 && selectedMood
                      ? styles.buttonStyleActive
                      : styles.buttonStyle,
                  ]}>
                  <Text
                    style={[
                      { fontFamily: 'Inter-Medium', fontSize: fontSize(14) },
                      { color: selectedItems.length != 0 && selectedMood ? PUREWHITE : '#CAD1D8' },
                    ]}>
                    Continue
                  </Text>
                </Button>
              </View>
              {/* <SelectionComponent /> */}
            </View>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              style={DEFAULTSTYLES.alignView}
            // style={{width: '100%', height: 150}}
            >
              <KeyboardAvoidingView style={{ flex: 0 }} behavior={Platform.OS == 'ios' ? 'height' : 'position'}>
                <View
                  style={styles.modalView}>
                  <Text style={styles.textNote}>
                    Add Note for Today's Mood
                  </Text>
                  <View style={[styles.viewInput, { borderColor: NoteStatus ? BORDERCOLOR1 : VALIDCOLOR }]}>
                    <TextInput
                      autoFocus={true}
                      value={description}
                      onChangeText={(text) => handleNoteChange(text)}
                      numberOfLines={10}
                      multiline
                      style={styles.textStyle}
                    />
                  </View>

                  {!NoteStatus &&
                    <View>
                      <Text style={{ color: VALIDCOLOR, fontSize: fontSize(12) }}>Please add your note</Text>
                    </View>}
                  <Button
                    style={[styles.buttonStyleActive, { flexDirection: 'row' }]}
                    onPress={() => moveToCalendar()}>
                    <Text
                      style={styles.textSave}>
                      Save
                    </Text>
                    {moodCreateLoading &&
                      <ActivityIndicator size={20} color={PUREWHITE} />}
                  </Button>
                </View>
              </KeyboardAvoidingView>
            </Modal>
          </View>

          <ErrorPopup
            Message={Message}
            ModalOpen={ErrorModal}
            setModalOpen={setErrorModal} />

          <SuccessPopup
            Message={Message}
            ModalOpen={SuccessModal}
            setModalOpen={setSuccessModal} />
        </ScrollView>}
    </>
  );
};

const styles = new StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: GlobalSize(10),
  },
  card: {
    width: DEFAULTWIDTH * 0.2,
    height: 80,
    // borderWidth: 0.5,
    backgroundColor: PUREWHITE,
    margin: 5,
    borderColor: 'lightgray',
    borderRadius: 6,
  },
  modalView: {
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.96,
    // alignItems:'center',
    //justifyContent:'center',
    borderRadius: GlobalSize(25),
    padding: GlobalSize(20)
  },
  cardView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    color: PUREWHITE,
  },
  cardText: {
    fontSize: fontSize(11),
    position: 'absolute',
    bottom: 10,
    color: TEXTCOLOR2
  },
  loadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: PRIMARYCOLOR,
    borderRadius: 6,
    // Change to your desired highlight color
  },
  viewInput: {
    width: DEFAULTWIDTH * 0.85,
    height: DEFAULTWIDTH * 0.50,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    backgroundColor: PUREWHITE,
    marginTop: GlobalSize(10),
    marginBottom: GlobalSize(5)
  },
  textNote: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(18),
    color: TEXTCOLOR2
  },
  textStyle: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
    top: Platform.OS == 'android' ? -70 :0,
    paddingTop: 10,
    left: -5
  },
  mainContainer: {
    // width: '100%',
    //height: '100%',
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    padding: 10,
  },
  moodView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  subContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(20),
    color: TEXTCOLOR10,
  },
  subHeading: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    color: TEXTCOLOR10,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#CAD1D8',
    borderRadius: 8,
  },
  buttonStyleActive: {
    width: '100%',
    height: 40,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 8,
    marginTop: GlobalSize(15),
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default MoodTrackerActivity;