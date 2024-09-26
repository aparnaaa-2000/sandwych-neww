import {View, Text, FlatList,StyleSheet} from 'react-native';
import React from 'react';
import DiagnosisList from './DiagnosisList';
import {
  BrainPurple,
  HyperTensionPurple,
  NeckIssue,
} from '../../../../../assets';
import {DEFAULTHEIGHT} from '../../../../Constants/styles/styles';
import { TEXTCOLOR7 } from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const OnGoingDiagnosis = () => {
  const DUMMYDATA = [
    {
      svg: BrainPurple,
      diagnosis: 'Alzhimer',
      icdcode: 'G30.9',
      physician: 'Flores Mark, MD',
      startDate: '05/01/2024',
      period: 'For 4 Months',
    },
    {
      svg: HyperTensionPurple,
      diagnosis: 'Hypertension',
      icdcode: 'G31.9',
      physician: 'John Samuel, MD',
      startDate: '03/01/2024',
      period: 'For 2 Months',
    },
    {
      svg: NeckIssue,
      diagnosis: 'Hyperthyroidism',
      icdcode: 'G40.2',
      physician: 'John Samuel, MD',
      startDate: '23/12/2023',
      period: 'For 6 Months',
    },
  ];

  return (
    <View>
      <Text style={styles.ongText}>Ongoing Diagnosis</Text>
      <View
        style={styles.flatView}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DUMMYDATA}
          renderItem={({item,index}) => <DiagnosisList diagnosis={item} index={index} data={DUMMYDATA} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default OnGoingDiagnosis;

const styles=StyleSheet.create({
  ongText:{
    fontSize:fontSize(14),
    color:TEXTCOLOR7,
    fontFamily:FONTS.FontSemiB,
    marginLeft:GlobalSize(10)
  },
  flatView:{
    marginTop:GlobalSize(8),
    //height: DEFAULTHEIGHT * 0.3,
    paddingVertical: DEFAULTHEIGHT * 0.01,
  }
})
