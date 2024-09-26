import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import DEFAULTSTYLES, {DEFAULTWIDTH} from '../../../../Constants/styles/styles';
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR7,
  TEXTCOLOR10,
  TEXTCOLORSC1,
} from '../../../../Constants/Colors/Colors';
import {useRoute} from '@react-navigation/native';
import {FONTS} from '../../../../Constants/Fonts';

const PatientDiagnosis = ({navigation, route}) => {
  //   const route = useRoute();
  const DATA = route.params ? route.params : null;
  const renderItem = ({item}) => {
    return (
      <View style={styles.viewCard}>
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
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <View style={{flex: 1}}>
        <PatientHeader
          navigation={navigation}
          Header={'Patient All Diagnosis'}
        />

        <FlatList
          data={DATA.prevdata}
          keyExtractor={item => item.diagnosisId}
          renderItem={renderItem}
          style={{flex: 1}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  viewCard: {
    backgroundColor: BACKGROUNDWHITE,
    width: DEFAULTWIDTH * 0.95,
    elevation: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: BORDERCOLOR7,
    padding: DEFAULTWIDTH * 0.04,
    margin: DEFAULTWIDTH * 0.02,
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
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: DEFAULTWIDTH * 0.02,
  },
});

export default PatientDiagnosis;
