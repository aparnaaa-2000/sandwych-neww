// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, Modal, Alert } from 'react-native';



// const TestScreen3 = () => {
//     const [taskStarted, setTaskStarted] = useState(false);
//     const [taskCompleted, setTaskCompleted] = useState(false);
//     const [isTimerVisible, setIsTimerVisible] = useState(false);

//     const startTask = () => {
//         Alert.alert(
//             "Start Task",
//             "Are you ready to start the task?",
//             [
//                 {
//                     text: "Cancel",
//                     style: "cancel"
//                 },
//                 {
//                     text: "OK",
//                     onPress: () => {
//                         setIsTimerVisible(true);
//                         setTaskStarted(true);
//                     }
//                 }
//             ]
//         );
//     };

//     const completeTask = () => {
//         setIsTimerVisible(false);
//         setTaskCompleted(true);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Task Timer App</Text>
//             <Button
//                 title={taskCompleted ? "Task Completed" : taskStarted ? "Task in Progress" : "Start Task"}
//                 onPress={startTask}
//                 disabled={taskStarted}
//             />
//             <TimerPopup
//                 isVisible={isTimerVisible}
//                 onClose={() => setIsTimerVisible(false)}
//                 onComplete={completeTask}
//             />
//         </View>
//     );
// };

// const TimerPopup = ({ isVisible, onClose, onComplete }) => {
//     const [time, setTime] = useState(0); // time in seconds

//     useEffect(() => {
//         let timer;
//         if (isVisible) {
//             timer = setInterval(() => {
//                 setTime(prevTime => prevTime + 1);
//             }, 1000);
//         }

//         return () => clearInterval(timer);
//     }, [isVisible]);

//     const formatTime = (seconds) => {
//         const hrs = Math.floor(seconds / 3600);
//         const mins = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     return (
//         <Modal
//             transparent={true}
//             visible={isVisible}
//             animationType="slide"
//         >
//             <View style={styles.modalOverlay}>
//                 <View style={styles.modalContent}>
//                     <Text style={styles.timerText}>{formatTime(time)}</Text>
//                     <Button title="Report" onPress={() => alert('Report Button Pressed')} />
//                     <Button title="Complete Task" onPress={() => {
//                         onClose();
//                         onComplete();
//                     }} />
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalOverlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)'
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10,
//         width: '80%',
//     },
//     timerText: {
//         fontSize: 48,
//         marginBottom: 20
//     },
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16
//     },
//     title: {
//         fontSize: 24,
//         marginBottom: 20
//     }
// });


// export default TestScreen3;
