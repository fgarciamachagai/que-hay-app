import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const QuienesSomos = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Equipo de Desarrollo</Text>
      <View style={styles.memberContainer}>
        <Image source={require('./assets/team/enzo.png')} style={styles.avatar} />
        <View style={styles.memberInfo}>
          <Text style={styles.name}>Enzo Benites</Text>
          <Text>Amante de la programación y la inteligencia artificial. Apasionado por encontrar soluciones creativas a problemas cotidianos.</Text>
        </View>
      </View>
      
      <View style={styles.memberContainer}>
        <Image source={require('./assets/team/fede.webp')} style={styles.avatar} />
        <View style={styles.memberInfo}>
          <Text style={styles.name}>Federico García</Text>
          <Text>Entusiasta del diseño de experiencias de usuario. Siempre buscando formas de hacer que las aplicaciones sean más intuitivas y fáciles de usar.</Text>
        </View>
      </View>
      
      <View style={styles.memberContainer}>
        <Image source={require('./assets/team/facu.png')} style={styles.avatar} />
        <View style={styles.memberInfo}>
          <Text style={styles.name}>Facundo Farid Montero Cura</Text>
          <Text>Apasionado por la tecnología móvil y el desarrollo de aplicaciones. Interesado en explorar nuevas formas de mejorar la vida cotidiana a través de la tecnología.</Text>
        </View>
      </View>
      
      <View style={styles.memberContainer}>
        <Image source={require('./assets/team/manu.png')} style={styles.avatar} />
        <View style={styles.memberInfo}>
          <Text style={styles.name}>Manuel Ortíz</Text>
          <Text>Entusiasta del desarrollo de software y la gestión de proyectos. Comprometido con crear soluciones innovadoras que simplifiquen la vida de las personas.</Text>
        </View>
      </View>
      
      <View style={styles.memberContainer}>
        <Image source={require('./assets/team/nahu.jpg')} style={styles.avatar} />
        <View style={styles.memberInfo}>
          <Text style={styles.name}>Nahuel Vázquez</Text>
          <Text>Apasionado por la tecnología y la ciencia de datos. Interesado en aplicar la inteligencia artificial para resolver problemas del mundo real.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  memberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  memberInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default QuienesSomos;
