import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Dropdown} from 'react-native-element-dropdown';
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BOTTOMTABTEXT1, TEXTCOLOR10, TEXTCOLOR7 } from '../../../Constants/Colors/Colors';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { FONTS } from '../../../Constants/Fonts';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const SDOHDropdown = ({data,value,setValue,placeholder}) => {
  return (
    <View>
      <Dropdown
              style={styles.dropDnContainer}
              placeholderStyle={styles.placeholderS}
              itemTextStyle={styles.textArea}
              selectedTextStyle={styles.textArea}
              containerStyle={styles.dropView}
              data={data}
              search={false}
              labelField="label"
              valueField="value"
              placeholder={'Select'}
              dropdownPosition='bottom'
              showsVerticalScrollIndicator={false}
              value={value}
              onChange={item => {
                setValue(item.value)
              }}
            />
    </View>
  )
}

export default SDOHDropdown

const styles = StyleSheet.create({
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.9,
        padding: GlobalSize(5),
      },
      dropDnContainer: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.9,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
      },
      textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10
      },
      placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1,
      },
})