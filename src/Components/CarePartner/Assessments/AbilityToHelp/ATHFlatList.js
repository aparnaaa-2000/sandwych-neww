import React, { useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

//IMPORT CONSTANTS
import {
  BORDERCOLOR1,
  BORDERCOLOR5,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR2,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';


const ATHFlatList = ({ item, isSelected, onSelect, setSelectedItems }) => {

  switch (item.question) {
    case 'Eating':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Eating.png');
      break;
    case 'Dressing':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Dressing.png');
      break;
    case 'Transfer & Mobility':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Transfre&Mobiity.png');
      break;
    case 'Bathing':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Bathing.png');
      break;
    case 'Dental Hygene':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/DentalHygene.png');
      break;
    case 'Toileting':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Toileting.png');
      break;
    case 'Cooking':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Cooking.png');
      break;
    case 'House Cleaning':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/HouseCleaning.png');
      break;
    case 'Taking Medication':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/TakingMedication.png');
      break;
    case 'Laundry':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Laundry.png');
      break;
    case 'Service Coordination':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Shopping.png');
      break;
    case 'Personal Finance':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/PersonalFinance.png');
      break;
    case 'Communication':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/ServiceCordination.png');
      break;
    case 'Transportation':
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Transportation.png');
      break;

    case 'Catheter':
      imageSource = require('../../../../../assets/Images/MedicalAndNursingTasks/Catheter.png');
      break;
    case 'Injections':
      imageSource = require('../../../../../assets/Images/MedicalAndNursingTasks/Injection.png');
      break;
    case 'Prepping Food':
      imageSource = require('../../../../../assets/Images/MedicalAndNursingTasks/PreppingFoods.png');
      break;
    case 'Tube Feeding':
      imageSource = require('../../../../../assets/Images/MedicalAndNursingTasks/TubeFeeding.png');
      break;
    case 'Wound Care':
      imageSource = require('../../../../../assets/Images/MedicalAndNursingTasks/WoundCare.png');
      break;
    case 'Blood Pressure':
      imageSource = require('../../../../../assets/Images/MedicalAndNursingTasks/BloodPressure.png');
      break;
    case 'Personal Characteristics':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH4.png');
      break;
    case 'Family & Home':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH2.png');
      break;
    case 'Money & Resources':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH3.png');
      break;
    case 'Social & Community':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH1.png');
      break;
    case 'Living Situation':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH1.png');
      break;
    case 'Food':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH1.png');
      break;
    case 'Safety':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH1.png');
      break;
    case 'Optional':
      imageSource = require('../../../../../assets/Images/SDOH/SDOH5.png');
      break;
    default:
      imageSource = require('../../../../../assets/Images/AbilityToHelp1/Eating.png');
      break;
  }

  return (
    <View>
      {item?.question !== null &&
        <TouchableOpacity
          onPress={() => onSelect(item)}
          style={[
            styles.cardStyle,
            {
              borderColor: isSelected ? PRIMARYCOLOR : BORDERCOLOR1,
              borderWidth: isSelected ? 2 : 1,
            },
          ]}>

          <View style={{ marginBottom: GlobalSize(10) }}>
            <Image
              resizeMode='contain'
              style={styles.imageStyle}
              source={imageSource} />
          </View>

          <View style={{ marginBottom: GlobalSize(5) }}>
            <Text style={styles.textStyle}>{item?.question}</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
  );
};

const styles = new StyleSheet.create({
  imageStyle: {
    width: DEFAULTWIDTH * 0.4,
    height: DEFAULTWIDTH * 0.3,
  },
  textStyle: {
    color: TEXTCOLOR2,
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    alignSelf: 'center',
  },
  cardStyle: {
    width: DEFAULTWIDTH * 0.45,
    backgroundColor: PUREWHITE,
    borderColor: BORDERCOLOR5,
    borderWidth: 0.5,
    borderRadius: GlobalSize(10),
    elevation: 0.2,
    padding: GlobalSize(10),
    margin: GlobalSize(5),
    height: DEFAULTHEIGHT * 0.24,
    alignItems: 'center',
    justifyContent: 'center',

  },

});

export default ATHFlatList;
