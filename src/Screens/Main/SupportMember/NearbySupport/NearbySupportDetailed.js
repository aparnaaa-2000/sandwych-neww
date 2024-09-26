import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import DEFAULTSTYLES, {
  DEFAULTWIDTH,
  DEFAULTHEIGHT,
} from '../../../../Constants/styles/styles';
import {
  BACKGROUNDWHITE1,
  GREYICONBACKGROUND,
  PLACEHOLDERCOLOR1,
  PRIMARYCOLOR,
  PUREWHITE,
  SUBPRIMARY,
  TEXTCOLOR10,
  TEXTCOLOR7,
  TEXTCOLORW,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import {
  BlueCall,
  BlueEmail,
  BlueLocation,
  CalendarBlack,
  ClockLine,
  PersonSpeak,
  Zipcode,
  TransportMobility,
} from '../../../../../assets';
import RequestModal from '../../../../Components/Common/Modal/RequestModal';
import {useRoute} from '@react-navigation/native';

const NearbySupportDetailed = ({navigation}) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const route = useRoute();
  const {detail} = route?.params; // Assuming 'detail' contains the API data


  const {
    supportRequestDetails: {
      requestedUser,
      requestedUserEmail,
      requestedUserNumber,
      address,
      zipcode,
      requestedUserLanguages,
      scheduled_date,
      scheduled_time,
    } = {},
  } = detail || {};

 

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle="dark-content"
        style={{flex: 0}}
      />
      <View style={{flex: 1}}>
        {/* Header */}
        <View style={styles.headerLayer}>
          {imageUri ? (
            <Image
              source={{uri: imageUri}}
              style={{
                height: DEFAULTWIDTH * 0.9,
                width: DEFAULTWIDTH * 0.9,
              }}
              resizeMode="contain"
            />
          ) : (
            <TransportMobility
              height={DEFAULTWIDTH * 0.9}
              width={DEFAULTWIDTH * 0.9}
            />
          )}
        </View>

        {/* Middle Layer */}
        <ScrollView style={styles.scrollLayout}>
          <View
            style={[
              styles.timeLayer,
              Platform.OS === 'ios'
                ? DEFAULTSTYLES.iosShadow
                : DEFAULTSTYLES.androidShadow,
            ]}>
            <View style={styles.rowIconTextLayer}>
              <ClockLine width={22} height={22} />
              <Text
                style={{color: PLACEHOLDERCOLOR1, fontFamily: FONTS.FontSemiB}}>
                {nearData.supportRequestDetails.scheduled_time}
              </Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <CalendarBlack width={22} height={22} />
              <Text
                style={{color: PLACEHOLDERCOLOR1, fontFamily: FONTS.FontSemiB}}>
                {nearData.supportRequestDetails.scheduled_date ||
                  '21 August 2024'}{' '}
                {/* Adjust as needed */}
              </Text>
            </View>
          </View>

          <Text style={styles.userName}>
            {nearData.supportRequestDetails.requestedUser || 'Andrew Symonds'}
          </Text>

          <View
            style={[
              styles.middleLayerCard,
              Platform.OS === 'ios'
                ? DEFAULTSTYLES.iosShadow
                : DEFAULTSTYLES.androidShadow,
            ]}>
            <View style={styles.rowIconTextLayer}>
              <BlueCall width={20} height={20} />
              <Text style={styles.iconText}>
                {nearData.supportRequestDetails.requestedUserNumber ||
                  '+1 9879899891'}
              </Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <BlueEmail width={20} height={20} />
              <Text style={styles.iconText}>
                {nearData.supportRequestDetails.requestedUserEmail ||
                  'andrew@gmail.com'}
              </Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <BlueLocation width={20} height={20} />
              <Text style={styles.iconText}>
                {nearData.supportRequestDetails.address || 'Washington DC'}
              </Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <Zipcode width={20} height={20} />
              <Text style={styles.iconText}>
                {nearData.supportRequestDetails.zipcode || '182309'}
              </Text>
            </View>

            <View style={styles.rowIconTextLayer}>
              <PersonSpeak width={20} height={20} />
              <Text style={styles.iconText}>
                {nearData.supportRequestDetails.requestedUserLanguages ||
                  'English, Spanish'}
              </Text>
            </View>
          </View>

          <Text style={styles.titleText}>
            {nearData.supportRequestDetails.support}
          </Text>

          <Text style={styles.descriptionText}>{nearData.supportRequestDetails.note}</Text>
        </ScrollView>

        {/* Footer */}
        <View style={styles.bottomLayer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.buttonView, {backgroundColor: PUREWHITE}]}>
            <Text style={[styles.buttonText, {color: TEXTCOLOR10}]}>
              CANCEL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalOpen(true)}
            style={[styles.buttonView, {backgroundColor: PRIMARYCOLOR}]}>
            <Text style={[styles.buttonText, {color: PUREWHITE}]}>REQUEST</Text>
          </TouchableOpacity>
        </View>

        <RequestModal
          ModalOpen={modalOpen}
          title={'Are you sure you want to Request?'}
          setModalOpen={setModalOpen}
          navigation={navigation}
        />
      </View>

      {/* Middle Layer */}
      <ScrollView style={styles.scrollLayout}>
        <View
          style={[
            styles.timeLayer,
            Platform.OS === 'ios'
              ? DEFAULTSTYLES.iosShadow
              : DEFAULTSTYLES.androidShadow,
          ]}>
          <View style={styles.rowIconTextLayer}>
            <ClockLine width={22} height={22} />
            <Text
              style={{color: PLACEHOLDERCOLOR1, fontFamily: FONTS.FontSemiB}}>
              {'  '}
              {scheduled_time || 'N/A'}
            </Text>
          </View>

          <View style={styles.rowIconTextLayer}>
            <CalendarBlack width={22} height={22} />
            <Text
              style={{color: PLACEHOLDERCOLOR1, fontFamily: FONTS.FontSemiB}}>
              {'  '}
              {scheduled_date || 'N/A'}
            </Text>
          </View>
        </View>

        <Text style={styles.userName}>{requestedUser || 'Unknown User'}</Text>

        <View
          style={[
            styles.middleLayerCard,
            Platform.OS === 'ios'
              ? DEFAULTSTYLES.iosShadow
              : DEFAULTSTYLES.androidShadow,
          ]}>
          <View style={styles.rowIconTextLayer}>
            <BlueCall width={20} height={20} />
            <Text style={styles.iconText}>{requestedUserNumber || 'N/A'}</Text>
          </View>

          <View style={styles.rowIconTextLayer}>
            <BlueEmail width={20} height={20} />
            <Text style={styles.iconText}>{requestedUserEmail || 'N/A'}</Text>
          </View>

          <View style={styles.rowIconTextLayer}>
            <BlueLocation width={22} height={22} />
            <Text style={styles.iconText}>{address || 'Unknown'}</Text>
          </View>
          <View style={styles.rowIconTextLayer}>
            <Zipcode width={20} height={20} />
            <Text style={styles.iconText}>{zipcode || 'N/A'}</Text>
          </View>

          <View style={styles.rowIconTextLayer}>
            <PersonSpeak width={20} height={20} />
            <Text style={styles.iconText}>
              {requestedUserLanguages
                ? requestedUserLanguages.join(', ')
                : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Middle Layer 2 */}
        <Text style={styles.titleText}>Transfer & Mobility</Text>

        <Text style={styles.descriptionText}>Please help</Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.bottomLayer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.buttonView, {backgroundColor: PUREWHITE}]}>
          <Text style={[styles.buttonText, {color: TEXTCOLOR10}]}>CANCEL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setModalOpen(true)}
          style={[styles.buttonView, {backgroundColor: PRIMARYCOLOR}]}>
          <Text style={[styles.buttonText, {color: PUREWHITE}]}>REQUEST</Text>
        </TouchableOpacity>
      </View>

      <RequestModal
        ModalOpen={ModalOpen}
        title={'Are you sure you want to Request?'}
        setModalOpen={setModalOpen}
        navigation={navigation}
        rejected_request_id={detail?.id}
      />
    </SafeAreaView>
  
  );
};

