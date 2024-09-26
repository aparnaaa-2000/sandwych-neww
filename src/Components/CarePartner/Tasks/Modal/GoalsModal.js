import React from 'react';
import { View, Modal, StyleSheet,Platform,KeyboardAvoidingView } from 'react-native';
import { DEFAULTHEIGHT } from '../../../../Constants/styles/styles';
import { PUREWHITE } from '../../../../Constants/Colors/Colors';

const GoalsModal = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.modalContent}>
          {children}
          {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity> */}
        </View>
        </KeyboardAvoidingView>
      </View>

    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: DEFAULTHEIGHT * 0.65
  },
  modalContent: {
    backgroundColor: PUREWHITE,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    height: DEFAULTHEIGHT * 0.65
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  keyboardAvoidingContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  
});

export default GoalsModal;