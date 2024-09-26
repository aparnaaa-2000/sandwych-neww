import React, { useState,useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput, FlatList } from "react-native";
import { PRIMARYCOLOR, PUREWHITE, THIRDCOLOR, TEXTCOLOR11, TEXTCOLORRS, BORDERCOLOR4, PLACEHOLDERCOLOR2 } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";


const LangModal = ({ ModalOpen, setModalOpen, setLanguage, Language,selectedItems,setSelectedItems,LanguageId,setLanguageId,}) => {

    const [textSearch, setTextSearch] = useState('')
    const [filteredLanguages, setFilteredLanguages] = useState(Language);
  

    useEffect(() => {
        setFilteredLanguages(Language?.filter(item => 
            item?.language?.toLowerCase().includes(textSearch?.toLowerCase())
        ));
    }, [textSearch, Language]);

    const handleSelect = (item) => {
        setLanguageId(prevSelectedItems => {
            if (prevSelectedItems?.includes(item.id)) {
                setSelectedItems(prevSelectedItems => prevSelectedItems.filter(i => i.id !== item.id));
                return prevSelectedItems?.filter(id => id !== item.id);
            } else {
                setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
                return [...prevSelectedItems, item.id];
            }
        });
    };

console.log("selectedItems..................",LanguageId,selectedItems)
    const renderItem = ({ item }) => {
        const isSelected = LanguageId?.includes(item.id);
        return (
            <TouchableOpacity 
                style={[styles.card, DEFAULTSTYLES.iosShadow, isSelected && styles.selectedCard]}
                onPress={() => handleSelect(item)}
            >
                <Text style={[styles.textC, isSelected && styles.selectedText]}>{item?.language}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalOpen}
            onRequestClose={() => {
                setModalOpen(!ModalOpen)
            }}>
            <View style={styles.mainContainer} >
                <View style={styles.viewMain}>

                    <View style={{marginTop:GlobalSize(70)}}>
                        <TextInput
                            value={textSearch}
                            style={styles.textIn}
                            maxLength={12}
                            placeholder="Search langauge..."
                            placeholderTextColor={PLACEHOLDERCOLOR2}
                            onChangeText={(text) => setTextSearch(text)} />
                    </View>

                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={filteredLanguages}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItem}
                            ListEmptyComponent={
                                <Text
                                  style={styles.textNo}>
                                  No languages available
                                </Text>
                             } />
                    </View>

                    <View>
                        <TouchableOpacity style={styles.btnView} 
                        onPress={()=>setModalOpen(false)}>
                    <Text style={styles.textBtn}>Submit</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        elevation: 5,
        backgroundColor: PUREWHITE,
        width: DEFAULTWIDTH * 0.78,
        paddingLeft: GlobalSize(10),
        paddingTop:GlobalSize(10),
        paddingBottom:GlobalSize(5),
        margin:GlobalSize(5),
        alignItems:'flex-start',
        borderRadius:GlobalSize(8),
    
    },
    textBtn: {
        fontSize: 14,
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    textCancel: {
        fontFamily: FONTS.FontMedium,
        fontSize: 14,
        color: THIRDCOLOR,
        fontWeight: '700'
    },
    textC: {
        fontSize: 14,
        fontFamily: FONTS.FontRegular,
        color: TEXTCOLOR11,
        textAlign: 'left',
        marginBottom: DEFAULTWIDTH * 0.02
    },
    touchBtn: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.22,
        height: DEFAULTWIDTH * 0.11,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.90,
        borderRadius: 10,
        paddingTop: DEFAULTWIDTH * 0.05,
        backgroundColor: PUREWHITE,
        alignItems: 'center',
        justifyContent: 'center',
        height:DEFAULTHEIGHT*0.6,
        paddingBottom:GlobalSize(90),
        paddingTop:GlobalSize(70)
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginLeft: DEFAULTWIDTH * 0.42,
        marginTop: DEFAULTWIDTH * 0.025
    },
    textIn: {
        color: TEXTCOLORRS,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontRegular,
        borderWidth: 1,
        borderColor: BORDERCOLOR4,
        borderRadius: GlobalSize(8),
        marginBottom: DEFAULTHEIGHT * 0.01,
        paddingLeft: GlobalSize(10),
        width: DEFAULTWIDTH * 0.78,
        height: GlobalSize(50),


    },
    selectedText:{
        color:PRIMARYCOLOR,
    },
    textNo:{
        fontSize:fontSize(12),
        fontWeight: '400',
        color: '#000',
      },
    selectedCard:{
        borderColor:PRIMARYCOLOR,
        borderWidth:1.5,
        borderRadius:GlobalSize(8)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.78,
        height: DEFAULTWIDTH * 0.125,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
        marginBottom: GlobalSize(50),
        flexDirection: 'row',
        marginTop:GlobalSize(15)
    },
    textBtn: {
        fontSize: GlobalSize(12),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },

});

export default LangModal;