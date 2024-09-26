import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {
  DEFAULTWIDTH,
} from '../../../../../Constants/styles/styles';
import {
  BACKGROUNDCOLORH,
  BACKGROUNDCOLORM,
  BACKGROUNDWHITE,
  BORDERCOLORH,
  BORDERCOLORM,
  FOURTHCOLOR,
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLORH,
} from '../../../../../Constants/Colors/Colors';
import BackHeaderComponent from '../../../../../Components/Common/Headers/BackHeaderComponent';
import {GlobalSize, fontSize} from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../../../Constants/Fonts';

import assets from '../../../../../../assets'

const SDOHList = ({navigation}) => {

  const SDOHData = [
    {
      id: 1,
      image: require('../../../../../../assets/Images/SDOH1.png'),
      Title: 'Economic Stability',
      RiskStatus: 'High Risk',
      borderColor: BORDERCOLORH,
      backgroundColor: BACKGROUNDCOLORH,
      TextColor: TEXTCOLORH,
    },
    {
      id: 2,
      image: require('../../../../../../assets/Images/SDOH2.png'),
      Title: 'Neighbourhood',
      RiskStatus: 'Medium Risk',
      borderColor: BORDERCOLORM,
      backgroundColor: BACKGROUNDCOLORM,
      TextColor: FOURTHCOLOR,
    },
  ];


  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.mainCard,
          Platform.OS == 'android'
            ? DEFAULTSTYLES.androidShadow
            : DEFAULTSTYLES.iosShadow,
        ]}>
        <Image
          source={item.image}
          style={{width: GlobalSize(50), height: GlobalSize(40)}}
          resizeMode="contain"
        />

        <Text style={styles.textTitle}>{item.Title}</Text>

        <View
          style={[
            styles.cardRisk,
            {
              marginTop: item.paddingTop,
            },
            {
              borderColor: item.borderColor,
              backgroundColor: item.backgroundColor,
            },
          ]}>
          <Text style={[styles.txtRisk, {color: item.TextColor}]}>
            {item.RiskStatus}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />
      <View style={{flex: 1}}>
        <BackHeaderComponent navigation={navigation} />

        <View>
          <FlatList
            data={SDOHData}
            keyExtractor={item => item.id}
            numColumns={2}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  textSDOH: {
    fontSize: fontSize(15),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR7,
  },
  mainCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: DEFAULTWIDTH * 0.425,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(15),
    paddingTop: GlobalSize(18),
    paddingBottom: GlobalSize(18),
    marginBottom: GlobalSize(10),
    margin: GlobalSize(8),
  },
  textTitle: {
    color: TEXTCOLOR7,
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(13),
    textAlign: 'center',
    padding: GlobalSize(5),
  },
  cardRisk: {
    padding: GlobalSize(5),
    paddingLeft: GlobalSize(15),
    paddingRight: GlobalSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginTop: GlobalSize(5),
    borderRadius: GlobalSize(20),
  },
  txtRisk: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(12),
  },
  titleView: {
    justifyContent: 'space-between',
    marginRight: GlobalSize(20),
    flexDirection: 'row',
    margin: GlobalSize(10),
    marginLeft: GlobalSize(20),
  },
});

export default SDOHList;
