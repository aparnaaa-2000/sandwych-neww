import React ,{useState,useEffect }from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainHeader from '../../Components/Common/Headers/MainHeader';
import ChooseTheUser from '../../Screens/Users/ChooseTheUser';
import NetInfo from '@react-native-community/netinfo';
import NetworkConnectivity from '../../Components/Common/NetworkConnection/NetworkConnectivity';
// const Stack = createNativeStackNavigator();
const HeaderStack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const [isConnected, setIsConnected] = useState(true);

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
  });

  return () => {
    unsubscribe();
  };
}, []);

const AuthStack = () => (
  <HeaderStack.Navigator
    initialRouteName="MainHeader"
    screenOptions={screenOptions}>
    <HeaderStack.Screen name="MainHeader" component={MainHeader} />
    <HeaderStack.Screen 
    name='ChooseTheUser'

     component={isConnected? ChooseTheUser: NetworkConnectivity} />
  </HeaderStack.Navigator>
);

export default AuthStack;
