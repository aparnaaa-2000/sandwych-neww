import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  BORDERCOLORSC1,
  PUREWHITE,
  TEXTCOLOR10,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import {
  ResourceIcon,
  DetailsIcon,
  EpicD,
  LenArrow,
} from '../../../../../assets';
import {DEFAULTWIDTH} from '../../../../Constants/styles/styles';

const EpicData = ({navigation}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View style={{marginBottom: DEFAULTWIDTH * 0.02}}>
        <TouchableOpacity>
          <View style={styles.viewDetails}>
            <TouchableOpacity
              style={styles.subView}
              onPress={() => {
                navigation.navigate('PatientDetails');
              }}>
              <View style={styles.viewBorder}>
                <DetailsIcon />
              </View>
              <Text style={styles.textDetails}>Details</Text>
            </TouchableOpacity>

            <View style={{marginRight: 15}}>
              <LenArrow />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginBottom: DEFAULTWIDTH * 0.15}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AvailableResource')}>
          <View style={styles.viewDetails}>
            <View style={styles.subView}>
              <ResourceIcon />
              <Text style={styles.textDetails}>Resources</Text>
            </View>

            <View style={{marginRight: 15}}>
              <LenArrow />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonT}>
        <EpicD />
        <View style={{marginLeft: 5}}>
          <Text style={styles.textEpic}>Epic data</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonT: {
    width: DEFAULTWIDTH * 0.55,
    height: DEFAULTWIDTH * 0.15,
    backgroundColor: '#FF9E1B',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: DEFAULTWIDTH * 0.05,
  },
  textEpic: {
    fontSize: 12,
    color: PUREWHITE,
    fontFamily: FONTS.FontBold,
  },
  textDetails: {
    fontFamily: FONTS.FontMedium,
    fontSize: 16,
    color: TEXTCOLOR10,
    marginLeft: 15,
  },
  viewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDERCOLORSC1,
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  viewBorder: {
    width: 18,
    height: 18,
    borderWidth: 2,
    alignItems: 'center',
    borderRadius: 2,
    justifyContent: 'center',
  },
});

export default EpicData;
