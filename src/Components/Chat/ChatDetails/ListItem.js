import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

//IMPORT ICONS (NEED TO CHANGE INTO SVG)
import IconP from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import Pdf from 'react-native-vector-icons/FontAwesome5';

//IMPORT THIRD -PARTY PACKAGES
import Slider from 'react-native-slider';
import SoundPlayer from 'react-native-sound-player';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

//IMPORT COMPONENTS
import ImageView from './ImageView';
import VideoView from './VideoView';

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts';
import { BORDERCOLOR1, CHATCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR11, TEXTCOLOR12 } from '../../../Constants/Colors/Colors';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { AVALONG } from '../../../Constants/DummyImages';
import { BlackDelete, CalenderLine } from '../../../../assets';
import DeleteModal from './DeletePopup';

const ListItem = ({ messages, setMessages, navigation, Name, itemId, DeleteMessage, setDeleteId, DeleteId }) => {

  const intervalRef = useRef(null);
  const [selectedId, setSelectedId] = useState(0)
  const [ModalOpen, setModalOpen] = useState(false)
  const [MessageId, setMessageId] = useState(null)

  const handlePress = (id) => {
    if (DeleteId !== id) {
      setDeleteId(id)
    }
    else if (DeleteId) {
      setDeleteId(null);
    }
    else {
      setDeleteId(id)
    }


  };

  const playAudios = (index) => { //To handle the play and pause based on playing true or false

    const audioPlay = messages[index].Playing;
    const audioId = messages[index].id;
    const audioResume = messages[index].ResumePlay
    // console.log("audio_id,audioPlay,audioResume.....................", audioId, audioPlay, audioResume)

    if (audioResume) {
      //console.log("resume the audio.....................", audioResume)
      clearInterval(intervalRef.current)
      ResumeAudios(index)

    }
    else if (audioPlay) { // if Playing true it pause the audio
      //console.log("pause the audio.................", audioPlay)
      PauseAudio(index)
      clearInterval(intervalRef.current)
    }
    else {
      ToAudio_play(index) // To play the audio
    }
  }

  const PauseAudio = (index) => { //To pause the audio
    const audioId = messages[index].id;
    const audioUrl = messages[index].url;

    const DataMessage = messages.map((prevItem) =>
      prevItem.id === audioId
        ? {
          ...prevItem,
          Playing: true,
          ResumePlay: true,

        }
        : prevItem
    );
    setMessages(DataMessage);
    setSelectedId(null)

    SoundPlayer.pause(audioUrl) // to pause the audio
  }



  const ToAudio_play = (index) => { // To play the audio
    try {
      const audioUrl = messages[index].url;
      const audioId = messages[index].id;

      SoundPlayer.playUrl(audioUrl);

      // Clear any previous interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up a timer to periodically update the current time
      const timer = setInterval(() => {
        SoundPlayer.getInfo().then((info) => {
          const minutesTime = Math.floor(info.currentTime / 60);
          const secondsTime = Math.floor(info.currentTime % 60);
          const Progress = info.currentTime / info.duration;

          const DataMessage = messages.map((prevItem) =>
            prevItem.id === audioId
              ? {
                ...prevItem,
                durationMin: minutesTime,
                Playing: true,
                ResumePlay: false,
                durationInSeconds: secondsTime,
                progress: Progress,
              }
              : prevItem
          );
          setMessages(DataMessage);
        });
      }, 1000); // Update every second

      // Store the interval in the ref
      intervalRef.current = timer;

      setSelectedId(audioId); // Set state to handle pause and play icon

      // Clear the timer when the audio finishes playing or when the component unmounts
      SoundPlayer.onFinishedPlaying((success) => {
        if (success) {
          const DataMessage = messages.map((prevItem) =>
            prevItem.id === audioId
              ? {
                ...prevItem,
                Playing: false,
                ResumePlay: false,
                durationMin: 0,
                durationInSeconds: 0,
                progress: 0
              }
              : prevItem
          );
          setMessages(DataMessage);
          setSelectedId(null); // Null the state when the audio ends to show the play icon
          clearInterval(intervalRef.current);
        }
      });
    } catch (e) {
      console.log(`Cannot play audio: ${e}`);
    }
  };

  const ResumeAudios = (index) => { // To resume the audio
    // console.log("resume audio..................", messages)
    try {
      const audioUrl = messages[index].url;
      const audioId = messages[index].id;
      const audioPlay = messages[index].ResumePlay

      SoundPlayer.resume();

      // Clear any previous interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Set up a timer to periodically update the current time
      const timer = setInterval(() => {
        SoundPlayer.getInfo().then((info) => {
          const minutesTime = Math.floor(info.currentTime / 60);
          const secondsTime = Math.floor(info.currentTime % 60);
          const Progress = info.currentTime / info.duration;

          const DataMessage = messages.map((prevItem) =>
            prevItem.id === audioId
              ? {
                ...prevItem,
                durationMin: minutesTime,
                Playing: true,
                ResumePlay: false,
                durationInSeconds: secondsTime,
                progress: Progress,
              }
              : prevItem
          );
          setMessages(DataMessage);
        });
      }, 1000); // Update every second

      // Store the interval in the ref
      intervalRef.current = timer;

      setSelectedId(audioId); // Set state to handle pause and play icon

      // Clear the timer when the audio finishes playing or when the component unmounts
      SoundPlayer.onFinishedPlaying((success) => {
        if (success) {
          const DataMessage = messages.map((prevItem) =>
            prevItem.id === audioId
              ? {
                ...prevItem,
                Playing: false,
                ResumePlay: false,
                durationMin: 0,
                durationInSeconds: 0,
                progress: 0

              }
              : prevItem
          );
          setMessages(DataMessage);
          setSelectedId(null); // Null the state when the audio ends to show the play icon
          clearInterval(intervalRef.current);
        }
      });
    } catch (e) {
      console.log(`Cannot play audio: ${e}`);
    }
  }


  return (

    <View style={{ marginBottom: DEFAULTWIDTH * 0.1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: DEFAULTWIDTH * 0.35 }}>
        <FlatList
          data={messages}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            const isSelected = selectedId === item.id;

            return (

              <ScrollView showsVerticalScrollIndicator={false}>


                <View style={styles.timeView}>
                  <Text style={styles.timeDis}>
                    {moment(item?.updated_at).format('ddd h:mm a')}</Text>
                </View>
                <View style={[styles.viewEnd, {
                  alignSelf: itemId == item?.recipient_id ?
                    'flex-end' : 'flex-start'
                }]} >

                  <View>

                    {/* {itemId !== item?.recipient_id &&
                      <View style={{ top: -15 }}>
                        <FastImage
                          style={styles.imageV}
                          source={{
                            uri: AVALONG,
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>} */}


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <TouchableOpacity onPress={() => handlePress(item.id)}>
                        <View style={[styles.messageContainer, {
                          maxWidth: DEFAULTWIDTH * 0.80,
                          backgroundColor: DeleteId == item.id ? CHATCOLOR : PUREWHITE
                        }]}>
                          {item?.type == '0' ?
                            <ImageView imageUri={item?.file} /> :
                            item?.type == '1' ?
                            
                              <TouchableOpacity onPress={() => navigation.navigate('PdfMessageView',{pdf:item?.file})}
                              style={[styles.messageContainer, { flexDirection: 'row' }]}>
                                <Pdf name={'file-pdf'} size={25} color={'#de2104'} />
                                <Text style={[styles.messageText, { padding: 5 }]}>{item.text}</Text>
                              </TouchableOpacity> :
                              <Text style={styles.messageText}>{item?.content}</Text>}


                        </View>

                      </TouchableOpacity>
                      {DeleteId === item?.id &&
                        <TouchableOpacity onPress={() => setModalOpen(true)}>
                          <BlackDelete width={25} height={25} />
                        </TouchableOpacity>}
                    </View>

                    {/* item.type == "image/jpeg" ?
                        <ImageView imageUri={item.text} /> :

                        item.type == "application/pdf" ?
                          <View style={[styles.messageContainer, { flexDirection: 'row' }]}>
                            <Pdf name={'file-pdf'} size={25} color={'#de2104'} />
                            <Text style={[styles.messageText, { padding: 5 }]}>{item.text}</Text>
                          </View> :

                          item.type == "video/mp4" ?
                            <VideoView item={item} navigation={navigation} /> :

                            item.type == "emoji" ?
                              <View style={[styles.messageContainer, styles.emojiContainer]}>

                                {item?.text?.map((item, index) => (
                                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    <View key={index} style={styles.viewEmoji}>
                                      <Text style={{ fontSize: fontSize(10) }} numberOfLines={4} >{item}</Text>
                                    </View>
                                  </ScrollView>
                                ))}
                              </View> :

                              item.type == "audio/mpeg" ?
                                <View style={[styles.messageContainer, { flexDirection: 'row' }]}>

                                  <TouchableOpacity style={styles.playIcon}>
                                    <IconP name='headphone' color={'#FFFFFF'} size={20} />
                                    {item?.durationInSeconds > 0 &&
                                      <Text style={[styles.messageText, { color: "#FFFFFF", fontSize: fontSize(8) }]}>
                                        {item.durationMin < 10 ? `0${item.durationMin}` : item?.durationMin}:{item.durationInSeconds < 10 ? `0${item.durationInSeconds}` : item.durationInSeconds}
                                      </Text>}
                                  </TouchableOpacity>

                                  <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', marginLeft: GlobalSize(10) }}>

                                      <TouchableOpacity
                                        onPress={() => { playAudios(index) }}
                                        style={{ padding: 5 }}>
                                        <Icon name={!isSelected ? "caretright" : "pause"}
                                          color={'#464747'} size={22} style={{ top: 5 }} />
                                      </TouchableOpacity>

                                      <Slider
                                        value={item.progress}
                                        minimumValue={0}
                                        maximumValue={1}
                                        step={1}
                                        style={{ width: 150, marginLeft: 4 }}
                                      //  onSlidingComplete={value => {
                                      //    SoundPlayer.seek(value * audioDuration);
                                      //  }}
                                      />
                                    </View>
                                  </View>

                                </View> : null} */}
                  </View>
                  {/* 
                  {itemId == item?.recipient_id &&
                    <View style={{ top: -15 }}>
                      <FastImage
                        style={styles.imageV}
                        source={{
                          uri: AVALONG,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>} */}
                </View>


              </ScrollView>
            )
          }} />
      </ScrollView>

      <DeleteModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        DeleteId={MessageId}
        setDeleteId={setDeleteId}
        DeleteMessage={DeleteMessage} />
    </View>

  );
};

