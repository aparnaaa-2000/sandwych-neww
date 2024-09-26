import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    ScrollView
} from 'react-native';

//COMPONENT IMPORTED
import ATHFlatList from '../../../../../Components/CarePartner/Assessments/AbilityToHelp/ATHFlatList';

// CONSTANT HEADINGS
import { ATHDATA1, ATHDATA2, MANTDATA1, MEDSASSIST, SAFETY, SDOH } from '../../../../../Constants/RequiredArrays';

// COLORS IMPORTED GLOBALLY
import {
    BACKGROUNDWHITE,
    BORDERCOLOR4,
    TEXTCOLOR5,
    TEXTCOLOR7,
    TEXTCOLOR8,
} from '../../../../../Constants/Colors/Colors';
import { FONTS } from '../../../../../Constants/Fonts';
import { Button } from 'react-native-paper';

//CONTSTANT TEXTS
import {
    AbilityToHelpHeading1,
    AbilityToHelpHeading2,
    AbilityToHelpSubHeading1,
    AbilityToHelpSubHeading2,
    MANTHeading,
    MEDSASSISTHeading,
    SAFETYHEADING,
    SDOHHeading,
} from '../../../../../Constants/Texts';

import { DEFAULTWIDTH } from '../../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../../Constants/ResponsiveFont/ResponsiveFonts';


const ADLList = ({
    filteredQuestions,
    ADLItems,
    setADLItems,
    selectedItems,
    setSelectedItems }) => {

    const [Data, setData] = useState(filteredQuestions)

    //SELECTING ITEMS
    const toggleSelection = item => { //FUNCTION FOR SELECTION THE CARDS

        const exists = selectedItems.some(selectedItem => selectedItem.id === item.id);
        if (exists) {
            // Remove item from array
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
        } else {
            // Add item to array
            setSelectedItems([...selectedItems, item]);
            setADLItems([...selectedItems, item]);
        }

    };


    const checkItemExists = (item) => { //FUNCTION FOR CHECK THE ITEM IS ALREADY SELECTED OR NOT
        return selectedItems?.some(
            (element) => element.id === item.id && element.page_name === item.page_name
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.heading}>Help needed? </Text>
                    <Text style={styles.subHeading}>How much help is needed?</Text>

                    <View>
                        <FlatList
                            data={filteredQuestions}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {

                                return (
                                    <ATHFlatList
                                        item={item}
                                        isSelected={checkItemExists(item)}
                                        onSelect={toggleSelection}
                                        setSelectedItems={setSelectedItems}
                                    />
                                )
                            }
                            }
                            keyExtractor={item => item.id}
                            numColumns={2}
                        />
                    </View>
                </ScrollView>


            </View>
        </SafeAreaView>
    );
};

const styles = new StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: GlobalSize(8),
        backgroundColor: BACKGROUNDWHITE,
    },
    heading: {
        fontSize: fontSize(26),
        fontFamily: FONTS.FontBold,
        color: TEXTCOLOR8,
        marginLeft: GlobalSize(7),
        marginTop: GlobalSize(10),
    },
    subHeading: {
        color: TEXTCOLOR5,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
        marginLeft: GlobalSize(7),
        marginBottom: '5%',
    },
    buttonStyle: {
        width: DEFAULTWIDTH * 0.29,
        height: GlobalSize(40),
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        borderRadius: GlobalSize(8),
    },
    buttonTextStyle: {
        color: TEXTCOLOR7,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
    },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: GlobalSize(10),
        marginTop: GlobalSize(20)
    }
});

export default ADLList;
