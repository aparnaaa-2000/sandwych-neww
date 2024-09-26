import { StyleSheet, Text, View, StatusBar, SafeAreaView, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BOTTOMTABTEXT1, GREYBACKGROUND1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR13, TEXTCOLOR5, TEXTCOLORSCW } from '../../../../Constants/Colors/Colors'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { Dropdown } from 'react-native-element-dropdown';
import { Search } from '../../../../../assets'

const AddCareTeam = () => {

    const [searchValue, setSearchValue] = useState('')

    const [valueTeam, setValueTeam] = useState('');
    const [valueDepart, setValueDepart] = useState('')
    const [valueMedTeam, setValueMedTeam] = useState('')
    const [Careteam, setCareteam] = useState([
        { label: 'Primary caregiver', value: 'Primary caregiver' },
        { label: 'Support Member', value: 'Support Member' },
        { label: 'Social worker', value: 'Social worker' }
    ]);

    const [MedicalTeam, setMedicalTeam] = useState([
        { label: 'Doctors', value: 'Doctors' },
        { label: 'Nurses', value: 'Nurses' }
    ]);

    const [Departments, setDepartments] = useState([
        { label: 'General Medicine', value: 'General Medicine' },
        { label: 'Neurologist', value: 'Neurologist' }
    ]);

    const Team = [
        {
            id: 1,
            Name: 'Amanda Alias',
            Email: 'amandaali@gmail.com'
        },
        {
            id: 2,
            Name: 'Aleena Gift',
            Email: 'aleena123@gmail.com'
        },
        {
            id: 3,
            Name: 'Anita Rose',
            Email: 'anitarose@gmail.com'
        }
    ]

    const filteredData = Team.filter(item => {
        // Filter items based on search query
        return item?.Name.includes(searchValue)
    });

    const generateInitials = (name) => {
        // Split the name into an array of words
        const words = name?.split(' ');

        // Take the first letter of each word and concatenate them
        const initials = words?.map(word => word.charAt(0)).join('');

        return initials;
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', marginBottom: GlobalSize(10), alignItems: 'center' }}>
                <View style={styles.cardRound}>
                    <Text style={styles.textInit}>{generateInitials(item.Name)}</Text>
                </View>

                <View>
                    <Text style={styles.textNm}>{item.Name}</Text>
                    <Text style={styles.textEm}>{item.Email}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />


            <SubHeader title={'Add Careteam'} />
             {/* <SubHeader title={'Add Medical Professional'} /> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: GlobalSize(20) }}>

                    <View style={{ marginTop: GlobalSize(20), marginBottom: GlobalSize(20) }}>
                        <Text style={styles.textAssign}>Assign careteam to the patient</Text>
                        {/* <Text style={styles.textAssign}>Assign medical professional to the patient </Text> */}
                    </View>

                    <View style={{ marginBottom: GlobalSize(10) }}>
                    
                        <Text style={styles.textCare}>Careteam</Text>
                        {/* <Text style={styles.textCare}>Medical Professional</Text> */}
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <Dropdown
                            style={[styles.textIn, { marginBottom: GlobalSize(10) }]}
                            placeholderStyle={styles.placeholderS}
                            itemTextStyle={styles.textArea}
                            selectedTextStyle={styles.textArea}
                            containerStyle={styles.dropView}
                            data={Careteam}
                            search={false}
                            showsVerticalScrollIndicator={false}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select careteam'}
                            value={valueTeam}
                            onChange={item => {
                                setValueTeam(item.value);
                            }}
                        />

                        {valueMedTeam == 'Doctor' &&
                            <Dropdown
                                style={[styles.textIn, { marginBottom: GlobalSize(10) }]}
                                placeholderStyle={styles.placeholderS}
                                itemTextStyle={styles.textArea}
                                selectedTextStyle={styles.textArea}
                                containerStyle={styles.dropView}
                                data={Departments}
                                search={false}
                                showsVerticalScrollIndicator={false}
                                labelField="label"
                                valueField="value"
                                placeholder={'Select departments'}
                                value={valueDepart}
                                onChange={item => {
                                    setValueDepart(item.value);
                                }}
                            />}

                        <View style={styles.searchView}>

                            <Search />
                            <TextInput
                                placeholderTextColor={TEXTCOLOR13}
                                style={styles.fontSearch}
                                placeholder=''
                                value={searchValue}
                                onChangeText={setSearchValue}
                            />

                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={searchValue?.trim() !== '' ? filteredData : Team}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.viewRelative}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Assign</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AddCareTeam

const styles = StyleSheet.create({
    textAssign: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: fontSize(16)
    },
    textCare: {
        fontSize: fontSize(14),
        color: TEXTCOLORSCW,
        fontFamily: FONTS.FontSemiB
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
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    fontSearch: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        paddingLeft: GlobalSize(10),
        width: DEFAULTWIDTH * 0.7
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: GlobalSize(15),
        borderWidth: 1,
        borderColor: BORDERCOLOR1,
        margin: GlobalSize(10),
        borderRadius: GlobalSize(10),
        width: DEFAULTWIDTH * 0.90,
        marginTop: 0
        //height: GlobalSize(50)
    },
    textNm: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: TEXTCOLOR10
    },
    textEm: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5,
        fontSize: fontSize(14)
    },
    textInit: {
        fontFamily: FONTS.FontSemiB,
        color: TEXTCOLOR5,
        fontSize: fontSize(18)
    },
    cardRound: {
        backgroundColor: BORDERCOLOR1,
        width: GlobalSize(50),
        height: GlobalSize(50),
        borderRadius: GlobalSize(25),
        marginRight: GlobalSize(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    viewRelative: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        alignItems: 'center'
    }
})