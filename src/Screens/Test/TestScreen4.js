// import React, {useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {PRIMARYCOLOR, PUREWHITE} from '../../Constants/Colors/Colors';
// import {WhiteArrowL, WhiteArrowR} from '../../../assets';

// const TestScreen4 = () => {
//   const [currentItem, setCurrentItem] = useState(0);

//   const items = [
//     {
//       Percentage: '100%',
//       description:
//         'Basic Information  is an assessment to confirm the  information provided  for the patient in the SandwYch',
//     },
//     {
//       Percentage: '100%',
//       description:
//         'Caregiving Style is an assessment which provides information of patients style for caregiving',
//     },
//     {
//       Percentage: '100%',
//       description:
//         'Functional Ablities will give an information on what type of Functionalities Caregiver should help on',
//     },
//     {
//       Percentage: '20%',
//       description:
//         'SDOH Assessments shows what type of surroundings the patient have.',
//     },
//     {
//       Percentage: '0%',
//       description:
//         'About Patient will show the information to you, In the assessment you have to verify it',
//     },
//     {
//       Percentage: '0%',
//       description:
//         'About Caregiver will be shown to verify the infomrations of the the Caregiver',
//     },
//     // Add more items as needed
//   ];

//   const handlePrev = () => {
//     setCurrentItem(currentItem === 0 ? items.length - 1 : currentItem - 1);
//   };

//   const handleNext = () => {
//     setCurrentItem(currentItem === items.length - 1 ? 0 : currentItem + 1);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.itemContainer}>
//         <View>
//           <Text style={styles.title}>{items[currentItem].Percentage}</Text>
//         </View>
//         <View style={{width: '75%'}}>
//           <Text style={styles.description}>
//             {items[currentItem].description}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.buttonsContainer}>
//         <TouchableOpacity onPress={handlePrev}>
//           <WhiteArrowL />
//         </TouchableOpacity>
//         <View style={styles.linesContainer}>
//           {items.map((_, index) => (
//             <View
//               key={index}
//               style={[
//                 styles.line,
//                 index === currentItem ? styles.highlightedLine : null,
//               ]}
//             />
//           ))}
//         </View>

//         <TouchableOpacity onPress={handleNext}>
//           <WhiteArrowR />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: PRIMARYCOLOR,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: '100%',
//     height: '20%',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   description: {
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     // marginBottom: 20,
//     marginHorizontal: 20,
//     width: '90%',
//     alignItems: 'center',
//   },
//   button: {
//     padding: 10,
//     backgroundColor: 'lightblue',
//     borderRadius: 5,
//   },
//   linesContainer: {
//     flexDirection: 'row',
//   },
//   line: {
//     width: 20,
//     height: 2,
//     backgroundColor: 'gray',
//     marginHorizontal: 2,
//   },
//   highlightedLine: {
//     backgroundColor: PUREWHITE,
//   },
// });

// export default TestScreen4;
