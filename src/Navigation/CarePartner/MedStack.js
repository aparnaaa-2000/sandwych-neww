import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginMeds from '../../Components/CarePartner/Med/LoginMeds'
import TransferMeds from '../../Components/CarePartner/Med/TransferMeds';
import AddMeds from '../../Components/CarePartner/Med/AddMeds/AddMeds';
import MainMeds from '../../Components/CarePartner/Med/ActiveMeds/MainMeds';
import MedsLandingPage from '../../Screens/Main/CarePartner/Meds/MedsLandingPage';
import AddMedication from '../../Components/CarePartner/Med/AddMedication';
import MedsTabScreen from '../../Screens/Main/CarePartner/Meds/MedsTab/MedsTabScreen';
import MedDetails from '../../Components/CarePartner/Med/MedDetails/MedDetails';

const Med = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const MedStack = () => {

  return (
    <Med.Navigator
      screenOptions={screenOptions}>

      <Med.Screen name='MedsLandingPage' component={MedsLandingPage} />
      <Med.Screen name="MedDetails" component={MedDetails} />
      <Med.Screen name="MainMeds" component={MainMeds} />
      <Med.Screen name="AddMeds" component={AddMeds} />
      <Med.Screen name="TransferMeds" component={TransferMeds} />
      <Med.Screen name="LoginMeds" component={LoginMeds} />
      <Med.Screen name="MedsTabScreen" component={MedsTabScreen} />
      <Med.Screen name="AddMedication" component={AddMedication} />
    </Med.Navigator>
  )
}


export default MedStack;
