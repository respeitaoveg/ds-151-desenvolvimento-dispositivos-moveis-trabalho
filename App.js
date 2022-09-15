import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import StarsScreen from './screens/StarsScreen';
import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import LoginScreen from './screens/LoginScreen';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@firebase/auth";


const Stack = createNativeStackNavigator();
export const AuthContext = createContext()
const auth = getAuth()

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN': {
          prevState.user = action.user
          prevState.isLogged = true

          return {...prevState}
        }
        case 'SIGN_OUT': {
          return {
            ...prevState,
            user: null,
            isLogged: false
          }
        }
      }
    },
    {
      isLogged: false,
      isLoading: true,
      user: undefined
    }
  );

  const authContext = useMemo(
    () => ({
      signIn: async ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            dispatch({ type: 'SIGN_IN', user: userCredential.user });
          })
          .catch(error => console.error(error))
      },
      signUp: async ({email, password}) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            dispatch({ type: 'SIGN_IN', user: userCredential.user });
          })
          .catch(error => console.error(error))
        // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => {
        auth.signOut().then(() => {
          dispatch({ type: 'SIGN_OUT' })
        })
        .catch(error => console.error(error))
      }
    }), []);


  return (
    <AuthContext.Provider value={{...authContext, state}}>
      <SafeAreaProvider>
        {/* {true ? ( */}
        {state.isLogged ? (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Sala" options={{headerShown: false}} component={HomeScreen} />
              <Stack.Screen name="Estrelas" component={StarsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        ) :  (
          <LoginScreen />
        )}
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}


