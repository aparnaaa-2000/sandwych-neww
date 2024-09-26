import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  CARDCOLOR,
  LINECOLOR1,
  PUREWHITE,
  TEXTCOLOR2,
  TEXTCOLOR5,
  TEXTCOLOR7,
} from '../../../Constants/Colors/Colors';
import { Card } from 'react-native-paper';
import { TDESC1, TDESC2, TODAY, WEEK } from '../../../Constants/Texts';
import {
  DarkGreenFace,
  GreenFace,
  OrangeFace,
  RedFace,
  TimeGrey,
  YellowFace,
} from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const WeeklyMood = ({ navigation }) => {

  const moveToCalendar = () => {
    navigation.navigate('CaseMoodCalendar');
  };

  const WeekDays = ({ week }) => {
    const renderImage = () => {
      switch (week.icon) {
        case 'HAPPY':
          return <DarkGreenFace width={26} height={26} />;
          break;
        case 'PLEASENT':
          return <GreenFace width={26} height={26} />;
          break;
        case 'BALANCED':
          return <YellowFace width={26} height={26} />;
          break;
        case 'GLOOMY':
          return <OrangeFace width={26} height={26} />;
          break;
        case 'SAD':
          return <RedFace width={26} height={26} />;
          break;
        // .. rest of the case
        default:
          return <TimeGrey width={26} height={26} />;
          break;
      }
    };

    return (
      <View style={styles.weekStyle}>
        <Text style={styles.weekText}>{week.name}</Text>
        {week.mood ? <>{renderImage()}</> : <TimeGrey width={26} height={26} />}
      </View>
    );
  };

  return (
    <View>
      <View style={{ marginTop: GlobalSize(2), marginHorizontal: GlobalSize(10) }}>
        {/* <View style={styles.lineBoder} /> */}
        <View style={{ marginLeft: 10 ,marginBottom:5}}>
          <Text style={styles.headingText}>{TODAY}</Text>
          <Text style={{ flexDirection: 'row' }}>
            <Text style={styles.descText}>{TDESC1}</Text>
            <Text style={styles.headingText}>4 hours </Text>
            <Text style={styles.descText}>{TDESC2}</Text>
          </Text>
        </View>
      </View>
      <Card style={styles.cardStyle}>
        <TouchableOpacity
          style={styles.topLayer}
          onPress={() => moveToCalendar()}>
          <View>
            <Text style={{ color: TEXTCOLOR2 }}>Betty's Mood this Week</Text>
          </View>
          <View style={styles.singleWeekStyle}>
            {WEEK.map((week, key) => (
              <WeekDays week={week} />
            ))}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => moveToCalendar()}
          style={styles.transparentLayer}></TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = new StyleSheet.create({
  lineBoder: {
     backgroundColor: LINECOLOR1, 
     height: GlobalSize(1),
      margin: GlobalSize(10)
     },
  headingText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  descText: {
    color: TEXTCOLOR5,
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(14),
  },
  cardStyle: {
    backgroundColor: CARDCOLOR,
    height: GlobalSize(150),
    margin: GlobalSize(10),
    padding: GlobalSize(16),
    marginLeft:DEFAULTWIDTH*0.05,
    marginRight:DEFAULTWIDTH*0.05
  },
  topLayer: {
    height: GlobalSize(120),
    width:"100%",
    borderRadius: GlobalSize(12),
    borderColor: '#fff',
    borderWidth: 0.5,
    position: 'absolute',
    padding: GlobalSize(10),
  },
  transparentLayer: {
    height: GlobalSize(120),
    backgroundColor: '#fff',
    opacity: 0.3,
    borderRadius: GlobalSize(12),
  },
  weekStyle: {
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(6),
    width:GlobalSize(38),
    //padding:2,
    paddingBottom:GlobalSize(5),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  singleWeekStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:GlobalSize(10)
   // flex: 1,
  },
  weekText: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(13),
    color:TEXTCOLOR2,
    marginTop:GlobalSize(5),
    
  },
});

export default WeeklyMood;