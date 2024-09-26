// This is to check whether there is an ongoing task checking date and time in the coming API.

// import React, {useState, useEffect} from 'react';
// import {View, Text, Button, StyleSheet, Modal, Alert} from 'react-native';
// import {PUREWHITE} from '../../../Constants/Colors/Colors';
// import {fontSize} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

// const SchedulerPopup = ({isVisible, onClose, onComplete}) => {
//   const [time, setTime] = useState(0); // time in seconds

//   useEffect(() => {
//     let timer;
//     if (isVisible) {
//       timer = setInterval(() => {
//         setTime(prevTime => prevTime + 1);
//       }, 1000);
//     }

//     return () => clearInterval(timer);
//   }, [isVisible]);

//   const formatTime = seconds => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins
//       .toString()
//       .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const reportOngoingTask = () => {
//     Alert.alert(
//       'Report Task',
//       'Are you sure you want to stop and Report the Task going on?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             setIsTimerVisible(true);
//             setTaskStarted(true);
//           },
//         },
//       ],
//     );
//   };

//   return (
//     <Modal transparent={true} visible={isVisible} animationType="slide">
//       <View style={styles.modalOverlay}>
//         <View style={styles.modalContent}>
//           <Text style={styles.timerText}>{formatTime(time)}</Text>
//           <Button
//             title="Report"
//             onPress={() => alert('Report Button Pressed')}
//           />
//           <Button
//             title="Already Completed"
//             onPress={() => {
//               onClose();
//               onComplete();
//             }}
//           />
//           <Button
//             title="Complete Task"
//             onPress={() => {
//               onClose();
//               onComplete();
//             }}
//           />
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: PUREWHITE,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//     width: '80%',
//   },
//   timerText: {
//     fontSize: fontSize(48),
//     marginBottom: 20,
//   },
// });

// export default SchedulerPopup;
