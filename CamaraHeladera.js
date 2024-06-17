import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import imageFilePath from './depositphotos_468075414-stock-photo-abstract-colorful-polygonal-background.jpg';

export default function CamaraHeladera() {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [items, setItems] = useState([
    { name: 'arroz', quantity: 1 },
    { name: 'fideos', quantity: 1 }
  ]);
  const [inputValue, setInputValue] = useState('');

  const permissionFunction = async () => {
    const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraStatus === 'granted');
    const { status: galleryStatus } = await ImagePicker.getMediaLibraryPermissionsAsync();
    setGalleryPermission(galleryStatus === 'granted');
    if (cameraStatus !== 'granted' && galleryStatus !== 'granted') {
      alert('Permission for media access needed.');
    }
  };

  useEffect(() => {
    permissionFunction();
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

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const addNewItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, { name: inputValue, quantity: 1 }]);
      setInputValue(''); // Clear input field after submission
    }
  };

  const increaseQuantity = index => {
    const newItems = [...items];
    newItems[index].quantity += 1;
    setItems(newItems);
  };

  const decreaseQuantity = index => {
    const newItems = [...items];
    if (newItems[index].quantity > 1) {
      newItems[index].quantity -= 1;
      setItems(newItems);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera ref={cameraRef} style={styles.fixedRatio} type={type} />
      </View>
      <Button title={'Take Picture'} onPress={takePicture} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ flex: 1, height: 300 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
