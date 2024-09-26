import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  ArrowF,
  BlackClose,
  BlackMenu,
  Close,
  SCIcon,
  Search,
} from '../../../../../assets';
import {TEXTCOLOR10} from '../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../Constants/Fonts';
import {
  GlobalSize,
  fontSize,
} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const PatientHeader = ({Header, navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.flexView}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={{marginRight: 5}} onPress={() => goBack()}>
          <ArrowF width={20} height={20} />
        </TouchableOpacity>

        <View>
          <SCIcon width={20} height={20} />
        </View>
      </View>

      <View style={styles.patientView}>
        <Text style={styles.textP}>{Header}</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {Header == 'Transportation' ||
          Header == 'Food' ||
          Header == 'Medication' ||
          (Header == 'Medication Allergies' && (
            <View style={{marginRight: GlobalSize(15)}}>
              <Search />
            </View>
          ))}

        {Header == 'Resources' ||
          Header == 'Transportation' ||
          (Header == 'Food' && <BlackMenu />)}

        {Header == 'Add Drug Allergies' ||
          (Header == 'Assign Medication' && <BlackClose />)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textP: {
    fontSize: fontSize(20),
    fontFamily: FONTS.FontMedium,
    color: TEXTCOLOR10,
  },
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: GlobalSize(15),
    marginRight: GlobalSize(20),
    marginBottom: GlobalSize(20),
  },
  patientView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: GlobalSize(50),
  },
});

export default PatientHeader;
