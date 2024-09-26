import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  SIXTHCOLOR,
} from '../../../../../Constants/Colors/Colors';

import DEFAULTSTYLES from '../../../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
  height,
  width
} from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../../../Constants/Fonts';


const CaregiverDemographics = ({ navigation, route }) => {

  const backToEnrollment = () => {
    navigation.navigate('EnrollmentProgress');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={SIXTHCOLOR}
        barStyle={'light-content'}
        style={{ flex: 0 }} />
      <View style={[DEFAULTSTYLES.alignView, { marginTop: GlobalSize(50) }]}>
        <ImageBackground
          source={require('../../../../../../assets/Images/CD.png')}
          style={styles.imageStyle}
        >
          <View style={styles.imageView}>
            <Image
              source={require('../../../../../../assets/Images/MAN2.png')}
              style={styles.imageSub1}
              resizeMode='contain'
            />
            <Image
              source={require('../../../../../../assets/Images/PA1.png')}
              style={styles.imageSub2}
              resizeMode='contain'
            />
            <Image
              source={require('../../../../../../assets/Images/Man1.png')}
              style={styles.imageSub3}
              resizeMode='contain'
            />

          </View>
        </ImageBackground>
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Care partner Demographics</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => backToEnrollment()}
          style={styles.buttonStyle}>
          <Text style={styles.textCont}>Exit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('CarePartnerInfo', {
            item: route?.params?.item,
            titleGroup: route?.params?.titleGroup,
            titleName: route?.params?.titleName
          })}>
          <Text style={styles.textCont}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: SIXTHCOLOR,
    flex: 1,
  },
  imageStyle: {
    //width: '100%',
    marginBottom: GlobalSize(15)
    //height: '83%',
  },
  headingContainer: {
    // marginTop: GlobalSize(-120),
    alignItems: 'center',
    marginHorizontal: GlobalSize(25),
    justifyContent: 'center'
  },
  headingText: {
    color: PUREWHITE,
    fontSize: fontSize(25),
    fontFamily: 'Inter-Bold',
    textAlign: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: GlobalSize(20),
    alignSelf: 'center',
  },
  buttonStyle: {
    margin: GlobalSize(12),
    width: width(140),
    height: height(40),
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(190),
    left: GlobalSize(-10),
    flexDirection: 'row'
  },
  imageSub1: {
    marginLeft: GlobalSize(50)
    // width: GlobalSize(100),
    // height: GlobalSize(170),
    // marginTop: GlobalSize(31)
  },
  imageSub2: {
    // width: GlobalSize(75),
    //height: GlobalSize(120),
    left: GlobalSize(-70),
    top: GlobalSize(5)
  },
  imageSub3: {
    //width: GlobalSize(100),
    //height: GlobalSize(210),
    left: GlobalSize(-20),
    top: GlobalSize(-18)
  },
  textCont: {
    color: PRIMARYCOLOR,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontSemiB
  }
});

export default CaregiverDemographics;
