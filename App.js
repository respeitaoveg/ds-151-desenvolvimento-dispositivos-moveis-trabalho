import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from './screens/HomeScreen';
import StarsScreen from './screens/StarsScreen';
import { createContext, useEffect, useMemo, useReducer, useState } from 'react';
import LoginScreen from './screens/LoginScreen';

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "@firebase/auth";


const Tab = createMaterialTopTabNavigator();
export const AuthContext = createContext()
const auth = getAuth()

export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLogged: true,
            user: action.user,
          };
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
      user: null,
    }
  );

  useEffect(() => {
    // const bootstrapAsync = async () => {
    //   let user;

    //   try {
    //     user = await SecureStore.getItemAsync('user');
    //   } catch (e) {
    //     console.error(e)
    //   }

    //   dispatch({ type: 'RESTORE_TOKEN', token: user });
    // };

    // bootstrapAsync();
    console.log(444, state)
  }, state.user);

  const authContext = useMemo(
    () => ({
      signIn: async ({email, password}) => {
        signInWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            dispatch({ type: 'SIGN_IN', user: userCredential.user });
          })
          .catch(error => {
            console.log(error)
          })
      },
      signUp: async ({email, password}) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then(userCredential => {
            dispatch({ type: 'SIGN_IN', user: userCredential.user });
          })
          .catch(error => {
            console.log(error)
          })
        // dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      state,
      user: state.user,
    }), []);


  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        {state.isLogged ? (
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Sala" component={HomeScreen} />
              <Tab.Screen name="Estrelas" component={StarsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        ) :  (
          <LoginScreen />
        )}
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}


