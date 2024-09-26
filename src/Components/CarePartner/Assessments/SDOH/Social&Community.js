import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  BOTTOMTABTEXT1,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLOR7,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';

import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';

import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { Dropdown } from 'react-native-element-dropdown';

const SocialCommunity = ({
  Heading,
  SocialState1,
  setSocialState1,
  SocialState2,
  setSocialState2,
  SocialState3,
  setSocialState3,
  QuestionFilter,
  SocialOptions1,
  SocialOptions2,
  SocialOptions3,
  mappedData

}) => {

  const [Options1, setOptions1] = useState(SocialOptions1);
  const [Options2, setOptions2] = useState(SocialOptions2);
  const [Options3, setOptions3] = useState(SocialOptions3);


  switch (Heading) {
    case 0:
      imageSource = require('../../../../../assets/Images/SDOH/C1.png');
      Description =
        QuestionFilter[Heading]?.question
      break;

    case 1:
      imageSource = require('../../../../../assets/Images/SDOH/C2.png');
      Description =
        'Stress is when someone feels tense, nervous, anxious, or can’t sleep at night because their mind is troubled. How stressed are you?';
      break;

    case 2:
      imageSource = require('../../../../../assets/Images/SDOH/C3.png');
      Description =
        'Within the last two weeks, have you had little interest or pleasure in doing things?';
      break;

    case 3:
      imageSource = require('../../../../../assets/Images/SDOH/C4.png');
      Description =
        'Within the last two weeks, have you been feeling down, depressed, or hopeless?';
      break;

    case 4:
      imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
      Description = 'If for any reason you need help with day-to-day activities such as bathing, preparing meals, shopping, managing finances, etc., do you get the help you need?';
      break;

    case 5:
      imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
      Description = "How often do you feel lonely or isolated from those around you?";
      break;

    case 6:
      imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
      Description = "Stress means a situation in which a person feels tense, restless, nervous, or anxious, or is unable to sleep at night because his or her mind is troubled all the time. Do you feel this kind of stress these days?";
      break;
  }

  const filteredMappedData1 = mappedData?.filter(item => item.id == 88);
  const filteredMappedData2 = mappedData?.filter(item => item.id == 89);
  const filteredMappedData3 = mappedData?.filter(item => item.id == 90);

  return (
    <>

      <>
        <View
          style={DEFAULTSTYLES.alignView}>
          <View
            style={styles.imageView}>
            <Image style={styles.imageStyle} source={imageSource} />
          </View>
        </View>

        <View style={styles.dropBottom}>
          <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>
            {QuestionFilter[Heading]?.question}
          </Text>
        </View>
      </>

      <View
        style={styles.dropOut}>
        {Heading === 0 ?
          <Dropdown
            style={styles.dropDnContainer}
            placeholderStyle={styles.placeholderS}
            itemTextStyle={styles.textArea}
            selectedTextStyle={styles.textArea}
            containerStyle={styles.dropView}
            data={Options1}
            search={false}
            labelField="label"
            valueField="value"
            placeholder={SocialState1 ? SocialState1 : filteredMappedData1[0]?.answer}
            dropdownPosition='bottom'
            showsVerticalScrollIndicator={false}
            value={SocialState1}
            onChange={item => {
              setSocialState1(item.value)
            }}
          /> :
          Heading === 1 ?
            <Dropdown
              style={styles.dropDnContainer}
              placeholderStyle={styles.placeholderS}
              itemTextStyle={styles.textArea}
              selectedTextStyle={styles.textArea}
              containerStyle={styles.dropView}
              data={Options2}
              search={false}
              labelField="label"
              valueField="value"
              placeholder={SocialState2 ? SocialState2 : filteredMappedData2[0]?.answer}
              dropdownPosition='bottom'
              showsVerticalScrollIndicator={false}
              value={SocialState2}
              onChange={item => {
                setSocialState2(item.value)
              }}
            /> :
            <Dropdown
              style={styles.dropDnContainer}
              placeholderStyle={styles.placeholderS}
              itemTextStyle={styles.textArea}
              selectedTextStyle={styles.textArea}
              containerStyle={styles.dropView}
              data={Options3}
              search={false}
              labelField="label"
              valueField="value"
              placeholder={SocialState3 ? SocialState3 : filteredMappedData3[0]?.answer}
              dropdownPosition='bottom'
              showsVerticalScrollIndicator={false}
              value={SocialState3}
              onChange={item => {
                setSocialState3(item.value)
              }}
            />}
      </View>


    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTHEIGHT * 0.38,
  },
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    lineHeight: GlobalSize(20)
  },
  imageView: {
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.9,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(10),
    elevation: 2,
    marginBottom: GlobalSize(15),
  },
  dropBottom: {
    marginLeft: GlobalSize(6),
    marginRight: GlobalSize(10),
    marginBottom: GlobalSize(5)
  },
  dropOut: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(10),
  },
  dropView: {
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.9,
    padding: GlobalSize(5),
  },
  dropDnContainer: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.9,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    padding: GlobalSize(5),
    color: TEXTCOLOR7,
    height: GlobalSize(45)
  },
  textArea: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10
  },
  placeholderS: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: BOTTOMTABTEXT1,
  },
});
export default SocialCommunity;
