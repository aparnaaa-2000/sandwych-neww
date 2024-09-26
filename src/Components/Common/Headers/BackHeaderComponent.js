import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {ArrowF, LogoSmall} from '../../../../assets';
import {GlobalSize, height, width} from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import {DEFAULTHEIGHT, DEFAULTWIDTH} from '../../../Constants/styles/styles';

const BackHeaderComponent = ({navigation}) => {
  return (
    <View style={styles.flexView}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginRight: GlobalSize(10)}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowF height={height(22)} width={width(22)} />
          </TouchableOpacity>
        </View>

        <View>
          <LogoSmall />
        </View>
      </View>

      <View></View>

      <View>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  flexView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: DEFAULTWIDTH * 0.05,
    marginRight: DEFAULTWIDTH * 0.03,
    marginBottom: DEFAULTHEIGHT * 0.02,
  },
});

export default BackHeaderComponent;
