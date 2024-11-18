import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen';
import HomeScreen from './src/components/HomeScreen';
import AddServiceScreen from './src/components/AddServiceScreen';
import ServiceDetailScreen from './src/components/ServiceDetailScreen';
import EditServiceScreen from './src/components/EditServiceScreen';
import DeleteServiceScreen from './src/components/DeleteServiceScreen';
import {SafeAreaView, StyleSheet} from 'react-native';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddService: undefined;
  ServiceDetail: {id: string};
  EditService: {id: string};
  DeleteService: {id: string};
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddService" component={AddServiceScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="EditService" component={EditServiceScreen} />
        <Stack.Screen name="DeleteService" component={DeleteServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
