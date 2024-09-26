import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../../Constants/styles/styles';
import {
  BLUES01,
  BLUES02,
  BOTTOMTABTEXT1,
  MEDSITEMCOLOR3,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR15,
  TEXTCOLOR2,
  TEXTCOLOR8,
} from '../../../../Constants/Colors/Colors';
import {
  GlobalSize,
  fontSize,
} from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../../Constants/Fonts';
import useSupportProviding from '../../../../hooks/apihooks/useSupportProviding';
import useSupportEdit from '../../../../hooks/apihooks/useSupportEdits';

const SelectRoles = ({ navigation }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState(null);

  const toggleRole = (role, id) => {
    const isSelected = selectedRoles.some(item => item.id === id);
    setSelectedRoles(
      isSelected
        ? selectedRoles.filter(item => item.id !== id)
        : [...selectedRoles, { role, id }]
    );
  };

  useEffect(() => {
    const fetchSupportList = async () => {
      const userId = await AsyncStorage.getItem('User_Id');
      try {
        const response = await useSupportProviding(userId);
        if (response && response.supports) {
          setList(response.supports);
        } else {
          setError('Failed to load data');
        }
      } catch (error) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSupportList();
  }, []);

  const SubmitRole = async () => {
    const selectedIds = selectedRoles.map(({ id }) => id);
    try {
      const userId = await AsyncStorage.getItem('User_Id');
      const response = await useSupportEdit({
        user_id: userId,
        supports: selectedIds.map(id => ({ id })),
      });
      console.log('Role_Submission_Success...', response);
      navigation.goBack();
    } catch (error) {
      console.log('Role_Submission_Error...', error);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedRoles.some(selected => selected.role === item.support);
    return (
      <TouchableOpacity
        style={styles.mainContainer(isSelected)}
        onPress={() => toggleRole(item.support, item.id)}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.iconLayout}>
            <Image source={{ uri: item.support_image }} style={{ width: 90, height: 90 }} />
            <View style={styles.roleTypeOverlay}>
              <Text style={{ color: PUREWHITE }}>
                {item.functional_abilities === '1' ? 'ADL' : 'IADL'}
              </Text>
            </View>
          </View>
          <View style={{ width: DEFAULTWIDTH * 0.59, margin: GlobalSize(10) }}>
            <Text style={styles.roleText(isSelected)}>{item.support}</Text>
            <Text style={styles.roleDescText(isSelected)}>
              {item.description || 'No description available'}
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
          {/* <ArrowF height={height(22)} width={width(22)} /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Roles</Text>
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

      {loading ? (
        <ActivityIndicator size="large" color={PRIMARYCOLOR} />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}

      <View style={styles.bottomSelectLayer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.bottomButtonStyle, { backgroundColor: BOTTOMTABTEXT1 }]}>
          <Text style={{ color: PUREWHITE }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={SubmitRole}
          style={[styles.bottomButtonStyle, { backgroundColor: PRIMARYCOLOR }]}>
          <Text style={{ color: PUREWHITE }}>Submit</Text>
        </TouchableOpacity>
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
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: 30,
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
    right: 0,
    backgroundColor: MEDSITEMCOLOR3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 10,
  },
});

export default SelectRoles;
