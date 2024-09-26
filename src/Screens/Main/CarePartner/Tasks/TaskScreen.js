import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import { BACKGROUNDWHITE } from '../../../../Constants/Colors/Colors';

import TaskStack from '../../../../Navigation/CarePartner/TaskStack';

const TaskScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: BACKGROUNDWHITE, flex: 1 }}>
      <StatusBar
        backgroundColor={BACKGROUNDWHITE}
        barStyle={'dark-content'}
        style={{ flex: 0 }} />
      <TaskStack />
    </SafeAreaView>
  );
}

export default TaskScreen;



