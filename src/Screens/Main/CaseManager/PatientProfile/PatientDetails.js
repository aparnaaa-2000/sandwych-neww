import React from 'react';
import {Text,View,StyleSheet,SafeAreaView,StatusBar,Dimensions,ScrollView} from 'react-native';

import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader';
import { FONTS } from '../../../../Constants/Fonts';
import PatientDetailCard from '../../../../Components/CaseManager/Profile/PatientDeatils/PatientDetailCard';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { TEXTCOLOR7,BACKGROUNDWHITE } from '../../../../Constants/Colors/Colors';



const PatientDetails = () => {
  return (

    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>

    <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} />

    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>

        <View style={{marginBottom:DEFAULTWIDTH*0.07}}>
                <PatientHeader Header={'Patient'}/>
      
        </View>
        <View style={{margin:10}}>
            <Text style={styles.textDetails}>Details</Text>
        </View>

        <PatientDetailCard/>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        padding: 15
    },
    textDetails:{
        fontSize:25,
        fontFamily:FONTS.FontSemiB,
        color:TEXTCOLOR7
    }
})

export default PatientDetails;