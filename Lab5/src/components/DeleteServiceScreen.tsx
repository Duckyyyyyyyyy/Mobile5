import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type DeleteServiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DeleteService'>;
type DeleteServiceScreenRouteProp = RouteProp<RootStackParamList, 'DeleteService'>;

type Props = {
  navigation: DeleteServiceScreenNavigationProp;
  route: DeleteServiceScreenRouteProp;
};

const DeleteServiceScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;

  const deleteService = async () => {
    const token = await AsyncStorage.getItem('token');
    await axios.delete(`https://kami-backend-5rs0.onrender.com/services/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.warningText}>Are you sure you want to delete this service?</Text>
      <Button title="Delete" onPress={deleteService} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
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
  warningText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default DeleteServiceScreen;