const styles = StyleSheet.create({
  messageText: {
    fontSize: fontSize(12),
    color: TEXTCOLOR11,
    fontFamily: FONTS.FontRegular
  },
  viewEnd: {
    // alignSelf: 'flex-end',
    marginRight: GlobalSize(10),
    flexDirection: 'row',
    marginLeft: GlobalSize(10)
  },
  emojiContainer: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: GlobalSize(10),
    maxWidth: DEFAULTWIDTH * 0.80,
    maxHeight: DEFAULTWIDTH * 0.5
  },
  imageV: {
    width: DEFAULTWIDTH * 0.1,
    borderRadius: GlobalSize(25),
    height: DEFAULTWIDTH * 0.1
  },

  timeView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: GlobalSize(10),
    marginTop: GlobalSize(20)
  },
  timeDis: {
    color: TEXTCOLOR12,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular
  },
  messageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: PUREWHITE,
    borderRadius: 6,
    margin: GlobalSize(5),
    padding: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    borderWidth: 0.5,
    marginRight: GlobalSize(10)
  },
  messageContainer1: {
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(6),
    padding: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    borderWidth: 0.5,
    justifyContent: 'space-around',
    alignSelf: 'flex-end'
  },
  viewEmoji: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    backgroundColor: PUREBLACK,
    width: DEFAULTWIDTH * 0.12,
    height: DEFAULTWIDTH * 0.12,
    borderRadius: GlobalSize(5),
    alignItems: 'center',
    justifyContent: 'center'
  },
})
export default ListItem;