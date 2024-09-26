import React, { } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

//IMPORT CONSTANTS
import { PUREBLACK,} from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { LeftArrow } from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';


const TaskHeader = ({ name, navigation }) => {

  return (
    <View>

      <View style={styles.subView}>
        <View style={{ left: GlobalSize(-25) }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrow />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.textTask}>{name}</Text>
        </View>
        <View>
          <Text></Text>
        </View>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  textTask: {
    fontFamily: FONTS.FontMedium,
    fontSize: fontSize(16),
    fontWeight: '700',
    color: PUREBLACK,
    left: GlobalSize(-5)
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: DEFAULTWIDTH * 0.05,
    marginBottom: DEFAULTWIDTH * 0.1
  },


})

export default TaskHeader;