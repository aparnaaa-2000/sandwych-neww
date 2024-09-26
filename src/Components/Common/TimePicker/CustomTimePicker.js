import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { BORDERCOLOR1, PRIMARYCOLOR, PUREWHITE } from '../../../Constants/Colors/Colors';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { FONTS } from '../../../Constants/Fonts';

const CustomTimePicker = () => {
  const [chosenDate, setChosenDate] = useState(new Date());
  const [PickerOpen, setPickerOpen] = useState(false)
  const [date, setDate] = useState(new Date())

  return (

    <View>
      {!PickerOpen ?
        <TouchableOpacity onPress={() => setPickerOpen(true)}>
          <View style={styles.viewMain}>

            <View style={styles.timeView}>
              <Text style={styles.timeText}>{moment(date).format('hh')}</Text>
            </View>
            <View style={{ marginLeft: GlobalSize(10), marginRight: GlobalSize(10) }}>
              <Text style={styles.timeText}>:</Text>
            </View>
            <View style={[styles.timeView,{marginRight:GlobalSize(10)}]}>
              <Text style={styles.timeText}>{moment(date).format('mm')}</Text>
            </View>

            <View>
              <Text style={styles.timeText}>{moment(date).format('A')}</Text>
            </View>
          </View>
        </TouchableOpacity> :

        <View
          style={styles.pickView}>
     <DatePicker
        modal
        theme='light'
        mode='time'
        open={PickerOpen}
        date={date}
        onConfirm={(date) => {
          setPickerOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setPickerOpen(false)
        }}
      />
        </View>}
    </View>
  )
}

export default CustomTimePicker;

const styles = StyleSheet.create({
  timeText: {
    color: PRIMARYCOLOR,
    fontSize: fontSize(12),
    fontFamily:FONTS.FontMedium
  },
  timeView: {
    borderWidth: 1,
    borderRadius: GlobalSize(5),
    borderColor:BORDERCOLOR1,
    width: GlobalSize(35),
    height: GlobalSize(35),
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewMain: {
    flexDirection: 'row',
    marginBottom: GlobalSize(20),
    alignItems:'center',
    marginLeft:GlobalSize(30)
  }
})