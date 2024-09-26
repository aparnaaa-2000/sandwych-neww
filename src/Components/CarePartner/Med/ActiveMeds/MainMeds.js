import React from 'react'
import { View,StyleSheet} from 'react-native'
import MedicationCard from './MedicationCard'
import MedsTab from './MedsTab'
import { BACKGROUNDWHITE, PUREWHITE } from '../../../../Constants/Colors/Colors'


const MainMeds = ({navigation}) => {
  return (
   <View style={styles.container}>
     <MedicationCard navigation={navigation} />
     <MedsTab />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:BACKGROUNDWHITE
  }
})


export default MainMeds;