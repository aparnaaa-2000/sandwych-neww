import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  KeyboardAvoidingView
} from 'react-native';

//IMPORT THIRD-PARTY PACKAGES
import ImagePicker from 'react-native-image-crop-picker';
import EmojiSelector from 'react-native-emoji-selector';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

//IMPORT COMPONENTS
import ListItem from './ListItem';
import CommonPreview from './CommonPreview';
import ChatPriorityModal from './ChatPriorityModal';

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts';
import { BACKGROUNDWHITE, BORDERCOLOR1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR11 } from '../../../Constants/Colors/Colors';
import { SendIcon, Emoji, BlueAttach } from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize, height } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT REDUX-RELATED KEYS
import { DeleteIndividualMessage, getMessage, getReadMessage, getUnreadMessage, SendFileIndividual, sendMessage } from '../../../redux/thunk';
import { ListMessageClear } from '../../../redux/Slice/Chat/ListMessageKey';
import { DeleteMessageClear } from '../../../redux/Slice/Chat/DeleteMessageKey';
import { SendFileClear } from '../../../redux/Slice/Chat/SendFileKey';
import { useSocket } from '../../../Context/SocketContext';

const Chats = ({ Name, navigation, EmojiOpen, setEmojiOpen, messages, setMessages, setModalOpen, itemId }) => {

  const scrollViewRef = useRef(null);
  const dispatch = useDispatch();
  const socket = useSocket();

  const [newMessage, setNewMessage] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [FileView, setFileView] = useState(false);
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState();
  const [UserData, setUserData] = useState([]);
  const [ws, setWs] = useState(null);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [PriorityModal, setPriorityModal] = useState(false)
  const [Priority, setPriority] = useState(null)
  const [DeleteId, setDeleteId] = useState(null)
  const [filePath,setFilePath] = useState()
  const [messageIds,setMessageIds] = useState([])

  const {
    chatMessageData,
    messageSendData,
    messageSendError,
    messageSendLoading,
    deleteIndividualMessageData,
    deleteIndividualMessageError,
    deleteIndividualMessageLoading,
    readMessageData,
    readMessageError,
    sendFileData,
    sendFileError } = useSelector(
      state => ({
        chatMessageData: state.ListMessage.data,
        chatMessageError: state.ListMessage.error,
        chatMessageLoading: state.ListMessage.isLoading,
        messageSendData: state.SendMessage.data,
        messageSendError: state.SendMessage.error,
        messageSendLoading: state.SendMessage.isLoading,
        deleteIndividualMessageData: state.DeleteMessage.data,
        deleteIndividualMessageError: state.DeleteMessage.error,
        deleteIndividualMessageLoading: state.DeleteMessage.isLoading,
        UnReadData: state.UnReadMessage.data,
        UnReadError: state.UnReadMessage.error,
        UnReadLoading: state.UnReadMessage.isLoading,
        sendFileData: state.SendFile.data,
        sendFileError: state.SendFile.error,
        sendFileLoading: state.SendFile.isLoading,
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
     // console.log(data?.patientData?.patient_id);
      getMessage(data?.patientData?.patient_id, itemId, data?.storedValue, dispatch);

      if(chatMessageData){
        const ids = chatMessageData?.messages?.map(message => message.id);
      //  console.log("id",ids,chatMessageData?.messages)
      setMessageIds(ids);
    }
      getReadMessage(messageIds,data?.storedValue,dispatch)

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
      getMessage(UserData?.patientData?.patient_id, itemId, UserData?.storedValue, dispatch);
      dispatch(ListMessageClear());
    }

    if (deleteIndividualMessageData && DeleteId) {
      getMessage(UserData?.patientData?.patient_id, itemId, UserData?.storedValue, dispatch);
      dispatch(ListMessageClear());
      setDeleteId(null)
      dispatch(DeleteMessageClear())
    }

    if(filePath){
      getMessage(UserData?.patientData?.patient_id, itemId, UserData?.storedValue, dispatch);
      dispatch(ListMessageClear());
      dispatch(SendFileClear())
    }
  }, [messageSendData, messageSendError, deleteIndividualMessageData, deleteIndividualMessageError, sendFileData,sendFileError,UserData, itemId, dispatch]);




  // useEffect(() => {
  //   if (socket) {
  //     socket.on('connect', () => {
  //       console.log('Connected to socket server');
  //     });

  //     socket.on('receive-message', (msg) => {
  //       console.log('Received message:', msg);
  //       setMessages((prevMessages) => [...prevMessages, msg]);
  //     });

  //     socket.on('disconnect', () => {
  //       console.log('Disconnected from socket server');
  //     });

  //     socket.on('error', (error) => {
  //       console.error('Socket error:', error);
  //     });

  //     return () => {
  //       socket.off('connect');
  //       socket.off('receive-message');
  //       socket.off('disconnect');
  //       socket.off('error');
  //     };
  //   }
  // }, []);

  const sendMessages = () => { //SEND MESSAGE TO THE API AND SOCKET
    
    sendMessage(UserData?.patientData?.patient_id, itemId, newMessage != '' ?newMessage:selectedEmoji, Priority, UserData?.storedValue, dispatch);
    if (newMessage.trim()) {
      if (socket) {
       // socket.emit('send-message', { text: newMessage, itemId });
        setMessages((prevMessages) => [...prevMessages, { text: newMessage }]);
        setNewMessage('');
      } else {
        console.error('Socket not initialized');
      }
    }
    setPriorityModal(false);
  };
  const sendMessages1 = () => {
    sendMessage(UserData?.patientData?.patient_id, itemId, newMessage, Priority, UserData?.storedValue, dispatch);
    // if (socket && newMessage.trim()) {
    //   socket.emit('send-message', newMessage);
    //   setMessages((prevMessages) => [...prevMessages,newMessage]);

    // }
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ message: newMessage }));
    }
    setPriorityModal(false)
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

   const Send_Files = () => { //SEND FILES TO THE API AND SOCKET
    if(filePath){
    SendFileIndividual(UserData?.patientData?.patient_id,itemId,null, null,filePath, UserData?.storedValue, dispatch)
    }
    setFileView(false);
  };

  const selectDocFile = async () => { //FUNCTION FOR SELECTING THE DOC 
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

  const openCamera = () => { //FUNCTION FOR OPENING THE CAMERA
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

  const OnSendMessage = () => { //FUNCTION FOR OPENING THE MODAL TO SELECT THE PRIORITY
    if (newMessage) {
      setPriorityModal(true)
    }else if(selectedEmoji){
      setEmojiOpen(false)
      setPriorityModal(true)
    }

  }

  const DeleteMessage = () => { //FUNCTION FOR DELETING THE MESSAGE
    DeleteIndividualMessage(DeleteId, UserData?.storedValue, dispatch)
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
          <ListItem
            DeleteMessage={DeleteMessage}
            Name={Name}
            itemId={itemId}
            messages={chatMessageData?.messages}
            setMessages={setMessages}
            navigation={navigation}
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
                onPress={() => { setEmojiOpen(!EmojiOpen); setSelectedEmoji([]); }}
                >
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

              <TouchableOpacity style={styles.rightIconButtonStyle1} onPress={() => OnSendMessage()}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <ChatPriorityModal
        sendMessages={sendMessages}
        ModalOpen={PriorityModal}
        setModalOpen={setPriorityModal}
        Priority={Priority}
        setPriority={setPriority}
      />
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

export default Chats;
