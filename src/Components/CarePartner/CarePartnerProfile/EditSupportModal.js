import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View,FlatList, ScrollView, ActivityIndicator } from "react-native";

//IMPORT CONSTANTS
import { PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR5 } from '../../../Constants/Colors/Colors';
import { FONTS } from "../../../Constants/Fonts";
import DEFAULTSTYLES, { DEFAULTWIDTH } from "../../../Constants/styles/styles";
import { Check, Close, Uncheck } from "../../../../assets";
import { GlobalSize, fontSize } from "../../../Constants/ResponsiveFont/ResponsiveFonts";

//IMPORT REDUX SLICE KEYS
import { EditSupport, GetDisplaySupport } from "../../../redux/thunk";
import { EditSupportClear, EditSupportFailure, EditSupportSuccess } from "../../../redux/Slice/CaregiverProfile/EditSupportKey";

//IMPORT THIRD-PARTY PACKAGES
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

//IMPORT COMPONENTS
import SuccessPopup from "../../ComingSoonPopup/Successpopup";
import ErrorPopup from "../../ComingSoonPopup/ErrorPopup";


const EditSupportModal = ({ ModalOpen, setModalOpen, ADLData, IADLData, SelectedSupport, navigation }) => {
  
    const dispatch = useDispatch() //DISPATCH FOR CALLING THE REDUX FUNCTION

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
    const [APILoading, setAPILoading] = useState(false)


    const { data, error, isLoading } = useSelector(
        state => ({
            data: state.editSupport.data,
            error: state.editSupport.error,
            isLoading: state.editSupport.isLoading,
        }),
        shallowEqual
    );


   
useEffect(()=>{ //AFTER THE API SUCCESS
    
    if(EditSupportSuccess){
        dispatch(EditSupportClear())
    
        setModalOpen(false)
    }else{
        dispatch(EditSupportClear())
    }
},[dispatch,EditSupportSuccess,EditSupportFailure])

    useEffect(() => {
        getData().then(data => setUserData(data));
        setADLData(ADLData)       
        ADLFILTER(); //FILTER THE COMPONENTS BASED ON CHECKED AND UNCHECKED ADL
        IADLFILTER(); //FILTER THE COMPONENTS BASED ON CHECKED AND UNCHECKED IADL
    }, [ADLData, IADLData, data, error]);

    const ADLFILTER = ()=>{
        
        const mergedSupportsADL = [...(ADLData ?? []), ...(SelectedSupport) ?? []];

        //         // Remove duplicates based on ID and update color property
        const uniqueSupportsADL = mergedSupportsADL?.reduce((acc, current) => {
            const x = acc.find(item => item?.id === current?.id);
            if (!x) {
                return acc.concat({ ...current, selected: false });
            } else {
                x.selected = true;
                return acc;
            }
        }, []);

        const functionalAbilities1 = uniqueSupportsADL?.filter(item => item.functional_abilities === '1')
        setADLData(functionalAbilities1);
    }

    const IADLFILTER = ()=>{
        
        const mergedSupports = [...(IADLData ?? []), ...(SelectedSupport) ?? []];

        //         // Remove duplicates based on ID and update color property
        const uniqueSupports = mergedSupports?.reduce((acc, current) => {
            const x = acc.find(item => item?.id === current?.id);
            if (!x) {
                return acc.concat({ ...current, selected: false });
            } else {
                x.selected = true;
                return acc;
            }
        }, []);

        const functionalAbilities0 = uniqueSupports?.filter(item => item.functional_abilities === '0')
        setIADLData(functionalAbilities0);
    }

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            setToken(storedValue)
            const jsonValue = await AsyncStorage.getItem('UserData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            // setLoading(false)
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };

   
    const handleCheckBoxPressADL = item => { //FUNCTION FOR HANDLING THE CHECKBOX OF ADL
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

    const handleCheckBoxPressIADL = item => { //FUNCTION FOR HANDLING THE CHECKBOX OF IADL
    
        const updatedData = IADL.map(dataItem => {
            if (dataItem.id === item.id) {
                const dataI = { ...dataItem, selected: !dataItem.selected }

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



    const onsubmitSupport = () => { //FUNCTION FOR SUBMIT THE SELECTED SUPPORT ITEMS
    
        setAPILoading(true)
        const selectedItemsADL = ADL
            // Filter items with selected: true
            .filter(item => item.selected)
            .map(item => ({ id: item.id }));


        const selectedItemsIADL = IADL
            // Filter items with selected: true
            .filter(item => item?.selected)
            .map(item => ({ id: item?.id }));


        const combinedArray = [...selectedItemsADL, ...selectedItemsIADL];
      
        EditSupport(UserData?.id, combinedArray, Token, dispatch) //API FUNCTION FOR UPDATE THE SUPPORT

        GetDisplaySupport(UserData?.id, Token, dispatch) //CALLING THE GETSUPPORT API AFTER EDIT

        setModalOpen(false)
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
                                onPress={() => selectADL?.length > 0 || selectIADL?.length > 0 ? onsubmitSupport() : console.log("")}>
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

export default EditSupportModal;
