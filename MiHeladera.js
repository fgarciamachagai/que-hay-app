import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const db = SQLite.openDatabase('items.db');

const UnitPicker = ({ selectedUnit, setSelectedUnit, itemId }) => {
  const unitOptions = ['unidad', 'kilo', 'gramo']; // Add more units as needed

  const updateUnit = (itemValue) => {
    setSelectedUnit(itemValue);
    db.transaction(
      tx => {
        tx.executeSql('UPDATE items SET unit = ? WHERE id = ?;', [
          itemValue,
          itemId,
        ]);
        tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
          setItems(rows._array);
        });
      },
      null,
      null
    );
  };

  return (
    <Picker
      selectedValue={selectedUnit}
      style={{ height: 50, width: 150 }}
      onValueChange={updateUnit}
    >
      {unitOptions.map((unit, index) => (
        <Picker.Item key={index} label={unit} value={unit} />
      ))}
    </Picker>
  );
};

const Item = ({ item, expandedItem, toggleExpansion, increaseQuantity, decreaseQuantity }) => {
  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.itemContainer, expandedItem === item.id && styles.expandedItem]}
      onPress={() => toggleExpansion(item.id)}
    >
      <View style={styles.itemLeft}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Cantidad: {item.quantity}</Text>
      </View>
      {expandedItem === item.id && (
        <View style={styles.itemRight}>
          <UnitPicker
            selectedUnit={item.unit}
            setSelectedUnit={item.unit}
            itemId={item.id}
          />
          <View style={styles.quantityButtons}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => increaseQuantity(item.id, item.quantity)}
            >
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => decreaseQuantity(item.id, item.quantity)}
            >
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function MiHeladera() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [expandedItem, setExpandedItem] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState('unidad'); // default unit

  useEffect(() => {
    const requestPermissions = async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');
      const { status: galleryStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
      setGalleryPermission(galleryStatus === 'granted');
      if (cameraStatus !== 'granted' && galleryStatus !== 'granted') {
        alert('Permission for media access needed.');
      }
    };

    requestPermissions();

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, quantity INTEGER, unit TEXT);'
      );
      tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
        setItems(rows._array);
      });
    });
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setImageUri(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addNewItem = () => {
    if (inputValue.trim() !== '') {
      db.transaction(
        tx => {
          tx.executeSql('INSERT INTO items (name, quantity, unit) VALUES (?, ?, ?);', [
            inputValue,
            1,
            selectedUnit,
          ], (_, resultSet) => {
            tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
              setItems(rows._array);
            });
          });
        },
        null,
        null
      );
      setInputValue(''); // Clear input field after submission
    }
  };

  const increaseQuantity = (id, quantity) => {
    const newQuantity = quantity + 1;
    db.transaction(
      tx => {
        tx.executeSql('UPDATE items SET quantity = ? WHERE id = ?;', [
          newQuantity,
          id,
        ], (_, resultSet) => {
          tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
            setItems(rows._array);
          });
        });
      },
      null,
      null
    );
  };

  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      db.transaction(
        tx => {
          tx.executeSql('UPDATE items SET quantity = ? WHERE id = ?;', [
            newQuantity,
            id,
          ], (_, resultSet) => {
            tx.executeSql('SELECT * FROM items;', [], (_, { rows }) => {
              setItems(rows._array);
            });
          });
        },
        null,
        null
      );
    }
  };

  const toggleExpansion = id => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  return (
    <View style={styles.container}>
      <View  style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Mi Heladera</Text>
        <Text >(mantené actualizada la mercadería de tu almacén, heladera o alacena)</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonCamara}
        onPress={() => navigation.navigate('CamaraHeladera')}
      >
        <Image source={require('./assets/camara.png')} style={styles.icon} />
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            expandedItem={expandedItem}
            toggleExpansion={toggleExpansion}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        ))}
      </ScrollView>

      <TextInput
        style={styles.input}
        onChangeText={setInputValue}
        value={inputValue}
        placeholder="Añade un nuevo ítem"
        onSubmitEditing={addNewItem}
      />
      <Button title="Agregar" onPress={addNewItem} color={'#C8E6C9'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seccion:{
    width: '100%',
    padding: 20,
    backgroundColor : '#C8E6C9',
  },
  tituloSeccion:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '90%',
    height: '90%',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonCamara: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '90%',
    alignItems: 'center'
  },
  icon: {
    width: 35,
    height: 35,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  expandedItem: {
    backgroundColor: '#f0f0f0',
  },
  itemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#777',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButtons: {
    flexDirection: 'row',
  },
  quantityButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
    width: '80%',
  },
});
