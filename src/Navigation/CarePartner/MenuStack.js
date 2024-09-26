import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FAQ from '../../Screens/Main/CarePartner/SidemenuList/FAQ';
import AboutUs from '../../Screens/Main/CarePartner/SidemenuList/AboutUs';
import PrivacyPolicy from '../../Screens/Main/CarePartner/SidemenuList/PrivacyPolicy';
import SelectResource from '../../Screens/Main/CarePartner/Resources/SelectResource';
import Settings from '../../Screens/Main/CarePartner/SidemenuList/Settings';
import Journey from '../../Screens/Main/CarePartner/Journey/Journey';
import EditGlucose from '../../Screens/Main/CarePartner/Journey/EditGlucose';
import EditBloodPressure from '../../Screens/Main/CarePartner/Journey/EditBloodPressure';
import EditTemperature from '../../Screens/Main/CarePartner/Journey/EditTemperature';
import EditWeight from '../../Screens/Main/CarePartner/Journey/EditWeight';
import EditProfile from '../../Screens/Main/CarePartner/Journey/EditProfile';
import CarePartnerProfile from '../../Screens/Main/CarePartner/CarePartnerProfile/CarePartnerProfile';
import CarePartnerEditProfile from '../../Screens/Main/CarePartner/CarePartnerProfile/CarePartnerEditProfile';
import FilterResource from '../../Screens/Main/CarePartner/Resources/FilterResource';
import ResourceDetail from '../../Screens/Main/CarePartner/Resources/ResourceDetail';
import ResourceList from '../../Screens/Main/CarePartner/Resources/ResourceList';
import ActivitiesList from '../../Screens/Main/CarePartner/Support/ActivitiesList';
import SupportDetail from '../../Screens/Main/CarePartner/Support/SupportDetail';
import SupportPersonList from '../../Screens/Main/CarePartner/Support/SupportPersonList';
import NotificationList from '../../Screens/Main/CarePartner/Notification/NotificationList';
import NotificationDetails from '../../Screens/Main/CarePartner/Notification/NotificationDetails';
import EditSupport from '../../Components/CarePartner/CarePartnerProfile/EditSupport';
import ChooseSupport from '../../Components/CarePartner/CarePartnerProfile/ChooseSupport';
import InPrevResources from '../../Screens/Main/CarePartner/Resources/InPrevResources';
import InPrevSupport from '../../Screens/Main/CarePartner/Support/InPrevSupport';
import UploadDoc from '../../Components/CarePartner/Vault/Careteam/UploadDoc';

import EditHeight from '../../Screens/Main/CarePartner/Journey/EditHeight';
import SupportForm from '../../Screens/Main/CarePartner/Support/SupportForm';
import PreviousSupportDetails from '../../Screens/Main/CarePartner/Support/PreviousSupportDetails';
import InProcessDetails from '../../Screens/Main/CarePartner/Support/InprocessDetails';
import CarepartnerEditSupport from '../../Screens/Main/CarePartner/CarePartnerProfile/CarepartnerEditSupport';
import Addsupport from '../../Screens/Main/CarePartner/CarePartnerProfile/CarePartnerAddSupport';
import RequestedResourceDetails from '../../Screens/Main/CarePartner/Resources/RequestedResourceDetails';


const Menu = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

const MenuStack = ({ route }) => {

    return (
        <Menu.Navigator

            screenOptions={screenOptions}>

            <Menu.Screen name="FAQ" component={FAQ} />
            <Menu.Screen name="AboutUs" component={AboutUs} />
            <Menu.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Menu.Screen name="Settings" component={Settings} />
            <Menu.Screen name="Journey" component={Journey} />
            <Menu.Screen name="EditWeight" component={EditWeight} />
            <Menu.Screen name="EditTemperature" component={EditTemperature} />
            <Menu.Screen name="EditProfile" component={EditProfile} />
            <Menu.Screen name="EditBloodPressure" component={EditBloodPressure} />
            <Menu.Screen name="EditGlucose" component={EditGlucose} />
            <Menu.Screen name="CarePartnerProfile" component={CarePartnerProfile}/>
            <Menu.Screen name="CarePartnerEditProfile" component={CarePartnerEditProfile}/>
            <Menu.Screen name="SelectResource" component={SelectResource}/>
            <Menu.Screen name="FilterResource" component={FilterResource}/>

            <Menu.Screen name="ResourceList" component={ResourceList}/>
            <Menu.Screen name="ResourceDetail" component={ResourceDetail}/>
            <Menu.Screen name="ActivitiesList" component={ActivitiesList}/>
            <Menu.Screen name="SupportDetail" component={SupportDetail}/>
            <Menu.Screen name="SupportPersonList" component={SupportPersonList}/>
            <Menu.Screen name="InprocessDetails" component={InProcessDetails}/>
            <Menu.Screen name="PreviousSupportDetails" component={PreviousSupportDetails}/>
            <Menu.Screen name="NotificationList" component={NotificationList}/>
            <Menu.Screen name="NotificationDetails" component={NotificationDetails}/>
            <Menu.Screen name="EditSupport" component={EditSupport}/>
            <Menu.Screen name="ChooseSupport" component={ChooseSupport}/>
            <Menu.Screen name="InPrevResources" component={InPrevResources}/>
            <Menu.Screen name="InPrevSupport" component={InPrevSupport}/>
            <Menu.Screen name="SupportForm" component={SupportForm}/>
            <Menu.Screen name="UploadDoc" component={UploadDoc}/>
            <Menu.Screen name="EditHeight" component={EditHeight}/>
            <Menu.Screen name="CarepartnerEditSupport" component={CarepartnerEditSupport}/>
            <Menu.Screen name="CarepartnerSupportAdd" component={Addsupport}/>
            <Menu.Screen name="RequestedResourceDetails" component={RequestedResourceDetails}/>
        </Menu.Navigator>
    )
}


export default MenuStack;
