import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import StarsScreen from './screens/StarsScreen';
import { useState } from 'react';
import LoginScreen from './screens/LoginScreen';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const [isLoged, isLogedSet] = useState(true)

  return (
    <SafeAreaProvider>
      {isLoged ? (
        <LoginScreen />
      ) :  (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Sala" component={HomeScreen} />
            <Tab.Screen name="Estrelas" component={StarsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}


