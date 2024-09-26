import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image, StatusBar, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts'
import {
     BACKGROUNDWHITE, 
     BORDERCOLOR5, 
     BORDERCOLOR8, 
     GREYICONBACKGROUND, 
     PRIMARYCOLOR,
     PUREWHITE, 
     TEXTCOLOR2, 
     TEXTCOLOR8, } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { GreyPlus } from '../../../../assets'

//IMPORT COMPONENTS
import ChooseSupportModal from './ChooseSupportModal'

const EditSupport = ({navigation}) => {

    const [ModalOpen, setModalOpen] = useState(false)

    const SupportData = [
        {
            id: 1,
            Name: 'Eating',
            Image: require('../../../../assets/Images/AbilityToHelp1/Eating.png')
        },
        {
            id: 2,
            Name: 'Dressing',
            Image: require('../../../../assets/Images/AbilityToHelp1/Dressing.png')
        }
    ]

    const renderItem = ({ item }) => {
        return (
            <View style={styles.cardSupport}>
                <Image source={item.Image} style={{ width: 100, height: 80 }} resizeMode='contain' />
                <Text style={styles.textTitle}>{item.Name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{ marginLeft: DEFAULTWIDTH * 0.095 }}>
                            <Text style={styles.textSupport}>Support</Text>
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <FlatList
                                numColumns={2}
                                data={SupportData}
                                keyExtractor={(item) => item.id}
                                renderItem={renderItem} />
                        </View>


                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ChooseSupport')}
                            >
                            <View style={styles.AddSupport}>
                                <GreyPlus />
                            </View>
                        </TouchableOpacity>



                    </View>
                </ScrollView>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.btnView} onPress={()=>navigation.goBack()}>
                        <Text style={styles.textBtn}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ChooseSupportModal
                ModalOpen={ModalOpen}
                setModalOpen={setModalOpen} />
        </SafeAreaView>
    )
}

export default EditSupport

const styles = StyleSheet.create({
    textSupport: {
        fontFamily: FONTS.FontSemiB,
        color: TEXTCOLOR8,
        fontSize: 20
    },
    cardSupport: {
        margin: DEFAULTWIDTH * 0.035,
        borderWidth: 1,
        borderColor: BORDERCOLOR5,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textTitle: {
        top: 10,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR2,
        fontSize: 14
    },
    AddSupport: {
        backgroundColor: GREYICONBACKGROUND,
        borderColor: BORDERCOLOR8,
        marginLeft: DEFAULTWIDTH * 0.095,
        borderWidth: 1,
        width: DEFAULTWIDTH * 0.37,
        height: DEFAULTHEIGHT * 0.19,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTHEIGHT * 0.05

    },
    btnView: {
        width: DEFAULTWIDTH * 0.80,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom: 20
    },
    textBtn: {
        fontSize: 12,
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
})