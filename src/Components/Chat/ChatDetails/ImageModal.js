import React, { } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Image
} from 'react-native';

//IMPORT CONSTANTS
import { PUREBLACK } from '../../../Constants/Colors/Colors';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const FileModal = ({ ModalOpen, setModalOpen, imagePath }) => {

  return (

    <Modal
      animationType={'slide'}
      transparent={false}
      visible={ModalOpen}
      onRequestClose={() => {
        setModalOpen(false)
      }}>
      <View style={styles.container}>

        <View>
          <Image
            source={{ uri: imagePath }}
            style={{ width: GlobalSize(300), height: GlobalSize(300) }}
            resizeMode={'contain'}
          />
        </View>
      </View>
    </Modal>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:PUREBLACK,
    marginTop: GlobalSize(30),
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: GlobalSize(100),
  },

});

export default FileModal;
