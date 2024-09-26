
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { BACKGROUNDWHITE, BORDERCOLOR4, LINECOLOR1, TEXTCOLOR7 } from '../../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { Button } from 'react-native-paper';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BehaviorDetails from '../CaregiverDemographics/BehaviorDetails';

import ADLList from '../AbilityToHelpScreens/ADLList';
import { setADLOption } from '../../../../../redux/Slice/ValueStorage/ValueSliceKey';

import { useFocusEffect } from '@react-navigation/native';

const FunctionalMain = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const value = useSelector((state) => state?.getQuestions?.value);
    const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);

    const [CheckedReason, setCheckedReason] = useState([]);
    const [ADLItems, setADLItems] = useState([])
    const [pageNames, setPageNames] = useState(route?.params?.item?.page_names)
    const [Question, setQuestion] = useState(route?.params?.item?.questions)
    const [Option, setOptions] = useState(route?.params?.item?.options)

    const [EatingLevel, setEatingLevel] = useState(null)
    const [BathLevel, setBathLevel] = useState(null)
    const [DressLevel, setDressLevel] = useState(null)
    const [TransferLevel, setTransferLevel] = useState(null)
    const [DentalLevel, setDentalLevel] = useState(null)
    const [ToilLevel, setToilLevel] = useState(null)

    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [ADLLabel, setADLLabel] = useState(null)
    const [MedLabel, setMedLabel] = useState(null)
    const [TreatLabel, setTreatLabel] = useState(null)
    const [SafetyLabel, setSafetyLabel] = useState(null)

    const [ADLSelect, setADLSelect] = useState([])
    const [IADLSelect, setIADLSelect] = useState([])
    const [MEDSelect, setMEDSelect] = useState([])
    const [MEDSASSISTSelect, setMEDASSISTSelect] = useState([])
    const [SAFETYSelect, setSAFETYSelect] = useState([])

    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [ADLData, setADLData] = useState([]);
    const [IADLData, setIADLData] = useState([]);
    const [MEDData, setMEDData] = useState([]);
    const [AssistData, setAssistData] = useState([]);
    const [SafetyData, setSafetyData] = useState([]);
    const [Options, setOption] = useState([]);
    const [OptionReason, setOptionReason] = useState([]);
    const [currentPageData, setCurrentPageData] = useState()

    const [MedValue, setMedValue] = useState(null)
    const [ADLValue, setADLValue] = useState(null)
    const [TreatValue, setTreatValue] = useState(null)
    const [SafetyValue, setSafetyValue] = useState(null)
    const [FunctionalAnswer,setFunctionalAnswer] = useState([])

    const [mappedData, setMappedData] = useState([])

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.AssessmentQuest.data,
            error: state.AssessmentQuest.error,
            isLoading: state.AssessmentQuest.isLoading,
            // EatingLevel:state.setEatingLevel.
        }),
        shallowEqual
    );



    useEffect(() => {
   
        getData()
        // Add event listener for focus event
        const unsubscribe = navigation.addListener('focus', () => {
            getData()
        });

        // Clean up event listener
        return () => {
            unsubscribe();
        };
    }, [navigation]);


    const getData = async () => {
        try {
          const [
            ADLLabel, 
            MedLabel, 
            TreatLabel, 
            SafetyLabel, 
            EatingLevel
          ] = await Promise.all([
            AsyncStorage.getItem('ADLLabel'),
            AsyncStorage.getItem('MedLabel'),
            AsyncStorage.getItem('TreatLabel'),
            AsyncStorage.getItem('SafetyLabel'),
            AsyncStorage.getItem('EATLEVEL')
          ]);
      
          const jsonADL = await AsyncStorage.getItem('ADLData');
          if (jsonADL) {
            setADLSelect(JSON.parse(jsonADL));
          } else {
            console.log('No array found in AsyncStorage.');
          }
      
          const jsonIADL = await AsyncStorage.getItem('IADLData');
          if (jsonIADL) {
            setIADLSelect(JSON.parse(jsonIADL));
          } else {
            console.log('No array found in AsyncStorage.');
          }
      
          const jsonMed = await AsyncStorage.getItem('MEDData');
          if (jsonMed) {
            setMEDSelect(JSON.parse(jsonMed));
          } else {
            console.log('No array found in AsyncStorage.');
          }
      
          const jsonMedassist = await AsyncStorage.getItem('MEDASSISTData');
          if (jsonMedassist) {
            setMEDASSISTSelect(JSON.parse(jsonMedassist));
          } else {
            console.log('No array found in AsyncStorage.');
          }
      
          const jsonSafety = await AsyncStorage.getItem('SAFETYData');
          if (jsonSafety) {
            setSAFETYSelect(JSON.parse(jsonSafety));
          } else {
            console.log('No array found in AsyncStorage.');
          }
      
          const labels = [
            { key: 'ADLLabel', value: ADLLabel, setValue: setADLLabel },
            { key: 'MedLabel', value: MedLabel, setValue: setMedLabel },
            { key: 'TreatLabel', value: TreatLabel, setValue: setTreatLabel },
            { key: 'SafetyLabel', value: SafetyLabel, setValue: setSafetyLabel },
            { key: 'EATLEVEL', value: EatingLevel, setValue: setEatingLevel }
          ];
      
          labels.forEach(async (label) => {
            if (label.value === null || label.value === undefined) {
              await AsyncStorage.removeItem(label.key);
              console.log(`${label.key} was null or undefined, removed from AsyncStorage`);
            } else {
              label.setValue(label.value);
              console.log(`Retrieved ${label.key} from AsyncStorage:`, label.value);
            }
          });
      
        } catch (error) {
          console.error('Error retrieving data from AsyncStorage:', error);
        }
      };

    useFocusEffect(
        useCallback(() => {
            
            const currentPageData = pageNames?.[currentPageIndex];

            const filteredQuestions = Question?.filter(question => question?.page_name_id === currentPageData?.id);
            const ADLData = Question?.filter(question => question?.page_name_id === 5);
            const IADLData = Question?.filter(question => question?.page_name_id === 6);
            const MEDData = Question?.filter(question => question?.page_name_id === 8);
            const AssistData = Question?.filter(question => question?.page_name_id === 9);
            const SafetyData = Question?.filter(question => question?.page_name_id === 10);

            dispatch(setADLOption(route?.params?.item?.options));

            const Options = route?.params?.item?.options
                ?.filter(option => option?.question_id === filteredQuestions[0]?.id)
                .map(option => ({ ...option }));

            const OptionReason = Options
                ?.filter(option => option?.question_id === 19)
                .map(option => ({ ...option }));

            setCurrentPageData(currentPageData);
            setFilteredQuestions(filteredQuestions);
            setADLData(ADLData);
            setIADLData(IADLData);
            setMEDData(MEDData);
            setAssistData(AssistData);
            setSafetyData(SafetyData);
            setOption(Options);
            setOptionReason(OptionReason);
console.log("FILTERED QUESTIONS...............",filteredQuestions)
            // Cleanup function
            return () => {
                console.log('Cleaning up...');
                setCurrentPageData(null);
                setFilteredQuestions([]);
                setADLData([]);
                setIADLData([]);
                setMEDData([]);
                setAssistData([]);
                setSafetyData([]);
                setOption([]);
                setOptionReason([]);
            };
        }, [pageNames, currentPageIndex, data, Question, route])
    );

    const OnValidation = () => {

        const answersArray = createAnswersArray();
        AsyncStorage.setItem('TYPEOFASSIST_ANSWERS', JSON.stringify(answersArray))
        console.log("answers......................", answersArray);
        NavigationNext()
    }

    const createAnswersArray = () => { //CREATE AN ARRAY WITH ALL THE QUESTION ID AND OPTIONS

        return route?.params?.item?.questions?.map((question) => {
            console.log("TYPE ANSWER...............", question)
            if (question.id == 19 && ADLValue) {
                const ADLArray = Array.isArray(ADLValue) ? ADLValue : [ADLValue];
                return {
                    question_id: question.id,
                    option_ids: ADLArray
                };
            }
            else if (question.id == 20 && MedValue) {
                const MedArray = Array.isArray(MedValue) ? MedValue : [MedValue];
                return {
                    question_id: question.id,
                    option_ids: MedArray
                };
            }
            else if (question.id == 21 && TreatValue) {
                const TreatArray = Array.isArray(TreatValue) ? TreatValue : [TreatValue];
                return {
                    question_id: question.id,
                    option_ids: TreatArray
                };
            }
            else if (question.id == 22 && SafetyValue) {
                const SafetyArray = Array.isArray(SafetyValue) ? SafetyValue : [SafetyValue];
                return {
                    question_id: question.id,
                    option_ids: SafetyArray
                };
            }
            return null;
        }).filter(item => item !== null);
    };


    const NavigationNext = () => {
        console.log("NEXT TITLE.................", currentPageData?.page_name, IADLSelect?.length)
        OnSaveData()
        const currentIndex = TitleGroup?.indexOf(currentPageData?.page_name);
        const nextIndex = currentIndex + 1;
        const nextTitle = TitleGroup[nextIndex];



        if (currentPageData?.page_name == 'Activities of Daily Living' && ADLSelect?.length > 0) {

            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: ADLSelect,
                currentPageDataName: 'Instrumental Activities of Daily Living',
                currentPageIndex: currentPageIndex,
                titleGroup: route?.params?.titleGroup,
                mainText: 'Activities of Daily Living',
                Options: Option,
                pageNames: route?.params?.item?.page_names,
                FunctionalAnswer:FunctionalAnswer
            })

        } else if (currentPageData?.page_name == 'Activities of Daily Living' && IADLSelect?.length === 0) {
            setCurrentPageIndex(currentPageIndex + 1)
        }
        else if (currentPageData?.page_name == 'Instrumental Activities of Daily Living' && IADLSelect?.length === 0) {
            setCurrentPageIndex(currentPageIndex + 1)
            console.log("INCREMENT DATA.................", currentPageIndex)
        }
        else if (currentPageData?.page_name == 'Instrumental Activities of Daily Living' && IADLSelect?.length > 0) {

            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: IADLSelect,
                currentPageDataName: 'Medical Procedure/Treatments',
                titleGroup: route?.params?.titleGroup,
                mainText: 'Instrumental Activities of Daily Living',
                Options: Option,
                pageNames: route?.params?.item?.page_names,
            })
        }

        else if (route?.params?.currentPageDataName == 'Instrumental Activities of Daily Living' && IADLSelect?.length > 0) {
            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: IADLSelect,
                currentPageDataName: 'Medical Procedure/Treatments',
                titleGroup: route?.params?.titleGroup,
                mainText: 'Instrumental Activities of Daily Living',
                Options: Option,
                EatingLevel: EatingLevel,
                setEatingLevel: setEatingLevel,
                pageNames: route?.params?.item?.page_names,
            })

        }
        else if (currentPageData?.page_name == 'Medical Procedure/Treatments' && MEDSelect?.length == 0) {
            setCurrentPageIndex(currentPageIndex + 1)
        }
        else if (currentPageData?.page_name == 'Medical Procedure/Treatments' && MEDSelect?.length > 0) {
            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: MEDSelect,
                currentPageDataName: 'Medication Assistance',
                titleGroup: route?.params?.titleGroup,
                mainText: 'Medical Procedure/Treatments',
                Options: Option,
                pageNames: route?.params?.item?.page_names,
            })
        }
        else if (route?.params?.currentPageDataName == 'Medical Procedure/Treatments' && MEDSelect?.length == 0) {

            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: MEDSelect,
                currentPageDataName: 'Medication Assistance',
                titleGroup: route?.params?.titleGroup,
                mainText: 'Medical Procedure/Treatments',
                Options: Option,
                pageNames: route?.params?.item?.page_names,
            })
        }

        else if (currentPageData?.page_name == 'Medication Assistance' && MEDSASSISTSelect?.length == 0) {
            setCurrentPageIndex(currentPageIndex + 1)
            console.log("FIRST CONDITION.................")
        }
        else if (currentPageData?.page_name == 'Medication Assistance' && MEDSASSISTSelect?.length > 0) {
            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: MEDSASSISTSelect,
                currentPageDataName: 'Supervision and Safety',
                titleGroup: route?.params?.titleGroup,
                mainText: 'Medication Assistance',
                Options: Option,
                pageNames: route?.params?.item?.page_names,
            })
            console.log("DONTGO HERE................")
        }

        else if (currentPageData?.page_name == 'Supervision and Safety' && SAFETYSelect?.length == 0) {

            setCurrentPageIndex(currentPageIndex + 1)
            NextScreenNavigation(nextTitle)
        }
        else if (currentPageData?.page_name == 'Supervision and Safety' && SAFETYSelect?.length > 0) {
            setCurrentPageIndex(currentPageIndex + 1)
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: SAFETYSelect,
                currentPageDataName: 'Supervision and Safety',
                titleGroup: route?.params?.titleGroup,
                titleName: nextTitle,
                mainText: 'Supervision and Safety',
                Options: Option,
                pageNames: route?.params?.item?.page_names,
            })
            console.log("HEY...................", SAFETYSelect)
        }

        else if (route?.params?.currentPageDataName == 'Supervision and Safety') {

            NextScreenNavigation(nextTitle)
        }

        else {
            console.log("here..................")
            setCurrentPageIndex(currentPageIndex + 1)
        }
    }


    const handleNext = () => {
        const nextPageIndex = currentPageIndex + 1;

        if (currentPageIndex < pageNames.length - 1) {
            if (currentPageData.page_name === 'Activities of Daily Living' && ADLSelect?.length > 0) {
                navigation.navigate('RateYourAbilityToHelp', {
                    selectedItems: ADLSelect,
                    currentPageDataName: 'Instrumental Activities of Daily Living',
                    currentPageIndex: nextPageIndex,
                    titleGroup: route?.params?.titleGroup,
                    mainText: 'Activities of Daily Living',
                    pageNames: route?.params?.item?.page_names,
                    Options: Option
                });
            } else if (currentPageData.page_name === 'Instrumental Activities of Daily Living' && IADLSelect?.length > 0) {
                navigation.navigate('RateYourAbilityToHelp', {
                    selectedItems: IADLSelect,
                    currentPageDataName: 'Medical Procedure/Treatments',
                    currentPageIndex: nextPageIndex,
                    titleGroup: route?.params?.titleGroup,
                    pageNames: route?.params?.item?.page_names,
                    mainText: 'Instrumental Activities of Daily Living',
                    Options: Option
                });
            } else {
                setCurrentPageIndex(nextPageIndex);
            }
        }
    };



    const NavigationNext1 = () => {
        console.log("NEXT TITLE.................", currentPageData?.page_name, IADLSelect?.length);
        OnSaveData();

        const currentIndex = TitleGroup?.indexOf(currentPageData?.page_name);
        const nextIndex = currentIndex + 1;
        const nextTitle = TitleGroup[nextIndex];

        const navigateToRateYourAbilityToHelp = (selectedItems, currentPageDataName, mainText) => {
            navigation.navigate('RateYourAbilityToHelp', {
                selectedItems: selectedItems,
                currentPageDataName: currentPageDataName,
                currentPageIndex: currentPageIndex + 1,
                titleGroup: route?.params?.titleGroup,
                mainText: mainText,
                Options: Option
            });
        };

        const incrementPageIndex = () => {
            setCurrentPageIndex(currentPageIndex + 1);
        };

        const handleNavigation = () => {
            console.log("Current Page Name: ", currentPageData?.page_name);
            switch (currentPageData?.page_name) {
                case 'Activities of Daily Living':
                    if (ADLSelect?.length > 0) {
                        incrementPageIndex();
                        navigateToRateYourAbilityToHelp(ADLSelect, 'Instrumental Activities of Daily Living', 'Activities of Daily Living');
                    } else if (IADLSelect?.length === 0) {
                        incrementPageIndex();
                    }
                    break;

                case 'Instrumental Activities of Daily Living':
                    if (IADLSelect?.length === 0) {
                        incrementPageIndex();
                        console.log("INCREMENT DATA.................", currentPageIndex);
                    } else if (IADLSelect?.length > 0) {
                        incrementPageIndex();
                        navigateToRateYourAbilityToHelp(IADLSelect, 'Medical Procedure/Treatments', 'Instrumental Activities of Daily Living');
                    }
                    break;

                case 'Medical Procedure/Treatments':
                    if (MEDSelect?.length === 0) {
                        incrementPageIndex();
                        console.log("INCREMENT");
                    } else if (MEDSelect?.length > 0) {
                        incrementPageIndex();
                        navigateToRateYourAbilityToHelp(MEDSelect, 'Medication Assistance', 'Medical Procedure/Treatments');
                    }
                    break;

                case 'Medication Assistance':
                    if (MEDSASSISTSelect?.length === 0) {
                        incrementPageIndex();
                        console.log("FIRST CONDITION.................");
                    } else if (MEDSASSISTSelect?.length > 0) {
                        incrementPageIndex();
                        navigateToRateYourAbilityToHelp(MEDSASSISTSelect, 'Supervision and Safety', 'Medication Assistance');
                        console.log("DONTGO HERE................");
                    }
                    break;

                case 'Supervision and Safety':
                    if (SAFETYSelect?.length === 0) {
                        incrementPageIndex();
                        NextScreenNavigation(nextTitle);
                    } else if (SAFETYSelect?.length > 0) {
                        incrementPageIndex();
                        navigateToRateYourAbilityToHelp(SAFETYSelect, 'Supervision and Safety', 'Supervision and Safety');
                        console.log("HEY...................", SAFETYSelect);
                    }
                    break;

                default:
                    console.log("Default case, here..................");
                    incrementPageIndex();
                    break;
            }
        };

        handleNavigation();

        // Additional navigation checks based on route params
        if (route?.params?.currentPageDataName === 'Instrumental Activities of Daily Living' && IADLSelect?.length > 0) {
            incrementPageIndex();
            navigateToRateYourAbilityToHelp(IADLSelect, 'Medical Procedure/Treatments', 'Instrumental Activities of Daily Living');
        }

        if (route?.params?.currentPageDataName === 'Medical Procedure/Treatments' && MEDSelect?.length === 0) {
            incrementPageIndex();
            navigateToRateYourAbilityToHelp(MEDSelect, 'Medication Assistance', 'Medical Procedure/Treatments');
        }

        if (route?.params?.currentPageDataName === 'Supervision and Safety') {
            NextScreenNavigation(nextTitle);
        }
    };



    const NextScreenNavigation = (n) => { //FUNCTION FOR FINDING THE LAST INDEX OF AN AARRAY AND NAVIAGTE TO THAT SCREEN

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

            navigation.navigate('SDOHSelection',
                {
                    mainText: 'SDOH Assessment',
                    pages: caregivingStyleTitle?.page_names,
                    item: caregivingStyleTitle,

                });
                navigation.navigate('SDOHSelection', {
                    mainText: 'SDOH Assessment',
                    pages: caregivingStyleTitle?.page_names,
                    selectedItems :caregivingStyleTitle.page_names,
                    selectedQuest:caregivingStyleTitle,
                    titleGroup:route?.params?.titleGroup
                  });
        }
        else {

            navigation.navigate('EnrollmentProgress')
        }
    }

    const NavigationBack = () => { //FUNCTION FOR NAVIGATE BACK TO THE SCREEN

        if (currentPageIndex !== 0) {
            setCurrentPageIndex(currentPageIndex - 1)
        } else {
            navigation.goBack()
        }
    }


    const OnSaveData = () => { //FOR SAVING THE DATA INTO ASYNC

        AsyncStorage.setItem('ADLLabel', ADLLabel)
        AsyncStorage.setItem('MedLabel', MedLabel)
        AsyncStorage.setItem('TreatLabel', TreatLabel)
        AsyncStorage.setItem('SafetyLabel', SafetyLabel)
        AsyncStorage.setItem('ADLData', JSON.stringify(ADLSelect))
        AsyncStorage.setItem('IADLData', JSON.stringify(IADLSelect))
        AsyncStorage.setItem('MEDData', JSON.stringify(MEDSelect))
        AsyncStorage.setItem('MEDASSISTData', JSON.stringify(MEDSASSISTSelect))
        AsyncStorage.setItem('SAFETYData', JSON.stringify(SAFETYSelect))
    }



    const OnSaveExit = () => { //FUNCTION FOR SAVE DATA AND EXIT 
        const answersArray = createAnswersArray();
        AsyncStorage.setItem('TYPEOFASSIST_ANSWERS', JSON.stringify(answersArray))
        OnSaveData()
        navigation.navigate('EnrollmentStack', {
            screen: 'EnrollmentProgress'
        })
    }

    useEffect(() => {
        // Filter questions based on page_name_id
        const filteredQuestions = route?.params?.item?.questions?.filter(question => question.page_name_id === 4);

        // Map filtered questions with corresponding answers
        const mappedData = filteredQuestions?.map(question => {
            const answer = route?.params?.item?.patient_answers?.find(pa => pa.question_id === question.id);
            console.log("ANSWER...............", answer);
            return {
                ...question,
                answer: answer ? (answer?.answer ? answer?.answer : answer?.option_value) : null,
                option_id: answer?.option_value ? answer?.option_id : null
            };
        });

        setMappedData(mappedData);
    }, [route?.params?.item?.patient_answers]);

    useEffect(() => {
        // Ensure Length is properly defined
        //const Length = route?.params?.selectedItems?.length - 1; // Assuming Length should be the last index
      
        // if (Length >= 0) {
          // Filter questions with page_name_id equal to the id of the last selected item
        //   const QuestionFilter = route?.params?.selectedQuest?.questions?.filter(
        //     (item) => item?.page_name_id === route?.params?.selectedItems[Length]?.id
        //   );
      
        if(ADLSelect?.length > 0){
          // Map questions with corresponding answers
          const FunctionalData = ADLSelect?.map(question => {
            const answer = route?.params?.selectedQuest?.patient_answers?.find(pa => pa.question_id === question.id);
            console.log("ANSWER...............",answer)
            return {
              ...question,
              answer: answer ? (answer?.answer ? answer?.answer : answer?.option_value) : null,
              option_id: answer?.option_value ? answer?.option_id : null
            };
          });
      
          setFunctionalAnswer(FunctionalData);
        }
      }, [ADLSelect]);


    console.log("QUESTIONS................",currentPageData?.page_name)
    return (
        <View style={styles.container}>


            {currentPageData?.page_name == 'Types of Sources and Assistance' ?
                <BehaviorDetails
                    Title={currentPageData?.page_name}
                    filteredQuestions={filteredQuestions}
                    Options={route?.params?.item?.options}
                    MedValue={MedValue}
                    setMedValue={setMedValue}
                    ADLValue={ADLValue}
                    setADLValue={setADLValue}
                    TreatValue={TreatValue}
                    setTreatValue={setTreatValue}
                    SafetyValue={SafetyValue}
                    setSafetyValue={setSafetyValue}
                    ADLLabel={ADLLabel}
                    setADLLabel={setADLLabel}
                    MedLabel={MedLabel}
                    setMedLabel={setMedLabel}
                    TreatLabel={TreatLabel}
                    setTreatLabel={setTreatLabel}
                    SafetyLabel={SafetyLabel}
                    setSafetyLabel={setSafetyLabel}
                    mappedData={mappedData}

                /> :
                route?.params?.currentPageDataName == 'Activities of Daily Living' || currentPageData?.page_name == 'Activities of Daily Living' ?
                    <ADLList
                        ADLItems={ADLItems}
                        setADLItems={setADLItems}
                        filteredQuestions={ADLData}
                        Options={OptionReason}
                        Checked={CheckedReason}
                        selectedItems={ADLSelect}
                        setSelectedItems={setADLSelect}
                        mainText='Activities of Daily Living'
                        setChecked={setCheckedReason}
                    /> :

                    route?.params?.currentPageDataName == 'Instrumental Activities of Daily Living' || currentPageData?.page_name == 'Instrumental Activities of Daily Living' ?
                        <ADLList
                            ADLItems={ADLItems}
                            setADLItems={setADLItems}
                            filteredQuestions={IADLData}
                            Options={OptionReason}
                            Checked={CheckedReason}
                            selectedItems={IADLSelect}
                            setSelectedItems={setIADLSelect}
                            mainText='Instrumental Activities of Daily Living'
                            setChecked={setCheckedReason} /> :

                        route?.params?.currentPageDataName == 'Medical Procedure/Treatments' || currentPageData?.page_name == 'Medical Procedure/Treatments' ?
                            <ADLList
                                ADLItems={ADLItems}
                                setADLItems={setADLItems}
                                filteredQuestions={MEDData}
                                Options={OptionReason}
                                Checked={CheckedReason}
                                selectedItems={MEDSelect}
                                setSelectedItems={setMEDSelect}
                                mainText='Medical Procedure/Treatments'
                                setChecked={setCheckedReason} /> :

                            route?.params?.currentPageDataName == 'Medication Assistance' || currentPageData?.page_name == 'Medication Assistance' ?
                                <ADLList
                                    ADLItems={ADLItems}
                                    setADLItems={setADLItems}
                                    filteredQuestions={AssistData}
                                    Options={OptionReason}
                                    Checked={CheckedReason}
                                    selectedItems={MEDSASSISTSelect}
                                    setSelectedItems={setMEDASSISTSelect}
                                    mainText='Medication Assistance'
                                    setChecked={setCheckedReason} /> :

                                route?.params?.currentPageDataName == 'Supervision and Safety' || currentPageData?.page_name == 'Supervision and Safety' ?
                                    <ADLList
                                        ADLItems={ADLItems}
                                        setADLItems={setADLItems}
                                        filteredQuestions={SafetyData}
                                        Options={OptionReason}
                                        Checked={CheckedReason}
                                        selectedItems={SAFETYSelect}
                                        setSelectedItems={setSAFETYSelect}
                                        mainText='Supervision and Safety'
                                        setChecked={setCheckedReason} /> :
                                    null}

            <View style={styles.viewB}>
                <View style={styles.viewButton}>
                    <Button onPress={() => NavigationBack()} style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Back</Text>
                    </Button>

                    <Button
                        onPress={() => OnSaveExit()}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonText}>Save & Exit</Text>
                    </Button>


                    {currentPageData?.page_name == 'Types of Sources and Assistance' ?
                        <Button
                            style={[styles.buttonStyle, {
                                borderColor: BORDERCOLOR4
                            }]}
                            onPress={() => OnValidation()}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color: TEXTCOLOR7
                                    }
                                ]}>
                                Next
                            </Text>
                        </Button> :
                        route?.params?.currentPageDataName == 'Activities of Daily Living' || currentPageData?.page_name == 'Activities of Daily Living' ?
                            <Button
                                style={[styles.buttonStyle, { borderColor: ADLSelect?.length > 0 ? BORDERCOLOR4 : LINECOLOR1 }]}
                                onPress={() => { ADLSelect?.length > 0 ? NavigationNext() : console.log("null") }}>
                                <Text
                                    style={[
                                        styles.buttonText, { color: ADLSelect?.length > 0 ? TEXTCOLOR7 : BORDERCOLOR4 }

                                    ]}>
                                    Next
                                </Text>
                            </Button> :
                            route?.params?.currentPageDataName == 'Instrumental Activities of Daily Living' || currentPageData?.page_name == 'Instrumental Activities of Daily Living' ?
                                <Button
                                    style={[styles.buttonStyle, { borderColor: IADLSelect?.length > 0 ? BORDERCOLOR4 : LINECOLOR1 }]}
                                    onPress={() => { IADLSelect?.length > 0 ? NavigationNext() : console.log("null") }}>
                                    <Text
                                        style={[
                                            styles.buttonText,
                                            { color: IADLSelect?.length > 0 ? TEXTCOLOR7 : BORDERCOLOR4 }
                                        ]}>
                                        Next
                                    </Text>
                                </Button> :
                                route?.params?.currentPageDataName == 'Medical Procedure/Treatments' || currentPageData?.page_name == 'Medical Procedure/Treatments' ?
                                    <Button
                                        style={[styles.buttonStyle, { borderColor: MEDSelect?.length > 0 ? BORDERCOLOR4 : LINECOLOR1 }]}
                                        onPress={() => { MEDSelect?.length > 0 ? NavigationNext() : console.log("null") }}>
                                        <Text
                                            style={[
                                                styles.buttonText,
                                                { color: MEDSelect?.length > 0 ? TEXTCOLOR7 : BORDERCOLOR4 }
                                            ]}>
                                            Next
                                        </Text>
                                    </Button> :

                                    route?.params?.currentPageDataName == 'Medication Assistance' || currentPageData?.page_name == 'Medication Assistance' ?
                                        <Button
                                            style={[styles.buttonStyle, { borderColor: MEDSASSISTSelect?.length > 0 ? BORDERCOLOR4 : LINECOLOR1 }]}
                                            onPress={() => { MEDSASSISTSelect?.length > 0 ? NavigationNext() : console.log("null") }}>
                                            <Text
                                                style={[
                                                    styles.buttonText,
                                                    { color: MEDSASSISTSelect?.length > 0 ? TEXTCOLOR7 : BORDERCOLOR4 }
                                                ]}>
                                                Next
                                            </Text>
                                        </Button> :
                                        route?.params?.currentPageDataName == 'Supervision and Safety' || currentPageData?.page_name == 'Supervision and Safety' ?
                                            <Button
                                                style={[styles.buttonStyle, { borderColor: SAFETYSelect?.length > 0 ? BORDERCOLOR4 : LINECOLOR1 }]}
                                                onPress={() => { SAFETYSelect?.length > 0 ? NavigationNext() : console.log("null") }}>
                                                <Text
                                                    style={[
                                                        styles.buttonText,
                                                        { color: SAFETYSelect?.length > 0 ? TEXTCOLOR7 : BORDERCOLOR4 }
                                                    ]}>
                                                    Next
                                                </Text>
                                            </Button> : null}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    currentPage: {
        fontSize: 20,
        marginBottom: 20,
    },
    buttonContainer: {

    },
    buttonText: {
        color: TEXTCOLOR7,
        fontFamily: 'Inter-Medium',
        fontSize: fontSize(14),
    },
    buttonStyle: {
        borderRadius: GlobalSize(8),
        borderWidth: 1,
        margin: GlobalSize(5),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.29,
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // alignItems: 'center',
    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: DEFAULTWIDTH * 0.02,

    },
    viewB: {
        // position: 'absolute',
        bottom: 10,
        // backgr5undColor: BACKGROUNDWHITE,
        // paddingBottom: GlobalSize(20),

    },
});

export default FunctionalMain;

