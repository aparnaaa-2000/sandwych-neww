import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, Dimensions } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'react-native-paper';

//COLORS IMPORTED GLOBALLY
import {
  BORDERCOLOR4,
  BORDERCOLOR5,
  BOTTOMTABTEXT1,
  LINECOLOR1,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR8,
  BACKGROUNDWHITE,
  PRIMARYCOLOR,
} from '../../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../../Constants/Fonts';

//CONSTANT TEXTS
import { RateYourAbilityText } from '../../../../../Constants/Texts';

//MODAL IMPORTED FROM COMPONENTS
import SupportModal from '../../../../../Components/CarePartner/Assessments/AbilityToHelp/SupportModal';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const RateYourAbilityToHelp = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const dataLength = route?.params?.selectedItems?.length;

  // const {
  //   selectedItems,
  //   EatingLevel,
  //   setEatingLevel,
  //   Dresslevel,
  //   setDressLevel,
  //   TransferLevel,
  //   setTransferLevel,
  //   BathLevel,
  //   setBathLevel,
  //   DentalLevel,
  //   setDentalLevel,
  //   ToilLevel,
  //   setToilLevel } = route?.params;

  //console.log("eating level from params..................", route?.params?.EatingLevel, route?.params?.BathLevel)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false)
  const [Message, setMessage] = useState(null)
  const value = useSelector((state) => state?.getQuestions?.value);
  const ADLOptions = useSelector((state) => state?.getPageNameValue?.value);
  const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);

  const [ADLOption, setADLOption] = useState(ADLOptions)

  const [EatingLevel, setEatingLevel] = useState(null)
  const [BathLevel, setBathLevel] = useState(null)
  const [DressLevel, setDressLevel] = useState(null)
  const [TransferLevel, setTransferLevel] = useState(null)
  const [DentalLevel, setDentalLevel] = useState(null)
  const [ToilLevel, setToilLevel] = useState(null)
  const [pageNames, setPageNames] = useState(route?.params?.item?.page_names)

  const [TransportLevel, setTransportLevel] = useState(null)
  const [GroceryLevel, setGroceryLevel] = useState(null)
  const [OtherLevel, setOtherLevel] = useState(null)
  const [HouseLevel, setHouseLevel] = useState(null)
  const [MealLevel, setMealLevel] = useState(null)
  const [ServiceLevel, setServiceLevel] = useState(null)

  const [EmptyLevel, setEmptyLevel] = useState(null)
  const [GivingLevel, setGivingLevel] = useState(null)
  const [PreppLevel, setPreppLevel] = useState(null)
  const [TubelLevel, setTubeLevel] = useState(null)
  const [SkinLevel, setSkinLevel] = useState(null)
  const [BloodLevel, setBloodLevel] = useState(null)
  const [OutsideLevel, setOutsideLevel] = useState(null)

  const [MedLevel, setMedLevel] = useState(null)
  const [MobLevl, setMobLevel] = useState(null)
  const [VitalLevel, setVitalLevel] = useState(null)
  const [NutritionLevel, setNutritionLevel] = useState(null)
  const [WoundLevel, setWoundLevel] = useState(null)
  const [CommLevel, setCommLevel] = useState(null)
  const [EmLevel, setEmLevl] = useState(null)
  const [AssistLevel, setAssistLevel] = useState(null)
  const [CrisisLevel, setCrisisLevel] = useState(null)

  const [FallLevel, setFallLevel] = useState(null)
  const [HomeLevel, setHomeLevel] = useState(null)
  const [EduLevel, setEduLevel] = useState(null)

  const [Eating, setEating] = useState([])
  //const dressLevelRef = useRef(route?.params?.Dresslevel);

  // useEffect(() => {
  //   if (dressLevelRef.current !== route?.params?.Dresslevel) {
  //     dressLevelRef.current = route?.params?.Dresslevel;
  //     console.log("console...............",dressLevelRef.current)
  //   }
  // }, [dressLevelRef.current]);


  switch (route?.params?.selectedItems[currentIndex]?.question) {
    case 'Eating':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Eating.png');
      break;
    case 'Dressing':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Dressing.png');
      break;
    case 'Transfer & Mobility':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Transfre&Mobiity.png');
      break;
    case 'Bathing':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Bathing.png');
      break;
    case 'Dental Hygene':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/DentalHygene.png');
      break;
    case 'Toileting':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Toileting.png');
      break;
    case 'Cooking':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Cooking.png');
      break;
    case 'House Cleaning':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/HouseCleaning.png');
      break;
    case 'Taking Medication':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/TakingMedication.png');
      break;
    case 'Laundry':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Laundry.png');
      break;
    case 'Service Coordination':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Shopping.png');
      break;
    case 'Personal Finance':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/PersonalFinance.png');
      break;
    case 'Communication':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/ServiceCordination.png');
      break;
    case 'Transportation':
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Transportation.png');
      break;
    case 'Catheter':
      imageSource = require('../../../../../../assets/Images/MedicalAndNursingTasks/Catheter.png');
      break;
    case 'Injections':
      imageSource = require('../../../../../../assets/Images/MedicalAndNursingTasks/Injection.png');
      break;
    case 'Prepping Food':
      imageSource = require('../../../../../../assets/Images/MedicalAndNursingTasks/PreppingFoods.png');
      break;
    case 'Tube Feeding':
      imageSource = require('../../../../../../assets/Images/MedicalAndNursingTasks/TubeFeeding.png');
      break;
    case 'Wound Care':
      imageSource = require('../../../../../../assets/Images/MedicalAndNursingTasks/WoundCare.png');
      break;
    case 'Blood Pressure':
      imageSource = require('../../../../../../assets/Images/MedicalAndNursingTasks/BloodPressure.png');
      break;
    default:
      imageSource = require('../../../../../../assets/Images/AbilityToHelp1/Eating.png');
      break;
  }
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const EatingLevel = await AsyncStorage.getItem('EATLEVEL');
      const DressLevel = await AsyncStorage.getItem('DRESSLEVEL');
      const BathLevel = await AsyncStorage.getItem('BATHLEVEL');
      const TransferLevel = await AsyncStorage.getItem('TRANSFERLEVEL');
      const ToilLevel = await AsyncStorage.getItem('TOILLEVEL');
      const DentalLevel = await AsyncStorage.getItem('DENTALLEVEL');

      const TransportLevel = await AsyncStorage.getItem('TRANSPORTLEVEL');
      const GroceryLevel = await AsyncStorage.getItem('GROCERYLEVEL');
      const OtherLevel = await AsyncStorage.getItem('OTHERSHOPLEVEL');
      const HouseLevel = await AsyncStorage.getItem('HOUSELEVEL');
      const ServiceLevel = await AsyncStorage.getItem('SERVICELEVEL');
      const OutsideLevel = await AsyncStorage.getItem('OUTSIDELEVEL');
      const EmptyLevel = await AsyncStorage.getItem('EMPTYLEVEL');
      const GivingLevel = await AsyncStorage.getItem('GIVINGLEVEL');
      const PreppLevel = await AsyncStorage.getItem('PREPPLEVEL');
      const TubelLevel = await AsyncStorage.getItem('TUBELEVEL');
      const SkinLevel = await AsyncStorage.getItem('SKINLEVEL');
      const BloodLevel = await AsyncStorage.getItem('BLOODLEVEL');
      const MedLevel = await AsyncStorage.getItem('MEDLEVEL');
      const MobLevl = await AsyncStorage.getItem('MOBLEVEL');
      const VitalLevel = await AsyncStorage.getItem('VITALLEVEL');
      const NutritionLevel = await AsyncStorage.getItem('NUTRILEVEL');
      const WoundLevel = await AsyncStorage.getItem('WOUNDLEVEL');
      const CommLevel = await AsyncStorage.getItem('COMMLEVEL');
      const EmLevel = await AsyncStorage.getItem('EMLEVEL');
      const AssistLevel = await AsyncStorage.getItem('ASSISTLEVEL');
      const CrisisLevel = await AsyncStorage.getItem('CRISISLEVEL');
      const FallLevel = await AsyncStorage.getItem('FALLLEVEL');
      const HomeLevel = await AsyncStorage.getItem('HOMELEVEL');
      const EduLevel = await AsyncStorage.getItem('EDULEVEL')

      if (GroceryLevel === null) {
        AsyncStorage.removeItem('GROCERYLEVEL')
      }
      else {
        setGroceryLevel(GroceryLevel)
      }

      if (TransportLevel === null) {
        AsyncStorage.removeItem('TRANSPORTLEVEL')
      }
      else {
        setTransportLevel(TransportLevel)
      }

      if (OtherLevel === null) {
        AsyncStorage.removeItem('OTHERLEVEL')
      }
      else {
        setOtherLevel(OtherLevel)
      }

      if (HouseLevel === null) {
        AsyncStorage.removeItem('HOUSELEVEL')
      }
      else {
        setHouseLevel(HouseLevel)
      }

      if (ServiceLevel === null) {
        AsyncStorage.removeItem('SERVICELEVEL')
      }
      else {
        setServiceLevel(ServiceLevel)
      }

      if (OutsideLevel === null) {
        AsyncStorage.removeItem('OUTSIDELEVEL')
      }
      else {
        setOutsideLevel(OutsideLevel)
      }

      if (EmptyLevel === null) {
        AsyncStorage.removeItem('EMPTYLEVEL')
      }
      else {
        setEmptyLevel(EmptyLevel)
      }

      if (GivingLevel === null) {
        AsyncStorage.removeItem('GIVINGLEVEL')
      }
      else {
        setGivingLevel(GivingLevel)
      }

      if (PreppLevel === null) {
        AsyncStorage.removeItem('PREPPLEVEL')
      }
      else {
        setPreppLevel(PreppLevel)
      }

      if (TubelLevel === null) {
        AsyncStorage.removeItem('TUBELEVEL')
      }
      else {
        setTubeLevel(TubelLevel)
      }

      if (SkinLevel === null) {
        AsyncStorage.removeItem('SKINLEVEL')
      }
      else {
        setSkinLevel(SkinLevel)
      }

      if (BloodLevel === null) {
        AsyncStorage.removeItem('BLOODLEVEL')
      }
      else {
        setWoundLevel(BloodLevel)
      }

      if (MedLevel === null) {
        AsyncStorage.removeItem('MEDLEVEL')
      }
      else {
        setMedLevel(MedLevel)
      }

      if (MobLevl === null) {
        AsyncStorage.removeItem('MOBLEVEL')
      }
      else {
        setMobLevel(MobLevl)
      }

      if (VitalLevel === null) {
        AsyncStorage.removeItem('VITALLEVEL')
      }
      else {
        setVitalLevel(VitalLevel)
      }

      if (WoundLevel === null) {
        AsyncStorage.removeItem('WOUNDLEVEL')
      }
      else {
        setWoundLevel(WoundLevel)
      }

      if (NutritionLevel === null) {
        AsyncStorage.removeItem('NUTRILEVEL')
      }
      else {
        setNutritionLevel(NutritionLevel)
      }

      if (CommLevel === null) {
        AsyncStorage.removeItem('COMMLEVEL')
      }
      else {
        setCommLevel(CommLevel)
      }

      if (EmLevel === null) {
        AsyncStorage.removeItem('EMLEVEL')
      }
      else {
        setEmLevl(EmLevel)
      }

      if (AssistLevel === null) {
        AsyncStorage.removeItem('ASSISTLEVEL')
      }
      else {
        setAssistLevel(AssistLevel)
      }

      if (CrisisLevel === null) {
        AsyncStorage.removeItem('CRISISLEVEL')
      }
      else {
        setCrisisLevel(CrisisLevel)
      }

      if (HomeLevel === null) {
        AsyncStorage.removeItem('HOMELEVEL')
      }
      else {
        setHomeLevel(HomeLevel)
      }

      if (FallLevel === null) {
        AsyncStorage.removeItem('FALLLEVEL')
      }
      else {
        setFallLevel(FallLevel)
      }

      if (EduLevel === null) {
        AsyncStorage.removeItem('EDULEVEL')
      }
      else {
        setEduLevel(EduLevel)
      }


      if (EatingLevel === null) {
        AsyncStorage.removeItem('EATLEVEL')
      }
      else {
        setEatingLevel(EatingLevel);
      }

      if (DressLevel === null) {
        AsyncStorage.removeItem('DRESSLEVEL')
      }
      else {
        setDressLevel(DressLevel);
      }

      if (TransferLevel === null) {
        AsyncStorage.removeItem('TRANSFERLEVEL')
      }
      else {
        setTransferLevel(TransferLevel);
      }

      if (BathLevel === null) {
        AsyncStorage.removeItem('BATHLEVEL')
      }
      else {
        setBathLevel(BathLevel);
      }

      if (DentalLevel === null) {
        AsyncStorage.removeItem('DENTALLEVEL')
      }
      else {
        setDentalLevel(DentalLevel);
      }

      if (ToilLevel === null) {
        AsyncStorage.removeItem('TOILLEVEL')
      }
      else {
        setToilLevel(ToilLevel);
      }

    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };
  //   {console.log("eating level.......................",route?.params?.pageNames?.length)}
  //   const pageTitle = route?.params?.pageNames?.length
  //   const lastIndex = route?.params?.pageNames?.length - 1;

  // console.log("Last Index:", lastIndex); // Output: 5
  // console.log("Last Element:", pageTitle[5]); 
  const handleNext = () => {
    setMessage(null)
    console.log("CURRENT INDEX...................", currentIndex, dataLength - 1, route?.params?.currentPageDataName)
    setSelectedButton(null)
    HandleStore()
    // const answersArray = createAnswersArray();
    // AsyncStorage.setItem('FUNCTIONAL_ABILITIES', JSON.stringify(answersArray))
    //console.log("answers......................", answersArray);

    if (currentIndex < dataLength - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }

    else if (currentIndex == dataLength - 1) {
      console.log("navigation added......................", route?.params?.currentPageDataName)

      navigation.navigate('FunctionalMain',
        {
          mainText: 'Ability to Help 1', currentPageDataName: route?.params?.currentPageDataName,
          titleGroup: route?.params?.titleGroup
        });

    }
    // else if (currentIndex == dataLength - 1 && route?.params?.currentPageDataName == 'Supervision and Safety') {
    //   NextScreenNavigation()
    // }
    else {
      console.log("NEXT FROM SCREEN..................", currentIndex, dataLength - 1, route?.params?.currentPageDataName)
      NextScreenNavigation()

    }
  };

  const NextScreenNavigation = () => { //FUNCTION FOR FINDING THE LAST INDEX OF AN AARRAY AND NAVIAGTE TO THAT SCREEN

    const Index = TitleGroup?.indexOf('Functional Abilities');
    const nextIndex = Index + 1;
    const nextTitle = TitleGroup[nextIndex];
    const caregivingStyleTitle = value?.find(title => title?.title_name === nextTitle);
    console.log(caregivingStyleTitle)
    console.log("NEXT TITLE................", nextIndex, TitleGroup, nextTitle)
    if (nextTitle == 'Personal Informations') {

      navigation.navigate('PersonalInfo', {
        item: caregivingStyleTitle,
        titleGroup: route?.params?.titleGroup,
        titleName: nextTitle,
        mainText: 'Supervision and Safety',
      })
    } else if (nextTitle == 'SDOH Assessment') {

      navigation.navigate('SDOHList',
        {
          mainText: 'SDOH Assessment',
          pages: caregivingStyleTitle?.page_names,
          item: caregivingStyleTitle,

        });
    }
    else {

      navigation.navigate('EnrollmentProgress')
    }
  }

  const handlePrevious = () => {
    console.log("route main.............", route?.params?.mainText)
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
    else if (route?.params?.mainText == 'Activities of Daily Living') {
      navigation.navigate('FunctionalMain',
        {
          mainText: 'Ability to Help 1', currentPageDataName: route?.params?.mainText,
          titleGroup: route?.params?.titleGroup, Options: ADLOptions
        });
    }

    else if (route?.params?.mainText == 'Instrumental Activities of Daily Living') {
      navigation.navigate('FunctionalMain',
        {
          mainText: 'Ability to Help 1', currentPageDataName: route?.params?.mainText,
          titleGroup: route?.params?.titleGroup, Options: ADLOptions
        });
    }

    else if (route?.params?.mainText == 'Medical Procedure/Treatments') {
      navigation.navigate('FunctionalMain',
        {
          mainText: 'Ability to Help 1', currentPageDataName: route?.params?.mainText,
          titleGroup: route?.params?.titleGroup, Options: ADLOptions
        });
    }


    else if (route?.params?.mainText == 'Medication Assistance') {
      navigation.navigate('FunctionalMain',
        {
          mainText: 'Ability to Help 1', currentPageDataName: route?.params?.mainText,
          titleGroup: route?.params?.titleGroup, Options: ADLOptions
        });

    }
    else if (route?.params?.mainText == 'Supervision and Safety') {
      OnNextNavigation()
      //const caregivingStyleTitle = value?.find(title => title?.title_name === nextTitle);
    }

  };

  const HandleStore = async () => {
    if (route?.params?.mainText === 'Activities of Daily Living') {
      const answersArray = await createAnswersArray();
      await AsyncStorage.setItem('ACTIVITIES_OF_DL', JSON.stringify(answersArray));
      console.log("ANSWERS ARRAY..................", JSON.stringify(answersArray));
    }
    else if (route?.params?.mainText == 'Instrumental Activities of Daily Living') {
      const answersArray = await createAnswersArray();
      await AsyncStorage.setItem('INST_DL', JSON.stringify(answersArray));
      console.log("IADL..................", JSON.stringify(answersArray));
    }
    else if (route?.params?.mainText == 'Medical Procedure/Treatments') {
      const answersArray = await createAnswersArray();
      await AsyncStorage.setItem('MED_PROCEDURE', JSON.stringify(answersArray));
      console.log("IADL..................", JSON.stringify(answersArray));
    }
    else if (route?.params?.mainText == 'Medication Assistance') {
      const answersArray = await createAnswersArray();
      await AsyncStorage.setItem('MED_ASSISTANCE', JSON.stringify(answersArray));
      console.log("IADL..................", JSON.stringify(answersArray));
    }
    else if (route?.params?.mainText == 'Supervision and Safety') {
      const answersArray = await createAnswersArray();
      await AsyncStorage.setItem('SUPER_SAFETY', JSON.stringify(answersArray));
      console.log("IADL..................", JSON.stringify(answersArray));
    }
  }
  const createAnswersArray = async () => {
    return route?.params?.selectedItems?.map((question) => {

      if (question.id == 23 && EatingLevel) {
        const EatingArray = Array.isArray(EatingLevel) ? EatingLevel : [EatingLevel];
        return {
          question_id: question.id,
          option_ids: EatingArray
        };
      }
      else if (question.id == 24 && DressLevel) {
        const DressArray = Array.isArray(DressLevel) ? DressLevel : [DressLevel];
        return {
          question_id: question.id,
          option_ids: DressArray
        };
      }
      else if (question.id == 25 && TransferLevel) {
        const TransferArray = Array.isArray(TransferLevel) ? TransferLevel : [TransferLevel];
        return {
          question_id: question.id,
          option_ids: TransferArray
        };
      }
      else if (question.id == 26 && BathLevel) {
        const BathArray = Array.isArray(BathLevel) ? BathLevel : [BathLevel];
        return {
          question_id: question.id,
          option_ids: BathArray
        };
      }
      else if (question.id == 27 && DentalLevel) {
        const DentalArray = Array.isArray(DentalLevel) ? DentalLevel : [DentalLevel];
        return {
          question_id: question.id,
          option_ids: DentalArray
        };
      }
      else if (question.id == 28 && ToilLevel) {
        const ToilArray = Array.isArray(ToilLevel) ? ToilLevel : [ToilLevel];
        return {
          question_id: question.id,
          option_ids: ToilArray
        };
      } else if (question.id == 29 && TransportLevel) {
        const TransportArray = Array.isArray(TransportLevel) ? TransportLevel : [TransportLevel];
        return {
          question_id: question.id,
          option_ids: TransportArray
        };
      }
      else if (question.id == 31 && GroceryLevel) {
        const GroceryArray = Array.isArray(GroceryLevel) ? GroceryLevel : [GroceryLevel];
        return {
          question_id: question.id,
          option_ids: GroceryArray
        };
      }
      else if (question.id == 32 && OtherLevel) {
        const OtherArray = Array.isArray(OtherLevel) ? OtherLevel : [OtherLevel];
        return {
          question_id: question.id,
          option_ids: OtherArray
        };
      }
      else if (question.id == 33 && HouseLevel) {
        const HouseArray = Array.isArray(HouseLevel) ? HouseLevel : [HouseLevel];
        return {
          question_id: question.id,
          option_ids: HouseArray
        };
      }

      else if (question.id == 34 && MealLevel) {
        const MealArray = Array.isArray(MealLevel) ? MealLevel : [MealLevel];
        return {
          question_id: question.id,
          option_ids: MealArray
        };
      }

      else if (question.id == 35 && ServiceLevel) {
        const ServiceArray = Array.isArray(ServiceLevel) ? ServiceLevel : [ServiceLevel];
        return {
          question_id: question.id,
          option_ids: ServiceArray
        };
      }

      else if (question.id == 36 && EmptyLevel) {
        const EmptyArray = Array.isArray(EmptyLevel) ? EmptyLevel : [EmptyLevel];
        return {
          question_id: question.id,
          option_ids: EmptyArray
        };
      }

      else if (question.id == 37 && GivingLevel) {
        const GivingArray = Array.isArray(GivingLevel) ? GivingLevel : [GivingLevel];
        return {
          question_id: question.id,
          option_ids: GivingArray
        };
      }

      else if (question.id == 38 && PreppLevel) {
        const PreppArray = Array.isArray(PreppLevel) ? PreppLevel : [PreppLevel];
        return {
          question_id: question.id,
          option_ids: PreppArray
        };
      }

      else if (question.id == 39 && TubelLevel) {
        const TubeArray = Array.isArray(TubelLevel) ? TubelLevel : [TubelLevel];
        return {
          question_id: question.id,
          option_ids: TubeArray
        };
      }

      else if (question.id == 40 && SkinLevel) {
        const SkinArray = Array.isArray(SkinLevel) ? SkinLevel : [SkinLevel];
        return {
          question_id: question.id,
          option_ids: SkinArray
        };
      }

      else if (question.id == 41 && BloodLevel) {
        const BloodArray = Array.isArray(BloodLevel) ? BloodLevel : [BloodLevel];
        return {
          question_id: question.id,
          option_ids: BloodArray
        };
      }

      else if (question.id == 42 && MedLevel) {
        const MedArray = Array.isArray(MedLevel) ? MedLevel : [MedLevel];
        return {
          question_id: question.id,
          option_ids: MedArray
        };
      }

      else if (question.id == 43 && MobLevl) {
        const MobArray = Array.isArray(MobLevl) ? MobLevl : [MobLevl];
        return {
          question_id: question.id,
          option_ids: MobArray
        };
      }

      else if (question.id == 44 && VitalLevel) {
        const VitalArray = Array.isArray(VitalLevel) ? VitalLevel : [VitalLevel];
        return {
          question_id: question.id,
          option_ids: VitalArray
        };
      }

      else if (question.id == 45 && NutritionLevel) {
        const NutritionArray = Array.isArray(NutritionLevel) ? NutritionLevel : [NutritionLevel];
        return {
          question_id: question.id,
          option_ids: NutritionArray
        };
      }

      else if (question.id == 46 && WoundLevel) {
        const WoundArray = Array.isArray(WoundLevel) ? WoundLevel : [WoundLevel];
        return {
          question_id: question.id,
          option_ids: WoundArray
        };
      }

      else if (question.id == 47 && CommLevel) {
        const CommArray = Array.isArray(CommLevel) ? CommLevel : [CommLevel];
        return {
          question_id: question.id,
          option_ids: CommArray
        };
      }

      else if (question.id == 48 && EmLevel) {
        const EmArray = Array.isArray(EmLevel) ? EmLevel : [EmLevel];
        return {
          question_id: question.id,
          option_ids: EmArray
        };
      }

      else if (question.id == 49 && AssistLevel) {
        const AssistArray = Array.isArray(AssistLevel) ? AssistLevel : [AssistLevel];
        return {
          question_id: question.id,
          option_ids: AssistArray
        };
      }
      else if (question.id == 50 && CrisisLevel) {
        const CrisisArray = Array.isArray(CrisisLevel) ? CrisisLevel : [CrisisLevel];
        return {
          question_id: question.id,
          option_ids: CrisisArray
        };
      }

      else if (question.id == 51 && FallLevel) {
        const FallArray = Array.isArray(FallLevel) ? FallLevel : [FallLevel];
        return {
          question_id: question.id,
          option_ids: FallArray
        };
      }

      else if (question.id == 52 && HomeLevel) {
        const HomeArray = Array.isArray(HomeLevel) ? HomeLevel : [HomeLevel];
        return {
          question_id: question.id,
          option_ids: HomeArray
        };
      }

      else if (question.id == 53 && EduLevel) {
        const EduArray = Array.isArray(EduLevel) ? EduLevel : [EduLevel];
        return {
          question_id: question.id,
          option_ids: EduArray
        };
      }
      return null;
    }).filter(item => item !== null);
  };


  const storeItem = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log('Data successfully stored');
    } catch (e) {
      console.error('Failed to store data', e);
    }
  };

  const createAnswersArrays = () => {
    return route?.params?.selectedItems?.map((question) => {

      if (question.id == 23 && EatingLevel) {
        const EatingArray = Array.isArray(EatingLevel) ? EatingLevel : [EatingLevel];
        return {
          question_id: question.id,
          option_ids: EatingArray
        };
      }
      else if (question.id == 24 && DressLevel) {
        const DressArray = Array.isArray(DressLevel) ? DressLevel : [DressLevel];
        return {
          question_id: question.id,
          option_ids: DressArray
        };
      }
      else if (question.id == 25 && TransferLevel) {
        const TransferArray = Array.isArray(TransferLevel) ? TransferLevel : [TransferLevel];
        return {
          question_id: question.id,
          option_ids: TransferArray
        };
      }
      else if (question.id == 26 && BathLevel) {
        const BathArray = Array.isArray(BathLevel) ? BathLevel : [BathLevel];
        return {
          question_id: question.id,
          option_ids: BathArray
        };
      }
      else if (question.id == 27 && DentalLevel) {
        const DentalArray = Array.isArray(DentalLevel) ? DentalLevel : [DentalLevel];
        return {
          question_id: question.id,
          option_ids: DentalArray
        };
      }
      else if (question.id == 28 && ToilLevel) {
        const ToilArray = Array.isArray(ToilLevel) ? ToilLevel : [ToilLevel];
        return {
          question_id: question.id,
          option_ids: ToilArray
        };
      }
      else if (question.id == 29 && TransportLevel) {
        const TransportArray = Array.isArray(TransportLevel) ? TransportLevel : [TransportLevel];
        return {
          question_id: question.id,
          option_ids: TransportArray
        };
      }
      else if (question.id == 31 && GroceryLevel) {
        const GroceryArray = Array.isArray(GroceryLevel) ? GroceryLevel : [GroceryLevel];
        return {
          question_id: question.id,
          option_ids: GroceryArray
        };
      }
      else if (question.id == 32 && OtherLevel) {
        const OtherArray = Array.isArray(OtherLevel) ? OtherLevel : [OtherLevel];
        return {
          question_id: question.id,
          option_ids: OtherArray
        };
      }
      else if (question.id == 33 && HouseLevel) {
        const HouseArray = Array.isArray(HouseLevel) ? HouseLevel : [HouseLevel];
        return {
          question_id: question.id,
          option_ids: HouseArray
        };
      }

      else if (question.id == 34 && MealLevel) {
        const MealArray = Array.isArray(MealLevel) ? MealLevel : [MealLevel];
        return {
          question_id: question.id,
          option_ids: MealArray
        };
      }

      else if (question.id == 35 && ServiceLevel) {
        const ServiceArray = Array.isArray(ServiceLevel) ? ServiceLevel : [ServiceLevel];
        return {
          question_id: question.id,
          option_ids: ServiceArray
        };
      }

      else if (question.id == 36 && EmptyLevel) {
        const EmptyArray = Array.isArray(EmptyLevel) ? EmptyLevel : [EmptyLevel];
        return {
          question_id: question.id,
          option_ids: EmptyArray
        };
      }

      else if (question.id == 37 && GivingLevel) {
        const GivingArray = Array.isArray(GivingLevel) ? GivingLevel : [GivingLevel];
        return {
          question_id: question.id,
          option_ids: GivingArray
        };
      }

      else if (question.id == 38 && PreppLevel) {
        const PreppArray = Array.isArray(PreppLevel) ? PreppLevel : [PreppLevel];
        return {
          question_id: question.id,
          option_ids: PreppArray
        };
      }

      else if (question.id == 39 && TubelLevel) {
        const TubeArray = Array.isArray(TubelLevel) ? TubelLevel : [TubelLevel];
        return {
          question_id: question.id,
          option_ids: TubeArray
        };
      }

      else if (question.id == 40 && SkinLevel) {
        const SkinArray = Array.isArray(SkinLevel) ? SkinLevel : [SkinLevel];
        return {
          question_id: question.id,
          option_ids: SkinArray
        };
      }

      else if (question.id == 41 && BloodLevel) {
        const BloodArray = Array.isArray(BloodLevel) ? BloodLevel : [BloodLevel];
        return {
          question_id: question.id,
          option_ids: BloodArray
        };
      }

      else if (question.id == 42 && MedLevel) {
        const MedArray = Array.isArray(MedLevel) ? MedLevel : [MedLevel];
        return {
          question_id: question.id,
          option_ids: MedArray
        };
      }

      else if (question.id == 43 && MobLevl) {
        const MobArray = Array.isArray(MobLevl) ? MobLevl : [MobLevl];
        return {
          question_id: question.id,
          option_ids: MobArray
        };
      }

      else if (question.id == 44 && VitalLevel) {
        const VitalArray = Array.isArray(VitalLevel) ? VitalLevel : [VitalLevel];
        return {
          question_id: question.id,
          option_ids: VitalArray
        };
      }

      else if (question.id == 45 && NutritionLevel) {
        const NutritionArray = Array.isArray(NutritionLevel) ? NutritionLevel : [NutritionLevel];
        return {
          question_id: question.id,
          option_ids: NutritionArray
        };
      }

      else if (question.id == 46 && WoundLevel) {
        const WoundArray = Array.isArray(WoundLevel) ? WoundLevel : [WoundLevel];
        return {
          question_id: question.id,
          option_ids: WoundArray
        };
      }

      else if (question.id == 47 && CommLevel) {
        const CommArray = Array.isArray(CommLevel) ? CommLevel : [CommLevel];
        return {
          question_id: question.id,
          option_ids: CommArray
        };
      }

      else if (question.id == 48 && EmLevel) {
        const EmArray = Array.isArray(EmLevel) ? EmLevel : [EmLevel];
        return {
          question_id: question.id,
          option_ids: EmArray
        };
      }

      else if (question.id == 49 && AssistLevel) {
        const AssistArray = Array.isArray(AssistLevel) ? AssistLevel : [AssistLevel];
        return {
          question_id: question.id,
          option_ids: AssistArray
        };
      }
      else if (question.id == 50 && CrisisLevel) {
        const CrisisArray = Array.isArray(CrisisLevel) ? CrisisLevel : [CrisisLevel];
        return {
          question_id: question.id,
          option_ids: CrisisArray
        };
      }

      else if (question.id == 51 && FallLevel) {
        const FallArray = Array.isArray(FallLevel) ? FallLevel : [FallLevel];
        return {
          question_id: question.id,
          option_ids: FallArray
        };
      }

      else if (question.id == 52 && HomeLevel) {
        const HomeArray = Array.isArray(HomeLevel) ? HomeLevel : [HomeLevel];
        return {
          question_id: question.id,
          option_ids: HomeArray
        };
      }

      else if (question.id == 53 && EduLevel) {
        const EduArray = Array.isArray(EduLevel) ? EduLevel : [EduLevel];
        return {
          question_id: question.id,
          option_ids: EduArray
        };
      }

      return null;
    }).filter(item => item !== null);
  };

  const OnNextNavigation = () => { //FUNCTION FOR NAVIGATE INTO THE NEXT SCREEN

    const currentIndex = route?.params?.titleGroup?.indexOf(route?.params?.titleName);

    if (currentIndex !== -1) {
      const nextIndex = currentIndex + 1;

      if (nextIndex < route?.params?.titleGroup?.length) {

        const nextTitle = route?.params?.titleGroup[nextIndex];
        const caregivingStyleTitle = value?.find(title => title?.title_name === nextTitle);

        switch (nextTitle) {
          case 'About [CR Name]':
            break;
          case 'Caregiving Style':
            navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
            break;
          case 'SDOH Assessment':
            navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: caregivingStyleTitle?.page_names, item: caregivingStyleTitle });
            break;
          case 'Functional Abilities':
            navigation.navigate('FunctionalMain', { mainText: 'Ability to Help 1', pages: item?.page_names, item: caregivingStyleTitle });
            break;
          case 'About Patient':
            navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle });
            break;
          case 'About Caregiver':
            navigation.navigate('CaregiverDemographics', { item: caregivingStyleTitle });
            break;
          case 'Basic Information':
            navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: title?.flat(), titleName: item?.title_name });
            break;
          case 'Personal Informations':
            navigation.navigate('PersonalInfo', { item: caregivingStyleTitle, pages: item?.page_names, titleGroup: route?.params?.titleGroup, titleName: route?.params?.titleName });
            break;
          case 'Basic Information 2':
            navigation.navigate('BasicInfo2', { item: caregivingStyleTitle });
            break;
          default:
            console.log("Unknown title:", nextTitle);
        }
      } else {
        console.log("No more titles available after the current title.");
      }
    } else {
      console.log("Current title not found in the array.");
    }
  }



  const handleButtonPress = (ItemId, buttonNumber) => {

    setSelectedButton(buttonNumber);
    setEatingLevel(null);

    let message;

    // Handle buttonNumber cases
    switch (buttonNumber) {
      case 0:
        message = "Help is not required.";
        break;
      case 1:
        message = "A little help is required.";
        break;
      case 2:
        message = "Need training or Extra Support.";
        break;
      default:
        message = "Need Help but no one to support.";
    }

    setMessage(message);


    // Handle ItemId cases
    switch (route?.params?.selectedItems[currentIndex]?.id) {
      case 23:
        setEatingLevel(ItemId);
        AsyncStorage.setItem('EATLEVEL', JSON.stringify(ItemId));
        break;
      case 24:
        console.log("id passed1..................", ItemId);
        setDressLevel(ItemId);
        AsyncStorage.setItem('DRESSLEVEL', JSON.stringify(ItemId));
        break;
      case 25:
        setTransferLevel(ItemId);
        AsyncStorage.setItem('TRANSFERLEVEL', JSON.stringify(ItemId));
        break;
      case 26:
        setBathLevel(ItemId);
        AsyncStorage.setItem('BATHLEVEL', JSON.stringify(ItemId));
        break;
      case 27:
        setDentalLevel(ItemId);
        AsyncStorage.setItem('DENTALLEVEL', JSON.stringify(ItemId));
        break;
      case 28:
        setToilLevel(ItemId);
        AsyncStorage.setItem('TOILLEVEL', JSON.stringify(ItemId));
        break;
      case 29:
        setTransportLevel(ItemId)
        AsyncStorage.setItem('TRANSPORTLEVEL', JSON.stringify(ItemId));
        break;
      case 31:
        setGroceryLevel(ItemId)
        AsyncStorage.setItem('GROCERYLEVEL', JSON.stringify(ItemId));
        break;
      case 32:
        setOtherLevel(ItemId)
        AsyncStorage.setItem('OTHERSHOPLEVEL', JSON.stringify(ItemId));
        break;
      case 33:
        setHouseLevel(ItemId)
        AsyncStorage.setItem('HOUSELEVEL', JSON.stringify(ItemId));
        break;
      case 34:
        setServiceLevel(ItemId)
        AsyncStorage.setItem('SERVICELEVEL', JSON.stringify(ItemId));
        break;
      case 35:
        setOutsideLevel(ItemId)
        AsyncStorage.setItem('OUTSIDELEVEL', JSON.stringify(ItemId));
        break;
      case 36:
        setEmLevl(ItemId)
        AsyncStorage.setItem('EMPTYLEVEL', JSON.stringify(ItemId));
        break;
      case 37:
        setGivingLevel(ItemId)
        AsyncStorage.setItem('GIVINGLEVEL', JSON.stringify(ItemId));
        break;
      case 38:
        setPreppLevel(ItemId)
        AsyncStorage.setItem('PREPPLEVEL', JSON.stringify(ItemId));
        break;

      case 39:
        setTubeLevel(ItemId)
        AsyncStorage.setItem('TUBELEVEL', JSON.stringify(ItemId));
        break;
      case 40:
        setSkinLevel(ItemId)
        AsyncStorage.setItem('SKINLEVEL', JSON.stringify(ItemId));
        break;
      case 41:
        setBloodLevel(ItemId)
        AsyncStorage.setItem('BLOODLEVEL', JSON.stringify(ItemId));
        break;
      case 42:
        setMedLevel(ItemId)
        AsyncStorage.setItem('MEDLEVEL', JSON.stringify(ItemId));
        break;
      case 43:
        setMobLevel(ItemId)
        AsyncStorage.setItem('MOBLEVEL', JSON.stringify(ItemId));
        break;
      case 44:
        setVitalLevel(ItemId)
        AsyncStorage.setItem('VITALLEVEL', JSON.stringify(ItemId));
        break;
      case 45:
        setNutritionLevel(ItemId)
        AsyncStorage.setItem('NUTRILEVEL', JSON.stringify(ItemId));
        break;
      case 46:
        setWoundLevel(ItemId)
        AsyncStorage.setItem('WOUNDLEVEL', JSON.stringify(ItemId));
        break;
      case 47:
        setCommLevel(ItemId)
        AsyncStorage.setItem('COMMLEVEL', JSON.stringify(ItemId));
        break;
      case 48:
        setEmLevl(ItemId)
        AsyncStorage.setItem('EMLEVEL', JSON.stringify(ItemId));
        break;
      case 49:
        setAssistLevel(ItemId)
        AsyncStorage.setItem('ASSISTLEVEL', JSON.stringify(ItemId));
        break;
      case 50:
        setCrisisLevel(ItemId)
        AsyncStorage.setItem('CRISISLEVEL', JSON.stringify(ItemId));
        break;
      case 51:
        setFallLevel(ItemId)
        AsyncStorage.setItem('FALLLEVEL', JSON.stringify(ItemId));
        break;
      case 52:
        setHomeLevel(ItemId)
        AsyncStorage.setItem('HOMELEVEL', JSON.stringify(ItemId));
        break;

      case 52:
        setEduLevel(ItemId)
        AsyncStorage.setItem('EDULEVEL', JSON.stringify(ItemId));
        break;

      default:
        console.log("Unknown ItemId:", ItemId);
    }
  };


  const OnSaveExit = () => { //NAVIGATE INTO THE MAIN SCREEN
    const answersArray = createAnswersArray();
    AsyncStorage.setItem('FUNCTIONAL_ABILITIES', JSON.stringify(answersArray))
    navigation.navigate('EnrollmentProgress')
  }

  useEffect(() => {
    onDisplayAnswers()
  }, [route?.params?.FunctionalAnswer])

  const onDisplayAnswers = () => {
    if (route?.params?.selectedItems[currentIndex]?.question == 'Eating') {
      const Eating = route?.params?.FunctionalAnswer?.filter(item => item.id == 23);
      const eatingOptionIds = Eating.map(item => item.option_id);
      setEatingLevel(eatingOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Dressing') {
      const Dressing = route?.params?.FunctionalAnswer?.filter(item => item.id == 24);
      const DressingOptionIds = Dressing.map(item => item.option_id);
      setDressLevel(DressingOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Transfer & Mobility') {
      const Transfer = route?.params?.FunctionalAnswer?.filter(item => item.id == 25);
      const TransferOptionIds = Transfer.map(item => item.option_id);
      setTransferLevel(TransferOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Bathing') {
      const Bathing = route?.params?.FunctionalAnswer?.filter(item => item.id == 26);
      const BathingOptionIds = Bathing.map(item => item.option_id);
      setBathLevel(BathingOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Dental Hygiene') {
      const Dental = route?.params?.FunctionalAnswer?.filter(item => item.id == 27);
      const DentalOptionIds = Dental.map(item => item.option_id);
      setDentalLevel(DentalOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Toileting') {
      const Toileting = route?.params?.FunctionalAnswer?.filter(item => item.id == 28);
      const ToilOptionIds = Toileting.map(item => item.option_id);
      setToilLevel(ToilOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Transportation') {
      const TransportOptionIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 29)
        .map(item => item.option_id);

      setTransportLevel(TransportOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Grocery Shopping') {
      const GroceryIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 31)
        .map(item => item.option_id);

      setGroceryLevel(GroceryIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Other Shopping') {
      const OtherShopIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 32)
        .map(item => item.option_id);

      setOtherLevel(OtherShopIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Housework') {
      const Housework = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 33)
        .map(item => item.option_id);

      setHouseLevel(Housework)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Preparing Meals') {

      const PreppingIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 34)
        .map(item => item.option_id);

      setPreppLevel(PreppingIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.question == 'Arranging Outside Services') {

      const OutsideOptionIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 35)
        .map(item => item.option_id);

      setOutsideLevel(OutsideOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 36) {
      const EmtyOptionIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 36)
        .map(item => item.option_id);

      setEmLevl(EmtyOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 37) {
      const GivingOptionIds = route?.params?.FunctionalAnswer
        ?.filter(item => item.id == 37)
        .map(item => item.option_id);

      setGivingLevel(GivingOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 38) {
      const PreppingOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 38)
      .map(item => item.option_id);

    setPreppLevel(PreppingOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 39) {
      const TubeOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 39)
      .map(item => item.option_id);

      setTubeLevel(TubeOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 40) {
      const SkinOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 40)
      .map(item => item.option_id);

      setSkinLevel(SkinOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 41) {
      const BloodOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 41)
      .map(item => item.option_id);

      setBloodLevel(BloodOptionIds)
    }

    else if (route?.params?.selectedItems[currentIndex]?.id == 42) {

      const MedOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 42)
      .map(item => item.option_id);

      setMedLevel(MedOptionIds)
    }

    else if (route?.params?.selectedItems[currentIndex]?.id == 43) {

      const MobOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 43)
      .map(item => item.option_id);

      setMedLevel(MobOptionIds)
    
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 44) {
      const VitalOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 44)
      .map(item => item.option_id);

      setVitalLevel(VitalOptionIds)
    
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 45) {

      const NutriOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 45)
      .map(item => item.option_id);

      setNutritionLevel(NutriOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 46) {
      const WoundOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 46)
      .map(item => item.option_id);

      setWoundLevel(WoundOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 47) {
      const CommOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 47)
      .map(item => item.option_id);

      setCommLevel(CommOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 48) {
      const EmotionOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 48)
      .map(item => item.option_id);

      setEmLevl(EmotionOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 49) {
      
      const AssistOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 49)
      .map(item => item.option_id);

      setAssistLevel(AssistOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 50) {
      
      const CrisisOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 50)
      .map(item => item.option_id);

      setCrisisLevel(CrisisOptionIds)
    }
    else if (route?.params?.selectedItems[currentIndex]?.id == 51) {

      const FallOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 51)
      .map(item => item.option_id);

      setFallLevel(FallOptionIds)
    }

    else if (route?.params?.selectedItems[currentIndex]?.id == 52) {
      const HomeOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 52)
      .map(item => item.option_id);

    setHomeLevel(HomeOptionIds)
    }

    else if (route?.params?.selectedItems[currentIndex]?.id == 53) {
      const EduOptionIds = route?.params?.FunctionalAnswer
      ?.filter(item => item.id == 53)
      .map(item => item.option_id);

      setEduLevel(EduOptionIds)
    }
  }





  const LevelOfHelp = route?.params?.Options?.filter((item) => item.question_id == route?.params?.selectedItems[currentIndex]?.id)
  console.log("LEVEL OF HELP.................", route?.params?.selectedItems[currentIndex]?.id)

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
      <View>
        <View style={{ marginLeft: GlobalSize(10) }}>
          <Text style={styles.heading}>{route?.params?.selectedItems[currentIndex]?.question}</Text>
          <Text style={styles.subHeading}>{RateYourAbilityText}</Text>
        </View>
        <Image style={styles.imageStyle} source={imageSource} />

        {Message &&
          <View style={[DEFAULTSTYLES.alignView, {}]}>
            <View style={styles.viewCard}>
              <Text style={styles.textMsg}>{Message}</Text>
            </View>
          </View>}

        <View style={{ marginHorizontal: GlobalSize(15), top: Message ? GlobalSize(-20) : GlobalSize(10) }}>

          <View style={styles.difChooser}>
            {LevelOfHelp?.map((item, index) => {
              const isSelected = index == selectedButton

              return (
                <View>
                  <TouchableOpacity
                    style={[styles.difChooserButton, {
                      borderColor: isSelected ? PRIMARYCOLOR : EatingLevel == item.id ?
                        PRIMARYCOLOR : DressLevel == item.id ? PRIMARYCOLOR : TransferLevel == item.id ?
                          PRIMARYCOLOR : BathLevel == item.id ? PRIMARYCOLOR : DentalLevel == item.id ?
                            PRIMARYCOLOR : ToilLevel == item.id ? PRIMARYCOLOR : TransportLevel == item.id ? PRIMARYCOLOR :
                              GroceryLevel == item.id ? PRIMARYCOLOR : OtherLevel == item.id ? PRIMARYCOLOR :
                                HouseLevel == item.id ? PRIMARYCOLOR : PreppLevel == item.id ? PRIMARYCOLOR :
                                  OutsideLevel == item.id ? PRIMARYCOLOR : EmLevel == item.id ? PRIMARYCOLOR : GivingLevel == item.id ?
                                    PRIMARYCOLOR : TubelLevel == item?.id ? PRIMARYCOLOR : SkinLevel == item.id ? PRIMARYCOLOR :
                                      BloodLevel == item.id ? PRIMARYCOLOR : ServiceLevel == item.id ? PRIMARYCOLOR :
                                        MedLevel == item.id ? PRIMARYCOLOR : MobLevl == item.id ? PRIMARYCOLOR :
                                          VitalLevel == item.id ? PRIMARYCOLOR : NutritionLevel == item.id ? PRIMARYCOLOR :
                                            WoundLevel == item.id ? PRIMARYCOLOR : CommLevel == item.id ? PRIMARYCOLOR :
                                              EmLevel == item.id ? PRIMARYCOLOR : AssistLevel == item.id ? PRIMARYCOLOR :
                                                CrisisLevel == item.id ? PRIMARYCOLOR : FallLevel == item.id ? PRIMARYCOLOR :
                                                  HomeLevel == item.id ? PRIMARYCOLOR : EduLevel == item.id ? PRIMARYCOLOR :
                                                    BORDERCOLOR5
                    }]}
                    onPress={() => handleButtonPress(item?.id, index)}>
                    <Text style={styles.difChooserButtonText}>{item?.option}</Text>
                  </TouchableOpacity>

                </View>
              )
            })}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.difChooserText}>Some Help</Text>
            <Text style={styles.difChooserText}>A Lot of Help</Text>
          </View>
        </View>

      </View>


      <View style={styles.bottomBar}>
        <Button
          style={styles.buttonStyle}
          onPress={() => handlePrevious()}>
          <Text style={styles.buttonTextStyle}>Back</Text>
        </Button>
        <Button style={styles.buttonStyle} onPress={() => { OnSaveExit() }}>
          <Text style={styles.buttonTextStyle}>Save & Exit</Text>
        </Button>

        <Button
          onPress={() => handleNext()}
          style={[styles.buttonStyle, { borderColor: BORDERCOLOR4 }]}>
          <Text style={[styles.buttonTextStyle, { color: TEXTCOLOR7 }]}>Next</Text>
        </Button>
      </View>

      <SupportModal
        Task={route?.params?.selectedItems[currentIndex]?.name}
        ModalOpen={ModalOpen}
        Message={Message}
        setModalOpen={setModalOpen} />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: GlobalSize(5),
    backgroundColor: BACKGROUNDWHITE
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: GlobalSize(20),
    marginLeft: GlobalSize(5),
    width: '100%',
  },
  viewCard: {
    backgroundColor: BACKGROUNDWHITE,
    elevation: 5,
    shadowOpacity: 0.5,
    width: DEFAULTWIDTH * 0.85,
    padding: GlobalSize(10),
    borderRadius: GlobalSize(10),
    top: GlobalSize(-35)
  },
  textMsg: {
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontMedium,
    textAlign: 'center',
  },
  heading: {
    fontSize: fontSize(20),
    fontFamily: FONTS.FontBold,
    color: TEXTCOLOR8,
    marginLeft: GlobalSize(7),
    marginTop: '5%',
  },
  subHeading: {
    color: TEXTCOLOR5,
    fontSize: GlobalSize(14),
    fontFamily: FONTS.FontMedium,
    marginLeft: GlobalSize(8),
  },
  buttonStyle: {
    width: GlobalSize(110),
    height: GlobalSize(40),
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: GlobalSize(8),
  },
  buttonTextStyle: {
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontMedium,
    fontSize: GlobalSize(14),
  },
  imageStyle: {
    width: '100%',
    height: '63%',
    marginBottom: GlobalSize(20),
  },
  difChooser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difChooserButtonText: {
    color: BOTTOMTABTEXT1,
    fontSize: GlobalSize(20),
    fontFamily: FONTS.FontMedium,
    //top: GlobalSize(2)
  },
  difChooserButton: {
    borderWidth: 1,
    borderRadius: GlobalSize(10),
    borderColor: BORDERCOLOR5,
    alignItems: 'center',
    justifyContent: 'center',
    width: GlobalSize(70),
    padding: GlobalSize(15)
    // height: GlobalSize(65)
  },
  difChooserText: {
    fontSize: fontSize(14),
    color: TEXTCOLOR5,
    fontFamily: FONTS.FontRegular,
    top: GlobalSize(5)
  },
  TextBtn: {
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontMedium,
    textAlign: 'center'
  },

  TouchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.84,
    height: DEFAULTWIDTH * 0.15,
    backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: GlobalSize(5),
    marginLeft: GlobalSize(10),
    marginRight: GlobalSize(10),
    elevation: 2,
  },
});

export default RateYourAbilityToHelp;
