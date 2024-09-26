import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BACKGROUNDWHITE, BORDERCOLOR4, PRIMARYCOLOR, TEXTCOLOR7 } from '../../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../../Constants/Fonts';
import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';



const ResearchPrompt = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imageView}>
                    <Image
                        style={{ width: "100%", height: DEFAULTWIDTH }}
                        resizeMode='contain'
                        source={require('../../../../../../assets/Images/Cards.png')} />
                </View>

                <View style={styles.viewText}>
                    <Text style={styles.textPrompt}>Welcome to</Text>
                    <Text style={styles.textPrompt}>SandwYch Research</Text>
                </View>

            </ScrollView>


            <View style={styles.viewButton}>
                <TouchableOpacity style={[styles.buttonStyle, { marginLeft: 18 }]}
                    onPress={() => navigation.navigate('EnrollmentProgress')}>
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.buttonStyle, { marginRight: 18 }]}
                    onPress={() => navigation.navigate('EnrollmentProgress')}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUNDWHITE,
        position: 'relative'
    },
    buttonText: {
        color: TEXTCOLOR7,
        fontFamily: 'Inter-Medium',
        fontSize: 14,
        opacity: 0.8
    },
    buttonStyle: {
        borderRadius: 8,
        borderWidth: 1,
        margin: 5,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.40,
        height: DEFAULTWIDTH * 0.12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textPrompt: {
        fontSize: 25,
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR
    },
    viewText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: DEFAULTWIDTH * 0.05
    },
    viewButton: {
        position: 'absolute',
        bottom: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: DEFAULTWIDTH
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})
export default ResearchPrompt;