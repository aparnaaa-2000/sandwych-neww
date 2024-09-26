import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR2,
  GREYBACKGROUND1,
  PLACEHOLDERCOLOR3,
  PUREWHITE,
  TEXTCOLOR7,
  FOURTHCOLOR,
  BLUES01,
  PLACEHOLDERCOLOR1,
  PRIMARYCOLOR,
} from '../../../../Constants/Colors/Colors';
import {
  ArrowF,
  BlackDots,
  LogoSmall,
  TransportMobility,
  Eating,
  Dressing,
  Toileting,
} from '../../../../../assets';
import { FONTS } from '../../../../Constants/Fonts';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import SupportMemberDetails from '../../../../Components/SupportMember/UserProfile/SupportMemberDetails';
import About from '../../../../Components/SupportMember/UserProfile/About';
import AvailableTiming from '../../../../Components/SupportMember/UserProfile/AvailableTiming';
import UserRating from '../../../../Components/SupportMember/UserProfile/UserRating';
import SupportRoles from '../../../../Components/SupportMember/UserProfile/SupportRoles';
import TimePicker from '../../../../Components/SupportMember/UserProfile/TimePicker';
import LogOutModal from '../../CarePartner/SidemenuList/LogOutModal';
import { shallowEqual, useSelector } from 'react-redux';
import useDays from '../../../../hooks/apihooks/useDays';
import useSupports from '../../../../hooks/apihooks/useSupports';
import { useNavigation } from '@react-navigation/native';
import useNavigations from '../../../../hooks/navigationhooks/useNavigations';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useGetProfile from '../../../../hooks/apihooks/useGetProfile';

