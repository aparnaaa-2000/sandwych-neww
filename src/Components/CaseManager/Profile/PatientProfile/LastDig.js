import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {FONTS} from '../../../../Constants/Fonts';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR7,
  LINECOLOR1,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR7,
  TEXTCOLORSC1,
} from '../../../../Constants/Colors/Colors';
import {DEFAULTWIDTH} from '../../../../Constants/styles/styles';

const LastDig = ({navigation}) => {
  const DIAGNOSISDATA = {
    currentDiagnosis: [
      {
        diagnosisId: '12456',
        diagnosis: 'Alzheimer',
        icdcode: 'G30.9',
        physician: 'Flores, Mark MD',
        location: 'Pearl Hospital',
        diagnosedOn: '12-2-2024',
      },
    ],
    previiousDiagnosis: [
      {
        diagnosisId: '12345',
        diagnosis: 'Liver Cirrhosis',
        icdcode: 'L76.1',
        physician: 'Flores, Mark MD',
        location: 'Pearl Hospital',
        diagnosedOn: '12-2-2024',
      },
      {
        diagnosisId: '12540',
        diagnosis: 'HiperTension',
        icdcode: 'H20.2',
        physician: 'Flores, Mark MD',
        location: 'Pearl Hospital',
        diagnosedOn: '12-2-2024',
      },
    ],
  };


  
  const onNavigateToDiagnosisList = () => {
    const PREVDATA = DIAGNOSISDATA.previiousDiagnosis

    navigation.navigate('CasePatientDiagnosis', { prevdata: PREVDATA});
    // navigation.navigate('HomeStack', {screen: 'CasePatientDiagnosis'})
  };

  const renderComponent = ({item}) => {
    return (
      <View>
        {Object.keys(item).map(key => (
          <>
            <View key={key} style={styles.itemRow}>
              <Text style={styles.textDetails}>{key.toUpperCase()} :</Text>
              <Text style={styles.textSubDetails}>{item[key]}</Text>
            </View>
            <View style={styles.lineView} />
          </>
        ))}
      </View>
    );
  };

  return (
    <View>
      <View style={styles.infoHeader}>
        <Text style={styles.textLast}>Treatment Info</Text>
        <TouchableOpacity
          onPress={() => {
            onNavigateToDiagnosisList();
          }}
          style={{}}>
          <Text style={styles.moreBtnText}>view more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DIAGNOSISDATA.currentDiagnosis}
        keyExtractor={item => item.diagnosisId}
        renderItem={renderComponent}
        style={styles.viewCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textLast: {
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR7,
    fontSize: 22,
  },
  infoHeader: {
    marginHorizontal: DEFAULTWIDTH * 0.03,
    marginBottom: DEFAULTWIDTH * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moreBtnText: {
    color: PRIMARYCOLOR,
    fontFamily: FONTS.FontRegular,
    textDecorationLine: 'underline',
  },
  textSubDetails: {
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
    textAlign: 'right',
  },
  textDetails: {
    fontFamily: FONTS.FontRegular,
    fontSize: 15,
    color: TEXTCOLORSC1,
  },
  viewCard: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.88,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDERCOLOR7,
    padding: DEFAULTWIDTH * 0.04,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTWIDTH * 0.1,
  },
  btnView: {
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.125,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: DEFAULTWIDTH * 0.07,
  },
  textBtn: {
    fontSize: 12,
    color: PUREWHITE,
    fontWeight: '700',
    fontFamily: FONTS.FontMedium,
    textAlign: 'center',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.02,
  },
  lineView: {
    margin: 10,
    width: DEFAULTWIDTH * 0.82,
    height: 1,
    backgroundColor: LINECOLOR1,
  },
});
export default LastDig;
