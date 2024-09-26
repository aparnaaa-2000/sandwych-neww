import React,{ useState }from 'react'
import { Platform, StyleSheet, Text, View, Image} from 'react-native'

//IMPORT CONSTANTS AND ASSETS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { Account } from '../../../../assets'

const PatientList = ({data}) => {

    const [imageErrors, setImageErrors] = useState({});

        // Handle image load errors
        const handleImageError = (index) => {
            setImageErrors((prevErrors) => ({
                ...prevErrors,
                [index]: true,
            }));
        };

    return (

        <View>
                <View style={DEFAULTSTYLES.alignView}>
                    {data?.map((item,index) => {
           
                        return (
                            <View
                                style={[styles.cardView,
                                Platform.OS == 'android' ?
                                    DEFAULTSTYLES.androidShadow :
                                    DEFAULTSTYLES.iosShadow]}>

                                <View>
                                    {!imageErrors[index] && item?.profile !== null  ?
                                        <Image
                                            source={{ uri: item?.profile }}
                                            style={styles.imageStyle}
                                            onError={() => handleImageError(index)}  /> :
                                    
                                        <Account width={54} height={54} />}
                                </View>

                                <View>
                                    <Text style={styles.textName}>{item.name}</Text>
                                    <Text style={styles.textEm}>{item.email}</Text>
                                </View>

                                <View>
                                    <Text style={[styles.textName, { color: PRIMARYCOLOR }]}>{item.age}</Text>
                                </View>

                            </View>
                        )
                    })}
                </View>
        </View>
    )
}

export default PatientList

const styles = StyleSheet.create({
    cardView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: PUREWHITE,
        padding: GlobalSize(15),
        borderRadius: GlobalSize(15),
        width: DEFAULTWIDTH * 0.90,
        marginBottom: GlobalSize(10),
        paddingRight: DEFAULTWIDTH * 0.06
    },
    textName: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10
    },
    textEm: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR5
    },
    imageStyle: {
        width: GlobalSize(54),
        height: GlobalSize(54),
        borderRadius: GlobalSize(27)
    }
})