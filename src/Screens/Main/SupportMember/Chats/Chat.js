import {View, Text, StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import ChatHeader from '../Components/ChatHeader';
import ChatList from './ChatList';

const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ChatHeader />
      <ChatList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ChatScreen;