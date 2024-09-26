import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { BlueBackArrow, LogoSmall } from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';

const DefaultBackHeader = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginLeft: DEFAULTWIDTH * 0.02, marginRight: DEFAULTWIDTH * 0.03 }}>
        <BlueBackArrow />
      </TouchableOpacity>
      <LogoSmall />
    </View>
  );
};

export default DefaultBackHeader;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: "center",
    marginTop: GlobalSize(10),
    marginBottom: GlobalSize(10)
  }
})
