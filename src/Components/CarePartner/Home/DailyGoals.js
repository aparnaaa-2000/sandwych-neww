import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

//IMPORT PACKAGES
import { Card } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE } from '../../../Constants/Colors/Colors'
import { GDESC, GOALS } from '../../../Constants/Texts'
import { IconFigure } from '../../../../assets'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'


const DailyGoals = ({taskData}) => {

  const [userData,setUserData] = useState([])

  useEffect(() => {
    getData().then(data => {
      setUserData(data)

    });

  }, []);

  const getData = async () => {
    try {
  
      const patientData = await AsyncStorage.getItem('PatientData');

      return {
        patientData: patientData != null ? JSON.parse(patientData) : null,
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        patientData: null
      };
    }
  };


  return (
    <>
    {taskData?.tasks?.length > 0 &&
 
    <Card
        style={styles.container}>
        <View
          style={styles.absoluteContainer}>
          <View style={{justifyContent: 'center'}}>
            <Text
              style={styles.heading}>
              {userData?.patientData?.name} 's {GOALS}
            </Text>
            <Text
              style={styles.desc}>
              {taskData?.completed_tasks}/{taskData?.total_tasks} {GDESC}
            </Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <IconFigure width={80} height={80} />
          </View>
        </View>
        <View
          style={styles.opaqueContainer}></View>
      </Card>}
         </>
  )
}

const styles = new StyleSheet.create({
    container: {
        backgroundColor: PRIMARYCOLOR,
       // height: 150,
        margin: GlobalSize(10),
        padding: GlobalSize(16),
        marginLeft:DEFAULTWIDTH*0.05,
        marginRight:DEFAULTWIDTH*0.05
      },
      absoluteContainer : {
        height: GlobalSize(120),
        width: '100%',
        borderRadius: GlobalSize(12),
        borderColor: PUREWHITE,
        borderWidth: 0.5,
        position: 'absolute',
        padding: GlobalSize(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      heading: {
        color: PUREWHITE,
        fontFamily: 'Inter-Regular',
        fontSize: fontSize(14),
      },
      desc: {
        color: PUREWHITE,
        fontSize: fontSize(24),
        fontFamily: 'Inter-SemiBold',
      },
      opaqueContainer: {
        height: GlobalSize(120),
        backgroundColor: PUREWHITE,
        opacity: 0.3,
        borderRadius: GlobalSize(12),
      }
})

export default DailyGoals