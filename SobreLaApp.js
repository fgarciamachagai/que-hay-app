import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SobreLaApp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de SobreLaApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SobreLaApp;
