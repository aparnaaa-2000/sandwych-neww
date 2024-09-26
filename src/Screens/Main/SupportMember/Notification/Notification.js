import {View, Text, SafeAreaView, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../Components/SupportMember/Notifications/Header';
import DEFAULTSTYLES from '../../../../Constants/styles/styles';
import {DEFAULTGRAY} from '../../../../Constants/Colors/Colors';
import NewNotification from '../../../../Components/SupportMember/Notifications/NewNotification';
import NotificationTab from '../../../../Components/Common/TopTabs/NotificationTab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SupportStack from '../../../../Navigation/SupportMember/navigationstack';
import {useNavigation} from '@react-navigation/native';
import useSupportRequestList from '../../../../hooks/apihooks/useSupportRequestList';
import {TurboModuleRegistry} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import usePreviousSupportList from '../../../../hooks/apihooks/usePreviousSupportList';
import PrevNotification from '../../../../Components/SupportMember/Notifications/PrevNotification';
import { moderateScale } from 'react-native-size-matters';


const NOTIFICATIONLATEST = [
 {
   name: 'Andrew Symonds',
   role: 'carepartner',
   date: '10th March 2024',
   time: '10:00 AM',
   city: 'Austin, Texas',
   type: 'ADL',
   title: 'Transportation & Mobility',
   description:
     ' A transfer can be viewed as the safe movement of a person from one place or surface to another, and as an opportunity to train an individual to enhance independent function.',
   status: 'active',
 },
 {
   name: 'Betty Smith',
   role: 'patient',
   date: '10th March 2024',
   time: '10:00 AM',
   city: 'Austin, Texas',
   type: 'IADL',
   title: 'Shopping',
   description:
     ' A transfer can be viewed as the safe movement of a person from one place or surface to another, and as an opportunity to train an individual to enhance independent function.',
   status: 'active',
 },
 {
   name: 'Amy Balkley Linane',
   role: 'casemanager',
   date: '10th March 2024',
   time: '10:00 AM',
   type: 'Medical Assistance',
   city: 'Austin, Texas',
   title: 'Cathetar Injection',
   description:
     ' A transfer can be viewed as the safe movement of a person from one place or surface to another, and as an opportunity to train an individual to enhance independent function.',
   status: 'accepted',
 },
];


const NOTIFICATIONPREVIOUS = [
 {
   name: 'Andrew Symonds',
   role: 'carepartner',
   date: '10th March 2024',
   time: '10:00 AM',
   city: 'Austin, Texas',
   type: 'ADL',
   title: 'Transportation & Mobility',
   description:
     ' A transfer can be viewed as the safe movement of a person from one place or surface to another, and as an opportunity to train an individual to enhance independent function.',
   status: 'accepted',
 },
 {
   name: 'Betty Smith',
   role: 'patient',
   date: '10th March 2024',
   time: '8:30 AM',
   city: 'Houston, Texas',
   type: 'IADL',
   title: 'Shopping',
   description:
     ' A transfer can be viewed as the safe movement of a person from one place or surface to another, and as an opportunity to train an individual to enhance independent function.',
   status: 'accepted',
 },
 {
   name: 'Amy Balkley Linane',
   role: 'casemanager',
   date: '10th March 2024',
   time: '06:00 AM',
   city: 'Dallas, Texas',
   type: 'Medical Assistance',
   title: 'Cathetar Injection',
   description:
     ' A transfer can be viewed as the safe movement of a person from one place or surface to another, and as an opportunity to train an individual to enhance independent function.',
   status: 'rejected',
 },
];


const Tab = createMaterialTopTabNavigator();


const NotificationScreen = () => {
 const navigation = useNavigation();
 return (
   <SafeAreaView
     style={
       Platform.OS === 'android'
         ? DEFAULTSTYLES.AndroidSafeArea
         : styles.container
     }>
     <Header />


     <View style={{flex: 1}}>
       <Tab.Navigator
         // name="SupportRoot"
         // component={SupportStack}
         tabBar={props => <NotificationTab {...props} />}>
         <Tab.Screen
           name="Latest"
           component={LatestNotifications}
           navigation={navigation}
         />
         <Tab.Screen
           name="Previous"
           component={PreviousNotifications}
           navigation={navigation}
         />
       </Tab.Navigator>
     </View>


     {/* <NewNotification /> */}
   </SafeAreaView>
 );
};


const LatestNotifications = ({ navigation }) => {
 const [requestData, setRequestData] = useState([]);
 const [loading, setLoading] = useState(true); // Initial state is loading
 const [error, setError] = useState(false);


 useEffect(() => {
   const getRequestSupportList = async () => {
     try {
       const userId = await AsyncStorage.getItem('User_Id');
       if (userId) {
         const data = await useSupportRequestList(userId);
         setRequestData(data?.data || []);
         console.log('User Support Iddddddddddddddddd....' , data?.data);
         setLoading(false);
       } else {
         setLoading(false); // No userId, stop loading
       }
     } catch (error) {
       console.log('error code...', error);
       setLoading(false);
       setError(true);
     }
   };


   getRequestSupportList();
 }, [requestData]);


 if (loading) {
   return (
     <View style={styles.loadingContainer}>
       <ActivityIndicator size="large" color="#0000ff" />
     </View>
   );
 }


 if (error) {
   return (
     <View style={styles.errorContainer}>
       <Text style={styles.errorText}>Something went wrong. Please try again later.</Text>
     </View>
   );
 }


 return (
   <FlatList
     showsVerticalScrollIndicator={false}
     data={requestData}
     renderItem={({ item }) => (
       <NewNotification notification={item} day={0} navigation={navigation} />
     )}
     keyExtractor={item => item.id.toString()}
     ListEmptyComponent={
       <View style={styles.emptyContainer}>
         <Text style={styles.emptyText}>No notifications available.</Text>
       </View>
     }emptyText
   />
 );
};






const PreviousNotifications = ({navigation}) => {
 const [prevData, setPrevData] = useState([]);
 const [prevLoading, setPrevLoading] = useState(false);
 const [prevError, setPrevError] = useState(false);


 useEffect(() => {
   const getRequestPreviousList = async () => {
     const userId = await AsyncStorage.getItem('User_Id');
     setPrevLoading(true);
     try {
       const data = await usePreviousSupportList(userId);
       setPrevData(data?.data || []); // Ensure data is an array
     } catch (error) {
       setPrevError(true);
     } finally {
       setPrevLoading(false);
     }
   };
   getRequestPreviousList();
 }, [prevData]);








 return (
   <FlatList
     showsVerticalScrollIndicator={false}
     data={prevData}
     renderItem={({item}) => (
       <PrevNotification
         notification={item}
         day={1}
         navigation={navigation}
       />
     )}
     keyExtractor={item => item.id.toString()}
     ListEmptyComponent={() => (
       <Text style={styles.emptyText}>No previous notifications available.</Text>
     )}
   />
 );
};




const styles = new StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: DEFAULTGRAY,
 },
 CenterEmptyText : {
   alignItems:'center' ,
   justifyContent:'center',
   alignSelf:'center',
   color:'#000'
 },
 emptyText : {
   color:'#000',
   alignSelf:'center',
   fontSize:moderateScale(13) ,
   fontWeight:'500',
   marginTop:moderateScale(80),
 }
});


export default NotificationScreen;





