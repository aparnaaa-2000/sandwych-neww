import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

//COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR5,
  BOTTOMTABTEXT1,
  LINECOLOR1,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR8,
  BORDERCOLOR4
} from '../../../../../Constants/Colors/Colors';

import { FONTS } from '../../../../../Constants/Fonts';

//COMPONENTS
import FamilyHome from '../../../../../Components/CarePartner/Assessments/SDOH/Family&Home';
import MoneyResources6 from '../../../../../Components/CarePartner/Assessments/SDOH/Money&R6';
import Personal from '../../../../../Components/CarePartner/Assessments/SDOH/Personal';
import SocialCommunity from '../../../../../Components/CarePartner/Assessments/SDOH/Social&Community';
import OptionalQ from '../../../../../Components/CarePartner/Assessments/SDOH/Optional';

import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import LivingSituation from '../../../../../Components/CarePartner/Assessments/SDOH/LivingSituation';
import Food from '../../../../../Components/CarePartner/Assessments/SDOH/Food';
import Safety from '../../../../../Components/CarePartner/Assessments/SDOH/Safety';
import HealthSafety from '../../../../../Components/CarePartner/Assessments/SDOH/Health&Safety';
import MobilityAccess from '../../../../../Components/CarePartner/Assessments/SDOH/Mobility&Access';
import SubstanceUse from '../../../../../Components/CarePartner/Assessments/SDOH/SubstanceUse';

import MoreAbout from '../../../../../Components/CarePartner/Assessments/SDOH/MoreAbout';
import MentalHealthScreening from '../../../../../Components/CarePartner/Assessments/SDOH/MentalHealthScreening';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import Income from '../../../../../Components/CarePartner/Assessments/SDOH/Income';
import Supplemental from '../../../../../Components/CarePartner/Assessments/SDOH/Supplemental';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ValidationModal from '../../../../../Components/Forms/LoginScreen/ValidationModal';
import { useSelector } from 'react-redux';



