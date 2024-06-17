import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite'; // Importa el módulo SQLite

const Configuracion = () => {
  const navigation = useNavigation();

  const db = SQLite.openDatabase('items.db');

  const resetearStock = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas resetear el stock? Esta acción todos los items de su inventario.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            db.transaction(
              tx => {
                tx.executeSql('DROP TABLE IF EXISTS items;', [], () => {
                  console.log('Base de datos reseteada correctamente');
                }, (_, error) => {
                  console.error('Error al resetear la base de datos:', error);
                });
              },
              null,
              null
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const resetearFavoritos = () => {
    Alert.alert(
      'Confirmar',
      '¿Estás seguro de que deseas resetear el stock? Esta acción todos sus favoritos.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: () => {
            console.log('Should delete favoritos')
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.buttonContainer}>
        <Button title={'Sobre la aplicación'} onPress={() => navigation.navigate('SobreLaApp')} color="#C8E6C9"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={'Instrucciones'} onPress={() => navigation.navigate('Instrucciones')} color="#C8E6C9"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={'Quienes somos'} onPress={() => navigation.navigate('QuienesSomos')} color="#C8E6C9"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title={'Resetear favoritos'} onPress={resetearFavoritos} color="#ff9999" />
      </View>
      <View style={styles.buttonContainer}>
        <Button title={'Resetear stock'} onPress={resetearStock} color="#ff9999"/>
      </View>
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
  buttonContainer: {
    marginVertical: 10, // Ajusta el espacio vertical entre los botones
  },
});

export default Configuracion;
