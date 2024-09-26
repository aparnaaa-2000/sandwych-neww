import { StyleSheet, Text, StatusBar, SafeAreaView, View, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLORLINE, FOURTHCOLOR, PUREWHITE, TEXTCOLOR7, TEXTCOLORORANGE, TEXTCOLORSCGREY1 } from '../../../../Constants/Colors/Colors'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { FONTS } from '../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

const MedAllergy = ({navigation}) => {

    const allergyData = [
        {
            id: 1,
            name: 'Penicilllin',
            Dosage: '125 mg to 500 mg',
            Allergies: [
                {
                    id: 1,
                    title: 'Skin rash or hives.'
                },
                {
                    id: 2,
                    title: 'Itchy skin.'
                },
                {
                    id: 3,
                    title: 'Coughing.'
                },
                {
                    id: 4,
                    title: ' Nasal congestion.'
                }
            ]
        },
        {
            id: 2,
            name: 'Cetirizine',
            Dosage: '125 mg to 500 mg',
            Allergies: [
                {
                    id: 1,
                    title: 'Skin rash or hives.'
                },
                {
                    id: 2,
                    title: 'Itchy skin.'
                },
                {
                    id: 3,
                    title: 'Coughing.'
                },
                {
                    id: 4,
                    title: ' Nasal congestion.'
                }
            ]
        },
        {
            id: 2,
            name: 'Cetirizine',
            Dosage: '125 mg to 500 mg',
            Allergies: [
                {
                    id: 1,
                    title: 'Skin rash or hives.'
                },
                {
                    id: 2,
                    title: 'Itchy skin.'
                },
                {
                    id: 3,
                    title: 'Coughing.'
                },
                {
                    id: 4,
                    title: ' Nasal congestion.'
                }
            ]
        },

    ]

    const renderItem = ({ item }) => {
        return (
            
                <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('DrugDetails')}>
                <View style={styles.row}>
                    <Text style={styles.textNm}>{item.name}</Text>
                    <Text style={styles.textDos}>{item.Dosage}</Text>
                </View>

                <View>
                    {item.Allergies.map((item) => {
                        return (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.dot} />
                                <Text style={styles.textTitle}>{item.title}</Text>
                            </View>
                        )
                    })}
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Medication Allergies'} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ margin: GlobalSize(20), marginBottom: GlobalSize(8) }}>
                        <Text style={styles.textMain}>Your Drug Allergies</Text>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <FlatList
                            data={allergyData}
                            scrollEnabled={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem} />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.align}>
                <TouchableOpacity style={styles.touchBtn} onPress={()=>navigation.navigate('AddDrugAllergy')}>
                    <Text style={styles.textPlus}>+</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default MedAllergy

const styles = StyleSheet.create({
    textNm: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(16),
        color: TEXTCOLOR7
    },
    textDos: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR7,
        fontSize: fontSize(12)
    },
    textTitle: {
        color: TEXTCOLORORANGE,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12)
    },
    card: {
        borderColor: BORDERCOLORLINE,
        borderWidth: 1,
        borderRadius: GlobalSize(10),
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(15),
        marginBottom: GlobalSize(10)
    },
    dot: {
        width: GlobalSize(6),
        height: GlobalSize(6),
        borderRadius: GlobalSize(3),
        backgroundColor: TEXTCOLORORANGE,
        marginTop: GlobalSize(6),
        marginRight: GlobalSize(10),
        marginLeft: GlobalSize(10)
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10),
    },
    textMain: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: TEXTCOLORSCGREY1
    },
    textPlus: {
        color: PUREWHITE,
        fontFamily: FONTS.FontBold,
        fontSize: fontSize(26)
    },
    touchBtn: {
        backgroundColor: FOURTHCOLOR,
        width: GlobalSize(46),
        height: GlobalSize(46),
        borderRadius: GlobalSize(23),
        alignItems: 'center',
        justifyContent: 'center'
    },
    align: {
        position: 'absolute',
        left: 0,
        right: GlobalSize(20),
        alignItems: 'flex-end',
        bottom: GlobalSize(20)
    }
})