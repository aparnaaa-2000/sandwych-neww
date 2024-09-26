import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    Dimensions,
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
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setAnswer } from '../../../../../redux/Slice/ValueStorage/ValueSliceKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const Demographics = ({ navigation, route }) => {

    const initialStates = route?.params?.item?.questions?.reduce((acc, item, index) => {
        acc[index] = item?.type == 5 ? '' : ''; // Initialize with an empty string for each question.
        return acc;
    }, {});

    const value = useSelector((state) => state?.getQuestions?.value);
    const [answers, setAnswers] = useState(initialStates);
    const [output, setOutPut] = useState([])
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDateIndex, setSelectedDateIndex] = useState(null);

    const [Name, setName] = useState(null)
    const [NickName, setNickName] = useState(null)
    const [Phone, setPhone] = useState(null)
    const [Code, setCode] = useState(null)
    const [address, setAddress] = useState(null)
    const [Relation, setRelation] = useState(null)
    const [use, setuse] = useState([])
    const [lang, setLang] = useState([])
    const [Ethnicity, setEthnicity] = useState([])
    const [race, setRace] = useState([])
    const [primaryCare, setPrimaryCare] = useState([])
    const [attorney, setAttorney] = useState([])
    const [Zipcode, setZipcode] = useState('')
    const [DOB, setDOB] = useState('')
    const [EthnicLabel, setEthnicLabel] = useState(null)
    const [RelationLabel, setRelationLabel] = useState(null)
    const [useLabel, setUseLabel] = useState(null)
    const [LangLabel, setLangLabel] = useState(null)
    const [RaceLabel, setRaceLabel] = useState(null)
    const [PrimaryLabel, setPrimaryLabel] = useState(null)
    const [AttorneyLabel, setAttorneyLabel] = useState(null)
    const [mappedData,setMappedData] = useState([])

    const isFocused = useIsFocused();  // To detect if the screen is focused

    useEffect(() => {
        if (isFocused) {
            getBasicInfo();//GET THE ASYNC STORED DATA
        }
    }, [isFocused]);  // Re-run when the screen is focused

    const getBasicInfo = async () => {

        try {
            const jsonValue = await AsyncStorage.getItem('DEMOGRAPHICS');
            if (jsonValue != null) {
                const basicInfo = JSON.parse(jsonValue);
                setName(basicInfo.Name)
                setNickName(basicInfo.NickName)
                setPhone(basicInfo.Phone)
                setCode(basicInfo.Code)
                setRelationLabel(basicInfo.RelationLabel)
                setUseLabel(basicInfo.useLabel)
                setDOB(basicInfo.DOB)
                setLangLabel(basicInfo.LangLabel)
                setEthnicLabel(basicInfo.EthnicLabel)
                setRaceLabel(basicInfo.RaceLabel)
                setPrimaryLabel(basicInfo.PrimaryLabel)
                setAttorneyLabel(basicInfo.AttorneyLabel)
                // setAddress(basicInfo.address)
                setRelation(basicInfo.Relation)
                setuse(basicInfo.use)
                setLang(basicInfo.lang)
                setEthnicity(basicInfo.Ethnicity)
                setRace(basicInfo.race)
                setPrimaryCare(basicInfo.primaryCare)
                setAttorney(basicInfo.attorney)

            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
    };

    const QuestionFour = route?.params?.item?.options?.filter(option => option.question_id === 4).map((item) => ({
        label: item.option,
        value: item.id
    }))

    const QuestionFive = route?.params?.item?.options?.filter(option => option.question_id === 5).map((item) => ({
        label: item.option,
        value: item.id
    }))

    const QuestionEight = route?.params?.item?.options?.filter(option => option.question_id === 8).map((item) => ({
        label: item.option,
        value: item.id
    }))

    const QuestionNine = route?.params?.item?.options?.filter(option => option.question_id === 9).map((item) => ({
        label: item.option,
        value: item.id
    }))

    const QuestionTen = route?.params?.item?.options?.filter(option => option.question_id === 10).map((item) => ({
        label: item.option,
        value: item.id
    }))

    const QuestionEleven = route?.params?.item?.options?.filter(option => option.question_id === 13).map((item) => ({
        label: item.option,
        value: item.id
    }))

    const QuestionTwlve = route?.params?.item?.options?.filter(option => option.question_id === 14).map((item) => ({
        label: item.option,
        value: item.id
    }))


    const hideDatePicker = () => { //FUNCTION FOR CLOSE THE DATE PICKER
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => { //FUNCTION FOR SET THE DATE VALUE
        const ConvertDate = moment(date).format('DD/MM/YYYY');
        setDOB(ConvertDate)
        setAnswers({
            ...answers,
            [selectedDateIndex]: ConvertDate,
        });
        hideDatePicker();

    };

    console.log("date of................",DOB)

    const handleChange = (index, item, id) => { //FUNCTION FOR STORING THE STATE VALES BASED ON QUESTION ID

        if (id == 1) {
            setName(item)
        }
        else if (id == 2) {
            setNickName(item)
        }
        else if (id == 3) {
            setPhone(item)
        }
        else if (id == 4) {
            setRelationLabel(item?.label)
            setRelation(item?.value)
        }
        else if (id == 5) {
            setuse(item?.value)
            setUseLabel(item?.label)
        }
        else if (id == 7) {
            setDOB(item)
        }
        else if (id == 8) {
            setLang(item?.value)
            setLangLabel(item?.label)
        }
        else if (id == 9) {
            setEthnicity(item?.value)
            setEthnicLabel(item?.label)
        }
        else if (id == 10) {
            setRace(item?.value)
            setRaceLabel(item?.label)
        }
        else if (id == 13) {
            setPrimaryCare(item?.value)
            setPrimaryLabel(item?.label)
        }
        else if (id == 14) {
            setAttorney(item?.value)
            setAttorneyLabel(item?.label)
        }
        else if (id == 6) {
            setCode(item)
        }
        // else if (id == 114) {
        //     setAddress(item)
        // }
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [id]: item,
          }));

        setOutPut(
            [...output, { question: id, option: value }]
        );

    };




    const OnValidation = () => { //VALIDATION CHECKING
       // if (Name && NickName && Phone && RelationLabel && useLabel && Code && DOB && LangLabel && EthnicLabel && RaceLabel && PrimaryLabel && AttorneyLabel) {
            NextNavigation()
      //  } else {

       // }
    }

    console.log("TITLE GROUP...................", mappedData)

    const NextNavigation = () => {
        const answersArray = createAnswersArray();
        AsyncStorage.setItem('BASICINFO_ANSWERS', JSON.stringify(answersArray))
        console.log("answers......................", answersArray);
        // backToEnrollment()
        // Find the index of the current title in the array
        const currentIndex = route?.params?.IDGroup?.indexOf(route?.params?.titleId);

        if (currentIndex !== -1) {
            // Increment the index by 1 to get the index of the next title
            const nextIndex = currentIndex + 1;

            if (nextIndex < route?.params?.IDGroup?.length) {
                // Retrieve the next title from the array using the incremented index
                const nextTitle = route?.params?.IDGroup[nextIndex];
                const caregivingStyleTitle = value?.find(title => title?.title_id === nextTitle);

                if (nextTitle == 2) {
                    navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
                }
                else if (nextTitle == 4) {
                    navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: route?.params?.pages, item: caregivingStyleTitle });
                }
                else if (nextTitle == 3) {
                    navigation.navigate('FunctionalMain', { mainText: 'Ability to Help 1', pages: route?.params?.pages, item: caregivingStyleTitle });
                }
                else if (nextTitle == 7) {
                    navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle })
                }
                else if (nextTitle == 6) {
                    navigation.navigate('CaregiverDemographics', { item: caregivingStyleTitle })
                }
                else if (nextTitle == 1) {
                    navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: title?.flat(), titleName: item?.title_name })
                }
                else if (nextTitle == 10) {
                    navigation.navigate('PersonalInfo', { item: caregivingStyleTitle })
                }
                else if (nextTitle == 9) {
                    navigation.navigate('BasicInfo2', { item: caregivingStyleTitle, titleGroup: route?.params?.titleGroup, titleName: nextTitle })
                }
                console.log("Next title:", nextTitle);
            } else {
                navigation.navigate('EnrollmentProgress')
                console.log("No more titles available after the current title.");
            }
        } else {
            console.log("Current title not found in the array.");
        }
    }



    const backToHC = () => {
        navigation.goBack();
    };


    const saveBasicInfo = async () => {
        try {
            const basicInfo = {
                Name: Name,
                NickName: NickName,
                Phone: Phone,
                Code: Code,
                RelationLabel: RelationLabel,
                useLabel: useLabel,
                DOB: DOB,
                LangLabel: LangLabel,
                EthnicLabel: EthnicLabel,
                RaceLabel: RaceLabel,
                PrimaryLabel: PrimaryLabel,
                AttorneyLabel: AttorneyLabel,
                // address: address,
                Relation: Relation,
                use: use,
                lang: lang,
                Ethnicity: Ethnicity,
                race: race,
                primaryCare: primaryCare,
                attorney: attorney
            };

            const jsonValue = JSON.stringify(basicInfo);
            await AsyncStorage.setItem('DEMOGRAPHICS', jsonValue);
            const answersArray = createAnswersArray();
            AsyncStorage.setItem('BASICINFO_ANSWERS', JSON.stringify(answersArray))

            console.log('Data successfully saved');
        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const backToEnrollment = () => {
        saveBasicInfo()
        navigation.navigate('EnrollmentProgress');
    };

    const createAnswersArray = () => {
        return route?.params?.item?.questions?.map((question) => {
            { console.log("type....................", question.type, question.id) }
            if (question.id == 1 && Name) {
                return {
                    question_id: question.id,
                    text_input: Name
                };
            }
            else if (question.id == 2 && NickName) {
                return {
                    question_id: question.id,
                    text_input: NickName
                };
            }
            else if (question.id == 3 && Phone) {
                return {
                    question_id: question.id,
                    text_input: Phone
                };
            }

            else if (question.id == 4 && Relation) {
                const RelationArray = Array.isArray(Relation) ? Relation : [Relation];
                return {
                    question_id: question.id,
                    option_ids: RelationArray
                };
            }

            else if (question.id == 5 && use) {
                const useArray = Array.isArray(use) ? use : [use];
                return {
                    question_id: question.id,
                    option_ids: useArray
                };
            }

            else if (question.id == 6 && Code) {
                return {
                    question_id: question.id,
                    text_input: Code
                };
            }

            else if (question.id == 7 && DOB) {
                return {
                    question_id: question.id,
                    text_input: DOB
                };
            }

            else if (question.id == 8 && lang) {
                const LangArray = Array.isArray(lang) ? lang : [lang];
                return {
                    question_id: question.id,
                    option_ids: LangArray
                };
            }

            else if (question.id == 9 && Ethnicity) {
                const EthinArray = Array.isArray(Ethnicity) ? Ethnicity : [Ethnicity];
                return {
                    question_id: question.id,
                    option_ids: EthinArray
                };
            }

            else if (question.id == 10 && race) {
                const RaceArray = Array.isArray(race) ? race : [race];
                return {
                    question_id: question.id,
                    option_ids: RaceArray
                };
            }

            else if (question.id == 13 && primaryCare) {
                const PrimArray = Array.isArray(primaryCare) ? primaryCare : [primaryCare];
                return {
                    question_id: question.id,
                    option_ids: PrimArray
                };
            }

            else if (question.id == 14 && attorney) {
                const attornryArray = Array.isArray(attorney) ? attorney : [attorney];
                return {
                    question_id: question.id,
                    option_ids: attornryArray
                };
            }

        }).filter(item => item !== null);
    };

    useEffect(() => {
        // Function to group answers by question_id
        const groupAnswersByQuestionId = (answers) => {
          return answers.reduce((acc, answer) => {
            const { question_id } = answer;
            if (!acc[question_id]) {
              acc[question_id] = [];
            }
            acc[question_id].push(answer);
            return acc;
          }, {});
        };
    
        // Group the answers
        const groupedAnswers = groupAnswersByQuestionId(route?.params?.item?.patient_answers);
    
        // Update state based on question_id
        Object.keys(groupedAnswers).forEach(question_id => {
          const answerForQuestion = groupedAnswers[question_id].find(answer => answer.question_id === parseInt(question_id));
          if (answerForQuestion) {
            setAnswers(prevAnswers => ({
              ...prevAnswers,
              [question_id]: answerForQuestion.answer
            }));
          }
        });
      }, []); // Run this effect only once on mount

      useEffect(() => {
        // Map questions with corresponding answers
        const mappedData = route?.params?.item?.questions?.map(question => {
          const answer = route?.params?.item?.patient_answers?.find(pa => pa.question_id === question.id);
          return {
            ...question,
            answer: answer?.answer ? answer?.answer : answer?.option_value,
            option_id: answer?.option_value  ? answer?.option_id:null
          };
        });
        setMappedData(mappedData);
      }, []);

    //console.log("data called...................",route?.params?.item?.patient_answers)
    return (

        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.mainHeader}>Demographics</Text>
                        <View>
                            <Text style={styles.subHeader1}>Patient basic information</Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: GlobalSize(20) }}>
                        {mappedData?.map((item, index) => {
 {console.log("ANSWER...................",item)}
                            return (

                                <View key={index}>
                                
                                    <View style={{ marginRight: GlobalSize(15) }}>
                                        <Text style={styles.subHeader}>{item?.question}</Text>

                                        {item?.id == 1 ?
                                            <TextInput
                                                maxLength={40}
                                                value={answers[item.id]}
                                                //value={item?.answer ? item?.answer : Name}
                                                style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                                                onChangeText={text => handleChange(index, text, item?.id)}
                                            /> :
                                            item?.id == 2 ?
                                                <TextInput
                                                    maxLength={40}
                                                    value={answers[item.id]}
                                                    style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                                                    onChangeText={text => handleChange(index, text, item?.id)}
                                                /> :
                                                item?.id == 3 ?
                                                    <TextInput
                                                        keyboardType='number-pad'
                                                        maxLength={15}
                                                        value={answers[item.id]}
                                                        style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                                                        onChangeText={text => handleChange(index, text, item?.id)}
                                                    /> :
                                                    item?.id == 6 ?
                                                        <TextInput
                                                            maxLength={15}
                                                            value={answers[item.id]}
                                                            style={[styles.textIn, { height: DEFAULTWIDTH * 0.12 }]}
                                                            onChangeText={text => handleChange(index, text, item?.id)}
                                                        /> :
                                                        item?.id == 4 && item?.type == 4 ?
                                                            <Dropdown
                                                                style={styles.textIn1}
                                                                placeholderStyle={styles.placeholderS}
                                                                itemTextStyle={styles.textArea}
                                                                selectedTextStyle={styles.textArea}
                                                                containerStyle={styles.dropView}
                                                                data={QuestionFour}
                                                                search={false}
                                                                labelField="label"
                                                                valueField="value"
                                                                placeholder={RelationLabel ? RelationLabel : item?.answer ? item?.answer : 'Select' }
                                                                value={answers[item.id]}
                                                                onChange={quest => handleChange(index, quest, item?.id)}
                                                            />
                                                            :
                                                            item?.id == 5 && item?.type == 4 ?
                                                                <Dropdown
                                                                    style={styles.textIn1}
                                                                    placeholderStyle={styles.placeholderS}
                                                                    itemTextStyle={styles.textArea}
                                                                    selectedTextStyle={styles.textArea}
                                                                    containerStyle={styles.dropView}
                                                                    data={QuestionFive}
                                                                    search={false}
                                                                    labelField="label"
                                                                    valueField="value"
                                                                    placeholder={useLabel ? useLabel : item?.answer ? item?.answer : 'Select' }
                                                                    value={answers[index]}
                                                                    onChange={quest => handleChange(index, quest, item?.id)}
                                                                /> :
                                                                item?.id == 8 && item?.type == 4 ?
                                                                    <Dropdown
                                                                        style={styles.textIn1}
                                                                        placeholderStyle={styles.placeholderS}
                                                                        itemTextStyle={styles.textArea}
                                                                        selectedTextStyle={styles.textArea}
                                                                        containerStyle={styles.dropView}
                                                                        data={QuestionEight}
                                                                        search={false}
                                                                        labelField="label"
                                                                        valueField="value"
                                                                        placeholder={LangLabel ? LangLabel :item?.answer ? item?.answer : 'Select' }
                                                                        value={answers[index]}
                                                                        onChange={quest => handleChange(index, quest, item?.id)}
                                                                    />
                                                                    :

                                                                    item?.id == 9 && item?.type == 4 ?
                                                                        <Dropdown
                                                                            style={styles.textIn1}
                                                                            placeholderStyle={styles.placeholderS}
                                                                            itemTextStyle={styles.textArea}
                                                                            selectedTextStyle={styles.textArea}
                                                                            containerStyle={styles.dropView}
                                                                            data={QuestionNine}
                                                                            search={false}
                                                                            labelField="label"
                                                                            valueField="value"
                                                                            placeholder={EthnicLabel ? EthnicLabel : item?.answer ? item?.answer : 'Select' }
                                                                            value={answers[index]}
                                                                            onChange={quest => {
                                                                                handleChange(index, quest, item?.id)
                                                                            }}
                                                                        />
                                                                        :
                                                                        item?.id == 10 && item?.type == 4 ?
                                                                            <Dropdown
                                                                                style={styles.textIn1}
                                                                                placeholderStyle={styles.placeholderS}
                                                                                itemTextStyle={styles.textArea}
                                                                                selectedTextStyle={styles.textArea}
                                                                                containerStyle={styles.dropView}
                                                                                data={QuestionTen}
                                                                                search={false}
                                                                                labelField="label"
                                                                                valueField="value"
                                                                                placeholder={RaceLabel ? RaceLabel : item?.answer ? item?.answer : 'Select' }
                                                                                value={answers[index]}
                                                                                onChange={quest => handleChange(index, quest, item?.id)}
                                                                            />
                                                                            :
                                                                            item?.id == 13 && item?.type == 4 ?
                                                                                <Dropdown
                                                                                    style={styles.textIn1}
                                                                                    placeholderStyle={styles.placeholderS}
                                                                                    itemTextStyle={styles.textArea}
                                                                                    selectedTextStyle={styles.textArea}
                                                                                    containerStyle={styles.dropView}
                                                                                    data={QuestionEleven}
                                                                                    search={false}
                                                                                    labelField="label"
                                                                                    valueField="value"
                                                                                    placeholder={PrimaryLabel ? PrimaryLabel : item?.answer ? item?.answer : 'Select' }
                                                                                    value={answers[index]}
                                                                                    onChange={quest => handleChange(index, quest, item?.id)}
                                                                                />
                                                                                :
                                                                                item?.id == 14 && item?.type == 4 ?
                                                                                    <Dropdown
                                                                                        style={styles.textIn1}
                                                                                        placeholderStyle={styles.placeholderS}
                                                                                        itemTextStyle={styles.textArea}
                                                                                        selectedTextStyle={styles.textArea}
                                                                                        containerStyle={styles.dropView}
                                                                                        data={QuestionTwlve}
                                                                                        search={false}
                                                                                        labelField="label"
                                                                                        valueField="value"
                                                                                        placeholder={AttorneyLabel ? AttorneyLabel : item?.answer ? item?.answer : 'Select' }
                                                                                        value={answers[index]}
                                                                                        onChange={quest => handleChange(index, quest, item?.id)}
                                                                                    />
                                                                                    :
                                                                                    item?.type == 5 ?
                                                                                        <View style={DEFAULTSTYLES.alignView}>
                                                                                            <View style={[styles.dateView, { flexDirection: 'row' }]}>
                                                                                                <TextInput
                                                                                                       value={answers[item?.id] ? answers[item?.id] : DOB}
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
                                                                                            
                                                                                        </View> : null}
                          

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
                        style={[styles.buttonStyle, { borderColor: BORDERCOLOR4}]}>
                        <Text style={[styles.buttonText, { color: TEXTCOLOR7 }]}>Next</Text>
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
    textIn1: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.90,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        height: GlobalSize(45)
    },
    textIn: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.90,
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,

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
export default Demographics;



