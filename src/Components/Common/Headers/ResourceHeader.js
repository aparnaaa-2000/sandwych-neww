import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowF } from '../../../../assets'
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { TEXTCOLOR10 } from '../../../Constants/Colors/Colors'
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

const ResourceHeader = ({ navigation,title }) => {
    return (
        <View style={styles.viewFlex}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowF width={width(22)} height={height(22)} />
                </TouchableOpacity>
            </View>

            <View style={{ marginLeft: GlobalSize(15) }}>
                <Text style={styles.textRes}>{title}</Text>
            </View>
        </View>
    )
}

export default ResourceHeader

const styles = StyleSheet.create({
    viewFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: DEFAULTWIDTH * 0.04,
        marginBottom: DEFAULTHEIGHT * 0.03
    },
    textRes: {
        fontSize: fontSize(24),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
})