import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput
} from 'react-native';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  BORDERCOLOR5,
  BOTTOMTABTEXT1,
  PUREWHITE,
  PRIMARYCOLOR,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR10,
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { Check, Uncheck } from '../../../../../assets';
import SDOHDropdown from '../../../Common/SDOHTextInput/SDOHDropdown';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { MoneyResourceFour, MoneyResourceThree } from '../../../../Constants/Texts/Assessments/SDOH/SDOH';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const MoneyResources6 = ({
  Heading,
  MoneyRs1,
  setMoneyRs1,
  MoneyRsRB5,
  setMoneyRsRB5,
  TextInRs5,
  setTextInRs5,
  MoneyRs6,
  setMoneyRs6,
  MoneyRs7,
  setMoneyRs7,
  TextInRs2,
  setTextInRs2,
  MoneyRsRB2,
  setMoneyRsRB2,
  MoneyRs2,
  setMoneyRs2
}) => {
  const [Education, setEducation] = useState([
    { label: 'BSC', value: 'BSC' },
    { label: 'B.Tech', value: 'B.Tech' },
  ]);

  const [Work, setWork] = useState([
    // Money and Resource 2
    { label: 'Not working', value: 'Not working' },
    { label: 'On leave', value: 'On leave' },
  ]);

  const [CheckData, setCheckData] = useState([
    {
      id: 1,
      Title: 'Food',
      isSelected: false,
    },
    {
      id: 2,
      Title: 'Clothing',
      isSelected: false,
    },
    {
      id: 3,
      Title: 'Utilities',
      isSelected: false,
    },
    {
      id: 4,
      Title: 'Childcare',
      isSelected: false,
    },
    {
      id: 5,
      Title: 'Medicine',
      isSelected: false,
    },
    {
      id: 6,
      Title: 'Any health care (medical, dental, mental health, vision)',
      isSelected: false,
    },
  ]);

  const handleCheckBoxPress = item => {
    const updatedData = CheckData.map(dataItem => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      }
      return dataItem;
    });

    setCheckData(updatedData);

    const selectedItems = updatedData.filter(item => item.isSelected);
    setMoneyRs6(selectedItems);
  };

  switch (Heading) {
    case 0:
      imageSource = require('../../../../../assets/Images/SDOH/M6.png');
      Description =
        'What is the highest level of school that you have finished?';
      break;

    case 1:
      imageSource = require('../../../../../assets/Images/SDOH/M5.png');
      Description = 'What is your current work situation?';
      break;

    case 2:
      imageSource = require('../../../../../assets/Images/SDOH/M4.png');
      Description = 'Do you want help finding or keeping work or a job?';
      break;

    case 3:
      imageSource = require('../../../../../assets/Images/SDOH/M7.png');
      Description =
        'How hard is it for you to pay for the very basics like food, housing, medical care, and heating? Would you say it is:';
      break;

    case 4:
      imageSource = require('../../../../../assets/Images/SDOH/M2.png');
      Description =
        'During the past year, what was the total combin\ned income for you and the family members you live with? This information will help us determine if you are eligible for any benefits.';
      break;

    case 6:
      imageSource = require('../../../../../assets/Images/SDOH/M1.png');
      Description =
        'Has lack of transportation kept you from medical appointments, meetings, work, or from getting things needed for daily living? Check all that apply';
      break;
  }

  const handleOptionPressP1 = option => {
    setMoneyRsRB2(option);
    setTextInRs2(null), setMoneyRs1(null);
  };


  return (
    <>
      {Heading !== 5 && (
        <>
          <View style={DEFAULTSTYLES.alignView}>
            <View style={styles.imageView}>
              <Image style={styles.imageStyle} source={imageSource} />
            </View>
          </View>

          <View style={{ marginLeft: GlobalSize(6), marginRight: GlobalSize(10) }}>
            <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>
              {Description}
            </Text>
          </View>
        </>
      )}

      {Heading == 0 ? (
        <View style={styles.mainView}>

          <SDOHDropdown
            data={Education}
            value={MoneyRs1}
            placeholder={'Select'}
            setValue={setMoneyRs1} />

        </View>
      ) : Heading == 1 ? (
        <View>
          <View style={styles.mainView}>
            <SDOHDropdown
              data={Work}
              value={MoneyRs2}
              placeholder={'Select'}
              setValue={setMoneyRs2}
             />

            <View style={styles.textInView}>
              <TextInput
                value={TextInRs2}
                placeholder="Please write...."
                maxLength={50}
                placeholderTextColor={BORDERCOLOR5}
                style={styles.inputWrite}
                onChangeText={text => {
                  setTextInRs2(text), setMoneyRsRB2('No');
                }}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: GlobalSize(8) }}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleOptionPressP1('Yes')}>
              <View
                style={[
                  styles.radioIcon,
                  MoneyRsRB2 == 'Yes' && styles.radioIconSelected,
                ]}>
                {MoneyRsRB2 == 'Yes' && <View style={styles.radioBorder} />}
              </View>
            </TouchableOpacity>

            <View style={{ marginTop: GlobalSize(7) }}>
              <Text style={styles.textDesc}>
                I chose not to answer this question
              </Text>
            </View>
          </View>
        </View>
      ) : Heading == 2 ? (
        <View style={styles.radioView}>

          <SDOHTextInputWithout
            Data={MoneyResourceThree}
            Heading={Heading}
            radioBtnValue={MoneyRs1}
            setRadioBtnValue={setMoneyRs1}
          />
        </View>
      ) : Heading == 3 ? (
        <View style={styles.radioView}>
          <SDOHTextInputWithout
            Data={MoneyResourceFour}
            Heading={Heading}
            radioBtnValue={MoneyRs1}
            setRadioBtnValue={setMoneyRs1}
          />
        </View>
      ) : Heading == 4 ? (
        <View>
          <View style={styles.viewRadioBtn}>
            <View style={{ marginTop: GlobalSize(13) }}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => setMoneyRsRB5('Yes')}>
                <View
                  style={[
                    styles.radioIcon,
                    MoneyRsRB5 == 'Yes' && styles.radioIconSelected,
                  ]}>
                  {MoneyRsRB5 == 'Yes' && <View style={styles.radioBorder} />}
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.textInView, { width: DEFAULTWIDTH * 0.8}]}>
              {MoneyRsRB5 !== 'Yes' ? (
                <View style={styles.inputView}>
                  <Text style={{ fontSize: fontSize(12), color: BORDERCOLOR5, }}>
                    Please write....
                  </Text>
                </View>
              ) : (
                <TextInput
                  value={TextInRs5}
                  placeholder="Please write...."
                  maxLength={50}
                  placeholderTextColor={BORDERCOLOR5}
                  style={styles.inputWrite}
                  onChangeText={text => setTextInRs5(text)}
                />
              )}
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginLeft: GlobalSize(8) }}>
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => setMoneyRsRB5('No')}>
              <View
                style={[
                  styles.radioIcon,
                  MoneyRsRB5 == 'No' && styles.radioIconSelected,
                ]}>
                {MoneyRsRB5 == 'No' && <View style={styles.radioBorder} />}
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: GlobalSize(7) }}>
              <Text style={styles.textDesc}>
                I chose not to answer this question
              </Text>
            </View>
          </View>
        </View>
      ) : Heading == 5 ? (
        <View>
          <View style={{ margin: GlobalSize(10) }}>
            <Text style={styles.textDesc}>
              In the past year, have you or any family member you live with been
              unable to get any of the following when it was really needed?
            </Text>
          </View>

          <View style={{ marginLeft: DEFAULTWIDTH * 0.05 }}>
            <FlatList
              data={CheckData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.checkView}>
                    {item?.isSelected ? (
                      <TouchableOpacity
                        onPress={() => handleCheckBoxPress(item)}
                        style={{ padding: GlobalSize(5) }}>
                        <Check style={{ marginTop: GlobalSize(4) }} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleCheckBoxPress(item)}
                        style={{ padding: GlobalSize(5) }}>
                        <Uncheck style={{ marginTop: GlobalSize(5) }} />
                      </TouchableOpacity>
                    )}
                    <View
                      style={{
                        maxWidth: DEFAULTWIDTH * 0.75,
                        marginLeft: DEFAULTWIDTH * 0.03,
                      }}>
                      <Text style={styles.checkBoxText}>{item.Title} </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      ) : Heading == 6 ? (
        <View style={styles.mainView}>

          <SDOHDropdown
            data={Work}
            value={MoneyRs1}
            placeholder={'Select'}
            setValue={setMoneyRs1} />

        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    lineHeight: GlobalSize(20),
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  inputView: {
    justifyContent: 'center',
    marginTop: GlobalSize(14),
    left: GlobalSize(15),
  },
  mainView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(10),
  },
  radioView: {
    alignItems: 'flex-start',
    marginTop: GlobalSize(10),
    marginLeft: GlobalSize(10),
  },
  checkBoxText: {
    color: TEXTCOLOR5,
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
  },
  viewRadioBtn: {
    flexDirection: 'row',
    marginLeft: GlobalSize(8),
    alignItems: 'center',
    marginBottom: GlobalSize(10),
    marginTop: GlobalSize(10),
  },
  dropView: {
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.9,
    padding: GlobalSize(5),
  },
  imageView: {
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.9,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(10),
    elevation: 2,
    marginBottom: GlobalSize(15),
  },
  inputWrite: {
    color: TEXTCOLOR10,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    paddingLeft: GlobalSize(15),
    alignItems:'center'
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
  textArea: {
    fontSize: GlobalSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
  },
  placeholderS: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: BOTTOMTABTEXT1,
  },
  textInView: {
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.13,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    borderWidth: 1,
    marginTop: GlobalSize(12),
    marginBottom: GlobalSize(1),
    justifyContent:'center'
  },
  imageStyle: {
    width: DEFAULTWIDTH * 0.9,
    height:DEFAULTHEIGHT*0.38,
  },
});
export default MoneyResources6;
