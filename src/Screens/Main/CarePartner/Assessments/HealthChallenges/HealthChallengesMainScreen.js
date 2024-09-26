import {View, Text, Image, SafeAreaView, StyleSheet,StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import {PRIMARYCOLOR, PUREWHITE} from '../../../../../Constants/Colors/Colors';
import {Button} from 'react-native-paper';
import { GlobalSize, fontSize, height, width } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../../../Constants/Fonts';
import { useSelector } from 'react-redux';

const HealthChallengesMainScreen = ({navigation,route}) => {
  console.log("route again...............",route?.params?.item)

  const value = useSelector((state) => state?.getPageNameValue?.value);

  console.log("redux value..................",value)
  const backToEnrollment = () => {
    navigation.navigate('EnrollmentProgress');
  };

  const navigateToHCForm = () => {
    navigation.navigate('AssessmentMain',{item:route?.params?.item,  
       titleGroup:route?.params?.titleGroup,
      titleName:route?.params?.titleName,
      titleId:route?.params?.titleId});
  };

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={PRIMARYCOLOR} barStyle={'light-content'} style={{ flex: 0 }} />
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../../../../assets/Images/HC.png')}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Your Care Story</Text>
      </View>

      <View style={{padding:GlobalSize(10)}}>
        <Text style={[styles.headingText,{fontSize:fontSize(13),textAlign:'center'}]}>Your caregiving story is unique. By telling us what motivates you, we can tailor our support to match your needs and values.</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => backToEnrollment()} style={styles.buttonStyle}>
          <Text style={styles.textCont}>Exit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToHCForm()} style={styles.buttonStyle}>
          <Text style={styles.textCont}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: {
    backgroundColor: PRIMARYCOLOR,
    flex: 1,
  },
  imageStyle: {
    width: '92%',
    //height: '83%',
  },
  headingContainer: {
    //marginTop: -120,
    alignItems: 'center',
  },
  headingText: {
    color: PUREWHITE,
    fontSize: fontSize(25),
    fontFamily: 'Inter-Bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: GlobalSize(20),
    alignSelf: 'center',
  },
  buttonStyle: {
    width: width(140),
    height: height(40),
    margin:GlobalSize(12),
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(8),
    alignItems:'center',
    justifyContent:'center'
  },
  textCont: {
    color: PRIMARYCOLOR,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontSemiB
  }
});

export default HealthChallengesMainScreen;