const UserProfile = ({ navigation }) => {
  const [EditProfile, setEditProfile] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSecmodalVisible, setIsSecModalVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectSectime, setSelectSecTime] = useState(null);
  const { NavigationFaq } = useNavigations();

  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.profilesupport.data,
      error: state.profilesupport.error,
      isLoading: state.profilesupport.isLoading,
    }),
    shallowEqual,
  );

  const handleConfirm = time => {
    setSelectedTime(time);
    console.log('SELECTED_TIME...', time);
    setModalVisible(false);
  };

  const handleSecConfirm = time => {
    console.log('SECTIME....', time);
    setSelectSecTime(time);
    console.log(time);
    setIsSecModalVisible(false);
  };

  const [ModalOpen, setModalOpen] = useState(false);

  const ModalOpens = () => {
    setModalOpen(true);
  };

  const [selectWeekday, setSelectedWeekdays] = useState([]);
  const WEEKDAYS = [
    {
      id: 1,
      day: 'SUN',
    },
    {
      id: 2,
      day: 'MON',
    },
    {
      id: 3,
      day: 'TUE',
    },
    {
      id: 4,
      day: 'WED',
    },
    {
      id: 5,
      day: 'THU',
    },
    {
      id: 6,
      day: 'FRI',
    },
    {
      id: 7,
      day: 'SAT',
    },
  ];

  const JourneyItems = [
    {
      id: 1,
      Title: 'Details',
    },
    {
      id: 2,
      Title: 'Support',
    },
    {
      id: 3,
      Title: 'Settings',
    },
  ];

  const DUMMYDATA = [
    {
      role: 'Eating',
      roleDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a dui diam. Fusce vitae libero est. Pellentesque maximus urna vel sapien tristique, et scelerisque risus blandit',
      roleImg: Eating,
      roleType: 'ADL',
    },
    {
      role: 'Transfer & Mobility',
      roleDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a dui diam. Fusce vitae libero est. Pellentesque maximus urna vel sapien tristique, et scelerisque risus blandit',
      roleImg: TransportMobility,
      roleType: 'IADL',
    },
    {
      role: 'Dressing',
      roleDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a dui diam. Fusce vitae libero est. Pellentesque maximus urna vel sapien tristique, et scelerisque risus blandit',
      roleImg: Dressing,
      roleType: 'ADL',
    },
    {
      role: 'Toileting',
      roleDesc:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a dui diam. Fusce vitae libero est. Pellentesque maximus urna vel sapien tristique, et scelerisque risus blandit',
      roleImg: Toileting,
      roleType: 'ADL',
    },
  ];

  const [itemState, setItemState] = useState(1);

  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const [isAllDayOn, setAllDayOn] = useState(true);
  const [supports, setSupports] = useState([]);

  //   const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(null);
  const [profileData, setProfileData] = useState([]);
  const [ploading, setPloading] = useState(false);
  const [perror, setPeError] = useState(false);
  const [profileSchedule, setProfileSchedule] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const data = await useDays();
        setDays(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDays();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useSupports();
        setData(result);
        console.log(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSupports = async () => {
      try {
        const userId = await AsyncStorage.getItem('User_Id'); // Await the Promise
        if (userId) {
          const data = await useSupports(userId);
          setSupports(data?.supports);
          console.log('SUPPORT...', data?.shedules);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSupports();
  }, [supports]);

  useEffect(() => {
    const FetchUserData = async () => {
      try {
        setLoading(true);
        const data = await useGetProfile();
        console.log('USER_PROFILE...', data?.user);
        setProfileSchedule(data?.schedules);
        setProfileData(data);
        setIsSwitchOn(data?.is_active);
      } catch (error) {
        console.log('error_code', error);
        setPloading(false);
        setPeError(true);
      }
    };
    FetchUserData();
  }, [profileData]);

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }}
      />

      <View>
        <View style={styles.flexView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: GlobalSize(10) }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowF height={height(22)} width={width(22)} />
              </TouchableOpacity>
            </View>

            <View>
              <LogoSmall />
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => setEditProfile(!EditProfile)}
              style={{ padding: GlobalSize(10) }}>
              <BlackDots />
            </TouchableOpacity>
          </View>
        </View>

        <TimePicker
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirm}
        />

        <TimePicker
          visible={isSecmodalVisible}
          onClose={() => setIsSecModalVisible(false)}
          onConfirm={handleSecConfirm}
        />

        {EditProfile && (
          <TouchableOpacity
            style={styles.popupLayout}
            onPress={() => navigation.navigate('SupportEditProfile')}>
            <View style={[styles.selectView, { width: DEFAULTWIDTH * 0.4 }]}>
              <Text style={styles.textTitle}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        )}
        <View>
          <SupportMemberDetails data={profileData} />
        </View>
        <View style={styles.tabView}>
          <View style={styles.cardView}>
            <ScrollView
              style={{ width: '100%', marginHorizontal: DEFAULTWIDTH * 0.04 }}
              horizontal
              showsHorizontalScrollIndicator={false}>
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
            </ScrollView>
          </View>
        </View>

        <View style={DEFAULTSTYLES.alignView}>
          <View style={styles.lineView} />
        </View>

        {itemState == 1 ? (
          <ScrollView
            style={{ width: '100%', height: '70%' }}
            showsVerticalScrollIndicator={false}>
            {/* Available timings are currently SUN - SAT, this needs to be changed to Current day and next 6 days where user can select each date and change its timing  */}
            <AvailableTiming
              AvailableStatus={isSwitchOn}
              ChangeAvailablityStatus={setIsSwitchOn}
              changeModalVisiblity={setModalVisible}
              modalSecVisible={setIsSecModalVisible}
              modalSecVisibleStatus={isSecmodalVisible}
              modalVisiblityValue={isModalVisible}
              changeAllDayOn={setAllDayOn}
              allDayOn={isAllDayOn}
              WEEKDAYS={WEEKDAYS}
              selectWeekday={selectWeekday}
              setSelectedWeekdays={setSelectedWeekdays}
              timeValue={selectedTime}
              timeSecValue={selectSectime}
              selectedSchedule={profileSchedule}
            />

            <About Title={'Personal Info'} Edit={false} data={profileData} />
            <UserRating />
            <View style={{ height: 200 }}></View>
          </ScrollView>
        ) : itemState == 2 ? (
          <View style={{ width: '100%', height: '70%' }}>
            <View style={styles.rolesContainer}>
              <Text style={styles.textAbout}>Manage Roles</Text>
              <TouchableOpacity
                style={styles.addOverlay}
                onPress={() => navigation.navigate('SelectRoles')}>
                <Text style={styles.addText}>+</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              data={supports}
              renderItem={({ item }) => (
                <SupportRoles role={item} day={0} navigation={navigation} />
              )}
              keyExtractor={item => item.id}
            />
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              height: DEFAULTHEIGHT * 0.6,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('About Us')}
              style={styles.buttonOverlay}>
              <Text style={styles.buttonText}>About SandwYch</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Privacy Policy')}
              style={styles.buttonOverlay}>
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Faq')}
              style={styles.buttonOverlay}>
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
      </View>

      <LogOutModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.03,
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
  textTitle: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    color: TEXTCOLOR7,
    marginBottom: 5,
  },
  cardView: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.9,
    height: 50,
    width: '100%',
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR2,
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
    shadowOffset: { width: 2, height: 2 },
    shadowColor: PLACEHOLDERCOLOR3,
    shadowOpacity: 0.3,
    paddingHorizontal: GlobalSize(15),
    height: 45,
    width: DEFAULTWIDTH * 0.3,
  },
  unselectView: {
    paddingVertical: GlobalSize(8),
    paddingHorizontal: GlobalSize(15),
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: DEFAULTWIDTH * 0.3,
  },
  tabView: {
    height: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: GlobalSize(20),
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
  popupLayout: {
    alignItems: 'flex-end',
    top: GlobalSize(35),
    right: GlobalSize(10),
    position: 'absolute',
  },
  textAbout: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR7,
  },
  addOverlay: {
    backgroundColor: FOURTHCOLOR,
    width: 30,
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: PUREWHITE,
    fontSize: fontSize(20),
    fontFamily: FONTS.FontBold,
  },
  rolesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: DEFAULTWIDTH * 0.03,
    marginBottom: DEFAULTHEIGHT * 0.01,
    alignItems: 'center',
  },
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
