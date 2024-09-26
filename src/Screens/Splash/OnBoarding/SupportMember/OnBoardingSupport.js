import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ONBOARDINGSUPPORTDESC,
  ONBOARDINGSUPPORTTITLES,
} from '../../../../Constants/Texts';
import {
  FIFTHCOLOR,
  ONBOARDINGBAGROUND,
  ONBOARDINGSCROLL,
  PRIMARYCOLOR,
  PUREWHITE,
} from '../../../../Constants/Colors/Colors';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../../Constants/styles/styles';

const {width, height} = Dimensions.get('window');

const FIXED_BAR_WIDTH = width * (300 / 320);
const INDICATOR_PADDING = width * (10 / 320);

const images = [
  require('../../../../../assets/Images/Support/SupportOnBoarding1.png'),
  require('../../../../../assets/Images/Support/SupportOnboarding2.png'),
  require('../../../../../assets/Images/Support/SupportOnboarding3.png'),
  require('../../../../../assets/Images/Support/SupportOnboarding4.png'),
];

const OnBoardingSupport = ({navigation}) => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState(null);

  //TO HANDLE THE DEVICE BACK
  const handleBackButtonPressAndroid = () => {
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    } else {
      return true;
    }
  };

  // FUNCTION TO CALL THE SIGNUP PAGE
  const navigateNext = () => {
    navigation.navigate('SupportLandingScreen');
  };

  //NAVIGATE TO THE NEXT ONBOARDING PAGE
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex(prevIndex => prevIndex + 1);
    } else {
      // Handle navigation to the next screen or any other logic
      console.log('Reached the last slide');
    }
  };

  //NAVIGATE TO PREVIOUS ONOARDING PAGE
  const handlePrevious = () => {
    if (currentIndex < images.length + 1) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex - 1) * width,
        animated: true,
      });
      setCurrentIndex(prevIndex => prevIndex - 1);
    } else {
      // Handle navigation to the next screen or any other logic
      console.log('Reached the last slide');
    }
  };

  const numItems = images.length;
  const itemWidth = FIXED_BAR_WIDTH / ((numItems - 1) * INDICATOR_PADDING);
  const animateX = useRef(new Animated.Value(0)).current;

  // RENDERS THE SLIDES WITH IMAGES ACCORIDNG TO THE IMAGE ARRAY
  const renderSlides = () => {
    const ImageComponent = ({index, image}) => (
      <Image
        resizeMode="contain"
        key={index}
        source={image}
        style={styles.sliderImage}
      />
    );

    const TextComponent = ({index}) => (
      <>
        <Text style={styles.title}>{ONBOARDINGSUPPORTTITLES[index]}</Text>
        <Text style={styles.descriptionText}>
          {ONBOARDINGSUPPORTDESC[index]}
        </Text>
      </>
    );

    return images.map((image, i) => (
      <View key={i} style={{width: width, flex: 1}}>
        <View style={styles.skipOverlay}>
          <TouchableOpacity onPress={() => navigateNext()} style={{padding: 5}}>
            <Text style={styles.nextPageButton}>SKIP</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[styles.sliderImageContainer, styles.sliderImageTopContainer]}>
          {i % 2 === 0 ? (
            <ImageComponent index={i} image={image} />
          ) : (
            <TextComponent index={i} />
          )}
        </View>

        <View
          style={[
            styles.viewDesc,
            {paddingBottom: i == 2 ? width * 0.26 : width * 0.2},
          ]}>
          <View
            style={[
              styles.sliderImageContainer,
              styles.sliderImageBottomContainer,
            ]}>
            {i % 2 !== 0 ? (
              <ImageComponent index={i} image={image} />
            ) : (
              <TextComponent index={i} />
            )}
          </View>
        </View>

        <View style={styles.prevNextContainer}>
          {i !== 0 && (
            <View style={[styles.nextPageView1]}>
              <TouchableOpacity onPress={() => handlePrevious()}>
                <Text style={styles.nextPageButton}>PREVIOUS</Text>
              </TouchableOpacity>
            </View>
          )}

          {i == 3 ? (
            <View style={styles.nextPageView}>
              <TouchableOpacity onPress={() => navigateNext()}>
                <Text style={styles.nextPageButton}>FINISH</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.nextPageView}>
              <TouchableOpacity onPress={() => handleNext()}>
                <Text style={styles.nextPageButton}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    ));
  };

  // RENDERS THE INDICATORS ON THE BOTTOM ACCORDING TO THE IMAGE ARRAY
  const renderIndicators = () => {
    return images.map((_, i) => {
      const indicatorPosition = animateX.interpolate({
        inputRange: [width * (i - 1), width * (i + 1)],
        outputRange: [-itemWidth, itemWidth],
        extrapolate: 'clamp',
      });

      return (
        <View
          key={i}
          style={[
            styles.normalIndicator,
            {
              width: itemWidth,
              marginLeft: i === 0 ? 0 : INDICATOR_PADDING,
            },
          ]}>
          <Animated.View
            style={[
              styles.animtedIndicator,
              {
                width: itemWidth,
                transform: [{translateX: indicatorPosition}],
              },
            ]}
          />
        </View>
      );
    });
  };

  return (
    <View style={{backgroundColor: PUREWHITE, flex: 1}}>
      {/* <StatusBar backgroundColor={PUREWHITE} barStyle={'dark-content'} /> */}
      <View style={styles.container}>
        <ScrollView
          scrollEnabled={false}
          horizontal
          ref={scrollViewRef}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          style={styles.positionAbsolute}
          pagingEnabled
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: animateX}}},
          ])}>
          {renderSlides()}
        </ScrollView>

        <View style={styles.indicatorOuterWrapper}>
          <View style={styles.indicatorInnerWrapper}>{renderIndicators()}</View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorOuterWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: height * 0.04,
  },
  indicatorInnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImageContainer: {
    width: DEFAULTWIDTH,

    paddingTop: DEFAULTHEIGHT * 0.045,
    backgroundColor: ONBOARDINGBAGROUND,
    // justifyContent: "center"
  },
  sliderImage: {width: 270, height: 270},
  sliderImageBottomContainer: {
    borderTopLeftRadius: DEFAULTHEIGHT * 0.45,
    marginTop: DEFAULTHEIGHT * 0.02,
    height: DEFAULTHEIGHT * 0.55,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: DEFAULTHEIGHT * 0.2,
  },
  sliderImageTopContainer: {
    borderBottomRightRadius: DEFAULTHEIGHT * 0.45,
    height: DEFAULTHEIGHT * 0.45,
    justifyContent: 'center',
  },
  viewDesc: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: width * 0.06,
    paddingRight: width * 0.06,
    paddingBottom: width * 0.2,
  },
  title: {
    fontSize: 24,
    color: PRIMARYCOLOR,
    marginTop: DEFAULTHEIGHT * 0.02,
    fontFamily: 'Inter-Bold',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: PRIMARYCOLOR,
    fontFamily: 'Inter-Regular',
    marginTop: DEFAULTHEIGHT * 0.02,
    marginHorizontal: DEFAULTWIDTH * 0.08,
    lineHeight: 22,
  },
  normalIndicator: {
    backgroundColor: ONBOARDINGSCROLL,
    overflow: 'hidden',
    height: 4,
    borderRadius: 20,
    opacity: 0.6,
  },
  animtedIndicator: {
    backgroundColor: FIFTHCOLOR,
    height: 4,
    borderRadius: 20,
  },
  nextPageButton: {
    color: PRIMARYCOLOR,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  nextPageView: {
    position: 'absolute',
    bottom: '5%',
    right: '8%',
    zIndex: 99,
  },
  nextPageView1: {
    position: 'absolute',
    bottom: '5%',
    marginLeft: width * 0.05,
    zIndex: 99,
  },
  prevNextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: DEFAULTWIDTH,
    height: 50,
    bottom: DEFAULTHEIGHT * 0.05,
    backgroundColor: ONBOARDINGBAGROUND,
  },
  skipOverlay: {
    top: DEFAULTHEIGHT * 0.06,
    right: DEFAULTWIDTH * 0.04,
    position: 'absolute',
    zIndex: 10,
  },
});

export default OnBoardingSupport;
