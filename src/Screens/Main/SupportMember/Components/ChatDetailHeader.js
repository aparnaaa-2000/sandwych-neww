import React from 'react';
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
idth = Dimensions.get('window').width;
import {FONTS} from '../../../../Constants/Fonts';
// import { Emoji, BlueBackArrow, BlueCallIcon, BlueMoreIcon } from '../../../../assets';
import {
  Emoji,
  BlueBackArrow,
  BlueCallIcon,
  BlueMoreIcon,
} from '../../../../../assets';

import {
  BACKGROUNDWHITE,
  LINECOLOR1,
  TEXTCOLOR11,
  TEXTCOLOR13,
  TEXTCOLOR19,
} from '../../../../Constants/Colors/Colors';
import ChatMenuModal from '../../../../Components/Chat/ChatDetails/ChatMenuModal';
import {DEFAULTWIDTH} from '../../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import {moderateScale} from 'react-native-size-matters';

const ChatDetailHeader = ({
  name,
  navigation,
  ModalOpen,
  setModalOpen,
  groupMembers,
  teamRole,
  phoneNumber,
  location,
}) => {
  // const phoneNumber = '8089671298'; // will be recieved from the api

  console.log('groupMembers.........................', groupMembers);
  const openDialer = () => {
    if (Platform.OS === 'android') {
      // Android-specific code
      Linking.openURL(`tel:${phoneNumber}`)
        .then(result => {
          if (result) {
            console.log(
              `Dialer opened successfully for number: ${phoneNumber}`,
            );
          } else {
            console.error('Failed to open dialer.');
          }
        })
        .catch(error => {
          console.error(`Error opening dialer: ${error}`);
        });
    } else if (Platform.OS === 'ios') {
      // iOS-specific code
      Linking.openURL(`telprompt:${phoneNumber}`)
        .then(result => {
          if (result) {
            console.log(
              `Dialer opened successfully for number: ${phoneNumber}`,
            );
          } else {
            console.error('Failed to open dialer.');
          }
        })
        .catch(error => {
          console.error(`Error opening dialer: ${error}`);
        });
    }
  };

  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />

      <View style={styles.headerView}>
        <View style={{top: moderateScale(-4)}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{marginLeft: GlobalSize(5)}}>
            <BlueBackArrow />
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', top: GlobalSize(-5)}}>
          {/* <Text style={styles.nameText}>{name}</Text> */}

          <View style={styles.CenterContainer}>
            <Text style={styles.TextStyle}>{name}</Text>

            <Text style={styles.BottomText}>{location}</Text>
          </View>

          {groupMembers?.length > 0 && (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {groupMembers?.map(item => {
                return <Text style={styles.textHtp}>{item?.name}</Text>;
              })}
            </ScrollView>
          )}

          {teamRole && <Text style={styles.textHtp}>{teamRole}</Text>}
        </View>

        <View style={{paddingRight: GlobalSize(10), flexDirection: 'row'}}>
          <TouchableOpacity
            style={{left: moderateScale(4), top: moderateScale(-5)}}
            onPress={() => openDialer()}>
            <BlueCallIcon />
          </TouchableOpacity>
          {/* 
          <TouchableOpacity
            style={{marginTop:GlobalSize(2)}}
            onPress={() => setModalOpen(!ModalOpen)}>
           <BlueMoreIcon/>
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.border} />

      <ChatMenuModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: DEFAULTWIDTH,
    backgroundColor: BACKGROUNDWHITE,
    paddingBottom: GlobalSize(5),
    paddingLeft: GlobalSize(10),
    paddingRight: GlobalSize(10),
    paddingTop: DEFAULTWIDTH * 0.08,
    fontWeight: '700',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameText: {
    color: TEXTCOLOR19,
    fontWeight: '600',
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(17),
  },
  textHtp: {
    fontSize: fontSize(14),
    fontWeight: '400',
    color: TEXTCOLOR13,
    fontFamily: FONTS.FontRegular,
    padding: GlobalSize(5),
  },
  border: {
    borderWidth: 0.5,
    borderColor: LINECOLOR1,
    width: DEFAULTWIDTH,
  },
  CenterContainer: {
    width: moderateScale(200),
    height: moderateScale(40),
    marginRight: moderateScale(65),
  },
  TextStyle: {
    color: TEXTCOLOR19,
    fontSize: moderateScale(13),
    fontWeight: '300',
    fontStyle: 'italic',
  },
  BottomText: {
    color: '#8A8E9C',
    fontSize: moderateScale(10),
    fontWeight: '500',
    top:moderateScale(2)
  },
});

export default ChatDetailHeader;
