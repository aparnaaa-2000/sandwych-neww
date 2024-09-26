import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ActivityIndicator,SafeAreaView,StatusBar} from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 ,BACKGROUNDWHITE} from '../../../../Constants/Colors/Colors';
import { FONTS } from "../../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from "../../../../Constants/styles/styles";
import { Check, Uncheck } from "../../../../../assets";
import { GlobalSize, fontSize } from "../../../../Constants/ResponsiveFont/ResponsiveFonts";

import { EditSupport } from "../../../../redux/thunk";

//IMPORT PACKAGES
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

//IMPORT COMPONENTS
import ErrorPopup from "../../../../Components/ComingSoonPopup/ErrorPopup";
import SuccessPopup from "../../../../Components/ComingSoonPopup/Successpopup";
import ResourceHeader from "../../../../Components/Common/Headers/ResourceHeader";

const CarepartnerEditSupport = ({ route, navigation }) => {

    const { ADLData, IADLData, SelectedSupport } = route.params;

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
    const [combinedArray, setCombinedArray] = useState([]);
    const [APILoading, setAPILoading] = useState(false);

    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.editSupport.data,
            error: state.editSupport.error,
            isLoading: state.editSupport.isLoading,
        }),
        shallowEqual
    );

    useEffect(() => {
        getData().then(data => setUserData(data));
        setADLData(ADLData);
        ADLFILTER();
        IADLFILTER();
    }, [ADLData, IADLData, data, error]);

    const ADLFILTER = () => { //FUNCTION FOR FILTER THE SUPPORT BASED ON SELECTED OR NOT (ADL)
        const mergedSupportsADL = [...(ADLData ?? []), ...(SelectedSupport) ?? []];
        const uniqueSupportsADL = mergedSupportsADL?.reduce((acc, current) => {
            const x = acc.find(item => item?.id === current?.id);
            if (!x) {
                return acc.concat({ ...current, selected: false });
            } else {
                x.selected = true;
                return acc;
            }
        }, []);
        const functionalAbilities1 = uniqueSupportsADL?.filter(item => item.functional_abilities === '1');
        setADLData(functionalAbilities1);
    };

    const IADLFILTER = () => { //FUNCTION FOR FILTER THE SUPPORT BASED ON SELECTED OR NOT (IADL)
        const mergedSupports = [...(IADLData ?? []), ...(SelectedSupport) ?? []];
        const uniqueSupports = mergedSupports?.reduce((acc, current) => {
            const x = acc.find(item => item?.id === current?.id);
            if (!x) {
                return acc.concat({ ...current, selected: false });
            } else {
                x.selected = true;
                return acc;
            }
        }, []);
        const functionalAbilities0 = uniqueSupports?.filter(item => item.functional_abilities === '0');
        setIADLData(functionalAbilities0);
    };

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

    const handleCheckBoxPressADL = item => { //CHECKBOX FUNCTION ADL
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

    const handleCheckBoxPressIADL = item => { //CHECKBOX FUNCTION FOR IADL
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

    useEffect(()=>{
        APIUpdate()
    },[data,error])

    const APIUpdate = () => { //FUNCTION AFTER UPDATING THE API AND SHOW THE RESPONSE
        if (data && combinedArray?.length > 0) {
            setLoading(false);
            setSuccessModal(true);
            setMessage('Supports updated successfully');
      
            setTimeout(() => {
                setSuccessModal(false);
                navigation.navigate('CarePartnerProfile')
            }, 2000);
     
        } else if (error && combinedArray?.length>0) {
            setLoading(false);
            setErrorModal(true);
            setMessage('An error occurred to add support');
            setTimeout(() => {
                setErrorModal(false);
            }, 2000);
           // navigation.goBack();
        }
    };

    const onsubmitSupport = () => { //FUNCTION FOR SUBMIT THE SUPPORT
        setAPILoading(true);
        const selectedItemsADL = ADL
            .filter(item => item.selected)
            .map(item => ({ id: item.id }));

        const selectedItemsIADL = IADL
            .filter(item => item?.selected)
            .map(item => ({ id: item?.id }));

        const combinedArray = [...selectedItemsADL, ...selectedItemsIADL];
        setCombinedArray(combinedArray)
        EditSupport(UserData?.id, combinedArray, Token, dispatch);
    };

    return (
        <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
        <StatusBar
          backgroundColor={BACKGROUNDWHITE}
          barStyle={'dark-content'}
          style={{ flex: 0 }}
        />
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:DEFAULTHEIGHT*0.1}}>
                <View style={styles.viewMain}>
                    <ResourceHeader navigation={navigation} title={'Edit Support'} />
                    <View style={{ paddingLeft: GlobalSize(25) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={styles.textADL}>ADL</Text>
                            </View>
                        </View>
                        <View>
                            <FlatList
                                data={ADL}
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item }) => {
                                    return (
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
                                    );
                                }}
                            />
                        </View>
                        <View>
                            <Text style={styles.textADL}>IADL</Text>
                            <View>
                                <FlatList
                                    data={IADL}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) => {
                                        return (
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
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.absoluteBtnContainer}>
                <TouchableOpacity
                    style={[styles.btnView, { opacity: selectADL?.length > 0 || selectIADL?.length > 0 ? 1 : 0.5 }]}
                    onPress={() => selectADL?.length > 0 || selectIADL?.length > 0 ? onsubmitSupport() : null}>
                    <Text style={styles.textBtn}>Submit</Text>
                    {Loading && <ActivityIndicator size={20} color={PUREWHITE} />}
                </TouchableOpacity>
            </View>
            <SuccessPopup
                Message={Message}
                ModalOpen={SuccessModal}
                setModalOpen={setSuccessModal}
            />
            <ErrorPopup
                Message={Message}
                ModalOpen={ErrorModal}
                setModalOpen={setErrorModal}
            />
        </View>
        </SafeAreaView>
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
    absoluteBtnContainer: {
        position: 'absolute',
        bottom: 20, // Adjust as needed
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CarepartnerEditSupport;
