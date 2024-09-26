import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR4,
  PUREWHITE,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR8,
  LINECOLOR1
} from '../../../../../Constants/Colors/Colors';
import { Button } from 'react-native-paper';
import {Data} from '../../../../../Constants/Texts/Assessments/HealthChallenges/CheckBox'

import { Check, Uncheck } from '../../../../../../assets';
import { ScrollView } from 'react-native';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthChallengesForm = ({ navigation }) => {
  
  const [data, setData] = useState(Data)
  const [Checked, setChecked] = useState([])


  const backToHC = () => {
    navigation.navigate('HealthChallengesMainScreen');
  };

  const backToEnrollment = () => {
    navigation.navigate('EnrollmentProgress');
  };

  const navigateToROC = () => {
    navigation.navigate('ReasonsForm');
  };


  const handleCheckBoxPress = (item) => { //To check and uncheck the checkBox
    const updatedData = data.map((dataItem) => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      }
      return dataItem;
    });
    setData(updatedData);
    const FilterData = updatedData.filter((item) => item.isSelected == true)

    setChecked(FilterData)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: GlobalSize(10), marginTop: GlobalSize(15), }}>
            <Text style={styles.mainHeader}>Caregiving style</Text>
            <Text style={styles.subHeader}>
            Which of the following health challenges affect your loved one? (Check all that apply)
            </Text>
          </View>

          <View style={{ flex: 1, marginBottom: DEFAULTWIDTH * 0.22 }}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {

                return (
                  <View style={styles.checkView}>
                    {item?.isSelected ?
                      <TouchableOpacity onPress={() => handleCheckBoxPress(item)} style={{ padding: 5 }}>
                        <Check style={{ marginTop: 4 }} />
                      </TouchableOpacity> :

                      <TouchableOpacity onPress={() => handleCheckBoxPress(item)} style={{ padding: 5 }}>
                        <Uncheck style={{ marginTop: 4 }} />
                      </TouchableOpacity>}

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.03 }}>
                      <Text style={styles.checkBoxText}>{item.Title} </Text>
                      <View style={{ maxWidth: DEFAULTWIDTH * 0.75 }}>
                        {item.Desc &&
                          <Text style={styles.exampleTextStyle}>{item.Desc}</Text>}
                      </View>
                    </View>
                  </View>
                )
              }} />
          </View>
        </ScrollView>

        <View style={styles.viewPos}>
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
            </Button>
            <Button
              onPress={() => { Checked?.length > 0 ? navigateToROC() : console.log("") }}
              style={[styles.buttonStyle, { borderColor: Checked?.length > 0 ? BORDERCOLOR4 : LINECOLOR1 }]}>
              <Text style={[styles.buttonText, { color: Checked?.length > 0 ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
            </Button>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center'
  },
  checkboxBorderStyle: {
    borderWidth: 2,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
  },
  mainHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(26),
    color: TEXTCOLOR8,
  },
  subHeader: {
    color: TEXTCOLOR5,
    fontSize: fontSize(14),
    fontFamily: 'Inter-Medium',
    lineHeight: 20,
    left:GlobalSize(3),
    marginTop:GlobalSize(5)
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: GlobalSize(5),
    marginHorizontal: GlobalSize(10),
  },
  checkBoxText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },

  exampleTextStyle: {
    color: TEXTCOLOR5,
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(14),
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEFAULTWIDTH * 0.022,
    marginLeft: DEFAULTWIDTH*0.05
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  buttonStyle: {
    borderRadius: GlobalSize(8),
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.29,
    margin: GlobalSize(5)
  },
  viewPos: {
    position: 'absolute',
    backgroundColor: BACKGROUNDWHITE,
    bottom: 0,
    paddingBottom: GlobalSize(20)
  }
});

export default HealthChallengesForm;
