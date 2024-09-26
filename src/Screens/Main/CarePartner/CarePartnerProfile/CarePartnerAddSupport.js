import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator } from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../../Constants/Colors/Colors';
import { FONTS } from "../../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../../Constants/styles/styles";
import { Check, Uncheck } from "../../../../../assets";
import { GlobalSize, fontSize } from "../../../../Constants/ResponsiveFont/ResponsiveFonts";

import { AddSupport} from "../../../../redux/thunk";

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

//IMPORT COMPONENTS
import ErrorPopup from "../../../../Components/ComingSoonPopup/ErrorPopup";
import SuccessPopup from "../../../../Components/ComingSoonPopup/Successpopup";
import ResourceHeader from "../../../../Components/Common/Headers/ResourceHeader";

const Addsupport = ({ route, navigation }) => {

    const { ADLData, IADLData } = route.params;

    const dispatch = useDispatch();

    const [Token, setToken] = useState(null);
    const [selectADL, setSelectADL] = useState([]);
    const [selectIADL, setSelectIADL] = useState([]);
    const [UserData, setUserData] = useState([]);
    const [ADL, setADLData] = useState([]);
    const [IADL, setIADLData] = useState([]);
    const [SuccessModal, setSuccessModal] = useState(false);
    const [Message, setMessage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [ErrorModal, setErrorModal] = useState(false);

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
        APIUpdate();
    }, [ADLData, IADLData, data, error]);

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            setToken(storedValue);
            const jsonValue = await AsyncStorage.getItem('UserData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };

    useEffect(() => {
        APIUpdate();
    }, [data, error]);

    const APIUpdate = () => { //FUNCTION AFTER SHOWING THE API RESPONSE
        if (data && (selectADL.length > 0 || selectIADL.length > 0)) {
            setLoading(false);
            setSuccessModal(true);
            setMessage('Supports added successfully');
        
            setTimeout(() => {
                setSuccessModal(false);
                navigation.navigate('CarePartnerProfile')
            }, 2000);
      
        } else if (error && (selectADL.length > 0 || selectIADL.length > 0)) {
            setLoading(false);
            setErrorModal(true);
            setMessage('An error occurred to add support');
            setTimeout(() => {
                setErrorModal(false);
            }, 2000);
           
        }
    };

    const handleCheckBoxPressADL = item => { //FUNCTION FOR HANDLE THE CHECKBOX OF ADL
        const updatedData = ADL.map(dataItem => {
            if (dataItem.id === item.id) {
                return { ...dataItem, selected: !dataItem.selected };
            }
            return dataItem;
        });

        setADLData(updatedData);
        const selectedItems = updatedData
            .filter(item => item.selected)
            .map(item => ({ id: item.id }));
        setSelectADL(selectedItems);
    };

    const handleCheckBoxPressIADL = item => { //FUNCTION FOR HANDLE THE CHECKBOX OF IADL
        const updatedData = IADL.map(dataItem => {
            if (dataItem.id === item.id) {
                return { ...dataItem, selected: !dataItem.selected };
            }
            return dataItem;
        });

        setIADLData(updatedData);
        const selectedItems = updatedData
            .filter(item => item.selected)
            .map(item => ({ id: item.id }));
        setSelectIADL(selectedItems);
    };

    const combinedArray = selectADL.concat(selectIADL);

    const onsubmitSupport = () => { //FUNCTION FOR ADDING SUPPORT
        setLoading(true);
        AddSupport(UserData?.id, combinedArray, Token, dispatch);
    };

 
    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:DEFAULTHEIGHT*0.1}}>
                
                <View style={styles.viewMain}>
                <ResourceHeader navigation={navigation} title={'Add Support'} />
                <View style={{ paddingLeft: GlobalSize(25) }}>
                    <View>
            
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.textADL}>ADL</Text>
                            </View>
                            {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Close />
                            </TouchableOpacity> */}
                        </View>
                        <View>
                            <FlatList
                                data={ADL}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.checkView}>
                                        <TouchableOpacity
                                            onPress={() => handleCheckBoxPressADL(item)}
                                            style={{ padding: 5, marginTop: 5 }}>
                                            {item?.selected ? <Check /> : <Uncheck />}
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: DEFAULTWIDTH * 0.03 }}>
                                            <Text style={styles.checkBoxText}>{item.support}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textADL}>IADL</Text>
                        <View>
                            <FlatList
                                data={IADL}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={styles.checkView}>
                                        <TouchableOpacity
                                            onPress={() => handleCheckBoxPressIADL(item)}
                                            style={{ padding: GlobalSize(5), marginTop: GlobalSize(5) }}>
                                            {item?.selected ? <Check /> : <Uncheck />}
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: DEFAULTWIDTH * 0.03 }}>
                                            <Text style={styles.checkBoxText}>{item.support}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                        </View>
                    </View>
                </View>
                </View>
            </ScrollView>
            <View style={styles.absoluteBtnContainer}>
                <TouchableOpacity
                    style={[styles.btnView, { opacity: selectADL.length > 0 || selectIADL.length > 0 ? 1 : 0.5 }]}
                    onPress={() => (selectADL.length > 0 || selectIADL.length > 0) ? onsubmitSupport() : null}>
                    <Text style={styles.textBtn}>Submit</Text>
                    {Loading && <ActivityIndicator size={20} color={PUREWHITE} />}
                </TouchableOpacity>
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
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: PUREWHITE,
    },
    checkView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: DEFAULTWIDTH * 0.02,
    },
    viewMain: {
        width: DEFAULTWIDTH,
        paddingTop: DEFAULTWIDTH * 0.04,
        backgroundColor: PUREWHITE,
        justifyContent: 'center',
        //padding: GlobalSize(20),
    },
    btnView: {
        width: DEFAULTWIDTH * 0.7,
        height: DEFAULTWIDTH * 0.12,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(4),
        flexDirection: 'row',
    },
    textBtn: {
        fontSize: fontSize(13),
        color: PUREWHITE,
        fontWeight: '700',
        fontFamily: FONTS.FontMedium,
        textAlign: 'center',
        marginRight: GlobalSize(10),
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
        marginBottom: GlobalSize(10),
    },
    absoluteBtnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: GlobalSize(20),
    },
});

export default Addsupport;
