import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  BOTTOMTABTEXT1,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLOR7,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const FamilyHome = ({
  Heading,
  NotAns,
  setNotAns,
  ValueFam,
  setValueFam,
  ValueFam2,
  setValueFam2,
}) => {
  const [Fam, setFam] = useState([
    { label: '5 Members', value: '5 Members' },
    { label: 'More than 5', value: 'More than 5' },
  ]);

  switch (Heading) {
    case 0:
      imageSource = require('../../../../../assets/Images/SDOH/PSC5.png');
      Description =
        'How many family members, including yourself, do you currently live with?';
      break;

    case 1:
      imageSource = require('../../../../../assets/Images/SDOH/PSC6.png');
      Description = 'What is your housing situation today?';
      break;
  }

  const handleOptionPress = () => {
    if (NotAns == 'No') {
      setValueFam(null);
      setNotAns('Yes');
    } else {
      setValueFam(null);
      setNotAns('No');
    }
  };

  const handleOptionPress2 = () => {
    setValueFam2('Ans1');
  };

  const handleOptionPress3 = () => {
    setValueFam2('Ans2');
  };

  return (
    <>
      <View style={DEFAULTSTYLES.alignView}>
        <View style={styles.imageView}>
          <Image style={styles.imageStyle} source={imageSource} />
        </View>
      </View>

      <View style={styles.descView}>
        <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>{Description}</Text>
      </View>
      {Heading == 0 ? (
        <View>
          <View style={DEFAULTSTYLES.alignView}>
            <Dropdown
              style={styles.textIn}
              placeholderStyle={styles.placeholderS}
              itemTextStyle={styles.textArea}
              selectedTextStyle={styles.textArea}
              containerStyle={styles.dropView}
              data={Fam}
              search={false}
              showsVerticalScrollIndicator={false}
              labelField="label"
              valueField="value"
              placeholder={'Select how many members'}
              value={ValueFam}
              onChange={item => {
                setValueFam(item.value);
                setNotAns('No');
              }}
            />

            <View
              style={styles.alignView}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleOptionPress()}>
                <View
                  style={[
                    styles.radioIcon,
                    NotAns == 'Yes' && styles.radioIconSelected,
                  ]}>
                  {NotAns == 'Yes' && <View style={styles.radioBorder} />}
                </View>
              </TouchableOpacity>

              <View style={{ marginTop: 7 }}>
                <Text style={styles.textDesc}>
                  I chose not to answer this question
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ marginLeft: 10 }}>
          <View
            style={styles.viewFlex}>

            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOptionPress2('Ans1')}>
              <View
                style={[
                  styles.radioIcon,
                  ValueFam2 == 'Ans1' && styles.radioIconSelected,
                ]}>
                {ValueFam2 == 'Ans1' && <View style={styles.radioBorder} />}
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 7 }}>
              <Text style={styles.textDesc}>I have Housing</Text>
            </View>
          </View>

          <View
            style={styles.viewFlex}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOptionPress3('Ans2')}>
              <View
                style={[
                  styles.radioIcon,
                  ValueFam2 == 'Ans2' && styles.radioIconSelected,
                ]}>
                {ValueFam2 == 'Ans2' && <View style={styles.radioBorder} />}
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: 7 }}>
              <Text style={[styles.textDesc, { lineHeight: 20 }]}>
                I do not have housing (staying with others,
              </Text>
              <Text style={[styles.textDesc, { lineHeight: 20 }]}>
                in a hotel, in a shelter, living outside on the
              </Text>
              <Text style={[styles.textDesc, { lineHeight: 20 }]}>
                street, on a beach, in a car, or in a park)
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  dropView: {
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.9,
    padding: GlobalSize(5),
  },
  textIn: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.9,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    padding: GlobalSize(5),
    color: TEXTCOLOR7,
  },
  descView: {
    marginLeft: GlobalSize(6),
    marginRight: GlobalSize(10),
    marginBottom: GlobalSize(15)
  },
  viewFlex: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: GlobalSize(5),
  },
  textArea: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
  },
  placeholderS: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: BOTTOMTABTEXT1,
  },
  alignView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    left: GlobalSize(-30),
    marginTop: GlobalSize(5),
  },
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
  },
  imageStyle: {
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTHEIGHT*0.38,
    //marginBottom: '4%',
  },
  imageView: {
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.9,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(10),
    elevation: 2,
    marginBottom: GlobalSize(15),
  },
  radioBorder: {
    width: GlobalSize(10),
    height: GlobalSize(10),
    borderRadius: GlobalSize(5),
    borderWidth: 2,
    borderColor: PRIMARYCOLOR,
    backgroundColor: PRIMARYCOLOR,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: GlobalSize(8),
  },
  radioIcon: {
    marginLeft: GlobalSize(10),
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderWidth: 2,
    borderColor: BORDERCOLOR4,
    marginRight: GlobalSize(8),
    backgroundColor: PUREWHITE,
  },
  radioIconSelected: {
    backgroundColor: PUREWHITE,
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderColor: PRIMARYCOLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default FamilyHome;
