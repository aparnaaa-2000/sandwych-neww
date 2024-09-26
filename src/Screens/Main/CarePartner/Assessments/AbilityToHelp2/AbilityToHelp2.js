import React, { useState } from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView, Dimensions } from 'react-native';
import {
    BACKGROUNDWHITE,
    BORDERCOLOR1,
    BORDERCOLOR4,
    BOTTOMTABTEXT1,
    LINECOLOR1,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLOR5,
    TEXTCOLOR7,
    TEXTCOLOR8
} from '../../../../../Constants/Colors/Colors';
import { Dropdown } from 'react-native-element-dropdown';
import { FONTS } from '../../../../../Constants/Fonts';
import { Button } from 'react-native-paper';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';


const AbilityToHelp2 = ({ navigation }) => {

    //To open Help1
    const [valueHelp1, setValueHelp1] = useState('');
    const [Help1, setHelp1] = useState([
        { label: 'I help my Care recipient', value: 'I help my Care recipient' },
        { label: 'Assistance needed', value: 'Assistance needed' },
    ]);


    //To open Help2
    const [valueHelp2, setValueHelp2] = useState('');
    const [Help2, setHelp2] = useState([
        { label: 'I need training/support to help', value: 'I need training/support to help' },
        { label: "I don't need training/support to help", value: "I don't need training/support to help" },
    ]);

    //To open Help 3
    const [valueHelp3, setValueHelp3] = useState('');
    const [Help3, setHelp3] = useState([
        { label: 'I am unable or cannot help', value: 'I am unable or cannot help' },
        { label: 'I will be available to help', value: 'I will be available to help' },
    ]);

    //To open Help 4
    const [valueHelp4, setValueHelp4] = useState('');
    const [Help4, setHelp4] = useState([
        { label: 'I need home health to help', value: 'I need home health to help' },
        { label: 'Does not need any assistance', value: 'Does not need any assistance' },
    ]);

    const NextNavigation = () => { // Navigation to next page
        if (valueHelp1 && valueHelp2 && valueHelp3 && valueHelp4) {
            navigation.navigate('ResearchPrompt')
        } else {
            console.log("hey")
        }
    }

    const backToHC = () => {
        navigation.goBack();
    };

    const backToEnrollment = () => {
        navigation.navigate('EnrollmentProgress');
    };


    return (
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
            <View style={DEFAULTSTYLES.margin}>
                <Text style={styles.mainHeader}>Ability to Help</Text>
                <Text style={styles.subHeader}>You indicated you needed support for the following, who helps you currently?</Text>
            </View>
            <View style={styles.container}>

                <View>
                    <Text style={styles.subHeader}>Transportation</Text>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={Help1}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueHelp1}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueHelp1(item.value);
                        }}
                    />

                </View>

                <View style={{ marginTop: 5 }} >
                    <Text style={styles.subHeader}>Grocery Shopping</Text>

                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={Help2}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueHelp2}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueHelp2(item.value);
                        }}
                    />
                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={styles.subHeader}>Other Shopping</Text>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={Help3}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueHelp3}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueHelp3(item.value);
                        }}

                    />
                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={styles.subHeader}>Housework</Text>
                    <Dropdown
                        style={styles.textIn}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        iconStyle={styles.iconStyle}
                        data={Help4}
                        containerStyle={styles.dropView}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={valueHelp4}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setValueHelp4(item.value);
                        }}

                    />
                </View>

                <View style={styles.buttonPosition}>
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
                            onPress={() => NextNavigation()}
                            style={[styles.buttonStyle, { borderColor: valueHelp1 && valueHelp2 && valueHelp3 && valueHelp4 ? BORDERCOLOR4 : LINECOLOR1 }]}>
                            <Text style={[styles.buttonText, { color: valueHelp1 && valueHelp2 && valueHelp3 && valueHelp4 ? TEXTCOLOR7 : LINECOLOR1 }]}>Next</Text>
                        </Button>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center'
    },
    mainHeader: {
        fontFamily: 'Inter-Bold',
        fontSize: 26,
        color: TEXTCOLOR8,
    },
    subHeader: {
        marginTop: 8,
        marginBottom: 8,
        color: TEXTCOLOR5,
        fontSize: 14,
        fontFamily: 'Inter-Medium',
    },
    dropView: {
        borderRadius: 8,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.90,
        padding: 5
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
        margin: 5,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.29,
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonPosition: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center'
    }
})
export default AbilityToHelp2;



