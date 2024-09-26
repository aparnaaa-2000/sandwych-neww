import { StyleSheet, Text, View, SafeAreaView, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { BACKGROUNDWHITE, BORDERCOLOR1, BORDERCOLOR4, PRIMARYCOLOR, PUREWHITE, SECONDARYCOLOR, TEXTCOLOR10, TEXTCOLOR2, VALIDCOLOR } from '../../../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../../Constants/styles/styles'
import { FONTS } from '../../../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts'
import { CASEMANAGER } from '../../../../../Constants/Texts/UserRoles'

const CaseMgForm = () => {

    const NameRef = useRef(null);
    const EmailRef = useRef(null);
    const ZipRef = useRef(null);
    const AddressRef = useRef(null);
    const CodeRef = useRef(null);
    const BadgeRef = useRef(null);
    const PracticeNPIRef = useRef(null);
    const IndividualNPIRef = useRef(null);
    const IndividualCAQH = useRef(null);

    const [Name, setName] = useState(null)
    const [Email, setEmail] = useState(null)
    const [Code, setCode] = useState(null)
    const [address, setAddress] = useState(null)
    const [Zipcode, setZipcode] = useState(null)
    const [Location, setLocation] = useState(null)
    const [BadgeNum, setBadgeNum] = useState(null)
    const [PNPI, setPNPI] = useState(null)
    const [CAQH, setCAQH] = useState(null)
    const [IndividualNPI, setIndividualNPI] = useState(null)

    const [NameStatus, setNameStatus] = useState(true)
    const [EmailStatus, setEmailStatus] = useState(true)
    const [ZipcodeStatus, setZipcodeStatus] = useState(true)
    const [CodeStatus, setCodeStatus] = useState(true)
    const [AddStatus, setAddStatus] = useState(true)
    const [BadgeStatus, setBadgeStatus] = useState(true)
    const [NPIStatus, setNPIStatus] = useState(true)
    const [CAQHStatus, setCAQHStatus] = useState(true)
    const [IndividualNPIStatus, setIndividualNPIStatus] = useState(true)

    //CODE VALIDATION
    const handleCodeChange = (text) => {
        const isValidName = /^[ A-Za-z1234567890\s]{2,12}$/.test(text);
        setCodeStatus(isValidName)
        setCode(text);
    };

    //NAME VALIDATION
    const handleNameChange = (text) => {
        const isValidName = /^[ A-Za-z\s]{2,}$/.test(text);
        setNameStatus(isValidName)
        setName(text);
    };

    //EMAIL VALIDATION
    const handleEmailChange = (text) => {
        const isValidEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(text);
        setEmailStatus(isValidEmail);
        setEmail(text);
    };

    //ZIPCODE VALIDATION
    const handleZipChange = (text) => {
        const isValidName = /^[ 1234567890\s]{5}$/.test(text);
        setZipcodeStatus(isValidName)
        setZipcode(text);
    };

    //ADDRESS VALIDATION
    const handleAddressChange = (text) => {
        const isValidAddress = /^[ A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(text);
        setAddStatus(isValidAddress);
        setAddress(text);
    };

    //BADGE NUMBER VALIDATION
    const handleBadgeChange = (text) => {
        const isValidBadge = /^[ A-Za-z1234567890,./-_()&@;:\s]{2,50}$/.test(text);
        setBadgeStatus(isValidBadge);
        setBadgeNum(text);
    };

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: GlobalSize(20) }}>
                    <View style={{ marginBottom: GlobalSize(20) }}>
                        <Text style={styles.textSocial}>{CASEMANAGER}</Text>
                    </View>

                    <View style={{ marginBottom: GlobalSize(5) }}>
                        <Text style={styles.textSub}>We need information to create your account.</Text>
                    </View>

                    <View style={{ marginBottom: GlobalSize(25) }}>
                        <Text style={styles.textDesc}>This can always be updated within your account settings.</Text>
                    </View>

                    <View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>First Name Last Name</Text>

                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={NameRef}
                                    value={Name}
                                    onChangeText={(text) => handleNameChange(text)}
                                    style={[styles.textInput, { borderColor: !NameStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />
                            </View>
                            {!NameStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Name is required</Text>
                            )}
                        </View>


                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Email Address</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={EmailRef}
                                    value={Email}
                                    onChangeText={(text) => handleEmailChange(text)}
                                    style={[styles.textInput, { borderColor: !EmailStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />
                            </View>

                            {!EmailStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Email address is required</Text>
                            )}

                        </View>


                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Invitation Code</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={CodeRef}
                                    value={Code}
                                    onChangeText={(text) => handleCodeChange(text)}
                                    style={[styles.textInput, { borderColor: !CodeStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />
                            </View>

                            {!CodeStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Code is required</Text>
                            )}

                        </View>


                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Full Address</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={AddressRef}
                                    value={address}
                                    onChangeText={(text) => handleAddressChange(text)}
                                    style={[styles.textInput, { borderColor: !AddStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />
                            </View>

                            {!AddStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Address is required</Text>
                            )}

                        </View>


                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Zipcode</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={ZipRef}
                                    value={Zipcode}
                                    keyboardType='number-pad'
                                    maxLength={5}
                                    onChangeText={(text) => handleZipChange(text)}
                                    style={[styles.textInput, { borderColor: !ZipcodeStatus ? VALIDCOLOR : BORDERCOLOR4 }]} />
                            </View>

                            {!ZipcodeStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Zipcode is required</Text>
                            )}

                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Location (List of Hospitals / Clinics)</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    value={Location}
                                    onChangeText={(text) => setLocation(text)}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Badge number</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={BadgeRef}
                                    value={BadgeNum}
                                    onChangeText={(text) => handleBadgeChange(text)}
                                    style={styles.textInput} />
                            </View>

                            {!BadgeStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Badge number is required</Text>
                            )}
                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Practice NPI</Text>

                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={PracticeNPIRef}
                                    value={PNPI}
                                    onChangeText={(text) => setPNPI(text)}
                                    style={styles.textInput} />
                            </View>

                            {!NPIStatus && (
                                <Text style={{ color: VALIDCOLOR, top: 5 }}>Practice NPI is required</Text>
                            )}

                        </View>


                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Individual CAQH (if applicable)</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={IndividualNPIRef}
                                    value={CAQH}
                                    onChangeText={(text) => setCAQH(text)}
                                    style={styles.textInput} />
                            </View>

                        </View>

                        <View style={{ marginBottom: GlobalSize(15) }}>
                            <Text style={styles.textTitle}>Individual NPI (if applicable)</Text>
                            <View style={DEFAULTSTYLES.alignView}>
                                <TextInput
                                    ref={IndividualNPIRef}
                                    value={IndividualNPI}
                                    onChangeText={(text) => setIndividualNPI(text)}
                                    style={styles.textInput} />
                            </View>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <TouchableOpacity
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonText}>Continue</Text>
                                {/* {isLoading && <ActivityIndicato color={PUREWHITE} size={20} marginLeft={7} />} */}
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => backToSignUp()}
                                style={styles.cancelView}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CaseMgForm

const styles = StyleSheet.create({
    textSocial: {
        fontFamily: FONTS.FontSemiB,
        color: PRIMARYCOLOR,
        fontSize: fontSize(24)
    },
    textSub: {
        fontFamily: FONTS.FontMedium,
        color: PRIMARYCOLOR,
        fontSize: fontSize(16)
    },
    textDesc: {
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(14),
        color: TEXTCOLOR2
    },
    textTitle: {
        color: SECONDARYCOLOR,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        marginBottom: GlobalSize(10)
    },
    textInput: {
        borderWidth: 1,
        borderColor: BORDERCOLOR1,
        borderRadius: GlobalSize(4),
        width: DEFAULTWIDTH * 0.88,
        height: GlobalSize(50),
        paddingLeft: GlobalSize(15),
        color: TEXTCOLOR10,
        fontSize: fontSize(14)
    },
    buttonStyle: {
        borderRadius: 5,
        backgroundColor: PRIMARYCOLOR,
        marginTop: GlobalSize(15),
        width: DEFAULTWIDTH * 0.88,
        padding: GlobalSize(5),
        height: GlobalSize(48),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontFamily: 'Inter-ExtraBold',
        fontSize: fontSize(13),
        color: PUREWHITE,
    },
    cancelText: {
        fontFamily: FONTS.FontSemiB,
        fontSize: fontSize(14),
        color: PRIMARYCOLOR,
    },
    cancelView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(20),
        // marginBottom: DEFAULTWIDTH * 0.05
    },
})