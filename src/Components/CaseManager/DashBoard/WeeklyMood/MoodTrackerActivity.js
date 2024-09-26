import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR3,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR2,
  BORDERCOLOR1,
  GREYBACKGROUND1,
  TEXTCOLOR10,
  VALIDCOLOR
} from '../../../../Constants/Colors/Colors';

import {
  BalancedFace,
  Book,
  BookWhite,
  Calendar,
  CalendarWhite,
  Car,
  CarWhite,
  Cart,
  CartWhite,
  DarkGreenFace,
  Doc,
  DocWhite,
  Family,
  FamilyWhite,
  FoodBowl,
  FoodBowlWhite,
  GloomyFace,
  GreenFace,
  Gym,
  GymWhite,
  HappyFace,
  Massage,
  MassageWhite,
  Music,
  MusicWhite,
  OrangeFace,
  PleasentFace,
  RedFace,
  Rx,
  RxWhite,
  SadFace,
  Sleep,
  SleepWhite,
  SuitCase,
  SuitCaseWhite,
  TvPlay,
  TvPlayWhite,
  VaccumCleaner,
  VaccumCleanerWhite,
  YellowFace,
  Yoga,
  YogaWhite,
} from '../../../../../assets';
// import Calendar from '../../Widgets/Calendar';
import { Button, Card, Modal } from 'react-native-paper';
import MainHeader from '../../../Common/Headers/MainHeader';
import { ScrollView } from 'react-native';
import { FONTS } from '../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MoodTrackerActivity = ({ navigation }) => {
  // Get the current date
  const currentDate = new Date();

  // Extract the day, month, and year
  const day = currentDate.getDate();

  // const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const [selectedMood, setSelectedMood] = useState(''); // Initialize with an empty mood
  const [NoteStatus, setNoteStatus] = useState(true)
  const [visible, setVisible] = React.useState(false);
  const [description, setDescription] = useState('');

  const moveToCalendar = () => {

    if (description) {
      navigation.navigate('MoodCalendar', { MOODVALUE: true, MOOD: description });
    } else {
      setNoteStatus(false)
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleMoodSelect = mood => {
    setSelectedMood(mood);
  };

  //16 Daily Taskls
  const dailyTasksComponents = [
    {
      id: 1,
      component: <Book width={30} height={30} />,
      selComponent: <BookWhite width={30} height={30} />,
      name: 'Book',
    },
    {
      id: 2,
      component: <TvPlay width={30} height={30} />,
      selComponent: <TvPlayWhite width={30} height={30} />,
      name: 'Watch TV',
    },
    {
      id: 3,
      component: <VaccumCleaner width={30} height={30} />,
      selComponent: <VaccumCleanerWhite width={30} height={30} />,
      name: 'Clean',
    },
    {
      id: 4,
      component: <Music width={30} height={30} />,
      selComponent: <MusicWhite width={30} height={30} />,
      name: 'Music',
    },
    {
      id: 5,
      component: <SuitCase width={30} height={30} />,
      selComponent: <SuitCaseWhite width={30} height={30} />,
      name: 'Work',
    },
    {
      id: 6,
      component: <Cart width={30} height={30} />,
      selComponent: <CartWhite width={30} height={30} />,
      name: 'Shop',
    },
    {
      id: 7,
      component: <Calendar width={30} height={30} />,
      selComponent: <CalendarWhite width={30} height={30} />,
      name: 'Appointment',
    },
    {
      id: 8,
      component: <Car width={30} height={30} />,
      omponent: <CarWhite width={30} height={30} />,
      name: 'Drive',
    },
    {
      id: 9,
      component: <Doc width={30} height={30} />,
      selComponent: <DocWhite width={30} height={30} />,
      name: 'Paperwork',
    },
    {
      id: 10,
      component: <Rx width={30} height={30} />,
      selComponent: <RxWhite width={30} height={30} />,
      name: 'Pharmacy',
    },
    {
      id: 11,
      component: <Yoga width={30} height={30} />,
      selComponent: <YogaWhite width={30} height={30} />,
      name: 'Meditate',
    },
    {
      id: 12,
      component: <Gym width={30} height={30} />,
      selComponent: <GymWhite width={30} height={30} />,
      name: 'Exercise',
    },
    {
      id: 13,
      component: <FoodBowl width={30} height={30} />,
      selComponent: <FoodBowlWhite width={30} height={30} />,
      name: 'Ate Healthy',
    },
    {
      id: 14,
      component: <Sleep width={30} height={30} />,
      selComponent: <SleepWhite width={30} height={30} />,
      name: 'Good Sleep',
    },
    {
      id: 15,
      component: <Massage width={30} height={30} />,
      selComponent: <MassageWhite width={30} height={30} />,
      name: 'Relax',
    },
    {
      id: 16,
      component: <Family width={30} height={30} />,
      selComponent: <FamilyWhite width={30} height={30} />,
      name: 'Family',
    },
  ];

  //NOTE VALIDATION
  const handleNoteChange = (text) => {
    const isValid = /^[A-Za-z1234567890 ,./-_()&@;:\s]{2,50}$/.test(text);
    setNoteStatus(isValid)
    setDescription(text);
  };

  //   const numItemsPerRow = 4;

  const SelectionComponent = () => {
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleItemSelection = itemId => {
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter(id => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    };



    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          {dailyTasksComponents.map(item => (
            <Card
              key={item.id}
              style={[
                styles.card,
                //   selectedItems.includes(item.id) && styles.selectedCard,
              ]}>
              <TouchableOpacity
                onPress={() => toggleItemSelection(item.id)}
                style={[
                  styles.cardView,
                  selectedItems.includes(item.id) && styles.selectedCard,
                ]}>
                <View style={{ marginTop: -10 }}>
                  {selectedItems.includes(item.id)
                    ? item.selComponent
                    : item.component}
                </View>
                <Text
                  style={[
                    styles.cardText,
                    selectedItems.includes(item.id) && { color: PUREWHITE },
                  ]}>
                  {item.name}
                </Text>

                {/* <Card.Content></Card.Content> */}
              </TouchableOpacity>
            </Card>
          ))}
        </View>
        <Button
          disabled={selectedItems.length != 0 ? false : true}
          onPress={showModal}
          style={[
            selectedItems.length != 0
              ? styles.buttonStyleActive
              : styles.buttonStyle,
          ]}>
          <Text
            style={[
              { fontFamily: 'Inter-Medium', fontSize: 14 },
              { color: selectedItems.length != 0 ? PUREWHITE : '#CAD1D8' },
            ]}>
            Continue
          </Text>
        </Button>
      </View>
    );
  };

  //Here all the mood Icons are defined according the selected
  const getIconComponent = (mood, isSelected) => {
    switch (mood) {
      // ... Cases to set patients mood
      case 'Happy':
        return isSelected ? (
          <DarkGreenFace width={44} height={44} />
        ) : (
          <HappyFace width={40} height={40} />
        );
      case 'Pleasent':
        return isSelected ? (
          <GreenFace width={44} height={44} />
        ) : (
          <PleasentFace width={40} height={40} />
        );
      case 'Balanced':
        return isSelected ? (
          <YellowFace width={44} height={44} />
        ) : (
          <BalancedFace width={40} height={40} />
        );
      case 'Gloomy':
        return isSelected ? (
          <OrangeFace width={44} height={44} />
        ) : (
          <GloomyFace width={40} height={40} />
        );
      case 'Sad':
        return isSelected ? (
          <RedFace width={44} height={44} />
        ) : (
          <SadFace width={40} height={40} />
        );

      default:
        return <SadFace width={26} height={26} />;
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      style={{ backgroundColor: BACKGROUNDWHITE }}
      showsVerticalScrollIndicator={false}>

      { }
      <View style={styles.mainContainer}>


        <MainHeader navigation={navigation} />

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            {month} {day}, {year}
          </Text>
        </View>
        <View>
          <Text style={styles.subHeading}>Select Mood</Text>
        </View>
        <View
          style={styles.moodView}>
          <TouchableOpacity onPress={() => handleMoodSelect('Happy')}>
            {getIconComponent('Happy', selectedMood === 'Happy')}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoodSelect('Pleasent')}>
            {getIconComponent('Pleasent', selectedMood === 'Pleasent')}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoodSelect('Balanced')}>
            {getIconComponent('Balanced', selectedMood === 'Balanced')}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoodSelect('Gloomy')}>
            {getIconComponent('Gloomy', selectedMood === 'Gloomy')}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMoodSelect('Sad')}>
            {getIconComponent('Sad', selectedMood === 'Sad')}
          </TouchableOpacity>
          {/* Repeat the above pattern for other moods */}
        </View>
        <View>
          <Text style={{ color: TEXTCOLOR2 }}>What has Betty done today? Select all that apply:</Text>
        </View>
        <View>
          <SelectionComponent />
        </View>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          style={DEFAULTSTYLES.alignView}
        // style={{width: '100%', height: 150}}
        >
          <KeyboardAvoidingView style={{ flex: 0 }}>
            <View
              style={styles.modalView}>
              <Text style={styles.textNote}>
                Add Note for Today's Mood
              </Text>
              <View style={[styles.viewInput, { borderColor: NoteStatus ? BORDERCOLOR1 : VALIDCOLOR }]}>
                <TextInput
                  value={description}
                  onChangeText={(text) => handleNoteChange(text)}
                  numberOfLines={10}
                  keyboardType="default"
                  multiline
                  style={styles.textStyle}
                />
              </View>

              {!NoteStatus &&
                <View>
                  <Text style={{ color: VALIDCOLOR, fontSize: fontSize(12) }}>Please add your note</Text>
                </View>}
              <TouchableOpacity                style={styles.buttonStyleActive}
                onPress={() => moveToCalendar()}>
                <Text
                  style={styles.textSave}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: GlobalSize(10),
  },
  card: {
    width: DEFAULTWIDTH * 0.2,
    height: 80,
    // borderWidth: 0.5,
    backgroundColor: PUREWHITE,
    margin: 5,
    borderColor: 'lightgray',
    borderRadius: 6,
  },
  modalView: {
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.96,
    // alignItems:'center',
    //justifyContent:'center',
    borderRadius: GlobalSize(25),
    padding: GlobalSize(20)
  },
  cardView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    color: PUREWHITE,
  },
  cardText: {
    fontSize: fontSize(12),
    position: 'absolute',
    bottom: 10,
    color: TEXTCOLOR2
  },
  selectedCard: {
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 6,
    // Change to your desired highlight color
  },
  viewInput: {
    width: DEFAULTWIDTH * 0.85,
    height: DEFAULTWIDTH * 0.50,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    backgroundColor: PUREWHITE,
    marginTop: GlobalSize(10),
    marginBottom: GlobalSize(5)
  },
  textNote: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(18),
    color: TEXTCOLOR2
  },
  textStyle: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
    textAlignVertical:'top',
    paddingTop:GlobalSize(10)
  },
  mainContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: BACKGROUNDWHITE,
    padding: 10,
  },
  moodView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  subContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(20),
    color: TEXTCOLOR10,
  },
  subHeading: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
    color: TEXTCOLOR10,
  },
  buttonStyle: {
    width: '100%',
    height: 40,
    borderWidth: 0.5,
    borderColor: '#CAD1D8',
    borderRadius: 8,
  },
  buttonStyleActive: {
    width: '100%',
    height: 40,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: 8,
    marginTop: GlobalSize(15)
  },
});

export default MoodTrackerActivity;
