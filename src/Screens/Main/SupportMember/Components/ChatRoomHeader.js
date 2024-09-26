import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Data} from '../../../../Constants/Texts/Assessments/RecepientDemographics/CheckBox';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function ChatRoomHeader({
  data,
  setModalVisible,
  isModalVisible,
}) {
  const navigation = useNavigation();
  const BackArrow = require('../../../../../assets/Images/Arrow.png');
  const PhoneIcon = require('../../../../../assets/Images/Phone.png');
  const MoreIcon = require('../../../../../assets/Images/More.png');


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    console.log(isModalVisible);
    
  };


  return (
    <View style={styles.conteiner}>
      <View style={styles.FirstContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.ArrowFirst}>
          <Image style={styles.ArrowStyle} source={BackArrow} />
        </TouchableOpacity>

        <View style={styles.RowContainer}>
          <Text style={styles.TextStyle}>{data?.sender}</Text>

          <Text style={styles.LocationText}>{data?.location}</Text>
        </View>
      </View>

      <View style={styles.LastContainer}>
        <TouchableOpacity style={styles.CallContainer}>
          <Image style={styles.PhoneIconStyle} source={PhoneIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleModal} style={styles.CallContainer}>
          <Image style={styles.MoreIconStyle} source={MoreIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    width: width,
    height: verticalScale(50),
    borderBottomWidth: moderateScale(2),
    borderBottomColor: '#E8EAF3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  FirstContainer: {
    width: '70%',
    height: '100%',
    flexDirection: 'row',
  },

  ArrowFirst: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ArrowStyle: {
    width: scale(30),
    height: scale(30),
  },
  RowContainer: {
    width: '70%',
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  TextStyle: {
    fontSize: moderateScale(14),
    color: '#262933',
    fontStyle: 'italic',
    fontWeight: '300',
  },
  LocationText: {
    color: '#8A8E9C',
    fontSize: moderateScale(12),
    fontWeight: '400',
    fontStyle: 'normal',
  },
  LastContainer: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  CallContainer: {
    width: scale(40),
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  PhoneIconStyle: {
    width: scale(25),
    height: scale(25),
  },
  MoreIconStyle: {
    width: scale(25),
    height: scale(25),
  },
});
