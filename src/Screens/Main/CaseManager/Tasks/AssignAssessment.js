import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import SubHeader from '../../../../Components/Common/Headers/SubHeader'
import { FONTS } from '../../../../Constants/Fonts'

const AssignAssessment = ({ navigation }) => {

    const [assign, setAssign] = useState(null)

    const handleOptionPress = (title)=>{
        setAssign(title)
    }

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={{ marginBottom: GlobalSize(40) }}>
                <SubHeader title={'Assign Assessments'} navigation={navigation} />
            </View>

            <View style={{marginLeft:GlobalSize(20)}}>

                <View style={{flexDirection:'row',marginBottom:GlobalSize(25)}}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => handleOptionPress('Myself')}>
                        <View
                            style={[
                                styles.radioIcon,
                                assign == 'Myself' && styles.radioIconSelected,
                            ]}>
                            {assign == 'Myself' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.txtAssign}>Complete Myself</Text>
                        <Text style={[styles.txtAssign, { fontFamily: FONTS.FontRegular,top:5 }]}>Case Manager to complete assessment.</Text>
                    </View>
                </View>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => handleOptionPress('Caregiver')}>
                        <View
                            style={[
                                styles.radioIcon,
                                assign == 'Caregiver' && styles.radioIconSelected,
                            ]}>
                            {assign == 'Caregiver' && <View style={styles.radioBorder} />}
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.txtAssign}>Send to Caregiver</Text>
                        <Text style={[styles.txtAssign, { fontFamily: FONTS.FontRegular,top:5 }]}>Caregiver to complete assessment.</Text>
                    </View>

                </View>
            </View>

            <View style={styles.viewRelative}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>{assign == 'Myself' ? 'Start' : 'Assign'}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default AssignAssessment

const styles = StyleSheet.create({
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    viewRelative: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        alignItems: 'center'
    },
    txtAssign: {
        fontFamily: FONTS.FontSemiB,
        color: PUREBLACK,
        fontSize: fontSize(14),
        marginLeft:GlobalSize(10)
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PUREBLACK,
        backgroundColor: PUREBLACK,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
    },
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PUREBLACK,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },

})