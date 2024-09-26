import { FlatList, Image, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { BACKGROUNDBLUE, PUREWHITE, TEXTCOLOR7 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

const SupportListing = ({ data, Title }) => {

  const functionalAbilities0 = data?.filter(item => item.functional_abilities === '1')
 
  
  const renderItem = ({ item }) => {

    return (
      <View>
        {item.functional_abilities ==  '1' &&
      <View style={styles.cardView}>
        <Image source={{uri:item.support_image}} style={{ width: width(50), height: height(50) }} />

        <Text style={styles.textTitle}>{item.support}</Text>
      </View>}
      </View>
    )
  }
  return (
    <>
    {functionalAbilities0?.length >0 &&
    <View
      style={[styles.mainView,
      Platform.OS == 'android' ?
        DEFAULTSTYLES.androidShadow :
        DEFAULTSTYLES.iosShadow]}>
      <View style={{ marginLeft: DEFAULTWIDTH * 0.05, marginBottom: GlobalSize(15) }}>
        <Text style={styles.textMain}>{Title}</Text>
      </View>

      <View>
        <FlatList
          data={data}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem} />
      </View>
    </View>}
    </>
  )
}

export default SupportListing;

const styles = StyleSheet.create({
  cardView: {
    width: DEFAULTWIDTH * 0.24,
    backgroundColor: BACKGROUNDBLUE,
    borderRadius: GlobalSize(15),
    marginLeft: GlobalSize(13.5),
    marginRight: GlobalSize(5),
    alignItems: 'center',
    justifyContent: 'center',
    padding: GlobalSize(12),
    marginBottom: GlobalSize(10),
    height:GlobalSize(99)
  },
  textTitle: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(10),
    color: PUREWHITE,
    top: GlobalSize(5)
  },
  mainView: {
    width: DEFAULTWIDTH * 0.90,
    backgroundColor: PUREWHITE,
    borderRadius: GlobalSize(10),
    paddingBottom: GlobalSize(10),
    paddingTop: GlobalSize(20),
    margin: GlobalSize(1),
    marginBottom: GlobalSize(15)
  },
  textMain: {
    fontFamily: FONTS.FontSemiB,
    fontSize: fontSize(14),
    color: TEXTCOLOR7
  }
})