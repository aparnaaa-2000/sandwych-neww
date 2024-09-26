import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Active from './Active';
import Profile from './Profile';
import { FONTS } from '../../../../Constants/Fonts';
import { BACKGROUNDWHITE, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';

const Tab = createMaterialTopTabNavigator();

function MedsTab() {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                tabBarOptions={{

                    activeTintColor: PRIMARYCOLOR, // Set the active tab text color
                    labelStyle: {
                        fontSize: 14,
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
                <Tab.Screen name="Active" component={Active} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUNDWHITE,
        flex: 1,
    },
})
export default MedsTab;