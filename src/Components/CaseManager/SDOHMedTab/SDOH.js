import { FlatList, StyleSheet, Text, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { Title } from 'react-native-paper'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { BACKGROUNDWHITE, BORDERCOLOR1, TEXTCOLOR5, VALIDCOLOR } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'

const SDOH = () => {

    const SDOHDATA = [
        {
            id: 1,
            img: require('../../../../assets/Images/SocialWorker/Man.png'),
            Title: 'Economic Stability',
            Risk: 'High Risk'
        },
        {
            id: 1,
            img: require('../../../../assets/Images/SocialWorker/Edc.png'),
            Title: 'Education',
            Risk: 'High Risk'
        },
        {
            id: 1,
            img: require('../../../../assets/Images/SocialWorker/Food2.png'),
            Title: 'Food',
            Risk: 'High Risk'
        },
        {
            id: 1,
            img: require('../../../../assets/Images/SocialWorker/Food2.png'),
            Title: 'Food',
            Risk: 'High Risk'
        }
    ]

    const renderItem = ({item})=>{
        return(
            <TouchableOpacity style={styles.card}>
                <Image source={item.img} style={{width:GlobalSize(20),height:GlobalSize(20)}} resizeMode='contain'/>
               <Text style={styles.textTitle}>{item.Title}</Text>
               <Text style={[styles.textTitle,{color:VALIDCOLOR,marginBottom:GlobalSize(10)}]}>{item.Risk}</Text>
                </TouchableOpacity>
        )
    }
    return (
        <View style={[DEFAULTSTYLES.alignView,{backgroundColor:BACKGROUNDWHITE}]}>
            <FlatList
             data={SDOHDATA}
             keyExtractor={(item)=>item.id}
             numColumns={3}
             renderItem={renderItem} />
        </View>
    )
}

export default SDOH

const styles = StyleSheet.create({
    card:{
        padding:GlobalSize(20),
        width:DEFAULTWIDTH*0.27,
        borderWidth:1,
        borderRadius:8,
        margin:GlobalSize(10)
    },
    textTitle:{
        color:TEXTCOLOR5,
        fontFamily:FONTS.FontRegular,
        fontSize:fontSize(12),
        marginBottom:GlobalSize(20),
        marginTop:GlobalSize(10)
    },
 
})