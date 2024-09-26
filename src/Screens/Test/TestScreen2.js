// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import moment from 'moment';

// const TestScreen2 = () => {
//   const [selectedDate, setSelectedDate] = useState(moment());

//   const renderHeader = () => {
//     return (
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handlePrevMonth}>
//           <Text style={styles.headerText}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerText}>
//           {selectedDate.format('MMMM YYYY')}
//         </Text>
//         <TouchableOpacity onPress={handleNextMonth}>
//           <Text style={styles.headerText}>→</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const renderDaysOfWeek = () => {
//     const daysOfWeek = [ 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat', 'Su'];
//     return (
//       <View style={styles.daysOfWeek}>
//         {daysOfWeek.map(day => (
//           <Text key={day} style={styles.dayText}>
//             {day}
//           </Text>
//         ))}
//       </View>
//     );
//   };

//   const renderCalendarDays = () => {
//     const firstDayOfMonth = selectedDate.clone().startOf('month');
//     const daysInMonth = selectedDate.daysInMonth();
//     const startDayOfWeek = firstDayOfMonth.day();

//     const days = [];
//     for (let i = 0; i < startDayOfWeek-1; i++) {
//       days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
//     }

//     for (let day = 1; day <= daysInMonth; day++) {
//       const currentDate = firstDayOfMonth.clone().add(day - 1, 'days');
//       const isDisabled = currentDate.isBefore(moment(), 'day');
//       const isSelected = currentDate.isSame(moment(), 'day');
//       const isDisabledAfter = currentDate.isAfter(moment(), 'day');

//       days.push(
//         <TouchableOpacity
//           key={`day-${day}`}
//           style={[
//             styles.dayCell,
//             // isDisabled && styles.disabledDayCell,
//             isSelected && styles.selectedDayCell,
//             // isDisabledAfter && styles.disabledDayCell,
//           ]}
//           onPress={() => handleDayPress(currentDate)}
//           disabled={isDisabled}
//         >
//           <Text
//             style={[
//               styles.dayText,
//               isSelected && styles.selectedDayText,
//               // isDisabled && styles.disabledDayText,
//               isDisabledAfter && styles.disabledDayText,
//             ]}
//           >
//             {day}
//           </Text>
//         </TouchableOpacity>
//       );
//     }

//     return <View style={styles.daysContainer}>{days}</View>;
//   };

//   const handlePrevMonth = () => {
//     setSelectedDate(selectedDate.clone().subtract(1, 'month'));
//   };

//   const handleNextMonth = () => {
//     setSelectedDate(selectedDate.clone().add(1, 'month'));
//   };

//   const handleDayPress = date => {
//     // Handle day press event here
//   };

//   return (
//     <View style={styles.container}>
//       {renderHeader()}
//       {renderDaysOfWeek()}
//       {renderCalendarDays()}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   daysOfWeek: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   dayText: {
//     textAlign: 'center',
//     fontFamily: "Inter-Medium",
//     color: "#344054"
//   },
//   daysContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   dayCell: {
//     width: '14.28%', // 7 days in a week
//     // aspectRatio: 1,
//     height: "18.28%",
//     justifyContent: 'center',
//     alignItems: 'center',
//     // borderColor: 'lightgray',
//     // borderWidth: 1,
//   },
//   selectedDayCell: {
//     backgroundColor: '#F2F4F7',
//     // width: 40,
//     // height: 40,
//     // borderRadius: 40
//   },
//   disabledDayCell: {
//     // backgroundColor: 'lightgray',
//   },
//   selectedDayText: {
//     // color: 'white',
//   },
//   disabledDayText: {
//     color: 'gray',
//     fontFamily: "Inter-Regular"
//   },
// });

// export default TestScreen2;
