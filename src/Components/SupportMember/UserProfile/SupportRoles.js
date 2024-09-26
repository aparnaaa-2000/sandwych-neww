import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  MEDSITEMCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
} from '../../../Constants/Colors/Colors';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../Constants/Fonts';

const SupportRoles = ({role}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.iconLayout}>
          <Image
            source={{uri: role?.support_image}}
            style={{width: 90, height: 90}}
          />
          <View style={styles.roleTypeOverlay}>
            <Text style={{color: PUREWHITE}}>{role.support}</Text>
          </View>
        </View>
        <View style={{width: DEFAULTWIDTH * 0.6, margin: GlobalSize(10)}}>
          <Text style={styles.roleText}>{role.support}</Text>
          {role.functional_abilities === 0 ? (
            <Text style={styles.roleDescText}>ADL</Text>
          ) : (
            <Text style={styles.roleDescText}>IADL</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: PRIMARYCOLOR,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTHEIGHT * 0.008,
    borderRadius: 20,
  },
  iconLayout: {
    backgroundColor: MEDSITEMCOLOR2,
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: GlobalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleText: {
    fontFamily: FONTS.FontMedium,
    color: PUREWHITE,
    alignSelf: 'center',
    fontSize: fontSize(14),
  },
  roleDescText: {
    fontFamily: FONTS.FontLight,
    color: PUREWHITE,
    alignSelf: 'center',
    marginTop: DEFAULTHEIGHT * 0.015,
    fontSize: fontSize(11),
  },
  roleTypeOverlay: {
    position: 'absolute',
    top: 0,
    backgroundColor: PRIMARYCOLOR,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: DEFAULTWIDTH * 0.01,
    paddingBottom: DEFAULTWIDTH * 0.006,
  },
});

export default SupportRoles;
