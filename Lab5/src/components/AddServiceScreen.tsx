import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type AddServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddService'>;

type Props = {
  navigation: AddServiceScreenNavigationProp;
};

const AddServiceScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const addService = async () => {
    const token = await AsyncStorage.getItem('token');
    await axios.post(
      'https://kami-backend-5rs0.onrender.com/services',
      { name, price: parseFloat(price) },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Service Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Service Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title="Add Service" onPress={addService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
});

export default AddServiceScreen;