const SDOHSelection = ({ navigation, route }) => {


  const [currentIndex, setCurrentIndex] = useState(0);
  const [Length, setLength] = useState(0);
  const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);
  const value = useSelector((state) => state?.getQuestions?.value);

  //SOCIAL AND COMMUNITY
  const [SocialState1, setSocialState1] = useState(null);
  const [SocialState2, setSocialState2] = useState(null);
  const [SocialState3, setSocialState3] = useState(null);

  //SAFETY
  const [SafetyValue1, setSafetyValue1] = useState(null);
  const [SafetyValue2, setSafetyValue2] = useState(null);
  const [SafetyValue3, setSafetyValue3] = useState(null);
  const [SafetyValue4, setSafetyValue4] = useState(null);

  const [LivingData2, setLivingData2] = useState([])

  const [MoneyRs1, setMoneyRs1] = useState(null);
  const [MoneyRs2, setMoneyRs2] = useState(null);
  const [TextInRs2, setTextInRs2] = useState(null);
  const [MoneyRsRB2, setMoneyRsRB2] = useState(null);
  const [TextInRs5, setTextInRs5] = useState(null);
  const [MoneyRsRB5, setMoneyRsRB5] = useState(null);
  const [MoneyRs6, setMoneyRs6] = useState(null);
  const [MoneyRs7, setMoneyRs7] = useState(null);

  //VALIDATION MODAL
  const [ModalOpen, setModalOpen] = useState(false)

  // LIVING SITUATION STATE
  const [LivingValue, setLivingValue] = useState(null)
  const [LivingArray, setLivingArray] = useState([])
  const [LivingAnswer1, setLivingAnswer1] = useState(null)
  const [LivingAnswer2, setLivingAnswer2] = useState(null)
  const [LivingAnswer3, setLivingAnswer3] = useState(null)
  const [LivingAnswer4, setLivingAnswer4] = useState(null)


  const [QuestionLength, setQuestionLength] = useState(0)
  //FOOD STATE
  const [FoodValue, setFoodValue] = useState('')
  const [FoodValue1, setFoodValue1] = useState(null)
  const [FoodValue2, setFoodValue2] = useState(null)

  //SAFETY QUESTIONS

  const [SafetyValue, setSafetyValue] = useState('')


  //HEALTH AND SAFETY

  const [HealthValue, setHealthValue] = useState('')
  const [scaleValue, setScaleValue] = useState()
  const [WorkValue, setWorkValue] = useState('')

  //MOBILITY AND ACCESS
  const [MobilityValue1, setMobilityValue1] = useState(null)
  const [MobilityValue2, setMobilityValue2] = useState(null)

  //INCOME VALUE
  const [Income1, setIncome1] = useState(null)
  const [Income2, setIncome2] = useState(null)

  //SUBSTANCES USE

  const [SubstanceValue, setSubstanceValue] = useState(null)

  const [SubstanceValue1, setSubstanceValue1] = useState(null)
  const [SubstanceValue2, setSubstanceValue2] = useState(null)
  const [SubstanceValue3, setSubstanceValue3] = useState(null)
  const [SubstanceValue4, setSubstanceValue4] = useState(null)

  //MORE ABOUT YOU

  const [LangValue, setLangValue] = useState(null)
  const [LangInput, setLangInput] = useState(null)
  const [veteranValue, setVeteranValue] = useState(null)

  const [CogDisableValue, setCogDisableValue] = useState(null)
  const [CogDisableInput, setCogDisableInput] = useState(null)
  const [CogDisableSelect, setCogDisableSelect] = useState(null)

  const [InStoryValue, setInStoryValue] = useState(null)
  const [InstorySelection, setInstorySelection] = useState(null)
  const [InstoryInput, setInstoryInput] = useState(null)

  //More about you
  const [MoreValue1, setMoreValue1] = useState(null)
  const [MoreValue2, setMoreValue2] = useState(null)
  const [MoreValue3, setMoreValue3] = useState(null)
  const [MoreValue4, setMoreValue4] = useState(null)
  const [MoreValue5, setMoreValue5] = useState(null)

  //Other supplemental items

  const [OtherItem1, setOtherItem1] = useState(null)
  const [OtherItem2, setOtherItem2] = useState(null)
  const [OtherItem3, setOtherItem3] = useState(null)
  const [OtherItem4, setOtherItem4] = useState(null)
  const [OtherItem5, setOtherItem5] = useState(null)
  const [OtherItem6, setOtherItem6] = useState(null)
  const [OtherItem7, setOtherItem7] = useState(null)


  // MENTAL HEALTH SCREENING
  const [ScreenValue, setScreenValue] = useState(null)
  const [MentalValue1, setMentalValue1] = useState(null)
  const [MentalValue2, setMentalValue2] = useState(null)
  const [MentalValue3, setMentalValue3] = useState(null)
  const [MentalValue4, setMentalValue4] = useState(null)

  const [MentalLabel1, setMentalLabel1] = useState(null)
  const [MentalLabel2, setMentalLabel2] = useState(null)
  const [MentalLabel3, setMentalLabel3] = useState(null)
  const [MentalLabel4, setMentalLabel4] = useState(null)
  const [mappedData, setMappedData] = useState([])

  const RouteLevel = route?.params?.selectedItems[Length]?.page_name;

  useEffect(() => {
    // Ensure Length is properly defined
    const Length = route?.params?.selectedItems?.length - 1; // Assuming Length should be the last index
  
    if (Length >= 0) {
      // Filter questions with page_name_id equal to the id of the last selected item
      const QuestionFilter = route?.params?.selectedQuest?.questions?.filter(
        (item) => item?.page_name_id === route?.params?.selectedItems[Length]?.id
      );
  
      // Map questions with corresponding answers
      const mappedData = QuestionFilter?.map(question => {
        const answer = route?.params?.selectedQuest?.patient_answers?.find(pa => pa.question_id === question.id);
        console.log("ANSWER...............",answer)
        return {
          ...question,
          answer: answer ? (answer?.answer ? answer?.answer : answer?.option_value) : null,
          option_id: answer?.option_value ? answer?.option_id : null
        };
      });
  
      setMappedData(mappedData);
    }
  }, [route?.params?.selectedItems, route?.params?.selectedQuest]);
  

  const QuestionFilter = route?.params?.selectedQuest?.questions?.filter((item) => item?.page_name_id === route?.params?.selectedItems[Length]?.id)

  const OptionFilter = route?.params?.selectedQuest?.options?.
    filter((item) => item?.question_id === QuestionFilter[currentIndex]?.id)
  
  const SocialOptions1 = route?.params?.selectedQuest?.options?.filter((item) => item?.question_id === 88).map(item => ({
    label: item.option,
    value: item.id
  }));
  const SocialOptions2 = route?.params?.selectedQuest?.options?.filter((item) => item?.question_id === 89).map(item => ({
    label: item.option,
    value: item.id
  }));

  const SocialOptions3 = route?.params?.selectedQuest?.options?.filter((item) => item?.question_id === 90).map(item => ({
    label: item.option,
    value: item.id
  }));

  const HealthOptions = route?.params?.selectedQuest?.options?.filter((item) => item?.question_id === 74).map(item => ({
    label: item.option,
    value: item.id
  }));

  const ScaleOption = route?.params?.selectedQuest?.options?.filter((item) => item?.question_id === 72).map(item => ({
    label: item.option,
    value: item.id
  }));

  const filterOptionsByQuestionId1 = route?.params?.selectedQuest?.options?.filter(option => option.question_id === 96).map(item => ({
    label: item.option,
    value: item.id
  }));

  const filterOptionsByQuestionId2 = route?.params?.selectedQuest?.options?.filter(option => option.question_id === 98).map(item => ({
    label: item.option,
    value: item.id
  }));

  const filterOptionsByQuestionId3 = route?.params?.selectedQuest?.options?.filter(option => option.question_id === 101).map(item => ({
    label: item.option,
    value: item.id
  }));

  const filterOptionsByQuestionId4 = route?.params?.selectedQuest?.options?.filter(option => option.question_id === 103).map(item => ({
    label: item.option,
    value: item.id
  }));

  switch (route?.params?.selectedItems[currentIndex]?.page_name) {
    case 'Personal Characteristics':
      imageSource = require('../../../../../../assets/Images/SDOH/PSC1.png');
      break;
    case 'Family & Home':
      imageSource = require('../../../../../../assets/Images/SDOH/SDOH2.png');
      break;
    case 'Money & Resources':
      imageSource = require('../../../../../../assets/Images/SDOH/SDOH3.png');
      break;
    case 'Social & Community Support':
      imageSource = require('../../../../../../assets/Images/SDOH/SDOH1.png');
      break;
    case 'Living Situation':
      imageSource = require('../../../../../../assets/Images/SDOH/SDOH3.png');
      break;
    case 'Food':
      imageSource = require('../../../../../../assets/Images/SDOH/SDOH3.png');
      break;
    case 'Safety':
      imageSource = require('../../../../../../assets/Images/SDOH/SDOH3.png');
      break;
    case 'Optional':
      Heading = 'Optional Questions';
      break;
    default:
      break;
  }



  useEffect(() => {

    // Fetch data when screen mounts and Token changes
    getData();
    // Add event listener for focus event
    const unsubscribe = navigation.addListener('focus', () => {
      getData(); // Call API when screen is focused
    });
    // Clean up event listener
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  const getData = async () => {

    try {
      const livingAnswer1 = await AsyncStorage.getItem('LivingAnswer1');
      setLivingAnswer1(JSON.parse(livingAnswer1))

      const LivingAnswer2 = await AsyncStorage.getItem('LivingData2');
      setLivingData2(JSON.parse(LivingAnswer2))

      const livingAnswer3 = await AsyncStorage.getItem('LivingAnswer3');
      setLivingAnswer3(JSON.parse(livingAnswer3))

      const livingAnswer4 = await AsyncStorage.getItem('LivingAnswer4');
      setLivingAnswer4(JSON.parse(livingAnswer4))

      const FoodValue1 = await AsyncStorage.getItem('FoodValue1');
      setFoodValue1(JSON.parse(FoodValue1))

      const FoodValue2 = await AsyncStorage.getItem('FoodValue2');
      setFoodValue2(JSON.parse(FoodValue2))

      const SafetyValue1 = await AsyncStorage.getItem('SafetyValue1');
      setSafetyValue1(JSON.parse(SafetyValue1))

      const SafetyValue2 = await AsyncStorage.getItem('SafetyValue2');
      setSafetyValue2(JSON.parse(SafetyValue2))

      const SafetyValue3 = await AsyncStorage.getItem('SafetyValue3');
      setSafetyValue3(JSON.parse(SafetyValue3))

      const SafetyValue4 = await AsyncStorage.getItem('SafetyValue4');
      setSafetyValue4(JSON.parse(SafetyValue4))

      const SubstanceValue1 = await AsyncStorage.getItem('SubstanceValue1');
      setSubstanceValue1(JSON.parse(SubstanceValue1))

      const SubstanceValue2 = await AsyncStorage.getItem('SubstanceValue2');
      setSubstanceValue2(JSON.parse(SubstanceValue2))

      const SubstanceValue3 = await AsyncStorage.getItem('SubstanceValue3');
      setSubstanceValue3(JSON.parse(SubstanceValue3))

      const SubstanceValue4 = await AsyncStorage.getItem('SubstanceValue4');
      setSubstanceValue4(JSON.parse(SubstanceValue4))

      const MobilityValue1 = await AsyncStorage.getItem('MobilityValue1');
      setMobilityValue1(JSON.parse(MobilityValue1))

      const MobilityValue2 = await AsyncStorage.getItem('MobilityValue2');
      setMobilityValue2(JSON.parse(MobilityValue2))

      const Income1 = await AsyncStorage.getItem('Income1');
      setIncome1(JSON.parse(Income1))

      const Income2 = await AsyncStorage.getItem('Income2');
      setIncome2(JSON.parse(Income2))

      const SocialState1 = await AsyncStorage.getItem('SocialState1');
      setSocialState1(JSON.parse(SocialState1))

      const SocialState2 = await AsyncStorage.getItem('SocialState2');
      setSocialState2(JSON.parse(SocialState2))

      const SocialState3 = await AsyncStorage.getItem('SocialState3');
      setSocialState3(JSON.parse(SocialState3))

      const HealthValue = await AsyncStorage.getItem('HealthValue');
      setHealthValue(JSON.parse(HealthValue))

      const ScaleValue = await AsyncStorage.getItem('ScaleValue');
      setScaleValue(JSON.parse(ScaleValue))

      const WorkValue = await AsyncStorage.getItem('WorkValue');
      setWorkValue(JSON.parse(WorkValue))

      const MoreValue1 = await AsyncStorage.getItem('MoreValue1');
      setMoreValue1(JSON.parse(MoreValue1))

      const MoreValue2 = await AsyncStorage.getItem('MoreValue2');
      setMoreValue2(JSON.parse(MoreValue2))

      const MoreValue3 = await AsyncStorage.getItem('MoreValue3');
      setMoreValue3(JSON.parse(MoreValue3))

      const MoreValue4 = await AsyncStorage.getItem('MoreValue4');
      setMoreValue4(JSON.parse(MoreValue4))

      const MoreValue5 = await AsyncStorage.getItem('MoreValue5');
      setMoreValue5(JSON.parse(MoreValue5))

      const OtherItem1 = await AsyncStorage.getItem('OtherItem1');
      setOtherItem1(JSON.parse(OtherItem1))

      const OtherItem2 = await AsyncStorage.getItem('OtherItem2');
      setOtherItem2(JSON.parse(OtherItem2))

      const OtherItem3 = await AsyncStorage.getItem('OtherItem3');
      setOtherItem3(JSON.parse(OtherItem3))

      const OtherItem4 = await AsyncStorage.getItem('OtherItem4');
      setOtherItem4(JSON.parse(OtherItem4))

      const OtherItem5 = await AsyncStorage.getItem('OtherItem5');
      setOtherItem5(JSON.parse(OtherItem5))

      const OtherItem6 = await AsyncStorage.getItem('OtherItem6');
      setOtherItem6(JSON.parse(OtherItem6))

      const OtherItem7 = await AsyncStorage.getItem('OtherItem7');
      setOtherItem7(JSON.parse(OtherItem7))

      const LangValue = await AsyncStorage.getItem('LanguageOther');
      setLangValue(LangValue)

      const MentalLabel1 = await AsyncStorage.getItem('MentalLabel1');
      setMentalLabel1(MentalLabel1)

      const MentalLabel2 = await AsyncStorage.getItem('MentalLabel2');
      setMentalLabel2(MentalLabel2)

      const MentalLabel3 = await AsyncStorage.getItem('MentalLabel3');
      setMentalLabel3(MentalLabel3)

      const MentalLabel4 = await AsyncStorage.getItem('MentalLabel4');
      setMentalLabel4(MentalLabel4)

      const MentalValue1 = await AsyncStorage.getItem('MentalValue1');
      setMentalValue1(JSON.parse(MentalValue1))

      const MentalValue2 = await AsyncStorage.getItem('MentalValue2');
      setMentalValue2(JSON.parse(MentalValue2))

      const MentalValue3 = await AsyncStorage.getItem('MentalValue3');

      setMentalValue3(JSON.parse(MentalValue3))

      const MentalValue4 = await AsyncStorage.getItem('MentalValue4');
      setMentalValue4(JSON.parse(MentalValue4))

    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  const CheckingData = () => { //FUNCTION FOR NAVIAGTE INTO THE NEXT SCREEN
    OnStoreData()

    if (route?.params?.selectedItems[Length]?.page_name == 'Social & Community Support' && route?.params?.selectedItems?.length > 0) {
      AsyncStorage.setItem('SocialState1', JSON.stringify(SocialState1))
      AsyncStorage.setItem('SocialState2', JSON.stringify(SocialState2))
      AsyncStorage.setItem('SocialState3', JSON.stringify(SocialState3))
      handleNext();
    }
  
  else if (route?.params?.selectedItems[Length]?.page_name == 'Personal Characteristics & Home and Family' && route?.params?.selectedItems?.length > 0) {

    handleNext()
  }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Mobility & Access' && route?.params?.selectedItems?.length > 0) {
      AsyncStorage.setItem('MobilityValue1', JSON.stringify(MobilityValue1))
      AsyncStorage.setItem('MobilityValue2', JSON.stringify(MobilityValue2))
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Safety' && route?.params?.selectedItems?.length > 0) {
      AsyncStorage.setItem('SafetyValue1', JSON.stringify(SafetyValue1))
      AsyncStorage.setItem('SafetyValue2', JSON.stringify(SafetyValue2))
      AsyncStorage.setItem('SafetyValue3', JSON.stringify(SafetyValue3))
      AsyncStorage.setItem('SafetyValue4', JSON.stringify(SafetyValue4))

      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Food' && route?.params?.selectedItems?.length > 0) {

      AsyncStorage.setItem('FoodValue1', JSON.stringify(FoodValue1))
      AsyncStorage.setItem('FoodValue2', JSON.stringify(FoodValue2))
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Living Situation:' && route?.params?.selectedItems?.length > 0) {

      AsyncStorage.setItem('LivingAnswer1', JSON.stringify(LivingAnswer1))
      AsyncStorage.setItem('LivingAnswer3', JSON.stringify(LivingAnswer3))
      AsyncStorage.setItem('LivingAnswer4', JSON.stringify(LivingAnswer4))
      AsyncStorage.setItem('LivingData2', JSON.stringify(LivingData2))
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Substance Use' && route?.params?.selectedItems?.length > 0) {
      AsyncStorage.setItem('SubstanceValue1', JSON.stringify(SubstanceValue1))
      AsyncStorage.setItem('SubstanceValue2', JSON.stringify(SubstanceValue2))
      AsyncStorage.setItem('SubstanceValue3', JSON.stringify(SubstanceValue3))
      AsyncStorage.setItem('SubstanceValue4', JSON.stringify(SubstanceValue4))
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Income-to-Needs Ratio' && route?.params?.selectedItems?.length > 0) {

      AsyncStorage.setItem('Income1', JSON.stringify(Income1))
      AsyncStorage.setItem('Income2', JSON.stringify(Income2))
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Other Supplemental Items' && route?.params?.selectedItems?.length > 0) {
      AsyncStorage.setItem('OtherItem1', JSON.stringify(OtherItem1))
      AsyncStorage.setItem('OtherItem2', JSON.stringify(OtherItem2))
      AsyncStorage.setItem('OtherItem3', JSON.stringify(OtherItem3))
      AsyncStorage.setItem('OtherItem4', JSON.stringify(OtherItem4))
      AsyncStorage.setItem('OtherItem5', JSON.stringify(OtherItem5))
      AsyncStorage.setItem('OtherItem6', JSON.stringify(OtherItem6))
      AsyncStorage.setItem('OtherItem7', JSON.stringify(OtherItem7))
      AsyncStorage.setItem('LanguageOther', LangValue)
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Mental Health Screening') {
      AsyncStorage.setItem('MentalLabel1', MentalLabel1)
      AsyncStorage.setItem('MentalLabel2', MentalLabel2)
      AsyncStorage.setItem('MentalLabel3', MentalLabel3)
      AsyncStorage.setItem('MentalLabel4', MentalLabel4)

      AsyncStorage.setItem('MentalValue1', JSON.stringify(MentalValue1))
      AsyncStorage.setItem('MentalValue2', JSON.stringify(MentalValue2))
      AsyncStorage.setItem('MentalValue3', JSON.stringify(MentalValue3))
      AsyncStorage.setItem('MentalValue4', JSON.stringify(MentalValue4))
      handleNext()
    }
  
    else if (route?.params?.selectedItems[Length]?.page_name == 'More About You Section' && route?.params?.selectedItems?.length > 0) {

      AsyncStorage.setItem('MoreValue1', JSON.stringify(MoreValue1))
      AsyncStorage.setItem('MoreValue2', JSON.stringify(MoreValue2))
      AsyncStorage.setItem('MoreValue3', JSON.stringify(MoreValue3))
      AsyncStorage.setItem('MoreValue4', JSON.stringify(MoreValue4))
      AsyncStorage.setItem('MoreValue5', JSON.stringify(MoreValue5))
      handleNext()
    }
    else if (route?.params?.selectedItems[Length]?.page_name == 'Health and Safety') {
      AsyncStorage.setItem('HealthValue', JSON.stringify(HealthValue))
      AsyncStorage.setItem('ScaleValue', JSON.stringify(scaleValue))
      AsyncStorage.setItem('WorkValue', JSON.stringify(WorkValue))

      handleNext()
    }
    else {
      nextTitleNavigation()
    }
  }

  const nextTitleNavigation = () => {

    console.log("current title.................", route?.params?.titleGroup)
    // Find the index of the current title in the array
    let currentIndex = TitleGroup?.indexOf(route?.params?.mainText);

    while (currentIndex !== -1) {
      // Increment the index by 1 to get the index of the next title
      const nextIndex = currentIndex + 1;

      if (nextIndex < TitleGroup?.length) {
        // Retrieve the next title from the array using the incremented index
        const nextTitle = TitleGroup[nextIndex];
        const caregivingStyleTitle = value?.find(title => title?.title_name === nextTitle);
        console.log("data printed...............", caregivingStyleTitle)

        if (caregivingStyleTitle?.page_names?.length === 0) {
          // If caregivingStyleTitle length is 0, continue to the next iteration of the loop
          currentIndex = nextIndex;
          continue;
        }

        if (nextTitle == 'Caregiving Style') {
          navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
        }
        else if (nextTitle == 'SDOH Assessment') {
          navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: item?.page_names, item: caregivingStyleTitle });
        }
        else if (nextTitle == 'Functional Abilities') {
          navigation.navigate('FunctionalMain', { mainText: 'Ability to Help 1', pages: item?.page_names, item: caregivingStyleTitle });
        }
        else if (nextTitle == 'About Patient') {
          console.log("next item.................", value)
          navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: route?.params?.titleGroup, titleName: nextTitle })
        }
        else if (nextTitle == 'About Caregiver') {
          navigation.navigate('CaregiverDemographics', { item: caregivingStyleTitle })
        }
        else if (nextTitle == 'Basic Information') {
          navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: title?.flat(), titleName: nextTitle })
        }
        else if (nextTitle == 'Personal Informations') {
          navigation.navigate('PersonalInfo', { item: caregivingStyleTitle })
        }
        else if (nextTitle == 'Basic Information 2') {
          navigation.navigate('BasicInfo2', { item: caregivingStyleTitle })
        }
        // Add other navigation conditions for different titles here...

        console.log("Next title:", nextTitle);

        // Exit the loop once navigation is done
        break;
      } else {
        console.log("No more titles available after the current title.");
        navigation.navigate('EnrollmentProgress')
        break;
      }
    }
  }

  const handleNext = () => {
  //  if(RouteLevel !== 'Personal Characteristics & Home and Family'){
    console.log(currentIndex)
    const lastItem = route?.params?.selectedItems[route?.params?.selectedItems?.length - 1];

    if (
      currentIndex < QuestionFilter?.length - 1 && currentIndex !== QuestionFilter?.length - 1) {
      console.log("I AM HERE")
      setCurrentIndex(prevIndex => prevIndex + 1);
      setQuestionLength(QuestionLength + 1)
    }

    else if (lastItem?.id !== route?.params?.selectedItems[Length]?.id) {
      if (QuestionFilter?.length >= currentIndex && route?.params?.selectedItems?.length > 1) {
        console.log("HERE PLEASE")
        setLength(length => length + 1)
        setCurrentIndex(0)
      }
      else {
        nextTitleNavigation()
      }
    
    }

    else {
      nextTitleNavigation()
    }


  }



  const handleBack = () => {

    const firstItem = route?.params?.selectedItems[0]
    // const lastItem = route?.params?.selectedItems[route?.params?.selectedItems?.length - 1];
    if (currentIndex !== 0 && currentIndex < QuestionFilter?.length) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
    else if (firstItem?.id !== route?.params?.selectedItems[Length]?.id) {
      if (QuestionFilter?.length >= currentIndex + 1 && route?.params?.selectedItems?.length > 1) {

        setLength(length => length - 1)
        setCurrentIndex(0)
      }
    }
    else {
      navigation.goBack()
    }


  }

  const OnSaveExit = () => { //FUNCTION FOR SAVE AND EXIT THE VALUES

    AsyncStorage.setItem('LivingAnswer1', JSON.stringify(LivingAnswer1))
    AsyncStorage.setItem('LivingAnswer3', JSON.stringify(LivingAnswer3))
    AsyncStorage.setItem('LivingAnswer4', JSON.stringify(LivingAnswer4))
    AsyncStorage.setItem('LivingData2', JSON.stringify(LivingData2))

    AsyncStorage.setItem('FoodValue1', JSON.stringify(FoodValue1))
    AsyncStorage.setItem('FoodValue2', JSON.stringify(FoodValue2))

    AsyncStorage.setItem('SafetyValue1', JSON.stringify(SafetyValue1))
    AsyncStorage.setItem('SafetyValue2', JSON.stringify(SafetyValue2))
    AsyncStorage.setItem('SafetyValue3', JSON.stringify(SafetyValue3))
    AsyncStorage.setItem('SafetyValue4', JSON.stringify(SafetyValue4))

    AsyncStorage.setItem('SubstanceValue1', JSON.stringify(SubstanceValue1))
    AsyncStorage.setItem('SubstanceValue2', JSON.stringify(SubstanceValue2))
    AsyncStorage.setItem('SubstanceValue3', JSON.stringify(SubstanceValue3))
    AsyncStorage.setItem('SubstanceValue4', JSON.stringify(SubstanceValue4))

    AsyncStorage.setItem('MobilityValue1', JSON.stringify(MobilityValue1))
    AsyncStorage.setItem('MobilityValue2', JSON.stringify(MobilityValue2))

    AsyncStorage.setItem('SocialState1', JSON.stringify(SocialState1))
    AsyncStorage.setItem('SocialState2', JSON.stringify(SocialState2))
    AsyncStorage.setItem('SocialState3', JSON.stringify(SocialState3))

    AsyncStorage.setItem('HealthValue', JSON.stringify(HealthValue))
    AsyncStorage.setItem('ScaleValue', JSON.stringify(scaleValue))
    AsyncStorage.setItem('WorkValue', JSON.stringify(WorkValue))

    AsyncStorage.setItem('MoreValue1', JSON.stringify(MoreValue1))
    AsyncStorage.setItem('MoreValue2', JSON.stringify(MoreValue2))
    AsyncStorage.setItem('MoreValue3', JSON.stringify(MoreValue3))
    AsyncStorage.setItem('MoreValue4', JSON.stringify(MoreValue4))
    AsyncStorage.setItem('MoreValue5', JSON.stringify(MoreValue5))

    AsyncStorage.setItem('Income1', JSON.stringify(Income1))
    AsyncStorage.setItem('Income2', JSON.stringify(Income2))

    AsyncStorage.setItem('OtherItem1', JSON.stringify(OtherItem1))
    AsyncStorage.setItem('OtherItem2', JSON.stringify(OtherItem2))
    AsyncStorage.setItem('OtherItem3', JSON.stringify(OtherItem3))
    AsyncStorage.setItem('OtherItem4', JSON.stringify(OtherItem4))
    AsyncStorage.setItem('OtherItem5', JSON.stringify(OtherItem5))
    AsyncStorage.setItem('OtherItem6', JSON.stringify(OtherItem6))
    AsyncStorage.setItem('OtherItem7', JSON.stringify(OtherItem7))
    AsyncStorage.setItem('LanguageOther', LangValue)

    AsyncStorage.setItem('MentalLabel1', MentalLabel1)
    AsyncStorage.setItem('MentalLabel2', MentalLabel2)
    AsyncStorage.setItem('MentalLabel3', MentalLabel3)
    AsyncStorage.setItem('MentalLabel4', MentalLabel4)

    AsyncStorage.setItem('MentalValue1', JSON.stringify(MentalValue1))
    AsyncStorage.setItem('MentalValue2', JSON.stringify(MentalValue2))
    AsyncStorage.setItem('MentalValue3', JSON.stringify(MentalValue3))
    AsyncStorage.setItem('MentalValue4', JSON.stringify(MentalValue4))
    OnStoreData()
    navigation.navigate('EnrollmentProgress')
  }

