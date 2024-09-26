import React, { useState } from "react";
import { Modal, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, FlatList } from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLORW } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import { Check, Close, Uncheck } from "../../../../assets";
import { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";

const AccessModal = ({
    SubmitAccessRoles,
    ModalOpen,
    setModalOpen,
    GrantData,
    setGrantData,
    selectedId,
    users,
    setUsers,
    PatientaccessFiles,
    setAccessId
}) => {

    const [AllSelect, setAllSelect] = useState(false)

    const [data, setData] = useState(PatientaccessFiles);
 

    const CloseModal = () => { //To close the Delete Modal
        if (GrantData?.length > 0) {
            const updatedItems = data.map(item => ({ ...item, selected: false }));
            setData(updatedItems);
            setAllSelect(false)
            const updatedUsers = users.map(item => {
                if (item.id === selectedId) {
                    return { ...item, selected: true };
                } else {
                    return item;
                }
            });
            setUsers(updatedUsers)
     
            setModalOpen(false)
        } else {

        }
    }

    // Function to toggle selection of individual items
    const toggleSelection = (id) => {
        const updatedItems = data?.map((item) =>
            item?.id === id ? { ...item, isSelected: !item?.isSelected } : item)
        const isSelectData = updatedItems?.filter((item) => item?.isSelected == true).map((item) => item?.id)

        setAccessId(isSelectData)
        setData(updatedItems)
        updateSelectAllState(updatedItems)

    };

    const updateSelectAllState = (updatedItems) => { //FUNCTION FOR SELECTING ALL ITEMS
        const allSelected = updatedItems.every((item) => item?.isSelected);
        setAllSelect(allSelected);
    };

    // Function to select all items
    const selectAll = () => {
        const updatedSelectAll = !AllSelect;
        setAllSelect(updatedSelectAll);
        const updatedItems = data.map((item) => ({ ...item, isSelected: updatedSelectAll }))
        const isSelectData = updatedItems?.filter((item) => item?.isSelected == true).map((item) => item?.id)
        
        setAccessId(isSelectData)
        setData(updatedItems)
        setGrantData(updatedItems)
    };


    const handleAllowPress = () => { //ALLOW ALL THE ACCESS AND CALLING THE API
        SubmitAccessRoles();
        setData(data.map(item => ({ ...item, isSelected: false })));
        setModalOpen(false);
        selectAll()
    };

    // Render item for FlatList
    const renderItem = ({ item }) => (

        <TouchableOpacity
            style={[styles.item, item?.isSelected && styles.selectedItem]}
            onPress={() => toggleSelection(item?.id)}>
            <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center' }}>
                {item.isSelected ?
                    <Check /> :
                    <Uncheck />}

                <Text style={styles.textCode}>{item?.access_data_name}</Text>
            </View>
        </TouchableOpacity>
    );

    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalOpen}
            onRequestClose={() => {
                setModalOpen(!ModalOpen)
            }}>
            <TouchableWithoutFeedback>
                <View style={styles.mainContainer} >
                    <View style={styles.viewMain} onPress={() => CloseModal()}>
                        <View>

                            <View style={styles.rowView}>
                                <View style={{ marginBottom: GlobalSize(15) }}>
                                    <Text style={styles.textDR}>Give permissions to access the data</Text>
                                </View>

                                <TouchableOpacity onPress={() => setModalOpen(false)}>
                                    <Close />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', marginBottom: GlobalSize(10) }}>
                                <TouchableOpacity onPress={() => selectAll()}>
                                    {AllSelect ?
                                        <Check /> :
                                        <Uncheck />}
                                </TouchableOpacity>
                                <Text style={styles.textCode}>All</Text>
                            </View>

                            <FlatList
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>

                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                            <TouchableOpacity style={styles.btnView} 
                            onPress={() => {handleAllowPress()}}>
                                <Text style={styles.textBtn}>Allow</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

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
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: GlobalSize(15)
    },
    viewMain: {
        width: DEFAULTWIDTH * 0.88,
        borderRadius: GlobalSize(10),
        paddingTop: DEFAULTHEIGHT * 0.03,
        backgroundColor: PUREWHITE,
        paddingLeft: DEFAULTWIDTH * 0.07,
        paddingBottom: GlobalSize(20)
    },
    btnView: {
        width: DEFAULTWIDTH * 0.3,
        height: DEFAULTWIDTH * 0.1,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
    },
    textBtn: {
        fontSize: GlobalSize(14),
        color: PUREWHITE,
        fontWeight: '500',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
    },
    textCode: {
        marginLeft: GlobalSize(10),
        fontSize: fontSize(12),
        color: TEXTCOLORW,
        fontFamily: FONTS.FontRegular
    },
    textDR: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(13),
        color: PRIMARYCOLOR
    },
    viewDisplay: {
        padding: GlobalSize(7),
        backgroundColor: PRIMARYCOLOR,
        borderRadius: GlobalSize(15),
        alignItems: 'center',
        justifyContent: 'center',
        margin: GlobalSize(10),
        paddingLeft: GlobalSize(10),
        paddingRight: GlobalSize(10)
    },
    textDT: {
        fontSize: fontSize(12),
        color: PUREWHITE,
        fontFamily: FONTS.FontMedium
    },
    textView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: GlobalSize(10),
        marginBottom: GlobalSize(10)
    },
    viewTime: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: GlobalSize(10)
    }

});

export default AccessModal;
