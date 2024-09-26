import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import {
  PRIMARYCOLOR,
  PUREWHITE,
  THIRDCOLOR,
  TEXTCOLOR11,
  TEXTCOLORRS,
  BORDERCOLOR4,
  PLACEHOLDERCOLOR2,
} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import DEFAULTSTYLES, {
  DEFAULTHEIGHT,
  DEFAULTWIDTH,
} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { moderateScale } from 'react-native-size-matters';

const LangModal = ({
  ModalOpen,
  setModalOpen,
  setLanguage,
  Language,
  selectedItems,
  setSelectedItems,
  LanguageId,
  setLanguageId,
}) => {
  const [textSearch, setTextSearch] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(Language);

  useEffect(() => {
    if (Array.isArray(Language)) {
      const filtered = Language.filter(lang => {
        if (typeof lang === 'object' && lang.language_name) {
          return lang.language_name
            .toLowerCase()
            .includes(textSearch.toLowerCase());
        }
        console.warn('Unexpected lang format:', lang);
        return false;
      });
      setFilteredLanguages(filtered);
    } else {
      console.warn('Language is not an array:', Language);
    }
  }, [textSearch, Language]);

  const handleSelect = item => {
    console.log('Selected item:', item);

    const isSelected = selectedItems.some(
      selectedItem => selectedItem.language_id === item.language_id
    );

    if (isSelected) {
      setSelectedItems(prevSelectedItems => {
        const updatedSelectedItems = prevSelectedItems.filter(
          selectedItem => selectedItem.language_id !== item.language_id
        );
        setLanguageId(prevLanguageId =>
          prevLanguageId.filter(id => id !== item.language_id)
        );
        console.log('Updated selected items:', updatedSelectedItems);
        return updatedSelectedItems;
      });
    } else {
      setSelectedItems(prevSelectedItems => {
        const updatedSelectedItems = [...prevSelectedItems, item];
        setLanguageId(prevLanguageId => [...prevLanguageId, item.language_id]);
        console.log('Updated selected items:', updatedSelectedItems);
        return updatedSelectedItems;
      });
    }
  };

  const renderItem = ({ item }) => {
    if (typeof item !== 'object' || !item.language_id) {
      console.warn('Item is not in the expected format:', item);
      return null;
    }

    const isSelected = selectedItems.some(
      selectedItem => selectedItem.language_id === item.language_id
    );

    return (
      <TouchableOpacity
        style={[
          styles.card,
          DEFAULTSTYLES.iosShadow,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => handleSelect(item)}
      >
        <Text style={[styles.textC, isSelected && styles.selectedText]}>
          {item.language_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ModalOpen}
      onRequestClose={() => {
        setModalOpen(!ModalOpen);
      }}
    >
      <View style={styles.mainContainer}>
        <View style={styles.viewMain}>
          <View style={{ marginTop: GlobalSize(70) }}>
            <TextInput
              value={textSearch}
              style={styles.textIn}
              maxLength={12}
              placeholder="Search language..."
              placeholderTextColor={PLACEHOLDERCOLOR2}
              onChangeText={text => setTextSearch(text)}
            />
          </View>

          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredLanguages}
              keyExtractor={(item) => item.language_id.toString()} // Use language_id for key
              renderItem={renderItem}
              ListEmptyComponent={
                <Text
                  style={{
                    fontSize: moderateScale(12),
                    fontWeight: '400',
                    color: '#000',
                  }}
                >
                  No languages available
                </Text>
              } // Optional: handle empty state
            />
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                setLanguage(selectedItems); // Assuming you want to set selected languages on close
                setModalOpen(false);
              }}
            >
              <Text style={styles.textBtn}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    elevation: 5,
    backgroundColor: PUREWHITE,
    width: DEFAULTWIDTH * 0.78,
    paddingLeft: GlobalSize(10),
    paddingTop: GlobalSize(10),
    paddingBottom: GlobalSize(5),
    margin: GlobalSize(5),
    alignItems: 'flex-start',
    borderRadius: GlobalSize(8),
  },
  textBtn: {
    fontSize: 14,
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
  },
  textC: {
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR11,
    textAlign: 'left',
    marginBottom: DEFAULTWIDTH * 0.02,
  },
  textIn: {
    color: TEXTCOLORRS,
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
    borderRadius: GlobalSize(8),
    marginBottom: DEFAULTHEIGHT * 0.01,
    paddingLeft: GlobalSize(10),
    width: DEFAULTWIDTH * 0.78,
    height: GlobalSize(50),
  },
  selectedText: {
    color: PRIMARYCOLOR,
  },
  selectedCard: {
    borderColor: PRIMARYCOLOR,
    borderWidth: 1.5,
    borderRadius: GlobalSize(8),
  },
  btnView: {
    width: DEFAULTWIDTH * 0.78,
    height: DEFAULTWIDTH * 0.125,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: GlobalSize(4),
    marginBottom: GlobalSize(50),
    flexDirection: 'row',
    marginTop: GlobalSize(15),
  },
  viewMain: {
    width: DEFAULTWIDTH * 0.9,
    borderRadius: 10,
    paddingTop: DEFAULTWIDTH * 0.05,
    backgroundColor: PUREWHITE,
    alignItems: 'center',
    justifyContent: 'center',
    height: DEFAULTHEIGHT * 0.6,
    paddingBottom: GlobalSize(90),
    paddingTop: GlobalSize(70),
  },
});

export default LangModal;
