import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import DefaultBackHeader from '../../../Common/Headers/DefaultBackHeader';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import {
  EIGHTHCOLOR,
  MEDSITEMCOLOR1,
  MEDSITEMCOLOR2,
  NINETHCOLOR,
  PRIMARYCOLOR,
  PUREWHITE,
  SECONDARYCOLOR,
  SEVENTHCOLOR,
} from '../../../../Constants/Colors/Colors';
import {
  Close,
  DateWhiteSmall,
  DayNightWhiteSmall,
  Drop,
  InteractionGreySmall,
  PhysicianSmall,
  TabletorCapsuleSmall,
  TimeWhiteSmall,
  TimerWhiteSmall,
  WarningWhite,
} from '../../../../../assets';
import { FONTS } from '../../../../Constants/Fonts';
import MedBottomModal from '../Modal/MedBottomModal';
import RadioButtonGroup from '../Modal/RadioGroup';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import moment from 'moment';

const DUMMYDATAFULL = {
  nameofMed: 'Famotidine Tablet',
  diagnosis: 'GERD',
  physician: 'Flores Mark, MD',
  location: 'Aster Medicity Hospital',
  dosageInfo: {
    desc: '20mg - Once day - before meals',
    lastTaken: 'February 10, 2024 12:30 pm',
    startDate: '10/02/2024',
    period: 'For 1 month',
  },
  d2dInteraction: {
    medication1: 'Famotidine Tablet',
    medication2: 'Claritin',
    Effects: [
      {
        allergy: 'irritation',
        type: 'normal',
      },
      {
        allergy: 'Mental status change',
        type: 'normal',
      },
      {
        allergy: 'migrain',
        type: 'severe',
      },
    ],
  },
};

const DUMMYDATANULL = {
  nameofMed: 'Famotidine Tablet',
  diagnosis: 'GERD',
  physician: 'Flores Mark, MD',
  location: 'Aster Medicity Hospital',
  dosageInfo: {
    desc: '20mg - Once day - before meals',
    lastTaken: 'February 10, 2024 12:30 pm',
    startDate: '10/02/2024',
    period: 'For 1 month',
  },
  d2dInteraction: {
    medication1: 'Famotidine Tablet',
    medication2: 'Claritin',
    Effects: 'null',
  },
};

const DUMMYDATA = DUMMYDATAFULL;

