/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {Button} from 'react-native-paper';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({navigation}) => {
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    try {
      const response = await axios.post(
        'https://kami-backend-5rs0.onrender.com/auth',
        {phone, password},
      );
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Home');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      <Button
        onPress={login}
        style={{
          borderColor: 'pink',
          borderWidth: 1,
          width: 250,
          backgroundColor: 'pink',
        }}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    width: 250,
    margin: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoginScreen;
