import React from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR8 } from '../../../Constants/Colors/Colors';
import { FONTS } from '../../../Constants/Fonts';
import { Tick } from '../../../../assets';
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';


const ConfirmDrug5 = ({ navigation }) => {
    return (
        <>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />

            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.viewMain}>
                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Tick />
                        </View>

                        <View style={styles.setView}>
                            <Text style={styles.textConfirm}>All Set !</Text>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15), marginHorizontal: GlobalSize(10) }}>
                            <Text style={styles.supText}>Your Medication has been Successfully stored.</Text>
                        </View>

                    </View>
                </ScrollView>
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnView} onPress={() => navigation.navigate('LandingScreen')}>
                    <Text style={styles.textBtn}>Back To Dashboard</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textConfirm: {
        fontSize: fontSize(18),
        fontFamily: FONTS.FontMedium,
        fontWeight: '500',
        color: TEXTCOLOR10,
    },
    supText: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR8,
        textAlign: 'center',
    },
    textBtn: {
        fontSize: fontSize(16),
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: DEFAULTWIDTH*0.1,
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height:DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(10),
    },
    viewMain: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: DEFAULTHEIGHT * 0.4
    },
    setView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: GlobalSize(10)
    }
});

export default ConfirmDrug5;
