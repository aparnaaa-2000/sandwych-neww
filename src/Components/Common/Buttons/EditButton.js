import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE } from '../../../Constants/Colors/Colors'
import { GlobalSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

const EditButton = ({ navigation, onPress, value,Loading }) => {
    //  const { OnAddStats } = route?.params?.OnAddStats
    console.log("OnADD ................", onPress, value)
    return (
        <View>
            <TouchableOpacity
                style={[styles.btnView, { opacity: value ? 1 : 0.5 }]}
                onPress={() => value ? onPress() : console.log("EMTY")}>
                <Text style={styles.textBtn}>Submit</Text>
                {Loading &&
                <ActivityIndicator size={15} color={BACKGROUNDWHITE}/>}
            </TouchableOpacity>

            <View style={styles.centerView}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.textCancel}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditButton

const styles = StyleSheet.create({
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        flexDirection:'row'
    },
    centerView: {
        marginTop: DEFAULTWIDTH * 0.05,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        fontSize: 12,
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
        marginRight:GlobalSize(10)
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: 12,
        color: PRIMARYCOLOR,
        fontWeight: '700'
    },
})