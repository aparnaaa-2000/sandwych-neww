import React from 'react';
import { Text, View, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';

import { BACKGROUNDWHITE, BORDERCOLOR1, PUREBLACK,TEXTCOLOR10, TEXTCOLOR7 } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { Close } from '../../../../assets';
import { TT, RX, CVS, WALGREENS, HEB } from '../../../Constants/DummyImages';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';


const TransferMeds = ({ navigation }) => {

    //DUMMY DATA
    const ProviderList = [
        {
            id: 1,
            ImageUri: CVS
        },
        {
            id: 2,
            ImageUri: HEB
        },
        {
            id: 1,
            ImageUri: RX
        },
        {
            id: 1,
            ImageUri: TT
        },
        {
            id: 1,
            ImageUri: WALGREENS
        },

    ]
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.mainContainer}>
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.textCA}>Transfer Medication</Text>
                    </View>

                    <View style={{ top: GlobalSize(2), right: GlobalSize(5) }}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Close width={GlobalSize(22)} height={GlobalSize(22)} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginHorizontal: GlobalSize(17), top: GlobalSize(12) }}>
                    <Text style={styles.logText}>Ready to switch to SandwYch?</Text>
                </View>

                <View style={styles.border} />

                <View style={styles.alignView}>
                    <Text style={styles.textS}>Select a Provider to Import your prescriptions.</Text>
                </View>

                <View style={styles.alignView}>
                    {ProviderList.map((item) => {
                        return (
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('LoginMeds', { ImageUri: item.ImageUri })}>
                                    <FastImage
                                        style={{ height: DEFAULTWIDTH * 0.32, width: DEFAULTWIDTH * 0.6 }}
                                        source={{
                                            uri: item.ImageUri,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:BACKGROUNDWHITE,
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:DEFAULTWIDTH * 0.04,
        top:GlobalSize(10)
    },
    textCA: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        fontSize: fontSize(18),
        left: GlobalSize(2)
    },
    logText: {
        fontSize: fontSize(16),
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontMedium,
    },
    border: {
        borderWidth: 0.5,
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        margin: DEFAULTWIDTH * 0.1,
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH* 0.05,
    },
    textS: {
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        fontSize: fontSize(14),
        color: PUREBLACK
    },
    alignView: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default TransferMeds;