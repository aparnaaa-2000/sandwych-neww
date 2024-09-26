import { Text, View, StyleSheet, Image, StatusBar, SafeAreaView,ScrollView, Platform } from 'react-native';
import React,{useState,useEffect} from 'react';

// COLORS ARE IMPORTED GLOBALLY FROM COLORS
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../Constants/Colors/Colors';
import { FONTS } from '../../Constants/Fonts';

//SWIPE BUTTON IMPORTED FROM COMPONENTS
import NewUserButton from '../../Components/Common/Buttons/IOSRingButton/NewUserButton'
import SignInButton from '../../Components/Common/Buttons/IOSRingButton/SignInButton';

//IMPORT CONSTANTS
import { DEFAULTWIDTH } from '../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../Constants/ResponsiveFont/ResponsiveFonts';

const WelcomeScreen = ({ navigation }) => {

  const [toggled, setToggled] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const [toggledUser, setToggledUser] = useState(false);
  const [toggleStateUser, setToggleStateUser] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Your refresh logic goes here
      setToggleState(false)
      setToggled(false)
      setToggleStateUser(false)
      setToggledUser(false)
      console.log('Home screen focused. Refresh!', toggleState);
    });

    return unsubscribe;
  }, [navigation]);

  const navigations_Login = () => {
    navigation.navigate('SignIn');
  }

  const navigations_NewUser = () => {
    navigation.navigate('SignUpScreen');
  }

  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
      <ScrollView scrollEnabled={false} showsVerticalScrollIndicator={false} >

        <View style={styles.container}>

          <View style={{ marginLeft: DEFAULTWIDTH * 0.12, marginBottom: GlobalSize(5) }}>
            <Image source={require('../../../assets/Images/NEWSIGNIN/WELCOME1.png')}
              style={{ width: 450, height: 'auto', aspectRatio: 1 }} resizeMode='contain' />
          </View>

          <View style={{ marginBottom: DEFAULTWIDTH * 0.18 }}>
            <Text style={styles.textWe}>Welcome!</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <SignInButton
          navigations={navigations_Login}
          navigation={navigation}
          toggled={toggled}
          setToggled={setToggled}
          toggleState={toggleState}
          setToggleState={setToggleState}
        />

        <NewUserButton
          navigations={navigations_NewUser}
          navigation={navigation}
          toggled={toggledUser}
          setToggled={setToggledUser}
          toggleState={toggleStateUser}
          setToggleState={setToggleStateUser}
        />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: GlobalSize(10),
    backgroundColor: BACKGROUNDWHITE
  },
  textWe: {
    fontSize: fontSize(25),
    fontFamily: FONTS.FontSemiB,
    color: PRIMARYCOLOR
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS == 'ios' ? GlobalSize(40) :GlobalSize(20), // Adjust as needed
    width: '100%',
    alignItems: 'center'
  },
})
export default WelcomeScreen;
