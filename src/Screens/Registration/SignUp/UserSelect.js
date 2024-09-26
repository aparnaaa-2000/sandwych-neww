import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';

//IMPORT CONSTANTS
import {USERTYPES} from '../../../Constants/Texts';
import {
  PUREWHITE,
  TEXTCOLOR2,
  BACKGROUNDWHITE,
  PRIMARYCOLOR,
} from '../../../Constants/Colors/Colors';
import {
  GlobalSize,
  fontSize,
} from '../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT MODAL
import ComeSoonModal from '../../../Components/ComingSoonPopup/ComeSoon';

import { getServicesforSupport } from '../../../redux/supportthunk';

//IMPORT PACKAGES
import { useDispatch } from 'react-redux';
import {Card} from 'react-native-paper';

const UserSelect = ({navigation}) => {
  
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(0);
  const [ModalOpen, setModalOpen] = useState(false);

  useEffect(() => {

    handleBackButtonPressAndroid()
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
    };
  }, [navigation]);


  const handleBackButtonPressAndroid = () => {
    if (!navigation.isFocused()) {
      // The screen is not focused, so don't do anything
      return false;
    }
    else {
      return true;
    }
  }

  // =======================================================================
  // Uses 2 Function for NAVIGATION
  // =======================================================================

  const navigateSignUp = id => {
    if (id == 2) {
      selectedIdSelection(id);
      getData(id);
    } else if (id == 3) {
      selectedIdSelection(id);
      getData(id);
    } else {
      setModalOpen(true);
    }
  };

  // =======================================================================
  // Select a particular ID
  // =======================================================================

  const selectedIdSelection = id => {
    setSelectedId(id);
  };

  const getData = async (selectedId) => {
    setTimeout(() => {
      if (selectedId == 2) {
        navigation.navigate('SignUpForm');
      } else if (selectedId == 3) {
        getServicesforSupport(dispatch);
        navigation.navigate('SelectServices');
      }
    }, 500);
  };

  return (
    <SafeAreaView style={{backgroundColor: BACKGROUNDWHITE, flex: 1}}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{flex: 0}}
      />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headingText}>We extend care</Text>
        <Text style={[styles.headingText, {marginTop: 0}]}>
          Tell us about you.
        </Text>
        <Text style={styles.subHeadingText}>
          We help Care-givers and Care Recipients
        </Text>
        <Text style={styles.descriptionText}>
          Select which account best suits your needs.
        </Text>
        <View style={{marginBottom: GlobalSize(12), marginTop: GlobalSize(10)}}>
          {USERTYPES.map((usertype, key) => (
            <Card
              style={[
                styles.cardStyle,
                {
                  backgroundColor:
                    selectedId == usertype.id ? PRIMARYCOLOR : PUREWHITE,
                },
              ]}
              onPress={() => navigateSignUp(usertype.id)}>
              <Text
                style={[
                  styles.cardHeaderStyle,
                  styles.selectedCardStyle(selectedId, usertype.id),
                ]}>
                {usertype.title}
              </Text>
              <Text
                style={[
                  styles.cardDescStyle,
                  styles.selectedCardStyle(selectedId, usertype.id),
                ]}>
                {usertype.desciption}
              </Text>
         </Card>
          ))}
        </View>

        <ComeSoonModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainContainer: {
    marginVertical: GlobalSize(2),
    marginHorizontal: GlobalSize(20),
    flex: 1,
  },
  headingText: {
    fontFamily: 'Inter-ExtraBold',
    color: PRIMARYCOLOR,
    fontSize: fontSize(25),
    marginTop: GlobalSize(20),
  },
  subHeadingText: {
    fontFamily: 'Inter-SemiBold',
    color: PRIMARYCOLOR,
    fontSize: fontSize(16),
    marginTop: GlobalSize(5),
  },
  descriptionText: {
    fontFamily: 'Inter-Regular',
    color: TEXTCOLOR2,
    fontSize: fontSize(14),
  },
  cardStyle: {
    padding: GlobalSize(15),
    borderRadius: 5,
    marginVertical: '2%',
    marginLeft: GlobalSize(1),
    marginRight: GlobalSize(1),
  },
  cardHeaderStyle: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: fontSize(24),
    marginBottom: GlobalSize(5),
  },
  cardDescStyle: {
    fontFamily: 'Inter-Regular',
  },
  selectedCardStyle: (selectedId, id) => ({
    color: selectedId == id ? PUREWHITE : PRIMARYCOLOR,
  }),
});

export default UserSelect;
