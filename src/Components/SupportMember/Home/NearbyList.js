import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR13,
  TEXTCOLOR15,
} from '../../../Constants/Colors/Colors';
import {Maps} from '../../../../assets';
import {FONTS} from '../../../Constants/Fonts';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const NearbyList = ({nearby,index,}) => {

  const SVG = nearby.SVG
  return (
    <Card style={[styles.mainContainer,{
      marginRight: GlobalSize(10),
    },]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.personName}>{nearby.name}</Text>
          <Text style={styles.personRole}>{nearby.role}</Text>
        </View>
        <TouchableOpacity>
          <Maps />
        </TouchableOpacity>
      </View>

      {/* Middle */}
      <View style={styles.middleRow}>
        <View style={styles.iconLayout}>
          {/* <SVG /> */}
        </View>
        <View style={styles.headingLayout}>
          <Text numberOfLines={3} style={styles.headingStyle}>
            {nearby.title}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footerLayout}>
        <Text style={styles.personName}>{nearby.date}</Text>
        <Text style={styles.personName}>{nearby.time}</Text>
      </View>
    </Card>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    width: DEFAULTWIDTH * 0.7,
    backgroundColor: PUREWHITE,
    height: 180,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: DEFAULTWIDTH * 0.02,
  },
  personName: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR10,
  },
  personRole: {
    fontSize: 10,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR13,
  },
  headingStyle: {
    fontFamily: FONTS.FontRegular,
    fontSize: 20,
    width: 100,
    color: TEXTCOLOR15,
  },
  middleRow: {
    flexDirection: 'row',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  iconLayout: {
    width: 120,
    height: 100,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 10,
  },
  headingLayout: {marginLeft: DEFAULTWIDTH * 0.01, alignSelf: 'center'},
  footerLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.02,
  },
});

export default NearbyList;
