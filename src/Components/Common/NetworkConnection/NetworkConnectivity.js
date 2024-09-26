import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { FONTS } from '../../../Constants/Fonts';
import { PUREWHITE, TEXTCOLOR10 } from '../../../Constants/Colors/Colors';


const NetworkConnectivity = () => {
    
    return (
        <View style={styles.container}>

            <View>
                <Image style={{ width: 120, height: 100 }}
                    source={require('../../../../assets/Images/No.jpg')} />
            </View>
            <View style={{ marginBottom: 20, marginTop: 20 }}>
                <Text style={[styles.networkText, { fontFamily: FONTS.FontSemiB, fontSize: 20 }]}>Whoops !</Text>
            </View>
            <View>
                <Text style={styles.networkText}>No Internet Connection found</Text>
                <Text style={styles.networkText}>Check your Connection or try again.</Text>
            </View>

            <View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    networkText: {
        fontSize: 14,
        color: TEXTCOLOR10,
        textAlign: 'center',
        fontFamily: FONTS.FontRegular
    }
})
export default NetworkConnectivity;