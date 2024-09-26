import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

//IMPORT CONSTANTS
import { TEXTCOLOR2, TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { Account } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT PACKAGES
import FastImage from 'react-native-fast-image'


export default function PatientDetails({ data }) {

    const [ImageError, setImageError] = useState(false)

    return (
        <View>
            <View style={styles.centerView}>

                <View style={{ marginRight: DEFAULTWIDTH * 0.05 }}>

                    {data?.profile_image !== null ?
                        <FastImage
                            style={styles.img}
                            source={{
                                uri: data?.profile_image,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                            onError={() => setImageError(true)}
                        /> :
                        <Account opacity={0.5} />}
                </View>

                <View>
                    <Text style={styles.textName}>{data?.name}, {data?.age ? data?.age :0}</Text>
                    <Text style={styles.textId}>ID: {data?.id}</Text>
                    <Text style={[styles.textId, { color: TEXTCOLOR2 }]}>{data?.locations[0]}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textName: {
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(20)
    },
    textId: {
        fontSize: fontSize(14),
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontMedium
    },
    centerView: {
        flexDirection: 'row',
        margin: GlobalSize(15),
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: GlobalSize(84),
        height: GlobalSize(84),
        borderRadius: GlobalSize(42)
    }
})