import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity,SafeAreaView,StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//IMPORT CONSTANTS
import { FONTS } from '../../../../Constants/Fonts';
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

//IMPORT COMPONENTS
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader';
import Inprocess from '../../../../Components/CarePartner/Support/InProcess';
import Previous from '../../../../Components/CarePartner/Support/Previous';
import ActivitySelectionPopup from '../../../../Components/CarePartner/Support/ActivitySelectionPopup';
import Requests from '../../../../Components/CarePartner/Support/Requests';


const Tab = createMaterialTopTabNavigator();

function InPrevSupport({ navigation }) {

    const [ModalOpen, setModalOpen] = useState(false)

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
        <StatusBar
            backgroundColor={BACKGROUNDWHITE}
            barStyle={'dark-content'}
            style={{ flex: 0 }} />

        <View style={styles.container}>
            <ResourceHeader navigation={navigation} title={'Support'} />
            <Tab.Navigator
                tabBarOptions={{

                    activeTintColor: PRIMARYCOLOR, // Set the active tab text color
                    labelStyle: {
                        fontSize: fontSize(14),
                        textTransform: 'Capitalize',
                        fontFamily: FONTS.FontMedium,
                        fontWeight: '500',
                    },
                    style: {
                        backgroundColor: BACKGROUNDWHITE, // Set the background color here
                    },

                    indicatorStyle: { backgroundColor: PRIMARYCOLOR }, // Optional: Style for the indicator (the line under the active tab)
                }}
            >
                <Tab.Screen name="Inprocess" component={Inprocess} />
                <Tab.Screen name="Previous" component={Previous} />
                <Tab.Screen name="Requests" component={Requests} />
            </Tab.Navigator>

            <View style={styles.buttonView}>
                <TouchableOpacity
                    style={styles.touchBtn}
                    onPress={() => setModalOpen(true)}>
                    <Text style={styles.textBtn}>+</Text>
                </TouchableOpacity>
            </View>

            <ActivitySelectionPopup
                ModalOpen={ModalOpen}
                setModalOpen={setModalOpen}
                navigation={navigation} />
        </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUNDWHITE,
        flex: 1,
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
        borderRadius: 8,
        marginLeft: GlobalSize(10),
        marginRight: GlobalSize(10),
    },
    buttonView: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        right: GlobalSize(10),
        position: 'absolute',
        bottom: 0
    }
})
export default InPrevSupport;