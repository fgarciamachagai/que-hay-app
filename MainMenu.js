import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const MainMenu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MiHeladera')}>
          <Image source={require('./assets/menuPrincipal/heladera.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Mi heladera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recetas')}>
          <Image source={require('./assets/menuPrincipal/receta.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Recetas para cocinar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProgramarCompras')}>
          <Image source={require('./assets/menuPrincipal/programarCompra.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Programar mis compras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Configuracion')}>
          <Image source={require('./assets/menuPrincipal/config.png')} style={styles.icon} />
          <Text style={styles.buttonText}>Configuración</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#4CAF50',
    width: '110%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  robotImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8E6C9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainMenu;
