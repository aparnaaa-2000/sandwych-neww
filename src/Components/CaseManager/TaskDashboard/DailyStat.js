import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import PieChart from 'react-native-pie-chart';
import { BORDERCOLORLINE2, FIFTHCOLOR, FOURTHCOLOR, PRIMARYCOLOR, PUREBLACK, TEXTCOLOR10 } from '../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { FONTS } from '../../../Constants/Fonts';

const DailyStat = () => {

  const widthAndHeight = 100
  const series = [170, 260, 130,]
  const sliceColor = ['#FF9E1B', '#151F6D', '#86C8BC',]

  return (
    <View style={{ padding: GlobalSize(20) }}>

      <View style={styles.row}>
        <View>
          <Text style={styles.today}>Daily Statistics</Text>
        </View>

        <View>
          <Text style={styles.today}>See all</Text>
        </View>
      </View>

      <View style={styles.borderRow}>
        <View>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.8}
          coverFill={'#FFF'}
        />
        </View>

<View>
        <View style={styles.rowSub}>
          <View style={[styles.box,{backgroundColor:FOURTHCOLOR}]}/>
          <Text style={styles.textProgress}>To-do   <Text style={styles.textPercent}>(100%)</Text></Text>
        </View>

        <View style={styles.rowSub}>
          <View style={[styles.box,{backgroundColor:FIFTHCOLOR}]}/>
          <Text style={styles.textProgress}>Progress   <Text style={styles.textPercent}>(25%)</Text></Text>
        </View>

        <View style={styles.rowSub}>
          <View style={[styles.box,{backgroundColor:PRIMARYCOLOR}]}/>
          <Text style={styles.textProgress}>Done   <Text style={styles.textPercent}>(50%)</Text></Text>
        </View>
        </View>
      </View>
    </View>
  )
}

export default DailyStat;

const styles = StyleSheet.create({
  today: {
    color: PUREBLACK,
    fontSize: fontSize(15),
    fontFamily: FONTS.FontSemiB
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: GlobalSize(15)
  },
  borderRow: {
    borderWidth: 1,
    borderColor: BORDERCOLORLINE2,
    borderRadius: GlobalSize(10),
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    padding:GlobalSize(15)
  },
  box:{
    width:GlobalSize(18),
    height:GlobalSize(18),
    borderRadius:GlobalSize(5),
    marginRight:GlobalSize(10)
  },
  textPercent:{
    fontFamily:FONTS.FontRegular,
    color:BORDERCOLORLINE2,
    fontSize:fontSize(14),
  },
  textProgress:{
    fontFamily:FONTS.FontRegular,
    color:TEXTCOLOR10,
    fontSize:fontSize(14),
  },
  rowSub:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:GlobalSize(6)
  }
})