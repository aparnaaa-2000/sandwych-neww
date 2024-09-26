
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TextInput,
    ScrollView
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import {
    BACKGROUNDWHITE,
    BORDERCOLOR1,
    BORDERCOLOR4,
    BOTTOMTABTEXT1,
    LINECOLOR1,
    TEXTCOLOR10,
    TEXTCOLOR7,
    TEXTCOLOR8
} from '../../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { FONTS } from '../../../../../Constants/Fonts';
import { useIsFocused } from '@react-navigation/native';

const PersonalInfo = ({ navigation, route }) => {

    const [PersonalName, setPersonalName] = useState(null);
    const [Address, setAddress] = useState(null);
    const [AllergyValue, setAllergyValue] = useState([]);
    const [AllergyLabel, setAllergyLabel] = useState(null);
    const [optionAllergy, setOptionAllergy] = useState([])

    const value = useSelector((state) => state?.getQuestions?.value);
    const TitleID = useSelector((state)=> state?.getPageNameValue?.TitleID)
    const isFocused = useIsFocused();  // To detect if the screen is focused

    useEffect(() => {
        if (isFocused) {
            getBasicInfo();
            computeOptionAllergy();
        }
    }, [isFocused]);  // Re-run when the screen is focused

    const getBasicInfo = async () => { //GET THE STORED VALUE FROM ASYNC STORAGE

        try {
            const jsonValue = await AsyncStorage.getItem('PERSONAL_INFOS');

            if (jsonValue != null) {

                const basicInfo = JSON.parse(jsonValue);
                setAddress(basicInfo.Address)
                setAllergyLabel(basicInfo.AllergyLabel)
                setPersonalName(basicInfo.Name)
            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
    };

    const backToHC = () => { //NAVIGATE TO THE PREVIOUS SCREEN
        navigation.goBack();
    };

    const backToEnrollment = () => { //BACK TO MAIN SCREEN
        saveBasicInfo()
        setTimeout(() => {
            navigation.navigate('EnrollmentProgress');
        }, 1000)

    };

    const saveBasicInfo = async () => { //SAVE DATA INTO ASYNC STORAGE
        try {
            const basicInfo = {
                Name: PersonalName,
                AllergyLabel: AllergyLabel,
                Address: Address
            };

            const jsonValue = JSON.stringify(basicInfo);
            await AsyncStorage.setItem('PERSONAL_INFOS', jsonValue);
            const answersArray = createAnswersArray(); // STORE ALL DATA INTO ASYNC WITH OPTION AND QUESTION ID BASED
            AsyncStorage.setItem('PERSONALINFO_ANSWERS', JSON.stringify(answersArray))

        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const computeOptionAllergy = () => { //FILTER THE OPTIONS BASED ON QUESTION ID
        const optionAllergy = route?.params?.item?.options?.filter(option => option.question_id === 120).map((item) => ({
            label: item.option,
            value: item.id
        }));
        setOptionAllergy(optionAllergy);
    };

    const OnValidation = () => { //CHECKING VALIDATION AND NAVIGATE TO NEXT SCREEN
        if (PersonalName && AllergyLabel && Address) {
            NextNavigation()
        } else {
            console.log("Please fill")
        }
    }


    const NextNavigation = () => { // NAVIGATE TO THE NEXT SCREEN

        saveBasicInfo() // FUNCTION FOR STORING THE DATA INTO A SINGLE ARRAY

        const currentIndex = TitleID?.indexOf(9);

        if (currentIndex !== -1) { //FUNCTION FOR NAVIGATE TO THE NEXT SCREEN

            const nextIndex = currentIndex + 1;

            if (nextIndex < route?.params?.titleGroup?.length) {

                const nextTitle = route?.params?.titleGroup[nextIndex];

                const caregivingStyleTitle = value?.find(title => title?.title_id === nextTitle); //FIND OUT THE NEXT SCREEN

                switch (nextTitle) {
                    case 2:
                        navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
                        break;
                    case 4:
                        navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: caregivingStyleTitle?.page_names, item: caregivingStyleTitle });
                        break;
                    case 3:
                        navigation.navigate('FunctionalMain', { mainText: 'Ability to Help 1', pages: item?.page_names, item: caregivingStyleTitle });
                        break;
                    case 7:
                        navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle });
                        break;
                    case 6:
                        navigation.navigate('CaregiverDemographics', { item: caregivingStyleTitle });
                        break;
                    case 1:
                        navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: title?.flat(), titleName: item?.title_name });
                        break;
                    case 9:
                        navigation.navigate('PersonalInfo', { item: caregivingStyleTitle, pages: item?.page_names });
                        break;
                    case 8:
                        navigation.navigate('BasicInfo2', { item: caregivingStyleTitle });
                        break;
                    default:
                        console.log("Unknown title:", nextTitle);
                }
            } else {
                navigation.navigate('EnrollmentProgress')
                console.log("No more titles available after the current title.");
            }
        } else {
            console.log("Current title not found in the array.");
        }
    };


    const createAnswersArray = () => { //FUNCTION FOR ADD ALL THE QUESTIONS AND OPTIONS INTO AN ARRAY
        return route?.params?.item?.questions?.map((question) => {

            if (question.type == 2 && question.id == 120 && AllergyValue) {
                const allergyValuesArray = Array.isArray(AllergyValue) ? AllergyValue : [AllergyValue];
                return {
                    question_id: question.id,
                    option_ids: allergyValuesArray
                };
            }
            else if (question.type == 2 && question.id == 121 && Address) {
                return {
                    question_id: question.id,
                    text_input: Address
                };
            }
            else if (question.type == 0 && PersonalName) {
                return {
                    question_id: question.id,
                    text_input: PersonalName
                };
            }
            return null;
        }).filter(item => item !== null);
    };


    return (
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: GlobalSize(15) }}>
                        <Text style={styles.mainHeader}>Personal Information</Text>
                    </View>

                    <View>
                        <Text style={styles.subHeader}>{route?.params?.item?.questions[0]?.question}</Text>
                        <TextInput
                            maxLength={40}
                            value={PersonalName}
                            style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                            onChangeText={text => setPersonalName(text)}
                        />
                    </View>

                    <View>
                        <Text style={styles.subHeader}>{route?.params?.item?.questions[1]?.question}</Text>
                        <Dropdown
                            style={styles.textIn}
                            placeholderStyle={styles.placeholderS}
                            itemTextStyle={styles.textArea}
                            selectedTextStyle={styles.textArea}
                            containerStyle={styles.dropView}
                            data={optionAllergy}
                            search={false}
                            labelField="label"
                            valueField="value"
                            placeholder={AllergyLabel ? AllergyLabel : 'Select'}
                            value={AllergyValue}
                            onChange={item => {
                                setAllergyValue(item.value);
                                setAllergyLabel(item?.label);
                            }}
                        />
                    </View>

                    <View>
                        <Text style={styles.subHeader}>{route?.params?.item?.questions[2]?.question}</Text>
                        <TextInput
                            multiline
                            value={Address}
                            onChangeText={(text) => setAddress(text)}
                            style={[styles.textIn, { height: DEFAULTWIDTH * 0.4, textAlignVertical: 'top', paddingTop: GlobalSize(15) }]}
                        />
                    </View>

                </ScrollView>


                <View style={styles.buttonPos}>
                    <View style={styles.viewButton}>
                        <Button onPress={() => backToHC()} style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Back</Text>
                        </Button>

                        <Button
                            onPress={() => backToEnrollment()}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Save & Exit</Text>
                        </Button>

                        <Button onPress={OnValidation} style={[styles.buttonStyle, { borderColor: PersonalName && AllergyLabel && Address ? BORDERCOLOR4 : LINECOLOR1 }]}>
                            <Text style={[styles.buttonText, { color: PersonalName && AllergyLabel && Address ? TEXTCOLOR7 : LINECOLOR1 }]}>
                                Next
                            </Text>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PersonalInfo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        padding: GlobalSize(20)
    },
    mainHeader: {
        fontFamily: 'Inter-Bold',
        fontSize: fontSize(26),
        color: TEXTCOLOR8,
    },
    subHeader: {
        marginTop: GlobalSize(8),
        marginBottom: GlobalSize(8),
        color: TEXTCOLOR7,
        fontSize: fontSize(14),
        fontFamily: 'Inter-Medium',
    },
    textIn: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.88,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        marginBottom: GlobalSize(10)
    },
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(5)
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1
    },
    buttonText: {
        color: TEXTCOLOR7,
        fontFamily: 'Inter-Medium',
        fontSize: fontSize(12),
    },
    buttonStyle: {
        borderRadius: GlobalSize(8),
        borderWidth: 1,
        margin: GlobalSize(0),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.28,
    },
    buttonPos: {
        //justifyContent: 'space-between',
        bottom: GlobalSize(5),
        // backgroundColor: BACKGROUNDWHITE
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems: 'center',
    },
});
