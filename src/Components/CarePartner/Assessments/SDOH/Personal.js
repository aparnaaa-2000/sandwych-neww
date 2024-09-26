import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  BORDERCOLOR4,
  PUREWHITE,
  TEXTCOLOR5
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import SDOHDropdown from '../../../Common/SDOHTextInput/SDOHDropdown';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { PersonalData } from '../../../../Constants/Texts/Assessments/SDOH/SDOH';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const Personal = ({
  Heading,
  valueDay,
  setValueDay,
  PersQ1,
  setPersQ1,
}) => {
  const [Days, setDays] = useState([
    { label: '25 days', value: '25 days' },
    { label: '50 days', value: '50 days' },
  ]);

  const [Frequency, setFrequency] = useState([
    { label: '48.90%', value: '48.90%' },
    { label: '35.56%', value: '35.56%' },
  ]);

  switch (Heading) {
    case 0:
      imageSource = require('../../../../../assets/Images/SDOH/PSC1.png');
      Description =
        'On average, how many days per week do you engage in moderate to strenuous exercise (like walking fast, running, jogging, dancing, swimming, biking, or other activities that cause a light or heavy sweat)?';
      break;

    case 1:
      imageSource = require('../../../../../assets/Images/SDOH/PSC2.png');
      Description = 'How often do you have a drink containing alcohol?';
      break;

    case 2:
      imageSource = require('../../../../../assets/Images/SDOH/PSC3.png');
      Description =
        'At any point in the past 2 years, has season or migrant farm work been your or your family’s main source of income?';
      break;

    case 3:
      imageSource = require('../../../../../assets/Images/SDOH/PSC4.png');
      Description =
        'Have you been discharged from the armed forces of the United States?';
      break;
  }

  return (
    <View>
      <View
        style={styles.viewPersonal}>
        <View
          style={styles.imageView}>
          <Image style={styles.imageStyle} source={imageSource} />
        </View>
      </View>

      <View style={{ marginLeft: GlobalSize(6), marginRight: GlobalSize(10) }}>
        <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>{Description}</Text>
      </View>

      {Heading == 0 ? (
        <View
          style={styles.viewDrop}>
          <SDOHDropdown
            data={Days}
            value={valueDay}
            placeholder={'Select number of days'}
            setValue={setValueDay} />

        </View>
      ) : Heading == 1 ? (
        <View
          style={styles.viewDrop}>

          <SDOHDropdown
            data={Frequency}
            value={valueDay}
            placeholder={'Select frequency'}
            setValue={setValueDay} />

        </View>
      ) : Heading == 2 ? (
        <View style={styles.viewPersonal3}>

          <SDOHTextInputWithout
            Data={PersonalData}
            Heading={Heading}
            radioBtnValue={PersQ1}
            setRadioBtnValue={setPersQ1}
          />

        </View>
      ) : Heading == 3 ? (
        <View style={styles.viewPersonal3}>

        <SDOHTextInputWithout
          Data={PersonalData}
          Heading={Heading}
          radioBtnValue={PersQ1}
          setRadioBtnValue={setPersQ1}
        />

      </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  dropView: {
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.9,
    padding: GlobalSize(5),
  },
  viewPersonal: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DEFAULTHEIGHT * 0.00,
  },
  imageView: {
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.9,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(10),
    elevation: 2,
    marginBottom: GlobalSize(15),
  },
  viewDrop: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(15),
  },
  imageStyle: {
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTHEIGHT*0.38,
  },
  viewPersonal3: {
    alignItems: 'flex-start',
    marginTop: GlobalSize(10),
    marginLeft: GlobalSize(10),
    flexDirection: 'row'
  },
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
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

});
export default Personal;
