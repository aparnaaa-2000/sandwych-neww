import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {Card} from 'react-native-paper';
import {
  BORDERCOLOR1,
  BORDERCOLOR8,
  PRIMARYCOLOR,
  PUREWHITE,
  SECONDARYTEXTCOLOR3,
  SIXTHCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR11,
  TEXTCOLOR13,
  TEXTCOLOR5,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import {
  AnalogClock,
  GreyHourGlass,
  GreyLocation,
  Maps,
  RoundGreenPhone,
} from '../../../../assets';
import {fontSize} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import useNotification from '../../../hooks/fnhooks/useNotifications';
import useTaskList from '../../../hooks/apihooks/useTaskList';

const UpcomingCard = ({navigation}) => {
  const onNavigateToDetail = itemArray => {
    if (!itemArray || !Array.isArray(itemArray) || itemArray.length === 0) {
      // Handle the case where itemArray is undefined or empty
      console.error('Item Array is undefined or empty');
      return;
    }

    // Assuming the array contains one item
    const item = itemArray[0];

    // Destructure the fields from the item object
    const {
      address,
      approval_status,
      completion_status,
      created_at,
      id,
      note,
      patient_id,
      rating,
      reason,
      reason_note,
      rejection_reason,
      requestedUser,
      requestedUserCity,
      requestedUserEmail,
      requestedUserLanguages,
      requestedUserNumber,
      requestedUserRole,
      requested_datetime,
      response_datetime,
      scheduled_date,
      scheduled_time,
      service_opinion,
      support,
      support_id,
      support_member_id,
      task_end_time,
      task_start_time,
      updated_at,
      user_id,
      zipcode,
    } = item;

    // Create an object with the destructured values
    const detailedItem = {
      address,
      approval_status,
      completion_status,
      created_at,
      id,
      note,
      patient_id,
      rating,
      reason,
      reason_note,
      rejection_reason,
      requestedUser,
      requestedUserCity,
      requestedUserEmail,
      requestedUserLanguages,
      requestedUserNumber,
      requestedUserRole,
      requested_datetime,
      response_datetime,
      scheduled_date,
      scheduled_time,
      service_opinion,
      support,
      support_id,
      support_member_id,
      task_end_time,
      task_start_time,
      updated_at,
      user_id,
      zipcode,
    };

    // Pass the detailedItem object to the SupportTaskDetails screen
    navigation.navigate('SupportTaskDetails', {data: detailedItem});
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [tasklist, setTaskList] = useState([]);

  useEffect(() => {
    const TaskListApi = async () => {
      try {
        const res = await useTaskList();
        if (res && res.tasks && res.tasks.length > 0) {
          setTaskList([res.tasks[0]]); // Set only the first task
        }
        console.log('RES_DATA', res);
      } catch (error) {
        console.log('error code...', error);
      }
    };

    TaskListApi();
  }, []);

  return (
    <View style={styles.flatListLayer}>
      {tasklist && tasklist.length > 0 ? (
        <View style={styles.dateLayer}>
          <Text style={styles.dateText}>UPCOMING TASK</Text>
        </View>
      ) : null}

      {tasklist.length > 0 && (
        <View style={{margin: DEFAULTWIDTH * 0.02}}>
          {/* ROW */}
          <TouchableOpacity
            onLongPress={() => {
              console.log('on long pressed');
            }}
            onPress={() => {
              onNavigateToDetail(tasklist);
            }}
            style={styles.renderItemRow}>
            {/* First Container */}
            <View style={styles.leftContainer}>
              <Text style={styles.timeText}>{tasklist[0].scheduled_time}</Text>
            </View>

            {/* Second Container */}
            <View style={styles.rightContainer}>
              {/* Top Layer */}
              <View style={styles.rightTopContainer}>
                <GreyLocation width={16} height={16} />
                <Text
                  style={[styles.roleText, {marginLeft: DEFAULTWIDTH * 0.02}]}>
                  {tasklist[0].address}
                </Text>
              </View>

              {/* Slight BorderLine */}
              <View
                style={{
                  width: '100%',
                  backgroundColor: BORDERCOLOR1,
                  height: 0.5,
                  marginTop: DEFAULTWIDTH * 0.02,
                }}></View>

              {/* Middle Layer */}
              <View style={{margin: DEFAULTWIDTH * 0.04}}>
                <Text style={styles.titleText}>{tasklist[0].support}</Text>
              </View>

              {/* Bottom Layer */}
              <View style={styles.rightBottomLayer}>
                <View>
                  <Text style={styles.personText}>
                    {tasklist[0].requestedUser}
                  </Text>
                  <Text style={styles.roleText}>
                    {tasklist[0].requestedUserRole}
                  </Text>
                </View>
                <RoundGreenPhone />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{marginBottom: DEFAULTHEIGHT * 0.01}}></View>
        </View>
      )}
    </View>
  );
};

const styles = new StyleSheet.create({
  mainConainter: {
    marginVertical: DEFAULTHEIGHT * 0.01,
    marginHorizontal: DEFAULTWIDTH * 0.02,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headTitle: {
    fontSize: 16,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR10,
  },
  headSubText: {
    fontFamily: FONTS.FontMedium,
    fontSize: 12,
    color: TEXTCOLOR11,
  },
  cardLayout: {
    backgroundColor: PUREWHITE,
    marginVertical: DEFAULTWIDTH * 0.02,
  },
  cardHeader: {flexDirection: 'row', margin: DEFAULTWIDTH * 0.02},
  timeLayout: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 18,
    fontFamily: FONTS.FontLight,
    color: PRIMARYCOLOR,
  },
  horizontalDivider: {
    marginHorizontal: DEFAULTWIDTH * 0.02,
    width: 0.5,
    height: 'auto',
    backgroundColor: BORDERCOLOR8,
  },
  titleText: {
    fontSize: 20,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
  },
  locationText: {
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
  },
  splitVerticalLine: {
    height: 0.4,
    width: 'auto',
    backgroundColor: BORDERCOLOR8,
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTWIDTH * 0.02,
  },

  profileOverLay: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    backgroundColor: PRIMARYCOLOR,
    alignSelf: 'center',
  },
  rowItems: {flexDirection: 'row', alignItems: 'center'},

  profileText: {
    fontSize: 8,
    fontFamily: FONTS.FontSemiB,
    color: PUREWHITE,
  },
  footerUser: {
    fontSize: 10,
    fontFamily: FONTS.FontRegular,
    color: SECONDARYTEXTCOLOR3,
  },
  timeLeft: {
    marginRight: DEFAULTWIDTH * 0.01,
    fontSize: 12,
    fontFamily: FONTS.FontRegular,
    color: SIXTHCOLOR,
  },

  // Upcoming Task New UI

  flatListLayer: {
    flex: 1,
    backgroundColor: PRIMARYCOLOR,
    marginVertical: DEFAULTHEIGHT * 0.01,
  },
  dateText: {
    fontFamily: FONTS.FontSemiB,
    color: PUREWHITE,
    fontSize: fontSize(16),
  },
  dateLayer: {
    marginTop: DEFAULTHEIGHT * 0.01,
    marginLeft: DEFAULTWIDTH * 0.05,
  },

  // Rendering Upcoming Card
  renderItemRow: {
    flexDirection: 'row',
    width: DEFAULTWIDTH * 0.9,
    alignSelf: 'center',
    flex: 1,
  },
  leftContainer: {
    backgroundColor: PUREWHITE,
    marginRight: DEFAULTWIDTH * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flex: 0.25,
  },
  timeText: {
    fontFamily: FONTS.FontBold,
    fontSize: fontSize(14),
    color: TEXTCOLOR10,
  },
  rightContainer: {
    backgroundColor: PUREWHITE,
    flex: 0.75,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  rightTopContainer: {
    marginRight: DEFAULTWIDTH * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: DEFAULTWIDTH * 0.02,
  },
  titleText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(16),
    color: PRIMARYCOLOR,
  },
  rightBottomLayer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: DEFAULTWIDTH * 0.04,
    marginRight: DEFAULTWIDTH * 0.04,
    marginBottom: DEFAULTWIDTH * 0.04,
  },
  personText: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(12),
    color: TEXTCOLOR10,
  },
  roleText: {
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR13,
  },
});

export default UpcomingCard;
