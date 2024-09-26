import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {chatData} from '../data/data';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import useNavigations from '../../../../hooks/navigationhooks/useNavigations';

const {width} = Dimensions.get('window');

const ChatList = () => {
  const {ChatRoomNav} = useNavigations();

  const renderItem = ({item}) => (
    <Pressable onPress={() => ChatRoomNav(item)} style={styles.chatItem}>
      <View style={styles.UserBox}>
        <View style={styles.UserRound}>
          <Image style={styles.Imageboard} source={{uri: item?.image}} />
        </View>
      </View>

      <View style={styles.ChatListCenter}>
        <Text style={styles.SenderText}>{item?.sender}</Text>

        <Text style={styles.MessagePreview}>{item?.messagePreview}</Text>
      </View>

      <View style={styles.MessageEnd}>
        <Text style={styles.TimeStyle}>12 : 41 PM</Text>

        <View style={styles.ChatRoundLength}>
          <Text style={styles.LenghtColor}>3</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={chatData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#fff',
  },
  chatItem: {
    width: width - 10,
    height: verticalScale(70),
    marginTop: moderateScale(5),
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: 'grey',
    flexDirection: 'row',
    padding: moderateScale(2),
    justifyContent: 'space-between',
  },

  UserBox: {
    width: '20%',
    height: '100%',
    marginLeft: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserRound: {
    width: moderateScale(45),
    height: moderateScale(45),
    backgroundColor: '#fff',
    borderRadius: moderateScale(100),
    elevation: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Imageboard: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(100),
  },
  ChatListCenter: {
    width: '60%',
    height: '100%',
    justifyContent: 'center',
    padding: moderateScale(3),
  },
  SenderText: {
    fontsize: moderateScale(19),
    fontWeight: '300',
    fontStyle: 'italic',
    color: '#262933',
  },
  MessagePreview: {
    fontsize: moderateScale(13),
    fontWeight: '400',
    fontStyle: 'normal',
    color: '#8A8E9C',
    marginTop: moderateScale(5),
  },
  MessageEnd: {
    width: '20%',
    height: '80%',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  TimeStyle: {
    fontSize: moderateScale(10),
    color: '#ABB0BF',
  },
  ChatRoundLength: {
    width: moderateScale(20),
    height: moderateScale(20),
    backgroundColor: '#151F6D',
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  LenghtColor: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
});

export default ChatList;
