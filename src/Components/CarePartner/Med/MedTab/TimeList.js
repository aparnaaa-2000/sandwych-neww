
import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import MedicationList from './MedicationList';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const TimeList = ({ time, day, navigation,itemState, }) => {


  return (
    <View style={styles.contentContainer}>
      {time?.tasks?.length > 0 && 
      <View style={{ marginRight: DEFAULTWIDTH * 0.02,marginRight:GlobalSize(10)}}>
        <Text style={styles.timeText}>{time?.time}</Text>
      </View>}

      {time?.tasks?.length > 0 && 
      <View style={styles.lineVertical} />}
      <View>
   
        {time?.tasks?.map((item) => {
          return (
            <View key={item.id}>
              <MedicationList medication={item} navigation={navigation} itemState={itemState} />
            </View>
          )
        })}
        {/* List of medicines at particular time*/}
        {/* <FlatList
          scrollEnabled={false}
          data={time.medicines}
          renderItem={({item}) => <MedicationList medication={item} navigation={navigation}/>}
          keyExtractor={item => item.id}
        /> */}
      </View>
    </View>
  );
};
const styles = new StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    paddingTop: DEFAULTHEIGHT * 0.01,
    paddingHorizontal: DEFAULTWIDTH * 0.02,
    backgroundColor:BACKGROUNDWHITE,
    paddingBottom:GlobalSize(10)
  },
  timeText: {
    fontFamily: FONTS.FontRegular,
    fontSize: 14,
    color: PRIMARYCOLOR,
  },
  lineVertical: {
    height: 'auto',
    width: DEFAULTWIDTH * 0.002,
    marginRight: DEFAULTWIDTH * 0.02,
    backgroundColor: PRIMARYCOLOR,
  },
});

export default TimeList;
