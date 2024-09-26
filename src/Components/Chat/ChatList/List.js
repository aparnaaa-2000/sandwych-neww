import React, { useEffect, useState,useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

//IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts';
import { PRIMARYCOLOR, PUREWHITE, LINECOLOR1, TEXTCOLOR11, TEXTCOLOR13 } from '../../../Constants/Colors/Colors'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { Account } from '../../../../assets';

//IMPORT THIRD PARTY PACKAGE
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getChatTeamList } from '../../../redux/thunk';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';


const List = ({ navigation,itemId }) => {

    const dispatch = useDispatch()
    const [UserData,setUserData] = useState(null)
    const [imageErrors, setImageErrors] = useState({});

    // Handle image load errors
    const handleImageError = (index) => {
        setImageErrors((prevErrors) => ({
            ...prevErrors,
            [index]: true,
        }));
    };


    const { chatTeamData, chatTeamError, chatTeamLoading } = useSelector(
        state => ({
            chatTeamData: state.Chatlist.data,
            chatTeamError: state.Chatlist.error,
            chatTeamLoading: state.Chatlist.isLoading
        }),
        shallowEqual
    );

    useFocusEffect(
        useCallback(() => {
            getData().then(data => {
                setUserData(data)
                getChatTeamList(data?.patientData?.patient_id, data?.storedValue, dispatch) //FUNCTION FOR GETTING THE CHAT LIST
            });
        }, [])
    );

    const getData = async () => {
        try {

            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');
            const carepartner = await AsyncStorage.getItem('UserData');

            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
                carepartner: carepartner != null ? JSON.parse(carepartner) :null
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                patientData: null,
                storedValue: null,
                carepartner: null
            };
        }
    };

    
    const combinedTeam = chatTeamData?.data?.care_team?.concat(chatTeamData?.data?.medical_team).concat(chatTeamData?.data?.hospital_admins);
   
    const renderItem = (({ item,index }) => {
       
        return (

            <>
            {UserData?.carepartner?.id  !== item?.user_id &&
            <TouchableOpacity onPress={() => {
                navigation.navigate('ChatStack', { screen:'ChatDetails',name: item?.name,
                    phoneNumber : item?.phonenumber,
                     imageUri: item?.imageUri,itemId : item?.user_id,teamRole : item?.team_role })
            }}>

                <View style={styles.mainView}>
                {!imageErrors[index] && item?.image !== null  ?
                    <FastImage
                        style={styles.imageV}
                        source={{
                            uri:item?.image,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        onError={() => handleImageError(index)}  
                    />:
                    <Account width={54} height={54} />}

                    <View style={{ top: GlobalSize(2) }}>
                        <Text style={[styles.textName, { width: DEFAULTWIDTH * 0.5 }]}>{item?.name}</Text>
                        <Text style={[styles.time, { maxWidth: DEFAULTWIDTH * 0.6 }]} numberOfLines={1}>{item?.team_role == '2' ? 'Carepartner' : null}</Text>

                    </View>
                    <View style={{ left: GlobalSize(-30), top: GlobalSize(2) }}>
                        <Text style={[styles.time, {
                            color: item.id == 1 ? '#151F6D' : TEXTCOLOR13,
                            fontWeight: item.id == 1 ? '600' : '400'
                        }]}>12:00 PM</Text>
                        {/* {item?.status == 1 &&
                            <View style={styles.countView}>
                                <Text style={styles.countText}>1</Text>
                            </View>} */}
                    </View>


                </View>
                <View style={styles.border} />
            </TouchableOpacity>}
            </>
        )
    })

   

    return (

        <>
            {chatTeamLoading ?

                <View style={styles.loadContainer}>
                    <ActivityIndicator size={30} color={PRIMARYCOLOR} />
                </View> :

                <View style={styles.container}>
                    <FlatList
                        data={combinedTeam}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />
                 
                </View>}
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: GlobalSize(15),
        alignItems: 'center',
        flex: 1
    },
    loadContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    mainView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: GlobalSize(15),
        alignItems: 'center'
    },
    textName: {
        fontSize: fontSize(16),
        fontWeight: '600',
        color: TEXTCOLOR11,
        fontFamily: FONTS.FontSemiB
    },
    time: {
        fontSize: fontSize(14),
        color: TEXTCOLOR13,
        fontFamily: FONTS.FontRegular
    },
    border: {
        borderWidth: 0.5,
        left: DEFAULTWIDTH * 0.2,
        borderColor: LINECOLOR1,
        width: DEFAULTWIDTH * 0.98,
        marginTop: fontSize(10)
    },
    countText: {
        fontSize: fontSize(12),
        color: PUREWHITE
    },
    countView: {
        marginTop: GlobalSize(5),
        marginLeft: DEFAULTWIDTH * 0.1,
        width: GlobalSize(16),
        height: GlobalSize(16),
        backgroundColor: PRIMARYCOLOR,
        borderRadius: GlobalSize(8),
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageV: {
        width: DEFAULTWIDTH * 0.15,
        borderRadius: GlobalSize(28),
        height: DEFAULTWIDTH * 0.15,
        left: 0
    },

})

export default List;