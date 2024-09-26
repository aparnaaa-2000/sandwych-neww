import React, { useState,useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { BACKGROUNDWHITE, FOURTHCOLOR, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';

import MainHeader from '../../../../Components/Common/Headers/MainHeader';
import TeamList from '../../../../Components/CarePartner/Vault/Careteam/TeamList'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import DashboardHeader from '../../../../Components/Common/Headers/DashboardHeader';
import CustomSidebarMenu from '../../../../Components/CarePartner/SideMenu/CustomSideMenuBar';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { LEGALDOC } from '../../../../Components/CarePartner/Vault/Careteam/CareTeam';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import TeamList from '../../Components/Careteam/TeamList';


const Drawer = createDrawerNavigator();


const CareTeamScreen = () => (
  <Drawer.Navigator
    screenOptions={{ headerShown: false }}
    drawerContent={props => <CustomSidebarMenu {...props} />}>
    <Drawer.Screen name="CareTeamMain" component={CareTeamMain} />
  </Drawer.Navigator>
);

const CareTeamMain = ({ navigation }) => {

  const [valueTeam, setValueTeam] = useState('Care team Documents');
  const [DocList, setDocList] = useState(LEGALDOC);
  const [UserType, setUserType] = useState(null)

  useEffect(() => {
    getItemFromAsyncStorage()
  }, [])

  // Assume you want to get an item with the key 'exampleKey'
  const getItemFromAsyncStorage = async () => {
    try {
      // Use AsyncStorage.getItem() to retrieve the value associated with the key
      const storedValue = await AsyncStorage.getItem('UserType');
      console.log("user type....................", storedValue)
      if (storedValue !== null) {
        setUserType(storedValue)
      } else {
        // Key does not exist in AsyncStorage
        console.log('Key does not exist in AsyncStorage');
      }
    } catch (error) {

    }
  };
  

  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
 
      <View style={{ backgroundColor: BACKGROUNDWHITE, margin: GlobalSize(10) }}>
        <DashboardHeader navigation={navigation} />
        <View style={DEFAULTSTYLES.lineBorder} />
        {UserType == 'carepartner' &&
        <MainHeader navigation={navigation} />}
      </View>

      <View style={styles.container}>
        <TeamList DocList={DocList} setDocList={setDocList} valueTeam={valueTeam} setValueTeam={setValueTeam} />
      </View>

 {(valueTeam === 'Care team Documents' || valueTeam === 'Medical History') &&
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.touchBtn}
          onPress={() => navigation.navigate('AddCareTeam')}>
          <Text style={styles.textBtn}>+</Text>
        </TouchableOpacity>
      </View>}
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center',
  },
  textBtn: {
    fontSize: fontSize(24),
    color: PUREWHITE,
    fontFamily: FONTS.FontLight,
  },
  touchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.12,
    height: DEFAULTWIDTH * 0.12,
    backgroundColor: FOURTHCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(20),
    marginLeft: GlobalSize(10),
    marginRight: GlobalSize(10),
  },
  buttonView: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    right: GlobalSize(10),
    position: 'absolute',
    bottom: 0
  }
})
export default CareTeamScreen