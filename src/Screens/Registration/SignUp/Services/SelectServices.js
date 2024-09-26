import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  BLUES01,
  BLUES02,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR2,
  TEXTCOLOR8,
  MEDSITEMCOLOR3,
  TEXTCOLOR15,
} from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {GlobalSize, fontSize} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import {FONTS} from '../../../../Constants/Fonts';
import {shallowEqual, useSelector} from 'react-redux';

const SelectServices = ({navigation}) => {
  const {data, error, isLoading} = useSelector(
    state => ({
      data: state.selectservices.data,
      error: state.selectservices.error,
      isLoading: state.selectservices.isLoading,
    }),
    shallowEqual,
  );

  const [selectedRoles, setSelectedRoles] = useState([]);

  const navigations_Confirm = () => {
    if (selectedRoles.length > 0) {
      console.log('Navigate to Form');
      navigation.navigate('SupportMemeberForm', {selectedRoles: selectedRoles});
    } else {
      console.log('No Navigation Please');
      // Submit button can be turned off here.
      // Authentication is skipped as API needs to be integrated quickly.
    }
  };

  const toggleRole = role => {
    const isSelected = selectedRoles.includes(role);

    setSelectedRoles(
      isSelected
        ? selectedRoles.filter(r => r !== role)
        : [...selectedRoles, role],
    );
  };

  const renderCategory = (fa) => {
    switch (fa) {
      case '0':
        return <Text style={{color: PUREWHITE}}>IADL</Text>;
      case '1':
        return <Text style={{color: PUREWHITE}}>ADL</Text>;
      default:
        return <Text style={{color: PUREWHITE}}>ADL</Text>;
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedRoles.includes(item.id);
    const faCategory = item.functional_abilities;

    return (
      <TouchableOpacity
        style={styles.mainContainer(isSelected)}
        onPress={() => toggleRole(item.id)}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.iconLayout}>
            <Image
              source={{uri: item.image}}
              style={{width: 90, height: 90, alignSelf: 'center'}}
            />
            <View style={styles.roleTypeOverlay}>
              {renderCategory(faCategory)}
            </View>
          </View>
          <View style={{width: DEFAULTWIDTH * 0.59, margin: GlobalSize(10)}}>
            <Text style={styles.roleText(isSelected)}>{item.support}</Text>
            <Text style={styles.roleDescText(isSelected)}>
              {item.description || 'Description not available.'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
      <View style={styles.headerLayout}>
        <TouchableOpacity>
          {/* Add back button or any other required buttons */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Services</Text>
        <View></View>
      </View>

      <View
        style={{
          marginHorizontal: DEFAULTWIDTH * 0.03,
          marginBottom: DEFAULTHEIGHT * 0.02,
        }}>
        <Text style={styles.heading}>Ability To Help</Text>
        <Text style={styles.subHeading}>
          Which of the following do you think you can provide help with?
        </Text>
      </View>
      <View style={{flex: 1}}>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={data.data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        )}
        <View style={styles.bottomSelectLayer}>
          <TouchableOpacity
            onPress={() => navigations_Confirm()}
            style={[styles.bottomButtonStyle, {backgroundColor: PRIMARYCOLOR}]}>
            <Text style={{color: PUREWHITE}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: PRIMARYCOLOR,
    fontSize: fontSize(22),
    fontFamily: FONTS.FontBold,
  },
  subHeading: {
    color: TEXTCOLOR2,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    marginTop: DEFAULTHEIGHT * 0.01,
  },
  headerLayout: {
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTHEIGHT * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(20),
    color: TEXTCOLOR15,
  },
  bottomSelectLayer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: DEFAULTHEIGHT * 0.02,
    zIndex: 22,
    width: '100%',
  },
  bottomButtonStyle: {
    width: DEFAULTWIDTH * 0.4,
    height: DEFAULTHEIGHT * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContainer: isSelected => ({
    backgroundColor: isSelected ? PRIMARYCOLOR : BLUES02,
    marginHorizontal: DEFAULTWIDTH * 0.02,
    marginBottom: DEFAULTHEIGHT * 0.008,
    borderRadius: 20,
  }),
  iconLayout: {
    backgroundColor: BLUES01,
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: GlobalSize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleText: isSelected => ({
    fontFamily: FONTS.FontMedium,
    color: isSelected ? PUREWHITE : TEXTCOLOR2,
    alignSelf: 'center',
    fontSize: fontSize(14),
  }),
  roleDescText: isSelected => ({
    fontFamily: FONTS.FontLight,
    color: isSelected ? PUREWHITE : TEXTCOLOR8,
    alignSelf: 'center',
    marginTop: DEFAULTHEIGHT * 0.015,
    fontSize: fontSize(11),
  }),
  roleTypeOverlay: {
    position: 'absolute',
    top: 0,
    backgroundColor: MEDSITEMCOLOR3,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: DEFAULTWIDTH * 0.01,
    paddingBottom: DEFAULTWIDTH * 0.006,
  },
});

export default SelectServices;
