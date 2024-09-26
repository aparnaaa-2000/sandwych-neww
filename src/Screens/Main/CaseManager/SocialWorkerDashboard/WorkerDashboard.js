import React from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  BACKGROUNDCOLORH,
  BACKGROUNDCOLORM,
  BACKGROUNDWHITE,
  BORDERCOLORH,
  BORDERCOLORM,
  FOURTHCOLOR,
  LINECOLOR1,
  TEXTCOLORH,
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES from '../../../../Constants/styles/styles';
import DashboardHeader from '../../../../Components/Common/Headers/DashboardHeader';
import {GlobalSize} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import DailyGoals from '../../../../Components/CarePartner/Home/DailyGoals';
import DashboardList from '../../../../Components/CaseManager/DashBoard/DashBoardList';
import CaseManagerHeader from '../../../../Components/Common/Headers/CaseManagerHeader';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from '../../../../Components/CarePartner/SideMenu/CustomSideMenuBar';
import WeeklyMood from '../../../../Components/CaseManager/Home/WeeklyMood';
import DefaultBackHeader from '../../../../Components/Common/Headers/DefaultBackHeader';
import CaregivingResources from '../../../../Components/CarePartner/Home/CaregivingResources';
import FromCommunity from '../../../../Components/CarePartner/Home/FromCommunity';

const Drawer = createDrawerNavigator();

const WorkerDashboard = () => (
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    drawerContent={props => <CustomSidebarMenu {...props} />}>
    <Drawer.Screen name="HomeScreen" component={WorkerDashboardView} />
  </Drawer.Navigator>
);

const WorkerDashboardView = ({navigation}) => {
  const SDOHData = [
    {
      id: 1,
      image: require('../../../../../assets/Images/SDOH1.png'),
      Title: 'Economic Stability',
      RiskStatus: 'High Risk',
      borderColor: BORDERCOLORH,
      backgroundColor: BACKGROUNDCOLORH,
      TextColor: TEXTCOLORH,
    },
    {
      id: 2,
      image: require('../../../../../assets/Images/SDOH2.png'),
      Title: 'Neighbourhood',
      RiskStatus: 'Medium Risk',
      borderColor: BORDERCOLORM,
      backgroundColor: BACKGROUNDCOLORM,
      TextColor: FOURTHCOLOR,
    },
  ];

  const MedData = [
    {
      id: 1,
      image: require('../../../../../assets/Images/SDOH1.png'),
      Title: 'Food',
      RiskStatus: 'High Risk',
      borderColor: BORDERCOLORH,
      backgroundColor: BACKGROUNDCOLORH,
      TextColor: TEXTCOLORH,
    },
    {
      id: 2,
      image: require('../../../../../assets/Images/SDOH2.png'),
      Title: 'Health care',
      RiskStatus: 'Medium Risk',
      borderColor: BORDERCOLORM,
      backgroundColor: BACKGROUNDCOLORM,
      TextColor: FOURTHCOLOR,
    },
  ];
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{margin: GlobalSize(10)}}>
          <DashboardHeader navigation={navigation} />
          <View style={styles.lineBorder} />

          <CaseManagerHeader navigation={navigation} />

          <DailyGoals />
        </View>

        <DashboardList SDOHData={SDOHData} MainHeader={'SDOH'} navigation={navigation} />

        <View style={{marginBottom: GlobalSize(10)}}>
          <DashboardList SDOHData={MedData} MainHeader={'Medication'} navigation={navigation}/>
        </View>
        <WeeklyMood navigation={navigation} />
        <CaregivingResources />
        <FromCommunity />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkerDashboard;

const styles = StyleSheet.create({
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: GlobalSize(1),
    margin: GlobalSize(10),
    marginLeft: GlobalSize(8),
    marginRight: GlobalSize(8),
    marginTop: 0,
  },
});
