import React from 'react';
import {Text,View,StyleSheet,SafeAreaView,StatusBar,ScrollView,Dimensions} from 'react-native';
import { BACKGROUNDWHITE, BORDERCOLOR4, TEXTCOLOR5, TEXTCOLOR7, TEXTCOLOR8 } from '../../../../../Constants//Colors/Colors';
import { Button } from 'react-native-paper';
import { FONTS } from '../../../../../Constants/Fonts';

idth = Dimensions.get('window').width;

const Cat = ({navigation}) => {
  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
    <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
    <View style={styles.MainConatiner}>
    <ScrollView>
<View>
<Text style={styles.heading}>kkk</Text>
      <Text style={styles.subHeading}>ooo</Text>
</View>
    </ScrollView>
    <View style={{flexDirection: 'row', justifyContent: 'space-around',marginBottom:10,marginTop:20}}>
        <Button style={styles.buttonStyle} onPress={()=>NavigationBack()}>
          <Text style={styles.buttonTextStyle}>Back</Text>
        </Button>
        <Button style={styles.buttonStyle} onPress={()=>navigation.goBack()}>
          <Text style={styles.buttonTextStyle}>Save & Exit</Text>
        </Button>
        <Button style={styles.buttonStyle} onPress={()=>NextNavigation()}>
          <Text style={styles.buttonTextStyle}>Next</Text>
        </Button>
      </View>
    </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
    MainConatiner:{
        flex:1,
        backgroundColor:BACKGROUNDWHITE
    },
    buttonTextStyle: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontMedium,
        fontSize: 14,
      },
    buttonStyle: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.29,
    },
    heading: {
        fontSize: 26,
        fontFamily: FONTS.FontBold,
        color: TEXTCOLOR8,
        marginLeft: 7,
        marginTop:10,
      },
      subHeading: {
        color: TEXTCOLOR5,
        fontSize: 14,
        fontFamily: FONTS.FontMedium,
        marginLeft: 7,
        marginBottom: '5%',
      },
})
export default Cat;