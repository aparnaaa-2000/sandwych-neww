import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../Constants/styles/styles';
import {
  BlueCall,
  BlueCode,
  BlueEmail,
  BlueLocation,
  Man,
  OrangePen,
  GenderIcon,
} from '../../../../assets';
import {
  PUREWHITE,
  TEXTCOLOR7,
  TEXTCOLORW,
} from '../../../Constants/Colors/Colors';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../Constants/Fonts';

const About = ({Title, Phone, Edit, Gender, DOB, data = {}, navigation}) => {
  const user = data.user || {};
  const userLanguages = data.user_languages || [];
  const userZipcode = user.user_zipcode || {}; // Destructure user_zipcode
  const zipcode = userZipcode.zipcode; // Extract zipcode

  return (
    <View
      style={[
        styles.cardAbout,
        Platform.OS === 'android'
          ? DEFAULTSTYLES.androidShadow
          : DEFAULTSTYLES.iosShadow,
      ]}>
      <View style={styles.flexRow}>
        <View></View>

        <View>
          <Text style={styles.textAbout}>{Title}</Text>
        </View>

        <View>
          {Edit && (
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <OrangePen />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {user.dob && (
        <View style={styles.subView}>
          <View style={styles.iconLayout}>
            {/* Change Icon to Date or calendar */}
            <BlueLocation width={18} height={18} />
          </View>
          <Text style={styles.textDs}>{user.dob}</Text>
        </View>
      )}

      <View>
        {user.phonenumber && (
          <View style={styles.subView}>
            <View style={styles.iconLayout}>
              <BlueCall width={18} height={18} />
            </View>
            <Text style={styles.textDs}>{user.phonenumber}</Text>
          </View>
        )}

        {user.email && (
          <View style={styles.subView}>
            <View style={styles.iconLayout}>
              <BlueEmail width={18} height={18} />
            </View>
            <Text style={styles.textDs}>{user.email}</Text>
          </View>
        )}

        {user.address && (
          <View style={styles.subView}>
            <View style={styles.iconLayout}>
              <BlueLocation width={18} height={18} />
            </View>
            <Text style={styles.textDs}>{user.address}</Text>
          </View>
        )}

        {zipcode && (
          <View style={styles.subView}>
            <View style={styles.iconLayout}>
              <BlueCode width={18} height={18} />
            </View>
            <Text style={styles.textDs}>{zipcode}</Text>
          </View>
        )}

        <View style={styles.viewLan}>
          <View style={styles.iconLayout}>
            <Man width={18} height={18} />
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {userLanguages.map(lang => (
              <Text key={lang.id} style={styles.textDs}>
                {lang.language.length > 10
                  ? `${lang.language.substring(0, 10)}...`
                  : lang.language}
              </Text>
            ))}
          </View>
        </View>

        {user.gender !== null && (
          <View style={styles.subView}>
            <View style={styles.iconLayout}>
              <GenderIcon width={22} height={22} />
            </View>
            <Text style={styles.textDs}>{Gender}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardAbout: {
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.9,
    borderRadius: GlobalSize(15),
    padding: GlobalSize(15),
    marginHorizontal: DEFAULTWIDTH * 0.05,
  },
  textAbout: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR7,
  },
  textDs: {
    fontSize: fontSize(14),
    color: TEXTCOLORW,
    fontFamily: FONTS.FontRegular,
    paddingLeft: GlobalSize(10),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DEFAULTHEIGHT * 0.02,
    marginRight: GlobalSize(5),
    alignItems: 'center',
  },
  subView: {
    flexDirection: 'row',
    marginBottom: DEFAULTHEIGHT * 0.02,
    alignItems: 'center',
  },
  viewLan: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: GlobalSize(15),
  },
  iconLayout: {
    width: 24,
    height: 24,
    marginRight: DEFAULTWIDTH * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default About;
