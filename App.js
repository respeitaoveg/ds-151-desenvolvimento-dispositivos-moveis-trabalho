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

  // useEffect(() => {
  //   // const bootstrapAsync = async () => {
  //   //   let user;

  //   //   try {
  //   //     user = await SecureStore.getItemAsync('user');
  //   //   } catch (e) {
  //   //     console.error(e)
  //   //   }

  //   //   dispatch({ type: 'RESTORE_TOKEN', token: user });
  //   // };

  //   // bootstrapAsync();
  //   console.log(444, state)
  // }, state.user);

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
      state
    }), []);


  return (
    <AuthContext.Provider value={authContext}>
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


