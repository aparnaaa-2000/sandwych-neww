import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';

//IMPORT CONSTANTS
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../../Constants/styles/styles';
import {FONTS} from '../../../../Constants/Fonts';
import {PRIMARYCOLOR} from '../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import SeperateTask from './SeperateTask';

const TaskTimeList = ({time, day}) => {


  return (
    <View style={styles.contentContainer}>
      <View style={{marginRight: DEFAULTWIDTH * 0.05}}>
        <Text style={styles.timeText}>{time?.time}</Text>
      </View>
      <View style={styles.lineVertical} />
      <FlatList
      data={time?.tasks}
      renderItem={({ item }) => <SeperateTask task={item} />}
      keyExtractor={(task) => task.id.toString()}
    />
      <View>

        {time?.task?.map((item)=>{

          return(
            <View key={item.id}>
              <SeperateTask task={item} day={day}/>
              </View>
          )
        })}
      </View>
    </View>
  );
};
const styles = new StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    marginTop: DEFAULTHEIGHT * 0.0,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom:GlobalSize(10)
  },
  timeText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
    color: PRIMARYCOLOR,
  },
  lineVertical: {
    height: 'auto',
    width: DEFAULTWIDTH * 0.002,
    marginRight: DEFAULTWIDTH * 0.02,
    backgroundColor: PRIMARYCOLOR,
  },
});

export default TaskTimeList;
