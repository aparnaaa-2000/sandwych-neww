import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ChatDetails from '../Components/Chat/ChatDetails/ChatDetails';
import ChatDetails from '../../Components/Chat/ChatDetails/ChatDetails'
import VideoFile from '../../Components/Chat/ChatDetails/VideoFile'
import CreateGroup from '../../Components/Chat/ChatList/CreateGroup';
import ChatGroupDetails from '../../Components/Chat/ChatDetails/ChatGroupDetails';
import PdfMessageView from '../../Components/Chat/ChatDetails/pdfMessageView';

const Chat = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const ChatStack = ({ route }) => {

  return (
    <Chat.Navigator
      initialRouteName="ChatDetails"
      screenOptions={screenOptions}>
      <Chat.Screen
        name="ChatDetails"
        component={ChatDetails}
        initialParams={{
          name: route?.params?.name,
          imageUri: route?.params?.imageUri,
          itemId: route?.params?.itemId,
          groupMembers: route?.params?.groupMembers,
          teamRole: route?.params?.teamRole,
          phoneNumber:route?.params?.phoneNumber
        }} />
        
      <Chat.Screen
        name="ChatGroupDetails"
        component={ChatGroupDetails}
        initialParams={{
          carepartnerId:route?.params?.carepartnerId,
          name: route?.params?.name,
          imageUri: route?.params?.imageUri,
          itemId: route?.params?.itemId,
          groupMembers: route?.params?.groupMembers,
          teamRole: route?.params?.teamRole
        }} />
      <Chat.Screen name="VideoFile" component={VideoFile} />
      <Chat.Screen name="CreateGroup" component={CreateGroup} />
      <Chat.Screen name="PdfMessageView" component={PdfMessageView} />
    </Chat.Navigator>
  )
}


export default ChatStack;
