import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { BORDERCOLOR1, PUREBLACK ,PRIMARYCOLOR,BORDERCOLOR4,PUREWHITE, TEXTCOLOR10} from '../../../Constants/Colors/Colors'
import { FONTS } from '../../../Constants/Fonts'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles'

const MoneyResource = ({ selectId2, setSelectId2,textValue,setTextValue }) => {

    const OnChooseQuest2 = (ItemId) => {
        setSelectId2(ItemId)
    }

    return (
        <View style={styles.borderCard}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => OnChooseQuest2(1)}
                >
                    <View
                        style={[
                            styles.radioIcon,
                            selectId2 == '1' && styles.radioIconSelected,
                        ]}>
                        {selectId2 == '1' && <View style={styles.radioBorder} />}
                    </View>
                </TouchableOpacity>

                <Text style={styles.textDesc}>Unemployed</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => OnChooseQuest2(2)}
                >
                    <View
                        style={[
                            styles.radioIcon,
                            selectId2 == '2' && styles.radioIconSelected,
                        ]}>
                        {selectId2 == '2' && <View style={styles.radioBorder} />}
                    </View>
                </TouchableOpacity>

                <Text style={styles.textDesc}>Part-time or temporary work</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => OnChooseQuest2(3)}
                >
                    <View
                        style={[
                            styles.radioIcon,
                            selectId2 == '3' && styles.radioIconSelected,
                        ]}>
                        {selectId2 == '3' && <View style={styles.radioBorder} />}
                    </View>
                </TouchableOpacity>

                <Text style={[styles.textDesc,{marginRight:GlobalSize(50)}]}>Otherwise unemployed but not seeking work (e.g., student, retired, disabled, unpaid primary caregiver).</Text>
            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => OnChooseQuest2(4)}
                >
                    <View
                        style={[
                            styles.radioIcon,
                            selectId2 == '4' && styles.radioIconSelected,
                        ]}>
                        {selectId2 == '4' && <View style={styles.radioBorder} />}
                    </View>
                </TouchableOpacity>

                <TextInput
                        value={textValue}
                        editable={selectId2 == '4' ? true : false}
                        onChangeText={(text) => setTextValue(text)}
                        style={styles.inputCard}
                    />

            </View>

            <View style={{flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.radioButton}
                    onPress={() => OnChooseQuest2(5)}
                >
                    <View
                        style={[
                            styles.radioIcon,
                            selectId2 == '5' && styles.radioIconSelected,
                        ]}>
                        {selectId2 == '5' && <View style={styles.radioBorder} />}
                    </View>
                </TouchableOpacity>

                <Text style={styles.textDesc}>I chose not to answer this question</Text>
            </View>
            

        </View>
    )
}

export default MoneyResource

const styles = StyleSheet.create({
    textDesc: {
        color: PUREBLACK,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
       // marginBottom: GlobalSize(10)
    },
    borderCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(5),
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.885,
        // alignItems: 'center',
        // justifyContent: 'center',
        padding: GlobalSize(10),
        marginBottom: GlobalSize(10)
    },
    radioBorder: {
        width: GlobalSize(10),
        height: GlobalSize(10),
        borderRadius: GlobalSize(5),
        borderWidth: 2,
        borderColor: PRIMARYCOLOR,
        backgroundColor: PRIMARYCOLOR,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: GlobalSize(8),
        marginRight: GlobalSize(3.5)
    },
    radioIcon: {
        marginLeft: GlobalSize(10),
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderWidth: 2,
        borderColor: BORDERCOLOR4,
        marginRight: GlobalSize(8),
        backgroundColor: PUREWHITE,
    },
    radioIconSelected: {
        backgroundColor: PUREWHITE,
        width: GlobalSize(20),
        height: GlobalSize(20),
        borderRadius: GlobalSize(10),
        borderColor: PRIMARYCOLOR,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputCard: {
        borderWidth: 1,
        borderRadius: GlobalSize(4),
        borderColor: BORDERCOLOR1,
        width: DEFAULTWIDTH * 0.67,
        height: GlobalSize(40),
        paddingLeft: GlobalSize(12),
        color: TEXTCOLOR10,
        fontFamily: FONTS.FontRegular,
        fontSize: fontSize(12),
        marginTop:GlobalSize(10)
    }
})