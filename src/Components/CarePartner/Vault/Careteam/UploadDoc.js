
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import { BlueAttach } from '../../../../../assets';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  BORDERCOLOR4,
  BOTTOMTABTEXT1,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR13,
  TEXTCOLOR7
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import ResourceHeader from '../../../Common/Headers/ResourceHeader';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { UploadDocClear } from '../../../../redux/Slice/CareTeam/UploadDocKey';
import ErrorPopup from '../../../ComingSoonPopup/ErrorPopup';
import { getLegalDocList, UploadDocument } from '../../../../redux/Thunk/CareTeamThunk';

const UploadDoc = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [filesValue, setFilesValues] = useState(null);
  const [PdfFile, setPDFfile] = useState(null);
  const [UserData, setUserData] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [ErrorModal, setErrorModal] = useState(false);
  const [Message, setMessage] = useState(null)

  console.log("DOC TYPE", route?.params?.docType)
  const docType = route?.params?.docType
  const { error, isLoading, LegalDocList, UploadLoading, UploadSuccess, Uploaderror } = useSelector(
    state => ({
      LegalDocList: state.getLegalDocList.data,
      error: state.getLegalDocList.error,
      isLoading: state.getLegalDocList.isLoading,
      UploadLoading: state.UploadDoc.isLoading,
      UploadSuccess: state.UploadDoc.data,
      Uploaderror: state.UploadDoc.error
    }),
    shallowEqual
  );

  // Stable function to get stored data
  const getData = useCallback(async () => {
    try {
      const storedValue = await AsyncStorage.getItem('TOKENAuth');
      const patientData = await AsyncStorage.getItem('PatientData');
      const carepartnerData = await AsyncStorage.getItem('UserData');

      return {
        storedValue,
        patientData: patientData != null ? JSON.parse(patientData) : null,
        carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null,
      };
    } catch (e) {
      console.error('Error retrieving data:', e);
      return {
        storedValue: null,
        patientData: null,
        carepartnerData: null,
      };
    }
  }, []);


  useEffect(() => {
    // Fetch user data and legal document list once on component mount
    getData().then(data => {
      setUserData(data);
      if (data?.storedValue) {
        getLegalDocList(docType, data.storedValue, dispatch);
      }
    });
    OnSubmitSuccess()
  }, [getData, UploadSuccess, Uploaderror, dispatch]);

  useEffect(() => {
    // Compute options once LegalDocList is available
    if (LegalDocList) {
      computeOptionDoc();
    }

  }, [LegalDocList]);

  const OnSubmitSuccess = () => {
    if (UploadSuccess && filePath && filesValue) {
      setTimeout(() => {
        navigation.navigate('Careteam')
      }, 1000)
      dispatch(UploadDocClear())
    }

    else if (Uploaderror && filePath && filesValue) {
      console.log("upload error..............",Uploaderror)
      setMessage('Uploading failed!')
      setErrorModal(true)

      setTimeout(() => {
        setErrorModal(false)
      }, 1500)
      dispatch(UploadDocClear())
    }
  }

  const computeOptionDoc = useCallback(() => {
    if (LegalDocList?.length) {
      const optionAllergy = LegalDocList.map(item => ({
        label: item.title,
        value: item.id.toString() // Convert to string if necessary
      }));
      setFiles(optionAllergy);
    }
  }, [LegalDocList]);

  const selectDocFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPDFfile(res[0].name);
      setFilePath(res[0]);
      console.log("filersssssssssssss..........................", res[0])
    } catch (err) {
      // Handle error or cancellation
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled document picker");
      } else {
        console.error("Document picker error: ", err);
      }
    }
  };

  const onSubmitDoc = () => {
    if (filesValue && PdfFile) {
      UploadDocument( //FUNCTION FOR UPLOADING THE DOCUMENTS
        UserData?.patientData?.patient_id,
        filesValue,
        filePath,
        UserData?.storedValue,
        dispatch);
    } else {
      console.log("Please select a document and a file type.");
    }
  };

 
  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} />
      <ResourceHeader navigation={navigation} title={'Upload documents'} />

      <View style={{ paddingLeft: GlobalSize(20) }}>
        <Text style={styles.textDoc}>What type of PDF you want to upload?</Text>

        <View style={styles.mainView}>
          <Dropdown
            style={styles.textIn}
            placeholderStyle={styles.placeholderS}
            itemTextStyle={styles.textArea}
            selectedTextStyle={styles.textArea}
            containerStyle={styles.dropView}
            data={files} // Provide the computed options
            search={false}
            labelField="label"
            valueField="value"
            placeholder={'Select'}
            value={filesValue}
            showsVerticalScrollIndicator={false}
            onChange={item => setFilesValues(item.value)}
          />
        </View>

        <View style={styles.borderLine}>
          <View style={DEFAULTSTYLES.alignView}>
            <BlueAttach width={GlobalSize(50)} height={GlobalSize(50)} opacity={0.1} />
            <Text style={styles.pdftext}>{PdfFile ? PdfFile : 'Upload your document'}</Text>
          </View>

          <TouchableOpacity
            style={[styles.touchBtn, {
              backgroundColor: filesValue ? PUREBLACK : BORDERCOLOR4
            }]}
            onPress={selectDocFile}
            disabled={!filesValue} // Disable button if no file type is selected
          >
            <Text style={styles.textBtn}>BROWSE FILES</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.submitBtn}>
        <TouchableOpacity
          style={[styles.submitTouch, { opacity: filesValue && PdfFile ? 1 : 0.5 }]}
          onPress={onSubmitDoc}
          disabled={!filesValue || !PdfFile} // Disable submit if necessary fields are empty
        >
          <Text style={styles.textBtn}>Submit</Text>
          {UploadLoading &&
            <ActivityIndicator size={20} color={BACKGROUNDWHITE} />}
        </TouchableOpacity>
      </View>

      <ErrorPopup
        Message={Message}
        ModalOpen={ErrorModal}
        setModalOpen={setErrorModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textDoc: {
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR10,
    fontSize: fontSize(14)
  },
  dropView: {
    borderRadius: 8,
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.88,
    color: TEXTCOLOR10,
  },
  mainView: {
    marginTop: GlobalSize(10),
    marginBottom: GlobalSize(10),
  },
  textIn: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.88,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
    padding: GlobalSize(5),
    color: TEXTCOLOR7,
    height: GlobalSize(45)
  },
  textArea: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
  },
  placeholderS: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: BOTTOMTABTEXT1,
  },
  textBtn: {
    fontSize: fontSize(14),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
    textAlign: 'center',
    marginRight: GlobalSize(10)
  },
  touchBtn: {
    marginBottom: GlobalSize(10),
    width: DEFAULTWIDTH * 0.38,
    height: DEFAULTHEIGHT * 0.06,
    backgroundColor: BORDERCOLOR4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: GlobalSize(5),
    marginLeft: GlobalSize(10),
    marginRight: GlobalSize(10),
    borderRadius: 4,
    marginTop: GlobalSize(10)
  },
  pdftext: {
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR13,
    fontSize: fontSize(14),
    padding: GlobalSize(8)
  },
  submitBtn: {
    alignItems: 'center',
    position: 'absolute',
    bottom: GlobalSize(10),
    justifyContent: 'center',
    left: 0,
    right: 0
  },
  submitTouch: {
    marginBottom: GlobalSize(10),
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTHEIGHT * 0.06,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    padding: GlobalSize(5),
    marginLeft: GlobalSize(10),
    marginRight: GlobalSize(10),
    borderRadius: GlobalSize(4),
    marginTop: GlobalSize(10),
    flexDirection: 'row'
  },
  borderLine: {
    borderWidth: 1,
    borderColor: BORDERCOLOR1,
    width: DEFAULTWIDTH * 0.88,
    borderRadius: GlobalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
    padding: GlobalSize(20)
  }
});

export default UploadDoc;
