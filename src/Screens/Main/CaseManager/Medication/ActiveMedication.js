import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { BACKGROUNDLIGHTBLUE1, BACKGROUNDWHITE, BORDERCOLORSC1, FOURTHCOLOR, PLACEHOLDERCOLOR1,PUREWHITE, PUREBLACK } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'
import { ArrowB } from '../../../../../assets'

const ActiveMedication = ({navigation}) => {

    const MedsData = [
        {
            id: 1,
            Time: '08:00 AM',
            medications: [
                {
                    id: 1,
                    Title: 'Omega 3',
                    Desc: '1 Pill once per day',
                    Image: require('../../../../../assets/Images/SocialWorker/tab.png')
                },
            ]
        },
        {
            id: 1,
            Time: '10:00 AM',
            medications: [
                {
                    id: 1,
                    Title: 'Vitamin C',
                    Desc: '1 Pill once per day',
                    Image: require('../../../../../assets/Images/SocialWorker/tab.png')
                },
            ]
        },
        {
            id: 3,
            Time: '08:00 PM',
            medications: [
                {
                    id: 1,
                    Title: 'Aspirin',
                    Desc: '1 Pill once per day',
                    Image: require('../../../../../assets/Images/SocialWorker/tab.png')
                },
            ]
        }
    ];

    const renderItem = ({ item }) => {
        return (
            <View>
                <View>
                    <Text style={styles.textTime}>{item.Time}</Text>
                </View>

                {item.medications.map((medication) => (
                    <TouchableOpacity style={styles.card} onPress={()=>navigation.navigate('MedicationDetails')}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.cardSub}>
                                <Image
                                    source={medication.Image}
                                    style={{ width: GlobalSize(40), height: GlobalSize(40) }}
                                    resizeMode='contain' />
                            </View>

                            <View style={{ marginLeft: GlobalSize(10) }}>
                                <Text style={styles.textNm}>{medication.Title}</Text>
                                <Text style={styles.textTitle}>{medication.Desc}</Text>

                            </View>
                        </View>
                        <View>
                            <ArrowB />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Medication'} />
            </View>

            <View style={{ padding: GlobalSize(20) }}>
                <View style={{marginBottom:GlobalSize(15)}}>
                    <Text style={styles.textMed}>Today's Plan</Text>
                </View>

                <View>
                    <FlatList
                        data={MedsData}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem} />
                </View>
            </View>

            <View style={styles.align}>
                <TouchableOpacity style={styles.touchBtn} onPress={()=>navigation.navigate('NewSCWMedication')}>
                    <Text style={styles.textPlus}>+</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default ActiveMedication

const styles = StyleSheet.create({
    textMed: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15),
        color: PUREBLACK
    },
    cardSub: {
        backgroundColor: BACKGROUNDLIGHTBLUE1,
        width: DEFAULTWIDTH * 0.25,
        height: GlobalSize(80),
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        borderWidth: 1,
        alignItems: 'center',
        borderColor: BORDERCOLORSC1,
        borderRadius: GlobalSize(8),
        justifyContent: 'space-between',
        // height: GlobalSize(100),
        width: DEFAULTWIDTH * 0.88,
        marginBottom: GlobalSize(15),
        flexDirection: 'row',
        paddingRight: GlobalSize(20)
    },
    textNm: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(15)
    },
    textTitle: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: fontSize(15)
    },
    textTime:{
        fontFamily:FONTS.FontSemiB,
        color:PUREBLACK,
        fontSize:fontSize(16),
        marginBottom:GlobalSize(5)
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
        right: GlobalSize(15),
        alignItems: 'flex-end',
        bottom: GlobalSize(20)
    }
})