const styles = new StyleSheet.create({
  headerLayer: {
    backgroundColor: SUBPRIMARY,
    height: DEFAULTHEIGHT * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollLayout: {
    backgroundColor: BACKGROUNDWHITE1,
    paddingVertical: DEFAULTHEIGHT * 0.02,
  },
  middleLayerCard: {
    backgroundColor: PUREWHITE,
    margin: DEFAULTWIDTH * 0.02,
    padding: DEFAULTWIDTH * 0.03,
    width: DEFAULTWIDTH * 0.95,
    borderRadius: 20,
  },
  userName: {
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    fontSize: 25,
    marginTop: DEFAULTHEIGHT * 0.02,
    marginLeft: DEFAULTWIDTH * 0.02,
  },
  timeLayer: {
    flexDirection: 'row',
    backgroundColor: GREYICONBACKGROUND,
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    paddingHorizontal: DEFAULTWIDTH * 0.02,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  rowIconTextLayer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
  },
  iconText: {
    color: TEXTCOLORW,
    fontFamily: FONTS.FontSemiB,
    marginLeft: DEFAULTWIDTH * 0.02,
  },
  titleText: {
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR7,
    fontSize: 25,
    margin: DEFAULTWIDTH * 0.02,
  },
  descriptionText: {
    fontFamily: FONTS.FontLight,
    color: TEXTCOLOR7,
    fontSize: 16,
    marginHorizontal: DEFAULTWIDTH * 0.05,
    marginBottom: 100,
  },
  bottomLayer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20,
    width: DEFAULTWIDTH,
  },
  buttonView: {
    width: DEFAULTWIDTH * 0.4,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: 14,
  },
});

export default NearbySupportDetailed;
