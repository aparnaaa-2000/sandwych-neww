import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';

const DropdownMenu = ({setModalVisible, isModalVisible}) => {
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={toggleModal}></TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        backdropOpacity={0.3}
        style={styles.modalStyle}>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Mute Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Block</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Clear Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Export Chat</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalStyle: {
    justifyContent: 'flex-start',
    marginTop: 50,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 200,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#151F6D',
  },
});

export default DropdownMenu;
