import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  TextInput
} from 'react-native';

//IMPORT CONSTANTS
import {
  BORDERCOLOR4,
  PLACEHOLDERCOLOR1,
  PLACEHOLDERCOLOR2,
  PRIMARYCOLOR,
  PUREWHITE,
  TEXTCOLOR10,
  TEXTCOLOR5,
  THIRDCOLOR,
} from '../../../Constants/Colors/Colors';
import {FONTS} from '../../../Constants/Fonts';
import {DEFAULTWIDTH} from '../../../Constants/styles/styles';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { ActivityIndicator } from 'react-native';


const SupportStatusPopup = ({
  ModalOpen,
   setModalOpen, 
   navigation,
   reason,
   setReason,
   selectedId,
   setSelectedId,
   OnSupportReason,
   incompleteLoading}) => {

  const onPress = (item) => {
    setSelectedId(item.id);
};

  const Data = [
    {
        id:'0',
        Title:'Yet to be completed',
        isSelected : false
    },
    {
        id:'1',
        Title:'Request Cancelled',
        isSelected: false
    },
    {
        id:'2',
        Title:'Support Not seen',
        isSelected: false
    },
    {
        id:'3',
        Title:'Other',
        isSelected:false
    }
  ]

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={ModalOpen}
      onRequestClose={() => {
        setModalOpen(!ModalOpen);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.viewMain}>
          <View
            style={{
              marginBottom: GlobalSize(10),
              marginHorizontal: GlobalSize(20),
            }}>
            <Text style={styles.textQuest}>Reason</Text>
          </View>

          <View style={{marginBottom:GlobalSize(10)}}>
          <FlatList
            data={Data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                const isSelected = item.id === selectedId;
                return (
                    <View style={{ marginLeft: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={styles.radioButton}
                                onPress={() => onPress(item)}
                            >
                                <View style={[styles.radioIcon, isSelected && styles.radioIconSelected]}>
                                    {isSelected && <View style={styles.radioBorder} />}
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 7, maxWidth: '80%' }}>
                                <Text style={styles.textDesc}>{item.Title}</Text>
                            </View>
                        </View>
                    </View>
                );
            }}
        />
          </View>

            {selectedId === '3' &&
          <View>
            <TextInput 
            style={styles.textInput}
            value={reason}
            onChangeText={(text)=>setReason(text)}/>
          </View>}

          <View style={styles.buttonView}>
            <View>
              <TouchableOpacity
                style={styles.touchBtn}
                onPress={() => OnSupportReason()}>
                <Text style={styles.textBtn}>Submit</Text>
                {incompleteLoading && 
                <ActivityIndicator size={20} color={PUREWHITE}/>}
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={styles.touchCancel}
                onPress={() => setModalOpen(false)}>
                <Text style={[styles.textCancel, {color: PRIMARYCOLOR}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: GlobalSize(8),
},
radioBorder: {
    width: GlobalSize(10),
    height: GlobalSize(10),
    borderRadius: GlobalSize(5),
    borderWidth: 2,
    borderColor: PRIMARYCOLOR,
    backgroundColor: PRIMARYCOLOR,
},
textDesc: {
    fontSize: fontSize(14),
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    maxWidth: DEFAULTWIDTH * 0.9,
    lineHeight: GlobalSize(20),
},   
radioIconSelected: {
    backgroundColor: PUREWHITE,
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderColor: PRIMARYCOLOR,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
},
 radioIcon: {
    marginLeft: GlobalSize(10),
    width: GlobalSize(20),
    height: GlobalSize(20),
    borderRadius: GlobalSize(10),
    borderWidth: 2,
    borderColor: BORDERCOLOR4,
    marginRight: GlobalSize(8),
    backgroundColor: PUREWHITE,
},
  textBtn: {
    fontSize: fontSize(14),
    color: PUREWHITE,
    fontFamily: FONTS.FontMedium,
  },
  textCancel: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(12),
    color: THIRDCOLOR,
    fontWeight: '700',
  },
  textQuest: {
    fontFamily: FONTS.FontRegular,
    fontSize: fontSize(18),
    color: TEXTCOLOR5,
  },
  touchBtn: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.30,
    height: DEFAULTWIDTH * 0.11,
    backgroundColor: PRIMARYCOLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textInput:{
    textAlignVertical:'top',
    padding:GlobalSize(10),
    borderWidth:1,
    borderColor:PLACEHOLDERCOLOR2,
    color:TEXTCOLOR10,
    fontSize:fontSize(12),
    width:DEFAULTWIDTH*0.80,
    height:GlobalSize(100),
    marginHorizontal:GlobalSize(50),
    borderRadius:GlobalSize(10)
  },
  touchCancel: {
    marginBottom: DEFAULTWIDTH * 0.05,
    width: DEFAULTWIDTH * 0.30,
    height: DEFAULTWIDTH * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BORDERCOLOR4,
  },
  viewMain: {
    width: DEFAULTWIDTH,
    borderRadius: 10,
    paddingTop: DEFAULTWIDTH * 0.07,
    backgroundColor: PUREWHITE,
    //justifyContent: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: DEFAULTWIDTH * 0.05,
    margin: GlobalSize(10),
    paddingLeft: DEFAULTWIDTH * 0.05,
    paddingRight: DEFAULTWIDTH * 0.05,
  },
});

export default SupportStatusPopup;
