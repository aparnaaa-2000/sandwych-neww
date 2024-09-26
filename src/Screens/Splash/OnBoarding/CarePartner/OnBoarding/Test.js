import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {
  Chat,
  Home,
  Icon,
  Med,
  Team,
  Maps,
  Book,
  Calendar,
  Car,
  Cart,
  Doc,
  Exercise,
  Family,
  FoodBowl,
  Music,
  Massage,
  Rx,
  Sleep,
  SuitCase,
  Gym,
  TimeGrey,
  TvPlay,
  VaccumCleaner,
  WorldPeace,
  SettingsDot,
  SafeHands,
  Logo,
  RedFace,
  OrangeFace,
  YellowFace,
  GreenFace,
  DarkGreenFace,
  SadFace,
  GloomyFace,
  BalancedFace,
  PleasentFace,
  HappyFace,
} from '../../../../../../assets/svgImages';
import {
  BORDERCOLOR1,
  PRIMARYCOLOR,
  PUREWHITE,
  PRIMARYCOLOR,
} from '../../../../../Constants/Colors/Colors';

const Test = () => {
  return (
    <SafeAreaView
      style={{width: '100%', height: '100%', backgroundColor: BORDERCOLOR1}}>
      <View style={styles.headingView}>
        <Text style={styles.headingText}>SANDWYCH ICONS</Text>
      </View>
      <View style={styles.menuIconsStyle}>
        <Logo width={200} height={50} />
        <Icon width={50} height={50} />
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>BOTTOM TAB ICONS</Text>
        </View>
        <View style={styles.menuIconsStyle}>
          <Chat width={50} height={50} />
          <Home width={50} height={50} />
          <Med width={50} height={50} />
          <Team width={50} height={50} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>ADL ICONS</Text>
        </View>

        <View>
          <View style={styles.menuIconsStyle}>
            {/* <Maps width={50} height={50} /> */}
            <Book width={50} height={50} />
            <Calendar width={50} height={50} />
            <Car width={50} height={50} />
            <Cart width={50} height={50} />
          </View>
          <View style={styles.menuIconsStyle}>
            <Doc width={50} height={50} />
            <Exercise width={50} height={50} />
            <Family width={50} height={50} />
            <Gym width={50} height={50} />
            <FoodBowl width={50} height={50} />
          </View>
          <View style={styles.menuIconsStyle}>
            <Music width={50} height={50} />
            <Massage width={50} height={50} />
            <TimeGrey width={50} height={50} />
            <Sleep width={50} height={50} />
            <SuitCase width={50} height={50} />
          </View>
          <View style={styles.menuIconsStyle}>
            <TvPlay width={50} height={50} />
            <Rx width={50} height={50} />
            <VaccumCleaner width={50} height={50} />
            {/* <SuitCase width={50} height={50} /> */}
          </View>
        </View>

        <View style={styles.headingView}>
          <Text style={styles.headingText}>MENU ICONS</Text>
        </View>
        <View style={styles.menuIconsStyle}>
          <WorldPeace width={50} height={50} />
          <SettingsDot width={50} height={50} />
          <Maps width={50} height={50} />
          <SafeHands width={50} height={50} />
          {/* <SuitCase width={50} height={50} /> */}
        </View>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>MOOD SELECTOR FACE</Text>
        </View>
        <View style={styles.menuIconsStyle}>
          <DarkGreenFace width={50} height={50} />
          <GreenFace width={50} height={50} />
          <YellowFace width={50} height={50} />
          <OrangeFace width={50} height={50} />
          <RedFace width={50} height={50} />
        </View>

        <View style={styles.headingView}>
          <Text style={styles.headingText}>MOOD FACE</Text>
        </View>
        <View style={styles.menuIconsStyle}>
          <HappyFace width={50} height={50} />
          <PleasentFace width={50} height={50} />
          <BalancedFace width={50} height={50} />
          <GloomyFace width={50} height={50} />
          <SadFace width={50} height={50} />
        </View>

        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  menuIconsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    backgroundColor: PUREWHITE,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PRIMARYCOLOR,
  },
  headingText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: '900',
    color: PRIMARYCOLOR,
    fontFamily: 'Inter-ExtraBold',
  },
  headingView: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: PUREWHITE,
  },
});

export default Test;
