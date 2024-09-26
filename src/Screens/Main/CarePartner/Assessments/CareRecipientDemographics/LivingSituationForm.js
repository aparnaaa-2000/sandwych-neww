import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  PUREWHITE,
  BACKGROUNDWHITE,
  TEXTCOLOR8,
  TEXTCOLOR5,
  TEXTCOLOR7,
  BORDERCOLOR4,
  LINECOLOR1
} from '../../../../../Constants/Colors/Colors';
import {Data} from '../../../../../Constants/Texts/Assessments/RecepientDemographics/CheckBox'
import { Check, Uncheck } from '../../../../../../assets';
import { Button } from 'react-native-paper';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';



const LivingSituationForm = ({ navigation }) => {

  const [data, setData] = useState(Data)
  const [Checked, setChecked] = useState(null)
  const [Checked2, setChecked2] = useState(null)

  const [CheckData, setCheckData] = useState([
    {
      id: 1,
      Title: 'No',
      isSelected: false
    },
    {
      id: 2,
      Title: 'Yes',
      isSelected: false
    },
  ])

  const NextNavigation = () => { // Navigate to next page,after entering the details
    if (Checked == 'No' || Checked =='Yes' && Checked2?.length > 0) {
      navigation.navigate('AbilityToHelp1',{mainText:'Ability to Help 1'});
    } else {
      console.log("")
    }
  }

  const backToHC = () => {
    navigation.goBack();
  };

  const backToEnrollment = () => {
    navigation.navigate('EnrollmentProgress');
  };

  const handleCheckBoxPress = (item) => { //Check and uncheck the checkbox
    const updatedData = CheckData.map((dataItem) => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      } else {
        return { ...dataItem, isSelected: false }; // Deselect all other items
      }
    });

    setCheckData(updatedData);
    const FilterData = updatedData.filter((item) => item.isSelected == true) //Filter the selected item only
    console.log("filterData...............",FilterData[0].Title)
    setChecked(FilterData[0].Title)
  };


  const handleCheckBoxPressLiving = (item) => { // Check and uncheck the living data
    const updatedData = data.map((dataItem) => {
      if (dataItem.id === item.id) {
        return { ...dataItem, isSelected: !dataItem.isSelected };
      } else {
        return { ...dataItem, isSelected: false }; // Deselect all other items
      }
    });
    setData(updatedData);
    const FilterData = updatedData.filter((item) => item.isSelected == true) //Filter the selected item only
    setChecked2(FilterData)
  };

  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

      <View style={styles.container}>

        <View style={styles.headView}>
          <Text style={styles.mainHeader}>Living Situation</Text>
        </View>

        <View style={DEFAULTSTYLES.marginLeft}>
          <Text style={styles.checkBoxText}>Does anyone live with [ Patient ]?</Text>
        </View>

        <View style={styles.viewFlat}>
          <FlatList
            data={CheckData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

              return (
                <View style={styles.checkView}>
                  {item?.isSelected ?
                    <TouchableOpacity onPress={() => handleCheckBoxPress(item)} style={{ padding: 5 }}>
                      <Check style={{ marginTop: 4 }} />
                    </TouchableOpacity> :

                    <TouchableOpacity onPress={() => handleCheckBoxPress(item)} style={{ padding: 5 }}>
                      <Uncheck style={{ marginTop: 5 }} />
                    </TouchableOpacity>}
                  <View style={{ maxWidth: DEFAULTWIDTH * 0.75, marginLeft: DEFAULTWIDTH * 0.03 }}>
                    <Text style={styles.checkBoxText}>{item.Title} </Text>
                  </View>
                </View>
              )
            }} />
        </View>
        <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: DEFAULTWIDTH * 0.03 }}>
          <Text style={styles.checkBoxText}>If yes, what is their living situation?</Text>
        </View>

        <View style={DEFAULTSTYLES.marginLeft}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

              return (
                <View style={styles.checkView}>
                  {item?.isSelected ?
                    <TouchableOpacity onPress={() => handleCheckBoxPressLiving(item)} style={{ padding: 5 }}>
                      <Check style={{ marginTop: 4 }} />
                    </TouchableOpacity> :

                    <TouchableOpacity onPress={() => handleCheckBoxPressLiving(item)} style={{ padding: 5 }}>
                      <Uncheck style={{ marginTop: 5 }} />
                    </TouchableOpacity>}
                  <View style={{ maxWidth: DEFAULTWIDTH * 0.75, marginLeft: DEFAULTWIDTH * 0.03 }}>
                    <Text style={styles.checkBoxText}>{item.Title} </Text>
                  </View>
                </View>
              )
            }} />
        </View>

        <View style={styles.buttonPos}>
          <View
            style={styles.viewButton}>
            <Button
              onPress={() => backToHC()}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Back</Text>
            </Button>

            <Button
              onPress={() => backToEnrollment()}
              style={styles.buttonStyle}>
              <Text style={styles.buttonText}>Save & Exit</Text>
            </Button>

            <Button
              onPress={() => NextNavigation()}
              style={[styles.buttonStyle, { borderColor: Checked == 'No' || Checked == 'Yes' && Checked2 ?.length>0 ? BORDERCOLOR4 : LINECOLOR1 }]}>
              <Text style={[styles.buttonText, { color:  Checked == 'No' || Checked == 'Yes' && Checked2 ?.length>0 ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
            </Button>
          </View>

        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    //alignItems: 'center'
  },
  headView: {
    margin: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.15,
    top: GlobalSize(10)
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
    alignItems: 'center'
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  buttonPos: {
    position: 'absolute',
    bottom: GlobalSize(20),
    marginLeft: DEFAULTWIDTH * 0.02
  },
  viewFlat: {
    marginLeft: DEFAULTWIDTH * 0.05,
    marginTop: GlobalSize(5),
    marginBottom: GlobalSize(5)
  }
})
export default LivingSituationForm;