import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { PRIMARYCOLOR, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors';
import Task from './Task';
import { WalkPri, WeighingMachinePri } from '../../../../../assets';
import Goal from './Goal';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const OnGoingGoals = ({ navigation }) => {
  const DUMMYDATA = [
    {
      svg: WeighingMachinePri,
      title: 'Gain Weight',
      description: 'Increase weight by 5 kg',
      assignedBy: 'Self',
      startDate: "21-1-2024",
      period: "3 Months"
    },
    {
      svg: WalkPri,
      title: 'Walking',
      description: 'Increase walking distance by 500 meter',
      assignedBy: "Physician",
      startDate: "30-1-2024",
      period: "5 Months"

    },
  ];

  return (
    <View>
      {/* Header */}
      <View style={[DEFAULTSTYLES.subHeaderContainer,{marginRight:GlobalSize(23)}]}>
        <Text
          style={[DEFAULTSTYLES.subHeader,{marginLeft:GlobalSize(5)}]}>
          Ongoing Goals
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('TasksLandingPage',{screen:'Goals'})}>
          <Text
            style={[DEFAULTSTYLES.seeAll,{left:2}]}>
            see all
          </Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={DUMMYDATA}
          renderItem={({ item,index }) => <Goal goal={item} index={index} length={DUMMYDATA?.length}/>}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({

  contentContainer: {
    flexDirection: 'row',
    marginTop: DEFAULTHEIGHT * 0.02
  },
  timeText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
  },
  lineVertical: {
    height: 'auto',
    width: DEFAULTWIDTH * 0.002,
    marginRight: DEFAULTWIDTH * 0.02,
    backgroundColor: PRIMARYCOLOR,
  },
});

export default OnGoingGoals;
