import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { PRIMARYCOLOR } from '../../../Constants/Colors/Colors';

const ActivityLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={PRIMARYCOLOR} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ActivityLoader;
