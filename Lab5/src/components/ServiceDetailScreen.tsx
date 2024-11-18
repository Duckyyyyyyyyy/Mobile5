import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type ServiceDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ServiceDetail'
>;
type ServiceDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ServiceDetail'
>;

type Props = {
  navigation: ServiceDetailScreenNavigationProp;
  route: ServiceDetailScreenRouteProp;
};

type Service = {
  _id: string;
  name: string;
  price: number;
};

const ServiceDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { id } = route.params;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `https://kami-backend-5rs0.onrender.com/services/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setService(response.data);
      } catch (error) {
        console.error('Error fetching service:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff69b4" />
      ) : service ? (
        <View style={styles.card}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <Text style={styles.servicePrice}>{service.price} ₫</Text>

          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('EditService', { id })}
          >
            <Text style={styles.buttonText}>Edit Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => navigation.navigate('DeleteService', { id })}
          >
            <Text style={styles.buttonText}>Delete Service</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.errorText}>Service not found!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e1', // Soft pink background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  servicePrice: {
    fontSize: 18,
    color: '#ff69b4',
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4caf50', // Green for edit
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red for delete
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
  },
});

export default ServiceDetailScreen;
