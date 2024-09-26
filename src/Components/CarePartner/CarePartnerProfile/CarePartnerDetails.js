import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

//IMPORT CONSTANTS
import { TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { Account, BlueCall, BlueEmail, OrangePen } from '../../../../assets'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'

//IMPORT PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CarePartnerDetails() {

    const [UserData, setUserData] = useState()
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        getData().then(data => {
            setUserData(data)
        });

    }, []);


    const getData = async () => { //GET THE ASYNC DATA
        try {
            const jsonValue = await AsyncStorage.getItem('UserData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };

    return (
        <View>
            <View style={styles.centerView}>

                <View style={{ marginRight: DEFAULTWIDTH * 0.1, flexDirection: 'row' }}>

                {!imageError ?
                        <Image 
                        source={{ uri:UserData?.profile }} 
                        style={styles.img}
                        onError={() => setImageError(true)} /> :

                        <Account style={styles.img} opacity={0.5} />}
                    {/* <View style={{left:-28,top:5}}>
                    <OrangePen/>
                    </View> */}
                </View>

                <View style={{ left: -18 }}>
                    <Text style={styles.textName}>{UserData?.name}</Text>
                    <Text style={styles.textId}>ID: {UserData?.id}</Text>
                    {UserData?.email &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <BlueEmail width={15} height={15} />
                            <Text style={[styles.textId, { marginLeft: 5, maxWidth: DEFAULTWIDTH * 0.55,fontSize:GlobalSize(12) }]}>{UserData?.email}</Text>
                        </View>}

                    {UserData?.phone &&
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <BlueCall width={15} height={15} />
                            <Text style={[styles.textId, { marginLeft: 5 }]}>{UserData?.phone}</Text>
                        </View>}
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
        marginTop:GlobalSize(0),
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: GlobalSize(100),
        height: GlobalSize(100),
        borderRadius: GlobalSize(50)
    }
})