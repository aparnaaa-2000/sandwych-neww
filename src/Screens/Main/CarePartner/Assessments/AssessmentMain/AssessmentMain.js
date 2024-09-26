
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { BACKGROUNDWHITE, BORDERCOLOR4, LINECOLOR1, TEXTCOLOR7 } from '../../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { Button, Title } from 'react-native-paper';
import HealthChallengesForm from '../../../../../Components/CarePartner/Assessments/SubAssessment/HealthChallenges';
import OpenEnded from '../../../../../Components/CarePartner/Assessments/SubAssessment/OpenEnded';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReasonsForm from '../../../../../Components/CarePartner/Assessments/SubAssessment/ReasonForCare';

const AssessmentMain = ({ route, navigation }) => {

  const dispatch = useDispatch();

  const [Details, setDetails] = useState(0)
  const [Checked, setChecked] = useState([])
  const [CheckedReason, setCheckedReason] = useState([]);
  const [Options, setOptions] = useState([])
  const [ReasonOption, setReasonOption] = useState([])
  const [MainText, setMainText] = useState(null);
  const [BigText, setBigText] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [mappedData, setMappedData] = useState([])
  const [selectedItems1,setSelectedItems1] = useState([])
  const [selectedItems2,setSelectedItems2] = useState([])

  const value = useSelector((state) => state?.getQuestions?.value);

  const { data, error, isLoading, titleGroup, TitleID } = useSelector(
    state => ({
      data: state.AssessmentQuest.data,
      error: state.AssessmentQuest.error,
      isLoading: state.AssessmentQuest.isLoading,
      titleGroup: state?.getPageNameValue?.titleGroup,
      TitleID: state?.getPageNameValue?.TitleID
    }),
    shallowEqual
  );

  const SaveExit = () => { //NAVIGATE INTO MAIN SCREEN
    storeData()
    navigation.navigate('EnrollmentStack', {
      screen: 'EnrollmentProgress'
    })
  }



  const currentPageData = route?.params?.item?.page_names?.[currentPageIndex]; // FUNCTION FOR GETTING THE CURRENT PAGE 
  const filteredQuestions = route?.params?.item?.questions?.filter(question => question?.page_name_id === currentPageData?.id); // FUNCTION FOR GETTING THE QUESTIONS

  const openEndQuestion = route?.params?.item?.questions?.filter(question => question?.page_name_id === 3); //FUNCTION FOR THE FILTER THE QUESTIONS BASED ON QUESTION_ID
  useEffect(() => {
    // Filter questions with page_name_id == 3
    const filteredQuestions = route?.params?.item?.questions?.filter(question => question.page_name_id === 3);

    // Map questions with corresponding answers
    const mappedData = filteredQuestions?.map(question => {
      const answer = route?.params?.item?.patient_answers?.find(pa => pa.question_id === question.id);
      return {
        ...question,
        answer: answer ? (answer?.answer ? answer?.answer : answer?.option_value) : null,
        option_id: answer?.option_value ? answer?.option_id : null
      };
    });

    setMappedData(mappedData);
  }, [route?.params?.item?.questions, route?.params?.item?.patient_answers]);



  const NavigationNext = () => { //NAVIGATE INTO THE NEXT SCREEN BASED ON INDEX

    if (currentPageIndex !== 2) {
      if (currentPageData === 'Details' && Details === 0) {
        setCurrentPageIndex(Details + 1)
      }
      else {
        setCurrentPageIndex(currentPageIndex + 1)
      }
    } else {
      NavigationNextContinue()
    }
  }

  const ValidationChecks = () => { // FUNCTION FOR CHECKING THE VALIDATION
    if (currentPageData?.page_name == 'Details' && Details === 0) {
      if(selectedItems1?.length > 0){
        OnHealthData()
        NavigationNext()
      }
      else if(Checked?.length>0){
        OnHealthData()
        NavigationNext()
      }
    
    }
    else if (currentPageData?.page_name == 'Open Ended' && Checked?.length > 0
      ) {
      OnReasonData()
      NavigationNext()
    }
    else if (Checked?.length > 0 && CheckedReason?.length > 0) {
      const answersArray = createAnswersArray(); //STORES THE DATA INTO ASYNC
      AsyncStorage.setItem('OPENEND_ANSWERS', JSON.stringify(answersArray))
     // console.log("answers......................", answersArray);
      NavigationNext()
    } else {

    }
  }

  const NavigationNextContinue = () => { //FUNCTION FOR FIND THE NEXT SCREEN

    storeData() //STORE THE ANSWERS INTO ASYNC

    // Find the index of the current title in the array
    const currentIndex = TitleID?.indexOf(2);

    if (currentIndex !== -1) {
      // Increment the index by 1 to get the index of the next title
      const nextIndex = currentIndex + 1;

      if (nextIndex < titleGroup?.length) {
        // Retrieve the next title from the array using the incremented index
        const nextTitle = TitleID[nextIndex];
        const caregivingStyleTitle = value?.find(title => title?.title_id === nextTitle);

        if (nextTitle == 2) {
          navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
        }
        else if (nextTitle == 4) {
          navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: caregivingStyleTitle?.page_names, item: caregivingStyleTitle });
        }
        else if (nextTitle == 3) {
          navigation.navigate('FunctionalMain', { mainText: 'Ability to Help 1', pages: caregivingStyleTitle?.page_names, item: caregivingStyleTitle });
        }
        else if (nextTitle == 7) {
          navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle })
        }
        else if (nextTitle == 6) {
          navigation.navigate('CaregiverDemographics', { item: caregivingStyleTitle })
        }
        else if (nextTitle == 1) {
          navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: title?.flat(), titleName: item?.title_name })
        }
        else if (nextTitle == 9) {
          navigation.navigate('PersonalInfo', { item: caregivingStyleTitle })
        }
        else if (nextTitle == 8) {
          navigation.navigate('BasicInfo2', { item: caregivingStyleTitle })
        }
        console.log("Next title:", nextTitle);
      } else {

        console.log("No more titles available after the current title.");
        navigation.navigate('EnrollmentProgress')
      }
    } else {
      console.log("Current title not found in the array.");
    }
  }


  const NavigationBack = () => {
    if (currentPageIndex !== 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    } else {
      navigation.goBack()
    }
  }

  useEffect(() => {
    retrieveData()
  }, [])

  const storeData = async () => {
    try {
      const jsonHealth = JSON.stringify(Options);
      const jsonReason = JSON.stringify(ReasonOption);
      const jsonHealthValue = JSON.stringify(Checked);
      const jsonReasonValue = JSON.stringify(CheckedReason);
      await AsyncStorage.setItem('HealthAns', jsonHealth);
      await AsyncStorage.setItem('ReasonAnswers', jsonReason);
      await AsyncStorage.setItem('BigTextData', BigText);
      await AsyncStorage.setItem('MainTextData', MainText);
      await AsyncStorage.setItem('HealthCheck', jsonHealthValue);
      await AsyncStorage.setItem('ReasonCheck', jsonReasonValue);
    } catch (error) {
      // Handle errors
    }
  };

  const retrieveData = async () => { //GET THE ASYNC VALUES
    try {
      const retrievedData = await AsyncStorage.getItem('HealthAns');
      const reasonData = await AsyncStorage.getItem('ReasonAnswers');
      const BigTextData = await AsyncStorage.getItem('BigTextData');
      const MainTextData = await AsyncStorage.getItem('MainTextData');
      const HealthCheckValue = await AsyncStorage.getItem('HealthCheck');
      const ReasonCheckValue = await AsyncStorage.getItem('ReasonCheck');

      if (retrievedData?.length == 0) {
        const myArray = JSON.parse(retrievedData);
        setOptions(myArray);

        const selectedItems = myArray.filter(item => item.isSelected === true)
        setCheckedReason(selectedItems)

      } else {
        const updatedOptions =  route?.params?.item?.options?.filter(option => option?.question_id === 15).
        map(option => {

          const match = route?.params?.item?.patient_answers?.find(answer => answer.option_id === option.id);
          if (match) {
            return { ...option, isSelected: true };
          }
          return option;
        });
       setOptions(updatedOptions)

       const selectedItems = updatedOptions?.filter(item => item.isSelected === true)
       setChecked(selectedItems) // FOR THE SELECTED ITEMS TRUE

      }

      if (reasonData !== null) {
        const reasonArray = JSON.parse(reasonData);
        setReasonOption(reasonArray);

        const selectedItems = reasonArray?.filter(item => item.isSelected === true)
        setCheckedReason(selectedItems) // FOR THE SELECTED ITEMS TRUE

      } else {
        // If reasonData is not available, set default options for reason
        //   const optionReason = route?.params?.item?.options
        //     ?.filter(option => option?.question_id === 16)
        //     .map(option => ({ ...option, isSelected: false }));
        //   setReasonOption(optionReason);
        // }

        const updatedOptions =  route?.params?.item?.options?.filter(option => option?.question_id === 16).
        map(option => {
          const match = route?.params?.item?.patient_answers?.find(answer => answer.option_id === option.id);
          console.log("MATCH DATA................",match)
         // alert("HELLO")
          if (match) {
            return { ...option, isSelected: true };
          }
          return option;
        });
        setReasonOption(updatedOptions)

        const selectedItems = updatedOptions?.filter(item => item.isSelected === true)
        setCheckedReason(selectedItems) // FOR THE SELECTED ITEMS TRUE
      }

      if (BigTextData !== null) {
        setBigText(BigTextData)
      }
      else {
        console.log("big text data............................")
      }

      if (MainTextData !== null) {
        setMainText(MainTextData)
      }
      else {
        console.log("main text data...............")
      }

      if (HealthCheckValue) {
        const healthValue = JSON.parse(HealthCheckValue);
        setChecked(healthValue);
      } else {

      }
      if (ReasonCheckValue) {
        const reasonValue = JSON.parse(ReasonCheckValue);
        setCheckedReason(reasonValue);
      }

    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
      // Handle errors
    }
  };


  const OnHealthData = () => { // TO STORE ALL THE ANSWERS OF CAREGIVING STYLE ONE INTO AN ARRAY AND ASYNC STORAGE

    const groupedData = Checked?.reduce((acc, item) => {
      // Find the existing question group
      const existingGroup = acc.find(group => group.question_id === item.question_id);

      if (existingGroup) {
        // If the group exists, add the option_id to the option_ids array
        existingGroup.option_ids.push(item.option_ids);
      } else {
        // If the group does not exist, create a new group
        acc.push({
          question_id: item.question_id,
          option_ids: [item.option_ids]
        });
      }

      return acc;
    }, []);
    AsyncStorage.setItem('CAREGIVINGSYLE_ANSWERS1', JSON.stringify(groupedData))
   // console.log("grouped data.................", groupedData)
  }

  const OnReasonData = () => { //STORE ALL THE ANSWERS OF CAREGIVING STYLE TWO INTO SINGLE ARARY

    const groupedData = CheckedReason?.reduce((acc, item) => {
      // Find the existing question group
      const existingGroup = acc.find(group => group.question_id === item.question_id);

      if (existingGroup) {
        // If the group exists, add the option_id to the option_ids array
        existingGroup.option_ids.push(item.option_ids);
      } else {
        // If the group does not exist, create a new group
        acc.push({
          question_id: item.question_id,
          option_ids: [item.option_ids]
        });
      }

      return acc;
    }, []);
    AsyncStorage.setItem('CAREGIVINGSYLE_ANSWERS2', JSON.stringify(groupedData))
  }

  const createAnswersArray = () => { //FUNCTION FOR CREATING AN ARRAY WHICH INCLUDES ALL THE QUESTIONS AND ANSWERS

    return mappedData?.map((question) => {
      console.log("QESTION OPENED", question.id)
      if (question.id == 17 && MainText) {
        return {
          question_id: question.id,
          text_input: MainText
        };
      }
      else if (question.id == 18 && BigText) {
        return {
          question_id: question.id,
          text_input: BigText
        };
      }
      return null;
    }).filter(item => item !== null);
  };

  //console.log("TITLE id..................",TitleID)


  const filteredItems = route?.params?.item?.patient_answers?.filter(item => item.question_id === 16);

  //console.log(filteredItems);
  //   const updatedOptions = Options?.map(option => {

  //     const match = route?.params?.item?.patient_answers?.find(answer => answer.option_id === option.id);
  //     if (match) {
  //         return { ...option, isSelected: true };
  //     }
  //     return option;
  // });

  //console.log("UPDATED OPTIONS...................",updatedOptions);
 console.log("MAPPED DATA PRINTED...............",CheckedReason)

  return (
    <View style={styles.container}>


      {currentPageData?.page_name == 'Details' && Details === 0 ?
        <HealthChallengesForm
          filteredQuestions={filteredQuestions}
          Options={Options}
          setOptions={setOptions}
          Checked={Checked}
          setChecked={setChecked} /> :

        currentPageData?.page_name == 'Open Ended' && Checked?.length > 0  ?
          <ReasonsForm
            filteredQuestions={filteredQuestions}
            ReasonOption={ReasonOption}
            setReasonOption={setReasonOption}
            Checked={CheckedReason}
            setChecked={setCheckedReason} /> :

          Checked?.length > 0 || selectedItems1?.length>0 && CheckedReason?.length > 0?
            <OpenEnded
              Title={'Open Ended'}
              openEndQuestion={mappedData}
              BigText={BigText}
              MainText={MainText}
              setBigText={setBigText}
              setMainText={setMainText}
              mappedData={mappedData} /> :
            null}


      <View style={styles.viewB}>
        <View style={styles.viewButton}>
          <Button onPress={() => NavigationBack()} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Back</Text>
          </Button>

          <Button
            onPress={() => SaveExit()}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Save & Exit</Text>
          </Button>
          <Button
            style={[
              styles.buttonStyle,
              {
                borderColor:
                  currentPageData?.page_name === 'Details' && Details === 0
                    && Checked?.length > 0 ?
                    BORDERCOLOR4 : currentPageData?.page_name === 'Open Ended' && CheckedReason?.length > 0 ?
                        BORDERCOLOR4 :  Checked?.length > 0 && CheckedReason?.length > 0 ? BORDERCOLOR4 :LINECOLOR1
              },
            ]}
            onPress={() => ValidationChecks()}
          >
            <Text style={[styles.buttonText, {
              color:
                currentPageData?.page_name === 'Details' && Details === 0
                  && Checked?.length > 0 ?
                  TEXTCOLOR7 : currentPageData?.page_name === 'Open Ended' && CheckedReason?.length > 0 ?
                      TEXTCOLOR7 :  Checked?.length > 0 && CheckedReason?.length > 0  ? TEXTCOLOR7 :LINECOLOR1
            },]}>Next</Text>
          </Button>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentPage: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // color:'red'
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
    alignItems: 'center',
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEFAULTWIDTH * 0.02,

  },
  viewB: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: BACKGROUNDWHITE,
    paddingBottom: GlobalSize(20),
  },
});

export default AssessmentMain;

