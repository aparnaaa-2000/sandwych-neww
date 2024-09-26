import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

//IMPORT CONSTANTS
import {
  FIFTHCOLOR,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR8,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import {Tablet, ClockLine} from '../../../../assets';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../Constants/styles/styles';


const TaskComplete = selectedDate => {
  const [CurrentDate, setCurrentDate] = useState(new Date());

  const TaskListCom = [
    // DUMMY DATA
    {
      id: 1,
      Title: 'Morning Medication',
      Dosage: 'Daily - (2) 100mg',
      Time: '9:00am',
      Team: '',
      status: 'Unnassigned',
      DateFilter: 'Sat Oct 14 2023',
    },
    {
      id: 2,
      Title: 'Morning Medication',
      Dosage: 'Daily - (2) 100mg',
      Time: '9:00am',
      Team: '',
      status: 'Unnassigned',
      DateFilter: CurrentDate.toDateString(),
    },
    {
      id: 4,
      Title: 'Morning Medication',
      Dosage: 'Daily - (2) 100mg',
      Time: '9:00am',
      Team: '',
      status: 'Unnassigned',
      DateFilter: 'Sun Oct 15 2023',
    },
    {
      id: 5,
      Title: 'Morning Medication',
      Dosage: 'Daily - (2) 100mg',
      Time: '11:00am',
      Team: '',
      status: 'Unnassigned',
      DateFilter: 'Sun Oct 15 2023',
    },
  ];

  return (
    <View>
      {TaskListCom?.length > 0 && (
        <View style={DEFAULTSTYLES.margin}>
          <Text style={[styles.textTask, {fontSize: 12}]}>Completed</Text>
        </View>
      )}

      <View style={styles.alignView}>
        {TaskListCom.map(item => {
          return (
            <>
              {item.DateFilter ===
                selectedDate?.selectedDate.toDateString() && (
                <View
                  style={[
                    styles.ViewToday,
                    {
                      justifyContent: 'flex-start',
                      height: DEFAULTWIDTH * 0.17,
                      borderWidth: 1,
                      borderColor:FIFTHCOLOR,
                      marginBottom: 10,
                    },
                  ]}>
                  <View
                    style={{
                      marginLeft: DEFAULTWIDTH * 0.05,
                      marginRight: DEFAULTWIDTH * 0.035,
                    }}>
                    <Tablet />
                  </View>
                  <View>
                    <Text style={styles.textTitle}>{item.Title}</Text>
                    <View
                      style={{flexDirection: 'row', top: 3, marginBottom: 5}}>
                      <Text style={styles.textSubHead}>{item.Dosage}</Text>

                      <View style={{marginLeft: 5, marginRight: 5, top: 2}}>
                        <ClockLine />
                      </View>
                      <Text style={styles.textSubHead}>{item.Time}</Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 18,
  },
  btnView: {
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.125,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textBtn: {
    fontSize: 12,
    color: PUREWHITE,
    fontWeight: '700',
    fontFamily: FONTS.FontMedium,
    textAlign: 'center',
  },
  textTask: {
    fontFamily: FONTS.FontMedium,
    fontSize: 16,
    fontWeight: '700',
    color: PUREBLACK,
  },

  ViewToday: {
    width: DEFAULTWIDTH * 0.9,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: DEFAULTWIDTH * 0.14,
    backgroundColor: PUREWHITE,
    elevation: 3,
    borderRadius: 8,
    flexDirection: 'row',
  },
  alignView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: DEFAULTWIDTH * 0.0,
  },
  textTitle: {
    fontFamily: FONTS.FontMedium,
    fontSize: 14,
    color: PRIMARYCOLOR,
    fontWeight: '700',
  },
  textSubHead: {
    color: TEXTCOLOR8,
    fontFamily: FONTS.FontRegular,
    fontSize: 12,
    fontWeight: '400',
  },
});

export default TaskComplete;
