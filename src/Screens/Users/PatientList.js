import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

//SVG ICONS
import {BellIcon, Search} from '../../../assets';

// COLORS IMPORTED GLOBALLY
import {
  BACKGROUNDWHITE,
  BELLCOLOR,
  LINECOLOR1,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR5,
} from '../../Constants/Colors/Colors';
import {FONTS} from '../../Constants/Fonts';

//DUMMY IMAGES
import {
  ADR,
  AVALONG,
  BETTYSMITHPROFILE,
  SALLYBROWN1,
  SALLYBROWN2,
} from '../../Constants/DummyImages';
import { DEFAULTWIDTH } from '../../Constants/styles/styles';

const PatientList = ({navigation}) => {
  const Data = [
    {
      id: 1,
      Name: 'Betty Smith',
      image: BETTYSMITHPROFILE,
      Email: 'bettysmith@gmail.com',
      Status: true,
    },
    {
      id: 2,
      Name: 'Ava Long',
      image: AVALONG,
      Email: 'avalong@gmail.com',
      Status: true,
    },
    {
      id: 3,
      Name: 'Adriene Williamson',
      image: ADR,
      Email: 'adrienewilliamson@gmail.com',
      Status: false,
    },
    {
      id: 4,
      Name: 'Joanne Allen',
      image: SALLYBROWN1,
      Email: 'joanneallen@gmail.com',
      Status: false,
    },
    {
      id: 5,
      Name: 'Sally Brown',
      image: SALLYBROWN2,
      Email: 'sallybrown@gmail.com',
      Status: false,
    },
    {
      id: 6,
      Name: 'Mae Craig',
      image: BETTYSMITHPROFILE,
      Email: 'marcraig@gmail.com',
      Status: false,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('CaseManagerLanding')}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: item.image}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />

            {item?.Status ? (
              <View style={[styles.iconNum, {left: -10}]}>
                <Text style={styles.textNum}>2</Text>
              </View>
            ) : null}
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginLeft: item?.Status == true ? 1 : 15,
            }}>
            <Text style={styles.textNm}>{item.Name}</Text>
            <Text style={styles.textEm}>{item.Email}</Text>
          </View>
        </View>
        <View style={styles.lineIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />
      <View style={styles.container}>
        <View style={styles.viewRow}>
          <View>
            <Text style={styles.textCare}>Patients</Text>
          </View>

          <View style={{flexDirection: 'row', marginTop: 14}}>
            <View>
              <Search />
            </View>

            <View
              style={{marginLeft:DEFAULTWIDTH * 0.08, flexDirection: 'row'}}>
              <BellIcon />
              <View style={styles.iconNum}>
                <Text style={styles.textNum}>2</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.lineIcon} />

        <View style={{flex: 1}}>
          <FlatList
            data={Data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    padding: 20,
  },
  viewRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: DEFAULTWIDTH * 0.05,
  },
  textCare: {
    color: PUREBLACK,
    fontSize: 30,
    fontFamily: FONTS.FontSemiB,
  },
  lineIcon: {
    height: 1.3,
    width: DEFAULTWIDTH * 0.89,
    backgroundColor: LINECOLOR1,
    marginBottom: DEFAULTWIDTH * 0.05,
    marginTop: 10,
  },
  textNm: {
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
  },
  textEm: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
  },
  line2: {
    width: DEFAULTWIDTH * 0.88,
    height: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LINECOLOR1,
    marginTop: 8,
    marginBottom: 15,
  },
  iconNum: {
    backgroundColor: BELLCOLOR,
    width: 14,
    height: 14,
    borderRadius: 7,
    left: -6,
    top: -1,
    borderColor: PUREWHITE,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textNum: {
    fontSize: 7,
    color: PUREWHITE,
    fontFamily: FONTS.FontSemiB,
  },
});

export default PatientList;
