import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  Alert
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import MainHeader from '../../../../Components/Common/Headers/MainHeader'
import * as Progress from 'react-native-progress';
import {
  BACKGROUNDWHITE,
  LINECOLOR1,
  POGRESSBARUNFILLEDCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
  SECONDARYCOLOR,
  TEXTCOLOR2,
  TEXTCOLOR8
} from '../../../../Constants/Colors/Colors';
import { Button, Card } from 'react-native-paper';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GetAssessmentAnswer, GetAssessmentQuest, UpdateAssessmentAnswer } from '../../../../redux/thunk';
import { setEditValue, setEnrollTitles, setFunctionaPageName, setTaskId, setTitleGroup, setTitleID, setValue } from '../../../../redux/Slice/ValueStorage/ValueSliceKey';
import { setQuestion } from '../../../../redux/Slice/Assessment/QuestionStoreKey';
import { AssessmentAnsClear } from '../../../../redux/Slice/Assessment/AssessmentAnswer';
import { useFocusEffect } from '@react-navigation/native';
import { UpdateAssessmentClear } from '../../../../redux/Slice/Assessment/UpdateAssessmentKey';

const EnrollmentProgress = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const [token, setToken] = useState(null)
  const [PatientData, setPatientData] = useState([])
  const [BasicInfo1, setBasicInfo1] = useState([])
  const [BasicInfo2, setBasicInfo2] = useState([])
  const [PersonalInfo, setPersonalInfo] = useState([])
  const [AboutCaregiver, setAboutCaregiver] = useState([])
  const [AboutPatient, setAboutPatient] = useState([])
  const [Caregiving1, setCaregiving1] = useState([])
  const [Caregiving2, setCaregiving2] = useState([])
  const [OpenEnd, setOpenEnd] = useState([])
  const [SDOH, setSDOH] = useState([])
  const [ADL, setADL] = useState([])
  const [TypeOfAssist, setTypeOfAssist] = useState([])
  const [CombinedData, setCombinedData] = useState([])
  const [IADL, setIADL] = useState([])
  const [Edit, setEdit] = useState(route?.params?.edit)
  const [MedAssistance, setMedAssistance] = useState([])
  const [MedTreat, setMedTreat] = useState([])
  const [Safety, setSafety] = useState([])


  const { assessmentData, assessmentError, assessmentisLoading, editValue,
    taskId, Titles, updateAssessmentData, updateAssessmentError, updateAssessmentLoading } = useSelector(
      state => ({
        assessmentData: state.AssessmentAns.data,
        assessmentError: state.AssessmentAns.error,
        assessmentisLoading: state.AssessmentAns.isLoading,
        taskId: state.getPageNameValue.task_Id,
        Titles: state.getPageNameValue.enroll_title,
        updateAssessmentData: state.UpdateAssessment.data,
        updateAssessmentError: state.UpdateAssessment.error,
        updateAssessmentLoading: state.UpdateAssessment.isLoading,
        editValue: state.getPageNameValue.editValue
      }),
      shallowEqual
    );

  // Define callback functions 
  const fetchDataAndDispatch = useCallback(() => {
    const titleNames = route?.params?.titleNames;
    setTimeout(() => {
      setEdit(route?.params?.edit)
    }, 2000)

    if (titleNames) {
      dispatch(setQuestion(titleNames.assessment_titles));
      dispatch(setValue(titleNames.assessment_titles));
      dispatch(setTaskId(titleNames.task_id));
      dispatch(setEnrollTitles(titleNames));
    }

    getData();
  }, [dispatch, route?.params?.titleNames, route?.params?.edit]);

  useFocusEffect(
    useCallback(() => {
      fetchDataAndDispatch();

      dispatch(setEditValue(route?.params?.edit))

      return () => {
        // Clean up logic if needed
      };
    }, [fetchDataAndDispatch])
  );

  // Initial effect
  useEffect(() => {
    fetchDataAndDispatch();
  }, [fetchDataAndDispatch]);


  useEffect(() => {

    if (assessmentData || updateAssessmentData) {

      navigation.navigate('AssessmentSummary', { titleNames: route?.params?.titleNames });
      dispatch(AssessmentAnsClear());
      dispatch(UpdateAssessmentClear())
      // RemoveData()
    }
    else if (assessmentError) {
      dispatch(AssessmentAnsClear());
      dispatch(UpdateAssessmentClear())
      console.log("error upload data...............", assessmentError);
    }
  }, [assessmentData, assessmentError, updateAssessmentData, updateAssessmentError, dispatch, navigation]);

  const getData = async () => {
    try {
      const PersonalInfo = await AsyncStorage.getItem('PERSONALINFO_ANSWERS');
      const AboutPatient = await AsyncStorage.getItem('ABOUTPATIENT_ANSWERS');
      const BasicInfo2 = await AsyncStorage.getItem('BASICINFO2_ANSWERS');
      const AboutCaregiver = await AsyncStorage.getItem('ABOUT_CAREGIVER_ANSWERS');
      const BasicInfo1 = await AsyncStorage.getItem('BASICINFO_ANSWERS');
      const SDOH = await AsyncStorage.getItem('SDOH_ANSWERS');
      const Caregiving1 = await AsyncStorage.getItem('CAREGIVINGSYLE_ANSWERS1');
      const Caregiving2 = await AsyncStorage.getItem('CAREGIVINGSYLE_ANSWERS2');
      const OpenEnd = await AsyncStorage.getItem('OPENEND_ANSWERS');
      const ADL = await AsyncStorage.getItem('ACTIVITIES_OF_DL')
      const ASSIST = await AsyncStorage.getItem('TYPEOFASSIST_ANSWERS')
      const IADL = await AsyncStorage.getItem('INST_DL')
      const MED_PROCEDURE = await AsyncStorage.getItem('MED_PROCEDURE')
      const MED_ASSISTANCE = await AsyncStorage.getItem('MED_ASSISTANCE')
      const SUPER_SAFETY = await AsyncStorage.getItem('SUPER_SAFETY')
     //const editValue = await AsyncStorage.setItem('EditValue')
     //.setEdit(editValue)

      if (MED_PROCEDURE !== null) {
        const myArray = JSON.parse(MED_PROCEDURE);
        setMedTreat(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (MED_ASSISTANCE !== null) {
        const myArray = JSON.parse(MED_ASSISTANCE);
        setMedAssistance(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (SUPER_SAFETY !== null) {
        const myArray = JSON.parse(SUPER_SAFETY);
        setSafety(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (IADL !== null) {
        const myArray = JSON.parse(IADL);
        setIADL(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (PersonalInfo !== null) {
        const myArray = JSON.parse(PersonalInfo);
        setPersonalInfo(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (BasicInfo1 !== null) {
        const myArray = JSON.parse(BasicInfo1);
        setBasicInfo1(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (BasicInfo2 !== null) {
        const myArray = JSON.parse(BasicInfo2);
        setBasicInfo2(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (AboutCaregiver !== null) {
        const myArray = JSON.parse(AboutCaregiver);
        setAboutCaregiver(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (AboutPatient !== null) {
        const myArray = JSON.parse(AboutPatient);
        setAboutPatient(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (SDOH !== null) {
        const myArray = JSON.parse(SDOH);
        setSDOH(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (Caregiving1 !== null) {
        const myArray = JSON.parse(Caregiving1);
        setCaregiving1(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (Caregiving2 !== null) {
        const myArray = JSON.parse(Caregiving2);
        setCaregiving2(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (OpenEnd !== null) {
        const myArray = JSON.parse(OpenEnd);
        setOpenEnd(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (ADL !== null) {
        const myArray = JSON.parse(ADL);
        setADL(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      if (ASSIST !== null) {
        const myArray = JSON.parse(ASSIST);
        setTypeOfAssist(myArray)
        // console.log("Options retrieved from AsyncStorage:", myArray);
      } else {
        console.log("No options data found in AsyncStorage for 'HealthAns'");
      }

      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      setToken(storedValue)
      const patientData = await AsyncStorage.getItem('PatientData');
      setPatientData(JSON.parse(patientData))

    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  const isButtonDisabled =
    PersonalInfo?.length > 0 &&
    AboutCaregiver?.length > 0 &&
    AboutPatient?.length > 0 &&
    BasicInfo1?.length > 0 &&
    BasicInfo2?.length > 0 &&
    SDOH?.length > 0 &&
    Caregiving1?.length > 0 &&
    Caregiving2?.length > 0 &&
    OpenEnd?.length > 0 &&
    ADL?.length > 0 &&
    TypeOfAssist?.length > 0

  const navigateToHome = () => { // COMBINE ALL DATA  INTO SINGLE ARRAY
    const CombinedArray =
      [...PersonalInfo,
      ...AboutPatient,
      ...AboutCaregiver,
      ...BasicInfo1,
      ...BasicInfo2,
      ...SDOH,
      ...Caregiving1,
      ...Caregiving2,
      ...OpenEnd,
      ...ADL,
      ...IADL,
      ...MedAssistance,
      ...MedTreat,
      ...Safety,
      ...TypeOfAssist]
    setCombinedData(CombinedArray)
    console.log(ADL)
    console.log("IADL....................", SDOH)
    console.log(TypeOfAssist)
    console.log("heloo.....................", OpenEnd)
    console.log(Caregiving1)
    console.log(Caregiving2)
    // console.log(SDOH)
    console.log(BasicInfo1)
    console.log(BasicInfo2)
    console.log(AboutCaregiver)
    console.log(AboutPatient)
    //console.log(ADL)
    // console.log("ISBUTTONDISABLED..................",isButtonDisabled,)
    // console.log("combined array................", CombinedArray,Edit)
    // console.log("patinet dta..............", PatientData?.patients[0]?.id)
    // if(!isButtonDisabled){
    if (Edit) {
      console.log("UPDATE ASSESSMENT.................", route?.params?.edit)
      UpdateAssessmentAnswer(PatientData?.patient_id, taskId, CombinedArray, token, dispatch)
    }
    else {
       GetAssessmentAnswer(PatientData?.patient_id, taskId, CombinedArray, token, dispatch)
    }
    //}

  };



  const NavigationScreen = (item) => {
    // Extract the title names into an array
    const title = Titles?.assessment_titles?.map((title) => title.title_name);
    const TitleId = Titles?.assessment_titles?.map((title) => title.title_id);

    // Set the title group in the Redux store
    dispatch(setTitleGroup(title?.flat()));
    dispatch(setTitleID(TitleId))
    // Set the functional page names in the Redux store
    dispatch(setFunctionaPageName(item?.page_names));
    console.log("itm.................", item?.title_id)
    // Use a switch statement to handle navigation based on the item's title_name
    switch (item?.title_id) {
      case 2:
        navigation.navigate('HealthChallengesMainScreen', {
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      case 4:
        navigation.navigate('SDOHSelection', {
          mainText: 'SDOH Assessment',
          pages: item?.page_names,
          selectedItems: item?.page_names,
          selectedQuest: item,
          titleGroup: title?.flat(),
          titleId: item?.title_id,
          IDGroup: TitleId
        });

        // navigation.navigate('EnrollmentStack', {screen :'LivingSitation'}, {
        //   mainText: 'SDOH Assessment',
        //   pages: item?.page_names,
        //   item: item,
        //   titleId: item?.title_id,
        //   IDGroup: TitleId
        // });
        break;
      case 3:
        navigation.navigate('FunctionalMain', {
          mainText: 'Ability to Help 1',
          pages: item?.page_names,
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      case 7:
        navigation.navigate('CareRecipientDemographics', {
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      case 6:
        navigation.navigate('CaregiverDemographics', {
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      case 1:
        navigation.navigate('CareRecipientDemographics', {
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      case 9:
        navigation.navigate('PersonalInfo', {
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      case 8:
        navigation.navigate('BasicInfo2', {
          item: item,
          titleGroup: title?.flat(),
          titleName: item?.title_name,
          titleId: item?.title_id,
          IDGroup: TitleId
        });
        break;
      default:
        console.log("Unhandled title_name:", item?.title_name);
        break;
    }
  };


  const RemoveData = () => { //REMOVE THE DATA FROM ASYNC
    AsyncStorage.removeItem('PERSONALINFO_ANSWERS');
    AsyncStorage.removeItem('ABOUTPATIENT_ANSWERS');
    AsyncStorage.removeItem('BASICINFO2_ANSWERS');
    AsyncStorage.removeItem('ABOUT_CAREGIVER_ANSWERS');
    AsyncStorage.removeItem('BASICINFO_ANSWERS');
    AsyncStorage.removeItem('SDOH_ANSWERS');
    AsyncStorage.removeItem('CAREGIVINGSYLE_ANSWERS1');
    AsyncStorage.removeItem('CAREGIVINGSYLE_ANSWERS2');
    AsyncStorage.removeItem('OPENEND_ANSWERS');
    AsyncStorage.removeItem('FUNCTIONAL_ABILITIES')
    AsyncStorage.removeItem('TYPEOFASSIST_ANSWERS')

    AsyncStorage.removeItem('BASIC_INFO_TWO')
    AsyncStorage.removeItem('ABOUT_PATIENT_DATA')
    AsyncStorage.removeItem('PERSONALINFO_ANSWERS')
    AsyncStorage.removeItem('DEMOGRAPHICS')
    AsyncStorage.removeItem('ABOUT_CAREGIVER')
    AsyncStorage.removeItem('SDOHARRAY')
    AsyncStorage.removeItem('ADLData')
    AsyncStorage.removeItem('ADLLabel')
    AsyncStorage.removeItem('MedLabel')
    AsyncStorage.removeItem('TreatLabel')
    AsyncStorage.removeItem('SafetyLabel')

    AsyncStorage.removeItem('LivingAnswer1')
    AsyncStorage.removeItem('LivingAnswer3')
    AsyncStorage.removeItem('LivingAnswer4')
    AsyncStorage.removeItem('LivingData2')

    AsyncStorage.removeItem('FoodValue1')
    AsyncStorage.removeItem('FoodValue2')

    AsyncStorage.removeItem('SafetyValue1')
    AsyncStorage.removeItem('SafetyValue2')
    AsyncStorage.removeItem('SafetyValue3')
    AsyncStorage.removeItem('SafetyValue4')

    AsyncStorage.removeItem('SubstanceValue1')
    AsyncStorage.removeItem('SubstanceValue2')
    AsyncStorage.removeItem('SubstanceValue3')
    AsyncStorage.removeItem('SubstanceValue4')

    AsyncStorage.removeItem('MobilityValue1')
    AsyncStorage.removeItem('MobilityValue2')

    AsyncStorage.removeItem('SocialState1')
    AsyncStorage.removeItem('SocialState2')
    AsyncStorage.removeItem('SocialState3')

    AsyncStorage.removeItem('HealthValue')
    AsyncStorage.removeItem('ScaleValue')
    AsyncStorage.removeItem('WorkValue')

    AsyncStorage.removeItem('MoreValue1')
    AsyncStorage.removeItem('MoreValue2')
    AsyncStorage.removeItem('MoreValue3')
    AsyncStorage.removeItem('MoreValue4')
    AsyncStorage.removeItem('MoreValue5')

    AsyncStorage.removeItem('Income1')
    AsyncStorage.removeItem('Income2')

    AsyncStorage.removeItem('OtherItem1')
    AsyncStorage.removeItem('OtherItem2')
    AsyncStorage.removeItem('OtherItem3')
    AsyncStorage.removeItem('OtherItem4')
    AsyncStorage.removeItem('OtherItem5')
    AsyncStorage.removeItem('OtherItem6')
    AsyncStorage.removeItem('OtherItem7')
    AsyncStorage.removeItem('LanguageOther')

    AsyncStorage.removeItem('MentalLabel1')
    AsyncStorage.removeItem('MentalLabel2')
    AsyncStorage.removeItem('MentalLabel3')
    AsyncStorage.removeItem('MentalLabel4')

    AsyncStorage.removeItem('MentalValue1')
    AsyncStorage.removeItem('MentalValue2')
    AsyncStorage.removeItem('MentalValue3')
    AsyncStorage.removeItem('MentalValue4')

    AsyncStorage.removeItem('EATLEVEL');
    AsyncStorage.removeItem('DRESSLEVEL');
    AsyncStorage.removeItem('BATHLEVEL');
    AsyncStorage.removeItem('TRANSFERLEVEL');
    AsyncStorage.removeItem('TOILLEVEL');
    AsyncStorage.removeItem('DENTALLEVEL');

    AsyncStorage.removeItem('TRANSPORTLEVEL');
    AsyncStorage.removeItem('GROCERYLEVEL');
    AsyncStorage.removeItem('OTHERSHOPLEVEL');
    AsyncStorage.removeItem('HOUSELEVEL');
    AsyncStorage.removeItem('SERVICELEVEL');
    AsyncStorage.removeItem('OUTSIDELEVEL');
    AsyncStorage.removeItem('EMPTYLEVEL');
    AsyncStorage.removeItem('GIVINGLEVEL');
    AsyncStorage.removeItem('PREPPLEVEL');
    AsyncStorage.removeItem('TUBELEVEL');
    AsyncStorage.removeItem('SKINLEVEL');
    AsyncStorage.removeItem('BLOODLEVEL');
    AsyncStorage.removeItem('MEDLEVEL');
    AsyncStorage.removeItem('MOBLEVEL');
    AsyncStorage.removeItem('VITALLEVEL');
    AsyncStorage.removeItem('NUTRILEVEL');
    AsyncStorage.removeItem('WOUNDLEVEL');
    AsyncStorage.removeItem('COMMLEVEL');
    AsyncStorage.removeItem('EMLEVEL');
    AsyncStorage.removeItem('ASSISTLEVEL');
    AsyncStorage.removeItem('CRISISLEVEL');
    AsyncStorage.removeItem('FALLLEVEL');
    AsyncStorage.removeItem('HOMELEVEL');
    AsyncStorage.removeItem('EDULEVEL')
    AsyncStorage.removeItem('HealthAns');
    AsyncStorage.removeItem('ReasonAnswers');
    AsyncStorage.removeItem('BigTextData');
    AsyncStorage.removeItem('MainTextData');
    AsyncStorage.removeItem('HealthCheck');
    AsyncStorage.removeItem('ReasonCheck');
    setADL([])
    setAboutCaregiver([])
    setAboutPatient([])
    setBasicInfo1([])
    setBasicInfo2([])
    setCaregiving1([])
    setCaregiving2([])
    setOpenEnd([])
    setSDOH([])

  }

console.log("edit value..................",Edit)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

      <MainHeader navigation={navigation} Home={true} RemoveData={RemoveData} />

      <ScrollView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }} showsVerticalScrollIndicator={false}>
        <View style={{ marginLeft: GlobalSize(10) }}>
          <Text style={styles.mainHeadingText}>Enrollment Progress</Text>
        </View>
        <View>
          <FlatList
            data={Titles?.assessment_titles}
            renderItem={({ item, index }) => {
              return (
                <View>
                  {item?.page_names?.length > 0 &&
                    <TouchableWithoutFeedback key={index}
                      onPress={() => NavigationScreen(item)}
                      style={{ margin: GlobalSize(10) }}>
                      <Card style={styles.cardStyle}>
                        <View style={styles.containerRow}>
                          <Text style={styles.headingText}>
                            {item?.title_name}
                          </Text>
                          <Text style={styles.subHeadingText}>{item?.completion_percentage == '0' ? 'Not Started' : item?.completion_percentage == '100' ? 'Complete' : 'Progressing'}</Text>
                        </View>

                        <Progress.Bar
                          progress={item?.completion_percentage?.toFixed(0) / 100}
                          width={null}
                          height={8}
                          color={PRIMARYCOLOR}
                          unfilledColor={POGRESSBARUNFILLEDCOLOR}
                          borderWidth={0}
                        />
                      </Card>
                    </TouchableWithoutFeedback>}

                </View>
              )
            }}
            keyExtractor={(item, index) => item.title_id.toString()}
          />
        </View>
      </ScrollView>


      <Button

        onPress={() => navigateToHome()} // Disable onPress when button is disabled
        //disabled={isButtonDisabled} // Pass the disable state to the button
        style={[
          styles.submitBtn, // Base styles for the button
          //  !isButtonDisabled ? styles.disabledButton : styles.enabledButton // Conditional styles
        ]}
      >
        <Text style={styles.submitText}>Save</Text>
      </Button>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  cardStyle: {
    padding: GlobalSize(20),
    borderRadius: 8,
    backgroundColor: PUREWHITE,
    margin: GlobalSize(10)
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: GlobalSize(20),
  },
  mainHeadingText: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(14),
    color: TEXTCOLOR8,
  },
  headingText: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(14),
    color: TEXTCOLOR2,
  },
  enabledButton: {
    // Styles when the button is enabled
    backgroundColor: SECONDARYCOLOR, // Blue color for enabled state
  },
  disabledButton: {
    opacity: 0.4,
    // Styles when the button is disabled
    backgroundColor: SECONDARYCOLOR, // Grey color for disabled state
  },
  subHeadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(14),
    color: TEXTCOLOR2,
  },
  submitBtn: {
    backgroundColor: SECONDARYCOLOR,
    borderRadius: 8,
    margin: GlobalSize(10),
  },
  submitText: {
    color: PUREWHITE,
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(12)
  },
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: GlobalSize(1),
    marginTop: GlobalSize(5),
    margin: DEFAULTWIDTH * 0.06,
    marginBottom: GlobalSize(20),
  },
});

export default EnrollmentProgress;
