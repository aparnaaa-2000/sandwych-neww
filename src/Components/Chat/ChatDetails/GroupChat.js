import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';

//IMPORT PACKAGES
import ImagePicker from 'react-native-image-crop-picker';
import EmojiSelector from 'react-native-emoji-selector';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//IMPORT COMPONENTS
import CommonPreview from './CommonPreview';
import ListGroupMessage from './ListGroupMessage';

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts';
import { BACKGROUNDWHITE, BORDERCOLOR1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR11 } from '../../../Constants/Colors/Colors';
import { SendIcon, Emoji, BlueAttach } from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize, height } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

import { DeleteGroupMessage,getGroupMessage,getReadMessage,SendFileGroup, SendGroupMessage} from '../../../redux/thunk';
import { ChatGrouplistClear } from '../../../redux/Slice/Chat/ChatGroupListKey';
import { DeleteGroupMessageClear } from '../../../redux/Slice/Chat/DeleteGroupMessageKey';
import { SendGroupFileClear } from '../../../redux/Slice/Chat/SendGroupFileKey';


const GroupChat = ({ Name, navigation, EmojiOpen, setEmojiOpen, messages, setMessages,itemId, carepartnerId }) => {

  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();

  const [newMessage, setNewMessage] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [FileView, setFileView] = useState(false);
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [ws, setWs] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [PriorityModal, setPriorityModal] = useState(false)
  const [DeleteId, setDeleteId] = useState(null)
  const [filePath,setFilePath] = useState()
  const [messageIds,setMessageIds] = useState([])

  const {
    chatMessageData,
    messageSendData,
    messageSendError,
    messageSendLoading,
    deleteGroupMessageData,
    deleteGroupMessageError,
    deleteGroupMessageLoading,
    UnReadData,
    UnReadError,
    sendFileData,
    sendFileError,
    sendFileLoading,
    readMessageData,
    readMessageError
  } = useSelector(
    state => ({
      chatMessageData: state.ListGroupMessage.data,
      chatMessageError: state.ListGroupMessage.error,
      chatMessageLoading: state.ListGroupMessage.isLoading,
      messageSendData: state.SendGroupMessage.data,
      messageSendError: state.SendGroupMessage.error,
      messageSendLoading: state.SendGroupMessage.isLoading,
      deleteGroupMessageData: state.DeleteGroupMessage.data,
      deleteGroupMessageError: state.DeleteGroupMessage.error,
      deleteGroupMessageLoading: state.DeleteGroupMessage.isLoading,
      sendFileData: state.SendGroupFile.data,
      sendFileError: state.SendGroupFile.error,
      sendFileLoading: state.SendGroupFile.isLoading,
      readMessageData:state.ReadMessage.data,
      readMessageError: state.ReadMessage.error,
      readMessageLoading: state.ReadMessage.isLoading
    }),
    shallowEqual
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setUserData(data);
      console.log(data?.patientData?.patient_id);
      getGroupMessage(itemId, data?.storedValue, dispatch); //FUNCTION FOR GROUP MESSAGE API LIST
      if(chatMessageData){
        const ids = chatMessageData?.messages?.map(message => message.id);
        console.log("id",ids,chatMessageData?.messages)
      setMessageIds(ids);
    }
      getReadMessage(messageIds,data?.storedValue,dispatch) //FUNCTION FOR READ MESSAGE API
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation,messageIds]);


  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');

      return {
        storedValue: storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        carepartnerData: null
      };
    }
  };

  // WebSocket setup
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:6001');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      setReceivedMessages((prevMessages) => [...prevMessages, JSON.parse(event.data)]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (messageSendData && newMessage) {
      setNewMessage('');
      getGroupMessage(itemId, UserData?.storedValue, dispatch);
      dispatch(ChatGrouplistClear())
      // dispatch(SendGroupMessageClear())
    }
    if (deleteGroupMessageData && DeleteId) {
      getGroupMessage(itemId, UserData?.storedValue, dispatch);
      dispatch(ChatGrouplistClear())
      setDeleteId(null)
      dispatch(DeleteGroupMessageClear())
    }
    
    if(filePath){
      getGroupMessage( itemId, UserData?.storedValue, dispatch);
      dispatch(ChatGrouplistClear());
      dispatch(SendGroupFileClear())
    }
  }, [messageSendData, messageSendError, deleteGroupMessageData, deleteGroupMessageError, sendFileData,sendFileError,UserData, itemId, dispatch]);

 
  useEffect(() => {
    console.log('Received Messages Updated:', receivedMessages);
    setMessages(receivedMessages);
  }, [receivedMessages]);

  const sendMessages = () => { //FUNCTION FOR SEND MESSAGE
    setEmojiOpen(false)
    SendGroupMessage(itemId, newMessage != ''?newMessage:selectedEmoji, UserData?.storedValue, dispatch);
  
    Keyboard.dismiss()
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message: newMessage }));
    }

  };

  const DeleteMessage = () => { //FUNCTION FOR DELETE MESSAGE
    console.log(DeleteId)
    DeleteGroupMessage(DeleteId, UserData?.storedValue, dispatch)
  }

  const SendText_Message = () => {
    if (newMessage !== '') {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        type: 'text',
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setEmojiOpen(false);
    }
  };

  const SendEmojis = () => {
    if (selectedEmoji.length > 0) {
      const message = {
        id: messages.length + 1,
        text: selectedEmoji,
        type: 'emoji',
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setSelectedEmoji([]);
      setEmojiOpen(false);
    }
  };

  const Send_Files = () => { //FUNCTION FOR SEND FILES TO THE API
    SendFileGroup(itemId,newMessage,filePath,UserData?.storedValue,dispatch)
    setFileView(false);
  };

  const selectDocFile = async () => { //FUNCTION FOR PICK DOC
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setImagePath(res[0].uri);
      setFilePath(res[0])
      setFileView(true);
      setFileName(res[0].name);
      setFileType(res[0].type);
    } catch (err) {
      console.error('Error selecting document:', err);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji((prevSelectedEmojis) => [...prevSelectedEmojis, emoji]);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      useFrontCamera: false
    }).then((image) => {
      setFileType('image/jpeg');
      setImagePath(image.path);
      setFileView(true);
    }).catch((error) => {
      console.log(error);
    });
  };

  const OnSendMessage = () => {
    if (newMessage) {
      setPriorityModal(true)
    }

  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' && 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={(contentWidth, contentHeight) => {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }}
          onLayout={() => {
            scrollViewRef.current.scrollToEnd({ animated: false });
          }}>
          <ListGroupMessage
            Name={Name}
            itemId={carepartnerId}
            messages={chatMessageData?.messages}
            setMessages={setMessages}
            navigation={navigation}
            DeleteMessage={DeleteMessage}
            DeleteId={DeleteId}
            setDeleteId={setDeleteId}
          />
        </ScrollView>
      </View>

      <View style={styles.innerContainer}>
        {FileView ? (
          <CommonPreview
            fileType={fileType}
            fileName={fileName}
            imagePath={imagePath}
            sendImage={Send_Files}
          />
        ) : (
          <>
            {EmojiOpen && (
              <View style={{ width: DEFAULTWIDTH * 0.99, height: height(188) }}>
                <EmojiSelector
                  onEmojiSelected={handleEmojiSelect}
                  showSearchBar={false}
                  showSectionTitles={false}
                />
              </View>
            )}
            <View style={styles.border} />
            <View style={styles.inputAndMicrophone}>
              <TouchableOpacity
                style={styles.emoticonButton}
                onPress={() => { setEmojiOpen(!EmojiOpen); setSelectedEmoji([]); }}>
                <Emoji />
              </TouchableOpacity>

              {!EmojiOpen ? (
                <TextInput
                  multiline
                  placeholderTextColor={PRIMARYCOLOR}
                  placeholder="Type a message here"
                  style={styles.input}
                  value={newMessage}
                  onChangeText={(text) => setNewMessage(text)}
                />
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.input}>
                  {selectedEmoji.map((item, index) => (
                    <View key={index} style={styles.viewEmj}>
                      <Text>{item}</Text>
                    </View>
                  ))}
                </ScrollView>
              )}

              <TouchableOpacity style={styles.rightIconButtonStyle} onPress={selectDocFile}>
                <BlueAttach />
              </TouchableOpacity>

              <TouchableOpacity style={styles.rightIconButtonStyle1} onPress={() => sendMessages()}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    backgroundColor: BACKGROUNDWHITE,
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    flex: 1,
    marginRight: GlobalSize(10),
    borderRadius: GlobalSize(30),
    marginLeft: Platform.OS === 'ios' ? GlobalSize(10) : 0,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewEmj: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: GlobalSize(20),
    color: PRIMARYCOLOR,
    flex: 1,
    top: Platform.OS === 'ios' ? GlobalSize(25) : 0,
    fontSize: GlobalSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? GlobalSize(80) : GlobalSize(60)
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: GlobalSize(5),
    paddingLeft: GlobalSize(10),
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  rightIconButtonStyle1: {
    marginRight: GlobalSize(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
    backgroundColor: '#86C8BC',
    width: GlobalSize(40),
    height: GlobalSize(40),
    borderRadius: GlobalSize(20),
    marginLeft: GlobalSize(5)
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: GlobalSize(10),
  },
  messageText: {
    fontSize: fontSize(12),
    color: TEXTCOLOR11
  },
  messageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(6),
    margin: GlobalSize(5),
    padding: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    borderWidth: 0.5,
  },
  messageContainer1: {
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(6),
    padding: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    borderWidth: 0.5,
  },
  border: {
    borderWidth: 0.5,
    borderColor: BORDERCOLOR1,
    width: DEFAULTWIDTH,
  },
});

export default GroupChat;

