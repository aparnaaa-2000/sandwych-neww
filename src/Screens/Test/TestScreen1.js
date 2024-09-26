import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import MainHeader from '../../Components/Common/Headers/MainHeader';
import RxComponent from '../../Components/CarePartner/Home/RxComponent';
import WeeklyMood from '../../Components/CarePartner/Home/WeeklyMood'
import DailyGoals from '../../Components/CarePartner/Home/DailyGoals'
import CaregivingResources from '../../Components/CarePartner/Home/CaregivingResources'
import FromCommunity from '../../Components/CarePartner/Home/FromCommunity'
import { BACKGROUNDWHITE, LINECOLOR1, PRIMARYCOLOR } from '../../Constants/Colors/Colors';
import DashboardHeader from '../../Components/Common/Headers/DashboardHeader';
import UpcomingTasks from '../../Components/CarePartner/Home/UpcomingTasks';
import UpcomingMeds from '../../Components/CarePartner/Home/UpcomingMeds';
import AssessmentProgress from '../../Components/CarePartner/Home/AssessmentProgress';
import { DEFAULTWIDTH } from '../../Constants/styles/styles';
import { SwitchProfile } from '../../../assets';
import ResourceFilterModal from '../../Components/CarePartner/Resources/ResourceFilterModal';
import ActivitySelectionPopup from '../../Components/CarePartner/Support/ActivitySelectionPopup';



const TestScreen1 = ({ navigation }) => {

  const [ModalOpen, setModalOpen] = useState(false)
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: BACKGROUNDWHITE }} showsVerticalScrollIndicator={false}>
        <View style={{ babel: BACKGROUNDWHITE, margin: 10 }}>
          <DashboardHeader navigation={navigation}/>

          <View style={styles.lineBorder} />
          <MainHeader navigation={navigation} />
        </View>
        <AssessmentProgress navigation={navigation} />
        <WeeklyMood navigation={navigation} />
        <DailyGoals />
        <UpcomingMeds />
        <UpcomingTasks />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <RxComponent />
        </View>
        <CaregivingResources />
        <FromCommunity />

      </ScrollView>

      <View style={styles.buttonPost}>
        <TouchableOpacity
          style={styles.buttonTouch}
          onPress={() => navigation.navigate('InPrevResources')}
           >
          <SwitchProfile />
        </TouchableOpacity>
      </View>


    </>
  );
};


export default TestScreen1;


const styles = StyleSheet.create({
  lineBorder: {
    backgroundColor: LINECOLOR1,
    height: 1,
    margin: 10,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 0
  },
  buttonPost: {
    position: 'absolute',
    left: 0,
    right: 16,
    bottom: 10,
    alignItems: 'flex-end'
  },
  buttonTouch: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.12,
    height: DEFAULTWIDTH * 0.12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})