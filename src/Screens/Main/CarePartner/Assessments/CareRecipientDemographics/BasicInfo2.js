import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TextInput,
    ScrollView
} from 'react-native'
import {
    BACKGROUNDWHITE,
    BORDERCOLOR1,
    BORDERCOLOR4,
    BOTTOMTABTEXT1,
    LINECOLOR1,
    TEXTCOLOR10,
    TEXTCOLOR7,
    TEXTCOLOR8
} from '../../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { Dropdown } from 'react-native-element-dropdown'
import { FONTS } from '../../../../../Constants/Fonts'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

const BasicInfo2 = ({ navigation, route }) => {

    const [Name, setName] = useState(null)
    const [Place, setPlace] = useState(null)
    const [Gender, setGender] = useState(null)
    const [Address, setAddress] = useState(null)
    const [GenderLabel, setGenderlabel] = useState(null)
    const value = useSelector((state) => state?.getQuestions?.value); //TO GET THE REDUX STORED DATA
    const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);
    const TitleID = useSelector((state)=> state?.getPageNameValue?.TitleID)
    const isFocused = useIsFocused();  // To detect if the screen is focused

    useEffect(() => {
        if (isFocused) {
            getBasicInfo();
        }
    }, [isFocused]);  // Re-run when the screen is focused

    const getBasicInfo = async () => { // FUNCTION FOR GETTING THE STORED DATA FROM ASYNC

        try {
            const jsonValue = await AsyncStorage.getItem('BASIC_INFO_TWO');

            if (jsonValue != null) {

                const basicInfo = JSON.parse(jsonValue);
                setName(basicInfo.BasicName);
                setAddress(basicInfo.BasicAddress);
                setGenderlabel(basicInfo.BasicGender);
                setPlace(basicInfo.BasicPlace);
            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
    };

    const OnValidation = () => {// FUNCTION FOR CHECKING THE VALIDATION
        if (Name && Place && GenderLabel && Address) {
            NextNavigation()
        } else {
            console.log("Please fill the data.............")
        }
    }

    const NextNavigation = () => {

        saveBasicInfo() // FUNCTION FOR STORING THE DATA INTO A SINGLE ARRAY


        // Find the index of the current title in the array
        const currentIndex = TitleID?.indexOf(8);

        if (currentIndex !== -1) {
            // Increment the index by 1 to get the index of the next title
            const nextIndex = currentIndex + 1;

            if (nextIndex <TitleGroup?.length) {
                // Retrieve the next title from the array using the incremented index
                const nextTitle = TitleID[nextIndex];

                const caregivingStyleTitle = value?.find(title => title?.title_id === nextTitle);

                switch (nextTitle) {
                    case 2:
                        navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
                        break;
                    case 4:
                        navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: item?.page_names, item: caregivingStyleTitle });
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
                        navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: route?.params?.titleGroup, titleName: route?.params?.titleName });
                        break;
                    case 9:
                        navigation.navigate('PersonalInfo', { item: caregivingStyleTitle });
                        break;
                    case 8:
                        navigation.navigate('BasicInfo2', { item: caregivingStyleTitle });
                        break;
                    default:
                        console.log("Unhandled title:", nextTitle);
                        break;
                }
            } else {
                navigation.navigate('EnrollmentProgress')
                console.log("No more titles available after the current title.");
            }
        } else {
            console.log("Current title not found in the array.");
        }
    }

    const backToHC = () => { // NAVIGATE BACK TO THE PREVIOUS SCREEN
        navigation.goBack();
    };

    const saveBasicInfo = async () => { // STORE DATA INTO ASYNC
        try {
            const basicInfo = {
                BasicName: Name,
                BasicPlace: Place,
                BasicGender: GenderLabel,
                BasicAddress: Address
            };
            const jsonValue = JSON.stringify(basicInfo);
            await AsyncStorage.setItem('BASIC_INFO_TWO', jsonValue);


            const answersArray = createAnswersArray(); //FUNCTION FOR STORING DATA INTO KEY-VALUE PAIR FORMAT

            AsyncStorage.setItem('BASICINFO2_ANSWERS', JSON.stringify(answersArray))

        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const backToEnrollment = () => {//NAVIGATE BACK TO THE MAIN SCREEN
        saveBasicInfo()
        navigation.navigate('EnrollmentProgress');
    };

    const handleChange = (text, id) => { // FUNCTION FOR HANDLING THE TEXTINPUT BASED ON ID
        if (id == 110) {
            setName(text)
        } else {
            setPlace(text)
        }
    }

    const createAnswersArray = () => { //STORE DATA ON THE BASIS OF QUESTION ID AND OPTION ID

        return route?.params?.item?.questions?.map((question) => {

            if (question.id == 110 && question.type == 0 && Name) {
                return {
                    question_id: question.id,
                    text_input: Name
                };
            }
            else if (question.id == 111 && Place) {
                return {
                    question_id: question.id,
                    text_input: Place
                };
            }
            else if (question.id == 115 && Gender) {
                const GenderArray = Array.isArray(Gender) ? Gender : [Gender];
                return {
                    question_id: question.id,
                    option_ids: GenderArray
                };
            }
            else if (question.id == 116 && Address) {
                return {
                    question_id: question.id,
                    text_input: Address
                };
            }
            return null;
        }).filter(item => item !== null);
    };

    const Option = route?.params?.item?.options?.filter(option => option.question_id === 115).map((item) => ({
        label: item.option,
        value: item.id

    }))
    console.log(Option);

    return (
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginBottom: GlobalSize(15) }}>
                        <Text style={styles.mainHeader}>Basic Information 2</Text>
                    </View>

                    {route?.params?.item?.questions.map((item) => {
                        return (
                            <View>
                                <Text style={styles.subHeader}>{item?.question}</Text>

                                <View style={DEFAULTSTYLES.alignView}>
                                    {item?.type == 0 ?

                                        <TextInput
                                            maxLength={40}
                                            value={item?.id == 110 ? Name : Place}
                                            style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                                            onChangeText={text => handleChange(text, item?.id)}
                                        /> :
                                        item?.type == 4 ?
                                            <Dropdown
                                                style={styles.textIn}
                                                placeholderStyle={styles.placeholderS}
                                                itemTextStyle={styles.textArea}
                                                selectedTextStyle={styles.textArea}
                                                containerStyle={styles.dropView}
                                                data={Option}
                                                search={false}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={GenderLabel ? GenderLabel : 'Select'}
                                                value={Gender}
                                                onChange={item => {
                                                    setGender(item?.value),
                                                        setGenderlabel(item?.label)
                                                }}
                                            /> :
                                            item?.type == 1 ?
                                                <TextInput
                                                    multiline
                                                    value={Address}
                                                    style={[styles.textIn, {
                                                        height: DEFAULTWIDTH * 0.4,
                                                        textAlignVertical: 'top', paddingTop: GlobalSize(10)
                                                    }]}
                                                    onChangeText={text => setAddress(text)}
                                                /> : null}
                                </View>
                            </View>
                        )
                    })}




                </ScrollView>

                <View style={styles.buttonPos}>
                    <View
                        style={styles.viewButton}>
                        <Button
                            onPress={() => backToHC()}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Back</Text>
                        </Button>

                        <Button
                            onPress={() => backToEnrollment()}
                            style={styles.buttonStyle}>
                            <Text style={styles.buttonText}>Save & Exit</Text>
                        </Button>

                        <Button
                            onPress={() => OnValidation()}
                            style={[styles.buttonStyle, { borderColor: Name && Place && GenderLabel && Address ? BORDERCOLOR4 : LINECOLOR1 }]}>
                            <Text style={[styles.buttonText, { color: Name && Place && GenderLabel && Address ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
                        </Button>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default BasicInfo2;

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
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.27,
    },
    buttonPos: {
        //position: 'absolute',
        justifyContent: 'space-around',
        bottom: GlobalSize(0),

        backgroundColor: BACKGROUNDWHITE
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})