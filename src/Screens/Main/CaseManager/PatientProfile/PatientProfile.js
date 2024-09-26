import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import {BACKGROUNDWHITE} from '../../../../Constants/Colors/Colors';
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader';
import PatientImage from '../../../../Components/CaseManager/Profile/PatientProfile/PatientImage';
import LastDig from '../../../../Components/CaseManager/Profile/PatientProfile/LastDig';
import EpicData from '../../../../Components/CaseManager/Profile/PatientProfile/EpicData';
import DEFAULTSTYLES from '../../../../Constants/styles/styles';

const PatientProfile = ({navigation}) => {
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <PatientHeader navigation = {navigation} Header={'Patient'} />
          <PatientImage navigation={navigation}/>
          <LastDig navigation={navigation}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    padding: 15,
  },
});

export default PatientProfile;
