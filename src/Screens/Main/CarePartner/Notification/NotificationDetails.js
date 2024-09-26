import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import NotificationModal from '../../../../Components/CarePartner/Notification/NotificationModal'
import { BACKGROUNDNOT, BACKGROUNDWHITE, LINECOLOR1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLORNOT } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import { AVALONG } from '../../../../Constants/DummyImages'
import { FONTS } from '../../../../Constants/Fonts'
import { GreenTick, GreyCalender, GreyClockLine, RedClose, WhiteArrow } from '../../../../../assets'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

const NotificationDetails = ({ navigation }) => {

  const [ModalOpen, setModalOpen] = useState(false)
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <ResourceHeader
            navigation={navigation}
            title={'Notification'} />

          <View style={styles.lineBorder} />

          <View style={styles.viewDetail}>
            <View>
              <Image source={{ uri: AVALONG }}
                style={styles.imageStyle} />
            </View>

            <View style={{ marginLeft: DEFAULTWIDTH * 0.04 }}>
              <Text style={styles.textDr}>Dr.Ava Lounge</Text>
              <Text style={styles.textPost}>Physiotherapist</Text>
            </View>
          </View>


          <View style={styles.timeView}>
            <View style={styles.viewCal}>
              <GreyCalender />
              <Text style={[styles.textPost, { left: GlobalSize(5) }]}>25 th Jan 2024</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <GreyClockLine />
              <Text style={[styles.textPost, { left: GlobalSize(5) }]}>05:00 pm - 05:30 pm</Text>
            </View>
          </View>

          <View style={styles.lineBorder} />

          <View style={{ marginLeft: DEFAULTWIDTH * 0.12, marginBottom: DEFAULTHEIGHT * 0.02 }}>
            <Text style={styles.textPatient}>Betty Smith</Text>

            <Text style={styles.textAge}>70 Years, Female</Text>
          </View>

          <View style={styles.viewPres}>
            <Text style={styles.textDetail}>Prescription ID</Text>
            <Text style={styles.textDetail}>0458956257</Text>
          </View>
          <View style={styles.viewPres}>
            <Text style={styles.textDetail}>No Allergies</Text>
          </View>
          <View style={styles.viewPres}>
            <Text style={styles.textDetail}>Migraine</Text>
          </View>

          <View style={{ marginLeft: DEFAULTWIDTH * 0.15 }}>
            <Image
              source={require('../../../../../assets/Images/Hospital.png')}
              style={{ width: GlobalSize(200), height: GlobalSize(100) }}
              resizeMode='contain' />
          </View>
          <View style={DEFAULTSTYLES.alignView}>
            <Text style={styles.textHos}>2000 Mowry Avenue
              Fremont, CA 94538510.797.1111</Text>
          </View>
          <View style={[styles.viewPres, { backgroundColor: PRIMARYCOLOR}]}>
            <Text style={[styles.textDetail, { color: PUREWHITE }]}>Get Directions</Text>
            <WhiteArrow />
          </View>

          <View style={[styles.viewPres, { backgroundColor: PRIMARYCOLOR }]}>
            <Text style={[styles.textDetail, { color: PUREWHITE }]}>View all Locations</Text>
            <WhiteArrow />
          </View>

          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={[styles.touchTick,
              Platform.OS == 'android' ?
                DEFAULTSTYLES.androidShadow :
                DEFAULTSTYLES.iosShadow]}>
              <GreenTick width={GlobalSize(40)} height={GlobalSize(40)} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={[styles.touchTick,
              Platform.OS == 'android' ?
                DEFAULTSTYLES.androidShadow :
                DEFAULTSTYLES.iosShadow]}>
              <RedClose width={GlobalSize(40)} height={GlobalSize(40)} />
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
      <NotificationModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
      />
    </SafeAreaView>
  )
}

export default NotificationDetails;

const styles = StyleSheet.create({
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: 1,
    marginHorizontal: DEFAULTWIDTH * 0.06,
    marginBottom: DEFAULTWIDTH * 0.05,
  },
  textDr: {
    fontFamily: FONTS.FontSemiB,
    color: PUREBLACK,
    fontSize: fontSize(18)
  },
  textPost: {
    fontFamily: FONTS.FontRegular,
    color: PUREBLACK,
    fontSize: fontSize(13)
  },
  viewCal: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center'
  },
  textPatient: {
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    fontSize: fontSize(18)
  },
  textAge: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(15),
    color: TEXTCOLORNOT
  },
  viewPres: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: BACKGROUNDNOT,
    padding: GlobalSize(15),
    paddingLeft: DEFAULTWIDTH * 0.1,
    paddingRight: DEFAULTWIDTH * 0.1,
    marginBottom: GlobalSize(2),
    alignItems: 'center'
  },
  textDetail: {
    color: PUREBLACK,
    fontSize: fontSize(15),
    fontFamily: FONTS.FontMedium
  },
  touchTick: {
    width: GlobalSize(60),
    height: GlobalSize(60),
    borderRadius: GlobalSize(30),
    backgroundColor: PUREWHITE,
    alignItems: 'center',
    justifyContent: 'center',
    margin: GlobalSize(8)
  },
  textHos: {
    fontSize: fontSize(15),
    color: PUREBLACK,
    fontFamily: FONTS.FontMedium,
    top: GlobalSize(-20),
    maxWidth: DEFAULTWIDTH * 0.55
  },
  viewBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: DEFAULTWIDTH * 0.05
  },
  timeView: {
    flexDirection: 'row',
    marginLeft: DEFAULTWIDTH * 0.07,
    marginBottom: DEFAULTHEIGHT * 0.03
  },
  viewDetail: {
    flexDirection: 'row',
    marginLeft: DEFAULTWIDTH * 0.05,
    alignItems: 'center',
    marginBottom: GlobalSize(10)
  },
  imageStyle: {
    width: GlobalSize(64),
    height: GlobalSize(64),
    borderRadius: GlobalSize(34)
  }
})