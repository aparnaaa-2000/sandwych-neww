import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { TEXTCOLOR10, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors';
import { Account, BlueCall, BlueEmail } from '../../../../../assets';

export default function CaseManagerDetails({data}) {
  return (
    <View>
      <View style={styles.centerView}>
        <View style={styles.iconLayout}>
          <Account />
        </View>

        <View style={{left: -18}}>
          <Text style={styles.textName}>Case Member</Text>
          <Text style={styles.textId}>ID: SYHCM002145</Text>
          <View style={styles.iconTextRow}>
            <BlueEmail width={15} height={15} />
            <Text style={[styles.textId, {marginLeft: 5}]}>
              casemanager@gmail.com
            </Text>
          </View>

          <View style={styles.iconTextRow}>
            <BlueCall width={15} height={15} />
            <Text style={[styles.textId, {marginLeft: 5}]}>+1 999 888 001</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textName: {
    color: TEXTCOLOR10,
    fontFamily: FONTS.FontMedium,
    fontSize: 20,
  },
  textId: {
    fontSize: 14,
    color: TEXTCOLOR5,
    fontFamily: FONTS.FontMedium,
    marginTop: DEFAULTHEIGHT * 0.001,
  },
  centerView: {
    flexDirection: 'row',
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLayout: {
    marginRight: DEFAULTWIDTH * 0.1,
    flexDirection: 'row',
    width: 100,
    height: 100,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DEFAULTHEIGHT * 0.002,
  },
});
