import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'

//IMPORT CONSTANTS
import { BACKGROUNDWHITE, BORDERCOLOR2, GREYBACKGROUND1, LINECOLOR1, PLACEHOLDERCOLOR3, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { ArrowF, BlackDots, LogoSmall } from '../../../../../assets';
import { FONTS } from '../../../../Constants/Fonts';
import { GlobalSize, fontSize, height, width } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import About from '../../../../Components/Common/Profile/About';
import ProfessionalInfo from '../../../../Components/CarePartner/CarePartnerProfile/ProfessionalInfo';
import PatientList from '../../../../Components/CarePartner/CarePartnerProfile/PatientList';
import SupportList from '../../../../Components/CarePartner/CarePartnerProfile/SupportList';
import CarePartnerDetails from '../../../../Components/CarePartner/CarePartnerProfile/CarePartnerDetails';

//IMPORT PACKAGES
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GetCaregiverDetails, GetDisplaySupport, GetPatientList, GetSupportList } from '../../../../redux/thunk';



export default function CarePartnerProfile({ navigation }) {

    const [EditProfile, setEditProfile] = useState(false)
    const [UserData, setUserData] = useState()

    const JourneyItems = [
        {
            id: 1,
            Title: 'Details'
        },
        {
            id: 2,
            Title: 'Support'
        },
        {
            id: 3,
            Title: 'Patients'
        },

    ]

    const [itemState, setItemState] = useState(1)
    const [token, setToken] = useState(null)

    const dispatch = useDispatch()


    const { data, error, isLoading, dataPatientList, errorPatientList, isLoadingPatientList,
        dataDisplaySupport, errorDisplaySupport, isLoadingDisplaySupport ,dataSupportList} = useSelector(
            state => ({
                data: state.caregiverDetails.data,
                error: state.caregiverDetails.error,
                isLoading: state.caregiverDetails.isLoading,
                dataPatientList: state.getPatientList.data,
                errorPatientList: state.getPatientList.error,
                isLoadingPatientList: state.getPatientList.isLoading,
                dataDisplaySupport: state.getDisplaySupport.data,
                errorDisplaySupport: state.getDisplaySupport.error,
                isLoadingDisplaySupport: state.getDisplaySupport.isLoading,
                dataSupportList: state.getSupportList.data,
                errorSupportList: state.getSupportList.error,
                isLoadingSupportList: state.getSupportList.isLoading,
            }),
            shallowEqual
        );

    useEffect(() => {
        const fetchData = async () => {
          const data = await getData();
    
            GetDisplaySupport(data?.id, token, dispatch) //FUNCTION FOR LIST THE SUPPORT
            
            setUserData(data)
    
        };
      
        // Fetch data when the component mounts and when `token` changes
        fetchData();

        // Add event listener for focus event
        const unsubscribe = navigation.addListener('focus', () => {
          fetchData(); // Call API when screen is focused
          setEditProfile(false)
        });
      
        // Clean up event listener
        return () => {
          unsubscribe();
        };
      }, [navigation,token]); // Add token if it's a dependency



    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            setToken(storedValue)
            GetCaregiverDetails(storedValue, dispatch)
            GetSupportList(storedValue,dispatch)
            GetPatientList(storedValue, dispatch)
            const jsonValue = await AsyncStorage.getItem('UserData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
            // setLoading(false)
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };


    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar backgroundColor={BACKGROUNDWHITE} barStyle={'dark-content'} style={{ flex: 0 }} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

                    <View style={styles.flexView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ marginRight: GlobalSize(10) }}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <ArrowF height={height(22)} width={width(22)} />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <LogoSmall />
                            </View>

                        </View>

                        <View>
                        </View>


                        <View>

                            <TouchableOpacity
                                onPress={() => setEditProfile(!EditProfile)}
                                style={{ padding: GlobalSize(10) }}>
                                <BlackDots />
                            </TouchableOpacity>
                        </View>


                    </View>

                    {EditProfile && (

                        <View style={styles.popupLayout} >
                            <TouchableOpacity
                                style={[styles.selectView, { width: DEFAULTWIDTH * 0.4 }]}

                                onPress={() => navigation.navigate('CarePartnerEditProfile')}>
                                <Text style={styles.textTitle}>Edit Profile</Text>
                            </TouchableOpacity>

                        </View>

                    )}
                    <View>
                        <CarePartnerDetails />
                    </View>
                    <View style={styles.tabView}>
                        <View style={styles.cardView}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {JourneyItems?.map((item) => {
                                    return (

                                        <TouchableOpacity
                                            style={itemState == item.id ?
                                                styles.selectView :
                                                styles.unselectView}
                                            onPress={() => setItemState(item.id)}>
                                            <Text style={styles.textTitle}>{item.Title}</Text>
                                        </TouchableOpacity>

                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={DEFAULTSTYLES.alignView}>
                        <View style={styles.lineView} />
                    </View>

                    {itemState == 1 ?
                        <View>
                            {isLoading  ?
                                <View style={{ marginTop: DEFAULTHEIGHT * 0.25 }}>
                                    <ActivityIndicator size={25} color={PRIMARYCOLOR} />
                                </View> :
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <View>
                                        <View style={styles.bottomView}>

                                            <About
                                                Title={'Personal Info'}
                                                Edit={false}
                                                Gender={'Female'}
                                                DOB={null}
                                                data={data}
                                            />
                                        </View>

                                        <View style={styles.bottomView}>
                                            <ProfessionalInfo />
                                        </View>
                                    </View>
                                </ScrollView>}
                        </View> :
                        itemState == 2 ?
                            <View>
                                <SupportList navigation={navigation} dataDisplaySupport={dataDisplaySupport} />
                            </View> :

                            <View>
                                <PatientList data={dataPatientList} />
                            </View>}

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: DEFAULTWIDTH * 0.05,
        marginRight: DEFAULTWIDTH * 0.03,
        marginBottom: DEFAULTHEIGHT * 0.02
    },
    textTitle: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: TEXTCOLOR7
    },
    popupLayout: {
        alignItems: 'flex-end',
        top: GlobalSize(35),
        right: GlobalSize(10),
        position: 'absolute',
    },
    cardView: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.9,
        padding: GlobalSize(5),
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR2,
        borderWidth: 1,
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: GREYBACKGROUND1,
        paddingLeft: DEFAULTWIDTH * 0.05,
        paddingRight: DEFAULTWIDTH * 0.05
    },
    lineView: {
        width: DEFAULTWIDTH * 0.88,
        height: 1,
        backgroundColor: LINECOLOR1,
        marginBottom: DEFAULTHEIGHT * 0.02
    },
    selectView: {
        backgroundColor: PUREWHITE,
        padding: GlobalSize(8),
        borderRadius: GlobalSize(6),
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: PLACEHOLDERCOLOR3,
        shadowOpacity: 0.3,
        marginLeft: DEFAULTWIDTH * 0.04,
        marginRight: DEFAULTWIDTH * 0.02,
        paddingLeft: GlobalSize(15),
        paddingRight: GlobalSize(15)

    },
    unselectView: {
        padding: GlobalSize(6),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: DEFAULTWIDTH * 0.04,
        marginRight: DEFAULTWIDTH * 0.02
    },
    tabView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTHEIGHT * 0.02,
        paddingLeft: DEFAULTWIDTH * 0.1,
        paddingRight: DEFAULTWIDTH * 0.1
    },
    bottomView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTHEIGHT * 0.02
    }
})