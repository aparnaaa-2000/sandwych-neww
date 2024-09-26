import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Platform, Image, ActivityIndicator } from 'react-native'
import { BACKGROUNDWHITE, BORDERCOLORNOT, LINECOLOR1, PLACEHOLDERCOLOR1, PLACEHOLDERCOLOR3, PRIMARYCOLOR, PUREBLACK, PUREWHITE  } from '../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH }  from '../../../Constants/styles/styles';
import ResourceHeader from '../../Common/Headers/ResourceHeader';
import { AVALONG, SALLYBROWN1  } from '../../../Constants/DummyImages';
import { BlueNotification, GreenTick, GreyAccount, GreyCalender, GreyClockLine, RedClose  } from '../../../../assets';
import { FONTS } from '../../../Constants/Fonts';
import NotificationModal from '../Modal/NotificationModal';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { GetNotificationList } from '../../../redux/thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import useNotification from '../../../hooks/fnhooks/useNotifications';


const NotificationList = ({ navigation }) => {
  const { notifications, loading, error } = useNotification();
  const [modalOpen, setModalOpen] = useState(false);

  // Handle the case where notifications might be undefined or null
  const data = notifications?.data || [];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // onPress={() => navigation.navigate('NotificationDetails')}
        style={[
          styles.cardView,
          {
            backgroundColor: item.is_read ? PUREWHITE : PUREWHITE,
            opacity: item.is_read ? 1 : 1
          },
          Platform.OS === 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow
        ]}
      >
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.roundIcon, Platform.OS !== 'android' && DEFAULTSTYLES.iosShadow]}>
            <BlueNotification width={20} height={20} />
          </View>
          <View style={{ maxWidth: GlobalSize(220), marginLeft: GlobalSize(15) }}>
            <Text style={[styles.textMsg, { marginBottom: GlobalSize(5) }]} numberOfLines={6}>
              {item.message}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.textMsg, { color: PLACEHOLDERCOLOR3 }]}>
            {moment(item.created_at).format('MM/DD/YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadContainer}>
          <ActivityIndicator size={30} color={PRIMARYCOLOR} />
        </View>
      ) : (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
          <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle='dark-content' />
          <View>
            <ResourceHeader navigation={navigation} title='Notification' />
            <View style={{ top: GlobalSize(-25) }}>
              <View style={styles.lineBorder} />
              <View style={DEFAULTSTYLES.alignView}>
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                />
              </View>
            </View>
          </View>
          {/* <NotificationModal modalOpen={modalOpen} setModalOpen={setModalOpen} /> */}
        </SafeAreaView>
      )}
    </>
  );
};


export default NotificationList

const styles = StyleSheet.create({
    loadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardView: {
        width: DEFAULTWIDTH * 0.90,
        backgroundColor: PUREWHITE,
        borderRadius: GlobalSize(5),
        marginBottom: GlobalSize(10),
        margin: GlobalSize(1),
        padding: GlobalSize(12),
        justifyContent: 'center'
    },
    textTitle: {
        fontSize: fontSize(15),
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR
    },
    roundIcon: {
        width: GlobalSize(40),
        height: GlobalSize(40),
        borderRadius: GlobalSize(20),
        backgroundColor:BACKGROUNDWHITE,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    textMsg: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: fontSize(12)
    },
    borderLine: {
        borderWidth: 1,
        borderColor: BORDERCOLORNOT,
        borderRadius: 8,
        padding: GlobalSize(8),
        marginLeft: DEFAULTWIDTH * 0.08,
        marginBottom: GlobalSize(10)
    },
    textPost: {
        color: PUREBLACK,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(10.5)
    },
    textDoc: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(15)
    },
    lineBorder: {
        backgroundColor: LINECOLOR1,
        height: GlobalSize(1),
        margin: DEFAULTWIDTH * 0.055,
        marginBottom: DEFAULTWIDTH * 0.06,
    },
    viewFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    imageView: {
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25)
    },
    viewSub: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: GlobalSize(5)
    },
    viewCal: {
        flexDirection: 'row',
        marginRight: GlobalSize(15),
        alignItems: 'center'
    }
})