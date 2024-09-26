import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, BORDERCOLOR5, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR2, TEXTCOLOR8 } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'

//IMPORT COMPONENTS
import ChooseSupportModal from './ChooseSupportModal'


const ChooseSupport = ({ navigation }) => {

    const [ModalOpen, setModalOpen] = useState(false)
    const [ADL, setADL] = useState([
        {
            id: 1,
            Name: 'Eating',
            Image: require('../../../../assets/Images/AbilityToHelp1/Eating.png'),
            selected: false
        },
        {
            id: 2,
            Name: 'Dressing',
            Image: require('../../../../assets/Images/AbilityToHelp1/Dressing.png'),
            selected: false
        },
        {
            id: 3,
            Name: 'Dressing',
            Image: require('../../../../assets/Images/AbilityToHelp1/Dressing.png'),
            selected: false
        }
    ])


    const [IADL, setIADL] = useState([
        {
            id: 1,
            Name: 'Eating',
            Image: require('../../../../assets/Images/AbilityToHelp1/Eating.png'),
            selected: false
        },
        {
            id: 2,
            Name: 'Dressing',
            Image: require('../../../../assets/Images/AbilityToHelp1/Dressing.png'),
            selected: false
        },
        {
            id: 3,
            Name: 'Dressing',
            Image: require('../../../../assets/Images/AbilityToHelp1/Dressing.png'),
            selected: false
        }
    ])

    const renderItemADL = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelect(item.id, 'ADL')}>
                <View style={[styles.cardSupport, { borderColor: item.selected ? PRIMARYCOLOR : BORDERCOLOR5 }]}>
                    <Image source={item.Image} style={{ width: 50, height: 50 }} />
                    <Text style={styles.textTitle}>{item.Name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderItemIADL = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSelect(item.id, 'IADL')}>
                <View style={[styles.cardSupport, { borderColor: item.selected ? PRIMARYCOLOR : BORDERCOLOR5 }]}>
                    <Image source={item.Image} style={{ width: 50, height: 50 }} />
                    <Text style={styles.textTitle}>{item.Name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const handleSelect = (id, type) => { //FUNCTION FOR CHOOSE SUPPORT
        const newData = type === 'ADL' ? [...ADL] : [...IADL];
        const index = newData.findIndex(item => item.id === id);
        newData[index].selected = !newData[index].selected;
        type === 'ADL' ? setADL(newData) : setIADL(newData);
    };

    return (

        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginLeft: DEFAULTWIDTH * 0.06 }}>
                        <Text style={styles.textSupport}>Support</Text>
                        <Text style={styles.textAssist}>Choose your assistance</Text>
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.06 }}>
                        <Text style={styles.textSupport}>ADL</Text>
                    </View>
                    <View style={styles.alignFlat}>
                        <FlatList
                            numColumns={3}
                            data={ADL}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItemADL} />
                    </View>

                    <View style={{ marginLeft: DEFAULTWIDTH * 0.06 }}>
                        <Text style={styles.textSupport}>IADL</Text>
                    </View>
                    <View style={styles.alignFlat}>
                        <FlatList
                            numColumns={3}
                            data={IADL}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItemIADL} />
                    </View>
                </ScrollView>
                <View style={styles.postView}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity style={styles.btnView} onPress={() => navigation.goBack()}>
                            <Text style={styles.textBtn}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <ChooseSupportModal
                ModalOpen={ModalOpen}
                setModalOpen={setModalOpen} />

        </SafeAreaView>

    )
}

export default ChooseSupport;

const styles = StyleSheet.create({
    btnView: {
        width: DEFAULTWIDTH * 0.86,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 10
    },
    textBtn: {
        fontSize: 12,
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    textSupport: {
        fontFamily: FONTS.FontSemiB,
        color: TEXTCOLOR8,
        fontSize: 20,
        marginBottom: 10
    },
    textAssist: {
        fontSize: 16,
        fontFamily: FONTS.FontMedium,
        color: PRIMARYCOLOR,
        marginBottom: 10
    },
    cardSupport: {
        margin: DEFAULTWIDTH * 0.03,
        borderWidth: 1,
        width: DEFAULTWIDTH * 0.25,
        borderColor: BORDERCOLOR5,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        top: 2,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR2,
        fontSize: 14
    },
    postView: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0
    },
    alignFlat: {
        alignItems: 'center',
        justifyContent: 'center',
        top: -10
    }
})