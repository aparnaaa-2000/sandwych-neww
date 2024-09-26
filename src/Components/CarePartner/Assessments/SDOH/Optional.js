import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  BOTTOMTABTEXT1,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLOR7,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { Dropdown } from 'react-native-element-dropdown';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';


const OptionalQ = ({
  OptState1,
  OptState2,
  OptState3,
  setOptState1,
  setOptState2,
  setOptState3,
}) => {
  const [Optional1, setOptional1] = useState([
    // Optional 1
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]);

  const [Optional2, setOptional2] = useState([
    // Money and Resource 2
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]);

  const [Optional3, setOptional3] = useState([
    // Money and Resource 2
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]);

  return (
    <View>
      <View style={styles.descView}>
        <Text style={styles.textDesc}>
          In the past year, have you spent more than 2 nights in a row in a
          jail, prison, or detention
        </Text>
        <Text style={styles.textDesc}>center?</Text>
      </View>

      <View style={DEFAULTSTYLES.alignView}>
        <Dropdown
          style={styles.dropdnContainer}
          placeholderStyle={styles.placeholderS}
          itemTextStyle={styles.textArea}
          selectedTextStyle={styles.textArea}
          containerStyle={styles.dropView}
          data={Optional1}
          showsVerticalScrollIndicator={false}
          search={false}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={OptState1}
          onChange={item => {
            setOptState1(item.value);
          }}
        />
      </View>

      <View style={styles.descView}>
        <Text style={styles.textDesc}>Are you a refugee?</Text>
      </View>

      <View style={DEFAULTSTYLES.alignView}>
        <Dropdown
          style={styles.dropdnContainer}
          placeholderStyle={styles.placeholderS}
          itemTextStyle={styles.textArea}
          selectedTextStyle={styles.textArea}
          containerStyle={styles.dropView}
          data={Optional2}
          search={false}
          showsVerticalScrollIndicator={false}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={OptState2}
          onChange={item => {
            setOptState2(item.value);
          }}
        />
      </View>

      <View style={styles.descView}>
        <Text style={styles.textDesc}>
          Do you feel physically and emotionally safe where you currently live?
        </Text>
      </View>

      <View style={DEFAULTSTYLES.alignView}>
        <Dropdown
          style={styles.dropdnContainer}
          placeholderStyle={styles.placeholderS}
          itemTextStyle={styles.textArea}
          selectedTextStyle={styles.textArea}
          containerStyle={styles.dropView}
          data={Optional3}
          search={false}
          showsVerticalScrollIndicator={false}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          value={OptState3}
          onChange={item => {
            setOptState3(item.value);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    lineHeight: GlobalSize(20),
  },
  dropView: {
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.9,
    padding: GlobalSize(5),
  },
  dropdnContainer: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.9,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    padding: GlobalSize(5),
    color: TEXTCOLOR7,
    marginBottom: GlobalSize(20),
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
  descView: {
    marginLeft: GlobalSize(12),
    marginBottom: GlobalSize(15),
    marginRight:GlobalSize(2)
  }
});
export default OptionalQ;
