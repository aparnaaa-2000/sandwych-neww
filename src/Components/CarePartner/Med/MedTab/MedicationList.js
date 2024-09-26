import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';

//IMPORT CONSTANTS
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import { FONTS } from '../../../../Constants/Fonts';
import { Close, Drop } from '../../../../../assets';
import {
  FOURTHCOLOR,
  MEDSITEMCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
  SEVENTHCOLOR,
  TRANSPARENTCOLOR1,
} from '../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import MedBottomModal from '../Modal/MedBottomModal';
import RadioButtonGroup from '../Modal/RadioGroup';

const MedicationList = ({ medication, day, navigation,itemState }) => {
  let badgeText, badgeColor, press;

  // In Switch case checking the stats to update the badge on top.
  // Additionally checking the day Today = 0, Yesterday = 1
  // badgeText - identifies the text which is shown in badge
  // badgecolor - indicates the color shown to badge
  // press - true - indicates the badge is disabled
  // press - false - indicates the badge can be pressed
  switch (medication.stats) {
    case 'upcoming':
      badgeText = 'Done?';
      (badgeColor = MEDSITEMCOLOR2), (press = false);
      break;
    case 'pending':
      badgeText = day == 1 ? 'Skipped' : 'Pending';
      badgeColor = FOURTHCOLOR;
      press = day == 1 ? true : false;
      break;
    case 'completed':
      badgeText = 'Done';
      badgeColor = SEVENTHCOLOR;
      press = true;
      break;
    default:
      badgeText = 'Done?';
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    if(itemState == 1){
    setModalVisible(!isModalVisible);
    }
  };

  const saveContent = () => {
    setModalVisible(!isModalVisible);
    // write the function to post the status to api here from the data from RadioButton
  };
  

  return (

    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={[styles.headerItems, DEFAULTSTYLES.medMarginLeft]}>
          <Text style={styles.diagnosisText}>{medication.diagnosis_name}</Text>
        </View>

        {/* Button / Marking */}
        <TouchableOpacity
          disabled={press}
          onPress={medication?.status == '4' ? toggleModal:console.log("")}
          style={[
            styles.buttonView,
            { backgroundColor: medication?.status == '0' ? FOURTHCOLOR :
               medication?.status == '1'
              || medication?.status == '2' 
              || medication?.status == '5' ||   medication?.status == '3' ? SEVENTHCOLOR:
            medication?.status == '4' ? FOURTHCOLOR:badgeColor },
            Platform.OS === 'ios'
              ? DEFAULTSTYLES.iosShadow
              : DEFAULTSTYLES.androidShadow,
          ]}>
          <Text
            style={[
              styles.textColor,
              { fontFamily: FONTS.FontSemiB, fontSize: fontSize(12) },
            ]}>
            {medication?.status == '4' ? 'Pending' :
             medication?.status == '0' ? 'Skipped' : 
             medication?.status == '3' ||
              medication?.status == '1'
              || medication?.status == '2' 
              || medication?.status == '5' ?'Completed' : 
             null}
          </Text>
        </TouchableOpacity>
      </View>

      {/* From here navigate to the Medication Details Page */}
      <TouchableOpacity
        style={styles.infoView}
        onPress={() => navigation.navigate('MedStack', {
          screen: 'MedDetails',
          params: { Data: medication ,itemState : itemState}
        })}>
        {/* Icon */}
        <View style={styles.iconView}>
          <Drop width={55} height={55} />
        </View>
        {/* Informations */}
        <View style={{ paddingBottom: GlobalSize(10) }}>
          <View style={styles.informationView}>
            <Text style={[styles.titleText,{maxWidth: DEFAULTWIDTH * 0.5}]}>{medication?.medication_name}</Text>
            <Text style={[styles.textColor, { fontFamily: FONTS.FontLight, width: GlobalSize(160) }]}>
              {medication?.instruction_for_medication_usage}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <MedBottomModal isVisible={isModalVisible} onClose={toggleModal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalText}>
            Have you completed the medication?
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Close />
          </TouchableOpacity>
        </View>
        <View style={styles.modalSubHeader}>
          <Text style={styles.titleText}>{medication?.medication_name}</Text>
          <Text style={[styles.textColor, { fontFamily: FONTS.FontLight }]}>
            {medication?.instruction_for_medication_usage}
          </Text>
        </View>

        <RadioButtonGroup
          TaskId={medication?.task_id}
          onClose={toggleModal}
          onSave={saveContent}
          navigation={navigation} />
      </MedBottomModal>
    </View>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    width: DEFAULTWIDTH * 0.72,
    marginBottom: DEFAULTHEIGHT * 0.009,
    borderRadius: GlobalSize(15),
    backgroundColor: TRANSPARENTCOLOR1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: MEDSITEMCOLOR2,
    borderTopLeftRadius: GlobalSize(15),
    borderTopRightRadius: GlobalSize(15),
    alignItems: 'center',
  },
  iconView: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textColor: {
    color: PUREWHITE,
  },
  buttonView: {
    width: DEFAULTWIDTH * 0.21,
    borderBottomLeftRadius: GlobalSize(15),
    borderTopRightRadius: GlobalSize(15),
    borderLeftWidth: 0.5,
    borderColor: PUREWHITE,
    height: DEFAULTHEIGHT * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerItems: {
    height: DEFAULTHEIGHT * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoView: {
    flex: 1,
    flexDirection: 'row'
  },
  informationView: {
    justifyContent: 'space-around',
    flex: 0.8,
    marginTop: GlobalSize(15)
  },
  titleText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(12),
    color: PUREWHITE
  },
  diagnosisText: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: PUREWHITE,
  },
  closeModalView: {
    backgroundColor: PRIMARYCOLOR,
    width: DEFAULTWIDTH * 0.06,
    height: DEFAULTWIDTH * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(15),
  },
  closeText: {
    color: PUREWHITE,
    fontFamily: FONTS.FontBold
  },
  modalText: {
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    fontSize: fontSize(15),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalSubHeader: {
    alignItems: 'center',
    backgroundColor: TRANSPARENTCOLOR1,
    marginVertical: DEFAULTHEIGHT * 0.016,
    paddingVertical: DEFAULTHEIGHT * 0.01,
    marginBottom: GlobalSize(15)
  },
});

export default MedicationList;
