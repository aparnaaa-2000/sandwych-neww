import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, ScrollView } from 'react-native'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR4, GREYBACKGROUND1, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import { BlueStar } from '../../../../../assets'
import { FONTS } from '../../../../Constants/Fonts'
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader'

const RequestResource = ({ navigation }) => {

    const Star = [
        {
            id: 1
        },
        {
            id: 2
        },
        {
            id: 3
        },
        {
            id: 4
        },
        {
            id: 5
        }
    ]

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <ResourceHeader navigation={navigation} title={'Requested Resources'} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <View style={styles.viewCard}>
                        <View>
                            <Text style={styles.textUpdate}>Update</Text>
                        </View>

                        <View style={styles.viewDesc}>
                            <Text style={styles.textReq}>Your request to Nourish nation has
                                been on hold detail (Case Manager)
                                has assigned new resource.
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <View>
                                <Image
                                    source={require('../../../../../assets/Images/UNIT.png')}
                                    style={{ width: 60, height: 60 }} />
                            </View>
                            <View>

                                <View style={styles.viewText}>
                                    <Text style={styles.textReq}>Organization : </Text>
                                    <Text style={[styles.textReq,
                                    {
                                        fontFamily: FONTS.FontSemiB,
                                        maxWidth: DEFAULTWIDTH * 0.32,
                                    }]}>United Natural</Text>
                                </View>


                                <View style={styles.viewText}>
                                    <Text style={styles.textReq}>Resource : </Text>
                                    <Text style={[styles.textReq, { fontFamily: FONTS.FontSemiB }]}>Food</Text>
                                </View>

                                <View style={styles.viewText}>
                                    <Text style={styles.textReq}>Rating : </Text>
                                    <ScrollView horizontal={true} style={{ marginTop: 5 }} showsHorizontalScrollIndicator={false}>
                                        {Star.map((item) => {
                                            return (
                                                <View key={item.id} horizontal>
                                                    <BlueStar />
                                                </View>
                                            )
                                        })}

                                    </ScrollView>
                                </View>

                            </View>


                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default RequestResource

const styles = StyleSheet.create({
    textRes: {
        fontSize: 24,
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    viewCard: {
        width: DEFAULTWIDTH * 0.86,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        borderColor: BORDERCOLOR4,
        backgroundColor: GREYBACKGROUND1
    },
    textUpdate: {
        fontFamily: FONTS.FontSemiB,
        fontSize: 18,
        color: TEXTCOLOR7,
        textDecorationLine: 'underline',
        textDecorationColor: TEXTCOLOR7
    },
    textReq: {
        fontFamily: FONTS.FontRegular,
        fontSize: 15,
        color: TEXTCOLOR7,
    },
    viewHead: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: DEFAULTWIDTH * 0.05,
        marginBottom: DEFAULTHEIGHT * 0.03
    },
    viewText: {
        marginLeft: 12,
        flexDirection: 'row',
        marginBottom: 5
    },
    viewDesc: {
        marginBottom: 12,
        marginTop: 10
    }
})