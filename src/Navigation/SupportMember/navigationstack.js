import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SupportLandingScreen from '../../Screens/Main/SupportMember/LandingScreen';
import NotificationDetails from '../../Screens/Main/SupportMember/Notification/NotificationDetails';
import SupportUserProfile from '../../Screens/Main/SupportMember/Profile/UserProfile';
import SelectRoles from '../../Screens/Main/SupportMember/Profile/SelectRoles';
import EditProfile from '../../Screens/Main/SupportMember/Profile/EditProfile';
import NearbySupportRequired from '../../Screens/Main/SupportMember/NearbySupport/NearbySupportRequired';
import NearbySupportDetailed from '../../Screens/Main/SupportMember/NearbySupport/NearbySupportDetailed';
import SupportTaskDetails from '../../Screens/Main/SupportMember/Tasks/TaskDetailsPage';
import OnBoardingSupport from '../../Screens/Splash/OnBoarding/SupportMember/OnBoardingSupport';
import FAQ from '../../Screens/Main/CarePartner/SidemenuList/FAQ';
import PrivacyPolicy from '../../Screens/Main/CarePartner/SidemenuList/PrivacyPolicy';
import AboutUs from '../../Screens/Main/CarePartner/SidemenuList/AboutUs';

const Support = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const SupportStack = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Support.Navigator screenOptions={screenOptions}>
      <Support.Screen
        name="SupportMainPage"
        component={isConnected ? SupportLandingScreen : NetworkConnectivity}
      />
      <Support.Screen
        name="SupportNotificationDetails"
        component={isConnected ? NotificationDetails : NetworkConnectivity}
      />
      <Support.Screen
        name="SupportProfileScreen"
        component={isConnected ? SupportUserProfile : NetworkConnectivity}
      />
      <Support.Screen
        name="SelectRoles"
        component={isConnected ? SelectRoles : NetworkConnectivity}
      />
      <Support.Screen
        name="SupportEditProfile"
        component={isConnected ? EditProfile : NetworkConnectivity}
      />
      <Support.Screen
        name="SupportRequiredNearby"
        component={isConnected ? NearbySupportRequired : NetworkConnectivity}
      />
      <Support.Screen
        name="SupportRequiredDetail"
        component={isConnected ? NearbySupportDetailed : NetworkConnectivity}
      />

      <Support.Screen
        name="SupportTaskDetails"
        component={isConnected ? SupportTaskDetails : NetworkConnectivity}
      />

      <Support.Screen name="OnBoardingSupport" component={OnBoardingSupport} />

      <Support.Screen
        name="Faq"
        component={isConnected ? FAQ : NetworkConnectivity}
      />

      <Support.Screen
        name="Privacy Policy"
        component={isConnected ? PrivacyPolicy : NetworkConnectivity}
      />

      <Support.Screen
        name="About Us"
        component={isConnected ? AboutUs : NetworkConnectivity}
      />
    </Support.Navigator>
  );
};

export default SupportStack;
