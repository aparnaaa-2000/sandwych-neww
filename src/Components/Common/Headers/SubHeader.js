import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ArrowF } from '../../../../assets'
import { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { PUREBLACK } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

const SubHeader = ({ title, navigation }) => {

    return (
        <View>
            <View style={styles.flexRow}>

                <View>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <ArrowF width={width(22)} height={height(22)} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textWeight}>{title}</Text>
                </View>

                <View>

                </View>
            </View>
        </View>
    )
}

export default SubHeader

const styles = StyleSheet.create({
    textWeight: {
        color: PUREBLACK,
        fontSize: fontSize(18),
        fontFamily: FONTS.FontSemiB,
        paddingRight: GlobalSize(20)
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH * 0.05,
        marginBottom: DEFAULTHEIGHT * 0.0
    },
})