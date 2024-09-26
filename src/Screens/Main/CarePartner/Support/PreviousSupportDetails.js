import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    ImageBackground
} from 'react-native'

//IMPORT CONSTANTS /ASSESTS
import {
    BACKGROUNDGREEN,
    BACKGROUNDWHITE,
    BORDERCOLOR5,
    BORDERCOLORSUPPORT,
    PRIMARYCOLOR,
    PUREBLACK,
    PUREWHITE,
    TEXTCOLOR10,
    TEXTCOLORG
} from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { FONTS } from '../../../../Constants/Fonts'
import { GreenFace } from '../../../../../assets'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT COMPONENTS
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'
import PrevProcessDetails from './PrevProcessDetails';

const PreviousSupportDetails = ({ navigation, route }) => {

    const item = route?.params?.item;

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.headerRow}>
                    <ResourceHeader title={'Support'} navigation={navigation} />
                </View>

                <View style={{ padding: GlobalSize(20), paddingTop: 0 }}>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'space-between',
                    }}>

                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <View style={styles.viewImage}>
                                <ImageBackground
                                    source={{ uri: item?.support_member?.profile }}
                                    imageStyle={{ borderRadius: 40 }}
                                    style={{ width: GlobalSize(80), height: GlobalSize(80) }} >

                                </ImageBackground>
                            </View>

                            <View style={{ marginTop: GlobalSize(20) }}>
                                <Text style={styles.textNm}>{item?.support_member?.name}</Text>
                                <Text style={styles.textGn}>{item?.support_member?.gender == '1' ? 'Female' : 'Male'}</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                            <GreenFace width={40} height={40} top={20} />

                        </View>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.lineBorder} />
                    </View>


                    <View style={styles.rowCard}>
                        <View style={[styles.card, DEFAULTSTYLES.iosShadow]}>
                            <Text style={styles.textRate}>Response Rating</Text>
                            <Text style={styles.textNm}>Average</Text>
                        </View>

                        <View style={[styles.card, DEFAULTSTYLES.iosShadow]}>
                            <Text style={styles.textRate}>Overall Rating</Text>
                            <Text style={styles.textNm}>50%</Text>
                        </View>

                        <View style={[styles.card, DEFAULTSTYLES.iosShadow]}>
                            <Text style={styles.textRate}>Support Status</Text>
                            <Text style={styles.textNm}>{item?.completion_status === '0' ? 'Completed' : 'Cancelled'}</Text>
                        </View>
                    </View>
                    <PrevProcessDetails item={item} />

                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

export default PreviousSupportDetails;

const styles = StyleSheet.create({
    textNm: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(13)
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    touchDot: {
        marginRight: GlobalSize(20),
        top: GlobalSize(10),
        padding: GlobalSize(5)
    },
    textGn: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLORG,
        fontSize: fontSize(12)
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    btnView: {
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: GlobalSize(7),
        top: GlobalSize(-20)
    },
    textRate: {
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        fontFamily: FONTS.FontMedium,
        textAlign: 'center'
    },
    lineBorder: {
        width: DEFAULTWIDTH * 0.86,
        height: 1,
        marginBottom: GlobalSize(10),
        backgroundColor: BORDERCOLORSUPPORT,
        margin: GlobalSize(17),
        alignItems: 'center',
        justifyContent: 'center'
    },

    touchBtn: {
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        padding: GlobalSize(14),
        margin: GlobalSize(7),
        marginBottom: GlobalSize(10)
    },
    rowCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: GlobalSize(10)
    },
    viewImage: {
        borderWidth: 1,
        borderColor: BORDERCOLOR5,
        borderRadius: GlobalSize(40),
        width: GlobalSize(80),
        height: GlobalSize(80),
        marginRight: GlobalSize(15)
    },
    onlineView: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(10),
        backgroundColor: BACKGROUNDGREEN,
        marginTop: GlobalSize(10),
        left: DEFAULTWIDTH * 0.18
    },
    card: {
        width: DEFAULTWIDTH * 0.27,
        elevation: 2,
        backgroundColor: PUREWHITE,
        borderRadius: 10,
        alignItems: 'center',
        padding: GlobalSize(10)
    }
})