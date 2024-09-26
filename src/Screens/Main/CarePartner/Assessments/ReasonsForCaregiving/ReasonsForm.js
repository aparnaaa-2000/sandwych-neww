import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  PUREWHITE,
  BACKGROUNDWHITE,
  TEXTCOLOR8,
  TEXTCOLOR5,
  TEXTCOLOR7,
  BORDERCOLOR4,
  LINECOLOR1,
} from '../../../../../Constants/Colors/Colors';
import {Data} from '../../../../../Constants/Texts/Assessments/ReasonForCaregiving/CheckBox'

import {Check, Uncheck} from '../../../../../../assets';
import {Button} from 'react-native-paper';
import {ScrollView} from 'react-native';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';


const ReasonsForm = ({navigation}) => {
  const [data, setData] = useState(Data);
  const [Checked, setChecked] = useState([]);

  const backToHC = () => {
    navigation.goBack();
  };

  const backToEnrollment = () => {
    navigation.navigate('EnrollmentProgress');
  };

  const navigateToROC = () => {
    navigation.navigate('OpenEnded');
  };

  const handleCheckBoxPress = item => {
    //Check and uncheck the checkbox
    const updatedData = data.map(dataItem => {
      if (dataItem.id === item.id) {
        return {...dataItem, isSelected: !dataItem.isSelected};
      }
      return dataItem;
    });
    setData(updatedData);
    const FilterData = updatedData.filter(item => item.isSelected == true); //Filter the selected item only

    setChecked(FilterData);
  };

  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginTop: DEFAULTWIDTH * 0.05, marginLeft: GlobalSize(10)}}>
            <Text style={styles.mainHeader}>Caregiving style</Text>
            <Text style={styles.subHeader}>
              What are some of the factors that influence your decision to
              provide care? [CR]
            </Text>
          </View>

          <View style={styles.viewFlat}>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <View style={styles.checkView}>
                    {item?.isSelected ? (
                      <TouchableOpacity
                        onPress={() => handleCheckBoxPress(item)}
                        style={{padding: GlobalSize(5)}}>
                        <Check style={{marginTop: GlobalSize(4)}} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleCheckBoxPress(item)}
                        style={{padding: GlobalSize(5)}}>
                        <Uncheck style={{marginTop: GlobalSize(5)}} />
                      </TouchableOpacity>
                    )}
                    <View
                      style={{
                        maxWidth: DEFAULTWIDTH * 0.75,
                        marginLeft: DEFAULTWIDTH * 0.03,
                      }}>
                      <Text style={styles.checkBoxText}>{item.Title} </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>

        <View style={styles.viewB}>
          <View style={styles.viewButton}>
            <Button onPress={() => backToHC()} style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Back</Text>
            </Button>

            <Button
              onPress={() => backToEnrollment()}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Save & Exit</Text>
            </Button>

            <Button
              onPress={() => {
                Checked?.length > 0 ? navigateToROC() : console.log('');
              }}
              style={[
                styles.buttonStyle,
                {borderColor: Checked?.length > 0 ? BORDERCOLOR4 : LINECOLOR1},
              ]}>
              <Text
                style={[
                  styles.buttonText,
                  {color: Checked?.length > 0 ? TEXTCOLOR7 : LINECOLOR1},
                ]}>
                Next
              </Text>
            </Button>
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
    alignItems: 'center',
  },
  mainHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: fontSize(26),
    color: TEXTCOLOR8,
  },
  subHeader: {
    marginTop: GlobalSize(8),
    lineHeight: GlobalSize(20),
    color: TEXTCOLOR5,
    fontSize: fontSize(14),
    fontFamily: 'Inter-Medium',
    left: GlobalSize(2)
  },
  checkBoxText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  buttonText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: fontSize(14),
  },
  buttonStyle: {
    borderRadius: GlobalSize(8),
    borderWidth: 1,
    margin: GlobalSize(5),
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.29,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEFAULTWIDTH * 0.02,
    
  },
  viewB: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: BACKGROUNDWHITE,
    paddingBottom: GlobalSize(20),
  },
  viewFlat: {
    flex: 1,
    marginLeft: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.22,
  },
});
export default ReasonsForm;
