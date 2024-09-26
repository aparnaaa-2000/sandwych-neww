import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';

//COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  BOTTOMTABTEXT1,
  LINECOLOR1,
  TEXTCOLOR10,
  TEXTCOLOR7,
  TEXTCOLOR8
} from '../../../../../Constants/Colors/Colors';

import { FONTS } from '../../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';

import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';


const BehaviorDetails = ({
  navigation,
  mappedData,
  filteredQuestions,
  Title,
  Options,
  MedValue,
  setMedValue,
  ADLValue,
  setADLValue,
  TreatValue,
  setTreatValue,
  SafetyValue,
  setSafetyValue,
  ADLLabel,
  setADLLabel,
  MedLabel,
  setMedLabel,
  TreatLabel,
  setTreatLabel,
  SafetyLabel,
  setSafetyLabel }) => {
    console.log("ADLLABEL...............................=>",filteredQuestions)

  const [selectedValues, setSelectedValues] = useState({});



  const OptionOne = Options?.filter(option => option.question_id === 19).map((item) => ({
    label: item.option,
    value: item.id
  }))

  const OptionTwo = Options?.filter(option => option.question_id === 20).map((item) => ({
    label: item.option,
    value: item.id

  }))

  const OptionThree = Options?.filter(option => option.question_id === 21).map((item) => ({
    label: item.option,
    value: item.id

  }))

  const OptionFour = Options?.filter(option => option.question_id === 22).map((item) => ({
    label: item.option,
    value: item.id

  }))

  const [Option, setOptions] = useState();
  const [value, setValue] = useState()
 


  const backToHC = () => {
    navigation.goBack();
  };

  const backToEnrollment = () => {
    navigation.navigate('EnrollmentProgress');
  };

  const handleValueChange = (questionId, option) => {
    console.log("questionId...............", option)
    if (questionId == 19) {
      setADLLabel(option.label)
      setADLValue(option.value)
    }
    else if (questionId == 20) {
      setMedLabel(option.label)
      setMedValue(option.value)
    }
    else if (questionId == 21) {
      setTreatLabel(option.label)
      setTreatValue(option.value)
    }
    else if (questionId == 22) {
      setSafetyLabel(option.label)
      setSafetyValue(option.value)
    }
    // setSelectedValues(prevValues => ({
    //   ...prevValues,
    //   [questionId]: value,
    // }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

      <View style={styles.headView} >
        <Text style={styles.mainHeader}>{Title}</Text>
      </View>

      <View style={styles.container}>
        {mappedData?.map((item) => {
          return (


            <View>

              <Text style={[styles.subHeader, { maxWidth: DEFAULTWIDTH * 0.9 }]}>{item?.question}</Text>
              
              <Dropdown
                style={styles.textIn}
                placeholderStyle={styles.placeholderS}
                itemTextStyle={styles.textArea}
                selectedTextStyle={styles.textArea}
                containerStyle={styles.dropView}
                data={item?.id == 19 ? OptionOne : item?.id == 20 ? OptionTwo : item?.id == 21 ? OptionThree : OptionFour}
                search={false}
                labelField="label"
                valueField="value"
                placeholder={item?.id == 19 ? ADLLabel ? ADLLabel : item?.answer :
                   item?.id == 20 ? MedLabel ? MedLabel : item?.answer : 
                   item?.id == 21 ? TreatLabel ? TreatLabel : item?.answer : item?.id == 22 ? SafetyLabel ?SafetyLabel: item?.answer : 'Select'}
                value={value}
                showsVerticalScrollIndicator={false}
                onChange={option => handleValueChange(item.id, option)}
              />
            </View>
          )
        })}
        {/* <View style={styles.buttonPost}>
          <View
            style={styles.viewButton}>
            <Button
              onPress={() => backToHC()}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Back</Text>
            </Button>

            <Button
              onPress={() => backToEnrollment()}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Save & Exit</Text>
            </Button> */}

        {/* <Button
              onPress={() => NextNavigation()}
              style={[styles.buttonStyle, { borderColor: valueADL && valueMed && valueMedT && valueSS ? BORDERCOLOR4 : LINECOLOR1 }]}>
              <Text style={[styles.buttonText, { color: valueADL && valueMed && valueMedT && valueSS ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
            </Button> */}
        {/* </View>
        </View> */}

      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center'
  },
  mainHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(26),
    color: TEXTCOLOR8,
  },
  dropView: {
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.90,
    padding: GlobalSize(5)
  },
  subHeader: {
    marginTop: GlobalSize(8),
    marginBottom: GlobalSize(8),
    color: TEXTCOLOR7,
    fontSize: fontSize(14),
    fontFamily: 'Inter-Medium',

  },
  placeholderS: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: BOTTOMTABTEXT1
  },
  textIn: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.90,
    borderWidth: 1,
    height: GlobalSize(65),
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    padding: GlobalSize(5),
  },
  textArea: {
    fontSize: fontSize(13),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
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
  buttonPost: {
    position: 'absolute',
    bottom: GlobalSize(20),
    alignItems: 'center'
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headView: {
    marginTop: GlobalSize(15),
    marginBottom: GlobalSize(10),
    marginLeft: GlobalSize(15)
  }
})
export default BehaviorDetails;



