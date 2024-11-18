import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type EditServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditService'>;
type EditServiceScreenRouteProp = RouteProp<RootStackParamList, 'EditService'>;

type Props = {
  navigation: EditServiceScreenNavigationProp;
  route: EditServiceScreenRouteProp;
};

const EditServiceScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    const fetchService = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName(response.data.name);
      setPrice(response.data.price.toString());
    };
    fetchService();
  }, [id]);

  const editService = async () => {
    const token = await AsyncStorage.getItem('token');
    await axios.put(
      `https://kami-backend-5rs0.onrender.com/services/${id}`,
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
      <Button title="Save Changes" onPress={editService} />
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

export default EditServiceScreen;
