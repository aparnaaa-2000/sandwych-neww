import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  TEXTCOLOR8,
  TEXTCOLOR5,
  TEXTCOLOR7,
  BORDERCOLOR4
} from '../../../../Constants/Colors/Colors';

import { Check, Uncheck } from '../../../../../assets';

import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';


const ReasonsForm = ({
  filteredQuestions,
  ReasonOption,
  setChecked,
  setReasonOption }) => {

  const handleCheckBoxPress = item => { //TO CHECK THE DATA BASED ON SELECTION
    //Check and uncheck the checkbox
    const updatedData = ReasonOption.map(dataItem => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      }
      return dataItem;
    });
    setReasonOption(updatedData);

    const filteredData = updatedData
      .filter((item) => item.isSelected === true)
      .map((item) => ({
        question_id: item.question_id,
        option_ids: item.id
      }));

    setChecked(filteredData)
  };


  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }}
      />
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginLeft: GlobalSize(10) }}>
            <Text style={styles.mainHeader}>Caregiving style</Text>
            <Text style={styles.subHeader}>
              {filteredQuestions[1]?.question}
            </Text>
          </View>

          <View style={styles.viewFlat}>
            <FlatList
              data={ReasonOption}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.checkView}>
                    {item?.isSelected ? (
                      <TouchableOpacity
                        onPress={() => handleCheckBoxPress(item)}
                        style={{ padding: GlobalSize(5) }}>
                        <Check style={{ marginTop: GlobalSize(4) }} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleCheckBoxPress(item)}
                        style={{ padding: GlobalSize(5) }}>
                        <Uncheck style={{ marginTop: GlobalSize(5) }} />
                      </TouchableOpacity>
                    )}
                    <View
                      style={{
                        maxWidth: DEFAULTWIDTH * 0.75,
                        marginLeft: DEFAULTWIDTH * 0.03,
                      }}>
                      <Text style={styles.checkBoxText}>{item.option} </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center',
  },
  mainHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(26),
    color: TEXTCOLOR8,
  },
  subHeader: {
    marginTop: GlobalSize(8),
    lineHeight: GlobalSize(20),
    color: TEXTCOLOR5,
    fontSize: fontSize(14),
    fontFamily: 'Inter-Medium',
    left: GlobalSize(2)
  },
  checkBoxText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
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
  viewFlat: {
    flex: 1,
    marginLeft: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.22,
  },
});
export default ReasonsForm;
