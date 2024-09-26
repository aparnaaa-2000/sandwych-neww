
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { BORDERCOLOR1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5, BORDERCOLOR4, BORDERCOLOR5, VALIDCOLOR, PUREBLACK } from '../../../../Constants/Colors/Colors'
import { FONTS } from '../../../../Constants/Fonts'
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

const RadioButtonGroup = ({ onClose, onGoing,onSave,taskStatus,setTaskStatus,textInputValue,setTextInputValue }) => {

  const Status = [
    {
      id: "2",
      Title: 'Completed'
    },
    {
      id: "4",
      Title: 'Partially Completed',
    },
    {
      id: "3",
      Title: 'Skipped'
    }
  ]

  //const [taskStatus, setTaskStatus] = useState(null)
  //const [textInputValue, setTextInputValue] = useState(null)
  const [borderStatus, setBorderStatus] = useState(true)
  const [selectedOption, setSelectedOption] = useState(null)

  const onPressStatus = (item) => {
    setTaskStatus(item.id)
    setSelectedOption(item.Title)
  }

  const handleReasonChange = (text) => {
    const isValidReason = /^[A-Za-z .,()\s]{2,}$/.test(text);
    setBorderStatus(true)

    setTextInputValue(text);
  };

  console.log("VALID REASON.................",borderStatus)
  const onSubmitData = () => {

    if (selectedOption == 'Skipped' && textInputValue || selectedOption !== 'Skipped' && selectedOption !== null) {
   
      setSelectedOption(null)
      setTextInputValue(null)
      onSave()
    } else {

    }
  }

  const DUMMYTEXT =
    'Lorem ipsum dolor sit amet, consectetur sit amet commodo lectus congue iaculis. Maecenas vitae tincidunt velit, ut condimentum lorem. Duis efficitur, elit id commodo accumsan, dui eros pulvinar ipsum, eu porta justo felis id sem. Praesent vehicula pellentesque placerat. Nullam ullamcorper nisl sed ultricies venenatis. Nullam placerat pulvinar consectetur. Cras eget dapibus velit, eget tincidunt dui. Nullam id sagittis nisi. Nulla vehicula sapien vel ullamcorper euismod. Fusce sed neque feugiat odio dignissim pellentesque. Sed posuere efficitur dui eu consequat. Integer vestibulum placerat enim in pellentesque. Pellentesque mattis justo sit.';

  return (
    <>
      {onGoing == 1 ?
        <View style={{ marginBottom: GlobalSize(10) }}>
          <FlatList
            data={Status}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{ marginLeft: GlobalSize(10) }}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={styles.radioButton}
                      onPress={() => onPressStatus(item)}>
                      <View
                        style={[
                          styles.radioIcon,
                          taskStatus == item.id && styles.radioIconSelected,
                        ]}>
                        {taskStatus == item.id && (
                          <View style={styles.radioBorder} />
                        )}
                      </View>
                    </TouchableOpacity>

                    <View style={{ marginTop: GlobalSize(7), maxWidth: DEFAULTWIDTH * 0.8 }}>
                      <Text style={styles.textDesc}>{item.Title}</Text>
                    </View>

                  </View>

                  {taskStatus == 3 && item.id == 3 &&
                    <View>
                      <View style={[styles.texInView, { borderColor: !borderStatus ? VALIDCOLOR : BORDERCOLOR1 }]}>
                        <TextInput
                          value={textInputValue}
                          placeholder={'Enter reason'}
                          placeholderTextColor={BORDERCOLOR5}
                          style={styles.inputWrite}
                          multiline
                          onChangeText={text => handleReasonChange(text)}
                        />
                      </View>
                      {!borderStatus &&
                        <View style={{ marginLeft: GlobalSize(40) }}>
                          <Text style={{ fontSize: fontSize(12), color: VALIDCOLOR }}>Please enter a valid reason</Text>
                        </View>}
                    </View>}

                </View>
              );
            }}
          />

          <TouchableOpacity
            onPress={onSubmitData}
            style={[styles.btnView,
            {
              opacity: selectedOption == 'Skipped' &&
                textInputValue || selectedOption !== 'Skipped' && selectedOption !== null ? 1 : 0.5
            }]}>
            <Text style={styles.btnText}>SAVE</Text>
          </TouchableOpacity>
        </View> :

        <View>
          <View style={{paddingBottom:GlobalSize(10)}}>
            <Text style={styles.textDummy}>{DUMMYTEXT}</Text>
          </View>
        </View>}
    </>
  )
}

export default RadioButtonGroup

const styles = StyleSheet.create({
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
  texInView: {
    height: DEFAULTWIDTH * 0.2,
    borderRadius: GlobalSize(8),
    borderColor: BORDERCOLOR1,
    borderWidth: 1,
    marginBottom: GlobalSize(5),
    marginRight: GlobalSize(10),
    marginLeft: DEFAULTWIDTH * 0.1
  },
  inputWrite: {
    color: TEXTCOLOR10,
    fontSize: GlobalSize(11),
    fontFamily: FONTS.FontRegular,
    paddingLeft: GlobalSize(15),
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
    fontSize: 14,
    fontFamily: FONTS.FontRegular,
    color: TEXTCOLOR5,
    maxWidth: DEFAULTWIDTH * 0.9,
    lineHeight: 20
  },
  viewRadioBtn: {
    flexDirection: 'row',
    marginLeft: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  inputWrite: {
    color: TEXTCOLOR10,
    fontSize: 11,
    fontFamily: FONTS.FontRegular,
    paddingLeft: 15,
  },
  textInputEducation: {
    //width: DEFAULTWIDTH * 0.8,
    //height: DEFAULTWIDTH * 0.01,
    borderRadius: 8,
    borderColor: BORDERCOLOR1,
    //borderWidth: 1,
    marginBottom: 1,
    marginLeft: DEFAULTWIDTH * 0.1
  },
  inputView: {
    justifyContent: 'center',
    marginTop: 17,
    left: 15,
  },
  btnText: {
    color: PUREWHITE,
    fontFamily: FONTS.FontBold,
    fontSize: 14,
  },
  textDummy: {
    color: PUREBLACK,
    fontSize: fontSize(13),
    fontFamily: FONTS.FontRegular
  },
  btnView: {
    alignItems: 'center',
    backgroundColor: PRIMARYCOLOR,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 5,
    width: DEFAULTWIDTH * 0.84,
    height: DEFAULTHEIGHT * 0.06,
    borderRadius: 4,
    top: 230

  }

})
