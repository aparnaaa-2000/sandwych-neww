import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, BackHandler, TouchableOpacity, Platform } from 'react-native';

//IMPORT CONSTANTS
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
} from '../../Constants/Colors/Colors';
import { Check, Uncheck } from '../../../assets';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT PACKAGES
import { Button, Modal } from 'react-native-paper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

import { HIPAAVerification } from '../../redux/thunk';
import { HIPAAVerifyClear } from '../../redux/Slice/HIPAA/HIPAAVerificationKey';

const HipaaValidationForm = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const [UserData, setUserData] = useState(null)
  const hideModal = () => setVisible(false);
  const [token, setToken] = useState(null)
  const [isChecked, setChecked] = useState(false);

  const { data, error, isLoading } = useSelector(
    state => ({
      data: state.HIPAAVerification.data,
      error: state.HIPAAVerification.error,
      isLoading: state.HIPAAVerification.isLoading,
    }),
    shallowEqual
  );

  //FUNCTION FOR SHOWING THE PDF
  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(route?.params?.pdf)}&embedded=true`;

  const getData = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const carepartnerData = await AsyncStorage.getItem('UserData');
      setToken(storedValue)
      const carepartner =
        carepartnerData != null ? JSON.parse(carepartnerData) : null;

      return { storedValue, carepartner };
    } catch (e) {
      console.error('Error retrieving data:', e);
    }
  };

  useEffect(() => {
    dispatch(HIPAAVerifyClear())
    getData((data) => {
      setUserData(data)
    }) //GETTING THE ASYNC DATA

    ModalOpen_Redux();
  }, [error, data, token]);
console.log(data)
  //FUNCTION FOR UPDATING THE DATA WHEN CALLING THE API
  const ModalOpen_Redux = () => {
    if (data && route?.params?.userId && route?.params?.hipaaId) {
      if (UserData?.carepartner?.role == 'carepartner') {
        navigation.navigate('EnrollmentStack', { screen: 'ChooseTheUser' })
      } else {
        navigation.replace('EnrollmentStack', { screen: 'MainAssessment' });
      }
    }
  }

  useEffect(() => {

    handleBackButtonPressAndroid()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, [navigation]);

  const handleCheckBoxToggle = () => {
    setChecked(!isChecked);
  };

  const handleBackButtonPressAndroid = () => { // HANDLING THE BACK NAVIGATION OF THE DEVICE
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    else {
      return true;
    }
  };


  const HIPAAVerificationAPI = () => { //FUNCTION FOR VERIFY THE HIPAA USING API
    HIPAAVerification(route?.params?.userId, route?.params?.hipaaId, token, dispatch);
  }


  return (
    <>

      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }} />
      <View style={styles.viewHead}>
        <Text style={styles.headerText}>HIPAA Authorization</Text>
      </View>

      <WebView
        source={{ uri: googleDocsUrl }}
        style={{ marginBottom: DEFAULTHEIGHT * 0.17, backgroundColor: BACKGROUNDWHITE, }}

      />

      <View style={styles.bottomView}>

        <View style={styles.viewCheck}>
          <TouchableOpacity onPress={() => handleCheckBoxToggle()} style={{ marginTop: GlobalSize(4) }}>
            {isChecked ?
              <Check /> :
              <Uncheck />}
          </TouchableOpacity>

          <View style={{ marginLeft: GlobalSize(10) }}>
            <Text style={styles.normalText}>I accept and continue the terms and</Text>
            <Text style={styles.normalText}>conditions</Text>
          </View>
        </View>
        <Button style={[styles.buttonStyle, { borderColor: isChecked ? BORDERCOLOR4 : BORDERCOLOR1 }]}
          onPress={() => isChecked ? showModal() : console.log("")}>
          <Text style={[styles.buttonText, { color: isChecked ? PRIMARYCOLOR : BORDERCOLOR1 }]}>Confirm</Text>
        </Button>
      </View>

      <Modal
        visible={visible}
        onDismiss={hideModal}
      >
        <View style={styles.modalView}>
          <Text
            style={styles.textApprove}>
            Approve the HIPAA Authorization
          </Text>

          <Text style={styles.textHipaa}>
            It is mandatory to read and confirm your HIPAA Authorization. If you
            haven't read it Kindly go back and Read the HIPAA Authorization.
            Then click continue to proceed.
          </Text>
          <View style={styles.modalButtonView}>
            <Button style={styles.popupButtonStyle} onPress={hideModal}>
              <Text style={styles.buttonText}>Back</Text>
            </Button>
            <Button
              onPress={() => HIPAAVerificationAPI()}
              style={styles.popupButtonStyle}>
              <Text style={styles.buttonText}>Continue</Text>
            </Button>
          </View>
        </View>
      </Modal>
      {/* 
     
   
      </SafeAreaView> */}
    </>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    //backgroundColor: BACKGROUNDWHITE,
    flex: 1,
  },
  hipaaView: {
    flex: 1,
    margin: GlobalSize(10),
    //marginBottom: GlobalSize(100)
  },
  viewHead: {
    paddingVertical: GlobalSize(8),
    paddingLeft: GlobalSize(20),
    backgroundColor: BACKGROUNDWHITE
  },
  rowContainer: {
    flexDirection: 'row'
  },
  headerText: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(25),
    color: PRIMARYCOLOR,
  },
  normalText: {
    fontFamily: 'Inter-Regular',
    fontSize: fontSize(15),
    color: PRIMARYCOLOR,
  },
  webview: {
    flex: 1,
  },
  bottomView: {
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? DEFAULTWIDTH * 0.1 : DEFAULTWIDTH * 0.001,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? GlobalSize(30) : GlobalSize(60),
    backgroundColor: BACKGROUNDWHITE,
    paddingTop: GlobalSize(8),
  },
  buttonStyle: {
    width: DEFAULTWIDTH * 0.90,
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: 8,
    backgroundColor: BACKGROUNDWHITE,
    marginBottom: GlobalSize(20)
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: GlobalSize(14),
    color: PRIMARYCOLOR,
  },
  popupButtonStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.35,
  },
  modalView: {
    margin: GlobalSize(10),
    width: DEFAULTWIDTH * 0.94,
    backgroundColor: PUREWHITE,
    borderRadius: 8,
    padding: GlobalSize(15),

  },
  textHipaa: {
    textAlign: 'center',
    color: TEXTCOLOR10
  },
  viewCheck: {
    flexDirection: 'row',
    marginBottom: GlobalSize(10),
    left: GlobalSize(-18)
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: GlobalSize(10),
    marginTop: GlobalSize(20)
  },
  textApprove: {
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(18),
    color: PRIMARYCOLOR,
    alignSelf: 'center',
    marginBottom: GlobalSize(10)
  }
});

export default HipaaValidationForm;


// import React from 'react';
// import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
// import { PUREBLACK } from '../../Constants/Colors/Colors';

// const AbsoluteButton = () => {
//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.scrollView}>
//         <Text style={{color:PUREBLACK}}>
//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

//         "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"


//         </Text>
//       </ScrollView>
//       <TouchableOpacity style={styles.absoluteButton}>
//       <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20, // Added padding to avoid button overlap
//   },
//   scrollView: {
//     flex: 1,
//     width: '100%',
//     marginBottom: 60, // Adjust this value to avoid button overlap
//   },
//   absoluteButton: {
//     position: 'absolute',
//     bottom: 20,  // You can adjust the position as per your requirement
//     right: 20,   // You can adjust the position as per your requirement
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default AbsoluteButton;
