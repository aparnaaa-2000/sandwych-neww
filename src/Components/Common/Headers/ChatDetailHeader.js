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
import { SafeAreaView } from 'react-native-safe-area-context';

import { FONTS } from '../../../Constants/Fonts';
import { Emoji, BlueBackArrow, BlueCallIcon, BlueMoreIcon } from '../../../../assets';
import {
  BACKGROUNDWHITE,
  LINECOLOR1,
  TEXTCOLOR11,
  TEXTCOLOR13,
} from '../../../Constants/Colors/Colors';
import ChatMenuModal from '../../Chat/ChatDetails/ChatMenuModal';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const ChatDetailHeader = ({ name, navigation, ModalOpen, setModalOpen, groupMembers,teamRole ,phoneNumber}) => {
 // const phoneNumber = '8089671298'; // will be recieved from the api

  console.log("groupMembers.........................", groupMembers)
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
        style={{ flex: 0 }}
      />

      <View style={styles.headerView}>
        <View style={{ top: GlobalSize(2) }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: GlobalSize(5),top:GlobalSize(-6) }}>
            <BlueBackArrow />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', top: GlobalSize(-5) }}>
          <Text style={styles.nameText}>{name}</Text>

          {groupMembers?.length > 0 &&
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {groupMembers?.map((item) => {
                return (
                  <Text style={styles.textHtp}>{item?.name}</Text>
                )
              })}
            </ScrollView>}

            {/* {teamRole &&
                      <Text style={styles.textHtp}>{teamRole}</Text>} */}
        </View>

        <View style={{ paddingRight: GlobalSize(10), flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ left: GlobalSize(-15), top: GlobalSize(-6) }}
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
    color: TEXTCOLOR11,
    fontWeight: '600',
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(17),
  },
  textHtp: {
    fontSize: fontSize(14),
    fontWeight: '400',
    color: TEXTCOLOR13,
    fontFamily: FONTS.FontRegular,
    padding: GlobalSize(5)
  },
  border: {
    borderWidth: 0.5,
    borderColor: LINECOLOR1,
    width: DEFAULTWIDTH,
  },
});

export default ChatDetailHeader;
