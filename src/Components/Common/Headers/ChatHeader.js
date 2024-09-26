import React from 'react';
import { Text, View,StyleSheet, TouchableOpacity } from 'react-native';

//IMPORT CONSANTS
import { FONTS } from '../../../Constants/Fonts';
import { PRIMARYCOLOR, PUREWHITE } from '../../../Constants/Colors/Colors';
import { GroupCreate } from '../../../../assets';
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize, height, width } from '../../../Constants/ResponsiveFont/ResponsiveFonts';


const ChatHeader = ({ navigation }) => {
   
    return (

        <View style={styles.headerView}>
            <Text style={styles.textMain}>Chats</Text>
{/* 
            <TouchableOpacity onPress={() => navigation.navigate('ChatStack', { screen: 'CreateGroup' })}>
                <GroupCreate width={width(20)} height={height(20)} />
            </TouchableOpacity> */}
        </View>
    )
};

const styles = StyleSheet.create({
    headerView: {
        width: DEFAULTWIDTH,
        height: DEFAULTWIDTH * 0.2,
        backgroundColor: PRIMARYCOLOR,
        padding: GlobalSize(12),
        paddingTop: DEFAULTWIDTH * 0.08,
       // marginBottom: GlobalSize(15),
        fontWeight: '700',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textMain: {
        fontSize: fontSize(27),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium,
        bottom: GlobalSize(10)
    },

})

export default ChatHeader;