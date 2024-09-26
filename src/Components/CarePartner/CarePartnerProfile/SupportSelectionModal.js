import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator } from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { Check, Close, Uncheck } from "../../../../assets";
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";

//IMPORT REDUX THUNK
import { AddSupport, GetDisplaySupport} from "../../../redux/thunk";

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

//IMPORT COMPONENTS
import SuccessPopup from "../../ComingSoonPopup/Successpopup";
import ErrorPopup from "../../ComingSoonPopup/ErrorPopup";

const SupportSelectionModal = ({ ModalOpen, setModalOpen, ADLData, IADLData,navigation }) => {
    
    const dispatch = useDispatch()

    const [Token, setToken] = useState(null)
    const [selectADL, setSelectADL] = useState([])
    const [selectIADL, setSelectIADL] = useState([])
    const [UserData, setUserData] = useState([])
    const [ADL, setADLData] = useState([])
    const [IADL, setIADLData] = useState([])
    const [SuccessModal, setSuccessModal] = useState(false)
    const [Message, setMessage] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [ErrorModal, setErrorModal] = useState(false)

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.addSupport.data,
            error: state.addSupport.error,
            isLoading: state.addSupport.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        getData().then(data => setUserData(data));
        setADLData(ADLData);
        setIADLData(IADLData);
        APIUpdate(); //FUNCTION AFTER THE API RESPONSE
    }, [ADLData, IADLData, data, error]);
    

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            setToken(storedValue)
            const jsonValue = await AsyncStorage.getItem('UserData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };

    

    const APIUpdate = () => {
        
        if (data && selectADL?.length > 0 || selectIADL?.length > 0) {
            setLoading(false)
            setSuccessModal(true)
            setMessage('Supports added successfully')
            GetDisplaySupport(UserData?.id, Token, dispatch)
            setTimeout(() => {
                setSuccessModal(false)
            }, 2000)
            setModalOpen(false)
            
        } else if (error && selectADL?.length > 0 || selectIADL?.length > 0) {
            setLoading(false)
            setErrorModal(true)
            setMessage('An error occured to add support')
            setTimeout(() => {
                setErrorModal(false)
            }, 2000)
            setModalOpen(false)
        }
    }

    const handleCheckBoxPressADL = item => {
        const updatedData = ADL.map(dataItem => {
            if (dataItem.id === item.id) {
                return { ...dataItem, selected: !dataItem.selected };
            }
            return dataItem;
        });

        setADLData(updatedData);
        const selectedItems = updatedData
            .filter(item => item.selected) // Filter items with selected: true
            .map(item => ({ id: item.id }));
        setSelectADL(selectedItems);
    };

    const handleCheckBoxPressIADL = item => { //FUNCTION FOR CHECKING THE SELECTED ITEMS
        const updatedData = IADL.map(dataItem => {
            if (dataItem.id === item.id) {
                return { ...dataItem, selected: !dataItem.selected };
            }
            return dataItem;
        });

        setIADLData(updatedData);

        const selectedItems = updatedData
            .filter(item => item.selected) // Filter items with selected: true
            .map(item => ({ id: item.id })); // Map each item to an object with only the id property

        setSelectIADL(selectedItems);
    };

    const combinedArray = selectADL.concat(selectIADL);

    const onsubmitSupport = () => { //SUBMIT THE SELECTED SELECTED SUPPORT ACTIVITIES
        setLoading(true)
        AddSupport(UserData?.id, combinedArray, Token, dispatch)

    }
    
    return (

        <Modal
            animationType="fade"
            transparent={true}
            visible={ModalOpen}
            onRequestClose={() => {
                setModalOpen(!ModalOpen)
            }}>
            <View style={styles.mainContainer} >
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={styles.viewMain}>

                        <View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={styles.textADL}>ADL</Text>
                                </View>

                                <TouchableOpacity onPress={() => setModalOpen(false)}>
                                    <Close />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <FlatList
                                    data={ADL}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.checkView}>

                                                <TouchableOpacity
                                                    onPress={() => handleCheckBoxPressADL(item)}
                                                    style={{ padding: 5, marginTop: 5 }}>
                                                    {item?.selected ?
                                                        <Check /> :
                                                        <Uncheck />}
                                                </TouchableOpacity>

                                                <View
                                                    style={{ marginLeft: DEFAULTWIDTH * 0.03 }}>
                                                    <Text style={styles.checkBoxText}>{item.support} </Text>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.textADL}>IADL</Text>
                            <View>
                                <FlatList
                                    data={IADL}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        return (
                                            <View style={styles.checkView}>

                                                <TouchableOpacity
                                                    onPress={() => handleCheckBoxPressIADL(item)}
                                                    style={{ padding: GlobalSize(5), marginTop: GlobalSize(5) }}>
                                                    {item?.selected ?
                                                        <Check /> :
                                                        <Uncheck />}
                                                </TouchableOpacity>

                                                <View
                                                    style={{ marginLeft: DEFAULTWIDTH * 0.03 }}>
                                                    <Text style={styles.checkBoxText}>{item.support} </Text>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>

                        <View style={DEFAULTSTYLES.alignView}>
                            <TouchableOpacity
                                style={[styles.btnView, { opacity: selectADL?.length > 0 || selectIADL?.length > 0 ? 1 : 0.5 }]}
                                onPress={() => selectADL?.length> 0 || selectIADL?.length>0 ? onsubmitSupport() : console.log("")}>
                                <Text style={styles.textBtn}>Submit</Text>
                                {Loading &&
                                    <ActivityIndicator size={20} color={PUREWHITE} />}
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>

            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal} />

            <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#000000aa",
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'flex-end'

    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: DEFAULTWIDTH * 0.02,
    },
    viewMain: {
        width: DEFAULTWIDTH,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: DEFAULTWIDTH * 0.07,
        backgroundColor: PUREWHITE,
        justifyContent: 'center',
        marginTop: GlobalSize(20),
        padding: GlobalSize(20)

    },
    btnView: {
        width: DEFAULTWIDTH * 0.7,
        height: DEFAULTWIDTH * 0.12,
        marginRight: GlobalSize(10),
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
        marginTop: GlobalSize(20),
        flexDirection: 'row'
    },
    textBtn: {
        fontSize: fontSize(13),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
        marginRight: GlobalSize(10)
    },
    checkBoxText: {
        color: TEXTCOLOR5,
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
    },
    textADL: {
        fontFamily: FONTS.FontMedium,
        color: TEXTCOLOR10,
        fontSize: fontSize(16),
        marginBottom: GlobalSize(10)
    },


});

export default SupportSelectionModal;
