import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {ArrowF, BlackDots, LogoSmall} from '../../../../../assets';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import {
  BACKGROUNDWHITE,
  BLUES01,
  BORDERCOLOR2,
  GREYBACKGROUND1,
  PLACEHOLDERCOLOR1,
  PLACEHOLDERCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR7,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import CaseManagerDetails from '../../../../Components/CaseManager/Profile/CaseManager/CaseManagerDetails';
import LogOutModal from '../../CarePartner/SidemenuList/LogOutModal';

const UserProfile = ({navigation}) => {
  const [EditProfile, setEditProfile] = useState(false);
  const [itemState, setItemState] = useState(1);
  const [ModalOpen, setModalOpen] = useState(false);

  const ModalOpens = () => {
    setModalOpen(true);
  };

  const JourneyItems = [
    {
      id: 1,
      Title: 'Details',
    },
    {
      id: 2,
      Title: 'Settings',
    },
  ];

  const HeaderComponent = () => {
    return (
      <View style={styles.flexView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{marginRight: GlobalSize(10)}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowF height={height(22)} width={width(22)} />
            </TouchableOpacity>
          </View>

          <View>
            <LogoSmall />
          </View>
        </View>

        <View></View>

        <View>
          <TouchableOpacity
            onPress={() => setEditProfile(!EditProfile)}
            style={{padding: GlobalSize(10)}}>
            <BlackDots />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const TabComponent = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: DEFAULTWIDTH,
      }}>
      <View style={styles.tabView}>
        <View style={styles.cardView}>
          <View
            style={{
              width: DEFAULTWIDTH,
              marginHorizontal: DEFAULTWIDTH * 0.04,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            // horizontal
            // showsHorizontalScrollIndicator={false}
          >
            {JourneyItems?.map(item => {
              return (
                <TouchableOpacity
                  style={
                    itemState == item.id
                      ? styles.selectView
                      : styles.unselectView
                  }
                  onPress={() => setItemState(item.id)}>
                  <Text style={styles.textTitle}>{item.Title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <View style={DEFAULTSTYLES.alignView}>
        <View style={styles.lineView} />
      </View>
    </View>
  );

  const TabShiftLayout = () => (
    <>
      {itemState == 1 ? (
        <ScrollView>
          <Text>About Section</Text>
        </ScrollView>
      ) : (
        <View
          style={{
            width: '100%',
            height: DEFAULTHEIGHT * 0.6,
          }}>
          <TouchableOpacity style={styles.buttonOverlay}>
            <Text style={styles.buttonText}>About SandwYch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOverlay}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonOverlay}>
            <Text style={styles.buttonText}>FAQ</Text>
          </TouchableOpacity>
          <View style={styles.bottomLayer}>
            <TouchableOpacity
              onPress={() => {
                ModalOpens();
              }}
              style={styles.buttonOverlayLogout}>
              <Text style={styles.buttonTextLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />
      <View style={{flex: 1}}>
        <HeaderComponent />
        {EditProfile && (
          <TouchableOpacity
            style={styles.popupLayout}
            onPress={() => navigation.navigate('SupportEditProfile')}>
            <View style={[styles.selectView, {width: DEFAULTWIDTH * 0.4}]}>
              <Text style={styles.textTitle}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        )}
        <CaseManagerDetails />
        <TabComponent />
        <TabShiftLayout />
      </View>
      <LogOutModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.03,
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
  popupLayout: {
    alignItems: 'flex-end',
    top: GlobalSize(35),
    right: GlobalSize(10),
    position: 'absolute',
  },
  selectView: {
    backgroundColor: PUREWHITE,
    paddingVertical: GlobalSize(8),
    borderRadius: GlobalSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOffset: {width: 2, height: 2},
    shadowColor: PLACEHOLDERCOLOR3,
    shadowOpacity: 0.3,
    paddingHorizontal: GlobalSize(15),
    height: 45,
    width: DEFAULTWIDTH * 0.3,
  },
  textTitle: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    color: TEXTCOLOR7,
    marginBottom: 5,
  },

  // ==== Tab Component
  cardView: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.9,
    height: 50,
    width: DEFAULTWIDTH,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: GREYBACKGROUND1,
  },
  lineView: {
    width: DEFAULTWIDTH * 0.88,
    height: 1,
    // backgroundColor: LINECOLOR1,
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
  selectView: {
    backgroundColor: PUREWHITE,
    paddingVertical: GlobalSize(8),
    borderRadius: GlobalSize(6),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
    shadowOffset: {width: 2, height: 2},
    shadowColor: PLACEHOLDERCOLOR3,
    shadowOpacity: 0.3,
    paddingHorizontal: GlobalSize(15),
    height: 45,
    width: DEFAULTWIDTH * 0.4,
  },
  unselectView: {
    paddingVertical: GlobalSize(8),
    paddingHorizontal: GlobalSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: DEFAULTWIDTH * 0.4,
  },
  tabView: {
    height: 20,
    width: DEFAULTWIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(20),
  },

  textTitle: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    color: TEXTCOLOR7,
    marginBottom: 5,
  },

  // Tab Shift Layout

  buttonText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(16),
    color: PUREWHITE,
  },
  buttonTextLogout: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(16),
    color: PLACEHOLDERCOLOR1,
  },
  buttonOverlay: {
    width: '90%',
    height: 40,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: DEFAULTHEIGHT * 0.01,
  },
  buttonOverlayLogout: {
    width: 200,
    height: 30,
    backgroundColor: BLUES01,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  bottomLayer: {
    position: 'absolute',
    bottom: 15,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default UserProfile;
