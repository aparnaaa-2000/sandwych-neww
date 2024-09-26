import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import Medication from '../../Common/Meds/Medication';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';
import { fontSize, GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const NextMedication = ({ navigation,data }) => {

  const groupTasksByTime = (tasks) => { //FILTER THE TASK BY TIME
    return tasks.reduce((acc, task) => {
        if (!acc[task.time]) {
            acc[task.time] = [];
        }
        acc[task.time].push(task);
        return acc;
    }, {});
};

  // Filter tasks based on status: 0
const filteredTasks = (data?.medications || []).filter(task => task);

// Group the filtered tasks by time
const groupedTasks = groupTasksByTime(filteredTasks);

// Convert the grouped tasks object into an array
const groupedTasksArray = Object.keys(groupedTasks).map((time) => ({
    time,
    tasks: groupedTasks[time],
}));

console.log(groupedTasksArray)

  return (
    <View>
      {/* Header */}
      <View style={DEFAULTSTYLES.subHeaderContainer}>
        <Text
          style={DEFAULTSTYLES.subHeader}>
          Next Medication
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('MedStack', { screen: 'MedsTabScreen' })}
        >
          <Text
            style={DEFAULTSTYLES.seeAll}>
            see all
          </Text>
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View style={styles.contentContainer}>
    
        <View>
          <FlatList
            data={groupedTasksArray}
            renderItem={({ item }) => <Medication medication={item} />}
            keyExtractor={item => item?.time}
          />
        </View>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentContainer: {
    flexDirection: 'row',
    marginTop: DEFAULTHEIGHT * 0.01,
    marginBottom:GlobalSize(10)
  },
  timeText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: PRIMARYCOLOR,
  },
  lineVertical: {
    height: 'auto',
    width: DEFAULTWIDTH * 0.002,
    marginRight: DEFAULTWIDTH * 0.02,
    backgroundColor: PRIMARYCOLOR,
  },
});

export default NextMedication;
