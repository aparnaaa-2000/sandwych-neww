import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity,ScrollView } from 'react-native';
import { BACKGROUNDWHITE, BORDERCOLOR1, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5,TEXTCOLOR7 } from '../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../Constants/Fonts';
import { Meds1, Meds2, Meds3, Meds4 } from '../../../../../assets';
import MedModal from './MedModal';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';

const AddMeds = ({ navigation }) => {

    const [ModalOpen, setModalOpen] = useState(false)

    const MedInstructions = [
        {
            id: 1,
            ImageUri: Meds1,
            title: 'Add Medication',
            desc: 'Use your bottle label to scan or manually enter medication details '
        },
        {
            id: 2,
            ImageUri: Meds2,
            title: 'Confirm Interaction',
            desc: 'Check if there are any possible Drug to Drug Interaction '
        },
        {
            id: 3,
            ImageUri: Meds3,
            title: 'Set Reminders',
            desc: 'Set reminders to stay on top of taking your medication '
        },
        {
            id: 4,
            ImageUri: Meds4,
            title: 'Get in Touch',
            desc: 'Talk to Pharmacist if you have any questions'
        },
    ]


    const renderItem = (({ item }) => {
        return (
            <View style={styles.viewCard}>
                <item.ImageUri />
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.textDesc}>{item.desc}</Text>
            </View>
        )
    })
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: BACKGROUNDWHITE }}>
            <View style={styles.mainContainer}>
                <View style={styles.mainView}>
                    <Text style={styles.textAddMed}>Add Medication</Text>
                </View>

                <View style={styles.border} />
                <View style={styles.viewFlatList}>
                    <FlatList
                        data={MedInstructions}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem} />
                </View>


                <View style={[styles.alignView, { marginTop: DEFAULTHEIGHT * 0.01 }]}>
                    <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('TransferMeds')}>
                        <Text style={styles.textBtn}>Transfer Medication</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ margin:DEFAULTWIDTH * 0.05 }} onPress={() => setModalOpen(true)}>
                        <Text style={styles.textScan}>Scan or Manually Enter Medication</Text>
                    </TouchableOpacity>
                </View>

                <MedModal
                    navigation={navigation}
                    ModalOpen={ModalOpen}
                    setModalOpen={setModalOpen} />
            </View>
        </ScrollView>
    )
};


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
    },
    mainView: {
        margin: DEFAULTWIDTH * 0.04,
        top: 10
    },
    textAddMed: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        fontSize: 18
    },
    titleText: {
        fontFamily: FONTS.FontMedium,
        fontSize: 16,
        fontWeight: '500',
        color: TEXTCOLOR7
    },
    btnView: {
        width: DEFAULTWIDTH * 0.90,
        height:DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    textBtn: {
        fontSize: 16,
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textScan: {
        fontFamily: FONTS.FontMedium,
        fontSize: 16,
        fontWeight: '500',
        color: TEXTCOLOR5
    },
    border: {
        borderWidth: 0.5,
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        margin: DEFAULTWIDTH * 0.05,
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH * 0.05,
    },
    textDesc: {
        color: TEXTCOLOR7,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        marginHorizontal: 5,
        lineHeight: 18,
        fontFamily: FONTS.FontRegular,
    },
    viewCard: {
        width: DEFAULTWIDTH * 0.44,
        height: DEFAULTWIDTH * 0.55,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    viewFlatList: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})
export default AddMeds;