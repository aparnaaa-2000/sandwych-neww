import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {
    BACKGROUNDWHITE,
    BORDERCOLOR1,
    BORDERCOLOR4,
    BOTTOMTABTEXT1,
    LINECOLOR1,
    TEXTCOLOR10,
    TEXTCOLOR5,
    TEXTCOLOR7,
    TEXTCOLOR8
} from '../../../../../Constants/Colors/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { FONTS } from '../../../../../Constants/Fonts';
import { Button } from 'react-native-paper';
import { CalenderLine } from '../../../../../../assets';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AboutPatient = ({ navigation, route }) => {

    const initialStates = route?.params?.item?.questions?.reduce((acc, item, index) => {
        acc[index] = item?.type == 5 ? '' : ''; // Initialize with an empty string for each question.
        return acc;
    }, {});
    
    const value = useSelector((state) => state?.getQuestions?.value);
    const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);
    const TitleID = useSelector((state)=> state?.getPageNameValue?.TitleID)
    const [answers, setAnswers] = useState(initialStates);
    const [output, setOutPut] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);

    const [Location, setLocation] = useState('')
    const [LangLabel, setLangLabel] = useState(null)
    const [RaceLabel, setRaceLabel] = useState(null)
    const [Living1, setLiving1] = useState(null)
    const [Living2, setLiving2] = useState(null)
    const [Education, setEducation] = useState(null)
    const [Ethnicity, setEthnicity] = useState(null)
    const [DOB, setDOB] = useState('')
    const [EthnicLabel, setEthnicLabel] = useState(null)
    const [lang, setLang] = useState(null)
    const [race, setRace] = useState(null)
    const [EduLabel, setEduLabel] = useState(null)
    const [GenderLabel, setGenderlabel] = useState(null)
    const [GenderValue, setGenderValue] = useState(null)

    useEffect(() => {
        getBasicInfo();
    }, []);  // Re-run when the screen is focused

    const getBasicInfo = async () => { //FUNCTION FOR CALLING THE STORED DATA FROM ASYNC
        try {
            const jsonValue = await AsyncStorage.getItem('ABOUT_PATIENT_DATA');
            if (jsonValue != null) {
                const basicInfo = JSON.parse(jsonValue);
                setLocation(basicInfo.Location)
                setDOB(basicInfo.DOB)
                setGenderlabel(basicInfo.GenderLabel)
                setEthnicLabel(basicInfo.EthnicLabel)
                setLangLabel(basicInfo.LangLabel)
                setRaceLabel(basicInfo.RaceLabel)
                setEduLabel(basicInfo.EduLabel)
                setLiving1(basicInfo.Living1)
                setLiving2(basicInfo.Living2)
                console.log('Retrieved data:', basicInfo);

            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
    };

    const getOptionsForQuestion = (questionId) => { // FUNCTION FOR FILTER THE OPTIONS ON QUESTION ID BASIS
        return route?.params?.item?.options?.filter(option => option.question_id === questionId).map(item => ({
            label: item.option,
            value: item.id
        }));
    };

    const QuestionEthnicity = getOptionsForQuestion(60);
    const QuestionRace = getOptionsForQuestion(61);
    const QuestionLang = getOptionsForQuestion(62);
    const QuestionGender = getOptionsForQuestion(63);
    const QuestionEd = getOptionsForQuestion(64);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => { // STORE THE DATE PICKER VALUE
        const ConvertDate = moment(date).format('DD/MM/YYYY');
        setDOB(ConvertDate)
        setAnswers({
            ...answers,
            [selectedDateIndex]: ConvertDate,
        });
        hideDatePicker();
    };

    const handleChange = (index, item, id) => { // STORE THE VALUE ON THE BASIS OF ID 
        switch (id) {
            case 58:
                setLocation(item);
                break;
            case 60:
                setEthnicLabel(item?.label);
                setEthnicity(item?.value);
                break;
            case 61:
                setRace(item?.value);
                setRaceLabel(item?.label);
                break;
            case 62:
                setLang(item?.value);
                setLangLabel(item?.label);
                break;
            case 63:
                setGenderValue(item?.value);
                setGenderlabel(item?.label);
                break;
            case 64:
                setEducation(item?.value);
                setEduLabel(item?.label);
                break;
            case 65:
                setLiving1(item);
                break;
            case 66:
                setLiving2(item);
                break;
            default:
                console.warn(`Unhandled id: ${id}`);
                break;
        }

        setAnswers({
            ...answers,
            [index]: item?.value
        });
    };


    const OnValidation = () => { // CHECK THE VALIDATION

        if (Location && DOB && LangLabel && GenderLabel && EduLabel && Living1 && Living2 && EthnicLabel && RaceLabel) {
            NextNavigation()
        } else {

        }
    }

    const NextNavigation = () => {

        saveBasicInfo() // SAVE THE INFO INTO ARRAY

      
        // Find the index of the current title in the array
        const currentIndex = TitleID?.indexOf(7);

        if (currentIndex !== -1) {
            // Increment the index by 1 to get the index of the next title
            const nextIndex = currentIndex + 1;

            if (nextIndex < TitleGroup?.length) {
                // Retrieve the next title from the array using the incremented index
                const nextTitle = TitleID[nextIndex];
                const caregivingStyleTitle = value?.find(title => title?.title_id === nextTitle);

                // Use switch statement to handle navigation
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
                        navigation.navigate('Demographics', { item: caregivingStyleTitle,questions:route?.params?.item?.questions, titleGroup: route?.params?.titleGroup, titleName: nextTitle });
                        break;
                    case 9:
                        navigation.navigate('PersonalInfo', { item: caregivingStyleTitle });
                        break;
                    case 8:
                        navigation.navigate('BasicInfo2', { item: caregivingStyleTitle, titleGroup: route?.params?.titleGroup, titleName: nextTitle });
                        break;
                    default:
                        console.log("Unhandled next title:", nextTitle);
                        break;
                }
            }
            else {
                navigation.navigate('EnrollmentProgress')
                console.log("No more titles available after the current title.");
            }
        } else {
            console.log("Current title not found in the array.");
        }
    }



    const backToHC = () => { //NAVIAGTE INTO PREVIOUS SCREEN
        navigation.goBack();
    };

    const saveBasicInfo = async () => { //SAVE TH BASIC INFO
        try {
            const basicInfo = {
                Location: Location,
                DOB: DOB,
                EthnicLabel: EthnicLabel,
                RaceLabel: RaceLabel,
                LangLabel: LangLabel,
                GenderLabel: GenderLabel,
                EduLabel: EduLabel,
                Living1: Living1,
                Living2: Living2
            };

            const jsonValue = JSON.stringify(basicInfo);
            await AsyncStorage.setItem('ABOUT_PATIENT_DATA', jsonValue);

            const answersArray = createAnswersArray(); // STORE DATA ON A BASIS OF QUS AND OPTION

            AsyncStorage.setItem('ABOUTPATIENT_ANSWERS', JSON.stringify(answersArray))
            
            console.log('Data successfully saved');
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const backToEnrollment = () => { //NAVIGATE INTO MAIN SCREEN
        saveBasicInfo()
        navigation.navigate('EnrollmentProgress');
    };



    const createAnswersArray = () => { //STORE DATA INTO QUESTION AND OPTION FORMAT
        return route?.params?.item?.questions?.map((question) => {
            { console.log("type....................", question.type, question.id) }
            if (question.id == 58 && Location) {
                return {
                    question_id: question.id,
                    text_input: Location
                };
            }
            else if (question.id == 59 && DOB) {
                return {
                    question_id: question.id,
                    text_input: DOB
                };
            }
            else if (question.id == 60 && Ethnicity) {
                const EthinArray = Array.isArray(Ethnicity) ? Ethnicity : [Ethnicity];
                return {
                    question_id: question.id,
                    option_ids: EthinArray
                };
            }

            else if (question.id == 61 && race) {
                const RaceArray = Array.isArray(race) ? race : [race];
                return {
                    question_id: question.id,
                    option_ids: RaceArray
                };
            }

            else if (question.id == 62 && lang) {
                const LangArray = Array.isArray(lang) ? lang : [lang];
                return {
                    question_id: question.id,
                    option_ids: LangArray
                };
            }

            else if (question.id == 63 && GenderValue) {
                const GenderArray = Array.isArray(GenderValue) ? GenderValue : [GenderValue];
                return {
                    question_id: question.id,
                    option_ids: GenderArray
                };
            }

            else if (question.id == 64 && Education) {
                const EduArray = Array.isArray(Education) ? Education : [Education];
                return {
                    question_id: question.id,
                    option_ids: EduArray
                };
            }

            else if (question.id == 65 && Living1) {
                return {
                    question_id: question.id,
                    text_input: Living1
                };
            }

            else if (question.id == 66 && Living2) {
                return {
                    question_id: question.id,
                    text_input: Living2
                };
            }

            return null;
        }).filter(item => item !== null);
    };

    return (

        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={{ marginBottom: GlobalSize(15) }}>
                        <Text style={styles.mainHeader}>{route?.params?.titleName}</Text>
                    </View>
                    <View style={{ marginBottom: GlobalSize(20) }}>
                        {route?.params?.item?.questions?.map((item, index) => {

                            return (

                                <View key={index}>
                                    <View style={{ marginRight: GlobalSize(15) }}>
                                        <Text style={styles.subHeader}>{item?.question}</Text>

                                        {item?.type == 0 ?
                                            <TextInput
                                                maxLength={40}
                                                value={Location}
                                                style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                                                onChangeText={text => handleChange(index, text, item?.id)}
                                            /> :
                                            item?.type == 4 && item?.id == 60 ?
                                                <Dropdown
                                                    style={styles.textIn}
                                                    placeholderStyle={styles.placeholderS}
                                                    itemTextStyle={styles.textArea}
                                                    selectedTextStyle={styles.textArea}
                                                    containerStyle={styles.dropView}
                                                    data={QuestionEthnicity}
                                                    search={false}
                                                    labelField="label"
                                                    valueField="value"
                                                    placeholder={EthnicLabel ? EthnicLabel : 'Select'}
                                                    value={answers[index]}
                                                    onChange={quest => handleChange(index, quest, item?.id)}
                                                /> :
                                                item?.id == 61 && item?.type == 4 ?
                                                    <Dropdown
                                                        style={styles.textIn}
                                                        placeholderStyle={styles.placeholderS}
                                                        itemTextStyle={styles.textArea}
                                                        selectedTextStyle={styles.textArea}
                                                        containerStyle={styles.dropView}
                                                        data={QuestionRace}
                                                        search={false}
                                                        labelField="label"
                                                        valueField="value"
                                                        placeholder={RaceLabel ? RaceLabel : 'Select'}
                                                        value={answers[index]}
                                                        onChange={quest => handleChange(index, quest, item?.id)}
                                                    />
                                                    :
                                                    item?.id == 62 && item?.type == 4 ?
                                                        <Dropdown
                                                            style={styles.textIn}
                                                            placeholderStyle={styles.placeholderS}
                                                            itemTextStyle={styles.textArea}
                                                            selectedTextStyle={styles.textArea}
                                                            containerStyle={styles.dropView}
                                                            data={QuestionLang}
                                                            search={false}
                                                            labelField="label"
                                                            valueField="value"
                                                            placeholder={LangLabel ? LangLabel : 'Select'}
                                                            value={answers[index]}
                                                            onChange={quest => handleChange(index, quest, item?.id)}
                                                        />
                                                        :
                                                        item?.id == 63 && item?.type == 4 ?
                                                            <Dropdown
                                                                style={styles.textIn}
                                                                placeholderStyle={styles.placeholderS}
                                                                itemTextStyle={styles.textArea}
                                                                selectedTextStyle={styles.textArea}
                                                                containerStyle={styles.dropView}
                                                                data={QuestionGender}
                                                                search={false}
                                                                labelField="label"
                                                                valueField="value"
                                                                placeholder={GenderLabel ? GenderLabel : 'Select'}
                                                                value={answers[index]}
                                                                onChange={quest => handleChange(index, quest, item?.id)}
                                                            /> :
                                                            item?.id == 64 && item?.type == 4 ?
                                                                <Dropdown
                                                                    style={styles.textIn}
                                                                    placeholderStyle={styles.placeholderS}
                                                                    itemTextStyle={styles.textArea}
                                                                    selectedTextStyle={styles.textArea}
                                                                    containerStyle={styles.dropView}
                                                                    data={QuestionEd}
                                                                    search={false}
                                                                    labelField="label"
                                                                    valueField="value"
                                                                    placeholder={EduLabel ? EduLabel : 'Select'}
                                                                    value={answers[index]}
                                                                    onChange={quest => handleChange(index, quest, item?.id)}
                                                                />
                                                                : item?.type == 5 ?
                                                                    <View style={DEFAULTSTYLES.alignView}>
                                                                        <View style={[styles.dateView, { flexDirection: 'row' }]}>
                                                                            <TextInput
                                                                                value={DOB}
                                                                                onChangeText={(text) => setDOB(text)}
                                                                                style={styles.dateText}
                                                                            />
                                                                            <View style={DEFAULTSTYLES.alignView}>
                                                                                <TouchableOpacity
                                                                                    onPress={() => setDatePickerVisibility(true)}
                                                                                    style={{ padding: GlobalSize(5) }}>
                                                                                    <CalenderLine />
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>
                                                                    </View> :
                                                                    item?.type == 2 ?
                                                                        <TextInput
                                                                            value={item?.id == 65 ? Living1 : Living2}
                                                                            style={[styles.textIn, { height: DEFAULTWIDTH * 0.4, textAlignVertical: 'top', paddingTop: GlobalSize(10) }]}
                                                                            onChangeText={text => handleChange(index, text, item?.id)}
                                                                        /> :
                                                                        null}

                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
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
                        style={[styles.buttonStyle, { borderColor: Location && DOB && LangLabel && GenderLabel && EduLabel && Living1 && Living2 && EthnicLabel && RaceLabel ? BORDERCOLOR4 : LINECOLOR1 }]}>
                        <Text style={[styles.buttonText, { color: Location && DOB && LangLabel && GenderLabel && EduLabel && Living1 && Living2 && EthnicLabel && RaceLabel ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
                    </Button>

                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

        </SafeAreaView>


    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        padding: DEFAULTWIDTH * 0.05,
    },
    mainHeader: {
        fontFamily: 'Inter-Bold',
        fontSize: fontSize(26),
        color: TEXTCOLOR8,
    },
    dropView: {
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.90,
        padding: GlobalSize(5)
    },
    subHeader1: {
        marginTop: GlobalSize(8),
        marginBottom: GlobalSize(8),
        color: TEXTCOLOR5,
        fontSize: fontSize(14),
        fontFamily: 'Inter-Medium',
    },
    dateView: {
        width: DEFAULTWIDTH * 0.90,
        height: DEFAULTWIDTH * 0.12,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        marginLeft: GlobalSize(15),
        backgroundColor: BACKGROUNDWHITE,
        paddingRight: GlobalSize(10),
        justifyContent: 'space-between',
        //marginBottom: DEFAULTWIDTH * 0.05,

    },
    dateText: {
        fontSize: fontSize(12),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        left: GlobalSize(-5)
    },
    subHeader: {
        marginTop: GlobalSize(8),
        marginBottom: GlobalSize(8),
        color: TEXTCOLOR7,
        fontSize: fontSize(14),
        fontFamily: 'Inter-Medium',
    },
    placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1
    },
    textIn: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.90,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    buttonText: {
        color: TEXTCOLOR7,
        fontFamily: 'Inter-Medium',
        fontSize: fontSize(14),
    },
    buttonStyle: {
        borderRadius: GlobalSize(8),
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.29,
    },
    buttonPos: {
        position: 'relative',
        bottom: GlobalSize(20),
        paddingTop: GlobalSize(20),
        justifyContent: 'space-around',
        backgroundColor: BACKGROUNDWHITE
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    titleStart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: GlobalSize(10)
    }
})
export default AboutPatient;



