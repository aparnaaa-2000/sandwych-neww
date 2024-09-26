import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SuccessPopup from '../../../../Components/ComingSoonPopup/Successpopup';

export default function ProfileModal({ModalOpen, setModalOpen}) {
  return (
    <SuccessPopup
      Message={'Successfully updated user profile!'}
      ModalOpen={ModalOpen}
      setModalOpen={setModalOpen}
    />
  );
} 
