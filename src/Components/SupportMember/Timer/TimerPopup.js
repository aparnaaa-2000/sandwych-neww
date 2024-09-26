import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BACKGROUNDGREEN1,
  EIGHTHCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
  SEVENTHCOLOR,
  TEXTCOLOR10,
  TEXTCOLOR12,
  TEXTCOLORH,
} from '../../../Constants/Colors/Colors';
import {fontSize} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../Constants/Fonts';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';
import useFinish from '../../../hooks/apihooks/useFinish';

const TimerPopup = ({isVisible, onClose, onComplete, onConfirm}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isVisible) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>Task Timer</Text>

          <View style={styles.borderLine} />

          <Text style={styles.timerText}>{formatTime(time)}</Text>

          <View style={styles.buttonLayout}>
            <TouchableOpacity
              style={[styles.buttonLayer, {backgroundColor: PRIMARYCOLOR}]}
              onPress={() => {
                onClose();
                onComplete();
              }}>
              <Text style={styles.buttonText}>Finish Task</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.borderLine} />

          <View style={{width: '100%', alignItems: 'flex-end'}}></View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: PUREWHITE,
    paddingVertical: DEFAULTHEIGHT * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
  },
  titleText: {
    fontFamily: FONTS.FontBold,
    color: PRIMARYCOLOR,
    fontSize: fontSize(22),
  },
  timerText: {
    fontSize: fontSize(32),
    marginBottom: 50,
    color: '#000',
  },
  reportText: {
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLORH,
    fontSize: fontSize(12),
  },
  borderLine: {
    width: '100%',
    height: 0.3,
    backgroundColor: TEXTCOLOR12,
    marginVertical: DEFAULTHEIGHT * 0.02,
  },
  buttonLayer: {
    width: DEFAULTWIDTH * 0.28,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: PUREWHITE,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontMedium,
  },
  buttonLayout: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});

export default TimerPopup;
