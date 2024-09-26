import { SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import MedStack from '../../../../Navigation/CarePartner/MedStack';
import { BACKGROUNDWHITE } from '../../../../Constants/Colors/Colors';

const MedScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }} />
      <MedStack />
    </SafeAreaView>
  );
}

export default MedScreen;



