import React, { useState, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// IMPORT CONSTANTS
import { FONTS } from '../../../Constants/Fonts';
import { PRIMARYCOLOR, PUREWHITE, LINECOLOR1, TEXTCOLOR11, TEXTCOLOR13 } from '../../../Constants/Colors/Colors'
import { DEFAULTWIDTH } from '../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../Constants/ResponsiveFont/ResponsiveFonts';
import { Account } from '../../../../assets';

//IMPORT THIRD-PARTY PACKAGES
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { getChatGroupList, getUnreadMessage } from '../../../redux/thunk';

const GroupList = ({ navigation }) => {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);
    const [imageErrors, setImageErrors] = useState({});

    // Handle image load errors
    const handleImageError = (index) => {
        setImageErrors((prevErrors) => ({
            ...prevErrors,
            [index]: true,
        }));
    };

    const { chatGroupData} = useSelector(
        state => ({
            chatGroupData: state.ChatGroupList.data,
            chatGroupError: state.ChatGroupList.error,
            chatGroupLoading: state.ChatGroupList.isLoading,
            UnReadData: state.UnReadMessage.data,
            UnReadError: state.UnReadMessage.error,
            UnReadLoading: state.UnReadMessage.isLoading,
        }),
        shallowEqual
    );

    const getData = async () => {
        try {
            const storedValue = await AsyncStorage.getItem('TOKENAuth');
            const patientData = await AsyncStorage.getItem('PatientData');
            const carepartnerData = await AsyncStorage.getItem('UserData');
            return {
                storedValue: storedValue,
                patientData: patientData != null ? JSON.parse(patientData) : null,
                carepartnerData: carepartnerData != null ? JSON.parse(carepartnerData) : null
            };
        } catch (e) {
            console.error('Error retrieving data:', e);
            return {
                patientData: null,
                storedValue: null,
                carepartnerData: null
            };
        }
    };

    useFocusEffect(
        useCallback(() => {
            getData().then(data => {
                setUserData(data);
                getChatGroupList(data?.patientData?.patient_id, data?.storedValue, dispatch);
                getUnreadMessage(data?.storedValue, dispatch);
            });
        }, [])
    );

    const renderItem = ({ item,index }) => {
      
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('ChatStack', {
                    screen: 'ChatGroupDetails',
                    name: item?.group_name, imageUri: item?.imageUri,
                    itemId: item?.patient_group_id,
                    carepartnerId: userData?.carepartnerData?.id,
                    groupMembers: item?.members
                })
            }}>
                <View style={styles.mainView}>

                {/* {!imageErrors[index]   ?
                    <FastImage
                        style={styles.imageV}
                        source={{
                            uri:item?.image,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        onError={() => handleImageError(index)}  
                    />: */}
                    <Account width={54} height={54} />

                    <View style={{ width: DEFAULTWIDTH * 0.52, left: GlobalSize(-12), top: GlobalSize(2) }}>
                        <Text style={[styles.textName, { width: DEFAULTWIDTH * 0.5 }]}>{item?.group_name}</Text>
                        <Text style={[styles.time, { maxWidth: DEFAULTWIDTH * 0.6 }]} numberOfLines={1}>{item.msg}</Text>
                    </View>
                    <View style={{ left: GlobalSize(-30), top: GlobalSize(2) }}>
                        <Text style={[styles.time, {
                            color: item.id == 1 ? '#151F6D' : TEXTCOLOR13,
                            fontWeight: item.id == 1 ? '600' : '400'
                        }]}>{item.time}</Text>
                        {item.id == 1 &&
                            <View style={styles.countView}>
                                <Text style={styles.countText}>1</Text>
                            </View>}
                    </View>
                </View>
                <View style={styles.border} />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={chatGroupData?.['Group List']}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: GlobalSize(15),
        alignItems: 'center',
        flex: 1
    },
    mainView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: GlobalSize(15),
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
});

export default GroupList;
