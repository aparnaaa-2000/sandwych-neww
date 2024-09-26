import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConfirmDrug1 from '../../Components/CarePartner/Med/ConfirmDrug1';
import ConfirmDrug2 from '../../Components/CarePartner/Med/ConfirmDrug2';
import ConfirmDrug3 from '../../Components/CarePartner/Med/ConfirmDrug3';
import ConfirmDrug4 from '../../Components/CarePartner/Med/ConfirmDrug4';
import ConfirmDrug5 from '../../Components/CarePartner/Med/ConfirmDrug5';
import NewMedication from '../../Components/CarePartner/Med/NewMedication';
import AddMedication from '../../Components/CarePartner/Med/AddMedication';
import MedDetails from '../../Components/CarePartner/Med/MedDetails/MedDetails';
import MedsTabScreen from '../../Screens/Main/CarePartner/Meds/MedsTab/MedsTabScreen';

const Med = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

const MedStack2 = () => {

    return (
        <Med.Navigator
            screenOptions={screenOptions}>
            {/* <Med.Screen name="MedDetails" component={MedDetails} /> */}
            {/* <Med.Screen name="MedsTabScreen" component={MedsTabScreen} />
            <Med.Screen name="AddMedication" component={AddMedication} /> */}
            <Med.Screen name="NewMedication" component={NewMedication} />
            <Med.Screen name="ConfirmDrug1" component={ConfirmDrug1} />
            <Med.Screen name="ConfirmDrug2" component={ConfirmDrug2} />
            <Med.Screen name="ConfirmDrug3" component={ConfirmDrug3} />
            <Med.Screen name="ConfirmDrug4" component={ConfirmDrug4} />
            <Med.Screen name="ConfirmDrug5" component={ConfirmDrug5} />

        </Med.Navigator>
    )
}


export default MedStack2;
