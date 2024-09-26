import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  BACKGROUNDWHITE,
  BORDERCOLOR4,
  LINECOLOR1,
  TEXTCOLOR7,
  TEXTCOLOR8,
} from '../../../../../Constants/Colors/Colors';
import {FONTS} from '../../../../../Constants/Fonts';
import {Check, Uncheck} from '../../../../../../assets';
import {Button} from 'react-native-paper';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';

const Wearables = ({navigation}) => {
  const [Checked1, setChecked1] = useState(null);
  const [Checked2, setChecked2] = useState(null);
  const [Checked3, setChecked3] = useState(null);
  const [CheckData1, setCheckData1] = useState([
    {
      id: 1,
      Title: 'Yes',
      isSelected: false,
    },
    {
      id: 2,
      Title: 'No',
      isSelected: false,
    },
    {
      id: 3,
      Title: "I'm not sure",
      isSelected: false,
    },
  ]);

  const [CheckData2, setCheckData2] = useState([
    {
      id: 1,
      Title: 'Yes',
      isSelected: false,
    },
    {
      id: 2,
      Title: 'No',
      isSelected: false,
    },
    {
      id: 3,
      Title: "I'm not sure",
      isSelected: false,
    },
  ]);

  const [CheckData3, setCheckData3] = useState([
    {
      id: 1,
      Title: 'Yes',
      isSelected: false,
    },
    {
      id: 2,
      Title: 'No',
      isSelected: false,
    },
    {
      id: 3,
      Title: "I'm not sure",
      isSelected: false,
    },
  ]);

  const handleCheckBoxPress1 = item => {
    //Check and uncheck the checkbox
    const updatedData = CheckData1.map(dataItem => {
      if (dataItem.id === item.id) {
        return {...dataItem, isSelected: !dataItem.isSelected};
      } else {
        return {...dataItem, isSelected: false}; // Deselect all other items
      }
    });

    setCheckData1(updatedData);
    const FilterData = updatedData.filter(item => item.isSelected == true); //Filter the selected item only
    setChecked1(FilterData);
  };

  const handleCheckBoxPress2 = item => {
    //Check and uncheck the checkbox
    const updatedData = CheckData2.map(dataItem => {
      if (dataItem.id === item.id) {
        return {...dataItem, isSelected: !dataItem.isSelected};
      } else {
        return {...dataItem, isSelected: false}; // Deselect all other items
      }
    });

    setCheckData2(updatedData);
    const FilterData = updatedData.filter(item => item.isSelected == true); //Filter the selected item only
    setChecked2(FilterData);
  };

  const handleCheckBoxPress3 = item => {
    //Check and uncheck the checkbox
    const updatedData = CheckData3.map(dataItem => {
      if (dataItem.id === item.id) {
        return {...dataItem, isSelected: !dataItem.isSelected};
      } else {
        return {...dataItem, isSelected: false}; // Deselect all other items
      }
    });

    setCheckData3(updatedData);
    const FilterData = updatedData.filter(item => item.isSelected == true); //Filter the selected item only
    setChecked3(FilterData);
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5, marginTop: DEFAULTWIDTH * 0.04}}>
        <Text style={styles.textW}>Device integration</Text>
      </View>

      <View>
        <Text style={styles.checkBoxText}>
          Do you have a wearable that you would like to integrate?
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <FlatList
          data={CheckData1}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.checkView}>
                {item?.isSelected ? (
                  <TouchableOpacity
                    onPress={() => handleCheckBoxPress1(item)}
                    style={{padding: 5}}>
                    <Check style={{marginTop: 4}} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleCheckBoxPress1(item)}
                    style={{padding: 5}}>
                    <Uncheck style={{marginTop: 5}} />
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

      <View>
        <Text style={styles.checkBoxText}>
          Do you want to connect to your phone's built-in features?
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <FlatList
          data={CheckData2}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.checkView}>
                {item?.isSelected ? (
                  <TouchableOpacity
                    onPress={() => handleCheckBoxPress2(item)}
                    style={{padding: 5}}>
                    <Check style={{marginTop: 4}} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleCheckBoxPress2(item)}
                    style={{padding: 5}}>
                    <Uncheck style={{marginTop: 5}} />
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

      <View>
        <Text style={styles.checkBoxText}>Location sharing?</Text>
      </View>

      <ImageBackground
        source={require('../../../../../../assets/Images/wear.png')}
        style={{width: '100%', height: 300}}
        resizeMode="contain">
        <View>
          <FlatList
            data={CheckData3}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.checkView}>
                  {item?.isSelected ? (
                    <TouchableOpacity
                      onPress={() => handleCheckBoxPress3(item)}
                      style={{padding: 5}}>
                      <Check style={{marginTop: 4}} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleCheckBoxPress3(item)}
                      style={{padding: 5}}>
                      <Uncheck style={{marginTop: 5}} />
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
      </ImageBackground>

      <View style={styles.postView}>
        <View style={styles.viewButton}>
          <Button
            onPress={() => navigation.goBack()}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Back</Text>
          </Button>

          <Button
            onPress={() => navigation.navigate('EnrollmentProgress')}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Save & Exit</Text>
          </Button>

          <Button
            onPress={() => {
              Checked1?.length > 0 &&
              Checked2?.length > 0 &&
              Checked3?.length > 0
                ? navigation.navigate('AbilityToHelp2')
                : console.log('');
            }}
            style={[
              styles.buttonStyle,
              {
                borderColor:
                  Checked1?.length > 0 &&
                  Checked2?.length > 0 &&
                  Checked3?.length > 0
                    ? BORDERCOLOR4
                    : LINECOLOR1,
              },
            ]}>
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    Checked1?.length > 0 &&
                    Checked2?.length > 0 &&
                    Checked3?.length > 0
                      ? TEXTCOLOR7
                      : LINECOLOR1,
                },
              ]}>
              Next
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUNDWHITE,
    padding: 20,
  },
  textW: {
    fontSize: 26,
    fontFamily: FONTS.FontSemiB,
    color: TEXTCOLOR8,
  },
  checkBoxText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  postView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: BACKGROUNDWHITE,
    paddingBottom: 20,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: TEXTCOLOR7,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  buttonStyle: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
    borderColor: BORDERCOLOR4,
    width: DEFAULTWIDTH * 0.29,
  },
});
export default Wearables;
