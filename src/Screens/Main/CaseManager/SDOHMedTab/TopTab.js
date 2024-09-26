import { View, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FONTS } from '../../../../Constants/Fonts';
import { BACKGROUNDDARKO, BACKGROUNDWHITE, BORDERCOLOR1, PRIMARYCOLOR } from '../../../../Constants/Colors/Colors';
import SDOH from '../../../../Components/CaseManager/SDOHMedTab/SDOH';
import Medication from '../../../../Components/CaseManager/SDOHMedTab/Medication';
import PatientHeader from '../../../../Components/CaseManager/Profile/PatientProfile/PatientHeader';
import { DEFAULTWIDTH } from '../../../../Constants/styles/styles';
import { GlobalSize } from '../../../../Constants/ResponsiveFont/ResponsiveFonts';

const Tab = createMaterialTopTabNavigator();

function TopTab() {
    return (

        <View style={styles.container}>
            <View>
                <PatientHeader Header={'Clients'}/>
            </View>
            
            <View style={styles.lineBorder}/>
            
            <Tab.Navigator
                tabBarOptions={{

                    activeTintColor:BACKGROUNDDARKO, // Set the active tab text color
                    labelStyle: {
                        fontSize: 14,
                        textTransform: 'Capitalize',
                        fontFamily: FONTS.FontMedium,
                        fontWeight: '500',
                    },
                    style: {
                        backgroundColor: BACKGROUNDWHITE, // Set the background color here
                    },

                    indicatorStyle: { backgroundColor: BACKGROUNDDARKO }, // Optional: Style for the indicator (the line under the active tab)
                }}
                >
                <Tab.Screen name="SDOH" component={SDOH} />
                <Tab.Screen name="Medication" component={Medication} />
            </Tab.Navigator>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: BACKGROUNDWHITE,
        flex: 1,
    },
    lineBorder:{
        height:1,
        width:DEFAULTWIDTH*0.90,
        backgroundColor:BORDERCOLOR1,
        margin:GlobalSize(10)
    }
})
export default TopTab;