import React, { } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import {PRIMARYCOLOR, PUREWHITE, TEXTCOLOR11 } from "../Constants/Colors/Colors";
import { FONTS } from "../Constants/Fonts";
import { DEFAULTWIDTH } from "../Constants/styles/styles";

const PermissionModal = ({ ModalOpen, setModalOpen, navigation }) => {

  const CloseModal = () => {
    setModalOpen(false),
      navigation.navigate('Onboarding')
  }

  return (

    <Modal
      animationType="fade"
      transparent={true}
      visible={ModalOpen}
      onRequestClose={() => {
        setModalOpen(!ModalOpen)
      }}>
      <View style={styles.mainContainer} >
        <View style={styles.ViewMain}>

          <Text style={styles.TextC}>Please allow the requested permissions to access the files </Text>

          <TouchableOpacity style={styles.TouchBtn} onPress={() => CloseModal()}>
            <Text style={styles.TextBtn}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>


    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#000000aa",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchableStyle: {
    flex: 1,
    height: Dimensions.get('window').height,

  },
  centeredView2: {
    justifyContent: "flex-end",
  },
  TextBtn: {
    fontSize: 14,
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium
  },
  TextC: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR11,
    textAlign: 'center',
    marginBottom: DEFAULTWIDTH * 0.05
  },
  TouchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.3,
    height: DEFAULTWIDTH * 0.12,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,

  },
  ViewMain: {
    width: DEFAULTWIDTH * 0.90,
    borderRadius: 10,
    paddingTop: DEFAULTWIDTH * 0.05,
    backgroundColor: PUREWHITE,
    alignItems: 'center',
    justifyContent: 'center'
  }

});

export default PermissionModal;
