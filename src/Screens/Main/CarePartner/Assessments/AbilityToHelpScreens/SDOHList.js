import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

//COMPONENT IMPORTED
import ATHFlatList from '../../../../../Components/CarePartner/Assessments/AbilityToHelp/ATHFlatList';

// CONSTANT HEADINGS
import { ATHDATA1, ATHDATA2, MANTDATA1, MEDSASSIST, SAFETY, SDOH } from '../../../../../Constants/RequiredArrays';

// COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR4,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR8,
} from '../../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../../Constants/Fonts';
import { Button } from 'react-native-paper';

//CONTSTANT TEXTS
import {
  AbilityToHelpHeading1,
  AbilityToHelpHeading2,
  AbilityToHelpSubHeading1,
  AbilityToHelpSubHeading2,
  MANTHeading,
  MEDSASSISTHeading,
  SAFETYHEADING,
  SDOHHeading,
} from '../../../../../Constants/Texts';

import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import SDOHFlatList from '../../../../../Components/CarePartner/Assessments/AbilityToHelp/SDOHFlatList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


const SDOHList = ({ navigation, route }) => {

  const [selectedItems, setSelectedItems] = useState([]);
  const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);
  const value = useSelector((state) => state?.getQuestions?.value);

  useEffect(() => {
    getArray() //FUNCTION FOR CALLING THE ASYNC DATA
    const onFocus = () => {
      // Clear the selectedItems state when the screen gains focus
      setSelectedItems([]);
    };
    const unsubscribeFocus = navigation.addListener('focus', onFocus);
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);

  const getArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('SDOHARRAY');
      if (jsonValue?.length > 0) {
        setSelectedItems(JSON.parse(jsonValue))
      } else {
        console.log('No array found in AsyncStorage.');

      }
    } catch (e) {
      console.error('Failed to retrieve the array from AsyncStorage', e);
      return null; // Handle the error case as well
    }
  };


  //SELECTING ITEMS
  const toggleSelection = item => {
    console.log("item selected...................", item, selectedItems)
    const exists = selectedItems.some(selectedItem => selectedItem.id === item.id);
    if (exists) {
      // Remove item from array
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    } else {
      // Add item to array
      setSelectedItems([...selectedItems, item]);

    }

  };

  const saveArray = async () => { //SAVE THE SELCTED ITEMS ITEMS INTO ASYNC
    try {
      const jsonValue = JSON.stringify(selectedItems);
      await AsyncStorage.setItem('SDOHARRAY', jsonValue);
      console.log('Array saved successfully!');
    } catch (e) {
      console.error('Failed to save the array to AsyncStorage', e);
    }
  }

  // SWITCHING ASSESSMENT
  switch (route?.params?.mainText) {
    case 'Ability to Help 1':
      DATA = ATHDATA1;
      TITLE = AbilityToHelpHeading1
      SUBTITLE = AbilityToHelpSubHeading1
      break;
    case 'Ability to Help 2':
      DATA = ATHDATA2;
      TITLE = AbilityToHelpHeading2
      SUBTITLE = AbilityToHelpSubHeading2
      break;
    case 'Medical & Nursing Task':
      DATA = MANTDATA1;
      TITLE = MANTHeading
      SUBTITLE = AbilityToHelpSubHeading1
      break;
    case 'Medical Assistance':
      DATA = MEDSASSIST;
      TITLE = MEDSASSISTHeading;
      SUBTITLE = AbilityToHelpSubHeading1
      break;
    case 'Supervision and Safety':
      DATA = SAFETY;
      TITLE = SAFETYHEADING;
      SUBTITLE = AbilityToHelpSubHeading1
      break;
    case 'SDOH Assessment':
      DATA = SDOH;
      TITLE = SDOHHeading;
      SUBTITLE = null
      break;
    default:
      break;
  }

  // FUNCTION FOR NAVIGATING NEXT SCREEN
  const NextNavigation = () => {
    saveArray()
    if (route.params.mainText == 'Ability to Help 1' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'Ability to Help 2' });
    }
    else if (route.params.mainText == 'Ability to Help 2' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'Medical & Nursing Task' });
    }
    else if (route.params.mainText == 'Medical & Nursing Task' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'Medical Assistance' });
    }
    else if (route.params.mainText == 'Medical Assistance' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'Supervision and Safety' });
    }
    else if (route.params.mainText == 'Supervision and Safety' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'SDOH Assessment' });
    }
    else if (route.params.mainText !== 'SDOH Assessment' && selectedItems?.length > 0) {
      navigation.navigate('RateYourAbilityToHelp', { selectedItems: selectedItems, mainText: route.params.mainText })
    }
    else if (route.params.mainText == 'SDOH Assessment' && selectedItems?.length > 0) {
      navigation.navigate('SDOHSelection', { selectedItems: selectedItems, mainText: route.params.mainText, selectedQuest: route?.params?.item })
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
          navigation.navigate('EnrollmentProgress')
            console.log("No more titles available after the current title.");
            break;
        }
    }

    if (currentIndex === -1) {
        console.log("Current title not found in the array.");
    }
}

  // FUNCTION FOR NAVIGATING BACK
  const NavigationBack = () => {

    if (route.params.mainText == 'Ability to Help 2') {
      navigation.navigate('AbilityToHelp1', { mainText: 'Ability to Help 1' });
    }
    else if (route.params.mainText == 'Medical & Nursing Task') {
      navigation.navigate('AbilityToHelp1', { mainText: 'Ability to Help 2' });
    }
    else if (route.params.mainText == 'Medical Assistance' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'Medical & Nursing Task' });
    }

    else if (route.params.mainText == 'Supervision and Safety' && selectedItems?.length == 0) {
      navigation.navigate('AbilityToHelp1', { mainText: 'Medical Assistance' });
    }

    else {
      navigation.goBack()
    }
  }

  const OnSave = () => { //FUNCTION FOR SAVE AND EXIT THE PAGE
    saveArray()
    navigation.navigate('EnrollmentProgress')

  }

  const checkItemExists = (item) => { //FUNCTION FOR CHEKING THE ITEM IS ALREADY SELECTED OR NOT
    return selectedItems?.some(
      (element) => element.id === item.id && element.page_name === item.page_name
    );
  };

  { console.log("SDOH DATA................", route?.params?.item?.questions[0]?.length) }
  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
      <View style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Help needed? </Text>
          <Text style={styles.subHeading}>How much help is needed?</Text>

          <View>
            <FlatList
              data={route?.params?.pages}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {

                return (
                  <>

                    <SDOHFlatList
                      item={item}
                      questions={route?.params?.item}
                      isSelected={checkItemExists(item)}
                      onSelect={toggleSelection}
                    />
                  </>
                )
              }
              }
              keyExtractor={item => item}
              numColumns={2}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonView}>
          <Button style={styles.buttonStyle} onPress={() => NavigationBack()}>
            <Text style={styles.buttonTextStyle}>Back</Text>
          </Button>
          <Button style={styles.buttonStyle} onPress={() => OnSave()}>
            <Text style={styles.buttonTextStyle}>Save & Exit</Text>
          </Button>
          <Button
            style={[styles.buttonStyle, { borderColor: BORDERCOLOR4 }]}
            onPress={() => { NextNavigation() }}>
            <Text style={[styles.buttonTextStyle, { color: TEXTCOLOR7 }]}>Next</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: GlobalSize(8),
    backgroundColor: BACKGROUNDWHITE,
  },
  heading: {
    fontSize: fontSize(26),
    fontFamily: FONTS.FontBold,
    color: TEXTCOLOR8,
    marginLeft: GlobalSize(7),
    marginTop: GlobalSize(10),
  },
  subHeading: {
    color: TEXTCOLOR5,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontMedium,
    marginLeft: GlobalSize(7),
    marginBottom: '5%',
  },
  buttonStyle: {
    width: DEFAULTWIDTH * 0.29,
    height: GlobalSize(40),
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: GlobalSize(8),
  },
  buttonTextStyle: {
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: GlobalSize(10),
    marginTop: GlobalSize(20)
  }
});

export default SDOHList;
