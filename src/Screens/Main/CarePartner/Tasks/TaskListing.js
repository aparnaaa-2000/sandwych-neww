import React, { useState, useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import TopTab from '../../../../Components/Common/TopTabs/TopTab';
import { NavigationContainer } from '@react-navigation/native';
import { Tree, Walk } from '../../../../../assets';
import TaskListOverview from '../../../../Components/CarePartner/Tasks/TasksLists/TaskListOverview';
import TaskTimeList from '../../../../Components/CarePartner/Tasks/TasksLists/TaskTimeList';
import { BACKGROUNDWHITE, BORDERCOLOR2, GREYBACKGROUND1, PLACEHOLDERCOLOR1, PLACEHOLDERCOLOR2, PLACEHOLDERCOLOR3, PRIMARYCOLOR, PUREWHITE, TEXTCOLOR10, TEXTCOLOR7 } from '../../../../Constants/Colors/Colors';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment/moment';
import { FONTS } from '../../../../Constants/Fonts';
import DEFAULTSTYLES, { DEFAULTHEIGHT, DEFAULTWIDTH } from '../../../../Constants/styles/styles';

const TaskListing = ({ navigation, data, yesterData }) => {

    const taskItems = [
        {
            id: 1,
            Title: 'Today'
        },
        {
            id: 2,
            Title: 'Yesterday'
        },

    ]

    const [itemState, setItemState] = useState(1)

    const OnCallApi = (item) => {
        setItemState(item.id)
    }

    const groupTasksByYesterday = (tasks) => {
        return tasks.reduce((acc, task) => {
            if (!acc[task.time]) {
                acc[task.time] = [];
            }
            acc[task.time].push(task);
            return acc;
        }, {});
    };

    const groupedTasksYesterday = groupTasksByYesterday(yesterData?.tasks || []);
    const groupedTasksArrayYesterday = Object.keys(groupedTasksYesterday).map((time) => ({
        time,
        tasks: groupedTasksYesterday[time],
    }));

    const groupTasksByTime = (tasks) => {
        return tasks.reduce((acc, task) => {
            if (!acc[task.time]) {
                acc[task.time] = [];
            }
            acc[task.time].push(task);
            return acc;
        }, {});
    };

    const groupedTasks = groupTasksByTime(data?.tasks || []);
    const groupedTasksArray = Object.keys(groupedTasks).map((time) => ({
        time,
        tasks: groupedTasks[time],
    }));



    return (
        <View style={{ flex: 1, backgroundColor:BACKGROUNDWHITE,marginBottom:GlobalSize(45) }}>
            <TaskListOverview info={data} />

            <View style={styles.tabView}>
                <View style={styles.cardView}>

                    {taskItems?.map((item) => {
                        return (

                            <TouchableOpacity
                                style={itemState == item.id ?
                                    styles.selectView :
                                    styles.unselectView}
                                onPress={() => OnCallApi(item)}>
                                <Text style={styles.textTitle}>{item.Title}</Text>
                            </TouchableOpacity>

                        )
                    })}

                </View>
            </View>

            {itemState == 1 ?
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                            style={{ backgroundColor:BACKGROUNDWHITE }}
                            data={groupedTasksArray}
                            renderItem={({ item }) => <TaskTimeList time={item} day={0} navigation={navigation} />}
                            keyExtractor={(item) => item.time}
                        />
                    </View>
                </ScrollView> :

                <ScrollView showsVerticalScrollIndicator={false} >
                    <View>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="always"
                            style={{ backgroundColor:BACKGROUNDWHITE }}
                            data={groupedTasksArrayYesterday}
                            renderItem={({ item }) => <TaskTimeList time={item} day={0} navigation={navigation} />}
                            keyExtractor={(item) => item.time}
                        />
                    </View>
                </ScrollView>
            }



        </View>
    )
}

export default TaskListing

const styles = StyleSheet.create({
    textTab: {
        color: TEXTCOLOR10,
        fontSize: fontSize(14),
        fontFamily: FONTS.FontMedium,
    },
    flatListContent: {
        justifyContent: 'space-around',
        flexGrow: 1,
        paddingVertical: 10,
    },
    touchTab: {
        backgroundColor: 'red',
        // width:DEFAULTWIDTH*0.4,
        // height:GlobalSize(50)
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

        paddingLeft: GlobalSize(15),
        paddingRight: GlobalSize(15)

    },
    unselectView: {
        padding: GlobalSize(6),
        alignItems: 'center',
        justifyContent: 'center',

    },
    tabView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: DEFAULTHEIGHT * 0.02,
        paddingLeft: DEFAULTWIDTH * 0.1,
        paddingRight: DEFAULTWIDTH * 0.1,
        marginTop: GlobalSize(15)
    },
    cardView: {
        backgroundColor: BACKGROUNDWHITE,
        width: DEFAULTWIDTH * 0.9,
        padding: GlobalSize(5),
        borderRadius: GlobalSize(8),
        borderColor: BORDERCOLOR2,
        borderWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: GREYBACKGROUND1,
        paddingLeft: DEFAULTWIDTH * 0.05,
        paddingRight: DEFAULTWIDTH * 0.05
    },
    textTitle: {
        fontFamily: FONTS.FontMedium,
        fontSize: fontSize(14),
        color: TEXTCOLOR7
    },
})