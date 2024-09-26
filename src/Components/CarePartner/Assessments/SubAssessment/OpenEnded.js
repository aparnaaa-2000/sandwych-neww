import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  GREYBACKGROUND1,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLOR7,
  TEXTCOLOR8,
} from '../../../../Constants/Colors/Colors';

import { FONTS } from '../../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT PACKAGE
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const OpenEnded = ({
  navigation,
  Title,
  BigText,
  MainText,
  setBigText,
  setMainText,
  openEndQuestion,
  mappedData }) => {


  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }}
      />


        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: GlobalSize(80) }}>
          <View style={styles.container}>
            <View style={{ margin: DEFAULTWIDTH * 0.05 }}>
              <Text style={styles.mainHeader}>{Title}</Text>
            </View>

            {mappedData?.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.viewRow}>
                    <Text style={[styles.textMainD, { fontFamily: FONTS.FontMedium }]}>
                      {item?.id === 17 ? 'Main Diagnosis:' : 'Biggest Challenges'}
                      <Text
                        style={[styles.textMainD, { fontFamily: FONTS.FontRegular }]}>
                        {' '}
                        {item?.question}
                      </Text>
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.textIn,
                      { marginLeft: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(10) },
                    ]}>
                    {item?.id === 17 ?
                      <TextInput
                        placeholder="Enter a description..."
                        placeholderTextColor={TEXTCOLOR5}
                        value={MainText}
                        style={styles.textStyle}
                        multiline={true}
                        onChangeText={text => setMainText(text)}
                      /> :
                      <TextInput
                        placeholder="Enter a description..."
                        placeholderTextColor={TEXTCOLOR5}
                        value={BigText}
                        style={styles.textStyle}
                        multiline={true}
                        onChangeText={text => setBigText(text)}
                      />}
                  </View>
                </View>
              )
            })}

          </View>
     </KeyboardAwareScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    //alignItems:'center'
  },
  mainHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(26),
    color: TEXTCOLOR8,
  },
  textBack: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR5,
    top: GlobalSize(10),
  },
  buttonText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  buttonStyle: {
    borderRadius: GlobalSize(8),
    borderWidth: 1,
    margin: GlobalSize(5),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.29,
  },
  viewButton: {
    flexDirection: 'row',
    //  justifyContent: 'space-around',
    alignItems: 'center',
  },
  textMainD: {
    fontSize: fontSize(14),
    color: TEXTCOLOR7,
    lineHeight: GlobalSize(20),
  },
  textIn: {
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.35,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    backgroundColor: GREYBACKGROUND1,
  },
  textStyle: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
  },
  viewRelv: {
    position: 'absolute',
    bottom: GlobalSize(0),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: GlobalSize(8),
    backgroundColor: BACKGROUNDWHITE,
    paddingTop: GlobalSize(10),
    paddingBottom: 10
  },
  viewRow: {
    marginLeft: DEFAULTWIDTH * 0.05,
    marginBottom: GlobalSize(20),
    marginRight: GlobalSize(20)
  }
});

export default OpenEnded;
