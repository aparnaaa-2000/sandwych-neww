import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLORSC1,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import CircularProgress from 'react-native-circular-progress-indicator';
import {Card} from 'react-native-paper';
import { GreenFace, HappyFace } from '../../../../assets';

const ProgressCard = () => {
  return (
    <Card style={styles.cardContainer}>
      <View style={styles.cardRow}>
        <View style={styles.overallProgressView}>
          <CircularProgress
            value={60}
            radius={80}
            duration={2000}
            progressValueColor={PUREWHITE}
            activeStrokeWidth={26}
            inActiveStrokeWidth={28}
            maxValue={100}
            title={'Overall'}
            titleColor={PUREWHITE}
            titleStyle={{fontFamily: FONTS.FontLight, fontSize: 18}}
            inActiveStrokeColor={PUREWHITE}
            inActiveStrokeOpacity={0.2}
            valueSuffix='%'
            activeStrokeColor={PUREWHITE}
            progressValueStyle={{fontFamily: FONTS.FontMedium, fontSize: 22}}
          />
        </View>

        <View>
          {/* #1 */}
          <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Response Timing</Text>
              <Text style={styles.percentageText}>60%</Text>
            </View>
            <CircularProgress
              value={60}
              radius={22}
              duration={2000}
              activeStrokeWidth={8}
              inActiveStrokeWidth={8}
              maxValue={100}
              inActiveStrokeColor={PRIMARYCOLOR}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={PRIMARYCOLOR}
              showProgressValue={false}
            />
          </View>
          <View style={styles.lineVertical} />

          {/* #2 */}
          <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Satisfaction Rating</Text>
              <Text style={styles.percentageText}>70%</Text>
            </View>
            
            <GreenFace width={50} height ={50}/>
          </View>

          {/* <View style={styles.lineVertical} /> */}

          {/* #3 */}
          {/* <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Comfort</Text>
              <Text style={styles.percentageText}>60%</Text>
            </View>
            <CircularProgress
              value={60}
              radius={22}
              duration={2000}
              activeStrokeWidth={8}
              inActiveStrokeWidth={9}
              maxValue={100}
              inActiveStrokeColor={PRIMARYCOLOR}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={PRIMARYCOLOR}
              showProgressValue={false}
            />
          </View> */}
        </View>
      </View>
    </Card>
  );
};

const styles = new StyleSheet.create({
  cardContainer: {
    backgroundColor: PUREWHITE,
    marginVertical: DEFAULTHEIGHT * 0.02,
    height: 210,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    borderRadius: 20,
  },
  cardRow: {
    flexDirection: 'row',
    height: 210,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.03,
  },
  rightRow: {flexDirection: 'row', alignItems: 'center'},

  overallProgressView: {
    backgroundColor: PRIMARYCOLOR,
    height: 180,
    alignItems: 'center',
    width: 180,
    borderRadius: 20,
    justifyContent: 'center',
  },
  ratingName: {
    color: TEXTCOLOR7,
    width: DEFAULTWIDTH * 0.3,
    fontFamily: FONTS.FontLight,
    fontSize: 16,
  },
  percentageText: {
    color: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.3,
    fontFamily: FONTS.FontBold,
    fontSize: 14,
  },
  seperator: {marginVertical: DEFAULTHEIGHT * 0.01},

  lineVertical: {
    backgroundColor: TEXTCOLORSC1,
    height: 0.5,
    width: 'auto',
    marginVertical: DEFAULTHEIGHT * 0.005,
  },
});

export default ProgressCard;
