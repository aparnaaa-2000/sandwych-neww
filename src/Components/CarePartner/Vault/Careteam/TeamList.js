import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, ScrollView, Image } from 'react-native';

//IMPORT CONSTANTS
import {
  BORDERCOLOR1,
  BORDERCOLOR4,
  BORDERCOLOR5,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR5
} from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT THIRD-PARTY PACKAGES
import moment from 'moment/moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { Account } from '../../../../../assets';

const TeamList = ({
  MedicalDoc,
  valueTeam,
  setValueTeam,
  MedTeam,
  CareTeam,
  LegalDoc,
  setSelectedDoc }) => {

  //To open care team
  const [openTeam, setOpenTeam] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const [Team, setTeam] = useState([
    { label: 'Care team Documents', value: '0' },
    { label: 'Care team', value: 'Care team' },
    { label: 'Medical team', value: 'Medical team' },
    { label: 'Medical History', value: '1' },
  ]);

  // Handle image load errors
  const handleImageError = (index) => {
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [index]: true,
    }));
  };

  
  return (
    <>
      <View style={styles.dropView}>
        <DropDownPicker
          style={styles.textIn}
          placeholder={''}
          open={openTeam}
          value={valueTeam}
          items={Team}
          setOpen={setOpenTeam}
          setValue={(callback) => {
            setValueTeam(callback);
            setSelectedDoc(callback) // Call your function after setting the value
          }}
          setItems={setTeam}
          dropDownDirection="BOTTOM"
          showsVerticalScrollIndicator={false}
          dropDownContainerStyle={styles.containerStyle}
        />
      </View>


      <ScrollView showsVerticalScrollIndicator={false}>
        {valueTeam === 'Medical team' ? (
          <View>
            {MedTeam?.map((item,index) => (
              <View
                key={item?.id} // Assuming each item in MedTeam has a unique id
                style={[
                  styles.cardTeam,
                  Platform.OS === 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow,
                ]}
              >
                {!imageErrors[index] && item?.picture !== null ?
                    <Image
                      source={{ uri: item?.picture }}
                      style={styles.imgView}
                      onError={() => handleImageError(index)}  /> :
                                
                      <Account width={54} height={54} />}
                <View style={{ marginLeft: DEFAULTWIDTH * 0.035 }}>
                  <Text style={styles.textDoc}>{item?.name}</Text>
                  <Text style={styles.textDate}>
                    {item?.team_role == 0 ? 'Primary physician' : item?.team_role == 1 ? 'Physician' : item?.team_role == 2 ? 'Primary Nurse' : 'Nurse'}</Text>
                </View>
              </View>
            ))}
          </View>

        ) :
          valueTeam === 'Care team' ?
            <View>
              {CareTeam?.map((item,index) => (
                <View
                  key={item?.id} // Assuming each item in MedTeam has a unique id
                  style={[
                    styles.cardTeam,
                    Platform.OS === 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow,
                  ]}
                >

                  {!imageErrors[index] && item?.picture !== null ?
                    <Image
                      source={{ uri: item?.picture }}
                      style={styles.imgView}
                      onError={() => handleImageError(index)}  /> :
                                
                      <Account width={54} height={54} />}

                  <View style={{ marginLeft: DEFAULTWIDTH * 0.035 }}>
                    <Text style={styles.textDoc}>{item?.name}</Text>
                    <Text style={styles.textDate}>
                      {item?.team_role == 0 ? 'Case Manager' : item?.team_role == 1 ? 'Primary Carepartner' : item?.team_role == 2 ? 'Carepartner' : 'Support Member'}</Text>
                  </View>
                </View>
              ))}
            </View> :
            valueTeam == '0' ?
              <View>
                {LegalDoc?.map((item) => (
                  <View
                    key={item?.id} // Assuming each item in MedTeam has a unique id
                    style={[
                      styles.cardTeam,
                      Platform.OS === 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow,
                    ]}
                  >
                    <View style={{ marginLeft: DEFAULTWIDTH * 0.035 }}>
                      <Text style={styles.textDoc}>{item?.title}</Text>
                      <Text style={styles.textDate}>Date : {moment(item?.uploaded_at).format('MM/DD/YYYY')}</Text>
                    </View>
                  </View>
                ))}
              </View> :
              valueTeam == '1' ?
                <View>
                  {MedicalDoc?.map((item) => (
                    <View
                      key={item?.id} // Assuming each item in MedTeam has a unique id
                      style={[
                        styles.cardTeam,
                        Platform.OS === 'android' ? DEFAULTSTYLES.androidShadow : DEFAULTSTYLES.iosShadow,
                      ]}
                    >
                      <View style={{ marginLeft: DEFAULTWIDTH * 0.035 }}>
                        <Text style={styles.textDoc}>{item?.title}</Text>
                        <Text style={styles.textDate}>Date : {moment(item?.uploaded_at).format('MM/DD/YYYY')}</Text>
                      </View>
                    </View>
                  ))}
                </View> : null}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  textIn: {
    fontSize: fontSize(16),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR10,
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.13,
    borderWidth: 1,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    paddingLeft: GlobalSize(15),
  },
  dropView: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: DEFAULTWIDTH * 0.07,
    top: GlobalSize(5),
    zIndex: 99,
  },
  textDoc: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(14),
    fontWeight: '500',
    color: TEXTCOLOR10,
  },
  imageV: {
    width: DEFAULTWIDTH * 0.12,
    borderRadius: GlobalSize(25),
    height: DEFAULTWIDTH * 0.12,
  },
  cardView: {
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.9,
    margin: 1,
    height: DEFAULTWIDTH * 0.2,
    paddingLeft: DEFAULTWIDTH * 0.05,
    borderRadius: GlobalSize(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: DEFAULTWIDTH * 0.05,
    alignItems: 'center',
    marginBottom: GlobalSize(10),
  },
  cardTeam: {
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.9,
    height: DEFAULTWIDTH * 0.2,
    paddingLeft: DEFAULTWIDTH * 0.05,
    borderRadius: GlobalSize(8),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: DEFAULTWIDTH * 0.05,
    alignItems: 'center',
    marginBottom: GlobalSize(10),
    margin: 1
  },
  textDate: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    fontWeight: '400',
    color: TEXTCOLOR5,
  },
  profileView: {
    width: GlobalSize(40),
    height: GlobalSize(40),
    borderRadius: GlobalSize(20),
    backgroundColor: BORDERCOLOR5,
  },
  containerStyle: {
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.9,
    zIndex: 99,
  },
  imgView: {
    width: GlobalSize(50),
    height: GlobalSize(50),
    borderRadius: GlobalSize(25)
  }
});
export default TeamList;
