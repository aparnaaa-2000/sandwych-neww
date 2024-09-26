import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

//IMPORT COMPONENTS
import Previous from '../../../../Components/CarePartner/Resources/Previous';
import Inprocess from '../../../../Components/CarePartner/Resources/Inprocess';
import ResourceHeader from '../../../../Components/Common/Headers/ResourceHeader';

//IMPORT CONSTANTS
import { FONTS } from '../../../../Constants/Fonts';
import { BACKGROUNDWHITE, PRIMARYCOLOR, PUREWHITE } from '../../../../Constants/Colors/Colors';
import DEFAULTSTYLES, { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize, fontSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const Tab = createMaterialTopTabNavigator();

function InPrevResources({ navigation }) {

    return (
        <SafeAreaView style={DEFAULTSTYLES.AndroidSafeArea}>
            <StatusBar
                backgroundColor={BACKGROUNDWHITE}
                barStyle={'dark-content'}
                style={{ flex: 0 }} />

            <View style={styles.container}>
                <ResourceHeader navigation={navigation} title={'Resources'} />
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
                </Tab.Navigator>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.touchBtn}
                        onPress={() => navigation.navigate('SelectResource')}>
                        <Text style={styles.textBtn}>+</Text>
                    </TouchableOpacity>
                </View>
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
export default InPrevResources;