const MedDetails = ({ navigation, route }) => {

  console.log("Med details................", route?.params?.Data)
  const data = route?.params?.Data;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const saveContent = () => {
    setModalVisible(!isModalVisible);
    // write the function to post the status to api here from the data from RadioButton
  };

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <DefaultBackHeader navigation={navigation} />
      {/* Medication Name */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: route?.params?.itemState == 1 ? GlobalSize(100) : GlobalSize(0) }}>

        <View style={styles.medicineContainer}>

          <View style={styles.medicineIconContainer}>
            {/* Icon Req */}
            <View style={styles.medicineIconView}>
              <Drop width={55} height={55} />
            </View>
            <View style={{ marginLeft: DEFAULTWIDTH * 0.02 }}>
              <Text style={styles.medicineName}>{data?.medication_name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.diagnosisText}>Diagnosis: </Text>
                <Text style={styles.diagnosisName}>{data?.diagnosis_name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.medicineMoreInfo}>
            <View style={styles.medicinePharmacistView}>
              {/* iconReq */}
              <View style={styles.pharmacistIcon}>
                <PhysicianSmall />
              </View>

              <Text style={styles.pharmacistName}>{data?.physician_name}</Text>
            </View>
            <Text style={styles.hospitalName}>{data?.physician_hospital}</Text>
          </View>
        </View>

        {/* Dosage Info */}
        <View style={styles.dosageInfoContainer}>
          <View style={styles.dosageInfoHeader}>
            <View style={styles.dosageInfoHeaderIcon}>
              <TabletorCapsuleSmall />
            </View>
            <Text style={styles.dosageInfoHeaderText}>Dosage Info</Text>
          </View>
          <View>
            <View style={styles.dosageInfoRows}>
              <DayNightWhiteSmall />
              <Text
                style={[styles.infoDescText, { marginLeft: DEFAULTWIDTH * 0.02 }]}>
                {data?.dosage} - {data?.frequency} - {data?.instruction_for_medication_usage}
              </Text>
            </View>

            {data?.last_taken_datetime &&
              <View style={styles.dosageInfoRows}>
                <TimeWhiteSmall />

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.infoDescTextContent}>Last Taken : </Text>
                  <Text style={styles.infoDescText}>
                    {moment(data?.last_taken_datetime).format('YYYY-MM-DD')}
                  </Text>
                </View>
              </View>}
            <View style={styles.dosageInfoRows}>
              <DateWhiteSmall />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.infoDescTextContent}>Start Date : </Text>
                <Text style={styles.infoDescText}>
                  {data?.start_date}
                </Text>
              </View>
            </View>
            <View style={styles.dosageInfoRows}>
              <TimerWhiteSmall />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.infoDescTextContent}>Period : </Text>
                <Text style={styles.infoDescText}>
                  {data?.days_period}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Drug to Drug Interaction Report */}
        <View style={styles.d2dInteactionContainer}>
          <View style={styles.d2dInteractionHeader}>
            <InteractionGreySmall width={18} height={18} />
            <Text style={styles.d2dHeaderText}>
              Drug to Drug Interaction Info
            </Text>
          </View>
          <View>
            {/* {DUMMYDATA.d2dInteraction.Effects != 'null' ? ( */}
            <View>
            <View style={{ marginHorizontal: DEFAULTWIDTH * 0.04,marginBottom:GlobalSize(10) }}>
              {data?.drug_drug_interactions?.map((item) => {
                
                return (
                  <View style={{marginTop:GlobalSize(8),flexDirection:'column'}} >
                    <View style={styles.medicationRow}>
                      <Text style={styles.d2dAllergyText}>Medication 1 : </Text>
                      <Text style={styles.d2dAllergyText} numberOfLines={5}>
                        {item?.patient_medication_1}
                      </Text>
                    </View>

                    <View style={styles.medicationRow}>
                      <Text style={styles.d2dAllergyText}>Medication 2 : </Text>
                      <Text style={styles.d2dAllergyText} numberOfLines={5}>
                        {item?.patient_medication_2}
                      </Text>
                    </View>
                    <Text style={styles.interactionSubHeading}>
                  Drug Interaction Report :
                </Text>

                <Text style={styles.d2dAllergyText} numberOfLines={5}>
                        {item?.drug_interaction_message}
                      </Text>
                  </View>
                )
              })}
    
              </View>

              <View style={styles.warningView}>
                <WarningWhite width={24} height={24} />
                <View>
                  <Text
                    style={[
                      styles.hospitalName,
                      { marginLeft: DEFAULTWIDTH * 0.02 },
                    ]}>
                    Please contact your physician with your full
                  </Text>
                  <Text
                    style={[
                      styles.hospitalName,
                      { marginLeft: DEFAULTWIDTH * 0.02 },
                    ]}>
                    medication list for review.
                  </Text>
                </View>
              </View>
            </View>
    
          </View>
        </View>
      </ScrollView>

