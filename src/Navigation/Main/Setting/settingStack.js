import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import {PaperProvider} from 'react-native-paper';
import {DEFAULTGRAY} from '../../../Constants/Colors/Colors';
import FAQ from '../../../Screens/Main/CarePartner/SidemenuList/FAQ';
import NetworkConnectivity from '../../../Components/Common/NetworkConnection/NetworkConnectivity';

const SetStack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const SettingStack = () => {
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
          <SetStack.Navigator screenOptions={screenOptions}>
            <SetStack.Screen
              name="Faq"
              component={isConnected ? FAQ : NetworkConnectivity}
            />
          </SetStack.Navigator>
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
};
