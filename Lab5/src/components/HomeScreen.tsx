import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Service = {
  _id: string;
  name: string;
  price: number;
};

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(
        'https://kami-backend-5rs0.onrender.com/services',
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );
      setServices(response.data);
    };
    fetchServices();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() =>
              navigation.navigate('ServiceDetail', {id: item._id})
            }>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text style={styles.servicePrice}>{item.price} ₫</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddService')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1', // Soft pink background matching the header
    padding: 10,
  },
  serviceItem: {
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ffb6c1', // Light pink border
    borderRadius: 10,
    backgroundColor: '#ffffff', // White background for contrast
    shadowColor: '#000', // Shadow for a card effect
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Shadow for Android
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333', // Darker text for contrast
  },
  servicePrice: {
    marginTop: 5,
    fontSize: 14,
    color: '#ff69b4', // Bright pink for price
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ff69b4', // Bright pink for the button
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff', // White text for contrast
    lineHeight: 30,
  },
});

export default HomeScreen;
