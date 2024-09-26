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


const AbilityToHelp1 = ({ navigation, route }) => {
console.log("SDOH Data...................",route?.params?.item)
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const onFocus = () => {
      // Clear the selectedItems state when the screen gains focus
      setSelectedItems([]);
    };
    const unsubscribeFocus = navigation.addListener('focus', onFocus);
    return () => {
      unsubscribeFocus();
    };
  }, [navigation]);


  //SELECTING ITEMS
  const toggleSelection = item => {
    console.log("item selected...................",item)
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),

      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
{console.log("selected items.................",selectedItems)}
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
      // DATA = MANTDATA1;
      // TITLE = MANTHeading
      // SUBTITLE = AbilityToHelpSubHeading1
      break;
  }

  // FUNCTION FOR NAVIGATING NEXT SCREEN
  const NextNavigation = () => {

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
      navigation.navigate('RateYourAbilityToHelp', { selectedItems: selectedItems,
         mainText: route.params.mainText,titleGroup:route?.params?.titleGroup })
    }
    else if (route.params.mainText == 'SDOH Assessment' && selectedItems?.length > 0) {
      navigation.navigate('SDOHSelection', { selectedItems: selectedItems,
         mainText: route.params.mainText,selectedQuest:route?.params?.item,titleGroup:route?.params?.titleGroup })
    }
    else {
      navigation.navigate('Wearables')
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
    // else if (route.params.mainText == 'SDOH Assessment') {
    //   navigation.navigate('AbilityToHelp1', { mainText: 'Supervision and Safety' });
    // }
    else {
      navigation.goBack()
    }
  }

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
              renderItem={({ item }) => (

                <ATHFlatList
                  item={item}
                  questions={route?.params?.item}
                  isSelected={selectedItems.includes(item)}
                  onSelect={toggleSelection}
                />
              )}
              keyExtractor={item => item}
              numColumns={2}
            />
          </View>
        </ScrollView>

        <View style={styles.buttonView}>
          <Button style={styles.buttonStyle} onPress={() => NavigationBack()}>
            <Text style={styles.buttonTextStyle}>Back</Text>
          </Button>
          <Button style={styles.buttonStyle} onPress={() => navigation.goBack()}>
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

export default AbilityToHelp1;
