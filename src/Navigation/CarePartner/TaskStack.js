import React,{useState,useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTask from '../../Components/CarePartner/Tasks/CreateTask';

import TaskDashboard from '../../Screens/Main/CarePartner/Tasks/TaskDashboard';
import TasksLandingPage from '../../Screens/Main/CarePartner/Tasks/TasksLandingPage';
import NetworkConnectivity from '../../Components/Common/NetworkConnection/NetworkConnectivity';



const Task = createNativeStackNavigator();

const screenOptions = {
  headerShown: false
};

const TaskStack = () => {
  const [isConnected, setIsConnected] = useState(true);

useEffect(() => {
  const unsubscribe = NetInfo.addEventListener(state => {
    setIsConnected(state.isConnected);
  });

  return () => {
    unsubscribe();
  };
}, []);

  return (
    <Task.Navigator 
      screenOptions={screenOptions}>
      <Task.Screen name="TaskDashboard" component={isConnected ? TaskDashboard : NetworkConnectivity} />

      <Task.Screen name="TasksLandingPage" component={isConnected ? TasksLandingPage : NetworkConnectivity}/>
      <Task.Screen name="CreateTask" component={CreateTask} />
      
    </Task.Navigator>
  )
}


export default TaskStack;
