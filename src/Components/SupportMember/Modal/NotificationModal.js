import React, {useState, useRef} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  BORDERCOLOR4,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  VALIDCOLOR,
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { Close } from '../../../../assets';

const NotificationModal = ({ModalOpen, setModalOpen , handleReject , reason_input}) => {
  const reasonRef = useRef();
  const [Reason, setReason] = useState(null);
  const [errorStatus, setErrorStatus] = useState(true);

  const handleReasonText = text => {
    const isReason = /^[A-Za-z.,()0-9 ]{2,}$/.test(text);
    setErrorStatus(isReason);
    setReason(text);
  };

  const CloseModal = () => {
    if (Reason == null) {
      reasonRef?.current?.focus();
      setErrorStatus(false);
    } else {
      setErrorStatus(true);
      setModalOpen(false);
      setReason(null);
      reason_input(Reason);
      handleReject()
    }
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}>
          <View style={styles.viewMain}>
            <View style={styles.rowView}>
              <View>
                <Text style={styles.textReason}>Type your reason</Text>
              </View>

              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Close />
              </TouchableOpacity>
            </View>
            <View style={DEFAULTSTYLES.alignView}>
              <View
                style={[
                  styles.borderView,
                  {borderColor: errorStatus ? BORDERCOLOR4 : VALIDCOLOR},
                ]}>
                <TextInput
                  ref={reasonRef}
                  multiline
                  style={styles.textReason}
                  value={Reason}
                  onChangeText={text => handleReasonText(text)}
                />
              </View>
            </View>

            {!errorStatus && (
              <View style={{marginLeft: DEFAULTWIDTH * 0.05}}>
                <Text style={{color: VALIDCOLOR}}>
                  Please enter your reason here
                </Text>
              </View>
            )}

            <View
              style={[DEFAULTSTYLES.alignView, {marginTop: GlobalSize(15)}]}>
              <TouchableOpacity
                style={[styles.touchBtn, {opacity: Reason ? 1 : 0.5}]}
                onPress={() => CloseModal()}>
                <Text style={styles.textBtn}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  textBtn: {
    fontSize: fontSize(14),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
  },
  touchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.3,
    height: DEFAULTWIDTH * 0.11,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  viewMain: {
    width: DEFAULTWIDTH,
    borderRadius: 10,
    backgroundColor: PUREWHITE,
    justifyContent: 'center',
  },
  textReason: {
    color: PUREBLACK,
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(15),
  },
  borderView: {
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    padding: GlobalSize(10),
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTHEIGHT * 0.2,
    borderRadius: GlobalSize(8),
    marginBottom: GlobalSize(2),
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: GlobalSize(16),
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default NotificationModal;
