
import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

//IMPORT CONSTANTS
import DEFAULTSTYLES, {DEFAULTHEIGHT,DEFAULTWIDTH,} from '../../../Constants/styles/styles';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR5,
  TEXTCOLORW,
} from '../../../Constants/Colors/Colors';
import {Account, ArrowB, LogoSmall, SwitchProfile} from '../../../../assets';
import {FONTS} from '../../../Constants/Fonts';
import {
  GlobalSize,
  fontSize,
  height,
  width,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT THIRD PARTY PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {DrawerContentScrollView} from '@react-navigation/drawer';

const CustomSidebarMenu = props => {
  const [UserData, setUserData] = useState();
  const CurrentUser = useSelector(state => state?.currentUser?.value);
  
  //OPEN AND CLOSE THE DRAWER
  const navigateAndCloseDrawer = (stackName, screenName) => {
    props.navigation.navigate(stackName, {screen: screenName});
    props.navigation.closeDrawer(); // This will close the drawer
  };

//NAVIGATE TO THE PROFILE SCREEN BASED ON USER SELECTION
  const navigateScreen = () => {
    if (UserData?.carepartner?.role == 'carepartner') {
      props.navigation.navigate('ChooseTheUser');
      props.navigation.closeDrawer(); // This will close the drawer
    } else {
      navigateAndCloseDrawer('MenuStack', 'Journey');
    }
  };

  const getData = async () => {
    try {
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      const patient = patientData != null ? JSON.parse(patientData) : null;
      const carepartner =
        carepartnerData != null ? JSON.parse(carepartnerData) : null;

      return {patient, carepartner};
    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  // Define the function to fetch data and set it in state
  const fetchData = useCallback(async () => {
    try {
      const data = await getData();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  // Use useFocusEffect to call fetchData when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

const NavigationProfile = ()=>{
  if(UserData?.carepartner?.role == 'carepartner'){
    navigateAndCloseDrawer('MenuStack', 'CarePartnerProfile')
  }else{
    navigateAndCloseDrawer('MenuStack', 'Journey')
  }
}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: PUREWHITE}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*Top Large Image */}

        <TouchableOpacity
          style={[styles.container, {paddingTop: GlobalSize(15)}]}
          onPress={() =>
            NavigationProfile()
            //</ScrollView>navigateAndCloseDrawer('MenuStack', 'CarePartnerProfile')
          }>
          {UserData?.carepartner?.profile ? (
            <Account width={80} height={80} opacity={0.5} />
          ) : (
            <Account width={80} height={80} opacity={0.5} />
          )}
          <View
            style={[
              DEFAULTSTYLES.alignView,
              {zIndex: 199, marginTop: GlobalSize(10)},
            ]}>
            <Text
              style={{
                fontFamily: FONTS.FontExtraBold,
                fontSize: fontSize(16),
                color: PRIMARYCOLOR,
              }}>
              {UserData?.carepartner?.name}
            </Text>
            <Text
              style={[
                styles.secondaryText,
                {width: DEFAULTWIDTH * 0.65, textAlign: 'center'},
              ]}>
              {UserData?.carepartner?.email}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Custom - Should write a function, if the caregiver is the user it should be shown
      or else if its a patient it should be hidden from the user side */}

        {UserData?.carepartner?.role == 'carepartner' && (
          <View style={[styles.switchProfile, DEFAULTSTYLES.iosShadow]}>
            <View style={styles.cardLayout}>
              <TouchableOpacity
                onPress={() => navigateAndCloseDrawer('MenuStack', 'Journey')}>
                {UserData.patient && (
                  <>
                    <Text style={styles.textPatient}>
                      {UserData?.patient?.name
                        ? UserData?.patient?.name
                        : UserData?.carepartner?.carepartners_patients[0]?.name}
                    </Text>
                    <Text style={styles.secondaryText}>
                      {UserData?.patient?.email
                        ? UserData?.patient?.email
                        : UserData?.carepartner?.carepartners_patients[0]
                            ?.email}
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigateScreen()}>
                <SwitchProfile width={width(25)} height={height(25)} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {/* <DrawerContentScrollView {...props} style={{top:Platform.OS == 'ios' ? GlobalSize(-30) : 0}}> */}
          {/* <DrawerItemList {...props} /> */}

          <TouchableOpacity
            style={[styles.cardContainer, DEFAULTSTYLES.iosShadow]}
            onPress={() =>
              navigateAndCloseDrawer('MenuStack', 'InPrevResources')
            }>
            <View style={styles.cardLayout}>
              <Text style={styles.subMenuText}>Requested Resource</Text>
              <ArrowB width={width(16)} height={height(16)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardContainer, DEFAULTSTYLES.iosShadow]}
            onPress={() =>
              navigateAndCloseDrawer('MenuStack', 'InPrevSupport')
            }>
            <View style={styles.cardLayout}>
              <Text style={styles.subMenuText}>Requested Support</Text>
              <ArrowB width={width(16)} height={height(16)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardContainer, DEFAULTSTYLES.iosShadow]}
            onPress={() => navigateAndCloseDrawer('MenuStack', 'Settings')}>
            <View style={styles.cardLayout}>
              <Text style={styles.subMenuText}>Settings</Text>
              <ArrowB width={width(16)} height={height(16)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardContainer, DEFAULTSTYLES.iosShadow]}
            onPress={() => navigateAndCloseDrawer('MenuStack', 'AboutUs')}>
            <View style={styles.cardLayout}>
              <Text style={styles.subMenuText}>About SandwYch</Text>
              <ArrowB width={width(16)} height={height(16)} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cardContainer, DEFAULTSTYLES.iosShadow]}
            onPress={() => navigateAndCloseDrawer('MenuStack', 'FAQ')}>
            <View style={styles.cardLayout}>
              <Text style={styles.subMenuText}>FAQ</Text>
              <ArrowB width={16} height={16} />
            </View>
          </TouchableOpacity>

        {/* </DrawerContentScrollView> */}
      </ScrollView>
      <View style={styles.logoView}>
        <LogoSmall />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DEFAULTWIDTH * 0.4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DEFAULTHEIGHT * 0.00005,
    marginBottom: DEFAULTHEIGHT * 0.02,
    zIndex: 999,
  },
  cardContainer: {
    // width: DEFAULTWIDTH * 0.65,
    marginHorizontal: DEFAULTWIDTH * 0.05,
    backgroundColor: PUREWHITE,
    justifyContent: 'center',
    padding: DEFAULTWIDTH * 0.04,
    marginBottom: DEFAULTHEIGHT * 0.02,
    elevation: 2,
    borderRadius: DEFAULTHEIGHT * 0.02,
    zIndex: 99,
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchProfile: {
    // width: DEFAULTWIDTH * 0.65,
    marginHorizontal: DEFAULTWIDTH * 0.05,
    backgroundColor: PUREWHITE,
    padding: DEFAULTWIDTH * 0.04,
    marginTop: DEFAULTHEIGHT * 0.01,
    marginBottom: DEFAULTHEIGHT * 0.02,
    elevation: 2,
    borderRadius: DEFAULTHEIGHT * 0.02,
  },
  subMenuText: {
    color: TEXTCOLORW,
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
  },
  secondaryText: {
    color: TEXTCOLOR5,
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(13),
  },
  logoView: {
    alignSelf: 'center',
    marginBottom: GlobalSize(10),
    ///marginTop: GlobalSize(50)
  },
  sideMenuProfileIcon: {
    width: DEFAULTWIDTH * 0.3,
    height: DEFAULTWIDTH * 0.3,
    resizeMode: 'contain',
  },
  textPatient: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    color: TEXTCOLOR10,
    maxWidth: DEFAULTWIDTH * 0.5,
  },
});

export default CustomSidebarMenu;
