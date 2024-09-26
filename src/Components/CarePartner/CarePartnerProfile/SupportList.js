import React, { useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

//IMPORT PACKAGES
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

//IMPORT COMPONENTS
import SupportListing from '../../Common/Profile/SupportListing'
import SupportSelectionModal from './SupportSelectionModal'
import SupportListIADL from '../../Common/Profile/SupportListIADL'

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts'
import { PRIMARYCOLOR, PUREBLACK, PUREWHITE } from '../../../Constants/Colors/Colors'
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../Constants/styles/styles'
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts'
import { OrangePen } from '../../../../assets'

//IMPORT REDUX THUNK
import {GetSupportList } from '../../../redux/thunk'

const SupportList = ({ navigation, dataDisplaySupport }) => {

    const dispatch = useDispatch()

    const [ADLData, setADLData] = useState()
    const [IADLData, setIADLData] = useState()
    const [ModalOpen, setModalOpen] = useState(false)
    const [token, setToken] = useState(null)

    const { dataSupportList, errorSupportList, isLoadingSupportList, editData } = useSelector(
        state => ({
            dataSupportList: state.getSupportList.data,
            errorSupportList: state.getSupportList.error,
            isLoadingSupportList: state.getSupportList.isLoading,
            editData: state.editSupport.data,
        }),
        shallowEqual
    );

    useFocusEffect(
        useCallback(() => {
            
            const fetchData = async () => {
                try {
                    const storedValue = await AsyncStorage.getItem('TOKENAuth');
                    console.log('Token retrieved:', storedValue);  // Debugging statement
                    if (storedValue) {
                        setToken(storedValue)
                        dispatch(GetSupportList(storedValue))
                    }
                } catch (e) {
                    console.error('Error retrieving data:', e);
                }
            };

            fetchData();

            return () => {
                // Any necessary cleanup actions
            };
        }, [dispatch])
    );

    const functionalAbilities0 = dataSupportList?.data?.filter(item => item.functional_abilities === '0') //FUNCTION FOR FILTER THE LIST BASED ON IADL/ADL
    const functionalAbilities1 = dataSupportList?.data?.filter(item => item.functional_abilities === '1')

    return (
        <View>
            {isLoadingSupportList ? (
                <View style={{ marginTop: DEFAULTHEIGHT * 0.25 }}>
                    <ActivityIndicator size={25} color={PRIMARYCOLOR} />
                </View>
            ) : (
                <View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{ marginBottom: DEFAULTHEIGHT * 0.1 }}>
                        {dataDisplaySupport && (
                            <View>
                                <View style={styles.viewText}>
                                    <Text style={styles.textSupport}>Supports which caregiver can provide to patient</Text>
                                    <TouchableOpacity
                                        onPress={() => 
                                            navigation.navigate('CarepartnerEditSupport',
                                            {
                                                ADLData:functionalAbilities1,
                                                IADLData: functionalAbilities0,
                                                SelectedSupport:dataDisplaySupport,
                                                setADLData:setADLData,
                                                setIADLData :setIADLData
                                            }
                                        )}
                                        style={{ marginLeft: DEFAULTWIDTH * 0.06 }}>
                                        <OrangePen width={24} height={24} />
                                    </TouchableOpacity>
                                </View>
                                <View style={DEFAULTSTYLES.alignView}>
                                    <SupportListing
                                        data={dataDisplaySupport}
                                        Title={'Activities of Daily Living'} />
                                    <SupportListIADL
                                        data={dataDisplaySupport}
                                        Title={'Instrumental Activities of Daily Living'} />
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    {!dataDisplaySupport && (
                        <View style={styles.viewPost}>
                            <TouchableOpacity style={styles.touchBtn}
                             onPress={() => navigation.navigate('CarepartnerSupportAdd',{
                                ADLData:functionalAbilities1,
                                IADLData:functionalAbilities0,
                                setADLData:setADLData,
                                setIADLData:setIADLData
                             }
                             )}>
                                <Text style={styles.textBtn}>+</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <SupportSelectionModal
                        ModalOpen={ModalOpen}
                        setModalOpen={setModalOpen}
                        navigation={navigation}
                        ADLData={functionalAbilities1}
                        IADLData={functionalAbilities0}
                        setADLData={setADLData}
                        setIADLData={setIADLData} />
                        
            
                </View>
            )}
        </View>
    )
}

export default SupportList

const styles = StyleSheet.create({
    textSupport: {
        fontFamily: FONTS.FontRegular,
        color: PUREBLACK,
        fontSize: fontSize(12)
    },
    textBtn: {
        fontSize: fontSize(24),
        color: PUREWHITE,
        fontFamily: FONTS.FontLight,
    },
    touchBtn: {
        marginBottom: DEFAULTWIDTH * 0.05,
        width: DEFAULTWIDTH * 0.12,
        height: DEFAULTWIDTH * 0.12,
        backgroundColor: PRIMARYCOLOR,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: GlobalSize(8),
        marginLeft: GlobalSize(10),
        marginRight: GlobalSize(10),
    },
    viewPost: {
        position: 'absolute',
        left: 0,
        right: GlobalSize(9),
        bottom: GlobalSize(10),
        alignItems: 'flex-end'
    },
    viewText: {
        marginLeft: DEFAULTWIDTH * 0.05,
        marginBottom: GlobalSize(10),
        flexDirection: 'row'
    }
})