console.log("QUESTION FILTER...............",QuestionFilter,LivingAnswer1)
  const createAnswersArray = () => {
    const filteredIds = LivingData2?.filter(item => item.isSelected) // Filter items where isSelected is true
      .map(item => item.id); // Extract the id from each filtered item

    return route?.params?.selectedQuest?.questions?.map((question) => {

      if (question.id == 11 && LivingAnswer1) {
        return {
          question_id: question.id,
          option_ids: [LivingAnswer1]
        };
      }
      else if (question.id == 12 && filteredIds) {
        return {
          question_id: question.id,
          option_ids: filteredIds
        };
      }

      else if (question.id == 54 && LivingAnswer3) {
        return {
          question_id: question.id,
          option_ids: [LivingAnswer3]
        };
      }

      else if (question.id == 55 && LivingAnswer4) {
        return {
          question_id: question.id,
          option_ids: [LivingAnswer4]
        };
      }

      else if (question.id == 56 && FoodValue1) {
        return {
          question_id: question.id,
          option_ids: [FoodValue1]
        };
      }

      else if (question.id == 57 && FoodValue2) {
        return {
          question_id: question.id,
          option_ids: [FoodValue2]
        };
      }

      else if (question.id == 67 && SafetyValue1) {
        return {
          question_id: question.id,
          option_ids: [SafetyValue1]
        };
      }

      else if (question.id == 68 && SafetyValue2) {
        return {
          question_id: question.id,
          option_ids: [SafetyValue2]
        };
      }

      else if (question.id == 69 && SafetyValue3) {
        return {
          question_id: question.id,
          option_ids: [SafetyValue3]
        };
      }

      else if (question.id == 70 && SafetyValue4) {
        return {
          question_id: question.id,
          option_ids: [SafetyValue4]
        };
      }

      else if (question.id == 71 && HealthValue) {
        return {
          question_id: question.id,
          option_ids: [HealthValue]
        };
      }

      else if (question.id == 72 && scaleValue) {
        return {
          question_id: question.id,
          option_ids: [Number(scaleValue)]
        };
      }

      else if (question.id == 74 && WorkValue) {
        return {
          question_id: question.id,
          option_ids: [WorkValue]
        };
      }

      else if (question.id == 81 && SubstanceValue1) {
        return {
          question_id: question.id,
          option_ids: [SubstanceValue1]
        };
      }

      else if (question.id == 83 && SubstanceValue2) {
        return {
          question_id: question.id,
          option_ids: [SubstanceValue2]
        };
      }

      else if (question.id == 84 && SubstanceValue3) {
        return {
          question_id: question.id,
          option_ids: [SubstanceValue3]
        };
      }

      else if (question.id == 85 && SubstanceValue4) {
        return {
          question_id: question.id,
          option_ids: [SubstanceValue4]
        };
      }

      else if (question.id == 86 && MobilityValue1) {
        return {
          question_id: question.id,
          option_ids: [MobilityValue1]
        };
      }
      else if (question.id == 87 && MobilityValue2) {
        return {
          question_id: question.id,
          option_ids: [MobilityValue2]
        };
      }

      else if (question.id == 88 && SocialState1) {
        return {
          question_id: question.id,
          option_ids: [SocialState1]
        };
      }

      else if (question.id == 89 && SocialState2) {
        return {
          question_id: question.id,
          option_ids: [SocialState2]
        };
      }

      else if (question.id == 90 && SocialState3) {
        return {
          question_id: question.id,
          option_ids: [SocialState3]
        };
      }

      else if (question.id == 91 && Income1) {
        return {
          question_id: question.id,
          text_input: Income1
        };
      }

      else if (question.id == 93 && Income2) {
        return {
          question_id: question.id,
          text_input: Income2
        };
      }

      else if (question.id == 94 && OtherItem1) {
        return {
          question_id: question.id,
          option_ids: [OtherItem1]
        };
      }

      else if (question.id == 95 && OtherItem2) {
        return {
          question_id: question.id,
          option_ids: [OtherItem2]
        };
      }

      else if (question.id == 96 && MentalValue1) {
        return {
          question_id: question.id,
          option_ids: [JSON.parse(MentalValue1)]
        };
      }

      else if (question.id == 97 && OtherItem3) {
        return {
          question_id: question.id,
          option_ids: [OtherItem3]
        };
      }

      else if (question.id == 98 && MentalValue2) {
        return {
          question_id: question.id,
          option_ids: [JSON.parse(MentalValue2)]
        };
      }

      else if (question.id == 99 && OtherItem4) {
        return {
          question_id: question.id,
          option_ids: [OtherItem4]
        };
      }

      else if (question.id == 100 && OtherItem5) {
        return {
          question_id: question.id,
          option_ids: [OtherItem5]
        };
      }

      else if (question.id == 101 && MentalValue3) {
        return {
          question_id: question.id,
          option_ids: [JSON.parse(MentalValue3)]
        };
      }

      else if (question.id == 102 && OtherItem6) {
        return {
          question_id: question.id,
          option_ids: [OtherItem6]
        };
      }

      else if (question.id == 103 && MentalValue4) {
        return {
          question_id: question.id,
          option_ids: [JSON.parse(MentalValue4)]
        };
      }

      else if (question.id == 104 && OtherItem7) {
        return {
          question_id: question.id,
          option_ids: [OtherItem7]
        };
      }

      else if (question.id == 105 && MoreValue1) {
        return {
          question_id: question.id,
          option_ids: [MoreValue1]
        };
      }

      else if (question.id == 106 && MoreValue2) {
        return {
          question_id: question.id,
          option_ids: [MoreValue2]
        };
      }

      else if (question.id == 107 && MoreValue3) {
        return {
          question_id: question.id,
          text_input: MoreValue3
        };
      }

      else if (question.id == 108 && MoreValue4) {
        return {
          question_id: question.id,
          option_ids: [MoreValue4]
        };
      }

      else if (question.id == 109 && MoreValue5) {
        return {
          question_id: question.id,
          option_ids: [MoreValue5]
        };
      }

      return null;
    }).filter(item => item !== null);
  };

  const OnStoreData = () => {
    const answersArray = createAnswersArray();
    AsyncStorage.setItem('SDOH_ANSWERS', JSON.stringify(answersArray))
  }

  // const OnCheckValidation = () => {
  //   if (route?.params?.selectedItems[Length]?.page_name == 'Living Situation:') {
  //     if (!LivingAnswer1 && LivingAnswer3) {
  //       setModalOpen(true)
  //       setTimeout(() => {
  //         setModalOpen(false)
  //       }, 1500)
  //     }
  //     else if (LivingAnswer1){
  //       CheckingData()
  //     }
  //   }
  // }

  //console.log("MAPPED DATA..................",mappedData)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
      <View style={styles.mainContainer}>

        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: GlobalSize(15) }}>
            <Text style={styles.heading}>
              {RouteLevel}
            </Text>
          </View>
          {RouteLevel == 'Living Situation:' ?
            <View>
              <LivingSituation
                Heading={currentIndex}
                QuestionId={QuestionFilter[currentIndex]?.id}
                LivingAnswer1={LivingAnswer1}
                setLivingAnswer1={setLivingAnswer1}

                LivingData2={LivingData2}
                setLivingData2={setLivingData2}

                LivingAnswer2={LivingAnswer2}
                setLivingAnswer2={setLivingAnswer2}

                LivingAnswer3={LivingAnswer3}
                setLivingAnswer3={setLivingAnswer3}

                LivingAnswer4={LivingAnswer4}
                setLivingAnswer4={setLivingAnswer4}

                LivingValue={LivingValue}
                setLivingValue={setLivingValue}
                LivingArray={LivingArray}
                setLivingArray={setLivingArray}
                QuestionFilter={QuestionFilter}
                OptionFilter={OptionFilter}
                mappedData={mappedData}
              />
            </View> :
            RouteLevel == 'Safety' ?
              <View>
                <Safety
                  Heading={currentIndex}
                  QuestionFilter={QuestionFilter}
                  OptionFilter={OptionFilter}
                  SafetyValue={SafetyValue}
                  setSafetyValue={setSafetyValue}

                  SafetyValue1={SafetyValue1}
                  SafetyValue2={SafetyValue2}
                  SafetyValue3={SafetyValue3}
                  SafetyValue4={SafetyValue4}
                  setSafetyValue1={setSafetyValue1}
                  setSafetyValue2={setSafetyValue2}
                  setSafetyValue3={setSafetyValue3}
                  setSafetyValue4={setSafetyValue4}

                  mappedData={mappedData}
                />
              </View> :
              RouteLevel == 'Social & Community Support' ?
                <SocialCommunity
                  Heading={currentIndex}
                  QuestionFilter={QuestionFilter}
                  SocialOptions1={SocialOptions1}
                  SocialOptions2={SocialOptions2}
                  SocialOptions3={SocialOptions3}
                  SocialState1={SocialState1}
                  setSocialState1={setSocialState1}
                  SocialState2={SocialState2}
                  setSocialState2={setSocialState2}
                  SocialState3={SocialState3}
                  setSocialState3={setSocialState3} 
                  mappedData={mappedData}/> :

                RouteLevel ==
                  'Substance Use' ?
                  <View>
                    <SubstanceUse
                      Heading={currentIndex}
                      QuestionFilter={QuestionFilter}
                      OptionFilter={OptionFilter}

                      SubstanceValue1={SubstanceValue1}
                      setSubstanceValue1={setSubstanceValue1}
                      SubstanceValue2={SubstanceValue2}
                      setSubstanceValue2={setSubstanceValue2}
                      SubstanceValue3={SubstanceValue3}
                      setSubstanceValue3={setSubstanceValue3}
                      SubstanceValue4={SubstanceValue4}
                      setSubstanceValue4={setSubstanceValue4}

                      mappedData={mappedData}
                    />
                  </View> :

                  RouteLevel == 'Income-to-Needs Ratio' ?
                    <View>
                      <Income
                        Heading={currentIndex}
                        QuestionFilter={QuestionFilter}
                        OptionFilter={OptionFilter}

                        Income1={Income1}
                        setIncome1={setIncome1}
                        Income2={Income2}
                        setIncome2={setIncome2}

                        mappedData={mappedData}
                      />
                    </View> :

                    RouteLevel == 'Health and Safety' ?
                      <HealthSafety
                        Heading={currentIndex}
                        QuestionFilter={QuestionFilter}
                        OptionFilter={OptionFilter}
                        HealthOptions={HealthOptions}
                        ScaleOption={ScaleOption}
                        HealthValue={HealthValue}
                        setHealthValue={setHealthValue}
                        scaleValue={scaleValue}
                        setScaleValue={setScaleValue}
                        WorkValue={WorkValue}
                        setWorkValue={setWorkValue}

                        mappedData={mappedData}
                      />
                      :
                      RouteLevel == 'Mobility & Access' ?
                        <View>
                          <MobilityAccess
                            QuestionFilter={QuestionFilter}
                            OptionFilter={OptionFilter}
                            Heading={currentIndex}

                            MobilityValue1={MobilityValue1}
                            setMobilityValue1={setMobilityValue1}
                            MobilityValue2={MobilityValue2}
                            setMobilityValue2={setMobilityValue2}

                            mappedData={mappedData}
                          />
                        </View> :
                        RouteLevel == 'Food' ?
                          <View>
                            <Food
                              QuestionFilter={QuestionFilter}
                              OptionFilter={OptionFilter}
                              Heading={currentIndex}
                              FoodValue={FoodValue}
                              setFoodValue={setFoodValue}

                              FoodValue1={FoodValue1}
                              setFoodValue1={setFoodValue1}

                              FoodValue2={FoodValue2}
                              setFoodValue2={setFoodValue2}

                              mappedData={mappedData}
                            />
                          </View> :
                          RouteLevel == 'Mental Health Screening' ?
                            <MentalHealthScreening
                              Heading={currentIndex}
                              QuestionFilter={QuestionFilter}
                              OptionFilter={OptionFilter}
                              ScreenValue={ScreenValue}
                              setScreenValue={setScreenValue}

                              ScreenOptions1={filterOptionsByQuestionId1}
                              ScreenOptions2={filterOptionsByQuestionId2}
                              ScreenOptions3={filterOptionsByQuestionId3}
                              ScreenOptions4={filterOptionsByQuestionId4}

                              MentalLabel1={MentalLabel1}
                              setMentalLabel1={setMentalLabel1}
                              MentalLabel2={MentalLabel2}
                              setMentalLabel2={setMentalLabel2}
                              MentalLabel3={MentalLabel3}
                              setMentalLabel3={setMentalLabel3}
                              MentalLabel4={MentalLabel4}
                              setMentalLabel4={setMentalLabel4}

                              MentalValue1={MentalValue1}
                              setMentalValue1={setMentalValue1}
                              MentalValue2={MentalValue2}
                              setMentalValue2={setMentalValue2}
                              MentalValue3={MentalValue3}
                              setMentalValue3={setMentalValue3}
                              MentalValue4={MentalValue4}
                              setMentalValue4={setMentalValue4}
                              mappedData={mappedData}
                              /> :

                            RouteLevel ==
                              'Other Supplemental Items' ?
                              <View>
                                <Supplemental
                                  Heading={currentIndex}
                                  QuestionFilter={QuestionFilter}
                                  OptionFilter={OptionFilter}

                                  OtherItem1={OtherItem1}
                                  setOtherItem1={setOtherItem1}

                                  OtherItem2={OtherItem2}
                                  setOtherItem2={setOtherItem2}

                                  OtherItem3={OtherItem3}
                                  setOtherItem3={setOtherItem3}

                                  OtherItem4={OtherItem4}
                                  setOtherItem4={setOtherItem4}

                                  OtherItem5={OtherItem5}
                                  setOtherItem5={setOtherItem5}

                                  OtherItem6={OtherItem6}
                                  setOtherItem6={setOtherItem6}

                                  OtherItem7={OtherItem7}
                                  setOtherItem7={setOtherItem7}

                                  mappedData={mappedData}
                                />
                              </View> :
                              RouteLevel == 'More About You Section' ?
                                <View>
                                  <MoreAbout
                                    QuestionFilter={QuestionFilter}
                                    OptionFilter={OptionFilter}
                                    Heading={currentIndex}

                                    MoreValue1={MoreValue1}
                                    MoreValue2={MoreValue2}
                                    MoreValue3={MoreValue3}
                                    MoreValue4={MoreValue4}
                                    MoreValue5={MoreValue5}
                                    setMoreValue1={setMoreValue1}
                                    setMoreValue2={setMoreValue2}
                                    setMoreValue3={setMoreValue3}
                                    setMoreValue4={setMoreValue4}
                                    setMoreValue5={setMoreValue5}
                                    LangValue={LangValue}
                                    setLangValue={setLangValue}

                                    LangInput={LangInput}
                                    setLangInput={setLangInput}



                                    veteranValue={veteranValue}
                                    setVeteranValue={setVeteranValue}


                                    CogDisableValue={CogDisableValue}
                                    setCogDisableValue={setCogDisableValue}
                                    CogDisableInput={CogDisableInput}
                                    setCogDisableInput={setCogDisableInput}
                                    CogDisableSelect={CogDisableSelect}
                                    setCogDisableSelect={setCogDisableSelect}

                                    mappedData={mappedData}
                                  />
                                </View> : null}
        </ScrollView>

        <View style={styles.buttonView}>
          <Button
            onPress={() => handleBack()}
            style={[
              styles.buttonStyle]}>
            <Text
              style={[
                styles.buttonTextStyle
              ]}>
              Back
            </Text>
          </Button>

          <Button
            onPress={() => OnSaveExit()}
            style={[
              styles.buttonStyle]}>
            <Text
              style={[
                styles.buttonTextStyle
              ]}>
              Save & Exit
            </Text>
          </Button>

          <Button
            onPress={() => CheckingData()}
            style={[
              styles.buttonStyle, {
                borderColor:
                  BORDERCOLOR4
              }]}>
            <Text
              style={[
                styles.buttonTextStyle,
                {
                  color: TEXTCOLOR7
                }
              ]}>
              Next
            </Text>
          </Button>

        </View>

      </View>

      <ValidationModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        Message={'Please answer the question'} />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: GlobalSize(5),
    backgroundColor: BACKGROUNDWHITE,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: GlobalSize(20),
    backgroundColor: BACKGROUNDWHITE,
    marginTop: GlobalSize(45)
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: GlobalSize(15)
  },
  placeholderS: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: BOTTOMTABTEXT1,
  },
  heading: {
    fontSize: fontSize(26),
    fontFamily: FONTS.FontBold,
    color: TEXTCOLOR8,
    marginLeft: DEFAULTWIDTH * 0.03,
    marginTop: '5%',
  },
  subHeading: {
    color: TEXTCOLOR5,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontMedium,
    marginLeft: fontSize(7),
    // marginBottom: '5%',
  },
  buttonStyle: {
    width: GlobalSize(100),
    height: GlobalSize(40),
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: GlobalSize(8),
  },
  buttonTextStyle: {
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(12),
  },
  imageStyle: {
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.82,
    //marginBottom: '4%',
  },
  difChooser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
  },
  difChooserButtonText: {
    color: BOTTOMTABTEXT1,
    fontSize: GlobalSize(20),
    fontFamily: FONTS.FontMedium,
    top: GlobalSize(2)
  },
  difChooserButton: {
    borderWidth: 1,
    borderRadius: GlobalSize(10),
    borderColor: BORDERCOLOR5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difChooserText: {
    fontSize: fontSize(14),
    color: TEXTCOLOR5,
    fontFamily: FONTS.FontRegular,
  },
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    lineHeight: GlobalSize(20),
  },
});

export default SDOHSelection;
