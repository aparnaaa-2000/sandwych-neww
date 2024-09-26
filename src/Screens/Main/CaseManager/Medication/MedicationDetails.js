import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDLIGHTBLUE1, BACKGROUNDWHITE, PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts'

const MedicationDetails = ({navigation}) => {
    
    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Medication'} />
            </View>

            <ScrollView showsVerticalScrollIndicator= {false}>
            <View style={{ margin: GlobalSize(20) }}> 
                <View style={DEFAULTSTYLES.alignView}>

                    <View style={styles.imgBack}>
                        <Image
                            style={{ width: GlobalSize(100), height: GlobalSize(80) }}
                            resizeMode='contain'
                            source={require('../../../../../assets/Images/SocialWorker/eye.png')} />
                    </View>
                </View>

                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={styles.textTitle}>Cyanocobalamin (Vitamin B12) solution</Text>
                    <Text style={styles.textDesc}>1.0 mg/mL in methanol, ampule of 1 mL, certified reference material, Cerilliant®</Text>
                </View>

                <View style={{ marginBottom: GlobalSize(10) }}>
                    <Text style={[styles.textTitle, { fontSize: fontSize(15) }]}>Description</Text>
                    <Text style={styles.textDesc}>Cyanocobalamin is the most common and widely-produced of the vitamin B12 analogs. Vitamin B12, important for proper neuronal function and formation of blood cellular components, is monitored directly in patient serum samples by LC-MS/MS.</Text>
                </View>

                <View style={{marginBottom:GlobalSize(30)}}>
                    <Text style={[styles.textTitle, { fontSize: fontSize(15), marginBottom: GlobalSize(5) }]}>Legal Information</Text>
                    <View style={styles.row}>
                        <View style={styles.dot} />
                        <Text style={styles.textDesc}>CERILLIANT is a registered trademark of Cerilliant Corporation</Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.dot} />
                        <Text style={styles.textDesc}>Snap-N-Shoot is a registered trademark of Cerilliant Corporation</Text>
                    </View>

                    <View style={{ flexDirection: 'row',marginLeft:GlobalSize(10) }}>
                        <View style={styles.dot} />
                        <Text style={styles.textDesc}>Snap-N-Spike is a registered trademark of Cerilliant Corporation</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btnView} onPress={()=>navigation.navigate('AddDrugAllergy')}>
                    <Text style={styles.textBtn}>Add drug allergies</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnView} onPress={()=>navigation.navigate('AssignMedication')}>
                    <Text style={styles.textBtn}>Assign</Text>
                </TouchableOpacity>

            </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default MedicationDetails

const styles = StyleSheet.create({
    imgBack: {
        backgroundColor: BACKGROUNDLIGHTBLUE1,
        width: DEFAULTWIDTH * 0.88,
        // height:200,
        borderRadius: GlobalSize(10),
        alignItems: 'center',
        justifyContent: 'center',
        padding: GlobalSize(45),
        marginBottom: GlobalSize(10)
    },
    textTitle: {
        color: PUREBLACK,
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(20)
    },
    textDesc: {
        color: PUREBLACK,
        fontSize: fontSize(13),
        fontFamily: FONTS.FontRegular
    },
    dot: {
        width: GlobalSize(6),
        height: GlobalSize(6),
        borderRadius: GlobalSize(3),
        backgroundColor: PUREBLACK,
        marginTop: GlobalSize(6),
        marginRight: GlobalSize(10)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        marginBottom:GlobalSize(10)
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    row:{
         flexDirection: 'row',
          marginBottom: GlobalSize(5),
          marginLeft:GlobalSize(10)
         }
})