import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import StarsScreen from './screens/StarsScreen';
import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import LoginScreen from './screens/LoginScreen';

import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";


const Tab = createMaterialTopTabNavigator();
export const AuthContext = createContext()
const auth = getAuth()

export default function App() {
  const [isLoged, isLogedSet] = useState(true)

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        console.error(e)
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            console.log(userCredential)
          })
          .catch(error => {
            console.log(error)
          })

        // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
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
    </AuthContext.Provider>
  );
}


