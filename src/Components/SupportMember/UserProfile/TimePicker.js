// TimePickerModal.js
import React, {useState, useRef, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR15,
  TEXTCOLOR5,
} from '../../../Constants/Colors/Colors';
import {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {FONTS} from '../../../Constants/Fonts';
import {fontSize} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const ITEM_HEIGHT = 40;
const {height} = Dimensions.get('window');
const VISIBLE_ITEMS = 3; // Number of visible items at a time

const TimePicker = ({visible, onClose, onConfirm}) => {
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');
  const [period, setPeriod] = useState('AM');

  const hours = Array.from({length: 12}, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
  const minutes = Array.from({length: 60}, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const periods = ['AM', 'PM'];

  const hourListRef = useRef(null);
  const minuteListRef = useRef(null);
  const periodListRef = useRef(null);

  const getAdjustedIndex = (index, length) => {
    const middleIndex = Math.floor(VISIBLE_ITEMS / 2);
    return Math.min(index, length - middleIndex - 1);
  };

  const scrollToIndex = (ref, index, length) => {
    const adjustedIndex = getAdjustedIndex(index, length);
    if (ref.current) {
        ref.current.scrollToIndex({ index: adjustedIndex, animated: true });
      }
  };

  const renderItem = (item, selectedValue, setSelectedValue, ref, data) => {
    const isSelected = item === selectedValue;
    return (
      <TouchableOpacity
        key={item}
        onPress={() => {
          setSelectedValue(item);
          scrollToIndex(ref, data.indexOf(item), data.length);
        }}
        style={[styles.item, isSelected && styles.selectedItem]}>
        <Text style={[styles.itemText, isSelected && styles.selectedItemText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    // Initial scroll to selected values
    scrollToIndex(hourListRef, hours.indexOf(hour), hours.length);
    scrollToIndex(minuteListRef, minutes.indexOf(minute), minutes.length);
    scrollToIndex(periodListRef, periods.indexOf(period), periods.length);
  }, []);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Select Time</Text>
          <View style={styles.pickerContainer}>
            <FlatList
              ref={hourListRef}
              data={hours}
              keyExtractor={item => item}
              style={styles.picker}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
                renderItem(item, hour, setHour, hourListRef, hours)
              }
              contentContainerStyle={{
                paddingVertical: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
              }}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
            />
            <Text style={styles.separator}>:</Text>
            <FlatList
              ref={minuteListRef}
              data={minutes}
              keyExtractor={item => item}
              style={styles.picker}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
                renderItem(item, minute, setMinute, minuteListRef, minutes)
              }
              contentContainerStyle={{
                paddingVertical: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
              }}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
            />
            <FlatList
              ref={periodListRef}
              data={periods}
              keyExtractor={item => item}
              style={styles.picker}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              renderItem={({item}) =>
                renderItem(item, period, setPeriod, periodListRef, periods)
              }
              contentContainerStyle={{
                paddingVertical: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
              }}
              getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => onConfirm(`${hour}:${minute} ${period}`)}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: DEFAULTWIDTH * 0.9,
    padding: DEFAULTWIDTH * 0.06,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 80,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
  },
  separator: {
    fontSize: fontSize(24),
    fontFamily: FONTS.FontExtraBold,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    borderRadius: 20,
    backgroundColor: TEXTCOLOR5,
  },
  buttonText: {
    fontSize: fontSize(18),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',

    marginRight: DEFAULTWIDTH * 0.02,
  },
  itemText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(16),
    color: TEXTCOLOR15
  },
  selectedItem: {
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 5,
  },
  selectedItemText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(20),
    color: PUREWHITE,
  },
});

export default TimePicker;
