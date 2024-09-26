import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLORSC1,
  TRANSPARENTCOLOR1,
} from '../../../Constants/Colors/Colors';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../Constants/Fonts';
import CircularProgress from 'react-native-circular-progress-indicator';
import useGetProfile from '../../../hooks/apihooks/useGetProfile';

const satisfactionLevels = [
  { threshold: 81, icon: require('../../../../assets/Images/Happy.png'), label: 'Very Happy' },
  { threshold: 61, icon: require('../../../../assets/Images/Happy.png'), label: 'Happy' },
  { threshold: 41, icon: require('../../../../assets/Images/Gloomy.png'), label: 'Gloomy' },
  { threshold: 21, icon: require('../../../../assets/Images/Sad.png'), label: 'Sad' },
  { threshold: 0, icon: require('../../../../assets/Images/Angry.png'), label: 'Angry' },
];

const UserRating = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const UserRating = async () => {
      try {
        setLoading(true);
        const fetch_data = await useGetProfile();
        console.log('FETCHED...', fetch_data);
        setProfileData(fetch_data);
        setLoading(false);
      } catch (error) {
        console.log('error_code...', error);
        setLoading(false);
        setError(false);
      }
    };

    UserRating();
  }, []);

  const userName = profileData?.user?.name || 'User';
  const responseTiming = (profileData?.response_timing_percentage || 0).toFixed(1);
  const satisfactionRating = profileData?.average_satisfaction_percentage || 0;
  const overallRating = profileData?.overall_rating_percentage || 0;
  const satisfaction = profileData?.satisfaction || 'Neutral';

  // Determine the correct satisfaction level based on the rating
  const currentSatisfactionLevel = satisfactionLevels.find(level => satisfactionRating >= level.threshold);

  return (
    <View style={styles.cardAbout}>
      <Text style={styles.textTitle}>User Rating</Text>
      <View style={styles.mainRowLayout}>
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
            titleStyle={{fontFamily: FONTS.FontLight, fontSize: 18}}
            inActiveStrokeColor={PRIMARYCOLOR}
            inActiveStrokeOpacity={0.1}
            valueSuffix="%"
            activeStrokeColor={PRIMARYCOLOR}
            progressValueStyle={{fontFamily: FONTS.FontMedium, fontSize: 22}}
          />
        </View>
        <View style={styles.rightLayout}>
          {/* Response Timing */}
          <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Response Timing</Text>
              <Text style={styles.percentageText}>{responseTiming}</Text>
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
          {/* Satisfaction Rating */}
          <View style={styles.rightRow}>
            <View style={styles.seperator}>
              <Text style={styles.ratingName}>Satisfaction Rating</Text>
              <Text style={styles.percentageText}>{satisfactionRating}</Text>
            </View>
            {currentSatisfactionLevel && (
              <Image
                source={currentSatisfactionLevel.icon}
                style={{ width: 30, height: 30 }}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardAbout: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.9,
    borderRadius: GlobalSize(15),
    padding: GlobalSize(15),
    marginHorizontal: DEFAULTWIDTH * 0.05,
    marginTop: DEFAULTHEIGHT * 0.02,
    alignItems: 'center',
  },
  textTitle: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: PUREWHITE,
    alignSelf: 'center',
  },
  overallProgressView: {
    backgroundColor: PUREWHITE,
    height: DEFAULTHEIGHT * 0.15,
    alignItems: 'center',
    width: DEFAULTHEIGHT * 0.15,
    borderRadius: 60,
    justifyContent: 'center',
    marginTop: GlobalSize(10),
  },
  rightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: GlobalSize(10),
    marginVertical: GlobalSize(10),
    justifyContent: 'space-between',
  },
  seperator: {marginVertical: GlobalSize(1)},
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
  mainRowLayout: {
    flexDirection: 'row',
    marginTop: GlobalSize(10),
    alignItems: 'center',
  },
  rightLayout: {
    backgroundColor: TRANSPARENTCOLOR1,
    width: DEFAULTWIDTH * 0.45,
    borderRadius: 15,
    marginLeft: GlobalSize(10),
    justifyContent: 'center',
    height: 'auto',
  },
});

export default UserRating;
