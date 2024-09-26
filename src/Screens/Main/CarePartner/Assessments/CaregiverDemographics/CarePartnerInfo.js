import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    TextInput,
    ScrollView,
    TouchableOpacity,
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
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { CalenderLine } from '../../../../../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { GlobalSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';

const CarePartnerInfo = ({ navigation, route }) => {

    const value = useSelector((state) => state?.getQuestions?.value);
    const TitleGroup = useSelector((state) => state?.getPageNameValue?.titleGroup);
    const TitleID = useSelector((state) => state?.getPageNameValue?.TitleID)

    const [Name, setName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Phone, setPhone] = useState(null)
    const [Address, setAddress] = useState(null)
    const [Zipcode, setZipcode] = useState(null)
    const [GenderValue, setGendrValue] = useState(null)
    const [GenderLabel, setGenderlabel] = useState(null)
    const [DOB, setDOB] = useState(null)
    const [mappedData, setMappedData] = useState([])

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const isFocused = useIsFocused();  // To detect if the screen is focused

    useEffect(() => {
        if (isFocused) {
            getBasicInfo();
        }
    }, [isFocused]);  // Re-run when the screen is focused

    const getBasicInfo = async () => {

        try {
            const jsonValue = await AsyncStorage.getItem('ABOUT_CAREGIVER');

            if (jsonValue != null) {

                const basicInfo = JSON.parse(jsonValue);
                setName(basicInfo.Name)
                setEmail(basicInfo.Email)
                setPhone(basicInfo.Phone)
                setAddress(basicInfo.Address)
                setZipcode(basicInfo.Zipcode)
                setGenderlabel(basicInfo.GenderLabel)
                setDOB(basicInfo.DOB)
            }
        } catch (error) {
            console.error('Error retrieving data', error);
        }
    };


    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const ConvertDate = moment(date).format('DD MMMM YYYY')
        console.warn("A date has been picked: ", ConvertDate);
        setDOB(ConvertDate)
        hideDatePicker();
    };


    const NextNavigation = () => {
        saveBasicInfo()
        console.log("current title.................", route?.params?.titleGroup)
        // Find the index of the current title in the array
        let currentIndex = TitleID?.indexOf(6);

        while (currentIndex !== -1) {
            // Increment the index by 1 to get the index of the next title
            const nextIndex = currentIndex + 1;

            if (nextIndex < TitleGroup?.length) {
                // Retrieve the next title from the array using the incremented index
                const nextTitle = TitleID[nextIndex];
                const caregivingStyleTitle = value?.find(title => title?.title_id === nextTitle);
                console.log("data printed...............", caregivingStyleTitle)

                if (caregivingStyleTitle?.page_names?.length === 0) {
                    // If caregivingStyleTitle length is 0, continue to the next iteration of the loop
                    currentIndex = nextIndex;
                    console.log("CONTINUE.................",)
                    continue;
                }

                if (nextTitle == 2) {
                    navigation.navigate('HealthChallengesMainScreen', { item: caregivingStyleTitle });
                }
                else if (nextTitle == 4) {
                    navigation.navigate('SDOHList', { mainText: 'SDOH Assessment', pages: item?.page_names, item: caregivingStyleTitle });
                }
                else if (nextTitle == 3) {
                    navigation.navigate('FunctionalMain', { mainText: 'Ability to Help 1', pages: item?.page_names, item: caregivingStyleTitle });
                }
                else if (nextTitle == 7) {
                    console.log("next item.................", value)
                    navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: route?.params?.titleGroup, titleName: nextTitle })
                }
                else if (nextTitle == 6) {
                    navigation.navigate('CaregiverDemographics', { item: caregivingStyleTitle })
                }
                else if (nextTitle == 1) {
                    navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: title?.flat(), titleName: nextTitle })
                }
                else if (nextTitle == 9) {
                    navigation.navigate('PersonalInfo', { item: caregivingStyleTitle })
                }
                else if (nextTitle == 8) {
                    navigation.navigate('BasicInfo2', { item: caregivingStyleTitle })
                }
                // Add other navigation conditions for different titles here...

                console.log("Next title:", nextTitle);

                // Exit the loop once navigation is done
                break;
            } else {
                navigation.navigate('EnrollmentProgress')
                console.log("No more titles available after the current title.");
                break;
            }
        }

        if (currentIndex === -1) {
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
                Email: Email,
                Phone: Phone,
                Address: Address,
                Zipcode: Zipcode,
                GenderLabel: GenderLabel,
                DOB: DOB
            };

            const jsonValue = JSON.stringify(basicInfo);
            await AsyncStorage.setItem('ABOUT_CAREGIVER', jsonValue);

            const answersArray = createAnswersArray();
            await AsyncStorage.setItem('ABOUT_CAREGIVER_ANSWERS', JSON.stringify(answersArray))
            // const caregivingStyleTitle = value?.find(title => title?.title_name === 'Basic Information');
            //navigation.navigate('CareRecipientDemographics', { item: caregivingStyleTitle, titleGroup: route?.params?.titleGroup, titleName: 'Basic Information' })
            console.log('Data successfully saved');

        } catch (error) {
            console.error('Error saving data', error);
        }
    };

    const backToEnrollment = () => {
        saveBasicInfo()
        const answersArray = createAnswersArray();
        AsyncStorage.setItem('ABOUT_CAREGIVER_ANSWERS', JSON.stringify(answersArray))
        navigation.navigate('EnrollmentProgress');
    };




    const Option = route?.params?.item?.options?.filter(option => option.question_id === 79).map((item) => ({
        label: item.option,
        value: item.id

    }))
    console.log(Option);

    const handleChange = (text, id) => {
        if (id == 73) {
            setName(text)
        }
        else if (id == 75) {
            setEmail(text)
        }
        else if (id == 76) {
            setPhone(text)
        }
        else if (id == 77) {
            setAddress(text)
        }
        else if (id == 78) {
            setZipcode(text)
        }
    }

    const OnValidation = () => {
        const answersArray = createAnswersArray();
        //  AsyncStorage.setItem('ABOUT_CAREGIVER_ANSWERS',JSON.stringify(answersArray))
        console.log("answers......................", answersArray);
        if (Name && Email && Phone && Address && Zipcode && GenderLabel && DOB) {
            const answersArray = createAnswersArray();
            AsyncStorage.setItem('ABOUT_CAREGIVER_ANSWERS', JSON.stringify(answersArray))
            console.log("answers......................", answersArray);
            NextNavigation()
        } else {

        }
    }

    const createAnswersArray = () => {
        return route?.params?.item?.questions?.map((question) => {
            { console.log("type....................", question.type, question.id) }

            if (question.id == 73 && Name) {
                return {
                    question_id: question.id,
                    text_input: Name
                };
            }
            else if (question.id == 75 && Email) {
                return {
                    question_id: question.id,
                    text_input: Email
                };
            }

            else if (question.id == 76 && Phone) {
                return {
                    question_id: question.id,
                    text_input: Phone
                };
            }

            else if (question.id == 77 && Address) {
                return {
                    question_id: question.id,
                    text_input: Address
                };
            }

            else if (question.id == 78 && Zipcode) {
                return {
                    question_id: question.id,
                    text_input: Zipcode
                };
            }

            else if (question.id == 79 && GenderValue) {
                const GenderArray = Array.isArray(GenderValue) ? GenderValue : [GenderValue];
                return {
                    question_id: question.id,
                    option_ids: GenderArray
                };
            }

            else if (question.id == 80 && DOB) {
                return {
                    question_id: question.id,
                    text_input: DOB
                };
            }

            return null;
        }).filter(item => item !== null);
    };


    console.log("QUESTIONS........................", route?.params?.item?.options)

    const filteredOptions = route?.params?.item?.options?.filter(option => option.question_id === 79);



    // const filteredQuestions = value?.filter(question => question?.title_name  === 'About Caregiver'.filter(item)=>item.question);
    // console.log("FILTER QUESTIONS........................",filteredQuestions)

    useEffect(() => {
        // Map questions with corresponding answers
        const mappedData = route?.params?.item?.questions?.map(question => {
            const answer = route?.params?.item?.patient_answers?.find(pa => pa.question_id === question.id);
            return {
                ...question,
                answer: answer?.answer ? answer?.answer : answer?.option_value,
                option_id: answer?.option_value ? answer?.option_id : null
            };
        });
        setMappedData(mappedData);
    }, []);

    return (

        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.mainHeader}>{route?.params?.item?.title_name}</Text>
                        <View>
                            <Text style={styles.subHeader1}>Basic demographic information allows us to personalize the app to your preferences.</Text>
                        </View>
                    </View>


                    <View>
                        {mappedData?.map((item) => {
                            return (
                                <View>
                                    <Text style={styles.subHeader}>{item?.question}</Text>

                                    <View>
                                        {/* {item?.type == 0 ?
                                            <View style={DEFAULTSTYLES.alignView}>
                                                <TextInput
                                                    maxLength={40}
                                                    keyboardType={item?.id ==76  ? 'number-pad' : item?.id == 78 ? 'number-pad' :'default'}
                                                    value={item?.id == 73 ? Name : item?.id == 75 ? Email : item?.id == 76 ? Phone : item?.id == 77 ? Address : Zipcode}
                                                    style={[styles.textIn, { height: DEFAULTWIDTH * 0.132 }]}
                                                    onChangeText={(text) => handleChange(text, item?.id)} />
                                            </View> : */}
                                        {
                                            item?.type == 0 && item?.id == 73 ?
                                                <View style={DEFAULTSTYLES.alignView}>
                                                    <TextInput
                                                        maxLength={40}
                                                        value={Name ? Name : item.answer}
                                                        style={[styles.textIn, { height: DEFAULTWIDTH * 0.132 }]}
                                                        onChangeText={(text) => handleChange(text, item?.id)} />
                                                </View> :

                                                item?.type == 0 && item?.id == 75 ?
                                                    <View style={DEFAULTSTYLES.alignView}>
                                                        <TextInput
                                                            maxLength={40}
                                                            value={Email ? Email : item.answer}
                                                            style={[styles.textIn, { height: DEFAULTWIDTH * 0.132 }]}
                                                            onChangeText={(text) => handleChange(text, item?.id)} />
                                                    </View> :

                                                    item?.type == 0 && item?.id == 76 ?
                                                        <View style={DEFAULTSTYLES.alignView}>
                                                            <TextInput
                                                                maxLength={40}
                                                                keyboardType='number-pad'
                                                                value={Phone ? Phone : item.answer}
                                                                style={[styles.textIn, { height: DEFAULTWIDTH * 0.132 }]}
                                                                onChangeText={(text) => handleChange(text, item?.id)} />
                                                        </View> :
                                                        item?.id == 77 ?
                                                            <View style={DEFAULTSTYLES.alignView}>
                                                                <TextInput
                                                                    maxLength={40}
                                                                    multiline
                                                                    value={Address ? Address : item.answer}
                                                                    style={[styles.textIn, {
                                                                        paddingTop: GlobalSize(12),
                                                                        height: DEFAULTWIDTH * 0.3,
                                                                        textAlignVertical: 'top'
                                                                    }]}
                                                                    onChangeText={(text) => handleChange(text, item?.id)} />
                                                            </View> :
                                                            item?.type == 0 && item?.id == 78 ?
                                                                <View style={DEFAULTSTYLES.alignView}>
                                                                    <TextInput
                                                                        maxLength={5}
                                                                        value={Zipcode ? Zipcode : item.answer}
                                                                        style={[styles.textIn, { height: DEFAULTWIDTH * 0.132 }]}
                                                                        onChangeText={(text) => handleChange(text, item?.id)} />
                                                                </View> :
                                                                item?.type == 4 ?
                                                                    <View style={{ marginTop: 5 }}>
                                                                        <Dropdown
                                                                            style={styles.textIn}
                                                                            dropdownPosition='TOP'
                                                                            placeholderStyle={styles.placeholderS}
                                                                            itemTextStyle={styles.textArea}
                                                                            selectedTextStyle={styles.textArea}
                                                                            containerStyle={styles.dropView}
                                                                            data={Option}
                                                                            showsVerticalScrollIndicator={false}
                                                                            search={false}
                                                                            labelField="label"
                                                                            valueField="value"
                                                                            placeholder={GenderLabel ? GenderLabel : item?.answer ? item.answer :'Select Gender'}
                                                                            value={GenderValue}
                                                                            onChange={item => {
                                                                                setGenderlabel(item?.label)
                                                                                setGendrValue(item?.value)
                                                                            }}

                                                                        />
                                                                    </View> :
                                                                    item?.type == 5 ?
                                                                        <View style={[styles.textIn, {
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'space-between',
                                                                            alignItems: 'center'
                                                                        }]}>
                                                                            <Text style={styles.DateText}>{DOB ? DOB : item.answer}</Text>

                                                                            <View style={styles.calenderView}>
                                                                                <TouchableOpacity 
                                                                                onPress={() => { setDatePickerVisibility(true) }} 
                                                                                style={{ padding: 5 }}>
                                                                                    <CalenderLine />
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View> : null
                                        }
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
                        style={[styles.buttonStyle, { marginRight: 0 }]}>
                        <Text style={styles.buttonText}>Back</Text>
                    </Button>

                    <Button
                        onPress={() => backToEnrollment()}
                        style={[styles.buttonStyle, { marginRight: 0 }]}>
                        <Text style={styles.buttonText}>Save & Exit</Text>
                    </Button>

                    <Button
                        onPress={() => OnValidation()}
                        style={[styles.buttonStyle, { borderColor: Name && Email && Phone && Address && Zipcode && GenderLabel && DOB ? BORDERCOLOR4 : LINECOLOR1 }]}>
                        <Text style={[styles.buttonText, { color: Name && Email && Phone && Address && Zipcode && GenderLabel && DOB ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
                    </Button>

                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
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
        padding: DEFAULTWIDTH * 0.05
    },
    mainHeader: {
        fontFamily: 'Inter-Bold',
        fontSize: 23,
        color: TEXTCOLOR8,
    },
    dropView: {
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.90,
        padding: 5,
        marginBottom: 10
    },
    subHeader1: {
        marginTop: 8,
        marginBottom: 8,
        color: TEXTCOLOR5,
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    DateView: {
        width: DEFAULTWIDTH * 0.43,
        height: DEFAULTWIDTH * 0.12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: BORDERCOLOR1,
        paddingLeft: 15,
        backgroundColor: BACKGROUNDWHITE,
        paddingRight: 10,
        justifyContent: 'space-between',
    },
    DateText: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR7,
        left: -5
    },
    subHeader: {
        marginTop: 8,
        marginBottom: 8,
        color: TEXTCOLOR7,
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    placeholderS: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1
    },
    textIn: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.90,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: BORDERCOLOR1,
        paddingLeft: 15,
        padding: 5,
        color: TEXTCOLOR7,
        height: DEFAULTWIDTH * 0.132
    },
    textArea: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    buttonText: {
        color: TEXTCOLOR7,
        fontFamily: 'Inter-Medium',
        fontSize: 14,
    },
    buttonStyle: {
        borderRadius: 8,
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.29,
    },
    buttonPos: {
        position: 'relative',
        bottom: 20,
        justifyContent: 'space-around',
        marginTop: DEFAULTWIDTH * 0.15
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

})
export default CarePartnerInfo;



