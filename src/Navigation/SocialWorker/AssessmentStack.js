import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AssessmentComplete from '../../Screens/Main/CaseManager/Assessment/AssessmentComplete';
import AssessmentList from '../../Screens/Main/CaseManager/Assessment/AssessmentList';
import PreviousAssessment from '../../Screens/Main/CaseManager/Assessment/PreviousAssessment';
import BasicInfo1 from '../../Screens/Main/CaseManager/Assessment/BasicInfo1';
import BasicInfo2 from '../../Screens/Main/CaseManager/Assessment/BasicInfo2';
import CaregivingStyle2 from '../../Screens/Main/CaseManager/Assessment/CaregiverStyle/CaregiverStyle2';
import CaregivingStyle3 from '../../Screens/Main/CaseManager/Assessment/CaregiverStyle/CaregivingStyle3';
import CaregivingStyle1 from '../../Screens/Main/CaseManager/Assessment/CaregiverStyle/CaregivingStyle1';
import ADL1 from '../../Screens/Main/CaseManager/Assessment/FunctionalAbilities/ADL1';
import ADL2 from '../../Screens/Main/CaseManager/Assessment/FunctionalAbilities/ADL2';
import ADL3 from '../../Screens/Main/CaseManager/Assessment/FunctionalAbilities/ADL3';
import ADL4 from '../../Screens/Main/CaseManager/Assessment/FunctionalAbilities/ADL4';
import SDOHAssessment1 from '../../Screens/Main/CaseManager/Assessment/SDOH/SDOHAssessment1';
import SDOHAssessment2 from '../../Screens/Main/CaseManager/Assessment/SDOH/SDOHAssessment2';
import SDOHAssessment3 from '../../Screens/Main/CaseManager/Assessment/SDOH/SDOHAssessment3';

import SDOHAssessment5 from '../../Screens/Main/CaseManager/Assessment/SDOH/SDOHAssessment5';
import SDOHAssessment4 from '../../Screens/Main/CaseManager/Assessment/SDOH/SDOHAssessment5';

const Assessment = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

const AssessmentStack = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <Assessment.Navigator screenOptions={screenOptions}>
            <Assessment.Screen
                name="AssessmentComplete"
                component={isConnected ? AssessmentComplete : NetworkConnectivity}
            />

            <Assessment.Screen
                name="AssessmentList"
                component={isConnected ? AssessmentList : NetworkConnectivity}
            />

            <Assessment.Screen
                name="PreviousAssessment"
                component={isConnected ? PreviousAssessment : NetworkConnectivity}
            />

            <Assessment.Screen
                name="AssessmentComplete"
                component={isConnected ? AssessmentComplete : NetworkConnectivity}
            />

            <Assessment.Screen
                name="BasicInfo1"
                component={isConnected ? BasicInfo1 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="BasicInfo2"
                component={isConnected ? BasicInfo2 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="CaregivingStyle1"
                component={isConnected ? CaregivingStyle1 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="CaregivingStyle2"
                component={isConnected ? CaregivingStyle2 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="CaregivingStyle3"
                component={isConnected ? CaregivingStyle3 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="ADL1"
                component={isConnected ? ADL1 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="ADL2"
                component={isConnected ? ADL2 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="ADL3"
                component={isConnected ? ADL3 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="ADL4"
                component={isConnected ? ADL4 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="SDOHAssessment1"
                component={isConnected ? SDOHAssessment1 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="SDOHAssessment2"
                component={isConnected ? SDOHAssessment2 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="SDOHAssessment3"
                component={isConnected ? SDOHAssessment3 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="SDOHAssessment4"
                component={isConnected ? SDOHAssessment4 : NetworkConnectivity}
            />

            <Assessment.Screen
                name="SDOHAssessment5"
                component={isConnected ? SDOHAssessment5 : NetworkConnectivity}
            />

        </Assessment.Navigator>
    );
};

export default AssessmentStack;