{route?.params?.itemState == 1 &&
      <View style={styles.absoluteLayer}>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => navigation.navigate('TransferMeds')}>
          <Text style={styles.btnText}>Transfer Medication</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleModal}
          style={[styles.btnPrimary, { backgroundColor: SECONDARYCOLOR }]}>
          <Text style={styles.btnText}>Mark the given Medicine</Text>
        </TouchableOpacity>
      </View>}

      <MedBottomModal isVisible={isModalVisible} onClose={toggleModal}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalText}>
            Have you completed the medication?
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Close />
          </TouchableOpacity>
        </View>

        <RadioButtonGroup
          TaskId={data?.task_id}
          navigation={navigation}
          onClose={toggleModal}
          onSave={saveContent} />
      </MedBottomModal>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  medicineContainer: {
    marginTop: GlobalSize(10),
    marginHorizontal: DEFAULTWIDTH * 0.06,
    backgroundColor: MEDSITEMCOLOR1,
    borderRadius: GlobalSize(10),
  },
  medicineIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: GlobalSize(10),
  },
  medicineIconView: {
    //height: DEFAULTHEIGHT * 0.08,
    alignItems: 'center',
    width: DEFAULTWIDTH * 0.18,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: MEDSITEMCOLOR2,
    borderRadius: GlobalSize(10),
    padding: GlobalSize(5)
  },
  medicineName: {
    color: PUREWHITE,
    fontSize: fontSize(13),
    fontFamily: FONTS.FontBold,
    maxWidth: DEFAULTWIDTH * 0.55
  },
  diagnosisText: {
    color: PUREWHITE,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
  },
  diagnosisName: {
    color: PUREWHITE,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontSemiB,
  },
  medicineMoreInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: GlobalSize(10),
    borderTopRightRadius: GlobalSize(10),
    borderColor: PUREWHITE,
    borderWidth: 1,
    height: DEFAULTHEIGHT * 0.04,
    alignItems: 'center',
  },
  medicinePharmacistView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pharmacistIcon: {
    marginHorizontal: DEFAULTWIDTH * 0.02
  },
  pharmacistName: {
    color: PUREWHITE,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontSemiB,
  },
  hospitalName: {
    color: PUREWHITE,
    marginRight: DEFAULTWIDTH * 0.02,
    fontSize: fontSize(12),
    fontFamily: FONTS.FontRegular,
  },
  infoDescText: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(12),
    color: PUREWHITE,
  },
  infoDescTextContent: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(12),
    color: PUREWHITE,
    marginLeft: DEFAULTWIDTH * 0.02,
  },
  dosageInfoRows: {
    flexDirection: 'row',
    margin: DEFAULTWIDTH * 0.02,
    alignItems: 'center'
  },
  dosageInfoContainer: {
    backgroundColor: SEVENTHCOLOR,
    marginTop: GlobalSize(10),
    marginHorizontal: DEFAULTWIDTH * 0.06,
    borderRadius: GlobalSize(10),
  },
  dosageInfoHeader: {
    flexDirection: 'row',
    backgroundColor: EIGHTHCOLOR,
    borderRadius: GlobalSize(10),
    alignItems: 'center',
  },
  dosageInfoHeaderIcon: {
    width: DEFAULTWIDTH * 0.08,
    height: DEFAULTWIDTH * 0.08,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginTop: GlobalSize(5),
  },
  dosageInfoHeaderText: {
    fontFamily: FONTS.FontBold,
    fontSize: fontSize(12),
    color: PUREWHITE,
  },
  d2dAllergyText: {
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(14),
  },
  interactionSubHeading: {
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(14),
  },
  allergyRiskBadge: {
    padding: DEFAULTWIDTH * 0.002,
    backgroundColor: PRIMARYCOLOR,
    borderRadius: GlobalSize(5),
  },
  allergyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  d2dInteractionHeader: {
    flexDirection: 'row',
    backgroundColor: '#e3e3e3',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: GlobalSize(5),
  },
  d2dInteactionContainer: {
    backgroundColor: '#b3b0b6',
    marginTop: DEFAULTHEIGHT * 0.02,
    marginHorizontal: DEFAULTWIDTH * 0.06,
    borderRadius: GlobalSize(10),
    marginBottom:GlobalSize(20)
  },
  d2dHeaderText: {
    marginLeft: GlobalSize(5),
    fontSize: fontSize(15),
    fontFamily: FONTS.FontBold,
    color: PRIMARYCOLOR,
  },
  medicationRow: {
    //flexDirection: 'row',
    marginBottom: DEFAULTHEIGHT * 0.01
  },
  btnText: {
    color: PUREWHITE,
    fontSize: fontSize(16),
    fontFamily: FONTS.FontMedium,
  },
  btnPrimaryd2d: {
    backgroundColor: PRIMARYCOLOR,
    borderRadius: GlobalSize(10),
    width: DEFAULTWIDTH * 0.90,
    height: GlobalSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    backgroundColor: PRIMARYCOLOR,
    borderRadius: GlobalSize(10),
    width: DEFAULTWIDTH * 0.90,
    height: GlobalSize(35),
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: GlobalSize(10),
    paddingRight: GlobalSize(10),
    marginBottom: DEFAULTHEIGHT * 0.008,
  },
  warningView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: DEFAULTWIDTH * 0.02,
    backgroundColor: NINETHCOLOR,
    borderBottomLeftRadius: GlobalSize(10),
    borderBottomRightRadius: GlobalSize(10),
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
    marginBottom: GlobalSize(15)
  },
  absoluteLayer: {
    position: 'absolute',
    bottom: GlobalSize(0),
    alignItems: 'center',
    marginTop: GlobalSize(20),
    backgroundColor: PUREWHITE,
    left: 0,
    right: 0,
    paddingBottom: GlobalSize(10),
    paddingTop: GlobalSize(5)
  },
});

export default MedDetails;
