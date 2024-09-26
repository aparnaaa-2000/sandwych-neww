import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR1,
  PRIMARYCOLOR,
  PUREBLACK,
  PUREWHITE,
  SECONDARYCOLOR,
  THIRDCOLOR,
  TEXTCOLOR10,
} from '../../../../Constants/Colors/Colors';
import {ArrowF} from '../../../../../assets';
import {FONTS} from '../../../../Constants/Fonts';
import {DEFAULTWIDTH} from '../../../../Constants/styles/styles';

const AddDiagnosis = () => {
  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} />

      <View style={styles.container}>
        <View style={styles.viewMain}>
          <View>
            <ArrowF width={18} height={18} />
          </View>

          <View>
            <Text style={styles.textDg}>Add Diagnosis</Text>
          </View>

          <View></View>
        </View>

        <View
          style={{
            marginBottom: DEFAULTWIDTH * 0.06,
            marginLeft: DEFAULTWIDTH * 0.02,
          }}>
          <Text style={styles.textAdd}>Add diagnosis details </Text>
        </View>

        <View style={{marginBottom: 10, marginLeft: DEFAULTWIDTH * 0.02}}>
          <Text style={styles.textDg}>Diagnosis</Text>
        </View>

        <View style={styles.viewTitle}>
          <TextInput style={styles.textView} />
        </View>

        <View style={{marginBottom: 10, marginLeft: DEFAULTWIDTH * 0.02}}>
          <Text style={styles.textDg}>ICD</Text>
        </View>

        <View style={styles.viewTitle}>
          <TextInput style={styles.textView} />
        </View>

        <View style={{marginBottom: 10, marginLeft: DEFAULTWIDTH * 0.02}}>
          <Text style={styles.textDg}>Physician</Text>
        </View>

        <View style={styles.viewTitle}>
          <TextInput style={styles.textView} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnView}>
            <Text style={styles.textBtn}>Add</Text>
          </TouchableOpacity>

          <View style={{marginTop: DEFAULTWIDTH * 0.05, marginBottom: 15}}>
            <TouchableOpacity>
              <Text style={styles.textCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    padding: 15,
  },
  textDg: {
    fontSize: 16,
    fontFamily: FONTS.FontSemiB,
    color: PUREBLACK,
  },
  textAdd: {
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR,
    fontSize: 16,
  },
  btnView: {
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.125,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textBtn: {
    fontSize: 12,
    color: PUREWHITE,
    fontWeight: '700',
    fontFamily: FONTS.FontMedium,
    textAlign: 'center',
  },
  textCancel: {
    fontFamily: FONTS.FontMedium,
    fontSize: 12,
    color: THIRDCOLOR,
    fontWeight: '700',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDg: {
    color: SECONDARYCOLOR,
    fontSize: 14,
    fontFamily: FONTS.FontMedium,
  },
  textView: {
    fontSize: 12,
    color: TEXTCOLOR10,
    fontFamily: FONTS.FontRegular,
    width: DEFAULTWIDTH * 0.88,
    height: DEFAULTWIDTH * 0.13,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BORDERCOLOR1,
  },
  viewTitle: {
    marginBottom: DEFAULTWIDTH * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DEFAULTWIDTH * 0.1,
    marginTop: 10,
  },
});
export default AddDiagnosis;
