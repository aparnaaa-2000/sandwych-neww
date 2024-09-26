import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

// Dummy data for simulation
const initialMessages = [
  { text: 'Hello!', type: 'received' },
  { text: 'How are you?', type: 'received' },
];

const { width } = Dimensions.get('window');

export default function ChatBoard({ data }) {
  // Importing icons
  const ImojiIcon = require('../../../../../assets/Images/Emoji.png');
  const Attach = require('../../../../../assets/Images/Attach.png');
  const MicIcon = require('../../../../../assets/Images/Mic.png');
  const SendIcon = require('../../../../../assets/Images/send.png');

  // State management
  const [message, setMessage] = useState(''); // Current message being typed
  const [messages, setMessages] = useState(initialMessages); // Array of messages
  const scrollViewRef = useRef(); // Reference to ScrollView

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, type: 'sent' }]);
      setMessage(''); // Clear input field
    }
  };

  // Function to scroll to the bottom of the chat
  const handleScrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  // Effect to handle scrolling when messages change
  useEffect(() => {
    handleScrollToBottom();
  }, [messages]);

  // Effect to simulate receiving new messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: 'New message received!', type: 'received' },
      ]);
    }, 5000); // Simulate receiving a message every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => handleScrollToBottom()}
        style={styles.messagesContainer}
      >
        {messages.map((item, index) => (
          <View
            key={index}
            style={item.type === 'sent' ? styles.sentMessage : styles.receivedMessage}
          >
            <Text>{item.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.BottomContainer}>
        <View style={styles.ImojiBox}>
          <Image style={styles.ImImageStyle} source={ImojiIcon} />
        </View>

        <View style={styles.TextInputView}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message here"
            placeholderTextColor="#151F6D"
            style={styles.InputStyle}
          />
        </View>

        <View style={styles.TextEnd}>
          <TouchableOpacity style={styles.ImageAttach}>
            <Image style={styles.ImageIcon} source={Attach} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.ImageAttach}>
            <Image style={styles.ImageIcon} source={MicIcon} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.SendButton}
          >
            <Image style={styles.ImageIcon} source={SendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles for the chat application
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: moderateScale(10),
  },
  BottomContainer: {
    width: '100%',
    height: verticalScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: moderateScale(1.5),
    borderTopColor: '#DCDADA',
    backgroundColor: '#fff',
    paddingHorizontal: moderateScale(10),
  },
  ImojiBox: {
    width: '15%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImImageStyle: {
    width: scale(25),
    height: scale(25),
  },
  TextInputView: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
  },
  TextEnd: {
    width: '35%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  InputStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: moderateScale(20),
    paddingHorizontal: moderateScale(10),
  },
  ImageAttach: {
    width: scale(30),
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
  SendButton: {
    width: moderateScale(35),
    height: moderateScale(35),
    backgroundColor: '#86C8BC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(100),
    elevation: moderateScale(2),
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1f5d3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
});
