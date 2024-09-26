import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { BACKGROUNDWHITE, FOURTHCOLOR, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'
import { ArrowF, LenArrow, LenArrowWhite } from '../../../../../assets'
import { useState } from 'react'

const AvailableResource = ({navigation}) => {

    const [selectedItem, setSelectedItem] = useState(null)

    const Data = [
        {
            id: 1,
            Title: 'Food',
            icon: require('../../../../../assets/Images/SocialWorker/Food.png'),
            navigation:'FoodResource'
        },
        {
            id: 2,
            Title: 'Housing',
            icon: require('../../../../../assets/Images/SocialWorker/House.png'),
        
        },
        {
            id: 3,
            Title: 'Goods',
            icon: require('../../../../../assets/Images/SocialWorker/Goods2.png')
        },
        {
            id: 4,
            Title: 'Transportation',
            icon: require('../../../../../assets/Images/SocialWorker/trans.png'),
            navigation:'Transportation'
        },
        {
            id: 5,
            Title: 'Health',
            icon: require('../../../../../assets/Images/SocialWorker/Health.png')
        },
        {
            id: 6,
            Title: 'Money',
            icon: require('../../../../../assets/Images/SocialWorker/Goods.png')
        },
        {
            id: 7,
            Title: 'Care',
            icon: require('../../../../../assets/Images/SocialWorker/Health.png')
        },
        {
            id: 8,
            Title: 'Education',
            icon: require('../../../../../assets/Images/SocialWorker/Ed.png')
        },
    ]

    const ChooseResource = (id,screenName) => {
        setSelectedItem(id)
        navigation.navigate(screenName)
    }

    const renderItem = ({ item }) => {
        const selectId = item.id === selectedItem;
        return (
            <TouchableOpacity onPress={() => ChooseResource(item.id,item?.navigation)}
                style={[styles.card, DEFAULTSTYLES.iosShadow, { backgroundColor: selectId ? PRIMARYCOLOR : PUREWHITE }]}>

                <View style={styles.rowView}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={item.icon}
                            resizeMode='contain'
                            style={{ width: GlobalSize(25), height: GlobalSize(25) }} />

                        <Text style={[styles.textTitle, { color: selectId ? PUREWHITE : TEXTCOLOR10 }]}>{item.Title}</Text>
                    </View>


                    <View>
                        {selectId ?
                            <LenArrowWhite /> :
                            <LenArrow />}
                    </View>
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

            <View style={{ marginBottom: GlobalSize(15) }}>
                <PatientHeader Header={'Resources'} />
            </View>

            <View style={DEFAULTSTYLES.alignView}>
                <FlatList
                    data={Data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem} />
            </View>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.touchBtn}>
                    <Text style={styles.textBtn}>+</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AvailableResource

const styles = StyleSheet.create({
    card: {
        width: DEFAULTWIDTH * 0.90,
        elevation: 5,
        backgroundColor: PUREWHITE,
        borderRadius: 6,
        margin: GlobalSize(10),
        justifyContent: 'center',
        padding: GlobalSize(10),
        marginBottom: 2
    },
    textTitle: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10,
        fontSize: fontSize(16),
        marginLeft: GlobalSize(10)
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textBtn: {
        fontSize: fontSize(26),
        color: PUREWHITE,
        fontFamily: FONTS.FontBold,
    },
    touchBtn: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.12,
        height: DEFAULTWIDTH * 0.12,
        backgroundColor: FOURTHCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(22),
        marginLeft: GlobalSize(10),
        marginRight: GlobalSize(10),
    },
    buttonView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        right: GlobalSize(10),
        position: 'absolute',
        left:0,
        bottom:10
    }
})