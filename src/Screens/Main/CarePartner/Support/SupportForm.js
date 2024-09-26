import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { BACKGROUNDWHITE, FOURTHCOLOR, PLACEHOLDERCOLOR2, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR13, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import { fontSize, GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'
import { CalendarBlack, ClockLine, GreyInfo } from '../../../../../assets'
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ErrorPopup from '../../../../Components/ComingSoonPopup/ErrorPopup'
import { ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SupportRequestForm } from '../../../../redux/Thunk/SupportThunk'

const SupportForm = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const support_id = route?.params?.support_id;
  const [Location, setLocation] = useState(null)
  const [ScheduleDate, setScheduleDate] = useState()
  const [ScheduleTime, setScheduleTime] = useState()
  const [Note, setNote] = useState(null)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [isTimePickerVisible, setTimePickerVisible] = useState(false)
  const [TooltipOpen, setTooltipOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [ErrorModal, setErrorModal] = useState(false)
  const [Message, setMessage] = useState(null)

  const { data, errors, Loading } = useSelector(
    state => ({
      data: state.getSupportMemberList.data,
      errors: state.getSupportMemberList.error,
      Loading: state.getSupportMemberList.isLoading
    }),
    shallowEqual
  );

  useEffect(() => {
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

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const ConvertDate = moment(date).format('YYYY-MM-DD')
    setScheduleDate(ConvertDate)
    hideDatePicker();
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false)
  }

  const handleTimeConfirm = (time) => {
    const convertTime = moment(time).format('hh:mm A')
    setScheduleTime(convertTime)
    hideTimePicker()
  }

  const OnRequestSupport = () => {
    if (ScheduleDate && ScheduleTime && Note && Location) {
      SupportRequestForm(support_id, userData?.patientData?.patient_id, ScheduleDate, ScheduleTime, Note, zipcode, Location, userData?.storedValue, dispatch)
    }
  }

  useEffect(() => {
    if (Location && ScheduleDate && ScheduleTime && Note && zipcode) {
      OnSupportList()
    }
  }, [data, errors])

  const OnSupportList = () => {
    if (data && Location && ScheduleDate && ScheduleTime && Note && zipcode) {
      navigation.navigate('SupportPersonList', {
        support_id: support_id,
        patient_id: userData?.patientData?.patient_id,
        ScheduleDate: ScheduleDate,
        ScheduleTime: ScheduleTime,
        Note: Note,
        zipcode: zipcode,
        Location: Location,
        support_members: data?.support_members
      })
    } else if (errors && Location && ScheduleDate && ScheduleTime && Note && zipcode) {
      setMessage('Currently No support members found for the requested support.')
      setErrorModal(true)
      setTimeout(() => {
        setErrorModal(false)
      }, 2000)
    }
  }

  console.log("eroor................",errors)
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
      <ResourceHeader title={'Support Request'} navigation={navigation} />

  
  <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: GlobalSize(15) }}>
            <Text style={[styles.textCatg, { marginLeft: GlobalSize(20) }]}>Address</Text>
            <View style={DEFAULTSTYLES.alignView}>
              <TextInput
                value={Location}
                onChangeText={(text) => setLocation(text)}
                multiline
                style={[styles.textInput, { height: GlobalSize(100),textAlignVertical:'top',paddingTop:GlobalSize(10)}]} />
            </View>
          </View>

          <View style={{ marginBottom: GlobalSize(15) }}>
            <Text style={[styles.textCatg, { marginLeft: GlobalSize(20) }]}>Zipcode</Text>
            <View style={DEFAULTSTYLES.alignView}>
              <TextInput
                value={zipcode}
                onChangeText={(text) => setZipcode(text)}
                style={styles.textInput} />
            </View>
          </View>

          <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
            <Text style={[styles.textCatg, { left: -15 }]}>Scheduled Date</Text>
            <Text style={[styles.textCatg, { left: -25 }]}>Scheduled Time</Text>
          </View>

          <View style={[styles.rowTitle, { marginBottom: GlobalSize(15) }]}>
            <View style={styles.border}>
              <Text style={[styles.textCatg, { marginBottom: 0 }]}>{ScheduleDate}</Text>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <CalendarBlack width={16} height={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.border}>
              <Text style={[styles.textCatg, { marginBottom: 0 }]}>{ScheduleTime}</Text>
              <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
                <ClockLine width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: GlobalSize(20) }}>
              <Text style={[styles.textCatg, { marginLeft: GlobalSize(20) }]}>Note</Text>
              <TouchableOpacity onPress={() => setTooltipOpen(!TooltipOpen)}>
                <GreyInfo width={25} height={25} />
              </TouchableOpacity>
            </View>

            <View style={DEFAULTSTYLES.alignView}>
              <TextInput
                value={Note}
                multiline
                onChangeText={(text) => setNote(text)}
                style={[styles.textInput, 
                { 
                  height: GlobalSize(100),
                 textAlignVertical: 'top',
                 paddingTop:GlobalSize(10) }]} />
            </View>

            {TooltipOpen && (
              <View style={styles.viewTooltip}>
                <Text style={styles.textDesc}>Please add required Information for your request.</Text>
              </View>
            )}
          </View>

  
          </KeyboardAwareScrollView>

        <View style={[DEFAULTSTYLES.alignView, { marginBottom: GlobalSize(20) }]}>
            <TouchableOpacity
              style={[styles.touchBtn, { opacity: Location && ScheduleDate && ScheduleTime && Note && zipcode ? 1 : 0.5 }]}
              onPress={OnRequestSupport}
              disabled={!(Location && ScheduleDate && ScheduleTime && Note && zipcode)}>
              <Text style={styles.textBtn}>Submit</Text>
              {Loading && <ActivityIndicator size={20} color={PUREWHITE} />}
            </TouchableOpacity>
          </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />

        <ErrorPopup
          Message={Message}
          ModalOpen={ErrorModal}
          setModalOpen={setErrorModal}
        />

    </SafeAreaView>
  )
}

export default SupportForm

const styles = StyleSheet.create({
  touchBtn: {
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: GlobalSize(14),
    margin: GlobalSize(7),
    marginBottom: GlobalSize(10),
    width: DEFAULTWIDTH * 0.88,
    flexDirection: 'row'
  },
  textBtn: {
    fontSize: fontSize(14),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
    marginRight: GlobalSize(5)
  },
  textCatg: {
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    marginBottom: GlobalSize(10)
  },
  textInput: {
    color: TEXTCOLOR10,
    fontSize: fontSize(12),
    borderWidth: 1,
    borderColor: PLACEHOLDERCOLOR2,
    width: DEFAULTWIDTH * 0.88,
    borderRadius: GlobalSize(5),
    padding: GlobalSize(12)
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: GlobalSize(20),
    marginRight: GlobalSize(20)
  },
  border: {
    borderWidth: 1,
    borderColor: PLACEHOLDERCOLOR2,
    width: DEFAULTWIDTH * 0.42,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: GlobalSize(50),
    borderRadius: GlobalSize(5),
    alignItems: 'center',
    padding: GlobalSize(10)
  },
  viewTooltip: {
    width: DEFAULTWIDTH,
    borderRadius: GlobalSize(10),
    borderColor: FOURTHCOLOR,
    width: DEFAULTWIDTH * 0.88,
    borderWidth: 1,
    padding: GlobalSize(10),
    margin: GlobalSize(5),
    marginLeft: GlobalSize(20)
  },
  textDesc: {
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR13
  },
})
