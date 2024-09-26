import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  SafeAreaView
} from 'react-native';

// COLORS ARE IMPORTED GLOBALLY FROM COLORS
import {
  FIFTHCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
  SECONDARYTEXTCOLOR3
} from '../../../../../Constants/Colors/Colors';

// TEXTS IMPORTED FROM CONSTANTS FOLDER -
import { ONBOARDINGDESC, ONBOARDINGTITLES } from '../../../../../Constants/Texts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const FIXED_BAR_WIDTH = width * (300 / 320);
const INDICATOR_PADDING = width * (10 / 320);

const images = [
  require('../../../../../../assets/Images/2.png'),
  require('../../../../../../assets/Images/1.png'),
  require('../../../../../../assets/Images/5.png'),
  require('../../../../../../assets/Images/3.png'),
];

const OnBoardingScreen = ({ navigation,route }) => {

  console.log("HIPAA.........................",route?.params?.hipaaData)

  const scrollViewRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [token,setToken] = useState(null)

  // FUNCTION TO CALL THE SIGNUP PAGE
  const navigateNext = () => {
    if(route?.params?.hipaaData == null){
      navigation.navigate('HipaaValidationForm', {
        hipaaId:route?.params?.hipaaId,
        userId: route?.params?.userId,
        pdf:route?.params?.pdf,
      });
    }else{
      navigation.navigate('EnrollmentStack', { screen: 'ChooseTheUser' });
    }
    
  };

  useEffect(() => {

    handleBackButtonPressAndroid();
    getItemFromAsyncStorage();

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, [navigation]);

  const getItemFromAsyncStorage = async () => {
    try {
        const storedValue = await AsyncStorage.getItem('TOKENAuth');
        if (storedValue !== null) {
          setToken(storedValue)
        } else {

        }
    } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
    }
};

//TO HANDLE THE DEVICE BACK
  const handleBackButtonPressAndroid = () => { 
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    else {
      return true;
    }
  };

  //NAVIGATE TO THE NEXT ONBOARDING PAGE
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
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
      setCurrentIndex((prevIndex) => prevIndex - 1);
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
    return images.map((image, i) => (
      <View key={i} style={{ width: width }}>

        <View style={{ alignItems: 'flex-end', marginRight: width * 0.05, marginTop: 1 }}>
          <TouchableOpacity onPress={() => navigateNext()} style={{ padding: 5 }}>
            <Text style={styles.nextPageButton}>SKIP</Text>
          </TouchableOpacity>
        </View>
        <Image
          resizeMode="cover"
          key={i}
          source={image}
          style={styles.sliderImage}
        />
        <View style={[styles.viewDesc,{paddingBottom:i==2 ?  width*0.26:width*0.2}]}>
          <View>
            <Text style={styles.title}>{ONBOARDINGTITLES[i]}</Text>
            <Text style={styles.descriptionText}>{ONBOARDINGDESC[i]}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          {i !== 0 &&
            <View style={[styles.nextPageView1,{}]}>
              <TouchableOpacity onPress={() => handlePrevious()}>
                <Text style={styles.nextPageButton}>PREVIOUS</Text>
              </TouchableOpacity>
            </View>}

          {i == 3 ? (
            <View style={styles.nextPageView}>
              <TouchableOpacity onPress={() => navigateNext()}>
                <Text style={styles.nextPageButton}>FINISH</Text>
              </TouchableOpacity>
            </View>
          ) :
            <View style={styles.nextPageView}>
              <TouchableOpacity onPress={() => handleNext()}>
                <Text style={styles.nextPageButton}>NEXT</Text>
              </TouchableOpacity>
            </View>
          }
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
                transform: [{ translateX: indicatorPosition }],
              },
            ]}
          />
        </View>
      );
    });
  };


  return (
    <SafeAreaView style={{ backgroundColor: PUREWHITE, flex: 1 }}>
      <StatusBar backgroundColor={PUREWHITE} barStyle={'dark-content'} />
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
            { nativeEvent: { contentOffset: { x: animateX } } },
          ])}>
          {renderSlides()}
        </ScrollView>

        <View style={styles.indicatorOuterWrapper}>
          <View style={styles.indicatorInnerWrapper}>{renderIndicators()}</View>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PUREWHITE,
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
    bottom: height * 0.06,
  },
  indicatorInnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderImage: {
    height: '60%',
    width: '100%',
    marginTop: width * 0.0
  },
  viewDesc: {
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:width*0.06,
    paddingRight:width*0.06,
    paddingBottom:width*0.2
  },
  title: {
    fontSize: 24,
    color:PRIMARYCOLOR,
    fontFamily: 'Inter-Bold',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: PRIMARYCOLOR,
    fontFamily: 'Inter-Regular',
    paddingTop: height * (4 / 360),
    lineHeight: 22,
  },
  normalIndicator: {
    backgroundColor: SECONDARYTEXTCOLOR3,
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
    color:PRIMARYCOLOR,
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
    zIndex:99
  },
});

export default OnBoardingScreen;
