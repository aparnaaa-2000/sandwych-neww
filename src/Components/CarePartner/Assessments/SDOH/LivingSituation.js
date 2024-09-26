import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native';

import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { BACKGROUNDWHITE, BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { Check, Uncheck } from '../../../../../assets';
import SDOHTextInputWithout from '../../../Common/SDOHTextInput/SDOHTextInputWithOut';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const LivingSituation = ({
  Heading,
  LivingValue,
  setLivingValue,
  setLivingArray,
  QuestionFilter,
  OptionFilter,
  LivingAnswer1,
  setLivingAnswer1,
  QuestionId,
  LivingAnswer3,
  setLivingAnswer3,
  LivingAnswer4,
  setLivingAnswer4,
  LivingData2,
  setLivingData2,
  mappedData,
  setReasonOption
}) => {

  const [option, setOptions] = useState([]);
  const [LivingData3, setLivingData3] = useState([]);
  const [LivingData4, setLivingData4] = useState([]);

  let imageSource;
  let Description;

  switch (Heading) {
    case 0:
      imageSource = require('../../../../../assets/Images/SDOH/LIVING1.png');
      Description = 'What is your living situation today?';
      break;
    case 1:
      Description = 'Think about the place you live. Do you have any problems with any of the following?';
      break;
    case 2:
      imageSource = require('../../../../../assets/Images/SDOH/LIVING2.png');
      Description = 'How hard is it for you to pay for the very basics like food, housing, medical care, and heating? Would you say it is:';
      break;
    case 3:
      imageSource = require('../../../../../assets/Images/SDOH/LIVING3.png');
      Description = 'In the past 12 months has the electric, gas, oil, or water company threatened to shut off services in your home:';
      break;
  }

  useEffect(() => {
    const newArray = OptionFilter.map(item => ({
      id: item?.id,
      Title: item?.option,
      isSelected: false
    }));

    if (QuestionId == 11) {
      setOptions(newArray);
    } else if (QuestionId == 12) {
      console.log("ITEM SELECT")
      if(LivingData2){
        const itemSelect = LivingData2?.filter((item) => item?.isSelected === true);
        console.log("ITEM SELECT...............",itemSelect,LivingData2)
        if (itemSelect?.length === 0) {
          setLivingData2(newArray);
        }
      }else{
        console.log("LIVING DATA NUMM",)
        setLivingData2(newArray);

        // const updatedOptions =  newArray?.filter(option => option?.question_id === 16).
        // map(option => {
        //   const match = route?.params?.item?.pat?.find(answer => answer.option_id === option.id);
        //   console.log("MATCH DATA................",match)
        //  // alert("HELLO")
        //   if (match) {
        //     return { ...option, isSelected: true };
        //   }
        //   return option;
        // });
       // setReasonOption(updatedOptions)
      }
   
    } else if (QuestionId == 54) {
      setLivingData3(newArray);
    } else if (QuestionId == 55) {
      setLivingData4(newArray);
    }
  }, [QuestionId]);

  // useEffect(()=>{
  //   setLivingData2(OptionFilter)
  // },[QuestionId,OptionFilter])

  const filteredMappedData = mappedData.filter(item => item.id == 11);
  const filteredMappedData2 = mappedData.filter(item => item.id == 12);
  const filteredMappedData3 = mappedData.filter(item => item.id == 54);
  const filteredMappedData4 = mappedData.filter(item => item.id == 55);
  console.log(filteredMappedData3)

  const onPressHousingProblem = (item) => {
    const updatedData = LivingData2?.map(dataItem => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      } 
      return dataItem;
    });

    setLivingData2(updatedData);
    const selectedItems = updatedData.filter(item => item.isSelected);
    setLivingArray(selectedItems);
  };

  console.log("LIVING ADATA...................",filteredMappedData2)
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {Heading !== 1 && (
          <View style={DEFAULTSTYLES.alignView}>
            <View style={styles.imageView}>
              <Image style={styles.imageStyle} source={imageSource} />
            </View>
          </View>
        )}
        <View style={styles.viewDesc}>
          <Text style={[styles.textDesc, { marginLeft: GlobalSize(10) }]}>{QuestionFilter[Heading]?.question}</Text>
        </View>
        {Heading === 1 ? (
          <View style={{ marginLeft: GlobalSize(15) }}>
            <FlatList
              data={LivingData2}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity style={styles.radioButton} onPress={() => onPressHousingProblem(item)}>
                    {item.isSelected ? (
                      <Check style={{ marginTop: GlobalSize(4) }} />
                    ) : (
                      <Uncheck style={{ marginTop: GlobalSize(5) }} />
                    )}
                  </TouchableOpacity>
                  <View style={{ left: GlobalSize(10) }}>
                    <Text style={styles.textDesc}>{item?.Title}</Text>
                  </View>
                </View>
              )}
            />
          </View>
        ) : Heading === 2 ? (
          <View>
            <SDOHTextInputWithout
              Heading={Heading}
              Data={LivingData3}
              LivingAnswer3={LivingAnswer3}
              setLivingAnswer3={setLivingAnswer3}
              radioBtnValue={LivingValue}
              setRadioBtnValue={setLivingValue}
              filteredMappedData3={filteredMappedData3}
            />
          </View>
        ) : Heading === 0 ? (
          <View>
            <SDOHTextInputWithout
              Heading={Heading}
              Data={option}
              LivingAnswer1={LivingAnswer1}
              setLivingAnswer1={setLivingAnswer1}
              radioBtnValue={LivingAnswer1}
              setRadioBtnValue={setLivingAnswer1}
              filteredMappedData={filteredMappedData}
            />
          </View>
        ) : Heading === 3 ? (
          <View>
            <SDOHTextInputWithout
              Heading={Heading}
              Data={LivingData4}
              LivingAnswer4={LivingAnswer4}
              setLivingAnswer4={setLivingAnswer4}
              radioBtnValue={LivingAnswer1}
              setRadioBtnValue={setLivingAnswer1}
              filteredMappedData4={filteredMappedData4}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LivingSituation;

const styles = StyleSheet.create({
  imageStyle: {
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTHEIGHT * 0.38,
    borderRadius: GlobalSize(10)
  },
  imageView: {
    alignItems: 'center',
    marginRight:GlobalSize(10),
    marginBottom: GlobalSize(15)
  },
  textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    lineHeight: GlobalSize(20)
  },
  viewDesc: {
    marginLeft: GlobalSize(6),
    marginRight: GlobalSize(10),
    marginBottom: DEFAULTHEIGHT * 0.01
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: GlobalSize(8),
  }
});
