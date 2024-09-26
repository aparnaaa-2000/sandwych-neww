import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR11,
  THIRDCOLOR,
} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';


const SupportModal = ({ModalOpen, setModalOpen, Message}) => {

  const [isPressed1, setIsPressed1] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);
  const [isPressed4, setIsPressed4] = useState(false);

  const CloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ModalOpen}
      onRequestClose={() => {
        setModalOpen(!ModalOpen);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.viewMain}>

          <View style={styles.buttonView}>
            <View style={styles.viewSub1}>

              <TouchableOpacity
                onPressIn={() => setIsPressed2(true)}
                onPressOut={() => setIsPressed2(false)}
                activeOpacity={1}
                onPress={() => setModalOpen(false)}>
                <Text
                  style={[
                    styles.textBtn,
                    {
                      color: isPressed2 ? PUREWHITE : PRIMARYCOLOR,
                    },
                  ]}>
                  {Message}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: "#000000aa",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  textBtn: {
    fontSize: 14,
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontMedium,
    textAlign: 'center',
  },
  textCancel: {
    fontFamily: FONTS.FontMedium,
    fontSize: 14,
    color: THIRDCOLOR,
    fontWeight: '700',
  },
  textC: {
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR11,
    textAlign: 'left',
  },
  touchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.38,
    height: DEFAULTWIDTH * 0.2,
    backgroundColor: BACKGROUNDWHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1.5,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    borderColor: PRIMARYCOLOR,
  },
  viewMain: {
    width: DEFAULTWIDTH * 0.9,
    borderRadius: 10,

    backgroundColor: PUREWHITE,
    paddingBottom: 10,
    paddingTop: 0,
    paddingBottom: 10,
    // alignItems: 'flex-start',
    justifyContent: 'center',
  },
  buttonView: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: DEFAULTWIDTH * 0.028,
  },
  viewSub1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 15,
    marginRight: 15,
  },
});

export default SupportModal;
