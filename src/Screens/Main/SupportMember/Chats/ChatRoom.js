import React, { useEffect, useState } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';

//IMPORT COMPONENTS
import Chats from '../../../../Components/Chat/ChatDetails/Chat';

//IMPORT CONSTANTS
import { BACKGROUNDWHITE } from '../../../../Constants/Colors/Colors';
import ChatDetailHeader from '../Components/ChatDetailHeader';

const ChatRoom = ({ navigation, route }) => {
  // Extract data from route params
  const {
    avatar,
    hasNotification,
    id,
    image,
    isGroup,
    isHospital,
    location,
    messagePreview,
    sender,
    time,
    groupMembers,
    teamRole,
    phoneNumber,
  } = route.params.obj;

  const [ModalOpen, setModalOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Thank you for choosing Houston Methodist as your healthcare partner. Complete Survey for your recent visit:  htttp://bit.ly/123456',
      type: 'text',
      timestamp: new Date(),
    },
  ]);
  const [EmojiOpen, setEmojiOpen] = useState(false);

  useEffect(() => {
    console.log('Chat Room details:', route.params);

    // Handle back button press for closing the emoji keyboard
    const backAction = () => {
      if (EmojiOpen) {
        setEmojiOpen(false);
        return true;
      } else {
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [EmojiOpen]);

  return (
    <View style={styles.container}>
      <ChatDetailHeader
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        name={sender}
        navigation={navigation}
        groupMembers={groupMembers}
        teamRole={teamRole}
        phoneNumber={phoneNumber}
        location={location}
      />

      <Chats
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        Name={image} // Pass image URL for avatar
        navigation={navigation}
        itemId={id}
        messages={messages}
        setMessages={setMessages}
        EmojiOpen={EmojiOpen}
        setEmojiOpen={setEmojiOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
  },
});

export default ChatRoom;
