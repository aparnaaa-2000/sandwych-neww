import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  BORDERCOLOR4,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR8
} from '../../../../Constants/Colors/Colors';

import { Check, Uncheck } from '../../../../../assets';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';


const HealthChallengesForm = ({
  filteredQuestions,
  Options,
  Checked,
  setChecked,
  setOptions }) => {

  const handleCheckBoxPress = (item) => { //To check and uncheck the checkBox
    const updatedData = Options.map((dataItem) => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      }
      return dataItem;
    });

    setOptions(updatedData);

    const filteredData = updatedData
      .filter((item) => item.isSelected === true)
      .map((item) => ({
        question_id: item.question_id,
        option_ids: item.id
      }));

    setChecked(filteredData)

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />


      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ margin: GlobalSize(10), marginTop: GlobalSize(15), }}>
            <Text style={styles.mainHeader}>Caregiving style</Text>
            <Text style={styles.subHeader}>
              {filteredQuestions[0]?.question}
            </Text>
          </View>

          <View style={{ flex: 1, marginBottom: DEFAULTWIDTH * 0.22 }}>
            <FlatList
              data={Options}
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

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.03, marginRight: GlobalSize(40) }}>
                      <Text style={styles.checkBoxText}>{item.option} </Text>
                    </View>
                  </View>
                )
              }} />
          </View>
        </ScrollView>

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
    left: GlobalSize(3),
    marginTop: GlobalSize(5)
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
    marginLeft: DEFAULTWIDTH * 0.05
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
