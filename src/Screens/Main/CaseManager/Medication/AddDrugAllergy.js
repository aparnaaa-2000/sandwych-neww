import { StyleSheet, Text, View, StatusBar, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, BORDERCOLORNEW1, BOTTOMTABTEXT1, PRIMARYCOLOR, PUREBLACK, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7, VALIDCOLOR } from '../../../../Constants/Colors/Colors'
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { FONTS } from '../../../../Constants/Fonts';
import { Dropdown } from 'react-native-element-dropdown';

const AddDrugAllergy = ({navigation}) => {

    const AllergiesRef = useRef();
    const PartRef = useRef();
    const DescRef = useRef();

    const [AllergyNm, setAllergyNm] = useState(null)
    const [Part, setPart] = useState(null)
    const [Description, setDescription] = useState(null)

    const [allergyStatus, setAllergyStatus] = useState(true)
    const [partStatus, setPartStatus] = useState(true)
    const [DescStatus, setDescStatus] = useState(true)

    const [PartData, setPartData] = useState(
        [
            { label: 'Skin', value: 'Skin' },
            { label: 'Eye', value: 'Eye' },

        ]
    )

    
    //ALLERGY VALIDATION
    const handleTitleChange = (text) => {
        const isValidTitle = /^[ A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(text);
        // setTitleStatus(isValidTitle);
        // setTaskName(text);
    };

    //ADDRESS VALIDATION
    const handleAddressChange = (text) => {
        const isValidAddress = /^[ A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(text);
        // setAddressStatus(isValidAddress);
        // setAddress(text);
    };

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View>
                <PatientHeader Header={'Add Drug Allergies'} />
            </View>

            <View style={{ padding: GlobalSize(20) }}>

                <View style={{ marginBottom: GlobalSize(15) }}>
                    <Text style={styles.textTitle}>Allergies</Text>

                    <TextInput
                        ref={AllergiesRef}
                        value={AllergyNm}
                        onChangeText={(text) => setAllergyNm(text)}
                        style={[styles.textInput, { borderColor: !allergyStatus ? VALIDCOLOR : BORDERCOLORNEW1 }]} />

                    {!allergyStatus && (
                        <View style={{ top: 5 }}>
                            <Text style={{ color: VALIDCOLOR }}>Allergies is required</Text>
                        </View>
                    )}
                </View>

                <View style={{ marginBottom: GlobalSize(15) }}>
                    <Text style={styles.textTitle}>Part</Text>

                    <Dropdown
                        style={[styles.textIn, { borderColor: !partStatus ? VALIDCOLOR : BORDERCOLORNEW1 }]}
                        placeholderStyle={styles.placeholderS}
                        itemTextStyle={styles.textArea}
                        selectedTextStyle={styles.textArea}
                        containerStyle={styles.dropView}
                        data={PartData}
                        search={false}
                        labelField="label"
                        valueField="value"
                        placeholder={'Select'}
                        value={Part}
                        showsVerticalScrollIndicator={false}
                        onChange={item => {
                            setPart(item.value)
                        }}
                    />

                    {!partStatus && (
                        <View style={{ top: 5 }}>
                            <Text style={{ color: VALIDCOLOR }}>Part is required</Text>
                        </View>
                    )}

                </View>

                <View>
                    <Text style={styles.textTitle}>Description</Text>

                    <TextInput
                        value={Description}
                        onChangeText={(text) => setDescription(text)}
                        style={[styles.textInput, {
                            height: GlobalSize(200),
                            textAlignVertical: 'top',
                            borderColor: DescStatus ? BORDERCOLORNEW1 : VALIDCOLOR
                        }]} />

                    {!DescStatus && (
                        <View style={{ top: 5 }}>
                            <Text style={{ color: VALIDCOLOR }}>Description is required</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.textBtn}>Add drug allergies</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default AddDrugAllergy

const styles = StyleSheet.create({
    btnView: {
        width: DEFAULTWIDTH * 0.88,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    textBtn: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: GlobalSize(20)
    },
    textTitle: {
        color: PUREBLACK,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(15)
    },
    textInput: {
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR10,
        fontSize: fontSize(12),
        borderWidth: 1,
        borderColor: BORDERCOLORNEW1,
        width: DEFAULTWIDTH * 0.88,
        borderRadius: GlobalSize(5),
        marginTop: GlobalSize(8),
        paddingLeft: GlobalSize(15)
    },
    textArea: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        fontWeight: '400',
        color: TEXTCOLOR10,
    },
    placeholderS: {
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        color: BOTTOMTABTEXT1,
    },
    dropView: {
        borderRadius: 4,
        borderColor: BORDERCOLOR4,
        width: DEFAULTWIDTH * 0.88,
        color: TEXTCOLOR10,
    },
    textIn: {
        height: GlobalSize(50),
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.88,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: BORDERCOLOR1,
        paddingLeft: GlobalSize(15),
        padding: GlobalSize(5),
        color: TEXTCOLOR7,
        marginTop: GlobalSize(10)
    },
})