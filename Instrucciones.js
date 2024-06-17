import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Instrucciones = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.instruction}>
        <Text style={styles.step}>1. Escaneo de Productos</Text>
        <Text>
          Al abrir la aplicación, accede a la función de escaneo de productos y usa la cámara de tu dispositivo para tomar una fotografía clara del producto que deseas escanear.
        </Text>
      </View>
      <View style={styles.instruction}>
        <Text style={styles.step}>2. Gestión de Inventario</Text>
        <Text>
          Una vez escaneado un producto, este se añadirá automáticamente al inventario. Puedes ver una lista de todos los productos en tu inventario y editarlos según sea necesario.
        </Text>
      </View>
      <View style={styles.instruction}>
        <Text style={styles.step}>3. Generación de Listas de Compras</Text>
        <Text>
          La aplicación generará automáticamente una lista de compras basada en tu inventario actual. Puedes marcar los productos como comprados una vez que los hayas adquirido.
        </Text>
      </View>
      <View style={styles.instruction}>
        <Text style={styles.step}>4. Exploración de Recetas</Text>
        <Text>
          La aplicación te ofrecerá sugerencias de recetas basadas en los alimentos disponibles en tu inventario. Explora estas recetas para encontrar inspiración culinaria.
        </Text>
      </View>
      <View style={styles.instruction}>
        <Text style={styles.step}>5. Configuración y Ayuda</Text>
        <Text>
          Accede a la configuración para ajustar tus preferencias personales. Si necesitas ayuda, visita la sección de ayuda dentro de la aplicación.
        </Text>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  instruction: {
    marginBottom: 20,
  },
  step: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Instrucciones;
