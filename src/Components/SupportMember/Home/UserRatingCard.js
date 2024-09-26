import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { Switch } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';

import { 
  BACKGROUNDCOLORGREYS, 
  BACKGROUNDGREEN1, 
  PRIMARYCOLOR, 
  PUREWHITE, 
  TEXTCOLORSC1, 
  TRANSPARENTCOLOR1 
} from '../../../Constants/Colors/Colors';

import { FONTS } from '../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import useGetProfile from '../../../hooks/apihooks/useGetProfile';

const satisfactionLevels = [
  { threshold: 81, icon: require('../../../../assets/Images/Happy.png'), label: 'Very Happy' },
  { threshold: 61, icon: require('../../../../assets/Images/Happy.png'), label: 'Happy' },
  { threshold: 41, icon: require('../../../../assets/Images/Gloomy.png'), label: 'Gloomy' },
  { threshold: 21, icon: require('../../../../assets/Images/Sad.png'), label: 'Sad' },
  { threshold: 0, icon: require('../../../../assets/Images/Angry.png'), label: 'Angry' },
];

const getSatisfactionLevel = (percentage) => {
  return satisfactionLevels.find(level => percentage >= level.threshold) || satisfactionLevels[satisfactionLevels.length - 1];
};

const UserRatingCard = ({ AvailableStatus, ChangeAvailablityStatus }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const onToggleSwitch = () => ChangeAvailablityStatus(!AvailableStatus);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const data = await useGetProfile();
        setProfileData(data);
      } catch (error) {
        console.log('HOME_USER_ERROR', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const userName = profileData?.user?.name || 'User';
  const responseTiming = (profileData?.response_timing_percentage || 0).toFixed(1);
  const satisfactionRating = profileData?.average_satisfaction_percentage || 0;
  const overallRating = profileData?.overall_rating_percentage || 0;
  
  const { icon, label } = getSatisfactionLevel(satisfactionRating);

  useEffect(() => {
    console.log('satisfaction..====================..', satisfactionRating, "DESCRIPTION_DATA....", label);
    console.log('Please format this______', responseTiming);
  }, []);

  return (
    <View style={styles.cardAbout}>
      <View style={styles.rowLayout}>
        <View>
          <Text style={styles.headingText}>Hi {userName}</Text>
          <Text style={styles.subHeadingText}>Welcome back to SandwYch!</Text>
        </View>

        <View style={styles.switchButtonLayout}>
          <Switch
            value={AvailableStatus}
            onValueChange={onToggleSwitch}
            trackColor={{ true: BACKGROUNDGREEN1, false: BACKGROUNDCOLORGREYS }}
            style={styles.switchStyle}
          />
        </View>
      </View>

      <View style={styles.commonRow}>
        <View style={styles.overallProgressView}>
          <CircularProgress
            value={overallRating}
            radius={55}
            duration={2000}
            progressValueColor={PRIMARYCOLOR}
            activeStrokeWidth={8}
            inActiveStrokeWidth={9}
            maxValue={100}
            titleColor={PRIMARYCOLOR}
            titleStyle={{ fontFamily: FONTS.FontLight, fontSize: 18 }}
            inActiveStrokeColor={PRIMARYCOLOR}
            inActiveStrokeOpacity={0.1}
            valueSuffix="%"
            activeStrokeColor={PRIMARYCOLOR}
            progressValueStyle={{ fontFamily: FONTS.FontMedium, fontSize: 22 }}
          />
        </View>

        <View style={styles.mainRow}>
          <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Response Timing</Text>
              <Text style={styles.percentageText}>{responseTiming}%</Text>
            </View>
            <CircularProgress
              value={responseTiming}
              radius={16}
              duration={2000}
              activeStrokeWidth={4}
              inActiveStrokeWidth={6}
              maxValue={100}
              inActiveStrokeColor={PUREWHITE}
              inActiveStrokeOpacity={0.2}
              activeStrokeColor={PUREWHITE}
              showProgressValue={false}
            />
          </View>
          <View style={styles.lineVertical} />
          <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Satisfaction Rating</Text>
              <Text style={styles.percentageText}>{satisfactionRating}%</Text>
            </View>
            <Image style={styles.iconStyle} source={icon} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardAbout: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.96,
    borderRadius: GlobalSize(15),
    padding: GlobalSize(15),
    marginHorizontal: DEFAULTWIDTH * 0.02,
  },
  textTitle: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: PUREWHITE,
    alignSelf: 'center',
  },
  headingText: {
    color: PUREWHITE,
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
  },
  subHeadingText: {
    color: PUREWHITE,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontLight,
  },
  overallProgressView: {
    backgroundColor: PUREWHITE,
    height: DEFAULTHEIGHT * 0.15,
    alignItems: 'center',
    width: DEFAULTHEIGHT * 0.15,
    borderRadius: 60,
    justifyContent: 'center',
  },
  commonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: GlobalSize(10),
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: GlobalSize(10),
    marginVertical: GlobalSize(10),
    justifyContent: 'space-between',
  },
  mainRow: {
    backgroundColor: TRANSPARENTCOLOR1,
    width: DEFAULTWIDTH * 0.45,
    borderRadius: 15,
    marginLeft: GlobalSize(10),
    justifyContent: 'center',
    height: 'auto',
  },
  seperator: { marginVertical: GlobalSize(1) },
  ratingName: {
    color: PUREWHITE,
    width: DEFAULTWIDTH * 0.3,
    fontFamily: FONTS.FontLight,
    fontSize: 12,
  },
  percentageText: {
    color: PUREWHITE,
    width: DEFAULTWIDTH * 0.3,
    fontFamily: FONTS.FontBold,
    fontSize: 10,
  },
  lineVertical: {
    backgroundColor: TEXTCOLORSC1,
    height: 0.5,
    width: 'auto',
    marginVertical: DEFAULTHEIGHT * 0.005,
  },
  switchButtonLayout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchStyle: {
    borderWidth: 0.3,
    borderColor: BACKGROUNDCOLORGREYS,
    borderRadius: 15,
  },
  rowLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
});

export default UserRatingCard;
