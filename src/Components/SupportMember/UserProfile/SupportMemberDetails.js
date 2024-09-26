import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TEXTCOLOR10, TEXTCOLOR5} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {Account, BlueCall, BlueEmail} from '../../../../assets';
import {moderateScale} from 'react-native-size-matters';
import {useEffect} from 'react';

export default function SupportMemberDetails({data}) {
  // Add checks for data and data.user
  if (!data || !data.user) {
    return (
      <View style={styles.centerView}>
        <Text style={styles.textName}>No user data available</Text>
      </View>
    );
  }

  const formatText = text => {
    const maxLength = 25; // Maximum length including ellipsis
    if (!text) {
      return ' '.repeat(maxLength); // Return a string of spaces if text is empty
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...'; // Truncate and add ellipsis
    }
    return text.padEnd(maxLength, ' '); // Pad with spaces if text is shorter than maxLength
  };

  useEffect(() => {
    console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK', data.user);
  }, []);

  return (
    <View>
      <View style={styles.centerView}>
        <View style={styles.iconLayout}>
          {data?.user?.picture != null ? (
            <Image
              style={styles.ImageRound}
              source={{uri: data?.user?.picture}}
            />
          ) : (
            <Account />
          )}
        </View>

        <View style={{left: -18}}>
          <Text style={styles.textName}>{data.user.name}</Text>
          <Text style={styles.textId}>ID: {data.user.id}</Text>
          <View style={styles.iconTextRow}>
            <BlueEmail width={15} height={15} />
            <Text style={[styles.textId, {marginLeft: 5}]}>
              {formatText(data.user.email)}
            </Text>
          </View>

          <View style={styles.iconTextRow}>
            <BlueCall width={15} height={15} />
            <Text style={[styles.textId, {marginLeft: 5}]}>
              +1 {data.user.phonenumber}
            </Text>
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
    fontSize: moderateScale(19),
  },
  textId: {
    fontSize: moderateScale(13),
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
  ImageRound: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(100),
    elevation:moderateScale(3)
  },
});
