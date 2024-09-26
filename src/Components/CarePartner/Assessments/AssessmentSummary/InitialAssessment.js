import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

//IMPORT CONSTANTS
import { FONTS } from '../../../../Constants/Fonts'
import { BORDERCOLOR1, BORDERCOLOR9, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR15 } from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles'

//IMPORT THIRD-PARTY PACKAGE
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment/moment'

const InitialAssessment = ({ navigation,data,edit }) => {

    const [UserData, setUserData] = useState()


    useEffect(() => {
        getData().then(data => setUserData(data));
    }, []);

    const getData = async () => {
        try {
            const patientData = await AsyncStorage.getItem('PatientData');

            return patientData != null ? JSON.parse(patientData) : null
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };

    function getInitials(fullName) {
        const namesArray = fullName?.split(" "); // Split the full name into an array of first and last names

        if (namesArray?.length === 1) {
            // If there's only one name, extract the first letter of that name
            const firstLetter = namesArray[0]?.charAt(0);
            if (firstLetter) {
                return firstLetter;
            } else {
                return "Invalid Name"; // Handle cases where the name is empty or not in the expected format
            }
        } else if (namesArray?.length >= 2) {
            // If there are multiple names, extract the first letter of the first and last names
            const firstLetterFirstName = namesArray[0]?.charAt(0);
            const firstLetterLastName = namesArray[1]?.charAt(0);

            if (firstLetterFirstName && firstLetterLastName) {
                const initials = firstLetterFirstName + firstLetterLastName; // Concatenate the first letters
                return initials;
            } else {
                return "Invalid Name"; // Handle cases where the first or last name is empty or not in the expected format
            }
        } else {
            return "Invalid Name"; // Handle other cases where the name is not in the expected format
        }
    }



    return (
        <View>

            <View style={styles.patientCard}>

                <View style={styles.rowView}>
                    <View style={styles.nameCard}>
                        <Text style={[styles.textInit, { textTransform: 'uppercase' }]}>{getInitials(UserData?.name ? UserData?.name : 'A')}</Text>
                    </View>

                    <View>
                        <Text style={styles.textNm}>{UserData?.name}</Text>
                        <Text style={styles.textEm}>{UserData?.email}</Text>
                        {/* 
                        <TouchableOpacity style={styles.borderView}>
                            <Text style={styles.textEm}>Save & Exit</Text>
                        </TouchableOpacity> */}
                    </View>

                    <View style={styles.shadowView}>
                        {/* <OrangePen left={-18}/> */}
                    </View>
                </View>
            </View>

            <View style={styles.rowAssess}>
                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={styles.textAssess}>Assessment Summary</Text>
                </View>

                <TouchableOpacity style={{ padding: GlobalSize(5) }}
                    onPress={() => navigation.navigate('EnrollmentStack', {
                        screen: 'EnrollmentProgress',
                        params: { edit: edit },
                     
                      },
                      AsyncStorage.setItem('EditValue','true'))}
                      >
                        <Text style={styles.edit}>Edit</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardView}>

                <View style={styles.rowSpace}>
                    <View style={{marginBottom:GlobalSize(10)}}>
                        <Text style={styles.textInit}>{data?.task_name}</Text>
                        {/* <Text style={[styles.textInit, { fontFamily: FONTS.FontRegular, top: GlobalSize(-8) }]}>Assessment</Text> */}
                    </View>

                </View>

                <View style={{marginBottom:GlobalSize(10)}}>
                        <Text style={styles.textType}>Type : <Text style={[styles.textInit, { fontSize: fontSize(15) }]}>All</Text> </Text>
                    </View>
                <View style={styles.lineBorder} />

                <View style={styles.viewRow}>
                    <View>
                        <Text style={styles.textStart}>Start Date: <Text style={[styles.textStart, { color: TEXTCOLOR10 }]}>{moment(data?.start_date).format('DD/MM/YYYY')}</Text></Text>
                    </View>

                    <View>
                        {data?.complete_date &&
                        <Text style={styles.textStart}>End Date: <Text style={[styles.textStart, { color: TEXTCOLOR10 }]}>{moment(data?.complete_date).format('DD/MM/YYYY')}</Text></Text>}
                    </View>
                </View>

                <View style={styles.rowSpace}>
                    <View>
                        <Text style={styles.textStart}>Completed By:</Text>
                        <Text style={[styles.textInit, { fontSize: fontSize(15) }]}>{data?.completed_by?.name}</Text>
                    </View>

                    <View>
                        <Text style={styles.textStart}>Role:</Text>
                        <Text style={[styles.textInit, { fontSize: fontSize(15) }]}>{data?.completed_by?.role_type}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default InitialAssessment

const styles = StyleSheet.create({
    textAssess: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(18)
    },
    cardView: {
        borderWidth: 1,
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR9,
        padding: GlobalSize(15),
        marginBottom: GlobalSize(10)
    },
    textInit: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: fontSize(18)
    },
    edit:{
        fontFamily:FONTS.FontSemiB,
        color:PRIMARYCOLOR,
        fontSize:fontSize(14),
        textDecorationLine:'underline'
    },
    textType: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(15),
        color: TEXTCOLOR15
    },
    lineBorder: {
        height: 1,
        width: DEFAULTWIDTH * 0.82,
        backgroundColor: BORDERCOLOR1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(10)
    },
    textStart: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR15,
        fontSize: fontSize(13)
    },
    viewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    rowSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    patientCard: {
        backgroundColor: PRIMARYCOLOR,
        // width:330,
        height: GlobalSize(130),
        borderRadius: GlobalSize(8),
        marginBottom: GlobalSize(10)
    },
    nameCard: {
        borderRadius: GlobalSize(25),
        width: GlobalSize(50),
        height: GlobalSize(50),
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: GlobalSize(10)
    },
    rowAssess: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textNm: {
        color: PUREWHITE,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(22)
    },
    textEm: {
        color: PUREWHITE,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(14)
    },
    borderView: {
        borderWidth: 1,
        borderColor: PUREWHITE,
        borderRadius: GlobalSize(5),
        padding: GlobalSize(5),
        width: DEFAULTWIDTH * 0.28,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(10)
    },
    shadowView: {
        backgroundColor: PUREWHITE,
        marginLeft: GlobalSize(0),
        alignItems: 'center',
        paddingTop: GlobalSize(20),
        opacity: 0.5,
        width: GlobalSize(190),
        height: GlobalSize(150),
        borderTopLeftRadius: GlobalSize(1000),
        marginTop: GlobalSize(0),
        // borderBottomLeftRadius: 1000,
        //transform:[{ scaleX: 1.2 }],

    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: GlobalSize(10),
        bottom: 5
    }
})