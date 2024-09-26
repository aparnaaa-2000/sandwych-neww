import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import SplashScreen from '../../Screens/Splash/SplashScreen';
import WelcomeScreen from '../../Screens/Splash/WelcomeScreen';
import {DEFAULTGRAY} from '../../Constants/Colors/Colors';
import SignIn from '../../Screens/Registration/Login/SignIn';
import OTPVerification from '../../Screens/Registration/ResetPassword/OTPVerification';
import PasswordVerify from '../../Screens/Registration/ResetPassword/PasswordVerify';
import ResetPasswordScreen from '../../Screens/Registration/ResetPassword/ResetPassword';
import SignUpScreen from '../../Screens/Registration/SignUp/SignUpScreen';
import SignUpForm from '../../Screens/Registration/SignUp/Forms/CarePartner/SignUpForm';
import UserSelect from '../../Screens/Registration/SignUp/UserSelect';
import SignUpVerification from '../../Screens/Registration/SignUp/SignUpVerification';
import CreatePasswordScreen from '../../Screens/Registration/SignUp/CreatePassword';
import HipaaValidationForm from '../../Screens/HIPAA/HipaaValidationForm';
import EnrollmentStack from '../CarePartner/enrollmentstack';
import ChatStack from '../CarePartner/ChatStack';
import MedStack from '../CarePartner/MedStack';
import MedStack2 from '../CarePartner/MedStack2';
import TaskStack from '../CarePartner/TaskStack';

import NetworkConnectivity from '../../Components/Common/NetworkConnection/NetworkConnectivity';

import MenuStack from '../CarePartner/MenuStack';
import CareLandingScreen from '../../Screens/Main/CarePartner/LandingScreen';

import SupportLandingScreen from '../../Screens/Main/SupportMember/LandingScreen';
import SupportStack from '../SupportMember/navigationstack';
import HomeStack from '../SocialWorker/HomeStack';
import AssessmentStack from '../SocialWorker/AssessmentStack';
import CaseManagerLanding from '../../Screens/Main/CaseManager/LandingScreen';
import OnBoardingSupport from '../../Screens/Splash/OnBoarding/SupportMember/OnBoardingSupport';
import SelectServices from '../../Screens/Registration/SignUp/Services/SelectServices';
import SupportMemeberForm from '../../Screens/Registration/SignUp/Forms/SupportMember/SupportMemberForm';
import OnBoardingScreen from '../../Screens/Splash/OnBoarding/CarePartner/OnBoarding/OnBoardingScreen';
import ChatRoom from '../../Screens/Main/SupportMember/Chats/ChatRoom';
import ChatDetails from '../../Components/Chat/ChatDetails/ChatDetails';
import NotificationPage from '../../Components/SupportMember/Notifications/NotificationPage';

// const Stack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const AuthStack = () => {
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
    <NavigationContainer>
      <PaperProvider>
        <View
          style={{
            backgroundColor: DEFAULTGRAY,
            flex: 1,
          }}>
          <MainStack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={screenOptions}>
            <MainStack.Screen name="SplashScreen" component={SplashScreen} />
            {/* OnBoarding is not shown here for SandwYch.. Different userrole will have different onBoarding for SandwYch */}
            <MainStack.Screen
              name="Onboarding"
              component={isConnected ? OnBoardingScreen : NetworkConnectivity}
            />
            <MainStack.Screen
              name="WelcomeScreen" 
              options={{
                gestureEnabled: false, // Disables the back swipe gesture only for this screen
              }}
              component={isConnected ? WelcomeScreen : NetworkConnectivity}
            />

            <MainStack.Screen
              name="SignIn"
              component={isConnected ? SignIn : NetworkConnectivity}
            />

            <MainStack.Screen
              name="OTPVerification"
              options={{
                gestureEnabled: false, // Disables the back swipe gesture only for this screen
              }}
              component={isConnected ? OTPVerification : NetworkConnectivity}
            />
            <MainStack.Screen
            options={{
              gestureEnabled: false, // Disables the back swipe gesture only for this screen
            }}
              name="PasswordVerify"
            
              component={isConnected ? PasswordVerify : NetworkConnectivity}
            />
            <MainStack.Screen
              name="ResetPasswordScreen"
              options={{
                gestureEnabled: false, // Disables the back swipe gesture only for this screen
              }}
              component={
                isConnected ? ResetPasswordScreen : NetworkConnectivity
              }
            />

            <MainStack.Screen
              name="SignUpScreen"
              component={isConnected ? SignUpScreen : NetworkConnectivity}
            />
            <MainStack.Screen
              name="SignUpForm"
              component={isConnected ? SignUpForm : NetworkConnectivity}
            />
            <MainStack.Screen
              name="SupportMemeberForm"
              component={isConnected ? SupportMemeberForm : NetworkConnectivity}
            />
            <MainStack.Screen
              name="SelectServices"
              component={isConnected ? SelectServices : NetworkConnectivity}
            />

            <MainStack.Screen
              name="UserSelect"
              options={{
                gestureEnabled: false, // Disables the back swipe gesture only for this screen
              }}
              component={isConnected ? UserSelect : NetworkConnectivity}
            />
            <MainStack.Screen
              name="SignUpVerification"
              component={isConnected ? SignUpVerification : NetworkConnectivity}
            />
            <MainStack.Screen
              name="CreatePasswordScreen"
              options={{
                gestureEnabled: false, // Disables the back swipe gesture only for this screen
              }}
              component={
                isConnected ? CreatePasswordScreen : NetworkConnectivity
              }
            />

            <MainStack.Screen
              name="HipaaValidationForm"
              component={
                isConnected ? HipaaValidationForm : NetworkConnectivity
              }
            />
            <MainStack.Screen
              name="EnrollmentStack"
              component={EnrollmentStack}
            />
            <MainStack.Screen
              name="ChatStack"
              component={isConnected ? ChatStack : NetworkConnectivity}
            />
            <MainStack.Screen name="MedStack" component={MedStack} />
            <MainStack.Screen name="MedStack2" component={MedStack2} />
            <MainStack.Screen name="TaskStack" component={TaskStack} />

            <MainStack.Screen
              name="MenuStack"
              component={isConnected ? MenuStack : NetworkConnectivity}
            />

            <MainStack.Screen
              name="CarePartnerLandingScreen"
              component={isConnected ? CareLandingScreen : NetworkConnectivity}
            />
            <MainStack.Screen
              name="SupportLandingScreen"
              component={
                isConnected ? SupportLandingScreen : NetworkConnectivity
              }
            />
            <MainStack.Screen
              name="SupportOnBoardingScreen"
              component={isConnected ? OnBoardingSupport : NetworkConnectivity}
            />

            <MainStack.Screen
              name="SupportStack"
              component={isConnected ? SupportStack : NetworkConnectivity}
            />
            <MainStack.Screen
              name="HomeStack"
              component={isConnected ? HomeStack : NetworkConnectivity}
            />
            <MainStack.Screen
              name="AssessmentStack"
              component={isConnected ? AssessmentStack : NetworkConnectivity}
            />

            <MainStack.Screen
              name="ChatRoom"
              component={isConnected ? ChatRoom : NetworkConnectivity}
            />

            <MainStack.Screen
              name="ChatDetail"
              component={isConnected ? ChatDetails : NetworkConnectivity}
            />

            <MainStack.Screen
              name="NotificationPage"
              component={isConnected ? NotificationPage : NetworkConnectivity}
            />
          </MainStack.Navigator>
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default AuthStack;
